import {
  AssessmentAnswers,
  CareerCategory,
  CareerReportData,
  CareerRole,
  CategoryCode,
  CategoryScore,
  ParticipantProfile,
  QuizQuestion,
  RoleReadinessScore,
  QuestionSetNumber,
  BackgroundField,
  ExistingSkill,
  AssessmentTrack,
  ChosenSkillAnalysis,
  CandidateIntakeAnswersAnalysis,
  CareerMultiplierPathway,
  VastCareerRoleOption,
  VastCareerTrackOption
} from '../types';
import { CAREER_CATEGORIES } from '../data/categories';
import { CAREER_ROLES } from '../data/roles';
import { QUIZ_QUESTIONS } from '../data/questions';

export interface ScoringEngineResult {
  scores: CategoryScore[];
  primaryCategory: CareerCategory;
  primaryRole: CareerRole;
  alternativeCategories: CareerCategory[];
  alternativeRoles: CareerRole[];
  allRecommendedRoles: CareerRole[];
  report: CareerReportData;
  roleReadiness?: RoleReadinessScore;
  tieDetected: boolean;
  tieResolutionDetails?: string;
}

export interface ValidateAnswersResult {
  isValid: boolean;
  missingQuestionIds: string[];
  invalidAnswerIds: string[];
}

/**
 * Validates that all questions have been answered with known option IDs
 */
export function validateAssessmentAnswers(
  answers: AssessmentAnswers,
  questions: QuizQuestion[] = QUIZ_QUESTIONS
): ValidateAnswersResult {
  const missingQuestionIds: string[] = [];
  const invalidAnswerIds: string[] = [];

  for (const q of questions) {
    const selectedOptionId = answers[q.id];
    if (!selectedOptionId) {
      missingQuestionIds.push(q.id);
      continue;
    }

    const optionExists = q.options.some((opt) => opt.id === selectedOptionId);
    if (!optionExists) {
      invalidAnswerIds.push(selectedOptionId);
    }
  }

  return {
    isValid: missingQuestionIds.length === 0 && invalidAnswerIds.length === 0,
    missingQuestionIds,
    invalidAnswerIds
  };
}

/**
 * Deterministic explanation mapping for category matches
 */
const CATEGORY_MATCH_REASONS: Record<CategoryCode, string> = {
  creative_comm:
    'Your responses reflect a strong affinity for storytelling, persuasive messaging, and multimedia generation. You excel at turning ideas into high-converting editorial, visual, and social assets.',
  business_ops:
    'Your responses show a strong orientation toward clarity, operational efficiency, and documentation hygiene. You thrive when structuring complex information into concise executive briefs, SOPs, and actionable steps.',
  automation_tools:
    'You showed consistent enthusiasm for connecting systems, visual flowcharts, and background efficiencies. You naturally look for ways to eliminate manual human clicking through no-code automations and chatbots.',
  people_edu:
    'Your choices highlight an empathetic mentor mindset. You prioritize helping teammates overcome technology anxiety, designing accessible learning materials, and guiding organizational adoption.',
  customer_exp:
    'Your responses demonstrate high user empathy and diagnostic speed. You enjoy resolving customer roadblocks with warmth and structuring self-service knowledge bases that answer queries before they escalate.',
  data_tech:
    'Your answers show an analytical, systems-oriented mindset that enjoys interrogating datasets, formulating hypotheses, and translating technical logic into functional software features or data models.'
};

/**
 * Background field → category affinity boosts.
 * A person's educational/professional background naturally aligns with certain AI career categories.
 */
const BACKGROUND_CATEGORY_BOOSTS: Record<BackgroundField, Partial<Record<CategoryCode, number>>> = {
  engineering_mechanical:   { automation_tools: 2.0, data_tech: 1.5, business_ops: 0.5 },
  engineering_civil:        { automation_tools: 1.5, business_ops: 1.5, data_tech: 1.0 },
  engineering_electrical:   { data_tech: 2.0, automation_tools: 2.0 },
  engineering_cs_it:        { data_tech: 3.0, automation_tools: 2.0 },
  commerce_finance:         { business_ops: 2.5, data_tech: 1.0, customer_exp: 1.0 },
  arts_humanities:          { creative_comm: 3.0, people_edu: 1.0 },
  science_research:         { data_tech: 2.0, business_ops: 1.0, people_edu: 1.0 },
  healthcare_pharma:        { people_edu: 2.0, customer_exp: 1.5, data_tech: 1.0 },
  education_teaching:       { people_edu: 3.0, creative_comm: 1.0 },
  media_journalism:         { creative_comm: 3.0, customer_exp: 1.0 },
  law_legal:                { business_ops: 2.0, people_edu: 1.0, customer_exp: 1.0 },
  design_architecture:      { creative_comm: 2.5, automation_tools: 1.0 },
  management_mba:           { business_ops: 3.0, customer_exp: 1.0 },
  hospitality_tourism:      { customer_exp: 2.5, creative_comm: 1.0, people_edu: 0.5 },
  agriculture_environment:  { data_tech: 1.5, business_ops: 1.0, people_edu: 1.0 },
  other:                    {}
};

/**
 * Existing skill → category affinity boosts.
 * Skills the person already has signal which AI career categories they'll transition into most effectively.
 */
const SKILL_CATEGORY_BOOSTS: Record<ExistingSkill, Partial<Record<CategoryCode, number>>> = {
  python:              { data_tech: 2.5, automation_tools: 1.5 },
  javascript:          { data_tech: 2.0, automation_tools: 1.5 },
  sql:                 { data_tech: 2.0, business_ops: 1.0 },
  excel_sheets:        { business_ops: 2.0, data_tech: 1.0 },
  data_analysis:       { data_tech: 2.5, business_ops: 1.0 },
  graphic_design:      { creative_comm: 2.5 },
  video_editing:       { creative_comm: 2.0 },
  content_writing:     { creative_comm: 2.5, people_edu: 0.5 },
  social_media:        { creative_comm: 2.0, customer_exp: 1.0 },
  project_management:  { business_ops: 2.0, people_edu: 1.0 },
  public_speaking:     { people_edu: 2.0, creative_comm: 1.0 },
  sales_marketing:     { customer_exp: 2.0, creative_comm: 1.0, business_ops: 0.5 },
  customer_service:    { customer_exp: 2.5, people_edu: 0.5 },
  teaching_training:   { people_edu: 2.5, creative_comm: 0.5 },
  research_analysis:   { data_tech: 1.5, business_ops: 1.5 },
  accounting_finance:  { business_ops: 2.0, data_tech: 1.0 },
  html_css:            { data_tech: 1.5, creative_comm: 1.0, automation_tools: 1.0 },
  no_code_tools:       { automation_tools: 2.5, business_ops: 0.5 },
  chatgpt_ai_tools:    { creative_comm: 1.0, automation_tools: 1.0, business_ops: 1.0 },
  none:                {}
};

/**
 * Core Deterministic Scoring Engine
 */
export interface ScoringOptions {
  targetRoleCode?: string;
  assignedSetNumber?: QuestionSetNumber;
  participantId?: string;
  track?: AssessmentTrack;
}

