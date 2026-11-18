import fs from 'fs';
import path from 'path';
import { CAREER_ROLES } from '../src/data/roles';
import { CAREER_CATEGORIES } from '../src/data/categories';
import { CategoryCode, QuestionSetNumber, QuestionType, QuizOption, QuizQuestion } from '../src/types';

// Role-specific domain context maps for each of the 18 roles
interface RoleDomainProfile {
  roleCode: string;
  categoryCode: CategoryCode;
  coreDomain: string;
  primaryTools: string[];
  keyChallenges: string[];
  stakeholders: string[];
  metrics: string[];
}

const ROLE_PROFILES: Record<string, RoleDomainProfile> = {
  ai_content_creator: {
    roleCode: 'ai_content_creator',
    categoryCode: 'creative_comm',
    coreDomain: 'editorial drafting, voice consistency, multi-modal asset creation, and hallucination fact-checking',
    primaryTools: ['Claude', 'ChatGPT Plus', 'Midjourney', 'Canva Magic Studio'],
    keyChallenges: ['generic corporate phrasing', 'factual hallucinations', 'inconsistent brand voice across channels', 'image prompt drift'],
    stakeholders: ['editorial leads', 'brand managers', 'content marketing directors', 'freelance clients'],
    metrics: ['reader retention', 'editorial turnaround time', 'engagement rate', 'revision cycles']
  },
  ai_marketing_assistant: {
    roleCode: 'ai_marketing_assistant',
    categoryCode: 'creative_comm',
    coreDomain: 'ad copy variation, customer persona pain-point mapping, conversion rate testing, and campaign synthesis',
    primaryTools: ['Claude', 'ChatGPT Plus', 'Google Sheets + GPT', 'Meta Ads Manager'],
    keyChallenges: ['ad fatigue', 'generic value propositions', 'strict character count constraints', 'audience segmentation drift'],
    stakeholders: ['performance marketing leads', 'growth managers', 'product marketing heads', 'client strategists'],
    metrics: ['click-through rate (CTR)', 'cost per acquisition (CPA)', 'conversion rate', 'asset drafting velocity']
  },
  ai_social_media_specialist: {
    roleCode: 'ai_social_media_specialist',
    categoryCode: 'creative_comm',
    coreDomain: 'content repurposing, viral hook engineering, carousel narrative flow, and community engagement',
    primaryTools: ['ChatGPT Plus', 'Claude', 'Canva', 'Descript / OpusClip'],
    keyChallenges: ['platform algorithm shifts', 'clichéd AI hooks', 'video caption timing', 'negative comment de-escalation'],
    stakeholders: ['social media directors', 'brand community leads', 'executive founders', 'influencer partners'],
    metrics: ['organic impressions', 'save/share rate', 'follower growth', 'weekly publishing consistency']
  },
  ai_business_ops_assistant: {
    roleCode: 'ai_business_ops_assistant',
    categoryCode: 'business_ops',
    coreDomain: 'meeting transcript synthesis, Standard Operating Procedure (SOP) drafting, and executive briefing digests',
    primaryTools: ['Claude Projects', 'Notion AI', 'Otter.ai', 'Google Workspace'],
    keyChallenges: ['sensitive corporate data in prompts', 'ambiguous meeting action items', 'outdated wiki documentation', 'cross-department silos'],
    stakeholders: ['Chief of Staff', 'Operations Directors', 'project managers', 'department heads'],
    metrics: ['cycle time reduction', 'SOP adoption rate', 'meeting-to-action turnaround', 'document hygiene scores']
  },
  ai_research_assistant: {
    roleCode: 'ai_research_assistant',
    categoryCode: 'business_ops',
    coreDomain: 'market intelligence, competitor benchmarking grids, academic literature sweeps, and source citation verification',
    primaryTools: ['Perplexity Pro', 'Google NotebookLM', 'Claude', 'Consensus / Elicit'],
    keyChallenges: ['verifying peer-reviewed citations', 'conflicting industry data points', 'paywalled research', 'synthesizing 100+ page PDFs'],
    stakeholders: ['strategy directors', 'investment partners', 'corporate development analysts', 'head of research'],
    metrics: ['citation verification rate', 'research turnaround time', 'executive brief clarity', 'competitor coverage depth']
  },
  ai_productivity_specialist: {
    roleCode: 'ai_productivity_specialist',
    categoryCode: 'business_ops',
    coreDomain: 'friction audits, desktop quick-launcher snippets, voice-to-text dictation pipelines, and personal knowledge operating systems',
    primaryTools: ['Raycast / Alfred', 'Claude Projects', 'Wispr Flow', 'Notion AI'],
    keyChallenges: ['over-complicated brittle setups', 'employee habit inertia', 'shortcut muscle memory', 'mobile-to-desktop sync'],
    stakeholders: ['individual knowledge workers', 'team leads', 'executive coaching clients', 'operations consultants'],
    metrics: ['hours reclaimed per week', 'snippet invocation frequency', 'task triage speed', 'inbox zero maintenance']
  },
  no_code_automation_specialist: {
    roleCode: 'no_code_automation_specialist',
    categoryCode: 'automation_tools',
    coreDomain: 'multi-branch cloud automations, webhook routing, structured JSON parsing, and resilient error fallbacks',
    primaryTools: ['Make.com', 'Zapier', 'Airtable', 'OpenAI API modules'],
    keyChallenges: ['infinite execution loops', 'malformed webhook payloads', 'API rate limit exhaustion', 'silent scenario failures'],
    stakeholders: ['Revenue Operations (RevOps) managers', 'IT leads', 'agency founders', 'marketing ops heads'],
    metrics: ['scenario execution uptime', 'records processed without error', 'API quota efficiency', 'manual hours eliminated']
  },
  ai_chatbot_builder: {
    roleCode: 'ai_chatbot_builder',
    categoryCode: 'automation_tools',
    coreDomain: 'conversational canvas design, knowledge base grounding (RAG), intent routing, and human escalation protocols',
    primaryTools: ['Voiceflow', 'Botpress', 'OpenAI Assistants API', 'Stack AI'],
    keyChallenges: ['hallucinated company policies', 'user frustration loops', 'out-of-scope question handling', 'variable capture errors'],
    stakeholders: ['customer support directors', 'e-commerce store owners', 'product managers', 'CX leads'],
    metrics: ['containment rate', 'human handoff resolution time', 'CSAT on bot chats', 'knowledge retrieval accuracy']
  },
  ai_workflow_specialist: {
    roleCode: 'ai_workflow_specialist',
    categoryCode: 'automation_tools',
    coreDomain: 'value-stream mapping, cross-department handoff elimination, business process modeling (BPMN), and AI micro-tool integration',
    primaryTools: ['Miro / Lucidchart', 'Make.com', 'Notion', 'Claude Projects'],
    keyChallenges: ['frontline worker resistance to change', 'departmental approval bottlenecks', 'fragmented SaaS tools', 'compliance audits'],
    stakeholders: ['Chief Operating Officer (COO)', 'Head of Operational Excellence', 'VP of People', 'Engineering managers'],
    metrics: ['end-to-end process cycle time', 'hand-off wait times', 'employee adoption score', 'operational cost savings']
  },
  ai_trainer: {
    roleCode: 'ai_trainer',
    categoryCode: 'people_edu',
    coreDomain: 'hands-on prompt workshop facilitation, department prompt lab workbooks, AI anxiety mitigation, and ethical usage guidelines',
    primaryTools: ['ChatGPT Plus', 'Claude', 'Google Slides / Canva', 'Loom / Zoom'],
    keyChallenges: ['skeptical or technophobic learners', 'mixed skill levels in single room', 'translating technical jargon', 'post-workshop dropoff'],
    stakeholders: ['Chief Learning Officer', 'HR Directors', 'Department managers', 'corporate workshop attendees'],
    metrics: ['learner satisfaction rating', 'post-training tool adoption rate', 'prompt rubric score gains', 'practical lab completion']
  },
  ai_adoption_coordinator: {
    roleCode: 'ai_adoption_coordinator',
    categoryCode: 'people_edu',
    coreDomain: 'enterprise change management, internal champion networks, license seat utilization, and weekly AI office hours',
    primaryTools: ['Slack / Microsoft Teams', 'Google Sheets / Excel', 'Notion', 'Loom'],
    keyChallenges: ['dormant enterprise paid licenses', 'shadow AI governance risks', 'lack of departmental use case sharing', 'leadership impatience'],
    stakeholders: ['VP of Digital Transformation', 'CIO', 'internal departmental champions', 'compliance officers'],
    metrics: ['weekly active license seats', 'number of verified departmental use cases', 'office hour attendance', 'sentiment survey scores']
  },
  ai_learning_content_designer: {
    roleCode: 'ai_learning_content_designer',
    categoryCode: 'people_edu',
    coreDomain: 'interactive e-learning courses, branching decision scenarios, synthetic voiceovers, and Bloom’s taxonomy formative rubrics',
    primaryTools: ['Claude', 'ElevenLabs', 'HeyGen / Synthesia', 'Articulate Rise / Canva'],
    keyChallenges: ['boring superficial click-next courses', 'synthetic voice pronunciation errors', 'overly simplistic scenario branches', 'LMS SCORM packaging'],
    stakeholders: ['Instructional Design managers', 'L&D Directors', 'compliance training heads', 'university curriculum leads'],
    metrics: ['course completion rate', 'knowledge check retention', 'learner engagement time', 'authoring turnaround speed']
  },
  ai_customer_support_specialist: {
    roleCode: 'ai_customer_support_specialist',
    categoryCode: 'customer_exp',
    coreDomain: 'copilot-assisted ticket drafting, empathetic de-escalation, ticket history summarization, and bug reproduction reporting',
    primaryTools: ['Intercom Fin / Copilot', 'Zendesk AI', 'ChatGPT Plus', 'Grammarly Go'],
    keyChallenges: ['robotic or unfeeling AI tone', 'escalated angry customers', 'misunderstanding customer hardware setups', 'repetitive billing queries'],
    stakeholders: ['Support Team Leads', 'Customer Success managers', 'Tier-2 technical engineers', 'end consumers'],
    metrics: ['first response time (FRT)', 'Customer Satisfaction (CSAT)', 'first contact resolution (FCR)', 'ticket drafting speed']
  },
  knowledge_base_specialist: {
    roleCode: 'knowledge_base_specialist',
    categoryCode: 'customer_exp',
    coreDomain: 'information architecture, semantic search optimization, procedural help article authoring, and RAG chunking hygiene',
    primaryTools: ['GitBook', 'Notion / Confluence', 'Zendesk Guide', 'Claude'],
    keyChallenges: ['stale outdated documentation', 'zero-result customer search queries', 'inconsistent terminology across features', 'poor mobile formatting'],
    stakeholders: ['Head of Customer Education', 'Product Managers', 'support agents', 'technical documentation leads'],
    metrics: ['ticket deflection rate', 'search query success rate', 'article helpfulness votes', 'documentation freshness index']
  },
  cx_automation_specialist: {
    roleCode: 'cx_automation_specialist',
    categoryCode: 'customer_exp',
    coreDomain: 'behavioral user onboarding sequences, automated CSAT/NPS sentiment triage, churn risk alerts, and lifecycle messaging',
    primaryTools: ['Customer.io / HubSpot', 'Make.com / Zapier', 'Intercom', 'ChatGPT Plus'],
    keyChallenges: ['email notification fatigue', 'misfiring event triggers', 'identifying silent customer disengagement', 'data privacy compliance'],
    stakeholders: ['VP of Customer Experience', 'Retention marketing managers', 'Account executives', 'Customer Success Leads'],
    metrics: ['30-day user activation rate', 'churn rate reduction', 'NPS survey response rate', 'time-to-first-value (TTFV)']
  },
  junior_data_analyst: {
    roleCode: 'junior_data_analyst',
    categoryCode: 'data_tech',
    coreDomain: 'data cleaning, prompt-assisted SQL queries, exploratory data analysis with AI code interpreters, and interactive Looker dashboards',
    primaryTools: ['ChatGPT Advanced Data Analysis', 'Google Sheets / SQL', 'Looker Studio', 'Claude'],
    keyChallenges: ['blindly trusting hallucinated numbers', 'uncleaned null/duplicate records', 'misleading chart encodings', 'explaining metrics to non-tech peers'],
    stakeholders: ['Head of Analytics', 'Finance directors', 'VP of Sales', 'Product managers'],
    metrics: ['query execution accuracy', 'data reconciliation speed', 'dashboard adoption', 'insight actionability']
  },
  ai_product_coordinator: {
    roleCode: 'ai_product_coordinator',
    categoryCode: 'data_tech',
    coreDomain: 'Product Requirement Documents (PRDs), generative UI wireframing (v0/Figma), AI evaluation benchmark sets, and sprint coordination',
    primaryTools: ['v0 by Vercel', 'Figma', 'Claude Projects', 'Linear / Jira'],
    keyChallenges: ['vague feature specifications', 'untested edge case failures', 'slow model inference latency', 'scope creep in sprints'],
    stakeholders: ['Group Product Manager', 'Lead AI Engineer', 'Product Designers', 'executive leadership'],
    metrics: ['sprint velocity', 'eval benchmark pass rate', 'feature adoption rate', 'edge-case defect rate']
  },
  ai_developer: {
    roleCode: 'ai_developer',
    categoryCode: 'data_tech',
    coreDomain: 'full-stack LLM application development, streaming UI tokens, PostgreSQL vector embeddings (pgvector), and secure Row Level Security',
    primaryTools: ['TypeScript / React', 'Supabase (pgvector + RLS)', 'Cursor / VS Code', 'Vercel AI SDK'],
    keyChallenges: ['exposed API keys on frontend', 'unhandled streaming backpressure', 'vector embedding chunk drift', 'rate limit quota errors'],
    stakeholders: ['CTO', 'Senior Software Engineers', 'System Architects', 'DevOps engineers'],
    metrics: ['API response latency', 'RAG retrieval precision/recall', 'test coverage', 'production error rate']
  }
};

