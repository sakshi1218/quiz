import { describe, it, expect } from 'vitest';
import {
  MASTER_QUESTION_BANK,
  getQuestionsForRole,
  getQuestionsForRoleAndSet
} from '../data/questionBank';
import { CAREER_ROLES } from '../data/roles';
import { CAREER_CATEGORIES } from '../data/categories';
import {
  selectAssessmentQuestions,
  getOrCreateParticipantId
} from './questionSelector';
import { calculateAssessmentScores, validateAssessmentAnswers } from './scoringEngine';
import { ParticipantProfile, QuestionSetNumber } from '../types';

describe('Role-Specific Question Bank & Selection Engine', () => {
  const sampleProfile: ParticipantProfile = {
    name: 'Test Explorer',
    experienceLevel: 'beginner',
    learningTime: '5_10_hours',
    workStyle: 'collaborative',
    careerGoal: 'job_entry'
  };

  // Requirement 1 & 2 & 3: 18 roles, 4 sets, 15 unique questions per set = 1,080 questions
  it('should have exactly 1,080 total questions across 18 roles, 4 sets, and 15 questions/set', () => {
    expect(MASTER_QUESTION_BANK.length).toBe(1080);
    expect(CAREER_ROLES.length).toBe(18);
    expect(CAREER_CATEGORIES.length).toBe(6);

    for (const role of CAREER_ROLES) {
      const roleQuestions = getQuestionsForRole(role.roleCode);
      expect(roleQuestions.length).toBe(60); // 4 sets * 15

      const setNumbers: QuestionSetNumber[] = [1, 2, 3, 4];
      for (const setNum of setNumbers) {
        const setQuestions = getQuestionsForRoleAndSet(role.roleCode, setNum);
        expect(setQuestions.length).toBe(15);
      }
    }
  });

  // Requirement 3: No duplicate questions within a role's four sets
  it('should have no duplicate question IDs or question texts across the 1,080 bank', () => {
    const idSet = new Set<string>();
    const textSet = new Set<string>();

    for (const q of MASTER_QUESTION_BANK) {
      expect(idSet.has(q.id)).toBe(false);
      idSet.add(q.id);

      expect(textSet.has(q.questionText)).toBe(false);
      textSet.add(q.questionText);

      // Verify each question has exactly 4 options
      expect(q.options.length).toBe(4);

      // Verify options have valid score weights (0-3)
      for (const opt of q.options) {
        expect(opt.scoreWeight).toBeGreaterThanOrEqual(0);
        expect(opt.scoreWeight).toBeLessThanOrEqual(3);
        expect(opt.label.trim().length).toBeGreaterThan(0);
      }
    }

    expect(idSet.size).toBe(1080);
    expect(textSet.size).toBe(1080);
  });

  // Requirement 2 & 6: selectAssessmentQuestions returns exactly 15 questions
  it('should always select exactly 15 questions for any role assessment', () => {
    for (const role of CAREER_ROLES) {
      const result = selectAssessmentQuestions({
        participantId: 'part_test_user_1',
        targetRoleCode: role.roleCode
      });

      expect(result.questions.length).toBe(15);
      expect(result.questions.every((q) => q.roleCode === role.roleCode)).toBe(true);

      // Check unique question IDs in the 15 selected
      const selectedIds = new Set(result.questions.map((q) => q.id));
      expect(selectedIds.size).toBe(15);
    }
  });

  it('should always select exactly 15 questions in general discovery mode', () => {
    const result = selectAssessmentQuestions({
      participantId: 'part_test_user_discovery'
    });

    expect(result.questions.length).toBe(15);
    const selectedIds = new Set(result.questions.map((q) => q.id));
    expect(selectedIds.size).toBe(15);
  });

  // Requirement 7 & 8: Track previously presented question IDs and avoid repeating
  it('should avoid repeating previously seen questions when unused questions remain', () => {
    const roleCode = 'ai_content_creator';
    const set1Questions = getQuestionsForRoleAndSet(roleCode, 1);
    const set1Ids = set1Questions.map((q) => q.id);

    // Provide Set 1 IDs as history
    const result = selectAssessmentQuestions({
      participantId: 'part_repeat_test',
      targetRoleCode: roleCode,
      historyQuestionIds: set1Ids
    });

    expect(result.questions.length).toBe(15);
    // None of the selected questions should be from Set 1 if 45 questions remain unused
    const hasRepeated = result.questions.some((q) => set1Ids.includes(q.id));
    expect(hasRepeated).toBe(false);
  });

  // Requirement 12: Fallback strategy when fewer than 15 unused questions remain
  it('should strictly return exactly 15 questions using fallback when unused pool < 15', () => {
    const roleCode = 'ai_content_creator';
    const allRoleQuestions = getQuestionsForRole(roleCode);
    expect(allRoleQuestions.length).toBe(60);
    // Mark 50 of the 60 questions as already seen, leaving only 10 unused
    const seen50 = allRoleQuestions.slice(0, 50).map((q) => q.id);

    const result = selectAssessmentQuestions({
      participantId: 'part_fallback_test',
      targetRoleCode: roleCode,
      historyQuestionIds: seen50
    });

    expect(result.questions.length).toBe(15);
    expect(result.isFallbackUsed).toBe(true);
    expect(result.selectionSummary).toContain('fallback');

    // All 15 returned questions should have unique order indices 1..15
    const indices = result.questions.map((q) => q.orderIndex);
    expect(indices).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  });

  // Requirement 8: Stable anonymous participant ID
  it('should generate or retrieve a stable anonymous participant ID', () => {
    const id = getOrCreateParticipantId();
    expect(id).toMatch(/^part_/);
  });

  // Requirement 9, 10, 11: 15-question deterministic scoring and report generation
  it('should calculate deterministic scoring and role-readiness for a 15-question submission', () => {
    const roleCode = 'ai_workflow_specialist';
    const { questions } = selectAssessmentQuestions({
      participantId: 'part_scoring_test',
      targetRoleCode: roleCode
    });

    expect(questions.length).toBe(15);

    // Select the highest-weighted option for each question
    const answers: Record<string, string> = {};
    questions.forEach((q) => {
      // Find option with scoreWeight 3
      const bestOpt = q.options.find((o) => o.scoreWeight === 3) || q.options[0];
      answers[q.id] = bestOpt.id;
    });

    const validation = validateAssessmentAnswers(answers, questions);
    expect(validation.isValid).toBe(true);

    const result = calculateAssessmentScores(answers, sampleProfile, questions, {
      participantId: 'part_scoring_test',
      targetRoleCode: roleCode,
      assignedSetNumber: 1
    });

    expect(result.report.referenceId).toMatch(/^MLY-\d{4}-[A-Z0-9]+$/);
    expect(result.roleReadiness).toBeDefined();
    expect(result.roleReadiness?.readinessPercentage).toBeGreaterThanOrEqual(70);
    expect(result.roleReadiness?.readinessLevel).toBe('High Fit');
    expect(result.roleReadiness?.skillStrengths.length).toBeGreaterThan(0);
    expect(result.report.assignedSetNumber).toBe(1);
    expect(result.report.participantId).toBe('part_scoring_test');
  });

  // Non-technical roles rule (Requirement 5)
  it('should not require coding for non-technical roles', () => {
    const nonTechRoles = CAREER_ROLES.filter((r) => !r.codingNeeded);
    expect(nonTechRoles.length).toBeGreaterThanOrEqual(8);

    for (const role of nonTechRoles) {
      const questions = getQuestionsForRole(role.roleCode);
      for (const q of questions) {
        // Confirm questions don't require technical code syntax
        expect(q.questionText).not.toMatch(/write a python function|import tensorflow|declare a pointer/i);
      }
    }
  });

  // Background and Skills Tailored Assessment (User Request: Mechanical with Python coding)
  it('should tailor questions and recommend appropriate technical role for a Mechanical Engineering candidate with Python skills', () => {
    const mechanicalCoderProfile: ParticipantProfile = {
      name: 'Mechanical Python Explorer',
      backgroundField: 'engineering_mechanical',
      educationLevel: 'graduate',
      existingSkills: ['python', 'data_analysis'],
      experienceLevel: 'intermediate',
      learningTime: '10_20_hours',
      workStyle: 'structured',
      careerGoal: 'job_entry'
    };

    // 1. Question selection tailored to background and skills
    const selection = selectAssessmentQuestions({
      participantId: 'part_mech_coder',
      profile: mechanicalCoderProfile
    });

    expect(selection.questions.length).toBe(15);
    // Should include questions from data_tech or automation_tools
    const relevantCount = selection.questions.filter(
      (q) => q.categoryCode === 'data_tech' || q.categoryCode === 'automation_tools' || q.categoryCode === 'business_ops'
    ).length;
    expect(relevantCount).toBeGreaterThanOrEqual(10);

    // 2. Select answers matching technical choices
    const answers: Record<string, string> = {};
    selection.questions.forEach((q) => {
      const opt = q.options.find((o) => (o.categoryWeights.data_tech || 0) > 0 || (o.categoryWeights.automation_tools || 0) > 0) || q.options[0];
      answers[q.id] = opt.id;
    });

    // 3. Score calculation
    const scored = calculateAssessmentScores(answers, mechanicalCoderProfile, selection.questions);
    
    // Recommendations should reflect their background & skills
    expect(['data_tech', 'automation_tools']).toContain(scored.primaryCategory.code);
    expect(scored.report.profileAnalysis.strengthsSummary.some((s) => s.includes('Mechanical Engineering'))).toBe(true);
    expect(scored.report.profileAnalysis.strengthsSummary.some((s) => s.includes('Python'))).toBe(true);
  });
});
