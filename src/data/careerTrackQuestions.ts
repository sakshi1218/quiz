import { QuizQuestion, CategoryCode } from '../types';

type OptDef = [string, Partial<Record<CategoryCode, number>>, Record<string, number>, string];

const makeQ = (
  id: string,
  order: number,
  cat: CategoryCode,
  text: string,
  focus: string,
  sub: string,
  opts: OptDef[]
): QuizQuestion => ({
  id,
  questionCode: id.replace(/-/g, '_'),
  questionText: text,
  subtext: sub,
  categoryFocus: focus,
  categoryCode: cat,
  orderIndex: order,
  options: opts.map(([label, categoryWeights, roleWeights, mindsetLabel], idx) => ({
    id: `${id}-opt-${String.fromCharCode(97 + idx)}`,
    optionCode: `${id}_opt_${String.fromCharCode(97 + idx)}`,
    label,
    scoreWeight: 3,
    categoryWeights,
    roleWeights,
    mindsetLabel
  }))
});

/**
 * 15 One-Liner Easy Technical Questions
 * Tailored for coding, data, systems, logic & engineering workflows.
 */
export const TECHNICAL_CAREER_QUESTIONS: QuizQuestion[] = [
  makeQ('tech-q1', 1, 'data_tech', 'What type of technical work excites you most?', 'Technical Interest', 'Choose the area you naturally gravitate toward.', [
    ['A. Writing code and building software apps', { data_tech: 4, automation_tools: 1 }, { ai_developer: 5 }, 'Software Development & Coding'],
    ['B. Analyzing data, numbers, and statistical patterns', { data_tech: 4 }, { junior_data_analyst: 5 }, 'Data Analytics & Statistics'],
    ['C. Connecting APIs and automating multi-step workflows', { automation_tools: 4, data_tech: 1 }, { ai_workflow_specialist: 5 }, 'Workflow Engineering & Integrations'],
    ['D. Designing intelligent chatbots and conversational AI', { automation_tools: 3, customer_exp: 2 }, { ai_chatbot_builder: 5 }, 'Conversational AI Systems']
  ]),

  makeQ('tech-q2', 2, 'data_tech', 'Which programming language or technical tool do you enjoy or want to learn?', 'Tool Preference', 'Pick the tool you feel most comfortable exploring.', [
    ['A. Python for AI scripts, machine learning & backend code', { data_tech: 4 }, { ai_developer: 5 }, 'Python & Core Algorithms'],
    ['B. SQL and spreadsheets for database queries & dashboards', { data_tech: 4 }, { junior_data_analyst: 5 }, 'Database Querying & BI Dashboards'],
    ['C. JavaScript / TypeScript for full-stack web applications', { data_tech: 3, automation_tools: 2 }, { ai_developer: 4, ai_product_coordinator: 2 }, 'Web Tech & Front-End Engineering'],
    ['D. No-code platforms (Zapier, Make, Flowise) for fast automation', { automation_tools: 4 }, { no_code_automation_specialist: 5 }, 'Visual Automation Architecture']
  ]),

  makeQ('tech-q3', 3, 'data_tech', 'How do you prefer to solve a difficult technical problem?', 'Problem Solving', 'Think about your natural debugging style.', [
    ['A. Read the error stack trace, test inputs, and fix the code', { data_tech: 4 }, { ai_developer: 5 }, 'Hands-on Code Debugging'],
    ['B. Inspect data tables, check missing values, and calculate averages', { data_tech: 4 }, { junior_data_analyst: 5 }, 'Data Interrogation & Statistical QA'],
    ['C. Map out a flowchart and rebuild the process logic', { automation_tools: 4 }, { ai_workflow_specialist: 5 }, 'System Flow & Process Architecture'],
    ['D. Ask an AI model with targeted prompts and test suggestions', { automation_tools: 3, data_tech: 2 }, { ai_chatbot_builder: 4, ai_product_coordinator: 3 }, 'AI-Assisted Diagnostics']
  ]),

  makeQ('tech-q4', 4, 'automation_tools', 'Which AI project sounds most exciting to build this week?', 'Project Excitement', 'Select your ideal weekend project.', [
    ['A. A custom Python script that automates web scraping and summarization', { data_tech: 4, automation_tools: 2 }, { ai_developer: 5 }, 'Autonomous Scrapers & Scripts'],
    ['B. An interactive PowerBI or Tableau dashboard tracking AI metrics', { data_tech: 4 }, { junior_data_analyst: 5 }, 'Interactive Data Visualization'],
    ['C. A WhatsApp or Telegram bot that answers user questions automatically', { automation_tools: 4, customer_exp: 1 }, { ai_chatbot_builder: 5 }, 'Automated Chatbot Solutions'],
    ['D. A multi-app automated pipeline syncing leads directly into a database', { automation_tools: 4, business_ops: 1 }, { ai_workflow_specialist: 5 }, 'Cross-Platform Automation']
  ]),

  makeQ('tech-q5', 5, 'data_tech', 'How comfortable are you with mathematics, statistics, and logic?', 'Math & Logic Comfort', 'Be honest about where your strengths lie.', [
    ['A. Very comfortable with logic, algorithms, and technical reasoning', { data_tech: 4 }, { ai_developer: 5 }, 'Algorithmic Thinking'],
    ['B. Strong with mathematical formulas, percentages, and charts', { data_tech: 4 }, { junior_data_analyst: 5 }, 'Quantitative & Numerical Reasoning'],
    ['C. Good with practical cause-and-effect logical conditions', { automation_tools: 4 }, { ai_workflow_specialist: 5 }, 'Conditional Logic & Workflows'],
    ['D. I prefer visual drag-and-drop builders over raw math', { automation_tools: 3, creative_comm: 1 }, { no_code_automation_specialist: 5 }, 'Applied Visual Solutions']
  ]),

  makeQ('tech-q6', 6, 'data_tech', 'When working with AI models (like GPT or Claude), what interests you most?', 'AI Model Interest', 'What aspect of AI technology fascinates you?', [
    ['A. Calling AI APIs, setting temperature, and writing backend integration code', { data_tech: 4 }, { ai_developer: 5 }, 'API Integration & Model Parameters'],
    ['B. Cleaning training data, evaluating model accuracy, and measuring error rates', { data_tech: 4 }, { junior_data_analyst: 5 }, 'Model Evaluation & Benchmarking'],
    ['C. Designing prompt chains that trigger different actions in business tools', { automation_tools: 4 }, { ai_workflow_specialist: 5 }, 'Prompt Chaining & Tool Triggers'],
    ['D. Crafting system prompts and persona rules for interactive assistant bots', { automation_tools: 3, customer_exp: 2 }, { ai_chatbot_builder: 5 }, 'Persona & Dialogue Design']
  ]),

  makeQ('tech-q7', 7, 'automation_tools', 'If a team member is doing repetitive copy-pasting every day, what do you do?', 'Automation Mindset', 'How would you eliminate the friction?', [
    ['A. Write a short Python or bash script to automate the entire file transfer', { data_tech: 4, automation_tools: 2 }, { ai_developer: 5 }, 'Custom Script Automation'],
    ['B. Build a Google Sheets formula or SQL view to auto-calculate the values', { data_tech: 4 }, { junior_data_analyst: 5 }, 'Spreadsheet & Query Automation'],
    ['C. Set up a Make.com or Zapier webhook to move data between the tools', { automation_tools: 4 }, { no_code_automation_specialist: 5 }, 'No-Code Integration'],
    ['D. Build a quick internal bot to accept files and respond with processed output', { automation_tools: 4 }, { ai_chatbot_builder: 4, ai_workflow_specialist: 4 }, 'Self-Service Micro-Bot']
  ]),

  makeQ('tech-q8', 8, 'data_tech', 'Which dataset or information format do you prefer working with?', 'Data Preference', 'Which format feels most natural to you?', [
    ['A. JSON payloads, API endpoints, and clean code repositories', { data_tech: 4 }, { ai_developer: 5 }, 'APIs & Developer Formats'],
    ['B. Relational tables, CSV files, and structured SQL databases', { data_tech: 4 }, { junior_data_analyst: 5 }, 'Relational Database Tables'],
    ['C. Webhooks, webhook headers, and trigger payloads between cloud apps', { automation_tools: 4 }, { ai_workflow_specialist: 5 }, 'Cloud Webhooks & Event Payloads'],
    ['D. User conversation histories, query FAQs, and prompt transcripts', { automation_tools: 3, customer_exp: 2 }, { ai_chatbot_builder: 5 }, 'Conversational Transcripts']
  ]),

  makeQ('tech-q9', 9, 'data_tech', 'What is your current programming or coding experience?', 'Coding Experience', 'Select your current comfort level with code.', [
    ['A. Intermediate to Advanced: I write scripts or apps independently', { data_tech: 5 }, { ai_developer: 5 }, 'Independent Coder'],
    ['B. Analytical: I know basic Python, SQL, or Excel formulas comfortably', { data_tech: 4 }, { junior_data_analyst: 5 }, 'Data & Query Proficiency'],
    ['C. Practical Explorer: I know technical concepts and prefer visual logic tools', { automation_tools: 4 }, { ai_workflow_specialist: 5 }, 'Logic & Flow Builder'],
    ['D. Beginner: Eager to learn hands-on technical and coding skills from scratch', { data_tech: 3, automation_tools: 2 }, { ai_product_coordinator: 4, no_code_automation_specialist: 4 }, 'Aspiring Tech Learner']
  ]),

  makeQ('tech-q10', 10, 'automation_tools', 'If an automated pipeline breaks in production, what is your first step?', 'Troubleshooting', 'How do you approach a broken workflow?', [
    ['A. Check the error log in the terminal, identify the failed line, and re-run', { data_tech: 4 }, { ai_developer: 5 }, 'Log & Stack Trace Inspection'],
    ['B. Verify if a data field was null, malformed, or exceeded expected size', { data_tech: 4 }, { junior_data_analyst: 5 }, 'Data Validation & Null Checks'],
    ['C. Inspect the webhook execution history and re-send the test payload', { automation_tools: 4 }, { ai_workflow_specialist: 5 }, 'Webhook History Debugging'],
    ['D. Review user input logs to see what question caused the bot to fail', { automation_tools: 4 }, { ai_chatbot_builder: 5 }, 'Dialogue Intent Triage']
  ]),

  makeQ('tech-q11', 11, 'data_tech', 'Which workspace environment feels most like home to you?', 'Developer Environment', 'Where do you do your best thinking?', [
    ['A. VS Code, Git branches, and command line terminals', { data_tech: 4 }, { ai_developer: 5 }, 'Code IDE & Command Line'],
    ['B. Jupyter Notebooks, Excel, SQL queries, and charting tools', { data_tech: 4 }, { junior_data_analyst: 5 }, 'Notebooks & Query Consoles'],
    ['C. Automation canvases with node-based connected blocks (Make/Zapier)', { automation_tools: 4 }, { no_code_automation_specialist: 5 }, 'Node-Based Canvas'],
    ['D. Bot studio builders and AI prompt playgrounds', { automation_tools: 4 }, { ai_chatbot_builder: 5 }, 'Bot Studio & Playground']
  ]),

  makeQ('tech-q12', 12, 'data_tech', 'How do you verify that your technical solution is working properly?', 'Verification Method', 'How do you ensure reliability?', [
    ['A. Write automated unit tests and test edge cases with sample inputs', { data_tech: 4 }, { ai_developer: 5 }, 'Unit Tests & Edge Case Testing'],
    ['B. Cross-check calculated summary metrics against raw source records', { data_tech: 4 }, { junior_data_analyst: 5 }, 'Metric Validation & Reconciliation'],
    ['C. Trigger a live test run through all connected app steps and check output', { automation_tools: 4 }, { ai_workflow_specialist: 5 }, 'Live End-to-End Run'],
    ['D. Test edge case questions to ensure the bot gives safe, helpful answers', { automation_tools: 4 }, { ai_chatbot_builder: 5 }, 'Interactive Conversation QA']
  ]),

  makeQ('tech-q13', 13, 'automation_tools', 'Which engineering role on a tech team best describes you?', 'Team Contribution', 'How do you like to contribute?', [
    ['A. Core software engineer writing clean, reusable backend code', { data_tech: 4 }, { ai_developer: 5 }, 'Backend & Systems Engineer'],
    ['B. Quantitative investigator turning data into insights and graphs', { data_tech: 4 }, { junior_data_analyst: 5 }, 'Data & Quantitative Specialist'],
    ['C. Systems integrator connecting business tools into seamless workflows', { automation_tools: 4 }, { ai_workflow_specialist: 5 }, 'Integration Architect'],
    ['D. Technical coordinator translating customer needs into AI features', { data_tech: 2, automation_tools: 2, business_ops: 2 }, { ai_product_coordinator: 5 }, 'Technical Product Coordinator']
  ]),

  makeQ('tech-q14', 14, 'data_tech', 'What kind of impact do you want your technical AI work to deliver?', 'Career Impact', 'What measure of success matters most to you?', [
    ['A. Build robust software applications that handle thousands of requests smoothly', { data_tech: 4 }, { ai_developer: 5 }, 'High-Performance Software'],
    ['B. Uncover hidden trends that help leadership make smart data-backed decisions', { data_tech: 4 }, { junior_data_analyst: 5 }, 'Data-Driven Decision Making'],
    ['C. Save the business hundreds of hours each month by removing manual operations', { automation_tools: 4 }, { ai_workflow_specialist: 5 }, 'Operational Time Savings'],
    ['D. Create smart bots that solve user problems in seconds around the clock', { automation_tools: 4, customer_exp: 1 }, { ai_chatbot_builder: 5 }, '24/7 Intelligent Support']
  ]),

  makeQ('tech-q15', 15, 'data_tech', 'What is your primary AI career goal for this technical test?', 'Career Goal', 'Which career outcome are you aiming for?', [
    ['A. Become an AI Developer building custom models, apps, and agents', { data_tech: 5 }, { ai_developer: 5 }, 'AI Software Engineer'],
    ['B. Become a Data Analyst leveraging Python, SQL, and AI analytics tools', { data_tech: 4, business_ops: 1 }, { junior_data_analyst: 5 }, 'AI Data Analyst'],
    ['C. Become an AI Workflow Specialist automating company processes', { automation_tools: 4, data_tech: 1 }, { ai_workflow_specialist: 5 }, 'AI Automation Architect'],
    ['D. Upskill in AI technology to boost my career growth and salary', { data_tech: 3, automation_tools: 3 }, { ai_product_coordinator: 4, no_code_automation_specialist: 4 }, 'Tech Career Advancement']
  ])
];