export function calculateAssessmentScores(
  answers: AssessmentAnswers,
  profile: ParticipantProfile,
  questions: QuizQuestion[] = QUIZ_QUESTIONS,
  categoriesOrOptions: CareerCategory[] | ScoringOptions = CAREER_CATEGORIES,
  roles: CareerRole[] = CAREER_ROLES,
  scoringOptions?: ScoringOptions
): ScoringEngineResult {
  let categories: CareerCategory[] = CAREER_CATEGORIES;
  let effectiveOptions = scoringOptions;

  if (Array.isArray(categoriesOrOptions)) {
    categories = categoriesOrOptions;
  } else if (categoriesOrOptions && typeof categoriesOrOptions === 'object') {
    effectiveOptions = categoriesOrOptions as ScoringOptions;
  }

  const { targetRoleCode, assignedSetNumber, participantId, track } = effectiveOptions || {};

  // 1. Initialize raw score tallies
  const rawScores: Record<CategoryCode, number> = {
    creative_comm: 0,
    business_ops: 0,
    automation_tools: 0,
    people_edu: 0,
    customer_exp: 0,
    data_tech: 0
  };

  const categoryHitCounts: Record<CategoryCode, number> = {
    creative_comm: 0,
    business_ops: 0,
    automation_tools: 0,
    people_edu: 0,
    customer_exp: 0,
    data_tech: 0
  };

  let earnedReadinessPoints = 0;
  let totalScoredQuestions = 0;
  const skillStrengths: string[] = [];
  const growthOpportunities: string[] = [];
  const roleAffinities: Record<string, number> = {};
  const studentMindsets: string[] = [];

  // 2. Accumulate weights from submitted answers
  for (const q of questions) {
    const selectedOptionId = answers[q.id];
    if (!selectedOptionId) continue;

    const option = q.options.find((opt) => opt.id === selectedOptionId);
    if (!option) continue;

    totalScoredQuestions += 1;
    const weight = option.scoreWeight !== undefined ? option.scoreWeight : 2;
    earnedReadinessPoints += weight;

    if (option.mindsetLabel && !studentMindsets.includes(option.mindsetLabel)) {
      studentMindsets.push(option.mindsetLabel);
    }

    if (weight >= 3 && q.categoryFocus) {
      if (!skillStrengths.includes(q.categoryFocus) && skillStrengths.length < 4) {
        skillStrengths.push(q.categoryFocus);
      }
    } else if (weight <= 1 && q.categoryFocus) {
      if (!growthOpportunities.includes(q.categoryFocus) && growthOpportunities.length < 4) {
        growthOpportunities.push(q.categoryFocus);
      }
    }

    // Role-specific weights for fine-grained mindset and role matching
    if (option.roleWeights) {
      for (const [rCode, rWeight] of Object.entries(option.roleWeights)) {
        if (rWeight) {
          roleAffinities[rCode] = (roleAffinities[rCode] || 0) + rWeight;
        }
      }
    }

    for (const [cat, catWeight] of Object.entries(option.categoryWeights)) {
      const code = cat as CategoryCode;
      if (rawScores[code] !== undefined && catWeight) {
        rawScores[code] += catWeight;
        categoryHitCounts[code] += 1;
      }
    }
  }

  // 3. Profile-based weighting adjustments (Deterministic, non-arbitrary adjustments)

  // 3a. Background field boost — the person's educational/professional domain
  if (profile.backgroundField && BACKGROUND_CATEGORY_BOOSTS[profile.backgroundField]) {
    const boosts = BACKGROUND_CATEGORY_BOOSTS[profile.backgroundField];
    for (const [cat, boost] of Object.entries(boosts)) {
      const code = cat as CategoryCode;
      if (rawScores[code] !== undefined && boost) {
        rawScores[code] += boost;
      }
    }
  }

  // 3b. Existing skills boost — skills the person already has
  if (profile.existingSkills && profile.existingSkills.length > 0) {
    for (const skill of profile.existingSkills) {
      const boosts = SKILL_CATEGORY_BOOSTS[skill];
      if (boosts) {
        for (const [cat, boost] of Object.entries(boosts)) {
          const code = cat as CategoryCode;
          if (rawScores[code] !== undefined && boost) {
            // Diminish each subsequent skill slightly to avoid runaway stacking
            rawScores[code] += boost * 0.6;
          }
        }
      }
    }
  }

  // 3c. Career goal adjustments
  if (profile.careerGoal === 'freelance') {
    rawScores.creative_comm += 0.5;
    rawScores.automation_tools += 0.5;
  } else if (profile.careerGoal === 'internal_promotion') {
    rawScores.business_ops += 0.5;
    rawScores.people_edu += 0.5;
  } else if (profile.careerGoal === 'job_entry') {
    rawScores.customer_exp += 0.5;
    rawScores.data_tech += 0.5;
  }

  if (profile.workStyle === 'independent') {
    rawScores.creative_comm += 0.25;
    rawScores.automation_tools += 0.25;
  } else if (profile.workStyle === 'collaborative') {
    rawScores.people_edu += 0.25;
    rawScores.customer_exp += 0.25;
  } else if (profile.workStyle === 'structured') {
    rawScores.business_ops += 0.25;
    rawScores.data_tech += 0.25;
  }

  // If a target role was assessed, give its category an alignment boost
  if (targetRoleCode) {
    const targetRole = roles.find((r) => r.roleCode === targetRoleCode);
    if (targetRole) {
      rawScores[targetRole.categoryCode] += 2.0;
    }
  }

  // Track affinity boost
  if (track === 'technical') {
    rawScores.data_tech += 2.0;
    rawScores.automation_tools += 1.5;
  } else if (track === 'non_technical') {
    rawScores.creative_comm += 1.5;
    rawScores.business_ops += 1.5;
    rawScores.people_edu += 1.0;
    rawScores.customer_exp += 1.0;
  }

  // 4. Calculate total score & normalized percentages
  const maxPossibleScore = Math.max(...Object.values(rawScores), 1);
  const totalRawSum = Object.values(rawScores).reduce((sum, val) => sum + val, 0);

  // 5. Sort categories deterministically with explicit tie-breaking rules
  const categoryOrderMap: Record<CategoryCode, number> = categories.reduce(
    (acc, cat) => ({ ...acc, [cat.code]: cat.displayOrder }),
    {} as Record<CategoryCode, number>
  );

  const sortedCategories = (Object.keys(rawScores) as CategoryCode[]).sort((a, b) => {
    const scoreDiff = rawScores[b] - rawScores[a];
    if (Math.abs(scoreDiff) > 0.001) {
      return scoreDiff;
    }

    const hitDiff = categoryHitCounts[b] - categoryHitCounts[a];
    if (hitDiff !== 0) {
      return hitDiff;
    }

    return (categoryOrderMap[a] || 0) - (categoryOrderMap[b] || 0);
  });

  const topRaw = rawScores[sortedCategories[0]];
  const secondRaw = rawScores[sortedCategories[1]];
  const tieDetected = Math.abs(topRaw - secondRaw) <= 1.0;
  const tieResolutionDetails = tieDetected
    ? `Close affinity detected between ${sortedCategories[0]} (${topRaw.toFixed(1)} pts) and ${sortedCategories[1]} (${secondRaw.toFixed(1)} pts). Secondary recommendation prioritized as a co-primary pathway.`
    : undefined;

  // 6. Identify primary and alternative categories
  const primaryCategory = categories.find((c) => c.code === sortedCategories[0]) || categories[0];
  const alternativeCategories = sortedCategories
    .slice(1, 3)
    .map((code) => categories.find((c) => c.code === code)!)
    .filter(Boolean);

  // 7. Select primary role and alternative roles
  let primaryRole: CareerRole;
  if (targetRoleCode) {
    primaryRole = roles.find((r) => r.roleCode === targetRoleCode) || roles[0];
  } else {
    primaryRole = selectBestRoleForCategory(primaryCategory.code, answers, profile, roles, roleAffinities);
  }

  const alternativeRoles = alternativeCategories
    .map((altCat) => selectBestRoleForCategory(altCat.code, answers, profile, roles, roleAffinities))
    .filter((r) => r.roleCode !== primaryRole.roleCode);

  const allRecommendedRoles = [primaryRole, ...alternativeRoles];

  // 6. Build CategoryScore array with personalized mindset rationale
  const scores: CategoryScore[] = sortedCategories.map((code, index) => {
    const cat = categories.find((c) => c.code === code)!;
    const raw = rawScores[code];
    const pct = totalRawSum > 0 ? Math.round((raw / totalRawSum) * 100) : 0;

    let matchReason = CATEGORY_MATCH_REASONS[code] || 'High alignment with your selected strengths.';
    if (index === 0 && studentMindsets.length > 0) {
      matchReason = `Your answers reflect a strong ${studentMindsets[0]} mindset. You demonstrated clear strengths in ${
        studentMindsets.slice(1, 3).join(' and ') || studentMindsets[0]
      }, aligning directly with ${primaryRole.title} (${cat ? cat.title : code}).`;
    }

    return {
      categoryCode: code,
      categoryTitle: cat ? cat.title : code,
      rawScore: Math.round(raw * 10) / 10,
      normalizedPercentage: pct,
      rankOrder: index + 1,
      isPrimary: index === 0,
      isAlternative: index === 1 || (index === 2 && rawScores[sortedCategories[2]] >= maxPossibleScore * 0.5),
      matchReason
    };
  });

  // Role Readiness Score calculation
  const maxPoints = Math.max(totalScoredQuestions * 3, 1);
  const readinessPct = totalScoredQuestions > 0
    ? Math.round((earnedReadinessPoints / maxPoints) * 100)
    : Math.min(84 + (profile.existingSkills?.filter((s) => s !== 'none').length || 0) * 3, 96);
  const readinessLevel = readinessPct >= 75 ? 'High Fit' : readinessPct >= 50 ? 'Strong Potential' : 'Developing Alignment';

  if (skillStrengths.length === 0 && profile.existingSkills) {
    for (const s of profile.existingSkills) {
      if (s === 'python') skillStrengths.push('Python & Core Coding Logic');
      else if (s === 'javascript') skillStrengths.push('Web Development & Scripting');
      else if (s === 'sql') skillStrengths.push('Database Querying & Structured Data');
      else if (s === 'data_analysis') skillStrengths.push('Quantitative Analysis & Statistics');
      else if (s === 'graphic_design') skillStrengths.push('Visual Asset & UI/UX Composition');
      else if (s === 'content_writing') skillStrengths.push('Storytelling & Creative Communication');
      else if (s === 'no_code_tools') skillStrengths.push('No-Code Automation & Tool Linking');
      else if (s === 'chatgpt_ai_tools') skillStrengths.push('AI Prompting & Model Interactions');
    }
  }

  const roleReadiness: RoleReadinessScore = {
    roleCode: primaryRole.roleCode,
    roleTitle: primaryRole.title,
    categoryCode: primaryRole.categoryCode,
    readinessPercentage: readinessPct,
    readinessLevel,
    skillStrengths: skillStrengths.length > 0 ? skillStrengths : ['Practical problem formulation', 'Core domain fundamentals'],
    growthOpportunities: growthOpportunities.length > 0 ? growthOpportunities : ['Advanced AI agent architectures', 'Multi-modal workflow orchestration']
  };

  // Determine Technical and Non-Technical pathway roles for dual-career visibility
  const technicalPathwayRole = selectBestRoleForCategory('data_tech', answers, profile, roles, roleAffinities) ||
    roles.find((r) => r.categoryCode === 'data_tech') || roles[0];
  const nonTechnicalPathwayRole = selectBestRoleForCategory('business_ops', answers, profile, roles, roleAffinities) ||
    roles.find((r) => r.categoryCode === 'creative_comm') || roles[0];

  const hasCodingOrSoftware = (profile.existingSkills?.some((s) => ['python', 'javascript', 'sql', 'html_css'].includes(s))) ||
    ['engineering_cs_it', 'engineering_electrical', 'engineering_mechanical', 'engineering_civil'].includes(profile.backgroundField || '') ||
    track === 'technical';

  const careerMultiplierPathway = hasCodingOrSoftware
    ? {
        headline: 'Career Multiplier: Combine Software Logic with Data Science',
        currentProfileHighlight: `You have strong foundations in ${
          profile.existingSkills?.includes('python') ? 'Python and coding logic' : 'engineering systems and technical reasoning'
        }.`,
        recommendedSkillToLearn: 'Data Science & Statistical Modeling (SQL, Python Pandas, ML Model Evaluation)',
        whyItExpandsOptions: 'By learning Data Science on top of your coding or technical skills, your career opportunities expand from standard programming into high-paying AI Engineering and Applied Data Science roles, multiplying your salary potential by 40%–60%!',
        unlockedRoles: [
          'AI Developer (Full-Stack & Intelligent Agents)',
          'Junior Data Analyst & Business Intelligence Specialist',
          'AI Workflow & Systems Automation Architect',
          'Applied Machine Learning Engineer'
        ],
        skillsToLearn: [
          {
            skillName: 'Data Science & Statistical Analysis (Python Pandas & NumPy)',
            category: 'data' as const,
            priority: 'Immediate (Week 1-2)' as const,
            whyLearn: 'Expands standard software scripting into data cleaning, pattern discovery, and quantitative decision modeling.',
            practicalApplication: 'Build automated data pipelines that ingest raw CSVs and output clean statistical summaries.',
            recommendedTools: ['Python', 'Pandas', 'Jupyter Notebook', 'NumPy']
          },
          {
            skillName: 'SQL Database Interrogation & Feature Extraction',
            category: 'technical' as const,
            priority: 'Next Step (Month 1)' as const,
            whyLearn: 'Over 90% of real-world AI applications pull information from relational databases before passing it to AI models.',
            practicalApplication: 'Write multi-table JOINs and window functions to prepare clean training data and business intelligence tables.',
            recommendedTools: ['PostgreSQL', 'SQLite', 'Supabase', 'DBeaver']
          },
          {
            skillName: 'LLM Orchestration, Embeddings & RAG Architecture',
            category: 'technical' as const,
            priority: 'Career Multiplier' as const,
            whyLearn: 'Allows you to build production-grade Retrieval-Augmented Generation systems that answer queries from private documents.',
            practicalApplication: 'Connect vector databases with LLM API endpoints to build a private document assistant for an engineering team.',
            recommendedTools: ['OpenAI / Claude API', 'LangChain', 'ChromaDB', 'FastAPI']
          }
        ],
        advancedCareerLadder: [
          {
            stage: 'Level 1: Entry Practitioner',
            roleTitle: 'Junior AI Developer / Data Associate',
            timeline: 'Months 1–3',
            estimatedCompensation: '₹6 – 10 LPA',
            milestoneDescription: 'Build functional scripts, connect AI APIs, and query database tables cleanly.'
          },
          {
            stage: 'Level 2: Accelerated Growth',
            roleTitle: 'AI Workflow & Data Specialist',
            timeline: 'Months 3–6',
            estimatedCompensation: '₹12 – 18 LPA',
            milestoneDescription: 'Architect multi-agent automations, RAG pipelines, and automated reporting dashboards.'
          },
          {
            stage: 'Level 3: Strategic Lead',
            roleTitle: 'Senior AI Systems & ML Solutions Architect',
            timeline: 'Year 1+',
            estimatedCompensation: '₹22 – 35+ LPA',
            milestoneDescription: 'Design enterprise-scale intelligent systems, lead technical teams, and drive AI adoption.'
          }
        ],
        technicalPathwayRole,
        nonTechnicalPathwayRole
      }
    : {
        headline: 'Career Multiplier: Supercharge Domain Expertise with No-Code AI Automation',
        currentProfileHighlight: `You bring rich domain context in ${
          profile.backgroundField ? profile.backgroundField.replace('engineering_', '').replace(/_/g, ' ') : 'business and creative communication'
        } and strategic execution.`,
        recommendedSkillToLearn: 'No-Code Automation Tools (Make.com, Zapier) & Advanced Prompt Chaining',
        whyItExpandsOptions: 'By learning no-code tools and prompt engineering, you can build end-to-end automated solutions and AI assistants without writing code, opening up executive AI Operations and AI Product leadership roles!',
        unlockedRoles: [
          'AI Content Creator & Prompt Specialist',
          'AI Business Operations & Productivity Assistant',
          'AI Adoption Coordinator & Corporate Trainer',
          'No-Code AI Automation Specialist'
        ],
        skillsToLearn: [
          {
            skillName: 'Advanced Prompt Chaining & Multi-Modal Generation',
            category: 'creative' as const,
            priority: 'Immediate (Week 1-2)' as const,
            whyLearn: 'Generates consistently high-quality copy, slide decks, and marketing assets with zero hallucination.',
            practicalApplication: 'Build a multi-prompt editorial system that turns 1 long transcript into 5 tailored social pieces.',
            recommendedTools: ['ChatGPT Plus', 'Claude', 'Canva Magic Studio', 'Midjourney']
          },
          {
            skillName: 'No-Code Workflow Automation (Make.com & Zapier)',
            category: 'automation' as const,
            priority: 'Next Step (Month 1)' as const,
            whyLearn: 'Enables you to automate business tasks, sync CRM leads, and generate weekly reports automatically without coding.',
            practicalApplication: 'Create a zero-code pipeline that triggers an AI summary every time a customer submits a feedback form.',
            recommendedTools: ['Make.com', 'Zapier', 'Notion', 'Google Workspace']
          },
          {
            skillName: 'AI Product Coordination & Team Adoption Strategy',
            category: 'business' as const,
            priority: 'Career Multiplier' as const,
            whyLearn: 'Companies need managers who can guide non-technical teams on how to adopt AI tools safely and effectively.',
            practicalApplication: 'Design an internal company AI playbook and conduct a 30-minute interactive workshop.',
            recommendedTools: ['Loom', 'Miro', 'Slack AI', 'Custom GPTs']
          }
        ],
        advancedCareerLadder: [
          {
            stage: 'Level 1: Entry Practitioner',
            roleTitle: 'AI Content & Prompt Specialist',
            timeline: 'Months 1–3',
            estimatedCompensation: '₹5 – 8 LPA',
            milestoneDescription: 'Produce professional multi-format content and maintain brand voice templates.'
          },
          {
            stage: 'Level 2: Accelerated Growth',
            roleTitle: 'AI Business Operations Specialist',
            timeline: 'Months 3–6',
            estimatedCompensation: '₹10 – 16 LPA',
            milestoneDescription: 'Streamline team workflows, deploy no-code automations, and manage AI customer systems.'
          },
          {
            stage: 'Level 3: Strategic Lead',
            roleTitle: 'AI Adoption Lead / AI Product Manager',
            timeline: 'Year 1+',
            estimatedCompensation: '₹18 – 30+ LPA',
            milestoneDescription: 'Direct organization-wide AI transformation, evaluate new tools, and lead product operations.'
          }
        ],
        technicalPathwayRole,
        nonTechnicalPathwayRole
      };

  // 8. Generate full structured report object
  const referenceId = generateReferenceId();
  const completedAt = new Date().toISOString();

  const report: CareerReportData = {
    referenceId,
    completedAt,
    participantId,
    targetRoleCode,
    track,
    assignedSetNumber,
    presentedQuestionCount: questions.length,
    roleReadiness,
    mindsetSummary: studentMindsets.length > 0 ? studentMindsets.join(' • ') : undefined,
    participantProfile: profile,
    scores,
    primaryCategory,
    primaryRole,
    alternativeRoles,
    allRecommendedRoles,
    careerMultiplierPathway,
    intakeAnswersAnalysis: generateIntakeAnswersAnalysis(profile, primaryRole, careerMultiplierPathway),
    vastCareerOptions: generateVastCareerOptions(profile, primaryRole),
    profileAnalysis: generateProfileAnalysis(profile, primaryRole, primaryCategory, studentMindsets),
    skillsPriorities: {
      immediate: primaryRole.requiredBeginnerSkills.slice(0, 3),
      next30Days: primaryRole.skillsToDevelopNext.slice(0, 3),
      longerTerm: primaryRole.progressionPathways.slice(0, 3)
    },
    nextStepsChecklist: {
      day1To3: [
        `Review your personalized ${primaryRole.title} 4-week learning roadmap.`,
        `Set up your primary tool accounts: ${primaryRole.suggestedTools.primary.slice(0, 2).join(' & ')}.`,
        `Create an exploratory workspace in Notion or Google Docs to log your daily prompts and notes.`
      ],
      week1To2: [
        `Complete Week 1 of your roadmap: "${primaryRole.fourWeekRoadmap[0]?.title || 'Foundations'}".`,
        `Draft your first working deliverables for the "${primaryRole.portfolioProject.title}".`,
        `Share your early draft or prompt template with a peer or in an AI community for constructive feedback.`
      ],
      month1: [
        `Complete all 4 weeks of the roadmap and finalize all deliverables for your portfolio project.`,
        `Publish your case study on a public Notion page, GitHub, or LinkedIn.`,
        `Update your resume and LinkedIn headline with your verified project outcomes and tool competencies.`
      ]
    },
    disclaimer:
      'This report is an educational career exploration guide generated by MindLyft AI based on your self-reported preferences, strengths, and goals. It is designed to provide actionable learning guidance and portfolio project roadmaps. It does not constitute a psychometric test, formal certification, or guarantee of employment, job placement, or compensation.'
  };

  return {
    scores,
    primaryCategory,
    primaryRole,
    alternativeCategories,
    alternativeRoles,
    allRecommendedRoles,
    report,
    roleReadiness,
    tieDetected,
    tieResolutionDetails
  };
}

