// Core Domain Types for MindLyft AI Career Discovery Platform

export type CategoryCode = 
  | 'creative_comm'
  | 'business_ops'
  | 'automation_tools'
  | 'people_edu'
  | 'customer_exp'
  | 'data_tech';

export type AssessmentTrack = 'technical' | 'non_technical';

export interface CareerCategory {
  id: string;
  code: CategoryCode;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  displayOrder: number;
}

export interface RoadmapWeek {
  week: number;
  title: string;
  focus: string;
  actionItems: string[];
  deliverable: string;
}

export interface PortfolioProject {
  title: string;
  scenario: string;
  deliverables: string[];
  completionCriteria: string[];
  toolsUsed: string[];
  estimatedHours: string;
}

export interface LearningResource {
  title: string;
  type: 'Course' | 'Documentation' | 'Community' | 'Interactive Tutorial' | 'Search Guide';
  provider: string;
  description: string;
  searchQuery: string;
  url?: string;
}

export interface CareerRole {
  id: string;
  roleCode: string;
  categoryId: string;
  categoryCode: CategoryCode;
  categoryTitle: string;
  title: string;
  tagline: string;
  description: string;
  typicalResponsibilities: string[];
  requiredBeginnerSkills: string[];
  skillsToDevelopNext: string[];
  suggestedTools: {
    primary: string[];
    alternatives: string[];
  };
  codingNeeded: boolean;
  codingRequirementDetails: string;
  portfolioProject: PortfolioProject;
  fourWeekRoadmap: RoadmapWeek[];
  learningResources: LearningResource[];
  portfolioEvidence: string;
  resumeInterviewPrep: string[];
  progressionPathways: string[];
  limitationsAndPrerequisites: string;
  displayOrder: number;
}

export type QuestionSetNumber = 1 | 2 | 3 | 4;
export type QuestionType = 'practical' | 'scenario' | 'problem_solving' | 'learning_readiness';

export interface QuizOption {
  id: string;
  optionCode: string;
  label: string;
  explanation?: string;
  scoreWeight?: number; // 0 to 3 readiness points
  categoryWeights: Partial<Record<CategoryCode, number>>;
  roleWeights?: Partial<Record<string, number>>;
  mindsetLabel?: string;
}

export interface QuizQuestion {
  id: string;
  questionCode: string;
  roleCode?: string;
  setNumber?: QuestionSetNumber;
  questionText: string;
  subtext?: string;
  categoryFocus?: string;
  questionType?: QuestionType;
  categoryCode?: CategoryCode;
  orderIndex: number;
  isActive?: boolean;
  options: QuizOption[];
}

export interface RoleReadinessScore {
  roleCode: string;
  roleTitle: string;
  categoryCode: CategoryCode;
  readinessPercentage: number;
  readinessLevel: 'High Fit' | 'Strong Potential' | 'Developing Alignment';
  skillStrengths: string[];
  growthOpportunities: string[];
}

export type ExperienceLevel = 'beginner' | 'intermediate' | 'career_changer' | 'advanced';
export type LearningTime = '2_5_hours' | '5_10_hours' | '10_20_hours' | 'full_time';
export type WorkStyle = 'independent' | 'collaborative' | 'structured' | 'fast_paced';
export type CareerGoal = 'freelance' | 'job_entry' | 'internal_promotion' | 'entrepreneurship';

export type BackgroundField =
  | 'engineering_mechanical'
  | 'engineering_civil'
  | 'engineering_electrical'
  | 'engineering_cs_it'
  | 'commerce_finance'
  | 'arts_humanities'
  | 'science_research'
  | 'healthcare_pharma'
  | 'education_teaching'
  | 'media_journalism'
  | 'law_legal'
  | 'design_architecture'
  | 'management_mba'
  | 'hospitality_tourism'
  | 'agriculture_environment'
  | 'other';

export type EducationLevel =
  | 'high_school'
  | 'diploma'
  | 'undergraduate'
  | 'graduate'
  | 'postgraduate'
  | 'phd'
  | 'self_taught';

export type ExistingSkill =
  | 'python'
  | 'javascript'
  | 'sql'
  | 'excel_sheets'
  | 'data_analysis'
  | 'graphic_design'
  | 'video_editing'
  | 'content_writing'
  | 'social_media'
  | 'project_management'
  | 'public_speaking'
  | 'sales_marketing'
  | 'customer_service'
  | 'teaching_training'
  | 'research_analysis'
  | 'accounting_finance'
  | 'html_css'
  | 'no_code_tools'
  | 'chatgpt_ai_tools'
  | 'none';

