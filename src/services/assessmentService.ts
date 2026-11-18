import {
  saveAssessmentToSqlite,
  fetchAssessmentsFromSqlite,
  fetchUserLeadsFromSqlite,
  fetchParticipantHistoryFromSqlite,
  saveParticipantHistoryToSqlite,
  saveCustomRoleToSqlite,
  saveCustomQuestionToSqlite
} from './sqliteClient';
import {
  AssessmentAnswers,
  AssessmentRecord,
  CareerReportData,
  CategoryScore,
  ParticipantProfile,
  QuizQuestion,
  CareerRole
} from '../types';
import { QUIZ_QUESTIONS } from '../data/questions';
import { CAREER_ROLES } from '../data/roles';
import { MASTER_QUESTION_BANK } from '../data/questionBank';

const LOCAL_STORAGE_REPORTS_KEY = 'mindlyft_saved_reports';
const LOCAL_STORAGE_ASSESSMENTS_KEY = 'mindlyft_assessment_records';
const LOCAL_STORAGE_CUSTOM_ROLES_KEY = 'mindlyft_custom_roles';
const LOCAL_STORAGE_CUSTOM_QUESTIONS_KEY = 'mindlyft_custom_questions';
const LOCAL_STORAGE_HISTORY_KEY = 'mindlyft_participant_question_history';

export interface SubmitAssessmentPayload {
  answers: AssessmentAnswers;
  profile: ParticipantProfile;
  scores: CategoryScore[];
  report: CareerReportData;
  sessionToken: string;
  participantId?: string;
  targetRoleCode?: string;
  assignedSetNumber?: number;
  presentedQuestionIds?: string[];
}

export interface SubmitAssessmentResponse {
  success: boolean;
  referenceId: string;
  assessmentId?: string;
  isLocalFallback?: boolean;
  error?: string;
}

/**
 * Tracks presented questions to prevent repeating questions across attempts
 * Connected to SQLite (mindlyft.db)
 */