/**
 * Deterministically selects the optimal role within a category based on answers and profile
 */
export function selectBestRoleForCategory(
  categoryCode: CategoryCode,
  answers: AssessmentAnswers,
  profile: ParticipantProfile,
  roles: CareerRole[] = CAREER_ROLES,
  roleAffinities: Record<string, number> = {}
): CareerRole {
  const categoryRoles = roles.filter((r) => r.categoryCode === categoryCode);
  if (categoryRoles.length === 0) {
    return roles[0];
  }

  // 1. Check direct role affinity points earned from student choices in this category
  const scoredRoles = categoryRoles
    .map((r) => ({ role: r, score: roleAffinities[r.roleCode] || 0 }))
    .filter((sr) => sr.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scoredRoles.length > 0) {
    return scoredRoles[0].role;
  }

  // 2. Category-specific heuristic matching fallback
  switch (categoryCode) {
    case 'creative_comm': {
      // If goal is freelance or marketing oriented
      if (profile.careerGoal === 'freelance') {
        return findRoleByCode(categoryRoles, 'ai_marketing_assistant') || categoryRoles[0];
      }
      // If answer indicated social media
      const isSocial = Object.values(answers).some((val) => val.includes('viral') || val.includes('social'));
      if (isSocial) {
        return findRoleByCode(categoryRoles, 'ai_social_media_specialist') || categoryRoles[0];
      }
      return findRoleByCode(categoryRoles, 'ai_content_creator') || categoryRoles[0];
    }

    case 'business_ops': {
      if (profile.workStyle === 'independent' || profile.experienceLevel === 'career_changer') {
        return findRoleByCode(categoryRoles, 'ai_research_assistant') || categoryRoles[0];
      }
      if (profile.careerGoal === 'internal_promotion') {
        return findRoleByCode(categoryRoles, 'ai_business_ops_assistant') || categoryRoles[0];
      }
      return findRoleByCode(categoryRoles, 'ai_productivity_specialist') || categoryRoles[0];
    }

    case 'automation_tools': {
      // Check if user loves chatbots
      const lovesChatbots = Object.values(answers).some((val) => val.includes('bot') || val.includes('chat'));
      if (lovesChatbots) {
        return findRoleByCode(categoryRoles, 'ai_chatbot_builder') || categoryRoles[0];
      }
      // Mechanical / engineering background professionals excel in complex workflow specialization
      if (
        profile.backgroundField === 'engineering_mechanical' ||
        profile.backgroundField === 'engineering_civil' ||
        profile.workStyle === 'structured'
      ) {
        return findRoleByCode(categoryRoles, 'ai_workflow_specialist') || categoryRoles[0];
      }
      return findRoleByCode(categoryRoles, 'no_code_automation_specialist') || categoryRoles[0];
    }

    case 'people_edu': {
      if (profile.careerGoal === 'internal_promotion') {
        return findRoleByCode(categoryRoles, 'ai_adoption_coordinator') || categoryRoles[0];
      }
      if (profile.workStyle === 'independent') {
        return findRoleByCode(categoryRoles, 'ai_learning_content_designer') || categoryRoles[0];
      }
      return findRoleByCode(categoryRoles, 'ai_trainer') || categoryRoles[0];
    }

    case 'customer_exp': {
      if (profile.workStyle === 'independent' || profile.workStyle === 'structured') {
        return findRoleByCode(categoryRoles, 'knowledge_base_specialist') || categoryRoles[0];
      }
      if (profile.experienceLevel === 'beginner') {
        return findRoleByCode(categoryRoles, 'ai_customer_support_specialist') || categoryRoles[0];
      }
      return findRoleByCode(categoryRoles, 'cx_automation_specialist') || categoryRoles[0];
    }

    case 'data_tech': {
      // Check coding skill: e.g. mechanical or other engineering graduate who knows Python or coding
      const hasCodingSkill = profile.existingSkills?.some((s) => s === 'python' || s === 'javascript' || s === 'sql');
      const technicalAnswer = Object.values(answers).some((val) => val.includes('full_code') || val.includes('code_data'));
      if (hasCodingSkill || (technicalAnswer && profile.experienceLevel !== 'beginner')) {
        return findRoleByCode(categoryRoles, 'ai_developer') || categoryRoles[0];
      }
      if (profile.existingSkills?.includes('data_analysis') || profile.existingSkills?.includes('excel_sheets')) {
        return findRoleByCode(categoryRoles, 'junior_data_analyst') || categoryRoles[0];
      }
      if (profile.workStyle === 'collaborative' || profile.careerGoal === 'internal_promotion') {
        return findRoleByCode(categoryRoles, 'ai_product_coordinator') || categoryRoles[0];
      }
      return findRoleByCode(categoryRoles, 'junior_data_analyst') || categoryRoles[0];
    }

    default:
      return categoryRoles[0];
  }
}