export interface ParticipantProfile {
  name?: string;
  phone?: string;
  backgroundField?: BackgroundField;
  educationLevel?: EducationLevel;
  existingSkills?: ExistingSkill[];
  experienceLevel: ExperienceLevel;
  learningTime: LearningTime;
  workStyle: WorkStyle;
  careerGoal: CareerGoal;
}

export interface CategoryScore {
  categoryCode: CategoryCode;
  categoryTitle: string;
  rawScore: number;
  normalizedPercentage: number;
  rankOrder: number;
  isPrimary: boolean;
  isAlternative: boolean;
  matchReason: string;
}

export interface AssessmentAnswers {
  [questionId: string]: string; // questionId -> optionId
}

export interface ChosenSkillAnalysis {
  skillId: ExistingSkill;
  skillName: string;
  badge: string;
  relevanceToAI: string;
  aiSynergyLevel: 'Crucial Foundation' | 'High Leverage Asset' | 'Core Advantage' | 'Fresh Foundation';
  realWorldUseCase: string;
}

export interface CandidateIntakeAnswersAnalysis {
  backgroundLabel: string;
  backgroundDomainBenefit: string;
  educationLevelLabel: string;
  educationStrategicAction: string;
  aiFamiliarityLabel: string;
  aiFamiliarityRecommendation: string;
  careerGoalLabel: string;
  careerGoalRoadmap: string;
  chosenSkillsAnalysis: ChosenSkillAnalysis[];
  careerMultiplierFormula: {
    domainComponent: string;
    skillsComponent: string;
    learnComponent: string;
    resultRole: string;
    salaryRange: string;
  };
}

export interface VastCareerRoleOption {
  roleTitle: string;
  categoryTrack: 'core_domain' | 'tech_software' | 'data_analytics' | 'management_strategy' | 'modern_growth';
  trackBadge: string;
  salaryBand: string;
  description: string;
  whyFitsYourBackground: string;
  keySkillsToLearn: string[];
  typicalEmployers: string;
}

export interface VastCareerTrackOption {
  trackCode: 'core_domain' | 'tech_software' | 'data_analytics' | 'management_strategy' | 'modern_growth';
  trackTitle: string;
  trackBadge: string;
  trackDescription: string;
  roles: VastCareerRoleOption[];
}

export interface SpecificSkillToLearn {
  skillName: string;
  category: 'technical' | 'data' | 'automation' | 'business' | 'creative';
  priority: 'Immediate (Week 1-2)' | 'Next Step (Month 1)' | 'Career Multiplier';
  whyLearn: string;
  practicalApplication: string;
  recommendedTools: string[];
}

export interface CareerStage {
  stage: string;
  roleTitle: string;
  timeline: string;
  estimatedCompensation: string;
  milestoneDescription: string;
}

export interface CareerMultiplierPathway {
  headline: string;
  currentProfileHighlight: string;
  recommendedSkillToLearn: string;
  whyItExpandsOptions: string;
  unlockedRoles: string[];
  skillsToLearn: SpecificSkillToLearn[];
  advancedCareerLadder: CareerStage[];
  technicalPathwayRole: CareerRole;
  nonTechnicalPathwayRole: CareerRole;
}

export interface CareerReportData {
  referenceId: string;
  completedAt: string;
  participantId?: string;
  targetRoleCode?: string;
  track?: AssessmentTrack;
  assignedSetNumber?: QuestionSetNumber;
  presentedQuestionCount?: number;
  roleReadiness?: RoleReadinessScore;
  mindsetSummary?: string;
  participantProfile: ParticipantProfile;
  scores: CategoryScore[];
  primaryCategory: CareerCategory;
  primaryRole: CareerRole;
  alternativeRoles: CareerRole[];
  allRecommendedRoles: CareerRole[];
  careerMultiplierPathway?: CareerMultiplierPathway;
  intakeAnswersAnalysis?: CandidateIntakeAnswersAnalysis;
  vastCareerOptions?: VastCareerTrackOption[];
  profileAnalysis: {
    strengthsSummary: string[];
    workStyleAlignment: string;
    goalStrategy: string;
    learningPaceGuidance: string;
  };
  skillsPriorities: {
    immediate: string[];
    next30Days: string[];
    longerTerm: string[];
  };
  nextStepsChecklist: {
    day1To3: string[];
    week1To2: string[];
    month1: string[];
  };
  disclaimer: string;
}