export async function fetchParticipantQuestionHistory(participantId: string): Promise<string[]> {
  let localHistory: string[] = [];
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_HISTORY_KEY}_${participantId}`);
    if (raw) localHistory = JSON.parse(raw);
  } catch (e) {
    // fallback
  }

  try {
    const sqliteHistory = await fetchParticipantHistoryFromSqlite(participantId);
    return Array.from(new Set([...localHistory, ...sqliteHistory]));
  } catch (err) {
    console.warn('Failed to fetch participant history from SQLite:', err);
    return localHistory;
  }
}

/**
 * Records newly presented questions to avoid repeating them in future attempts
 * Connected to SQLite (mindlyft.db)
 */
export async function recordParticipantQuestionHistory(
  participantId: string,
  questionIds: string[],
  assessmentId?: string
): Promise<void> {
  if (!participantId || questionIds.length === 0) return;

  // 1. Save locally
  try {
    const existing = await fetchParticipantQuestionHistory(participantId);
    const updated = Array.from(new Set([...existing, ...questionIds]));
    localStorage.setItem(`${LOCAL_STORAGE_HISTORY_KEY}_${participantId}`, JSON.stringify(updated));
  } catch (e) {
    // ignore
  }

  // 2. Persist to SQLite
  try {
    await saveParticipantHistoryToSqlite(participantId, questionIds);
  } catch (err) {
    console.warn('Failed to record question history in SQLite:', err);
  }
}

/**
 * Saves assessment to SQLite database (mindlyft.db) with participant name and phone number
 */
export async function submitAssessment(payload: SubmitAssessmentPayload): Promise<SubmitAssessmentResponse> {
  const {
    answers,
    profile,
    scores,
    report,
    sessionToken,
    participantId,
    targetRoleCode,
    assignedSetNumber,
    presentedQuestionIds = []
  } = payload;
  const referenceId = report.referenceId;

  // 1. Back up locally so the participant never loses their report in browser cache
  saveReportLocally(report, answers, profile, participantId, targetRoleCode, assignedSetNumber);

  // 2. Record question history locally
  if (participantId && presentedQuestionIds.length > 0) {
    recordParticipantQuestionHistory(participantId, presentedQuestionIds).catch(console.warn);
  }

  // 3. Construct record for SQLite database
  const assessmentRecord: AssessmentRecord = {
    id: `rec-${referenceId}`,
    referenceId,
    participantId: participantId || report.participantId,
    participantName: profile.name || null,
    phoneNumber: profile.phone || null,
    backgroundField: profile.backgroundField || null,
    educationLevel: profile.educationLevel || null,
    existingSkills: profile.existingSkills || [],
    experienceLevel: profile.experienceLevel,
    learningTime: profile.learningTime,
    workStyle: profile.workStyle,
    careerGoal: profile.careerGoal,
    track: report.track || undefined,
    targetRoleCode: targetRoleCode || report.targetRoleCode,
    assignedSetNumber: assignedSetNumber || report.assignedSetNumber,
    primaryCategory: report.primaryCategory.title || report.primaryCategory.code,
    primaryRole: report.primaryRole.title,
    scores,
    reportData: report,
    status: 'completed',
    createdAt: report.completedAt || new Date().toISOString()
  };

  // 4. Save to SQLite database
  try {
    const saved = await saveAssessmentToSqlite(assessmentRecord);
    if (saved) {
      return {
        success: true,
        referenceId,
        assessmentId: assessmentRecord.id,
        isLocalFallback: false
      };
    }
  } catch (err: any) {
    console.warn('SQLite submission error, using local fallback:', err.message);
  }

  return {
    success: true,
    referenceId,
    isLocalFallback: true
  };
}

/**
 * Retrieves report data by unique reference ID
 */
export async function getAssessmentReport(referenceId: string): Promise<CareerReportData | null> {
  // 1. Check local storage first
  const local = getReportLocally(referenceId);
  if (local) return local;

  // 2. Query SQLite
  try {
    const records = await fetchAssessmentsFromSqlite();
    const found = records.find((r) => r.referenceId === referenceId);
    if (found?.reportData) return found.reportData;
  } catch (err) {
    console.error('Error fetching report from SQLite:', err);
  }

  return null;
}

/**
 * Admin: Fetch all assessments with search, sorting, and pagination from SQLite
 */
export async function adminFetchAssessments(params?: {
  search?: string;
  sortBy?: 'createdAt' | 'referenceId' | 'participantName';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}): Promise<{ records: AssessmentRecord[]; totalCount: number; isLocal: boolean }> {
  const { search = '', sortBy = 'createdAt', sortOrder = 'desc', page = 1, pageSize = 15 } = params || {};

  // 1. Fetch from SQLite database (both assessments table and student leads table)
  let records: AssessmentRecord[] = [];
  let isLocal = false;
  try {
    const [sqliteAssessments, sqliteLeads] = await Promise.all([
      fetchAssessmentsFromSqlite().catch(() => []),
      fetchUserLeadsFromSqlite().catch(() => [])
    ]);

    records = [...(sqliteAssessments || [])];

    // Merge student leads into the records list so every captured name & number is visible in admin
    if (Array.isArray(sqliteLeads)) {
      for (const lead of sqliteLeads) {
        if (!lead.name && !lead.phone) continue;
        
        // Skip if this phone number or lead id is already in the assessments table
        const alreadyExists = records.some(
          (r) =>
            (lead.phone && r.phoneNumber && r.phoneNumber.trim() === lead.phone.trim()) ||
            r.id === lead.id
        );

        if (!alreadyExists) {
          const leadSuffix = (lead.id || '').replace(/^lead_/, '').slice(-6) || Math.random().toString(36).substring(2, 8).toUpperCase();
          records.push({
            id: lead.id || `lead-${Date.now()}`,
            referenceId: `LEAD-${leadSuffix}`,
            participantId: lead.participantId || lead.id,
            participantName: lead.name || null,
            phoneNumber: lead.phone || null,
            backgroundField: lead.backgroundField || null,
            educationLevel: lead.educationLevel || null,
            existingSkills: Array.isArray(lead.existingSkills) ? lead.existingSkills : [],
            experienceLevel: 'student',
            learningTime: 'flexible',
            workStyle: 'collaborative',
            careerGoal: lead.careerGoal || 'career_guidance',
            track: lead.track || undefined,
            primaryCategory: lead.backgroundField || 'Career Guidance Lead',
            primaryRole: lead.educationLevel ? `${lead.educationLevel} Candidate` : 'Career Guidance Lead',
            scores: [],
            status: 'completed',
            createdAt: lead.createdAt || lead.updatedAt || new Date().toISOString()
          });
        }
      }
    }
  } catch (err) {
    console.warn('Failed to query SQLite, falling back to local records:', err);
  }

  // 2. Fall back / merge with local storage records if SQLite has no records yet
  if (!records || records.length === 0) {
    records = getAllLocalAssessments();
    isLocal = true;
  } else {
    // Also include any local-only records that haven't synced yet
    const localRecords = getAllLocalAssessments();
    const existingRefIds = new Set(records.map((r) => r.referenceId));
    for (const lr of localRecords) {
      if (!existingRefIds.has(lr.referenceId) && !lr.id.startsWith('demo-')) {
        records.push(lr);
      }
    }
  }

  // Filter by search query (checks Reference ID, Name, Phone Number, Background, Category, Role)
  let filtered = records.filter((rec) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      rec.referenceId.toLowerCase().includes(q) ||
      (rec.participantName && rec.participantName.toLowerCase().includes(q)) ||
      (rec.phoneNumber && rec.phoneNumber.toLowerCase().includes(q)) ||
      (rec.backgroundField && rec.backgroundField.toLowerCase().includes(q)) ||
      (rec.primaryCategory && rec.primaryCategory.toLowerCase().includes(q)) ||
      (rec.primaryRole && rec.primaryRole.toLowerCase().includes(q))
    );
  });

  filtered.sort((a, b) => {
    let valA = a[sortBy] || '';
    let valB = b[sortBy] || '';
    if (sortOrder === 'asc') return valA > valB ? 1 : -1;
    return valA < valB ? 1 : -1;
  });

  const startIndex = (page - 1) * pageSize;
  const paginated = filtered.slice(startIndex, startIndex + pageSize);

  return {
    records: paginated,
    totalCount: filtered.length,
    isLocal
  };
}

/**
 * Admin: Export authorized assessment records to CSV (includes Phone Number, Education & Skills)
 */
export async function adminExportAssessmentsCSV(): Promise<string> {
  const { records } = await adminFetchAssessments({ pageSize: 1000 });
  const headers = [
    'Reference ID',
    'Date Completed',
    'Participant Name',
    'Phone / Contact Number',
    'Education & Specialization',
    'Selected Skills',
    'Primary Category / Field',
    'Top Career Recommendation',
    'Status'
  ];

  const rows = records.map((r) => [
    `"${r.referenceId}"`,
    `"${new Date(r.createdAt).toLocaleDateString()}"`,
    `"${r.participantName || 'Anonymous'}"`,
    `"${r.phoneNumber || 'N/A'}"`,
    `"${(r.backgroundField || r.educationLevel || 'N/A').replace(/"/g, '""')}"`,
    `"${(r.existingSkills || []).join(', ').replace(/"/g, '""')}"`,
    `"${(r.primaryCategory || 'General').replace(/"/g, '""')}"`,
    `"${(r.primaryRole || 'Analyzed').replace(/"/g, '""')}"`,
    `"${r.status || 'completed'}"`
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