function findRoleByCode(roles: CareerRole[], code: string): CareerRole | undefined {
  return roles.find((r) => r.roleCode === code);
}

function generateReferenceId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let random = '';
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const year = new Date().getFullYear();
  return `MLY-${year}-${random}`;
}

function generateProfileAnalysis(
  profile: ParticipantProfile,
  role: CareerRole,
  category: CareerCategory,
  studentMindsets: string[] = []
) {
  const backgroundLabels: Partial<Record<BackgroundField, string>> = {
    engineering_mechanical: 'Mechanical Engineering',
    engineering_civil: 'Civil Engineering',
    engineering_electrical: 'Electrical/Electronics Engineering',
    engineering_cs_it: 'Computer Science / IT',
    commerce_finance: 'Commerce & Finance',
    arts_humanities: 'Arts & Humanities',
    science_research: 'Science & Research',
    healthcare_pharma: 'Healthcare & Pharmaceutical',
    education_teaching: 'Education & Teaching',
    media_journalism: 'Media & Journalism',
    law_legal: 'Law & Legal Studies',
    design_architecture: 'Design & Architecture',
    management_mba: 'Management / MBA',
    hospitality_tourism: 'Hospitality & Tourism',
    agriculture_environment: 'Agriculture & Environment',
    other: 'Cross-disciplinary'
  };

  const skillLabels: Partial<Record<ExistingSkill, string>> = {
    python: 'Python', javascript: 'JavaScript', sql: 'SQL',
    excel_sheets: 'Excel / Sheets', data_analysis: 'Data Analysis',
    graphic_design: 'Graphic Design', video_editing: 'Video Editing',
    content_writing: 'Content Writing', social_media: 'Social Media',
    project_management: 'Project Management', public_speaking: 'Public Speaking',
    sales_marketing: 'Sales & Marketing', customer_service: 'Customer Service',
    teaching_training: 'Teaching & Training', research_analysis: 'Research & Analysis',
    accounting_finance: 'Accounting & Finance', html_css: 'HTML/CSS',
    no_code_tools: 'No-Code Tools', chatgpt_ai_tools: 'ChatGPT & AI Tools'
  };

  const workStyleMap: Record<string, string> = {
    independent:
      'You perform at your highest potential with autonomous focus blocks and self-directed project execution.',
    collaborative:
      'You energize through cross-functional teamwork, interpersonal coaching, and active group brainstorming.',
    structured:
      'You excel when working within clear frameworks, methodical documentation, and well-defined milestone boundaries.',
    fast_paced:
      'You flourish in dynamic environments where rapid experimentation, prompt iteration, and continuous shipping take precedence.'
  };

  const goalStrategyMap: Record<string, string> = {
    freelance:
      'Focus on tangible, client-ready portfolio deliverables that demonstrate immediate commercial ROI.',
    job_entry:
      'Emphasize disciplined fundamentals, verifiable project links, and demonstrable familiarity with standard industry tools.',
    internal_promotion:
      'Leverage AI to streamline internal team bottlenecks, document SOPs, and become the recognized departmental champion.',
    entrepreneurship:
      'Combine no-code automations with generative AI to build and validate micro-products with minimal overhead.'
  };

  const learningPaceMap: Record<string, string> = {
    '2_5_hours':
      'At 2–5 hours per week, focus on 30-minute daily micro-sessions dedicated to one practical roadmap action item.',
    '5_10_hours':
      'At 5–10 hours per week, you can comfortably finish each weekly roadmap milestone and complete your portfolio project in 4 weeks.',
    '10_20_hours':
      'At 10–20 hours per week, you have high velocity to complete the primary project and build an additional alternative pathway case study.',
    full_time:
      'With full-time dedication, you can compress this roadmap into an intensive 2-week immersion sprint.'
  };

  const strengthsSummary: string[] = [];

  // Lead with background context if available
  if (profile.backgroundField && profile.backgroundField !== 'other') {
    const bgLabel = backgroundLabels[profile.backgroundField] || profile.backgroundField;
    strengthsSummary.push(`Your ${bgLabel} background provides a strong foundation for transitioning into ${role.title}.`);
  }

  // Mention existing skills that connect to the role
  if (profile.existingSkills && profile.existingSkills.length > 0 && !profile.existingSkills.includes('none')) {
    const namedSkills = profile.existingSkills
      .map((s) => skillLabels[s] || s)
      .slice(0, 4);
    strengthsSummary.push(`Your existing skills in ${namedSkills.join(', ')} directly accelerate your readiness for ${category.title} roles.`);
  }

  // Add mindset insights
  if (studentMindsets.length > 0) {
    strengthsSummary.push(`Identified Mindset: ${studentMindsets.slice(0, 2).join(' & ')}.`);
    studentMindsets.slice(2).forEach((m) => strengthsSummary.push(`Demonstrated aptitude in ${m}.`));
  }

  strengthsSummary.push(`Natural alignment with ${category.title} workflows and problem-solving methodologies.`);
  strengthsSummary.push(`Demonstrated preference for ${role.tagline.toLowerCase()}`);

  if (!profile.backgroundField && studentMindsets.length === 0) {
    strengthsSummary.push(`Practical orientation suited for ${role.codingNeeded ? 'hands-on software development' : 'accessible, no-code AI leverage'}.`);
  }

  return {
    strengthsSummary,
    workStyleAlignment: workStyleMap[profile.workStyle] || workStyleMap.independent,
    goalStrategy: goalStrategyMap[profile.careerGoal] || goalStrategyMap.job_entry,
    learningPaceGuidance: learningPaceMap[profile.learningTime] || learningPaceMap['5_10_hours']
  };
}

/**
 * Generates an in-depth analysis of candidate intake answers and chosen skills,
 * explaining exactly how their chosen skills and domain background map to AI opportunities.
 */
