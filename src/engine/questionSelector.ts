import { QuizQuestion, QuizOption, QuestionSetNumber, CategoryCode, AssessmentTrack, ParticipantProfile } from '../types';
import { MASTER_QUESTION_BANK, getQuestionsForRole, getQuestionsForRoleAndSet } from '../data/questionBank';
import { TECHNICAL_CAREER_QUESTIONS, NON_TECHNICAL_CAREER_QUESTIONS } from '../data/careerTrackQuestions';

const PARTICIPANT_ID_STORAGE_KEY = 'mindlyft_participant_id';

/**
 * Returns or creates a stable anonymous participant ID for history tracking without registration
 */
export function getOrCreateParticipantId(): string {
  try {
    let participantId = localStorage.getItem(PARTICIPANT_ID_STORAGE_KEY);
    if (!participantId) {
      const randomPart = Math.random().toString(36).substring(2, 12);
      const timestamp = Date.now().toString(36);
      participantId = `part_${timestamp}_${randomPart}`;
      localStorage.setItem(PARTICIPANT_ID_STORAGE_KEY, participantId);
    }
    return participantId;
  } catch (e) {
    return `part_session_${Date.now()}`;
  }
}

export interface QuestionSelectionOptions {
  participantId: string;
  targetRoleCode?: string;
  categoryCode?: CategoryCode;
  track?: AssessmentTrack;
  preferredSetNumber?: QuestionSetNumber;
  historyQuestionIds?: string[];
  shuffleOptions?: boolean;
  profile?: ParticipantProfile;
}

export interface QuestionSelectionResult {
  questions: QuizQuestion[];
  targetRoleCode?: string;
  track?: AssessmentTrack;
  assignedSetNumber?: QuestionSetNumber;
  isFallbackUsed: boolean;
  totalCandidatePoolSize: number;
  unusedCount: number;
  selectionSummary: string;
}

/**
 * Deterministic Fisher-Yates shuffle with seed or random
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Selects exactly 15 questions for an assessment with history-tracking and strict fallback
 */