/**
 * Admin Catalog Management: Get roles
 */
export function getActiveRoles(): CareerRole[] {
  try {
    const custom = localStorage.getItem(LOCAL_STORAGE_CUSTOM_ROLES_KEY);
    if (custom) {
      return JSON.parse(custom);
    }
  } catch (e) {
    // fallback
  }
  return CAREER_ROLES;
}

/**
 * Admin Catalog Management: Save updated role
 */
export async function saveRoleUpdate(updatedRole: CareerRole): Promise<boolean> {
  const current = getActiveRoles();
  const index = current.findIndex((r) => r.id === updatedRole.id || r.roleCode === updatedRole.roleCode);
  if (index >= 0) {
    current[index] = updatedRole;
  } else {
    current.push(updatedRole);
  }
  localStorage.setItem(LOCAL_STORAGE_CUSTOM_ROLES_KEY, JSON.stringify(current));

  try {
    await saveCustomRoleToSqlite(updatedRole.roleCode, updatedRole);
  } catch (err) {
    console.warn('Failed to update role in SQLite:', err);
  }
  return true;
}

/**
 * Local storage helpers
 */
function saveReportLocally(
  report: CareerReportData,
  answers: AssessmentAnswers,
  profile: ParticipantProfile,
  participantId?: string,
  targetRoleCode?: string,
  assignedSetNumber?: number
) {
  try {
    // 1. Store full report by reference ID
    const existingReportsStr = localStorage.getItem(LOCAL_STORAGE_REPORTS_KEY);
    const existingReports = existingReportsStr ? JSON.parse(existingReportsStr) : {};
    existingReports[report.referenceId] = report;
    localStorage.setItem(LOCAL_STORAGE_REPORTS_KEY, JSON.stringify(existingReports));

    // 2. Store summary record for admin list
    const existingAssessmentsStr = localStorage.getItem(LOCAL_STORAGE_ASSESSMENTS_KEY);
    const existingAssessments: AssessmentRecord[] = existingAssessmentsStr ? JSON.parse(existingAssessmentsStr) : [];

    const record: AssessmentRecord = {
      id: `local-${report.referenceId}`,
      referenceId: report.referenceId,
      participantId: participantId || report.participantId,
      participantName: profile.name || null,
      phoneNumber: profile.phone || null,
      experienceLevel: profile.experienceLevel,
      learningTime: profile.learningTime,
      workStyle: profile.workStyle,
      careerGoal: profile.careerGoal,
      status: 'completed',
      createdAt: report.completedAt,
      primaryCategory: report.primaryCategory.title || report.primaryCategory.code,
      primaryRole: report.primaryRole.title,
      targetRoleCode: targetRoleCode || report.targetRoleCode,
      assignedSetNumber: assignedSetNumber || report.assignedSetNumber,
      scores: report.scores,
      reportData: report
    };

    const updatedAssessments = [record, ...existingAssessments.filter((r) => r.referenceId !== report.referenceId)];
    localStorage.setItem(LOCAL_STORAGE_ASSESSMENTS_KEY, JSON.stringify(updatedAssessments));

    // 3. Save as current active report
    localStorage.setItem('mindlyft_last_active_ref', report.referenceId);
  } catch (e) {
    console.error('LocalStorage write failed:', e);
  }
}

