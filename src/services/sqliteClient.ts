import { AssessmentRecord, ParticipantProfile, AssessmentTrack } from '../types';

function getApiUrl(path: string): string {
  if (typeof window !== 'undefined' && window.location) {
    return path;
  }
  return `http://localhost:5173${path}`;
}

export interface SqliteStatus {
  connected: boolean;
  engine: string;
  databaseFile: string;
  timestamp?: string;
}

export async function checkSqliteStatus(): Promise<SqliteStatus> {
  try {
    const res = await fetch(getApiUrl('/api/sqlite/status'));
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    return {
      connected: Boolean(data.connected),
      engine: data.engine || 'SQLite',
      databaseFile: data.databaseFile || 'mindlyft.db',
      timestamp: data.timestamp
    };
  } catch (err) {
    return {
      connected: false,
      engine: 'SQLite (Offline Fallback)',
      databaseFile: 'mindlyft.db'
    };
  }
}

export async function saveAssessmentToSqlite(record: AssessmentRecord): Promise<boolean> {
  try {
    const res = await fetch(getApiUrl('/api/sqlite/assessments'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    if (!res.ok) throw new Error('Failed to save assessment to SQLite');
    const data = await res.json();
    return Boolean(data.success);
  } catch (err) {
    console.warn('SQLite save notice:', err);
    return false;
  }
}

export interface UserLeadRecord {
  name?: string | null;
  phone?: string | null;
  backgroundField?: string | null;
  educationLevel?: string | null;
  existingSkills?: string[];
  careerGoal?: string | null;
}

export async function saveUserLeadToSqlite(
  profile: UserLeadRecord,
  participantId?: string,
  track?: AssessmentTrack
): Promise<boolean> {
  try {
    const res = await fetch(getApiUrl('/api/sqlite/leads'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        participantId,
        name: profile.name || null,
        phone: profile.phone || null,
        backgroundField: profile.backgroundField || null,
        educationLevel: profile.educationLevel || null,
        existingSkills: profile.existingSkills || [],
        careerGoal: profile.careerGoal || null,
        track: track || null
      })
    });
    if (!res.ok) throw new Error('Failed to save user lead to SQLite');
    const data = await res.json();
    return Boolean(data.success);
  } catch (err) {
    console.warn('SQLite lead save notice:', err);
    return false;
  }
}

export async function fetchUserLeadsFromSqlite(): Promise<any[]> {
  try {
    const res = await fetch(getApiUrl('/api/sqlite/leads'));
    if (!res.ok) throw new Error('Failed to fetch leads from SQLite');
    const data = await res.json();
    return data.leads || [];
  } catch (err) {
    console.warn('SQLite fetch leads notice:', err);
    return [];
  }
}

export async function fetchAssessmentsFromSqlite(): Promise<AssessmentRecord[]> {
  try {
    const res = await fetch(getApiUrl('/api/sqlite/assessments'));
    if (!res.ok) throw new Error('Failed to fetch assessments from SQLite');
    const data = await res.json();
    return data.assessments || [];
  } catch (err) {
    console.warn('SQLite fetch notice:', err);
    return [];
  }
}

export async function fetchParticipantHistoryFromSqlite(participantId: string): Promise<string[]> {
  try {
    const res = await fetch(getApiUrl(`/api/sqlite/history?participantId=${encodeURIComponent(participantId)}`));
    if (!res.ok) throw new Error('Failed to fetch history from SQLite');
    const data = await res.json();
    return data.history || [];
  } catch (err) {
    return [];
  }
}

export async function saveParticipantHistoryToSqlite(participantId: string, questionIds: string[]): Promise<boolean> {
  try {
    const res = await fetch(getApiUrl('/api/sqlite/history'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participantId, questionIds })
    });
    const data = await res.json();
    return Boolean(data.success);
  } catch (err) {
    return false;
  }
}

export async function fetchCustomRolesFromSqlite(): Promise<Record<string, any>> {
  try {
    const res = await fetch(getApiUrl('/api/sqlite/roles'));
    const data = await res.json();
    return data.roles || {};
  } catch (err) {
    return {};
  }
}

export async function saveCustomRoleToSqlite(roleCode: string, data: any): Promise<boolean> {
  try {
    const res = await fetch(getApiUrl('/api/sqlite/roles'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roleCode, data })
    });
    const result = await res.json();
    return Boolean(result.success);
  } catch (err) {
    return false;
  }
}

export async function fetchCustomQuestionsFromSqlite(): Promise<Record<string, any>> {
  try {
    const res = await fetch(getApiUrl('/api/sqlite/questions'));
    const data = await res.json();
    return data.questions || {};
  } catch (err) {
    return {};
  }
}

export async function saveCustomQuestionToSqlite(questionId: string, data: any): Promise<boolean> {
  try {
    const res = await fetch(getApiUrl('/api/sqlite/questions'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, data })
    });
    const result = await res.json();
    return Boolean(result.success);
  } catch (err) {
    return false;
  }
}
