import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { DatabaseSync } = require('node:sqlite');

const DB_PATH = path.resolve(process.cwd(), 'mindlyft.db');
let dbInstance = null;

export function getDb() {
  if (!dbInstance) {
    dbInstance = new DatabaseSync(DB_PATH);
    initSchema(dbInstance);
  }
  return dbInstance;
}

function initSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS assessments (
      id TEXT PRIMARY KEY,
      reference_id TEXT UNIQUE NOT NULL,
      participant_id TEXT,
      participant_name TEXT,
      phone_number TEXT,
      background_field TEXT,
      education_level TEXT,
      existing_skills_json TEXT,
      track TEXT,
      experience_level TEXT,
      learning_time TEXT,
      work_style TEXT,
      career_goal TEXT,
      target_role_code TEXT,
      assigned_set_number INTEGER,
      primary_category TEXT,
      primary_role TEXT,
      scores_json TEXT,
      answers_json TEXT,
      report_json TEXT,
      status TEXT DEFAULT 'completed',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_leads (
      id TEXT PRIMARY KEY,
      participant_id TEXT,
      name TEXT,
      phone TEXT,
      background_field TEXT,
      education_level TEXT,
      existing_skills_json TEXT,
      career_goal TEXT,
      track TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS participant_question_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      participant_id TEXT NOT NULL,
      question_id TEXT NOT NULL,
      presented_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS custom_roles (
      role_code TEXT PRIMARY KEY,
      data_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS custom_questions (
      question_id TEXT PRIMARY KEY,
      data_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // Migrate existing table to add any missing columns safely
  const cols = [
    'background_field TEXT',
    'education_level TEXT',
    'existing_skills_json TEXT',
    'track TEXT'
  ];
  for (const c of cols) {
    try {
      db.exec(`ALTER TABLE assessments ADD COLUMN ${c}`);
    } catch (e) {
      // Column already exists
    }
  }
}

export function saveAssessment(record) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO assessments (
      id, reference_id, participant_id, participant_name, phone_number,
      background_field, education_level, existing_skills_json, track,
      experience_level, learning_time, work_style, career_goal,
      target_role_code, assigned_set_number, primary_category, primary_role,
      scores_json, answers_json, report_json, status, created_at
    ) VALUES (
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?
    )
  `);

  stmt.run(
    record.id,
    record.referenceId,
    record.participantId || null,
    record.participantName || null,
    record.phoneNumber || null,
    record.backgroundField || null,
    record.educationLevel || null,
    JSON.stringify(record.existingSkills || []),
    record.track || (record.reportData && record.reportData.track) || null,
    record.experienceLevel || 'beginner',
    record.learningTime || '5_10_hours',
    record.workStyle || 'collaborative',
    record.careerGoal || 'job_entry',
    record.targetRoleCode || null,
    record.assignedSetNumber || null,
    record.primaryCategory || null,
    record.primaryRole || null,
    JSON.stringify(record.scores || []),
    JSON.stringify(record.answers || {}),
    JSON.stringify(record.reportData || null),
    record.status || 'completed',
    record.createdAt || new Date().toISOString()
  );

  return { success: true, referenceId: record.referenceId, id: record.id };
}

export function getAllAssessments() {
  const db = getDb();
  const stmt = db.prepare(`SELECT * FROM assessments ORDER BY created_at DESC`);
  const rows = stmt.all();

  return rows.map((r) => ({
    id: r.id,
    referenceId: r.reference_id,
    participantId: r.participant_id,
    participantName: r.participant_name,
    phoneNumber: r.phone_number,
    backgroundField: r.background_field,
    educationLevel: r.education_level,
    existingSkills: JSON.parse(r.existing_skills_json || '[]'),
    track: r.track,
    experienceLevel: r.experience_level,
    learningTime: r.learning_time,
    workStyle: r.work_style,
    careerGoal: r.career_goal,
    targetRoleCode: r.target_role_code,
    assignedSetNumber: r.assigned_set_number,
    primaryCategory: r.primary_category,
    primaryRole: r.primary_role,
    scores: JSON.parse(r.scores_json || '[]'),
    answers: JSON.parse(r.answers_json || '{}'),
    reportData: JSON.parse(r.report_json || 'null'),
    status: r.status,
    createdAt: r.created_at
  }));
}

export function saveUserLead(data) {
  const db = getDb();
  const id = data.id || data.participantId || `lead_${Date.now()}`;
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO user_leads (
      id, participant_id, name, phone, background_field, education_level,
      existing_skills_json, career_goal, track, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?,
      COALESCE((SELECT created_at FROM user_leads WHERE id = ?), ?),
      ?
    )
  `);

  stmt.run(
    id,
    data.participantId || null,
    data.name || null,
    data.phone || null,
    data.backgroundField || null,
    data.educationLevel || null,
    JSON.stringify(data.existingSkills || []),
    data.careerGoal || null,
    data.track || null,
    id,
    now,
    now
  );
  return { success: true, id };
}

export function getAllUserLeads() {
  const db = getDb();
  const stmt = db.prepare(`SELECT * FROM user_leads ORDER BY updated_at DESC`);
  const rows = stmt.all();
  return rows.map((r) => ({
    id: r.id,
    participantId: r.participant_id,
    name: r.name,
    phone: r.phone,
    backgroundField: r.background_field,
    educationLevel: r.education_level,
    existingSkills: JSON.parse(r.existing_skills_json || '[]'),
    careerGoal: r.career_goal,
    track: r.track,
    createdAt: r.created_at,
    updatedAt: r.updated_at
  }));
}

export function getParticipantHistory(participantId) {
  if (!participantId) return [];
  const db = getDb();
  const stmt = db.prepare(`SELECT question_id FROM participant_question_history WHERE participant_id = ?`);
  const rows = stmt.all(participantId);
  return rows.map((r) => r.question_id);
}

export function saveParticipantHistory(participantId, questionIds) {
  if (!participantId || !questionIds || questionIds.length === 0) return { success: true };
  const db = getDb();
  const now = new Date().toISOString();
  const stmt = db.prepare(`INSERT INTO participant_question_history (participant_id, question_id, presented_at) VALUES (?, ?, ?)`);
  
  for (const qid of questionIds) {
    try {
      stmt.run(participantId, qid, now);
    } catch (e) {
      // ignore individual duplicate error
    }
  }
  return { success: true };
}

export function getCustomRoles() {
  const db = getDb();
  const stmt = db.prepare(`SELECT * FROM custom_roles`);
  const rows = stmt.all();
  const result = {};
  for (const r of rows) {
    try {
      result[r.role_code] = JSON.parse(r.data_json);
    } catch (e) {}
  }
  return result;
}

export function saveCustomRole(roleCode, data) {
  const db = getDb();
  const stmt = db.prepare(`INSERT OR REPLACE INTO custom_roles (role_code, data_json, updated_at) VALUES (?, ?, ?)`);
  stmt.run(roleCode, JSON.stringify(data), new Date().toISOString());
  return { success: true };
}

export function getCustomQuestions() {
  const db = getDb();
  const stmt = db.prepare(`SELECT * FROM custom_questions`);
  const rows = stmt.all();
  const result = {};
  for (const r of rows) {
    try {
      result[r.question_id] = JSON.parse(r.data_json);
    } catch (e) {}
  }
  return result;
}

export function saveCustomQuestion(questionId, data) {
  const db = getDb();
  const stmt = db.prepare(`INSERT OR REPLACE INTO custom_questions (question_id, data_json, updated_at) VALUES (?, ?, ?)`);
  stmt.run(questionId, JSON.stringify(data), new Date().toISOString());
  return { success: true };
}