/**
 * Admin Question Bank Management: Retrieve questions with custom overrides
 */
export function getAllBankQuestions(): QuizQuestion[] {
  try {
    const overridesStr = localStorage.getItem(LOCAL_STORAGE_CUSTOM_QUESTIONS_KEY);
    if (!overridesStr) return MASTER_QUESTION_BANK;

    const overrides: Record<string, Partial<QuizQuestion>> = JSON.parse(overridesStr);
    return MASTER_QUESTION_BANK.map((q) => {
      if (overrides[q.id]) {
        return {
          ...q,
          ...overrides[q.id]
        };
      }
      return q;
    });
  } catch (e) {
    return MASTER_QUESTION_BANK;
  }
}

/**
 * Admin Question Bank Management: Save updated question
 */
export async function saveQuestionUpdate(updatedQuestion: QuizQuestion): Promise<boolean> {
  try {
    const overridesStr = localStorage.getItem(LOCAL_STORAGE_CUSTOM_QUESTIONS_KEY);
    const overrides: Record<string, Partial<QuizQuestion>> = overridesStr ? JSON.parse(overridesStr) : {};

    overrides[updatedQuestion.id] = {
      questionText: updatedQuestion.questionText,
      subtext: updatedQuestion.subtext,
      categoryFocus: updatedQuestion.categoryFocus,
      isActive: updatedQuestion.isActive,
      options: updatedQuestion.options
    };
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_QUESTIONS_KEY, JSON.stringify(overrides));
  } catch (e) {
    // ignore
  }

  try {
    await saveCustomQuestionToSqlite(updatedQuestion.id, updatedQuestion);
  } catch (err) {
    console.warn('Failed to update question in SQLite:', err);
  }
  return true;
}

