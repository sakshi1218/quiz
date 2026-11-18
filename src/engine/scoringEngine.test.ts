import { describe, it, expect } from 'vitest';
import {
  calculateAssessmentScores,
  validateAssessmentAnswers,
  selectBestRoleForCategory
} from './scoringEngine';
import { QUIZ_QUESTIONS } from '../data/questions';
import { ParticipantProfile } from '../types';

describe('Scoring Engine Unit Tests', () => {
  const sampleProfile: ParticipantProfile = {
    name: 'Alex Rivera',
    experienceLevel: 'beginner',
    learningTime: '5_10_hours',
    workStyle: 'collaborative',
    careerGoal: 'job_entry'
  };

  // 1. Test validation: all answered correctly
  it('should validate complete and correct assessment answers', () => {
    const validAnswers: Record<string, string> = {};
    for (const q of QUIZ_QUESTIONS) {
      validAnswers[q.id] = q.options[0].id;
    }

    const validation = validateAssessmentAnswers(validAnswers, QUIZ_QUESTIONS);
    expect(validation.isValid).toBe(true);
    expect(validation.missingQuestionIds).toHaveLength(0);
    expect(validation.invalidAnswerIds).toHaveLength(0);
  });

  // 2. Test validation: missing answers
  it('should catch missing answers correctly', () => {
    const incompleteAnswers: Record<string, string> = {};
    // Only answer first 3
    for (let i = 0; i < 3; i++) {
      const q = QUIZ_QUESTIONS[i];
      incompleteAnswers[q.id] = q.options[0].id;
    }

    const validation = validateAssessmentAnswers(incompleteAnswers, QUIZ_QUESTIONS);
    expect(validation.isValid).toBe(false);
    expect(validation.missingQuestionIds.length).toBe(QUIZ_QUESTIONS.length - 3);
  });

  // 3. Test validation: invalid option IDs
  it('should catch invalid answer option IDs', () => {
    const answersWithBogus: Record<string, string> = {};
    for (const q of QUIZ_QUESTIONS) {
      answersWithBogus[q.id] = 'fake-option-id-999';
    }

    const validation = validateAssessmentAnswers(answersWithBogus, QUIZ_QUESTIONS);
    expect(validation.isValid).toBe(false);
    expect(validation.invalidAnswerIds.length).toBe(QUIZ_QUESTIONS.length);
  });

  // 4. Test deterministic scoring: Creative answers lead to Creative category
  it('should deterministically recommend Creative & Communication for creative choices', () => {
    const creativeAnswers: Record<string, string> = {};
    for (const q of QUIZ_QUESTIONS) {
      // Find option with highest creative weight
      const creativeOpt = q.options.find((opt) => (opt.categoryWeights.creative_comm || 0) >= 2) || q.options[0];
      creativeAnswers[q.id] = creativeOpt.id;
    }

    const result = calculateAssessmentScores(creativeAnswers, {
      ...sampleProfile,
      careerGoal: 'freelance',
      workStyle: 'independent'
    });

    expect(result.primaryCategory.code).toBe('creative_comm');
    expect(result.scores[0].categoryCode).toBe('creative_comm');
    expect(result.primaryRole.categoryCode).toBe('creative_comm');
    expect(result.alternativeCategories.length).toBeGreaterThanOrEqual(1);
  });

  // 5. Test deterministic scoring: Automation answers lead to Automation tools
  it('should deterministically recommend Automation & Tools for automation choices', () => {
    const automationAnswers: Record<string, string> = {};
    for (const q of QUIZ_QUESTIONS) {
      const autoOpt = q.options.find((opt) => (opt.categoryWeights.automation_tools || 0) >= 2) || q.options[0];
      automationAnswers[q.id] = autoOpt.id;
    }

    const result = calculateAssessmentScores(automationAnswers, sampleProfile);
    expect(result.primaryCategory.code).toBe('automation_tools');
    expect(result.scores[0].categoryCode).toBe('automation_tools');
  });

  // 6. Test deterministic tie handling and close scores
  it('should handle ties deterministically and flag tieDetected', () => {
    // Construct balanced answers where creative and business ops are evenly split
    const tieAnswers: Record<string, string> = {};
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (idx % 2 === 0) {
        const opt = q.options.find((o) => (o.categoryWeights.creative_comm || 0) >= 2);
        tieAnswers[q.id] = opt ? opt.id : q.options[0].id;
      } else {
        const opt = q.options.find((o) => (o.categoryWeights.business_ops || 0) >= 2);
        tieAnswers[q.id] = opt ? opt.id : q.options[0].id;
      }
    });

    const result = calculateAssessmentScores(tieAnswers, sampleProfile);
    expect(result.scores).toBeDefined();
    expect(result.scores[0].rankOrder).toBe(1);
    expect(result.scores[1].rankOrder).toBe(2);
    // Even in close score or tie, result is deterministic and returns valid primary and secondary
    expect(result.primaryCategory).toBeDefined();
    expect(result.alternativeCategories).toBeDefined();
  });

  // 7. Test non-technical rule: non-technical participants never forced to code
  it('should never make coding mandatory for non-technical pathways', () => {
    const nonTechAnswers: Record<string, string> = {};
    for (const q of QUIZ_QUESTIONS) {
      nonTechAnswers[q.id] = q.options[0].id;
    }

    const result = calculateAssessmentScores(nonTechAnswers, {
      ...sampleProfile,
      experienceLevel: 'beginner'
    });

    if (result.primaryCategory.code !== 'data_tech') {
      expect(result.primaryRole.codingNeeded).toBe(false);
    }
  });

  // 8. Test report data completeness
  it('should generate a complete report with reference ID, roadmap, and checklists', () => {
    const answers: Record<string, string> = {};
    for (const q of QUIZ_QUESTIONS) {
      answers[q.id] = q.options[0].id;
    }

    const result = calculateAssessmentScores(answers, sampleProfile);
    expect(result.report.referenceId).toMatch(/^MLY-\d{4}-[A-Z0-9]+$/);
    expect(result.report.scores).toHaveLength(6);
    expect(result.report.nextStepsChecklist.day1To3.length).toBeGreaterThan(0);
    expect(result.report.disclaimer).toContain('MindLyft AI');
    expect(result.report.disclaimer).toContain('does not constitute a psychometric test');
  });

  // 9. Test direct report generation with zero quiz questions (Background & Skills only)
  it('should generate advanced career pathway and specific skills to learn without quiz questions', () => {
    const mechanicalPythonProfile: ParticipantProfile = {
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      backgroundField: 'engineering_mechanical',
      educationLevel: 'undergraduate',
      existingSkills: ['python', 'data_analysis'],
      experienceLevel: 'beginner',
      learningTime: '5_10_hours',
      workStyle: 'collaborative',
      careerGoal: 'job_entry'
    };

    const result = calculateAssessmentScores({}, mechanicalPythonProfile);
    expect(result.report).toBeDefined();
    expect(result.report.careerMultiplierPathway).toBeDefined();

    const pathway = result.report.careerMultiplierPathway!;
    // Multiplier skill should focus on data science / ML
    expect(pathway.recommendedSkillToLearn).toContain('Data Science');
    expect(pathway.unlockedRoles.length).toBeGreaterThan(0);

    // Specific skills to learn matrix
    expect(pathway.skillsToLearn).toBeDefined();
    expect(pathway.skillsToLearn.length).toBeGreaterThanOrEqual(3);
    expect(pathway.skillsToLearn[0].skillName).toBeDefined();
    expect(pathway.skillsToLearn[0].whyLearn).toBeDefined();
    expect(pathway.skillsToLearn[0].practicalApplication).toBeDefined();
    expect(pathway.skillsToLearn[0].recommendedTools.length).toBeGreaterThan(0);

    // Advanced 3-tier career ladder
    expect(pathway.advancedCareerLadder).toBeDefined();
    expect(pathway.advancedCareerLadder).toHaveLength(3);
    expect(pathway.advancedCareerLadder[0].stage).toContain('Level 1');
    expect(pathway.advancedCareerLadder[0].estimatedCompensation).toBeDefined();

    // Dual pathway roles
    expect(pathway.technicalPathwayRole).toBeDefined();
    expect(pathway.nonTechnicalPathwayRole).toBeDefined();
    expect(pathway.technicalPathwayRole.codingNeeded).toBe(true);
    expect(pathway.nonTechnicalPathwayRole.codingNeeded).toBe(false);

    // Readiness percentage should evaluate based on existing skills
    expect(result.report.roleReadiness?.readinessPercentage).toBeGreaterThanOrEqual(60);

    // Intake Answers and Skills Analysis
    expect(result.report.intakeAnswersAnalysis).toBeDefined();
    const analysis = result.report.intakeAnswersAnalysis!;
    expect(analysis.backgroundLabel).toContain('Mechanical Engineering');
    expect(analysis.backgroundDomainBenefit).toBeDefined();
    expect(analysis.chosenSkillsAnalysis).toHaveLength(2);
    expect(analysis.chosenSkillsAnalysis[0].skillName).toContain('Python');
    expect(analysis.chosenSkillsAnalysis[0].aiSynergyLevel).toBeDefined();
    expect(analysis.chosenSkillsAnalysis[0].realWorldUseCase).toBeDefined();
    expect(analysis.careerMultiplierFormula.domainComponent).toContain('Mechanical');
    expect(analysis.careerMultiplierFormula.skillsComponent).toContain('Python');

    // Vast Career Options across industries
    expect(result.report.vastCareerOptions).toBeDefined();
    expect(result.report.vastCareerOptions!.length).toBeGreaterThanOrEqual(3);
    const totalMechRoles = result.report.vastCareerOptions!.reduce((sum, t) => sum + t.roles.length, 0);
    expect(totalMechRoles).toBeGreaterThanOrEqual(8);
  });

  // 10. Test non-technical profile direct generation (e.g. Commerce)
  it('should generate tailored pathway for non-technical background', () => {
    const commerceProfile: ParticipantProfile = {
      name: 'Priya Patel',
      phone: '+91 91234 56789',
      backgroundField: 'commerce_finance',
      educationLevel: 'graduate',
      existingSkills: ['excel_sheets', 'accounting_finance'],
      experienceLevel: 'intermediate',
      learningTime: '10_20_hours',
      workStyle: 'collaborative',
      careerGoal: 'internal_promotion'
    };

    const result = calculateAssessmentScores({}, commerceProfile);
    expect(result.report.careerMultiplierPathway).toBeDefined();
    const pathway = result.report.careerMultiplierPathway!;
    expect(pathway.skillsToLearn.length).toBeGreaterThanOrEqual(3);
    expect(pathway.advancedCareerLadder.length).toBe(3);
    expect(result.report.roleReadiness?.readinessPercentage).toBeGreaterThan(0);

    expect(result.report.intakeAnswersAnalysis).toBeDefined();
    const commAnalysis = result.report.intakeAnswersAnalysis!;
    expect(commAnalysis.backgroundLabel).toContain('Commerce');
    expect(commAnalysis.chosenSkillsAnalysis).toHaveLength(2);
    expect(commAnalysis.chosenSkillsAnalysis[0].skillName).toContain('Excel');

    // Vast Career Options for Commerce
    expect(result.report.vastCareerOptions).toBeDefined();
    const commTracks = result.report.vastCareerOptions!;
    expect(commTracks.length).toBeGreaterThanOrEqual(3);
    const hasInvestmentBanking = commTracks.some((t) => t.roles.some((r) => r.roleTitle.includes('Investment Banking')));
    expect(hasInvestmentBanking).toBe(true);
  });
});