export interface AssessmentRecord {
  id: string;
  referenceId: string;
  participantId?: string;
  participantName?: string | null;
  phoneNumber?: string | null;
  backgroundField?: string | null;
  educationLevel?: string | null;
  existingSkills?: string[];
  experienceLevel: string;
  learningTime: string;
  workStyle: string;
  careerGoal: string;
  status: string;
  createdAt: string;
  primaryCategory?: string;
  primaryRole?: string;
  targetRoleCode?: string;
  track?: string;
  assignedSetNumber?: number;
  scores?: CategoryScore[];
  reportData?: CareerReportData;
}

// ============================================================================
// DYNAMIC CAREER GUIDANCE ENGINE TYPES (Student-Friendly, No Assessment/Quiz)
// ============================================================================

export type EducationQualification =
  | 'BBA'
  | 'MBA'
  | 'B.Com'
  | 'BCA'
  | 'B.Tech'
  | 'MCA'
  | 'M.Tech'
  | 'Diploma'
  | 'BA'
  | 'B.Sc'
  | 'Other';

export type CareerFieldInterest =
  | 'Data & Analytics'
  | 'Artificial Intelligence'
  | 'Business & Management'
  | 'Finance'
  | 'Marketing'
  | 'Human Resources'
  | 'Software Development'
  | 'Research'
  | 'Operations'
  | 'Cybersecurity'
  | 'Other';

export type PreferredCareerType =
  | 'Technical'
  | 'Non-Technical'
  | 'Business-Oriented'
  | 'Hybrid (Technical + Business)';

export interface StudentProfileInput {
  name?: string;
  phone?: string;
  qualification: EducationQualification;
  customQualification?: string;
  specialization: string;
  customSpecialization?: string;
  selectedSkills: string[];
  careerInterest: CareerFieldInterest;
  customCareerInterest?: string;
  preferredCareerType: PreferredCareerType;
}

export interface LearningRoadmapPhase {
  phase: string;
  duration: string;
  focus: string;
  milestone: string;
}

export interface PracticalProjectSuggestion {
  projectTitle: string;
  description: string;
  toolsUsed: string[];
  deliverable: string;
}

export interface AdjacentCareerUnlock {
  adjacentCareerName: string;
  salaryRange: string;
  existingRoleSalary?: string;
  packageHikePercentage?: string;
  skillsAlreadyPossessed: string[];
  extraSkillsToAdd: string[];
  readinessPercentage: number;
  transitionEase: 'Fast-Track (1–2 Skills Away)' | 'Moderate (2–3 Skills Away)';
  whyThisIsClose: string;
  unlockedRoleScope: string;
}

export interface HighImpactSkillMultiplier {
  skillName: string;
  category: string;
  whyItExpandsOptions: string;
  careersUnlockedCount: number;
  unlockedCareers: string[];
}

export interface RecommendedCareerOption {
  id: string;
  careerName: string;
  careerDescription: string;
  matchScore: number;
  whyThisMatches: string;
  careerType: PreferredCareerType;
  primaryDomain: string;
  salaryRange: string;
  existingJobRoleTitle?: string;
  existingJobRoleSalary?: string;
  packageHikePercentage?: string;
  packageMultiplier?: string;
  requiredSkills: string[];
  skillsStudentHas: string[];
  skillsToLearn: string[];
  recommendedSoftwareAndTools: string[];
  industryOpportunities: string;
  learningRoadmap: LearningRoadmapPhase[];
  suggestedProjects: PracticalProjectSuggestion[];
  adjacentCareersUnlocked?: AdjacentCareerUnlock[];
}

export interface ExistingRoleBaseline {
  traditionalRoleName: string;
  traditionalPackage: string;
  suggestedAveragePackage: string;
  averageHike: string;
}

export interface CareerGuidanceResultData {
  referenceId: string;
  generatedAt: string;
  studentProfile: StudentProfileInput;
  recommendedCareers: RecommendedCareerOption[];
  highImpactSkillsToLearn?: HighImpactSkillMultiplier[];
  existingRoleBaseline?: ExistingRoleBaseline;
}