/**
 * Admin Question Bank Management: Toggle active status
 */
export async function toggleQuestionStatus(questionId: string, isActive: boolean): Promise<boolean> {
  try {
    const all = getAllBankQuestions();
    const q = all.find((item) => item.id === questionId);
    if (q) {
      q.isActive = isActive;
      return saveQuestionUpdate(q);
    }
  } catch (e) {
    // ignore
  }
  return false;
}

function getReportLocally(referenceId: string): CareerReportData | null {
  try {
    const existingReportsStr = localStorage.getItem(LOCAL_STORAGE_REPORTS_KEY);
    if (!existingReportsStr) return null;
    const reports = JSON.parse(existingReportsStr);
    return reports[referenceId] || null;
  } catch (e) {
    return null;
  }
}

function getAllLocalAssessments(): AssessmentRecord[] {
  try {
    const str = localStorage.getItem(LOCAL_STORAGE_ASSESSMENTS_KEY);
    if (!str) return getPrepopulatedDemoAssessments();
    const parsed = JSON.parse(str);
    return parsed.length === 0 ? getPrepopulatedDemoAssessments() : parsed;
  } catch (e) {
    return getPrepopulatedDemoAssessments();
  }
}

/**
 * Provides 5 realistic demo assessments for instant admin dashboard evaluation
 * if no assessments have been completed yet.
 */
function getPrepopulatedDemoAssessments(): AssessmentRecord[] {
  const demos: AssessmentRecord[] = [
    {
      id: 'demo-1',
      referenceId: 'MLY-2026-X9K2B1',
      participantName: 'Samantha Chen',
      phoneNumber: '+1 (555) 349-2104',
      experienceLevel: 'beginner',
      learningTime: '5_10_hours',
      workStyle: 'independent',
      careerGoal: 'freelance',
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      primaryCategory: 'Creative & Communication',
      primaryRole: 'AI Content Creator'
    },
    {
      id: 'demo-2',
      referenceId: 'MLY-2026-P4R8T3',
      participantName: 'Marcus Bennett',
      phoneNumber: '+1 (555) 891-4432',
      experienceLevel: 'career_changer',
      learningTime: '10_20_hours',
      workStyle: 'structured',
      careerGoal: 'job_entry',
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      primaryCategory: 'Automation & Tools',
      primaryRole: 'No-Code Automation Specialist'
    },
    {
      id: 'demo-3',
      referenceId: 'MLY-2026-W3L7Y5',
      participantName: 'Elena Rostova',
      phoneNumber: '+44 20 7946 0912',
      experienceLevel: 'intermediate',
      learningTime: '5_10_hours',
      workStyle: 'collaborative',
      careerGoal: 'internal_promotion',
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
      primaryCategory: 'People & Education',
      primaryRole: 'AI Trainer'
    },
    {
      id: 'demo-4',
      referenceId: 'MLY-2026-D9N1Q6',
      participantName: 'Rahul Verma',
      phoneNumber: '+91 98234 56789',
      experienceLevel: 'beginner',
      learningTime: '2_5_hours',
      workStyle: 'structured',
      careerGoal: 'job_entry',
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      primaryCategory: 'Customer Experience',
      primaryRole: 'Knowledge Base Specialist'
    },
    {
      id: 'demo-5',
      referenceId: 'MLY-2026-F2K5M8',
      participantName: 'David Kim',
      phoneNumber: '+1 (555) 482-9901',
      experienceLevel: 'advanced',
      learningTime: 'full_time',
      workStyle: 'fast_paced',
      careerGoal: 'entrepreneurship',
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
      primaryCategory: 'Data & Technology',
      primaryRole: 'AI Developer'
    }
  ];
  return demos;
}