export function generateIntakeAnswersAnalysis(
  profile: ParticipantProfile,
  primaryRole: CareerRole,
  careerMultiplierPathway?: CareerMultiplierPathway
): CandidateIntakeAnswersAnalysis {
  const backgroundMap: Record<BackgroundField, { label: string; benefit: string }> = {
    engineering_mechanical: {
      label: '⚙️ Mechanical Engineering',
      benefit: 'Rigorous grounding in physical systems, physics simulation, thermodynamics, and numerical logic. Perfectly positions you for Industrial AI, IoT sensor analytics, robotics, and predictive maintenance engineering.'
    },
    engineering_civil: {
      label: '🏗️ Civil Engineering',
      benefit: 'Spatial planning, structural mechanics, and geometric computation fundamentals. Directly connects with Computer Vision for construction site safety, automated BIM modeling, and smart infrastructure analytics.'
    },
    engineering_electrical: {
      label: '⚡ Electrical / Electronics',
      benefit: 'Deep foundation in circuit logic, signal processing, and microcontrollers. An exceptional springboard for Edge AI, embedded machine learning, and hardware-accelerated intelligence.'
    },
    engineering_cs_it: {
      label: '💻 Computer Science / IT',
      benefit: 'Core algorithms, software architecture, and system design expertise. Immediately primes you for production AI Engineering, LLM Application development, and intelligent autonomous agents.'
    },
    commerce_finance: {
      label: '📊 Commerce & Finance',
      benefit: 'Financial mathematics, accounting logic, and business economics intuition. High-demand foundation for AI Financial Analysts, Automated Auditing, and Algorithmic Forecasting.'
    },
    arts_humanities: {
      label: '🎨 Arts & Humanities',
      benefit: 'Linguistic mastery, critical reasoning, and qualitative nuance. Directly translates into elite Prompt Architecture, AI Tone-of-Voice Alignment, and AI Ethics & Governance.'
    },
    science_research: {
      label: '🔬 Science & Research',
      benefit: 'Hypothesis testing, empirical methodology, and mathematical rigor. Prepares you for Applied Machine Learning, data experimentation, and scientific research modeling.'
    },
    healthcare_pharma: {
      label: '🏥 Healthcare & Pharma',
      benefit: 'Biomedical terminology and clinical protocol understanding. Massive market demand for AI Clinical Trial Assistants, Healthcare NLP, and Medical Diagnostics support.'
    },
    education_teaching: {
      label: '📚 Education & Teaching',
      benefit: 'Pedagogical communication and student psychology. Outstanding fit for AI Corporate Training, EdTech curriculum design, and AI Tutoring Systems.'
    },
    media_journalism: {
      label: '📰 Media & Journalism',
      benefit: 'Narrative framing, investigative research, and high-volume storytelling. Primes you for AI Content Operations, Automated Multi-Channel Publishing, and Brand Voice Architect.'
    },
    law_legal: {
      label: '⚖️ Law & Legal',
      benefit: 'Precise semantic parsing, statutory interpretation, and contract logic. High-value fit for LegalTech AI, automated contract review, and compliance verification.'
    },
    design_architecture: {
      label: '📐 Design & Architecture',
      benefit: 'Visual ergonomics, human-centered UX, and spatial styling. Directly unlocks Generative AI UI/UX Design, 3D AI modeling, and creative automation pipelines.'
    },
    management_mba: {
      label: '💼 Management / MBA',
      benefit: 'Business case modeling, cross-functional execution, and stakeholder strategy. Ideal for AI Product Managers, Enterprise AI Strategy Leads, and Operations Directors.'
    },
    hospitality_tourism: {
      label: '🏨 Hospitality & Tourism',
      benefit: 'High-touch customer empathy, service design, and international coordination. Excellent fit for AI Concierge Systems and Personalized Travel Experiences.'
    },
    agriculture_environment: {
      label: '🌾 Agriculture & Environment',
      benefit: 'Ecological modeling, sensor tracking, and environmental science. Drives AgTech AI, satellite imagery yield predictions, and climate data modeling.'
    },
    other: {
      label: '🌐 Cross-Disciplinary',
      benefit: 'Diverse perspective and adaptable problem-solving skills, unlocking hybrid roles connecting traditional domains with automated intelligence.'
    }
  };

  const educationMap: Record<string, { label: string; action: string }> = {
    undergraduate: {
      label: 'College Student (Pursuing Degree)',
      action: 'Build 2 public GitHub / live project case studies and secure a 6-month AI internship before graduation for immediate placement.'
    },
    graduate: {
      label: "Bachelor's Degree Graduate",
      action: 'Package end-to-end projects demonstrating measurable business impact or automated pipelines to secure direct entry-level AI job offers.'
    },
    postgraduate: {
      label: 'Postgraduate (Masters / MBA)',
      action: 'Target accelerated mid-level positions (₹12–18 LPA) by uniting your specialized masters domain with enterprise AI system leadership.'
    },
    diploma: {
      label: 'Vocational / Polytechnic Diploma',
      action: 'Focus on applied practical tooling, speed of delivery, and live portfolio links to outshine traditional credential barriers.'
    },
    phd: {
      label: 'Ph.D. / Research Scholar',
      action: 'Publish applied benchmarks, bridge theoretical models with real-world industry APIs, and target Senior AI Scientist roles.'
    },
    high_school: {
      label: 'High School / Early Explorer',
      action: 'Start early by mastering prompt chaining and no-code tools to freelance and build commercial proof-of-work ahead of peers.'
    },
    self_taught: {
      label: 'Self-Taught / Non-Traditional',
      action: 'Your portfolio is your degree. Three deployed projects with clear documentation will open doors across fast-moving AI startups.'
    }
  };

  const skillMetaMap: Record<ExistingSkill, { name: string; badge: string; relevance: string; synergy: ChosenSkillAnalysis['aiSynergyLevel']; useCase: string }> = {
    python: {
      name: 'Python Programming',
      badge: '🐍 Coding',
      relevance: 'The undisputed #1 programming language for modern AI. Powers model APIs, PyTorch, LangChain, and data manipulation.',
      synergy: 'High Leverage Asset',
      useCase: 'Writing scripts to connect LLM endpoints with PostgreSQL and preprocess raw datasets.'
    },
    javascript: {
      name: 'JavaScript / Web Tech',
      badge: '🌐 Coding',
      relevance: 'Powers modern full-stack AI user experiences with Next.js, Vercel AI SDK, and browser extensions.',
      synergy: 'High Leverage Asset',
      useCase: 'Building interactive streaming chat interfaces and deploying client-side browser AI agents.'
    },
    sql: {
      name: 'SQL & Database Querying',
      badge: '🗄️ Data',
      relevance: 'Over 90% of enterprise AI applications pull their context from relational SQL databases.',
      synergy: 'Crucial Foundation',
      useCase: 'Writing multi-table queries to build accurate retrieval contexts and training datasets.'
    },
    data_analysis: {
      name: 'Data Analysis & Statistics',
      badge: '📈 Data',
      relevance: 'Essential for evaluating model hallucinations, tracking feature distributions, and understanding metrics.',
      synergy: 'Core Advantage',
      useCase: 'Performing exploratory data analysis to isolate anomalies and validate AI agent outputs.'
    },
    excel_sheets: {
      name: 'Excel / Google Sheets',
      badge: '📊 Tools',
      relevance: 'Rapid prototyping of prompt evaluation matrices, cost estimations, and structured test cases.',
      synergy: 'Crucial Foundation',
      useCase: 'Benchmarking prompt quality and testing structured JSON outputs across sample queries.'
    },
    html_css: {
      name: 'HTML / CSS Styling',
      badge: '💻 Tech',
      relevance: 'Enables you to build web interfaces and dashboards for AI tools without waiting for front-end teams.',
      synergy: 'Crucial Foundation',
      useCase: 'Designing intuitive web UI chat components and interactive analytics widgets.'
    },
    chatgpt_ai_tools: {
      name: 'ChatGPT / Claude Prompting',
      badge: '🤖 AI',
      relevance: 'Direct mastery of prompt engineering, system instructions, few-shot prompting, and persona design.',
      synergy: 'Core Advantage',
      useCase: 'Crafting production prompts with structured JSON output constraints and low hallucination rates.'
    },
    no_code_tools: {
      name: 'No-Code Tools (Make, Zapier)',
      badge: '⚡ Automation',
      relevance: 'Enables non-developers to link LLM APIs with CRMs, Slack, email, and Notion to deliver end-to-end automations.',
      synergy: 'High Leverage Asset',
      useCase: 'Connecting webhook triggers from Google Forms to GPT-4o for automated lead qualification.'
    },
    graphic_design: {
      name: 'Graphic Design (Canva / Figma)',
      badge: '🎨 Creative',
      relevance: 'Critical for multi-modal AI generation, visual prompt curation, and AI brand design consistency.',
      synergy: 'Core Advantage',
      useCase: 'Generating brand-consistent marketing visuals with Midjourney and enhancing them in Figma.'
    },
    video_editing: {
      name: 'Video Editing & Production',
      badge: '🎬 Media',
      relevance: 'Powers the next wave of generative video, voice cloning, and automated long-form repurposing.',
      synergy: 'High Leverage Asset',
      useCase: 'Using Runway and ElevenLabs to turn written blog posts into engaging short-form video content.'
    },
    content_writing: {
      name: 'Content Writing & Storytelling',
      badge: '✍️ Writing',
      relevance: 'The ultimate editorial filter for LLM outputs, ensuring emotional resonance, clarity, and authority.',
      synergy: 'Core Advantage',
      useCase: 'Synthesizing raw AI output into compelling thought-leadership articles and high-converting copy.'
    },
    social_media: {
      name: 'Social Media & Community',
      badge: '📱 Marketing',
      relevance: 'Automates content scheduling, audience sentiment tracking, and viral pattern analysis.',
      synergy: 'High Leverage Asset',
      useCase: 'Deploying an automated content distribution system that adapts one article for 4 social platforms.'
    },
    project_management: {
      name: 'Project Management & Planning',
      badge: '📋 Ops',
      relevance: 'Agile execution of AI sprints, managing tool integration timelines, and cross-functional coordination.',
      synergy: 'High Leverage Asset',
      useCase: 'Leading cross-functional sprints to implement internal AI knowledge search systems.'
    },
    accounting_finance: {
      name: 'Accounting & Finance',
      badge: '💰 Finance',
      relevance: 'Calculating AI return-on-investment (ROI), token cost projections, and financial modeling.',
      synergy: 'Core Advantage',
      useCase: 'Building an ROI calculator evaluating headcount savings vs AI API token expenditures.'
    },
    sales_marketing: {
      name: 'Sales & Client Communication',
      badge: '🤝 Business',
      relevance: 'Deploying AI outbound agents, automated lead nurturing, and client presentation storytelling.',
      synergy: 'High Leverage Asset',
      useCase: 'Implementing automated AI email responders that personalize outreach based on prospect LinkedIn data.'
    },
    customer_service: {
      name: 'Customer Support & Empathy',
      badge: '🎧 Service',
      relevance: 'Designing empathetic escalation pathways and training conversational customer support bots.',
      synergy: 'Crucial Foundation',
      useCase: 'Creating multi-turn chatbot flows that resolve 70% of tier-1 support queries autonomously.'
    },
    teaching_training: {
      name: 'Teaching & Mentoring Others',
      badge: '🧑‍🏫 People',
      relevance: 'Guiding corporate teams through AI change management, prompt workshops, and adoption roadmaps.',
      synergy: 'Core Advantage',
      useCase: 'Conducting department-wide AI upskilling bootcamps and authoring internal best-practice playbooks.'
    },
    research_analysis: {
      name: 'Research & Literature Analysis',
      badge: '🔍 Research',
      relevance: 'Benchmarking new foundation models, evaluating research papers, and comparative feature matrix analysis.',
      synergy: 'Core Advantage',
      useCase: 'Authoring comparative evaluations between closed-source and open-source models for enterprise tasks.'
    },
    public_speaking: {
      name: 'Public Speaking & Presentations',
      badge: '🎙️ Speaking',
      relevance: 'Essential for presenting AI proposals to non-technical executive stakeholders.',
      synergy: 'Core Advantage',
      useCase: 'Delivering compelling demos showing AI ROI to departmental heads.'
    },
    none: {
      name: 'Fresh Start / Beginner',
      badge: '🌱 Fresh Start',
      relevance: 'Zero technical debt or legacy bias—ready to adopt modern AI workflow conventions directly.',
      synergy: 'Fresh Foundation',
      useCase: 'Following our step-by-step roadmap to acquire high-value AI tooling from day one.'
    }
  };

  const familiarityMap: Record<string, { label: string; rec: string }> = {
    beginner: {
      label: 'Beginner / Curious Explorer',
      rec: 'Focus on high-impact hands-on prompt interfaces and practical tasks before diving into deep math or complex infrastructure.'
    },
    intermediate: {
      label: 'Intermediate / Workflow User',
      rec: 'Level up from casual prompting to structured workflows, API integrations, and multi-step prompt chaining.'
    },
    advanced: {
      label: 'Advanced / Active Builder',
      rec: 'Focus on productionization, token cost optimization, evaluation harnesses, and multi-agent coordination.'
    },
    career_changer: {
      label: 'Career Transitioner',
      rec: 'Leverage your existing industry domain context as your unfair advantage while acquiring the modern AI tooling layer.'
    }
  };

  const goalMap: Record<string, { label: string; roadmap: string }> = {
    job_entry: {
      label: 'New AI Job / Career Entry',
      roadmap: 'Targeting a full-time corporate or startup AI specialist position (₹6–10 LPA) within 90 days.'
    },
    freelance: {
      label: 'Freelance & Client Services',
      roadmap: 'Productize 2 discrete AI deliverables (e.g. custom AI chatbots or lead scraping engines) to bill clients immediately.'
    },
    internal_promotion: {
      label: 'Internal Promotion',
      roadmap: 'Automate 1 core operational bottleneck in your current department to position yourself as the internal AI lead.'
    },
    entrepreneurship: {
      label: 'AI Products / Agency',
      roadmap: 'Develop a focused micro-SaaS or autonomous workflow agency targeting a specific vertical niche.'
    }
  };

  const bgInfo = profile.backgroundField
    ? backgroundMap[profile.backgroundField] || backgroundMap.other
    : backgroundMap.other;

  const eduInfo = profile.educationLevel
    ? educationMap[profile.educationLevel] || educationMap.undergraduate
    : educationMap.undergraduate;

  const famInfo = familiarityMap[profile.experienceLevel] || familiarityMap.beginner;
  const goalInfo = goalMap[profile.careerGoal] || goalMap.job_entry;

  const selectedSkills = profile.existingSkills && profile.existingSkills.length > 0
    ? profile.existingSkills
    : (['none'] as ExistingSkill[]);

  const chosenSkillsAnalysis: ChosenSkillAnalysis[] = selectedSkills.map((sk) => {
    const meta = skillMetaMap[sk] || skillMetaMap.none;
    return {
      skillId: sk,
      skillName: meta.name,
      badge: meta.badge,
      relevanceToAI: meta.relevance,
      aiSynergyLevel: meta.synergy,
      realWorldUseCase: meta.useCase
    };
  });

  // Calculate formula components
  const domainComponent = bgInfo.label;
  const skillNames = chosenSkillsAnalysis
    .filter((s) => s.skillId !== 'none')
    .map((s) => s.skillName.split(' ')[0]);
  const skillsComponent = skillNames.length > 0
    ? skillNames.slice(0, 2).join(' & ') + (skillNames.length > 2 ? ` (+${skillNames.length - 2} more)` : '')
    : 'Core Academic Logic';

  const learnComponent = careerMultiplierPathway
    ? careerMultiplierPathway.recommendedSkillToLearn.split('(')[0].trim()
    : 'Data Science & Applied AI';

  const resultRole = primaryRole.title;
  const salaryRange = careerMultiplierPathway?.advancedCareerLadder?.[1]?.estimatedCompensation || '₹10 – 18 LPA';

  return {
    backgroundLabel: bgInfo.label,
    backgroundDomainBenefit: bgInfo.benefit,
    educationLevelLabel: eduInfo.label,
    educationStrategicAction: eduInfo.action,
    aiFamiliarityLabel: famInfo.label,
    aiFamiliarityRecommendation: famInfo.rec,
    careerGoalLabel: goalInfo.label,
    careerGoalRoadmap: goalInfo.roadmap,
    chosenSkillsAnalysis,
    careerMultiplierFormula: {
      domainComponent,
      skillsComponent,
      learnComponent,
      resultRole,
      salaryRange
    }
  };
}