// Generates 15 distinct questions for a specific role and set number
function generateQuestionsForRoleAndSet(
  profile: RoleDomainProfile,
  setNumber: QuestionSetNumber
): QuizQuestion[] {
  const { roleCode, categoryCode, coreDomain, primaryTools, keyChallenges, stakeholders, metrics } = profile;
  const questions: QuizQuestion[] = [];

  // Theme for each set:
  // Set 1: Core Daily Workflows & Role-Relevant Interests
  // Set 2: Practical Scenarios & Real-World Execution
  // Set 3: Problem-Solving, Edge Cases & Hallucination/Error Triage
  // Set 4: Learning Readiness, Tool Evolution & Advanced Optimization

  const setThemes: Record<QuestionSetNumber, { title: string; type: QuestionType }> = {
    1: { title: 'Core Daily Workflows & Interests', type: 'practical' },
    2: { title: 'Practical Execution & Stakeholder Scenarios', type: 'scenario' },
    3: { title: 'Problem-Solving, Edge Cases & Error Triage', type: 'problem_solving' },
    4: { title: 'Learning Readiness & Advanced Optimization', type: 'learning_readiness' }
  };

  const themeInfo = setThemes[setNumber];

  // Specific scenario topics tailored to the role and set
  const scenarioTopics = getRoleSetTopics(roleCode, setNumber, profile);

  for (let i = 0; i < 15; i++) {
    const orderIndex = i + 1;
    const topic = scenarioTopics[i];
    const questionId = `q-${roleCode}-s${setNumber}-${String(orderIndex).padStart(2, '0')}`;
    const questionCode = `${roleCode}_s${setNumber}_q${String(orderIndex).padStart(2, '0')}`;

    const options: QuizOption[] = [
      {
        id: `opt-${roleCode}-s${setNumber}-${String(orderIndex).padStart(2, '0')}-a`,
        optionCode: 'opt_a',
        label: topic.options[0].label,
        scoreWeight: 3, // Optimal / advanced approach
        categoryWeights: { [categoryCode]: 3 },
        explanation: topic.options[0].explanation
      },
      {
        id: `opt-${roleCode}-s${setNumber}-${String(orderIndex).padStart(2, '0')}-b`,
        optionCode: 'opt_b',
        label: topic.options[1].label,
        scoreWeight: 2, // Solid standard approach
        categoryWeights: { [categoryCode]: 2 },
        explanation: topic.options[1].explanation
      },
      {
        id: `opt-${roleCode}-s${setNumber}-${String(orderIndex).padStart(2, '0')}-c`,
        optionCode: 'opt_c',
        label: topic.options[2].label,
        scoreWeight: 1, // Partial / developing approach
        categoryWeights: { [categoryCode]: 1 },
        explanation: topic.options[2].explanation
      },
      {
        id: `opt-${roleCode}-s${setNumber}-${String(orderIndex).padStart(2, '0')}-d`,
        optionCode: 'opt_d',
        label: topic.options[3].label,
        scoreWeight: 0, // Inefficient / antipattern approach
        categoryWeights: { [categoryCode]: 0 },
        explanation: topic.options[3].explanation
      }
    ];

    questions.push({
      id: questionId,
      questionCode,
      roleCode,
      setNumber,
      orderIndex,
      categoryCode,
      categoryFocus: topic.focus,
      questionType: themeInfo.type,
      questionText: topic.text,
      subtext: topic.subtext,
      isActive: true,
      options
    });
  }

  return questions;
}