/**
 * 15 One-Liner Easy Non-Technical Questions
 * Tailored for content, storytelling, business ops, prompting, support & education.
 */
export const NON_TECHNICAL_CAREER_QUESTIONS: QuizQuestion[] = [
  makeQ('nontech-q1', 1, 'creative_comm', 'What type of creative or business work do you enjoy most?', 'Creative & Ops Interest', 'Choose what feels most engaging.', [
    ['A. Writing creative articles, blog posts, and compelling stories', { creative_comm: 4 }, { ai_content_creator: 5 }, 'Content Writing & Storytelling'],
    ['B. Planning projects, organizing schedules, and tracking deliverables', { business_ops: 4 }, { ai_business_ops_assistant: 5 }, 'Project Planning & Operations'],
    ['C. Helping customers solve issues and ensuring they have a great experience', { customer_exp: 4 }, { ai_customer_support_specialist: 5 }, 'Customer Empathy & Support'],
    ['D. Teaching, mentoring, and explaining complex ideas simply', { people_edu: 4 }, { ai_trainer: 5 }, 'Education & Mentorship']
  ]),

  makeQ('nontech-q2', 2, 'creative_comm', 'How do you usually use ChatGPT or other AI tools today?', 'AI Tool Usage', 'How does AI fit into your routine?', [
    ['A. Drafting creative headlines, articles, newsletters, or marketing copy', { creative_comm: 4 }, { ai_content_creator: 5 }, 'Creative Copy Generation'],
    ['B. Summarizing long meetings, organizing notes, and writing clear emails', { business_ops: 4 }, { ai_productivity_specialist: 5 }, 'Productivity & Note Organization'],
    ['C. Brainstorming viral hooks, captions, and social media campaigns', { creative_comm: 4 }, { ai_social_media_specialist: 5 }, 'Social Media Strategy'],
    ['D. Researching topics, verifying facts, and comparing different opinions', { business_ops: 3, people_edu: 2 }, { ai_research_assistant: 5 }, 'In-Depth Research']
  ]),

  makeQ('nontech-q3', 3, 'business_ops', 'Which achievement gives you the most satisfaction at work?', 'Personal Satisfaction', 'Think about your proudest moments.', [
    ['A. Publishing an engaging post or newsletter that gets hundreds of likes', { creative_comm: 4 }, { ai_social_media_specialist: 5 }, 'Audience Engagement'],
    ['B. Turning a chaotic, disorganized workflow into a clean, smooth process', { business_ops: 4 }, { ai_business_ops_assistant: 5 }, 'Process Streamlining'],
    ['C. Resolving an angry customer query and turning them into a happy advocate', { customer_exp: 4 }, { ai_customer_support_specialist: 5 }, 'Customer Delight'],
    ['D. Seeing a student or colleague successfully apply a skill you taught them', { people_edu: 4 }, { ai_trainer: 5 }, 'Learner Breakthrough']
  ]),

  makeQ('nontech-q4', 4, 'creative_comm', 'When writing prompts for an AI tool, what is most important to you?', 'Prompt Crafting', 'What makes a prompt successful in your eyes?', [
    ['A. Getting the tone of voice, style, and emotional nuance just right', { creative_comm: 4 }, { ai_content_creator: 5 }, 'Voice & Tone Mastery'],
    ['B. Giving structured bullet points, constraints, and clear task boundaries', { business_ops: 4 }, { ai_productivity_specialist: 5 }, 'Structured Prompt Guidelines'],
    ['C. Crafting persuasive sales hooks with compelling calls to action', { creative_comm: 3, business_ops: 2 }, { ai_marketing_assistant: 5 }, 'Persuasive Sales Copy'],
    ['D. Building a reusable template that non-tech team members can use', { people_edu: 4 }, { ai_learning_content_designer: 5 }, 'Reusable Prompt Templates']
  ]),

  makeQ('nontech-q5', 5, 'creative_comm', 'Which workspace tool do you feel most comfortable working in?', 'Preferred Tools', 'Where are you most productive?', [
    ['A. Canva, Figma, or graphic and video creation tools', { creative_comm: 4 }, { ai_content_creator: 5 }, 'Visual Design Tools'],
    ['B. Notion, Google Docs, spreadsheets, or project boards (Trello/Asana)', { business_ops: 4 }, { ai_business_ops_assistant: 5 }, 'Productivity & Project Boards'],
    ['C. Social media apps (LinkedIn, Instagram, YouTube, Twitter/X)', { creative_comm: 4 }, { ai_social_media_specialist: 5 }, 'Social Channels'],
    ['D. Email, Zendesk, customer chat, or support ticketing systems', { customer_exp: 4 }, { ai_customer_support_specialist: 5 }, 'Helpdesk & Support Channels']
  ]),

  makeQ('nontech-q6', 6, 'creative_comm', 'If an AI output looks generic or inaccurate, how do you handle it?', 'Quality Refinement', 'How do you fix poor AI answers?', [
    ['A. Add creative adjectives, real-life examples, and refine the voice', { creative_comm: 4 }, { ai_content_creator: 5 }, 'Tone & Stylistic Refinement'],
    ['B. Break the prompt into smaller steps and provide exact context details', { business_ops: 4 }, { ai_productivity_specialist: 5 }, 'Step-by-Step Task Decomposition'],
    ['C. Fact-check the draft against original reports to eliminate inaccuracies', { business_ops: 4 }, { ai_research_assistant: 5 }, 'Fact-Checking Diligence'],
    ['D. Document the mistake and update the official FAQ answer bank', { customer_exp: 4 }, { knowledge_base_specialist: 5 }, 'Knowledge Base Curation']
  ]),

  makeQ('nontech-q7', 7, 'business_ops', 'Which non-technical AI project would you be most proud to lead?', 'Project Vision', 'Pick the project you would showcase in your portfolio.', [
    ['A. A 30-day AI-generated social media content calendar with visuals', { creative_comm: 4 }, { ai_social_media_specialist: 5 }, 'AI Social Media Campaign'],
    ['B. An AI-powered company standard operating procedure (SOP) handbook', { business_ops: 4 }, { ai_business_ops_assistant: 5 }, 'Company Operations Handbook'],
    ['C. A self-service customer support knowledge base with instant search', { customer_exp: 4 }, { knowledge_base_specialist: 5 }, 'Customer Help Center'],
    ['D. A 4-week interactive training workshop helping employees master AI tools', { people_edu: 4 }, { ai_trainer: 5 }, 'Corporate AI Training Workshop']
  ]),

  makeQ('nontech-q8', 8, 'customer_exp', 'How would team members describe your communication style?', 'Communication Style', 'What is your natural superpower?', [
    ['A. Creative, expressive, and full of storytelling energy', { creative_comm: 4 }, { ai_content_creator: 5 }, 'Expressive Storyteller'],
    ['B. Clear, structured, and focused on practical action items', { business_ops: 4 }, { ai_productivity_specialist: 5 }, 'Structured Organizer'],
    ['C. Warm, empathetic, and patient when listening to customer frustrations', { customer_exp: 4 }, { ai_customer_support_specialist: 5 }, 'Empathetic Listener'],
    ['D. Encouraging, educational, and great at breaking down difficult concepts', { people_edu: 4 }, { ai_adoption_coordinator: 5 }, 'Inspirational Educator']
  ]),

  makeQ('nontech-q9', 9, 'creative_comm', 'How do you prefer to spend a typical productive workday?', 'Daily Routine', 'What feels like the best use of your day?', [
    ['A. Brainstorming creative angles, writing copy, and editing videos or visuals', { creative_comm: 4 }, { ai_content_creator: 5 }, 'Creative Production'],
    ['B. Reviewing team priorities, summarizing research, and organizing schedules', { business_ops: 4 }, { ai_business_ops_assistant: 5 }, 'Team Coordination'],
    ['C. Chatting with clients, answering tickets, and helping users resolve problems', { customer_exp: 4 }, { ai_customer_support_specialist: 5 }, 'Direct User Interaction'],
    ['D. Creating slide presentations, lesson modules, and how-to tutorial guides', { people_edu: 4 }, { ai_learning_content_designer: 5 }, 'Learning Design']
  ]),

  makeQ('nontech-q10', 10, 'business_ops', 'How do you decide if a piece of work is ready for the public or clients?', 'Quality Standards', 'What is your review criteria?', [
    ['A. It grabs attention immediately, looks visually stunning, and reads smoothly', { creative_comm: 4 }, { ai_marketing_assistant: 5 }, 'Engagement & Aesthetic Appeal'],
    ['B. It is 100% accurate, clearly organized, and leaves zero unanswered questions', { business_ops: 4 }, { ai_research_assistant: 5 }, 'Accuracy & Thoroughness'],
    ['C. It provides immediate, effortless answers that solve the customer problem', { customer_exp: 4 }, { knowledge_base_specialist: 5 }, 'User Clarity & Ease of Use'],
    ['D. It is clear enough that even an absolute beginner can understand it easily', { people_edu: 4 }, { ai_trainer: 5 }, 'Beginner-Friendly Accessibility']
  ]),

  makeQ('nontech-q11', 11, 'business_ops', 'What kind of business challenge interests you most?', 'Business Passion', 'Where do you make the biggest difference?', [
    ['A. Growing social media followers, email subscribers, and website visitors', { creative_comm: 4 }, { ai_social_media_specialist: 5 }, 'Audience Growth & Traffic'],
    ['B. Helping busy managers save 10+ hours a week through smarter organization', { business_ops: 4 }, { ai_productivity_specialist: 5 }, 'Executive Productivity'],
    ['C. Turning negative reviews into five-star ratings through fast, caring support', { customer_exp: 4 }, { cx_automation_specialist: 5 }, 'Customer Delight & Retention'],
    ['D. Helping employees overcome their fear of AI and adopt tools with confidence', { people_edu: 4 }, { ai_adoption_coordinator: 5 }, 'Workforce AI Adoption']
  ]),

  makeQ('nontech-q12', 12, 'people_edu', 'When explaining a new concept to others, which format works best for you?', 'Knowledge Sharing', 'How do you deliver training?', [
    ['A. A short visual video or an engaging social media infographic', { creative_comm: 4 }, { ai_content_creator: 5 }, 'Visual & Video Explainers'],
    ['B. A step-by-step checklist or written handbook with clear guidelines', { business_ops: 4 }, { ai_business_ops_assistant: 5 }, 'SOPs & Checklists'],
    ['C. A clean FAQ page with quick answers and troubleshooting steps', { customer_exp: 4 }, { knowledge_base_specialist: 5 }, 'Searchable FAQs'],
    ['D. A live interactive demonstration with hands-on practice and Q&A', { people_edu: 4 }, { ai_trainer: 5 }, 'Interactive Demonstrations']
  ]),

  makeQ('nontech-q13', 13, 'customer_exp', 'What is your focus when interacting with clients or customers?', 'Customer Focus', 'What do you prioritize most?', [
    ['A. Making them feel heard, understood, and appreciated with warm empathy', { customer_exp: 4 }, { ai_customer_support_specialist: 5 }, 'Warm Empathy & Care'],
    ['B. Delivering swift, accurate answers that resolve their issue on the first touch', { customer_exp: 4 }, { cx_automation_specialist: 5 }, 'First-Contact Resolution'],
    ['C. Understanding what they need and creating content that answers their questions', { creative_comm: 3, customer_exp: 2 }, { ai_marketing_assistant: 5 }, 'Needs-Based Communication'],
    ['D. Teaching them best practices so they feel confident using the product', { people_edu: 4 }, { ai_adoption_coordinator: 5 }, 'Client Enablement']
  ]),

  makeQ('nontech-q14', 14, 'business_ops', 'Which type of company culture sounds most attractive to you?', 'Work Culture', 'Where do you see yourself thriving?', [
    ['A. A fast-moving creative agency, media studio, or digital brand', { creative_comm: 4 }, { ai_content_creator: 5 }, 'Creative Agency Studio'],
    ['B. A modern tech startup or consulting firm focused on high efficiency', { business_ops: 4 }, { ai_business_ops_assistant: 5 }, 'Tech Startup Operations'],
    ['C. A customer-first company with a strong community and user focus', { customer_exp: 4 }, { ai_customer_support_specialist: 5 }, 'Customer & Community Care'],
    ['D. An education academy, coaching firm, or corporate learning institute', { people_edu: 4 }, { ai_trainer: 5 }, 'Education & Learning Org']
  ]),

  makeQ('nontech-q15', 15, 'creative_comm', 'What is your primary AI career goal for this non-technical test?', 'Career Goal', 'Which role would you love to step into?', [
    ['A. AI Content Creator or Social Media Specialist building high-impact media', { creative_comm: 5 }, { ai_content_creator: 5 }, 'AI Content & Social Media'],
    ['B. AI Business Operations or Productivity Specialist optimizing company workflows', { business_ops: 5 }, { ai_business_ops_assistant: 5 }, 'AI Business Operations'],
    ['C. AI Customer Experience or Knowledge Base Specialist improving support', { customer_exp: 5 }, { ai_customer_support_specialist: 5 }, 'AI Customer Experience'],
    ['D. AI Trainer or Adoption Specialist helping non-technical teams succeed', { people_edu: 5 }, { ai_trainer: 5 }, 'AI Trainer & Educator']
  ])
];