export function selectAssessmentQuestions(options: QuestionSelectionOptions): QuestionSelectionResult {
  const {
    participantId,
    targetRoleCode,
    categoryCode,
    track,
    preferredSetNumber,
    historyQuestionIds = [],
    shuffleOptions = true
  } = options;

  const historySet = new Set(historyQuestionIds);

  // 1. Determine the candidate question pool for General Discovery, Track, or Role-Specific mode
  let candidatePool: QuizQuestion[] = [];
  let assignedSetNumber: QuestionSetNumber | undefined = preferredSetNumber;

  if (targetRoleCode) {
    // Specific role assessment (60 questions total across 4 sets)
    candidatePool = getQuestionsForRole(targetRoleCode);

    // If preferred set is provided, check if that set has 15 questions
    if (preferredSetNumber) {
      const setPool = getQuestionsForRoleAndSet(targetRoleCode, preferredSetNumber);
      if (setPool.length >= 15) {
        candidatePool = setPool;
      }
    } else {
      // Find sets the participant hasn't finished yet
      const setCandidates: QuestionSetNumber[] = [1, 2, 3, 4];
      const uncompletedSets = setCandidates.filter((s) => {
        const questionsInSet = getQuestionsForRoleAndSet(targetRoleCode, s);
        const unseenInSet = questionsInSet.filter((q) => !historySet.has(q.id));
        return unseenInSet.length >= 15;
      });

      if (uncompletedSets.length > 0) {
        // Pick one randomly
        assignedSetNumber = uncompletedSets[Math.floor(Math.random() * uncompletedSets.length)];
        candidatePool = getQuestionsForRoleAndSet(targetRoleCode, assignedSetNumber);
      }
    }
  } else if (categoryCode) {
    // Category pool
    candidatePool = MASTER_QUESTION_BANK.filter(
      (q) => q.categoryCode === categoryCode && q.isActive !== false
    );
  } else if (track === 'technical') {
    // Technical Track: 15 crisp, 1-liner easy-to-answer technical questions
    candidatePool = TECHNICAL_CAREER_QUESTIONS;
  } else if (track === 'non_technical') {
    // Non-Technical Track: 15 crisp, 1-liner easy-to-answer non-technical questions
    candidatePool = NON_TECHNICAL_CAREER_QUESTIONS;
  } else {
    // Open Discovery: 30 easy-to-answer 1-liner questions across both tracks
    const allEasyQuestions = [...TECHNICAL_CAREER_QUESTIONS, ...NON_TECHNICAL_CAREER_QUESTIONS];
    if (options.profile?.backgroundField || (options.profile?.existingSkills && options.profile.existingSkills.length > 0)) {
      const skills = options.profile.existingSkills || [];
      const hasCodingOrTech = skills.some((s) => ['python', 'javascript', 'sql', 'html_css', 'data_analysis'].includes(s)) ||
        ['engineering_mechanical', 'engineering_electrical', 'engineering_cs_it', 'engineering_civil'].includes(options.profile.backgroundField || '');

      if (hasCodingOrTech) {
        candidatePool = [...TECHNICAL_CAREER_QUESTIONS.slice(0, 10), ...NON_TECHNICAL_CAREER_QUESTIONS.slice(0, 5)];
      } else {
        candidatePool = [...NON_TECHNICAL_CAREER_QUESTIONS.slice(0, 10), ...TECHNICAL_CAREER_QUESTIONS.slice(0, 5)];
      }
    } else {
      candidatePool = allEasyQuestions;
    }
  }

  // Ensure candidatePool has enough items
  if (candidatePool.length === 0) {
    candidatePool = MASTER_QUESTION_BANK.filter((q) => q.isActive !== false);
  }

  // 2. Separate into Unused and Already-Presented questions
  const unusedQuestions = candidatePool.filter((q) => !historySet.has(q.id));
  const seenQuestions = candidatePool.filter((q) => historySet.has(q.id));

  let selected: QuizQuestion[] = [];
  let isFallbackUsed = false;

  // 3. Selection with strict 15-question guarantee (Requirement 12)
  if (unusedQuestions.length >= 15) {
    // Normal pathway: 15 completely unseen questions
    selected = shuffleArray(unusedQuestions).slice(0, 15);
  } else {
    // Fallback strategy: Take all available unused questions, then top up from seen questions
    isFallbackUsed = true;
    selected = [...unusedQuestions];

    const needed = 15 - selected.length;
    // Shuffle seen questions or sort by least-recently-seen
    const additional = shuffleArray(seenQuestions).slice(0, needed);
    selected.push(...additional);

    // If still under 15 (e.g. tiny test pool), borrow from master bank
    if (selected.length < 15) {
      const remainder = 15 - selected.length;
      const extra = shuffleArray(MASTER_QUESTION_BANK).slice(0, remainder);
      selected.push(...extra);
    }
  }

  // Ensure exact count is 15
  selected = selected.slice(0, 15);

  // 4. Shuffle presentation order of the 15 questions
  const finalQuestions = shuffleArray(selected).map((q, idx) => {
    // Clone and optionally shuffle options
    const clonedOptions = shuffleOptions ? shuffleArray(q.options) : [...q.options];
    return {
      ...q,
      orderIndex: idx + 1,
      options: clonedOptions
    };
  });

  const selectionSummary = isFallbackUsed
    ? `Selected 15 questions using history fallback (${unusedQuestions.length} unused + ${15 - unusedQuestions.length} recycled from candidate pool of ${candidatePool.length}).`
    : `Selected 15 unique, previously unseen questions from pool of ${unusedQuestions.length} unused items.`;

  return {
    questions: finalQuestions,
    targetRoleCode,
    track,
    assignedSetNumber,
    isFallbackUsed,
    totalCandidatePoolSize: candidatePool.length,
    unusedCount: unusedQuestions.length,
    selectionSummary
  };
}