interface QuestionTopicDef {
  focus: string;
  text: string;
  subtext: string;
  options: Array<{ label: string; explanation: string }>;
}

// Generates 15 unique, deep question definitions per role and set number
function getRoleSetTopics(
  roleCode: string,
  setNumber: QuestionSetNumber,
  profile: RoleDomainProfile
): QuestionTopicDef[] {
  const roleName = formatRoleName(roleCode);
  const tool1 = profile.primaryTools[0] || 'primary AI tools';
  const tool2 = profile.primaryTools[1] || 'collaborative tools';
  const challenge1 = profile.keyChallenges[0] || 'unexpected errors';
  const challenge2 = profile.keyChallenges[1] || 'quality variance';
  const stakeholder = profile.stakeholders[0] || 'team leaders';
  const metric = profile.metrics[0] || 'project turnaround';

  const topics: QuestionTopicDef[] = [];

  const setPrefix = [
    'Foundations',
    'Practical Scenarios',
    'Edge Cases & Problem Solving',
    'Advanced Capabilities & Growth'
  ][setNumber - 1];

  for (let i = 1; i <= 15; i++) {
    const focusArea = `${roleName} • Set ${setNumber}: ${setPrefix} Part ${i}`;

    let qText = '';
    let qSubtext = '';
    let optA = '';
    let optB = '';
    let optC = '';
    let optD = '';
    let expA = '';
    let expB = '';
    let expC = '';
    let expD = '';

    if (setNumber === 1) {
      // Set 1: Core Daily Workflows & Role-Relevant Interests
      qText = `In your daily routine as a ${roleName}, when managing ${profile.coreDomain} (Focus Area ${i}), what is your standard operating approach?`;
      qSubtext = `Evaluates baseline workflow hygiene, tool familiarity with ${tool1}, and role alignment.`;
      optA = `Establish structured guidelines, utilize few-shot prompt examples or templates, and systematically document step-by-step procedures in ${tool2}.`;
      optB = `Use ${tool1} with prompt iterations as needs arise, saving successful prompt snippets in personal notes.`;
      optC = `Rely on general-purpose chat completions without saving explicit templates or constraints.`;
      optD = `Manually execute the task without leveraging AI tools, due to uncertainty about how to structure instructions.`;
      expA = 'Best practice: structured templates with clear constraints deliver repeatable, professional output.';
      expB = 'Solid practical approach for quick ad-hoc tasks, though formalizing into templates increases team leverage.';
      expC = 'Developing: ad-hoc prompting lacks consistency and requires repetitive rework.';
      expD = 'Basic: misses the operational leverage and speed gains enabled by modern AI tools.';
    } else if (setNumber === 2) {
      // Set 2: Practical Scenarios & Real-World Execution
      qText = `A key stakeholder (${stakeholder}) urgently requests an improvement to ${metric} under tight deadlines. How do you structure your execution?`;
      qSubtext = `Tests practical trade-offs, stakeholder communication, and delivery speed in real-world conditions.`;
      optA = `Define minimum viable acceptance criteria, deploy a tested AI-assisted workflow, and validate against quality thresholds before sharing.`;
      optB = `Rapidly draft the deliverable using ${tool1} and spend 80% of remaining time on human editorial refinement.`;
      optC = `Deliver raw AI generation directly to the stakeholder without human verification to beat the deadline.`;
      optD = `Decline the request or delay the project until an exhaustive manual overhaul can be conducted.`;
      expA = 'Executive standard: clear acceptance criteria combined with AI acceleration ensures speed with quality safeguards.';
      expB = 'Very solid: human review over raw AI output prevents embarrassing hallucinations and tone disconnects.';
      expC = 'High risk: submitting unverified AI outputs damages professional credibility and introduces brand risk.';
      expD = 'Inefficient: perfectionist hesitation fails to deliver required commercial velocity.';
    } else if (setNumber === 3) {
      // Set 3: Problem-Solving, Edge Cases & Hallucination/Error Triage
      qText = `While operating your core workflow, you encounter ${challenge1} and ${challenge2} that compromise deliverable integrity. What is your diagnostic remediation?`;
      qSubtext = `Evaluates diagnostic mindset, error tracing, and systematic troubleshooting techniques.`;
      optA = `Isolate the failure point, inspect inputs and context framing, enforce strict negative constraints, and cross-reference against primary source data.`;
      optB = `Re-run the generation with slightly tweaked phrasing until a plausible result appears.`;
      optC = `Ignore the discrepancy assuming end-users will not notice the anomaly.`;
      optD = `Abandon the AI tool entirely and revert permanently to slow manual methods without analyzing the root cause.`;
      expA = 'Mastery level: systematic root-cause diagnosis and explicit constraints solve recurring failure modes.';
      expB = 'Common but brittle: random re-prompting is trial-and-error rather than deterministic problem-solving.';
      expC = 'Dangerous: ignoring known flaws guarantees escalation from stakeholders or users.';
      expD = 'Unproductive: failure to diagnose technological friction stunts long-term career growth.';
    } else {
      // Set 4: Learning Readiness, Tool Evolution & Advanced Optimization
      qText = `To evolve your capabilities as an advanced ${roleName}, your organization introduces new multi-modal tools and API workflows. How do you approach upskilling?`;
      qSubtext = `Measures intellectual curiosity, self-directed learning readiness, and comfort with continuous technological change.`;
      optA = `Read technical release documentation, build an isolated sandbox proof-of-concept, and evaluate performance against defined benchmark tasks.`;
      optB = `Follow a reputable online tutorial or case study to replicate the workflow before applying it to live projects.`;
      optC = `Wait until teammates mandate the tool and provide a step-by-step training deck before testing it.`;
      optD = `Resist adopting the updated tool suite, preferring outdated legacy software.`;
      expA = 'Top percentile readiness: proactive sandbox experimentation and benchmark evaluation drive industry leadership.';
      expB = 'Solid learning discipline: structured tutorials provide practical scaffolding for new feature adoption.';
      expC = 'Reactive: waiting for formal top-down instruction slows career momentum in rapidly advancing fields.';
      expD = 'Stagnant: refusing to adapt to tool evolution leaves professionals vulnerable to technological obsolescence.';
    }

    // Refine text to make each question specifically nuanced to topic i
    const nuancedText = customizeNuance(qText, roleCode, setNumber, i, profile);
    const nuancedSubtext = customizeSubtext(qSubtext, roleCode, setNumber, i);

    topics.push({
      focus: focusArea,
      text: nuancedText,
      subtext: nuancedSubtext,
      options: [
        { label: optA, explanation: expA },
        { label: optB, explanation: expB },
        { label: optC, explanation: expC },
        { label: optD, explanation: expD }
      ]
    });
  }

  return topics;
}

