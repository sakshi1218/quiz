import { describe, it, expect, beforeEach } from 'vitest';
import { adminExportAssessmentsCSV } from './assessmentService';
import { AssessmentRecord, ParticipantProfile } from '../types';
// @ts-ignore
import { saveAssessment, getAllAssessments, getParticipantHistory, saveParticipantHistory, saveUserLead, getAllUserLeads } from '../../server/sqliteDb.js';

describe('SQLite Database & User Information (Name and Phone) Storage', () => {
  beforeEach(() => {
    const store: Record<string, string> = {};
    if (typeof globalThis.localStorage === 'undefined') {
      Object.defineProperty(globalThis, 'localStorage', {
        value: {
          getItem: (k: string) => store[k] || null,
          setItem: (k: string, v: string) => { store[k] = String(v); },
          removeItem: (k: string) => { delete store[k]; },
          clear: () => { Object.keys(store).forEach(k => delete store[k]); }
        },
        writable: true
      });
    }
  });

  it('should accept participant profile with both name and phone number', () => {
    const profile: ParticipantProfile = {
      name: 'Aarav Patel',
      phone: '+91 98765 43210',
      experienceLevel: 'beginner',
      learningTime: '5_10_hours',
      workStyle: 'collaborative',
      careerGoal: 'job_entry'
    };

    expect(profile.name).toBe('Aarav Patel');
    expect(profile.phone).toBe('+91 98765 43210');
  });

  it('should store and retrieve assessment records in SQLite with participant name and phone number', () => {
    const testRecord = {
      id: 'test-rec-1',
      referenceId: 'MLY-2026-TEST99',
      participantId: 'part_test_001',
      participantName: 'Priya Sharma',
      phoneNumber: '+91 99887 76655',
      experienceLevel: 'intermediate',
      learningTime: '10_20_hours',
      workStyle: 'structured',
      careerGoal: 'job_entry',
      targetRoleCode: 'ai_developer',
      assignedSetNumber: 1,
      primaryCategory: 'Data & Technology',
      primaryRole: 'AI Developer',
      scores: [],
      answers: {},
      reportData: null,
      status: 'completed',
      createdAt: new Date().toISOString()
    };

    // Save to SQLite
    const result = saveAssessment(testRecord);
    expect(result.success).toBe(true);
    expect(result.referenceId).toBe('MLY-2026-TEST99');

    // Retrieve from SQLite
    const all = getAllAssessments();
    const found = all.find((r: any) => r.referenceId === 'MLY-2026-TEST99');
    expect(found).toBeDefined();
    expect(found?.participantName).toBe('Priya Sharma');
    expect(found?.phoneNumber).toBe('+91 99887 76655');
    expect(found?.primaryRole).toBe('AI Developer');
  });

  it('should track participant question history in SQLite', () => {
    const participantId = 'part_history_test_123';
    const questionIds = ['q-test-1', 'q-test-2', 'q-test-3'];

    saveParticipantHistory(participantId, questionIds);
    const history = getParticipantHistory(participantId);

    expect(history).toContain('q-test-1');
    expect(history).toContain('q-test-2');
    expect(history).toContain('q-test-3');
  });

  it('should store and retrieve user leads with background and skills in SQLite', () => {
    const lead = {
      participantId: 'part_lead_test_01',
      name: 'Rohan Verma',
      phone: '+91 91234 56789',
      backgroundField: 'engineering_mechanical',
      educationLevel: 'graduate',
      existingSkills: ['python', 'data_analysis'],
      careerGoal: 'job_entry',
      track: 'technical'
    };

    const res = saveUserLead(lead);
    expect(res.success).toBe(true);

    const leads = getAllUserLeads();
    const found = leads.find((l: any) => l.participantId === 'part_lead_test_01');
    expect(found).toBeDefined();
    expect(found?.name).toBe('Rohan Verma');
    expect(found?.phone).toBe('+91 91234 56789');
    expect(found?.backgroundField).toBe('engineering_mechanical');
    expect(found?.existingSkills).toContain('python');
    expect(found?.track).toBe('technical');
  });

  it('should include Phone / Contact Number in admin CSV export', async () => {
    const csv = await adminExportAssessmentsCSV();
    expect(csv).toContain('Phone / Contact Number');
    expect(csv).toContain('Reference ID');
    expect(csv).toContain('Participant Name');
  });
});
