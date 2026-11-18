import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1-morning-project',
    questionCode: 'q1_project_preference',
    questionText: 'When starting a fresh project, which type of task gives you the most immediate energy?',
    subtext: 'Think about what you naturally gravitate toward when you have the freedom to choose.',
    categoryFocus: 'Natural Work Orientation',
    orderIndex: 1,
    options: [
      {
        id: 'q1-opt-a',
        optionCode: 'q1_creative',
        label: 'Brainstorming creative angles, writing compelling stories, or generating visual concepts.',
        categoryWeights: { creative_comm: 3, people_edu: 1 }
      },
      {
        id: 'q1-opt-b',
        optionCode: 'q1_business',
        label: 'Reviewing disorganized notes, defining clear action steps, and structuring a clean plan.',
        categoryWeights: { business_ops: 3, customer_exp: 1 }
      },
      {
        id: 'q1-opt-c',
        optionCode: 'q1_automation',
        label: 'Connecting apps together so tasks trigger automatically without manual clicking.',
        categoryWeights: { automation_tools: 3, data_tech: 1 }
      },
      {
        id: 'q1-opt-d',
        optionCode: 'q1_people',
        label: 'Preparing a guide or workshop to help others understand a complex new concept easily.',
        categoryWeights: { people_edu: 3, customer_exp: 1 }
      },
      {
        id: 'q1-opt-e',
        optionCode: 'q1_customer',
        label: 'Listening to someone’s specific problem, diagnosing their frustration, and delivering a clear fix.',
        categoryWeights: { customer_exp: 3, business_ops: 1 }
      },
      {
        id: 'q1-opt-f',
        optionCode: 'q1_data_tech',
        label: 'Exploring a dataset, testing API endpoints, or building a technical prototype.',
        categoryWeights: { data_tech: 3, automation_tools: 1 }
      }
    ]
  },
  {
    id: 'q-2-problem-solving',
    questionCode: 'q2_problem_solving',
    questionText: 'Your team is facing repetitive, frustrating busywork. What is your instinctual reaction?',
    subtext: 'How do you prefer to tackle operational friction?',
    categoryFocus: 'Friction Resolution Style',
    orderIndex: 2,
    options: [
      {
        id: 'q2-opt-a',
        optionCode: 'q2_automation',
        label: 'Build a multi-step Zapier or Make workflow to pass information automatically between tools.',
        categoryWeights: { automation_tools: 3, data_tech: 1 }
      },
      {
        id: 'q2-opt-b',
        optionCode: 'q2_business_ops',
        label: 'Draft a standard operating procedure (SOP) and checklist to eliminate ambiguity and wasted time.',
        categoryWeights: { business_ops: 3, customer_exp: 1 }
      },
      {
        id: 'q2-opt-c',
        optionCode: 'q2_people_edu',
        label: 'Host a training session or create a video tutorial to teach everyone better habits and shortcuts.',
        categoryWeights: { people_edu: 3, creative_comm: 1 }
      },
      {
        id: 'q2-opt-d',
        optionCode: 'q2_customer_exp',
        label: 'Create a self-service FAQ and canned response macros so common questions get answered instantly.',
        categoryWeights: { customer_exp: 3, business_ops: 1 }
      },
      {
        id: 'q2-opt-e',
        optionCode: 'q2_data_tech',
        label: 'Analyze time logs to measure exactly where hours are leaking and model an evidence-based fix.',
        categoryWeights: { data_tech: 3, business_ops: 1 }
      },
      {
        id: 'q2-opt-f',
        optionCode: 'q2_creative_comm',
        label: 'Create an engaging slide deck or communication campaign to rally the team around simpler practices.',
        categoryWeights: { creative_comm: 3, people_edu: 1 }
      }
    ]
  },
  {
    id: 'q-3-ai-interaction',
    questionCode: 'q3_ai_interaction',
    questionText: 'When you open an AI model like Claude or ChatGPT, what do you most enjoy doing with it?',
    subtext: 'Your favorite conversational AI use case reveals your underlying strengths.',
    categoryFocus: 'Tool Utilization Preference',
    orderIndex: 3,
    options: [
      {
        id: 'q3-opt-a',
        optionCode: 'q3_creative',
        label: 'Polishing hooks, crafting articles, iterating metaphors, and generating creative narratives.',
        categoryWeights: { creative_comm: 3 }
      },
      {
        id: 'q3-opt-b',
        optionCode: 'q3_research_ops',
        label: 'Uploading 50-page reports, extracting structured summaries, and synthesizing competitor insights.',
        categoryWeights: { business_ops: 3 }
      },
      {
        id: 'q3-opt-c',
        optionCode: 'q3_bot_workflow',
        label: 'Instructing it to act as a structured persona or output clean JSON to pass into another app.',
        categoryWeights: { automation_tools: 3, data_tech: 1 }
      },
      {
        id: 'q3-opt-d',
        optionCode: 'q3_explainer',
        label: 'Asking it to explain hard topics like I am five, then designing interactive exercises for others.',
        categoryWeights: { people_edu: 3 }
      },
      {
        id: 'q3-opt-e',
        optionCode: 'q3_customer_empathy',
        label: 'Drafting polite, reassuring responses to tricky client questions or resolving dispute scenarios.',
        categoryWeights: { customer_exp: 3 }
      },
      {
        id: 'q3-opt-f',
        optionCode: 'q3_code_data',
        label: 'Asking it to generate SQL queries, debug code snippets, or analyze numerical data files.',
        categoryWeights: { data_tech: 3 }
      }
    ]
  },
  {
    id: 'q-4-messy-data',
    questionCode: 'q4_messy_information',
    questionText: 'You are handed a messy 10-page document full of scattered notes and bullet points. What is your first instinct?',
    subtext: 'How you synthesize chaos into order.',
    categoryFocus: 'Information Architecture',
    orderIndex: 4,
    options: [
      {
        id: 'q4-opt-a',
        optionCode: 'q4_ops_digest',
        label: 'Condense it into a 1-page executive briefing memo highlighting key decisions and deadlines.',
        categoryWeights: { business_ops: 3, creative_comm: 1 }
      },
      {
        id: 'q4-opt-b',
        optionCode: 'q4_knowledge_base',
        label: 'Organize it into a searchable knowledge base with clear categories, headings, and tags.',
        categoryWeights: { customer_exp: 3, business_ops: 1 }
      },
      {
        id: 'q4-opt-c',
        optionCode: 'q4_course_module',
        label: 'Turn it into an interactive training module with practical scenarios and knowledge checks.',
        categoryWeights: { people_edu: 3, creative_comm: 1 }
      },
      {
        id: 'q4-opt-d',
        optionCode: 'q4_visual_story',
        label: 'Extract the core emotional hook and write an engaging multi-platform content series.',
        categoryWeights: { creative_comm: 3 }
      },
      {
        id: 'q4-opt-e',
        optionCode: 'q4_chatbot_rag',
        label: 'Index it into an AI chatbot knowledge base so anyone can chat with the document instantly.',
        categoryWeights: { automation_tools: 2, data_tech: 2 }
      },
      {
        id: 'q4-opt-f',
        optionCode: 'q4_data_extract',
        label: 'Extract the metrics and numbers into a structured spreadsheet to visualize trends.',
        categoryWeights: { data_tech: 3, business_ops: 1 }
      }
    ]
  },
  {
    id: 'q-5-technical-comfort',
    questionCode: 'q5_technical_comfort',
    questionText: 'What is your honest comfort level and interest when it comes to technical code and software logic?',
    subtext: 'We match you with paths where coding is an asset, but never a barrier if you prefer no-code.',
    categoryFocus: 'Technical Orientation',
    orderIndex: 5,
    options: [
      {
        id: 'q5-opt-a',
        optionCode: 'q5_non_tech_words',
        label: 'I prefer working strictly with words, ideas, people, and visual designs—no code at all.',
        categoryWeights: { creative_comm: 2, people_edu: 2, customer_exp: 1 }
      },
      {
        id: 'q5-opt-b',
        optionCode: 'q5_no_code_visual',
        label: 'I love visual logic (flowcharts, Zapier, Airtable, Notion formulas) without writing raw syntax.',
        categoryWeights: { automation_tools: 3, business_ops: 2 }
      },
      {
        id: 'q5-opt-c',
        optionCode: 'q5_light_technical',
        label: 'I am comfortable with basic SQL, spreadsheet formulas, and using AI copilots to help me write snippets.',
        categoryWeights: { data_tech: 2, automation_tools: 2, business_ops: 1 }
      },
      {
        id: 'q5-opt-d',
        optionCode: 'q5_full_code',
        label: 'I am eager to write real code (JavaScript/Python), work with APIs, and build full-stack apps.',
        categoryWeights: { data_tech: 4 }
      }
    ]
  },
  {
    id: 'q-6-communication-focus',
    questionCode: 'q6_audience_interaction',
    questionText: 'Who do you most enjoy communicating with on a daily basis?',
    subtext: 'Matching the social environment to your personal strengths.',
    categoryFocus: 'Social Dynamics',
    orderIndex: 6,
    options: [
      {
        id: 'q6-opt-a',
        optionCode: 'q6_public_audience',
        label: 'Public audiences, readers, community members, and social followers.',
        categoryWeights: { creative_comm: 3 }
      },
      {
        id: 'q6-opt-b',
        optionCode: 'q6_internal_leadership',
        label: 'Internal managers, founders, and executives who need crisp decisions and status updates.',
        categoryWeights: { business_ops: 3 }
      },
      {
        id: 'q6-opt-c',
        optionCode: 'q6_individual_learners',
        label: 'Colleagues and students who need supportive coaching, patience, and clear instruction.',
        categoryWeights: { people_edu: 3 }
      },
      {
        id: 'q6-opt-d',
        optionCode: 'q6_end_users',
        label: 'Customers who are facing roadblocks and need quick, empathetic assistance.',
        categoryWeights: { customer_exp: 3 }
      },
      {
        id: 'q6-opt-e',
        optionCode: 'q6_engineers_systems',
        label: 'Software systems, APIs, and product teams discussing architecture and technical specs.',
        categoryWeights: { data_tech: 2, automation_tools: 2 }
      }
    ]
  },
  {
    id: 'q-7-deliverable-pride',
    questionCode: 'q7_proudest_deliverable',
    questionText: 'At the end of a productive week, which finished deliverable would make you feel proudest?',
    subtext: 'The outcome that gives you genuine fulfillment.',
    categoryFocus: 'Intrinsic Motivation',
    orderIndex: 7,
    options: [
      {
        id: 'q7-opt-a',
        optionCode: 'q7_viral_content',
        label: 'A published article, viral video series, or brand campaign that generated high praise.',
        categoryWeights: { creative_comm: 3 }
      },
      {
        id: 'q7-opt-b',
        optionCode: 'q7_quiet_automation',
        label: 'An invisible automation that ran 500 times smoothly in the background, saving the team 15 hours.',
        categoryWeights: { automation_tools: 3 }
      },
      {
        id: 'q7-opt-c',
        optionCode: 'q7_empowered_team',
        label: 'A teammate telling you: "Your workshop finally made AI make sense to me—I use it every day now!"',
        categoryWeights: { people_edu: 3 }
      },
      {
        id: 'q7-opt-d',
        optionCode: 'q7_delighted_customer',
        label: 'A customer review stating: "That was the fastest, most helpful support experience I’ve ever had."',
        categoryWeights: { customer_exp: 3 }
      },
      {
        id: 'q7-opt-e',
        optionCode: 'q7_strategic_insight',
        label: 'A clean data dashboard that revealed an unexpected growth trend to company leadership.',
        categoryWeights: { data_tech: 2, business_ops: 2 }
      },
      {
        id: 'q7-opt-f',
        optionCode: 'q7_shipped_app',
        label: 'A live working web application or AI feature deployed to production with happy users.',
        categoryWeights: { data_tech: 3, automation_tools: 1 }
      }
    ]
  },
  {
    id: 'q-8-error-investigation',
    questionCode: 'q8_handling_unexpected',
    questionText: 'An AI tool returns an answer that is slightly off-target or unexpected. What is your natural diagnostic approach?',
    subtext: 'How your mind naturally troubleshoots problems.',
    categoryFocus: 'Diagnostic Mindset',
    orderIndex: 8,
    options: [
      {
        id: 'q8-opt-a',
        optionCode: 'q8_prompt_refine',
        label: 'Refine the wording, specify the persona more clearly, and add negative constraints.',
        categoryWeights: { creative_comm: 2, business_ops: 1 }
      },
      {
        id: 'q8-opt-b',
        optionCode: 'q8_check_source',
        label: 'Verify the source documentation to see if the knowledge base has conflicting or missing data.',
        categoryWeights: { customer_exp: 2, business_ops: 2 }
      },
      {
        id: 'q8-opt-c',
        optionCode: 'q8_test_logic_branch',
        label: 'Inspect the condition gates and variable routing in the automation canvas.',
        categoryWeights: { automation_tools: 3 }
      },
      {
        id: 'q8-opt-d',
        optionCode: 'q8_teach_user',
        label: 'Note down the mistake as a teaching example to show learners what prompt traps to avoid.',
        categoryWeights: { people_edu: 3 }
      },
      {
        id: 'q8-opt-e',
        optionCode: 'q8_inspect_data_code',
        label: 'Inspect the raw API payload, check parameter temperature/tokens, or test the underlying code.',
        categoryWeights: { data_tech: 3 }
      }
    ]
  },
  {
    id: 'q-9-business-impact',
    questionCode: 'q9_commercial_value',
    questionText: 'Which business metric feels most satisfying for you to improve?',
    subtext: 'Aligning with commercial business goals.',
    categoryFocus: 'Commercial Impact',
    orderIndex: 9,
    options: [
      {
        id: 'q9-opt-a',
        optionCode: 'q9_traffic_reach',
        label: 'Audience reach, social engagement, subscriber growth, and brand sentiment.',
        categoryWeights: { creative_comm: 3 }
      },
      {
        id: 'q9-opt-b',
        optionCode: 'q9_efficiency_speed',
        label: 'Operational turnaround time, meeting efficiency, and project milestone completion.',
        categoryWeights: { business_ops: 3 }
      },
      {
        id: 'q9-opt-c',
        optionCode: 'q9_manual_elimination',
        label: 'Hours of repetitive manual labor eliminated across teams.',
        categoryWeights: { automation_tools: 3 }
      },
      {
        id: 'q9-opt-d',
        optionCode: 'q9_employee_confidence',
        label: 'Employee AI proficiency scores, training completion rates, and reduction in tech anxiety.',
        categoryWeights: { people_edu: 3 }
      },
      {
        id: 'q9-opt-e',
        optionCode: 'q9_csat_retention',
        label: 'Customer Satisfaction Score (CSAT), first-response time, and churn reduction.',
        categoryWeights: { customer_exp: 3 }
      },
      {
        id: 'q9-opt-f',
        optionCode: 'q9_product_conversion',
        label: 'Feature adoption, data query speed, and technical system reliability.',
        categoryWeights: { data_tech: 3 }
      }
    ]
  },
  {
    id: 'q-10-learning-curiosity',
    questionCode: 'q10_learning_curiosity',
    questionText: 'If you had an uninterrupted 3-hour afternoon to master one new skill, which would you pick?',
    subtext: 'Your genuine curiosity is the strongest predictor of long-term career momentum.',
    categoryFocus: 'Curiosity Direction',
    orderIndex: 10,
    options: [
      {
        id: 'q10-opt-a',
        optionCode: 'q10_generative_art',
        label: 'Mastering image generation parameters (Midjourney/Flux) or editing AI video avatars.',
        categoryWeights: { creative_comm: 3 }
      },
      {
        id: 'q10-opt-b',
        optionCode: 'q10_second_brain',
        label: 'Building a personal knowledge system and automated meeting summarizer in Notion.',
        categoryWeights: { business_ops: 3 }
      },
      {
        id: 'q10-opt-c',
        optionCode: 'q10_make_automation',
        label: 'Building an autonomous agent that pulls web leads and updates an Airtable CRM automatically.',
        categoryWeights: { automation_tools: 3 }
      },
      {
        id: 'q10-opt-d',
        optionCode: 'q10_workshop_facilitation',
        label: 'Designing an interactive prompt engineering workshop to teach non-technical peers.',
        categoryWeights: { people_edu: 3 }
      },
      {
        id: 'q10-opt-e',
        optionCode: 'q10_support_rag_bot',
        label: 'Configuring a knowledge-base chatbot that answers customer questions accurately 24/7.',
        categoryWeights: { customer_exp: 2, automation_tools: 2 }
      },
      {
        id: 'q10-opt-f',
        optionCode: 'q10_coding_rag_app',
        label: 'Writing code to connect an LLM API to a database with vector search (pgvector).',
        categoryWeights: { data_tech: 3 }
      }
    ]
  },
  {
    id: 'q-11-collaboration-style',
    questionCode: 'q11_collaboration_style',
    questionText: 'What kind of role do you naturally fall into during group projects?',
    subtext: 'How your teammates count on you.',
    categoryFocus: 'Team Dynamics',
    orderIndex: 11,
    options: [
      {
        id: 'q11-opt-a',
        optionCode: 'q11_creator',
        label: 'The Creator: Bringing ideas to life through persuasive presentations and compelling copywriting.',
        categoryWeights: { creative_comm: 3 }
      },
      {
        id: 'q11-opt-b',
        optionCode: 'q11_organizer',
        label: 'The Organizer: Keeping track of timelines, consolidating meeting notes, and unblocking logjams.',
        categoryWeights: { business_ops: 3 }
      },
      {
        id: 'q11-opt-c',
        optionCode: 'q11_optimizer',
        label: 'The Systems Builder: Connecting tools and automating notifications so everyone stays synced.',
        categoryWeights: { automation_tools: 3 }
      },
      {
        id: 'q11-opt-d',
        optionCode: 'q11_facilitator',
        label: 'The Mentor: Helping struggling teammates understand tools and ensuring everyone feels heard.',
        categoryWeights: { people_edu: 3 }
      },
      {
        id: 'q11-opt-e',
        optionCode: 'q11_advocate',
        label: 'The User Advocate: Asking "How will this affect our customers?" and testing usability.',
        categoryWeights: { customer_exp: 3 }
      },
      {
        id: 'q11-opt-f',
        optionCode: 'q11_technician',
        label: 'The Technical Investigator: Diving into the data, specs, or code to figure out how it actually works.',
        categoryWeights: { data_tech: 3 }
      }
    ]
  },
  {
    id: 'q-12-career-vision',
    questionCode: 'q12_career_vision',
    questionText: 'Looking 1 to 2 years ahead in the AI era, where do you want your core professional reputation to be?',
    subtext: 'Your overarching career aspiration.',
    categoryFocus: 'Long-Term Career Aspiration',
    orderIndex: 12,
    options: [
      {
        id: 'q12-opt-a',
        optionCode: 'q12_content_lead',
        label: 'A recognized creative storyteller and AI content strategist producing high-impact campaigns.',
        categoryWeights: { creative_comm: 3 }
      },
      {
        id: 'q12-opt-b',
        optionCode: 'q12_operations_leader',
        label: 'An indispensable operations leader who makes businesses run with maximum speed and clarity.',
        categoryWeights: { business_ops: 3 }
      },
      {
        id: 'q12-opt-c',
        optionCode: 'q12_automation_architect',
        label: 'A go-to automation specialist who builds reliable no-code systems that save companies thousands of hours.',
        categoryWeights: { automation_tools: 3 }
      },
      {
        id: 'q12-opt-d',
        optionCode: 'q12_enablement_director',
        label: 'A trusted educator and change leader who empowers organizations to adopt AI responsibly.',
        categoryWeights: { people_edu: 3 }
      },
      {
        id: 'q12-opt-e',
        optionCode: 'q12_cx_architect',
        label: 'A customer experience leader who combines AI speed with human empathy to deliver world-class service.',
        categoryWeights: { customer_exp: 3 }
      },
      {
        id: 'q12-opt-f',
        optionCode: 'q12_tech_builder',
        label: 'A skilled technical contributor building data systems, AI features, or software applications.',
        categoryWeights: { data_tech: 3 }
      }
    ]
  }
];