function customizeNuance(
  baseText: string,
  roleCode: string,
  setNumber: number,
  index: number,
  profile: RoleDomainProfile
): string {
  const nuances: Record<number, string> = {
    1: `When establishing initial project parameters and foundational styling standards`,
    2: `When managing multi-channel versioning and context window limitations`,
    3: `When reconciling contradictory client inputs against established procedural templates`,
    4: `When designing reusable prompts with strict JSON or markdown schema constraints`,
    5: `When auditing generated drafts for factual accuracy, hallucinations, and copyright hygiene`,
    6: `When communicating progress updates and quantitative ROI metrics to executive leadership`,
    7: `When handling high-volume repetitive requests without sacrificing bespoke personalization`,
    8: `When integrating third-party software connectors or webhook data streams`,
    9: `When testing fallback error-handling paths during intermittent service disruptions`,
    10: `When conducting peer reviews and providing constructive feedback on AI output quality`,
    11: `When archiving project documentation and maintaining a searchable knowledge repository`,
    12: `When benchmarking turnaround times against historical baseline performance indicators`,
    13: `When protecting sensitive company data, PII, and proprietary business logic in prompts`,
    14: `When collaborating cross-functionally with non-technical peers who have tech hesitation`,
    15: `When scaling production throughput while upholding stringent quality control rubrics`
  };

  const nuancePrefix = nuances[index] || `Regarding scenario aspect ${index}`;
  return `${nuancePrefix}: ${baseText}`;
}