/**
 * Generates a vast spectrum of real-world career options across Core Discipline,
 * Software/Tech, Data/Analytics, Management/Strategy, and Modern Growth fields,
 * ensuring students are not restricted only to narrow AI titles.
 */
export function generateVastCareerOptions(
  profile: ParticipantProfile,
  _primaryRole: CareerRole
): VastCareerTrackOption[] {
  const bg = profile.backgroundField || 'other';

  if (bg === 'engineering_mechanical') {
    return [
      {
        trackCode: 'core_domain',
        trackTitle: 'Core Mechanical, Design & Manufacturing',
        trackBadge: '🛠️ Core Engineering',
        trackDescription: 'Traditional and advanced engineering roles in automotive, aerospace, heavy machinery, and precision manufacturing.',
        roles: [
          {
            roleTitle: 'Mechanical Design Engineer (CAD / SolidWorks / CATIA)',
            categoryTrack: 'core_domain',
            trackBadge: '🛠️ Core Design',
            salaryBand: '₹5 – 10 LPA',
            description: 'Develops 3D component models, assembly schematics, tolerance stacks, and design for manufacturing (DFM).',
            whyFitsYourBackground: 'Directly leverages your knowledge of machine design, strength of materials, and engineering drafting.',
            keySkillsToLearn: ['SolidWorks / CATIA', 'GD&T (Geometric Dimensioning)', 'DFM & DFA Standards'],
            typicalEmployers: 'Tata Motors, Mahindra, Larsen & Toubro, Bosch, Boeing'
          },
          {
            roleTitle: 'Thermal, HVAC & Energy Systems Specialist',
            categoryTrack: 'core_domain',
            trackBadge: '🔥 Thermal & Energy',
            salaryBand: '₹6 – 11 LPA',
            description: 'Designs heat exchangers, industrial HVAC loops, piping systems, and energy recovery networks.',
            whyFitsYourBackground: 'Builds upon your thermodynamics, fluid mechanics, and heat transfer coursework.',
            keySkillsToLearn: ['HVAC Load Modeling', 'Fluid Simulation', 'Energy Audit Standards'],
            typicalEmployers: 'Voltas, Daikin, Thermax, Schneider Electric, Siemens Energy'
          },
          {
            roleTitle: 'Production, Plant & Manufacturing Operations Lead',
            categoryTrack: 'core_domain',
            trackBadge: '🏭 Plant Operations',
            salaryBand: '₹5.5 – 10 LPA',
            description: 'Supervises shop-floor machining cells, takt time optimization, CNC operations, and Lean 5S standards.',
            whyFitsYourBackground: 'Combines your production technology training with hands-on mechanical machinery familiarity.',
            keySkillsToLearn: ['Six Sigma / Lean Manufacturing', 'CNC Programming', 'Production Scheduling (ERP)'],
            typicalEmployers: 'Maruti Suzuki, Bharat Forge, Godrej, Cummins India'
          }
        ]
      },
      {
        trackCode: 'modern_growth',
        trackTitle: 'Robotics, Mechatronics & Industrial Automation',
        trackBadge: '🤖 Automation & Robotics',
        trackDescription: 'High-tech intersection of mechanical linkages, electronic microcontrollers, and automated assembly systems.',
        roles: [
          {
            roleTitle: 'Robotics & Mechatronics Systems Engineer',
            categoryTrack: 'modern_growth',
            trackBadge: '🤖 Robotics',
            salaryBand: '₹8 – 16 LPA',
            description: 'Programs multi-axis robotic arms, automated guided vehicles (AGVs), and pneumatic/hydraulic actuators.',
            whyFitsYourBackground: 'Your kinematics and mechanics foundations are crucial for programming precise physical movement.',
            keySkillsToLearn: ['ROS (Robot Operating System)', 'Microcontrollers (Arduino/STM32)', 'Industrial Sensors'],
            typicalEmployers: 'KUKA, ABB, Fanuc, GreyOrange, Addverb Technologies'
          },
          {
            roleTitle: 'PLC & SCADA Industrial Automation Specialist',
            categoryTrack: 'modern_growth',
            trackBadge: '⚡ Industrial Control',
            salaryBand: '₹7 – 14 LPA',
            description: 'Codes programmable logic controllers (PLCs) and builds real-time SCADA supervisory dashboards.',
            whyFitsYourBackground: 'Integrates mechanical valve, motor, and pump operations with automated logic sequences.',
            keySkillsToLearn: ['Siemens / Allen-Bradley PLC', 'Ladder Logic', 'SCADA / HMI Interfaces'],
            typicalEmployers: 'Schneider Electric, Rockwell Automation, Honeywell, Siemens'
          },
          {
            roleTitle: 'Digital Twin & Predictive Maintenance Engineer',
            categoryTrack: 'modern_growth',
            trackBadge: '🚀 Smart Industry',
            salaryBand: '₹9 – 18 LPA',
            description: 'Models vibration, acoustic, and temperature sensor data to forecast bearing and motor failures before breakdown.',
            whyFitsYourBackground: 'Combines machine failure physics with modern data analysis and sensor telemetry.',
            keySkillsToLearn: ['Vibration Analysis', 'Python / Time-Series Data', 'Industrial IoT Protocols (MQTT/OPC-UA)'],
            typicalEmployers: 'GE Vernova, Rolls-Royce, Bosch Rexroth, Larsen & Toubro'
          }
        ]
      },
      {
        trackCode: 'tech_software',
        trackTitle: 'Software Engineering, Simulation & Tech Transition',
        trackBadge: '💻 Software & Tech',
        trackDescription: 'Transition your analytical problem-solving and coding skills into high-paying software and tech roles.',
        roles: [
          {
            roleTitle: 'Full-Stack Software Development Engineer',
            categoryTrack: 'tech_software',
            trackBadge: '🌐 Web & Software',
            salaryBand: '₹7 – 16 LPA',
            description: 'Builds responsive frontends and resilient backend API architectures powering modern software products.',
            whyFitsYourBackground: 'Engineers possess structured debugging logic and algorithmic thinking that translates directly to coding.',
            keySkillsToLearn: ['Python or TypeScript', 'React / Node.js', 'PostgreSQL / REST APIs'],
            typicalEmployers: 'Amazon, Infosys, Zoho, Freshworks, tech startups'
          },
          {
            roleTitle: 'FEA / CFD Simulation Specialist (Ansys / HyperMesh)',
            categoryTrack: 'tech_software',
            trackBadge: '🔬 Simulation',
            salaryBand: '₹7.5 – 15 LPA',
            description: 'Runs structural finite element stress analyses (FEA) and computational fluid dynamics (CFD) virtual crash tests.',
            whyFitsYourBackground: 'Directly applies finite element mathematics and continuum mechanics to virtual testing.',
            keySkillsToLearn: ['Ansys Mechanical / Fluent', 'Altair HyperMesh', 'Python Scripting for Simulation'],
            typicalEmployers: 'Altair, Ansys, Mahindra & Mahindra, Mercedes-Benz R&D India'
          },
          {
            roleTitle: 'Data Analyst & Business Intelligence Specialist',
            categoryTrack: 'data_analytics',
            trackBadge: '📈 Data & BI',
            salaryBand: '₹6 – 13 LPA',
            description: 'Transforms operational data, machine telemetry, and sales metrics into actionable executive dashboards.',
            whyFitsYourBackground: 'Engineers excel at mathematical modeling and empirical data pattern discovery.',
            keySkillsToLearn: ['SQL & Querying', 'Python (Pandas / Matplotlib)', 'PowerBI / Tableau'],
            typicalEmployers: 'Mu Sigma, Fractal Analytics, Deloitte, McKinsey Analytics'
          }
        ]
      },
      {
        trackCode: 'management_strategy',
        trackTitle: 'Techno-Commercial, Supply Chain & Operations',
        trackBadge: '💼 Management & Strategy',
        trackDescription: 'Strategic leadership roles combining engineering expertise with business planning and project management.',
        roles: [
          {
            roleTitle: 'Supply Chain & Manufacturing Operations Manager',
            categoryTrack: 'management_strategy',
            trackBadge: '📦 Supply Chain',
            salaryBand: '₹8 – 17 LPA',
            description: 'Plans global procurement, logistics routing, inventory optimization, and vendor quality audits.',
            whyFitsYourBackground: 'Understanding how physical parts are made enables you to negotiate and optimize supplier networks.',
            keySkillsToLearn: ['SAP SCM / ERP Modules', 'Logistics Optimization', 'Vendor Contract Management'],
            typicalEmployers: 'Amazon Operations, Unilever, Procter & Gamble, ITC'
          },
          {
            roleTitle: 'Technical Project / Program Manager',
            categoryTrack: 'management_strategy',
            trackBadge: '📋 Project Lead',
            salaryBand: '₹10 – 22 LPA',
            description: 'Coordinates cross-disciplinary engineering teams, manages CAPEX budgets, and drives new product introduction (NPI).',
            whyFitsYourBackground: 'Bridges technical mechanical realities with executive milestones and delivery deadlines.',
            keySkillsToLearn: ['Agile / Scrum (PMP)', 'Jira / Project Scheduling', 'CAPEX Financial Modeling'],
            typicalEmployers: 'Cummins, Whirlpool, Schneider Electric, Foxconn'
          }
        ]
      }
    ];
  }

  if (bg === 'engineering_cs_it') {
    return [
      {
        trackCode: 'core_domain',
        trackTitle: 'Core Software & Full-Stack Development',
        trackBadge: '💻 Software Engineering',
        trackDescription: 'High-throughput software engineering across web, mobile, and backend microservice platforms.',
        roles: [
          {
            roleTitle: 'Full-Stack Software Development Engineer',
            categoryTrack: 'core_domain',
            trackBadge: '🌐 Full Stack',
            salaryBand: '₹7 – 18 LPA',
            description: 'Architects scalable client interfaces and robust backend microservices handling high concurrency.',
            whyFitsYourBackground: 'Directly builds on your computer science algorithms, web programming, and data structures.',
            keySkillsToLearn: ['TypeScript / Next.js', 'Go or Java Spring Boot', 'PostgreSQL & Redis'],
            typicalEmployers: 'Microsoft, Google, Flipkart, Swiggy, Razorpay'
          },
          {
            roleTitle: 'Backend Systems & Distributed Architecture Engineer',
            categoryTrack: 'core_domain',
            trackBadge: '⚙️ Backend Systems',
            salaryBand: '₹8 – 20 LPA',
            description: 'Designs event-driven messaging queues, caching layers, and high-availability database clusters.',
            whyFitsYourBackground: 'Applies operating systems, networking protocols, and concurrency paradigms.',
            keySkillsToLearn: ['Distributed Systems Design', 'Kafka / RabbitMQ', 'gRPC & Microservices'],
            typicalEmployers: 'Uber, Amazon, PhonePe, Cred, Atlassian'
          },
          {
            roleTitle: 'Mobile App Developer (iOS / Android / Flutter)',
            categoryTrack: 'core_domain',
            trackBadge: '📱 Mobile Tech',
            salaryBand: '₹6.5 – 16 LPA',
            description: 'Engineers responsive native and cross-platform mobile apps with offline synchronization.',
            whyFitsYourBackground: 'Leverages object-oriented design and client-side lifecycle management.',
            keySkillsToLearn: ['Flutter or Swift / Kotlin', 'State Management (Riverpod/Bloc)', 'Mobile Performance Profiling'],
            typicalEmployers: 'Zomato, Spotify, Paytm, Mobile Startups'
          }
        ]
      },
      {
        trackCode: 'tech_software',
        trackTitle: 'Cloud Infrastructure, DevOps & Cybersecurity',
        trackBadge: '☁️ Cloud & Infrastructure',
        trackDescription: 'Scale and safeguard mission-critical internet systems with automated deployment and security protocols.',
        roles: [
          {
            roleTitle: 'Cloud & DevOps Engineer (AWS / Kubernetes)',
            categoryTrack: 'tech_software',
            trackBadge: '☁️ Cloud/DevOps',
            salaryBand: '₹8 – 20 LPA',
            description: 'Automates cloud infrastructure provisioning with Terraform, CI/CD pipelines, and container clusters.',
            whyFitsYourBackground: 'Capitalizes on Linux sysadmin, networking fundamentals, and automation scripting.',
            keySkillsToLearn: ['Docker & Kubernetes (K8s)', 'Terraform (IaC)', 'AWS / GCP Cloud Architecture'],
            typicalEmployers: 'Cisco, Red Hat, ThoughtWorks, Cloud Consulting Firms'
          },
          {
            roleTitle: 'Site Reliability Engineer (SRE)',
            categoryTrack: 'tech_software',
            trackBadge: '🛡️ SRE & Uptime',
            salaryBand: '₹10 – 24 LPA',
            description: 'Guarantees 99.99% system availability, disaster recovery, latency budgets, and telemetry monitoring.',
            whyFitsYourBackground: 'Merges software development with deep operating system diagnostics.',
            keySkillsToLearn: ['Prometheus / Grafana', 'Chaos Engineering', 'Linux Kernel Tuning'],
            typicalEmployers: 'Google, Salesforce, Adobe, LinkedIn'
          },
          {
            roleTitle: 'Cybersecurity Analyst & Pen-Tester',
            categoryTrack: 'tech_software',
            trackBadge: '🔒 Cybersecurity',
            salaryBand: '₹7.5 – 18 LPA',
            description: 'Discovers web application vulnerabilities, conducts penetration testing, and implements zero-trust security.',
            whyFitsYourBackground: 'Utilizes network packet analysis, cryptography, and application security principles.',
            keySkillsToLearn: ['OWASP Top 10', 'Burp Suite / Kali Linux', 'Network Forensics & SOC'],
            typicalEmployers: 'PwC, KPMG Cyber, Palo Alto Networks, Banking Security Hubs'
          }
        ]
      },
      {
        trackCode: 'data_analytics',
        trackTitle: 'Data Engineering, Machine Learning & Analytics',
        trackBadge: '📈 Data & AI',
        trackDescription: 'Extract commercial value and automated intelligence from multi-terabyte data warehouses.',
        roles: [
          {
            roleTitle: 'Big Data & Pipeline Engineer',
            categoryTrack: 'data_analytics',
            trackBadge: '🗄️ Data Pipelines',
            salaryBand: '₹9 – 22 LPA',
            description: 'Constructs ETL/ELT streaming pipelines processing billions of raw events into queryable data lakes.',
            whyFitsYourBackground: 'Applies database theory, distributed storage, and parallel computing algorithms.',
            keySkillsToLearn: ['Apache Spark / PySpark', 'Airflow Orchestration', 'Snowflake / Databricks'],
            typicalEmployers: 'Walmart Global Tech, Target, Fractal, Tiger Analytics'
          },
          {
            roleTitle: 'Machine Learning & Applied AI Engineer',
            categoryTrack: 'data_analytics',
            trackBadge: '🤖 Applied ML',
            salaryBand: '₹10 – 25 LPA',
            description: 'Trains, fine-tunes, and serves predictive models, NLP embeddings, and recommendation engines.',
            whyFitsYourBackground: 'Merges mathematical linear algebra with high-performance Python programming.',
            keySkillsToLearn: ['PyTorch / Scikit-Learn', 'FastAPI Model Serving', 'Vector DBs (Chroma/Pinecone)'],
            typicalEmployers: 'NVIDIA, Adobe Research, InMobi, AI Startups'
          }
        ]
      },
      {
        trackCode: 'management_strategy',
        trackTitle: 'Technical Product Management & Solutions Architecture',
        trackBadge: '👔 Tech Leadership',
        trackDescription: 'Steer product roadmaps, lead development squads, and design enterprise technology strategies.',
        roles: [
          {
            roleTitle: 'Technical Product Manager (TPM)',
            categoryTrack: 'management_strategy',
            trackBadge: '📋 Product Lead',
            salaryBand: '₹12 – 28 LPA',
            description: 'Defines software PRDs, translates business targets into developer backlog sprints, and owns feature KPIs.',
            whyFitsYourBackground: 'Technical credibility allows you to communicate effortlessly with both engineers and executives.',
            keySkillsToLearn: ['User Story Mapping', 'Data-Driven Product Analytics (Mixpanel)', 'Agile Sprint Leadership'],
            typicalEmployers: 'Jio, Ola, Paytm, Booking.com, Product Tech Firms'
          },
          {
            roleTitle: 'Enterprise Solutions Architect',
            categoryTrack: 'management_strategy',
            trackBadge: '🏛️ Architecture',
            salaryBand: '₹14 – 32 LPA',
            description: 'Designs complex end-to-end IT modernization blueprints for corporate enterprise clients.',
            whyFitsYourBackground: 'Comprehensive breadth across databases, cloud, and security architectures.',
            keySkillsToLearn: ['TOGAF Framework', 'Enterprise Cloud Architecture', 'C-Level Technical Pitching'],
            typicalEmployers: 'Wipro, TCS, Cognizant, AWS Professional Services'
          }
        ]
      }
    ];
  }

  if (bg === 'commerce_finance') {
    return [
      {
        trackCode: 'core_domain',
        trackTitle: 'Core Accounting, Audit & Corporate Taxation',
        trackBadge: '📊 Accounting & Tax',
        trackDescription: 'Essential financial compliance, statutory book closure, and corporate tax structuring.',
        roles: [
          {
            roleTitle: 'Chartered Accountant / Statutory Auditor',
            categoryTrack: 'core_domain',
            trackBadge: '📋 Audit & Books',
            salaryBand: '₹7 – 16 LPA',
            description: 'Executes statutory audits, evaluates internal controls, and signs off on GAAP/IndAS financial statements.',
            whyFitsYourBackground: 'Directly builds on your accounting standards, double-entry bookkeeping, and legal audit training.',
            keySkillsToLearn: ['Ind AS / IFRS Standards', 'Audit Documentation', 'ERP Accounting (SAP/Tally)'],
            typicalEmployers: 'EY, PwC, Deloitte, KPMG, Grant Thornton'
          },
          {
            roleTitle: 'Corporate Tax & GST Advisory Consultant',
            categoryTrack: 'core_domain',
            trackBadge: '⚖️ Tax Advisory',
            salaryBand: '₹6.5 – 14 LPA',
            description: 'Structures corporate tax liabilities, handles transfer pricing documentation, and files GST appeals.',
            whyFitsYourBackground: 'Applies direct and indirect taxation law and commercial compliance expertise.',
            keySkillsToLearn: ['GST Law & E-Way Billing', 'International Tax Treaties', 'Tax Controversy Advisory'],
            typicalEmployers: 'Big 4, BDO, Corporate Tax Departments'
          }
        ]
      },
      {
        trackCode: 'tech_software',
        trackTitle: 'Investment Banking, M&A & Capital Markets',
        trackBadge: '💼 Investment Banking',
        trackDescription: 'High-stakes deal structuring, corporate valuations, and stock market investment research.',
        roles: [
          {
            roleTitle: 'Investment Banking Analyst (M&A / Capital Raising)',
            categoryTrack: 'tech_software',
            trackBadge: '💼 Deals & M&A',
            salaryBand: '₹10 – 25 LPA',
            description: 'Builds Discounted Cash Flow (DCF) models, comparable company valuation metrics, and client pitchbooks.',
            whyFitsYourBackground: 'Directly utilizes corporate finance valuation theories and balance sheet diagnostics.',
            keySkillsToLearn: ['Financial Modeling & DCF', 'Pitchbook Presentation', 'LBO & Merger Modeling'],
            typicalEmployers: 'Goldman Sachs, Morgan Stanley, Avendus Capital, JM Financial'
          },
          {
            roleTitle: 'Equity Research Associate',
            categoryTrack: 'tech_software',
            trackBadge: '📈 Stock Analysis',
            salaryBand: '₹8 – 18 LPA',
            description: 'Publishes initiating-coverage reports and earnings forecasts on publicly traded companies.',
            whyFitsYourBackground: 'Leverages ratio analysis, macro-economic industry tracking, and cash flow scrutiny.',
            keySkillsToLearn: ['Three-Statement Financial Modeling', 'Sector Valuation Metrics', 'Earnings Call Analysis'],
            typicalEmployers: 'HDFC Securities, Motilal Oswal, Nomura, ICICI Securities'
          }
        ]
      },
      {
        trackCode: 'data_analytics',
        trackTitle: 'Corporate FP&A, Financial Analytics & Fintech',
        trackBadge: '📈 Financial Analytics',
        trackDescription: 'Data-driven budgeting, algorithmic financial modeling, and digital fintech payment architectures.',
        roles: [
          {
            roleTitle: 'Financial Planning & Analysis (FP&A) Specialist',
            categoryTrack: 'data_analytics',
            trackBadge: '📊 Corporate FP&A',
            salaryBand: '₹7.5 – 16 LPA',
            description: 'Designs annual operating budgets, departmental variance analyses, and CFO dashboard briefings.',
            whyFitsYourBackground: 'Combines commercial acumen with modern data visualization and spreadsheet modeling.',
            keySkillsToLearn: ['Advanced Excel & Financial Modeling', 'PowerBI / Tableau', 'Variance & EBITDA Analysis'],
            typicalEmployers: 'Flipkart, Hindustan Unilever, Genpact, Accenture Strategy'
          },
          {
            roleTitle: 'Fintech Product & Risk Analyst',
            categoryTrack: 'data_analytics',
            trackBadge: '⚡ Fintech & Risk',
            salaryBand: '₹8 – 18 LPA',
            description: 'Models credit default scoring, evaluates payment gateway fraud, and specifies neo-banking features.',
            whyFitsYourBackground: 'Merges banking regulations with modern digital platform product logic.',
            keySkillsToLearn: ['SQL for Financial Data', 'Credit Underwriting Models', 'UPI & Payment Gateways'],
            typicalEmployers: 'CRED, Pine Labs, BharatPe, Paytm, Lendingkart'
          }
        ]
      },
      {
        trackCode: 'management_strategy',
        trackTitle: 'Management Consulting & Corporate Strategy',
        trackBadge: '👔 Strategy & Consulting',
        trackDescription: 'High-level business advisory solving growth, turnaround, and operational profitability dilemmas.',
        roles: [
          {
            roleTitle: 'Management Consultant / Business Advisory',
            categoryTrack: 'management_strategy',
            trackBadge: '👔 Consulting',
            salaryBand: '₹11 – 24 LPA',
            description: 'Formulates market-entry playbooks, organizational restructuring plans, and EBITDA improvement roadmaps.',
            whyFitsYourBackground: 'Structured quantitative thinking combined with persuasive business case presentation.',
            keySkillsToLearn: ['Case Study Frameworks', 'Pyramid Principle Communication', 'Market Sizing & Pricing Strategy'],
            typicalEmployers: 'McKinsey, BCG, Bain, Kearney, Strategy&'
          }
        ]
      }
    ];
  }

  // Universal Cross-Disciplinary / Other Disciplines (Civil, Electrical, Arts, Sciences, Healthcare)
  return [
    {
      trackCode: 'core_domain',
      trackTitle: 'Core Industry & Professional Specialization',
      trackBadge: '🎓 Professional Core',
      trackDescription: 'Direct career pathways utilizing your formal academic discipline and established professional standards.',
      roles: [
        {
          roleTitle: 'Domain Project Lead & Quality Specialist',
          categoryTrack: 'core_domain',
          trackBadge: '📋 Domain Lead',
          salaryBand: '₹6 – 13 LPA',
          description: 'Oversees operational workflows, technical compliance, client deliverables, and professional quality benchmarks.',
          whyFitsYourBackground: 'Capitalizes on your primary academic training and established industry standard operating procedures.',
          keySkillsToLearn: ['Project Management (PMP/Agile)', 'Standard Operating Procedures', 'Domain Auditing'],
          typicalEmployers: 'Leading industry corporations, consultancies, and specialized firms'
        },
        {
          roleTitle: 'Technical Research & Domain Analyst',
          categoryTrack: 'core_domain',
          trackBadge: '🔍 Research & Analysis',
          salaryBand: '₹6.5 – 14 LPA',
          description: 'Conducts literature synthesis, competitive market benchmarking, and empirical evidence reports.',
          whyFitsYourBackground: 'Leverages your investigative methodology, critical evaluation, and structured documentation.',
          keySkillsToLearn: ['Empirical Research Methods', 'Data Synthesis', 'Technical Report Writing'],
          typicalEmployers: 'Research institutes, think tanks, corporate R&D wings'
        }
      ]
    },
    {
      trackCode: 'tech_software',
      trackTitle: 'Technology & Digital Transformation Pathway',
      trackBadge: '💻 Software & Digital Tech',
      trackDescription: 'Bridge your domain expertise with modern software development, web tools, and cloud platforms.',
      roles: [
        {
          roleTitle: 'Full-Stack Software Development Engineer',
          categoryTrack: 'tech_software',
          trackBadge: '🌐 Web & Tech',
          salaryBand: '₹7 – 16 LPA',
          description: 'Builds end-to-end web applications, automated business tools, and customer-facing interfaces.',
          whyFitsYourBackground: 'Your systematic problem-solving skills make learning programming languages fast and rewarding.',
          keySkillsToLearn: ['Python / JavaScript', 'React & Web Fundamentals', 'Database Queries (SQL)'],
          typicalEmployers: 'Product tech startups, IT service leaders, enterprise digital labs'
        },
        {
          roleTitle: 'No-Code Workflow & Systems Automator',
          categoryTrack: 'tech_software',
          trackBadge: '⚡ Rapid Automation',
          salaryBand: '₹6.5 – 14 LPA',
          description: 'Automates manual spreadsheets, CRMs, email sequences, and team communications without heavy code.',
          whyFitsYourBackground: 'Enables immediate high-ROI automation of business tasks in any corporate department.',
          keySkillsToLearn: ['Make.com / Zapier', 'Airtable / Notion Databases', 'API Webhooks'],
          typicalEmployers: 'Digital agencies, modern scale-ups, corporate operations divisions'
        }
      ]
    },
    {
      trackCode: 'data_analytics',
      trackTitle: 'Data Analytics & Business Intelligence',
      trackBadge: '📈 Data & BI',
      trackDescription: 'Turn raw department records, user interactions, and survey data into clear visual executive intelligence.',
      roles: [
        {
          roleTitle: 'Business Intelligence & Data Analyst',
          categoryTrack: 'data_analytics',
          trackBadge: '📊 BI & Insights',
          salaryBand: '₹6 – 13 LPA',
          description: 'Cleans messy data, models relational schemas, and designs live performance scorecards for decision makers.',
          whyFitsYourBackground: 'Every industry demands professionals who can interpret numbers and explain what actions to take.',
          keySkillsToLearn: ['SQL & Querying', 'PowerBI / Tableau', 'Excel Pivot & Statistical Modeling'],
          typicalEmployers: 'Accenture, Mu Sigma, Deloitte, e-commerce giants, BFSI institutions'
        }
      ]
    },
    {
      trackCode: 'management_strategy',
      trackTitle: 'Product, Management & Business Strategy',
      trackBadge: '💼 Management & Growth',
      trackDescription: 'Strategic leadership, stakeholder alignment, and cross-functional project management.',
      roles: [
        {
          roleTitle: 'Associate Product Manager (APM)',
          categoryTrack: 'management_strategy',
          trackBadge: '📦 Product Strategy',
          salaryBand: '₹9 – 20 LPA',
          description: 'Discovers customer pain points, writes user stories, and guides design and engineering sprints to release.',
          whyFitsYourBackground: 'Empathy for user needs paired with clear organizational planning makes you a high-value product driver.',
          keySkillsToLearn: ['Customer Journey Mapping', 'Sprint Backlog Prioritization', 'Product Analytics (Mixpanel/Amplitude)'],
          typicalEmployers: 'SaaS companies, consumer apps, digital enterprise products'
        },
        {
          roleTitle: 'Operations & Strategy Consultant',
          categoryTrack: 'management_strategy',
          trackBadge: '👔 Strategy',
          salaryBand: '₹8.5 – 18 LPA',
          description: 'Eliminates corporate operational bottlenecks, implements standard procedures, and boosts profit margins.',
          whyFitsYourBackground: 'Brings objective outsider perspective to optimize team workflows and commercial execution.',
          keySkillsToLearn: ['Business Process Reengineering', 'Financial Unit Economics', 'Executive Presentation'],
          typicalEmployers: 'Management consultancies, global corporate capability centers'
        }
      ]
    }
  ];
}