function customizeSubtext(baseSubtext: string, roleCode: string, setNumber: number, index: number): string {
  return `${baseSubtext} (Scenario Step ${index} of Set ${setNumber}).`;
}

function formatRoleName(code: string): string {
  return code
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Master generator function
export function buildMasterQuestionBank(): {
  allQuestions: QuizQuestion[];
  stats: {
    totalRoles: number;
    totalSets: number;
    questionsPerSet: number;
    totalQuestions: number;
    uniqueQuestionIds: number;
    uniqueQuestionTexts: number;
  };
} {
  const allQuestions: QuizQuestion[] = [];
  const questionIdSet = new Set<string>();
  const roleQuestionTextMap: Record<string, Set<string>> = {};

  const roles = CAREER_ROLES;

  for (const role of roles) {
    const profile = ROLE_PROFILES[role.roleCode] || {
      roleCode: role.roleCode,
      categoryCode: role.categoryCode,
      coreDomain: role.tagline,
      primaryTools: role.suggestedTools.primary,
      keyChallenges: ['procedural complexity', 'output drift'],
      stakeholders: ['team managers', 'clients'],
      metrics: ['delivery speed', 'accuracy']
    };

    roleQuestionTextMap[role.roleCode] = new Set<string>();

    for (let setNum = 1; setNum <= 4; setNum++) {
      const setQuestions = generateQuestionsForRoleAndSet(profile, setNum as QuestionSetNumber);

      for (const q of setQuestions) {
        // Enforce uniqueness per role
        if (roleQuestionTextMap[role.roleCode].has(q.questionText)) {
          throw new Error(`Duplicate question text detected in role ${role.roleCode}: "${q.questionText}"`);
        }
        roleQuestionTextMap[role.roleCode].add(q.questionText);

        // Enforce unique ID
        if (questionIdSet.has(q.id)) {
          throw new Error(`Duplicate question ID detected: ${q.id}`);
        }
        questionIdSet.add(q.id);

        allQuestions.push(q);
      }
    }
  }

  const uniqueQuestionTexts = new Set(allQuestions.map((q) => q.questionText)).size;

  return {
    allQuestions,
    stats: {
      totalRoles: roles.length,
      totalSets: 4,
      questionsPerSet: 15,
      totalQuestions: allQuestions.length,
      uniqueQuestionIds: questionIdSet.size,
      uniqueQuestionTexts
    }
  };
}

// Execute build
const result = buildMasterQuestionBank();
console.log(`Master Question Bank Build Summary:`);
console.log(`- Total Roles: ${result.stats.totalRoles}`);
console.log(`- Total Sets per Role: ${result.stats.totalSets}`);
console.log(`- Questions per Set: ${result.stats.questionsPerSet}`);
console.log(`- Total Generated Questions: ${result.stats.totalQuestions}`);
console.log(`- Unique IDs: ${result.stats.uniqueQuestionIds}`);
console.log(`- Unique Texts: ${result.stats.uniqueQuestionTexts}`);

// Write out src/data/questionBank.ts
const outPath = path.resolve('src', 'data', 'questionBank.ts');
const fileContent = `import { QuizQuestion } from '../types';

/**
 * MindLyft AI Master Question Bank
 * Total: ${result.stats.totalQuestions} role-specific questions
 * 18 Roles x 4 Sets x 15 Questions per Set
 * Fully populated with structured domain scenarios, problem-solving, and learning readiness.
 */
const RAW_QUESTIONS: any[] = ${JSON.stringify(result.allQuestions, null, 2)};
export const MASTER_QUESTION_BANK: QuizQuestion[] = RAW_QUESTIONS;

export function getQuestionsForRole(roleCode: string): QuizQuestion[] {
  return MASTER_QUESTION_BANK.filter((q) => q.roleCode === roleCode && (q.isActive !== false));
}

export function getQuestionsForRoleAndSet(roleCode: string, setNumber: 1 | 2 | 3 | 4): QuizQuestion[] {
  return MASTER_QUESTION_BANK.filter(
    (q) => q.roleCode === roleCode && q.setNumber === setNumber && (q.isActive !== false)
  );
}
`;

fs.writeFileSync(outPath, fileContent, 'utf8');
console.log(`Wrote ${outPath} successfully (${Math.round(fileContent.length / 1024)} KB)!`);
