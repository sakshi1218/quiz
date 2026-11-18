import {
  StudentProfileInput,
  RecommendedCareerOption,
  CareerGuidanceResultData,
  AdjacentCareerUnlock,
  HighImpactSkillMultiplier
} from '../types';

export interface CareerMasterDefinition {
  id: string;
  careerName: string;
  careerDescription: string;
  primaryDomain: string;
  careerType: 'Technical' | 'Non-Technical' | 'Business-Oriented' | 'Hybrid (Technical + Business)';
  salaryRange: string;
  requiredSkills: string[];
  recommendedSoftwareAndTools: string[];
  industryOpportunities: string;
  compatibleQualifications: string[];
  compatibleSpecializations: string[];
  compatibleInterests: string[];
  learningRoadmap: {
    phase: string;
    duration: string;
    focus: string;
    milestone: string;
  }[];
  suggestedProjects: {
    projectTitle: string;
    description: string;
    toolsUsed: string[];
    deliverable: string;
  }[];
}

export const CAREER_MASTER_DATABASE: CareerMasterDefinition[] = [
  // 1. Financial Data Analyst
  {
    id: 'financial-data-analyst',
    careerName: 'Financial Data Analyst',
    careerDescription: 'Synthesizes corporate financial statements, transaction data, and market metrics into predictive valuation models and executive dashboards.',
    primaryDomain: 'Finance & Analytics',
    careerType: 'Hybrid (Technical + Business)',
    salaryRange: '₹8.5 – 17 LPA',
    requiredSkills: ['Financial Analysis', 'SQL', 'Excel', 'Power BI', 'Python'],
    recommendedSoftwareAndTools: ['Power BI', 'SQL Server / PostgreSQL', 'Excel (Advanced)', 'Python (Pandas)', 'Bloomberg / Capital IQ'],
    industryOpportunities: 'High demand across Investment Banks, Fintech scale-ups, Corporate Treasury, and Global Capability Centers (JPMorgan, Goldman Sachs, Deloitte, HDFC).',
    compatibleQualifications: ['MBA', 'B.Com', 'BBA', 'B.Tech', 'B.Sc', 'MCA'],
    compatibleSpecializations: ['Finance', 'Business Analytics', 'Computer Science', 'Accounting & Finance', 'Mathematics & Statistics', 'IT'],
    compatibleInterests: ['Finance', 'Data & Analytics', 'Business & Management'],
    learningRoadmap: [
      { phase: 'Phase 1: Financial & Data Foundations', duration: 'Weeks 1–3', focus: 'Financial statement analysis, advanced Excel modeling, and SQL database querying.', milestone: 'Build a multi-table SQL financial ledger query.' },
      { phase: 'Phase 2: BI Dashboarding & Metrics', duration: 'Weeks 4–6', focus: 'Automated KPI dashboards in Power BI or Tableau with DAX formulas.', milestone: 'Deliver an executive cash-flow and variance dashboard.' },
      { phase: 'Phase 3: Python Automation & Forecasting', duration: 'Weeks 7–10', focus: 'Pandas data wrangling, time-series forecasting, and automated PDF reporting.', milestone: 'Publish a public GitHub / Notion portfolio project.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Corporate Earnings & Variance Intelligence Dashboard',
        description: 'Analyzed 3 years of quarterly financial statements, tracking EBITDA margins, debt service ratios, and forecasting revenue using SQL and Power BI.',
        toolsUsed: ['Excel', 'SQL', 'Power BI'],
        deliverable: 'Interactive Power BI report connected to a PostgreSQL database.'
      }
    ]
  },

  // 2. Business Intelligence Analyst
  {
    id: 'bi-analyst',
    careerName: 'Business Intelligence Analyst',
    careerDescription: 'Transforms messy operational and customer databases into clean semantic layers, automated KPI scorecards, and strategic business intelligence.',
    primaryDomain: 'Data & Analytics',
    careerType: 'Hybrid (Technical + Business)',
    salaryRange: '₹8 – 16 LPA',
    requiredSkills: ['SQL', 'Power BI', 'Tableau', 'Excel', 'Business Analysis'],
    recommendedSoftwareAndTools: ['Power BI', 'Tableau', 'SQL (PostgreSQL / Snowflake)', 'Excel', 'dbt'],
    industryOpportunities: 'Universal corporate requirement across E-commerce, SaaS, Supply Chain, Healthcare, and Retail (Amazon, Walmart, Flipkart, Swiggy, EY).',
    compatibleQualifications: ['MBA', 'BBA', 'B.Tech', 'BCA', 'MCA', 'B.Com', 'B.Sc'],
    compatibleSpecializations: ['Business Analytics', 'Finance', 'Marketing', 'Computer Science', 'IT', 'Operations', 'General Management'],
    compatibleInterests: ['Data & Analytics', 'Business & Management', 'Operations'],
    learningRoadmap: [
      { phase: 'Phase 1: SQL & Data Modeling', duration: 'Weeks 1–3', focus: 'Star-schema data modeling, relational joins, aggregations, and window functions.', milestone: 'Design an analytics data mart with fact and dimension tables.' },
      { phase: 'Phase 2: Modern Visualization', duration: 'Weeks 4–7', focus: 'Power BI / Tableau calculated fields, dynamic parameters, and UX design for executives.', milestone: 'Create a live cross-departmental KPI scorecard.' },
      { phase: 'Phase 3: Business Storytelling', duration: 'Weeks 8–10', focus: 'Translating charts into executive decision memos and automated scheduled alerts.', milestone: 'Publish an end-to-end BI case study.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'End-to-End E-Commerce Supply Chain BI Dashboard',
        description: 'Modeled customer order histories, logistics delivery times, and inventory turn ratios into an automated decision dashboard.',
        toolsUsed: ['SQL', 'Power BI', 'Excel'],
        deliverable: 'Live interactive dashboard with drill-through capability.'
      }
    ]
  },

  // 3. FinTech Analyst
  {
    id: 'fintech-analyst',
    careerName: 'FinTech Analyst',
    careerDescription: 'Evaluates digital payment streams, automated lending algorithms, credit risk heuristics, and API financial architectures.',
    primaryDomain: 'Finance & Technology',
    careerType: 'Hybrid (Technical + Business)',
    salaryRange: '₹8 – 17 LPA',
    requiredSkills: ['Financial Analysis', 'SQL', 'Python', 'Business Analysis', 'Market Research'],
    recommendedSoftwareAndTools: ['SQL', 'Python', 'Excel', 'Postman / API Tools', 'Tableau'],
    industryOpportunities: 'Rapidly growing segment across Neo-banks, UPI Payment Processors, P2P Lending, and Digital Wealth platforms (CRED, Razorpay, PhonePe, Paytm, Stripe).',
    compatibleQualifications: ['MBA', 'B.Tech', 'B.Com', 'BBA', 'BCA', 'MCA'],
    compatibleSpecializations: ['Finance', 'Computer Science', 'Business Analytics', 'IT', 'Economics'],
    compatibleInterests: ['Finance', 'Artificial Intelligence', 'Data & Analytics', 'Business & Management'],
    learningRoadmap: [
      { phase: 'Phase 1: Digital Banking Mechanics', duration: 'Weeks 1–3', focus: 'UPI protocols, payment gateway flows, and credit underwriting fundamentals.', milestone: 'Document an end-to-end digital lending lifecycle flow.' },
      { phase: 'Phase 2: Payment Data & SQL Querying', duration: 'Weeks 4–6', focus: 'Querying high-volume transactional logs to detect drop-offs and fee leakage.', milestone: 'Write SQL anomaly queries on payment transaction records.' },
      { phase: 'Phase 3: FinTech Product & Regulatory Audit', duration: 'Weeks 7–10', focus: 'RBI compliance, API integration testing, and unit economics modeling.', milestone: 'Complete a full FinTech product teardown and growth thesis.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Digital Loan Default Prediction & Portfolio Risk Engine',
        description: 'Modeled borrower credit factors using Python and SQL to identify high-risk loan applicant clusters.',
        toolsUsed: ['Python', 'SQL', 'Financial Analysis'],
        deliverable: 'Risk classification notebook with executive findings deck.'
      }
    ]
  },

  // 4. Risk Analyst
  {
    id: 'risk-analyst',
    careerName: 'Risk Analyst',
    careerDescription: 'Quantifies credit default probabilities, liquidity buffers, operational hazards, and regulatory compliance risks.',
    primaryDomain: 'Finance & Risk Management',
    careerType: 'Business-Oriented',
    salaryRange: '₹7 – 15 LPA',
    requiredSkills: ['Financial Analysis', 'Excel', 'SQL', 'Market Research', 'Business Analysis'],
    recommendedSoftwareAndTools: ['Excel (Advanced Models)', 'SQL', 'SAS / Python', 'Power BI'],
    industryOpportunities: 'Pivotal function across Commercial Banks, Credit Rating Agencies, Insurance, and Asset Management (Crisil, ICICI Bank, Standard Chartered, Moody’s).',
    compatibleQualifications: ['MBA', 'B.Com', 'BBA', 'B.Sc', 'BA'],
    compatibleSpecializations: ['Finance', 'Economics', 'Accounting & Finance', 'Business Analytics', 'Mathematics & Statistics'],
    compatibleInterests: ['Finance', 'Business & Management', 'Research'],
    learningRoadmap: [
      { phase: 'Phase 1: Risk Frameworks & Basel Standards', duration: 'Weeks 1–3', focus: 'Credit risk, market risk, operational risk, and VaR (Value at Risk) principles.', milestone: 'Draft a credit risk assessment matrix for mid-market corporate loans.' },
      { phase: 'Phase 2: Data Validation & Sensitivity Modeling', duration: 'Weeks 4–7', focus: 'Monte Carlo simulations, stress testing in Excel, and multi-scenario SQL tables.', milestone: 'Build an Excel stress-testing model under interest rate shocks.' },
      { phase: 'Phase 3: Regulatory Reporting & Audit', duration: 'Weeks 8–10', focus: 'Executive risk dashboards, compliance memos, and presentation to audit committees.', milestone: 'Publish a risk audit case study.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Corporate Credit Scoring & Probability of Default Model',
        description: 'Evaluated balance sheet liquidity, interest coverage, and macroeconomic factors to classify commercial loan risks.',
        toolsUsed: ['Excel', 'SQL', 'Financial Analysis'],
        deliverable: 'Comprehensive credit rating scorecard and report.'
      }
    ]
  },

  // 5. Business Analyst
  {
    id: 'business-analyst',
    careerName: 'Business Analyst',
    careerDescription: 'Bridges business stakeholders and engineering teams by translating customer objectives into detailed functional requirements and process maps.',
    primaryDomain: 'Business & Technology',
    careerType: 'Business-Oriented',
    salaryRange: '₹8 – 16 LPA',
    requiredSkills: ['Business Analysis', 'Excel', 'SQL', 'Project Management', 'Market Research'],
    recommendedSoftwareAndTools: ['Jira', 'Confluence', 'SQL', 'Lucidchart / Miro', 'Excel', 'Power BI'],
    industryOpportunities: 'Ubiquitous role across IT Consultancies, Product Enterprises, Banks, and Healthcare providers (Accenture, Infosys, Cognizant, TCS, Deloitte).',
    compatibleQualifications: ['MBA', 'BBA', 'B.Tech', 'BCA', 'MCA', 'B.Com', 'BA'],
    compatibleSpecializations: ['General Management', 'Business Analytics', 'Finance', 'Marketing', 'Computer Science', 'IT', 'Operations'],
    compatibleInterests: ['Business & Management', 'Operations', 'Software Development', 'Data & Analytics'],
    learningRoadmap: [
      { phase: 'Phase 1: Requirements Engineering & Documentation', duration: 'Weeks 1–3', focus: 'Writing BRDs, FRDs, User Stories, and Acceptance Criteria.', milestone: 'Create a complete Business Requirement Document (BRD) for an app feature.' },
      { phase: 'Phase 2: Process Flow & Data Validation', duration: 'Weeks 4–6', focus: 'BPMN process diagrams, state diagrams, and SQL database sanity checks.', milestone: 'Map the "As-Is" vs "To-Be" workflow diagrams in Lucidchart.' },
      { phase: 'Phase 3: Agile Execution & Stakeholder Management', duration: 'Weeks 7–10', focus: 'Sprint planning in Jira, backlog grooming, and UAT testing cycles.', milestone: 'Lead a mock UAT testing session with documented test cases.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Enterprise CRM Migration Business Blueprint & BRD',
        description: 'Documented stakeholder requirements, mapped sales workflow logic, and defined data validation rules for a CRM migration.',
        toolsUsed: ['Business Analysis', 'Jira', 'Excel', 'Lucidchart'],
        deliverable: 'Complete 25-page BRD with process architecture diagram.'
      }
    ]
  },

  // 6. Marketing Data Analyst
  {
    id: 'marketing-data-analyst',
    careerName: 'Marketing Data Analyst',
    careerDescription: 'Measures multi-channel digital campaign performance, attribution models, customer acquisition costs (CAC), and customer lifetime value (LTV).',
    primaryDomain: 'Marketing & Analytics',
    careerType: 'Hybrid (Technical + Business)',
    salaryRange: '₹8 – 16 LPA',
    requiredSkills: ['Excel', 'SQL', 'Google Analytics', 'Digital Marketing', 'Power BI'],
    recommendedSoftwareAndTools: ['Google Analytics 4', 'SQL', 'Excel', 'Tableau / Power BI', 'Google Looker Studio'],
    industryOpportunities: 'Essential for Direct-to-Consumer brands, E-commerce, Media Agencies, and Tech Unicorns (Nykaa, Zomato, GroupM, Ogilvy, Swiggy).',
    compatibleQualifications: ['MBA', 'BBA', 'B.Com', 'BA', 'B.Tech', 'B.Sc'],
    compatibleSpecializations: ['Marketing', 'Business Analytics', 'Digital Business', 'Journalism & Mass Comm', 'Commerce'],
    compatibleInterests: ['Marketing', 'Data & Analytics', 'Business & Management'],
    learningRoadmap: [
      { phase: 'Phase 1: Web Analytics & Tracking', duration: 'Weeks 1–3', focus: 'Google Analytics 4 events, UTM parameters, and conversion funnel tracking.', milestone: 'Set up custom conversion events in GA4 and Looker Studio.' },
      { phase: 'Phase 2: SQL Customer Cohort Analysis', duration: 'Weeks 4–6', focus: 'Calculating retention rates, CAC payback periods, and customer cohorts in SQL.', milestone: 'Write cohort retention queries on raw user order tables.' },
      { phase: 'Phase 3: Attribution & Budget Optimization', duration: 'Weeks 7–10', focus: 'Multi-touch attribution models and marketing mix ROI dashboards.', milestone: 'Publish a marketing analytics case study.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Multi-Channel Acquisition & CAC/LTV Performance Dashboard',
        description: 'Analyzed Google Ads, Meta Ads, and Organic Search traffic to calculate channel ROI and customer retention cohorts.',
        toolsUsed: ['Google Analytics', 'SQL', 'Excel', 'Power BI'],
        deliverable: 'Automated Looker Studio dashboard tracking ROAS and CAC.'
      }
    ]
  },

  // 7. Growth Analyst
  {
    id: 'growth-analyst',
    careerName: 'Growth Analyst',
    careerDescription: 'Designs A/B experiments, viral loops, onboarding funnels, and activation hooks to accelerate user acquisition and revenue retention.',
    primaryDomain: 'Product & Marketing Growth',
    careerType: 'Hybrid (Technical + Business)',
    salaryRange: '₹9 – 18 LPA',
    requiredSkills: ['Google Analytics', 'SQL', 'Digital Marketing', 'Excel', 'Market Research'],
    recommendedSoftwareAndTools: ['Mixpanel / Amplitude', 'SQL', 'Google Analytics 4', 'Excel', 'Optimizely / VWO'],
    industryOpportunities: 'High-growth tech startups, SaaS companies, and consumer internet apps (Cred, Meesho, Zerodha, Postman, Duolingo).',
    compatibleQualifications: ['MBA', 'BBA', 'B.Tech', 'BCA', 'B.Com'],
    compatibleSpecializations: ['Marketing', 'Business Analytics', 'Computer Science', 'General Management', 'Digital Business'],
    compatibleInterests: ['Marketing', 'Data & Analytics', 'Business & Management'],
    learningRoadmap: [
      { phase: 'Phase 1: Product-Led Growth Metrics', duration: 'Weeks 1–3', focus: 'AARRR pirate metrics, onboarding conversion funnels, and user drop-off points.', milestone: 'Audit a consumer app onboarding flow and identify 3 drop-off bottlenecks.' },
      { phase: 'Phase 2: A/B Testing & Hypothesis Testing', duration: 'Weeks 4–6', focus: 'Statistical significance, sample sizing, and experiment design.', milestone: 'Design an A/B test plan with sample size and significance metrics.' },
      { phase: 'Phase 3: SQL Funnel Analytics', duration: 'Weeks 7–10', focus: 'Querying event-level clickstream tables to uncover power-user engagement habits.', milestone: 'Complete a growth sprint proposal.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'SaaS Freemium-to-Paid Conversion Funnel Teardown',
        description: 'Evaluated signup-to-activation conversion steps, isolating features correlated with long-term subscription retention.',
        toolsUsed: ['Google Analytics', 'SQL', 'Excel'],
        deliverable: 'Comprehensive growth experiment teardown deck.'
      }
    ]
  },

  // 8. HR Analyst / People Analytics Specialist
  {
    id: 'hr-analyst',
    careerName: 'HR Analyst / People Analytics Specialist',
    careerDescription: 'Analyzes employee attrition drivers, recruitment funnel velocity, compensation parity, and employee engagement surveys.',
    primaryDomain: 'Human Resources & Analytics',
    careerType: 'Hybrid (Technical + Business)',
    salaryRange: '₹7.5 – 15 LPA',
    requiredSkills: ['HR Analytics', 'Excel', 'SQL', 'Power BI', 'Talent Management'],
    recommendedSoftwareAndTools: ['Power BI', 'Excel (Advanced)', 'SQL', 'Workday / Darwinbox', 'Tableau'],
    industryOpportunities: 'Rapidly expanding across Fortune 500 corporations, Global IT Giants, and Consultancies (Google, TCS, Accenture, Unilever, Reliance).',
    compatibleQualifications: ['MBA', 'BBA', 'B.Com', 'BA', 'B.Sc'],
    compatibleSpecializations: ['Human Resources', 'Business Analytics', 'General Management', 'Psychology'],
    compatibleInterests: ['Human Resources', 'Data & Analytics', 'Business & Management'],
    learningRoadmap: [
      { phase: 'Phase 1: HR Metrics Foundations', duration: 'Weeks 1–3', focus: 'Cost-per-hire, time-to-fill, 90-day attrition rates, and head-count planning.', milestone: 'Build a standard HR metrics formula workbook in Excel.' },
      { phase: 'Phase 2: SQL Employee Database Queries', duration: 'Weeks 4–6', focus: 'Joining employee master records, performance ratings, and tenure data.', milestone: 'Write queries calculating annualized department turnover.' },
      { phase: 'Phase 3: People Analytics Dashboard', duration: 'Weeks 7–10', focus: 'Designing diversity, compensation equity, and employee sentiment scorecards in Power BI.', milestone: 'Deliver an executive People Analytics report.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Predictive Employee Attrition & Retention Intelligence Dashboard',
        description: 'Analyzed 1,000+ employee records across tenure, compensation band, and promotion history to identify flight-risk drivers.',
        toolsUsed: ['Excel', 'SQL', 'Power BI', 'HR Analytics'],
        deliverable: 'Interactive Power BI HR executive dashboard.'
      }
    ]
  },

  // 9. HR Technology Consultant
  {
    id: 'hr-tech-consultant',
    careerName: 'HR Technology Consultant',
    careerDescription: 'Guides organizations through HRMS software implementations (Workday, Darwinbox, SAP SuccessFactors), workflow automations, and payroll integrations.',
    primaryDomain: 'Human Resources & Technology',
    careerType: 'Business-Oriented',
    salaryRange: '₹7.5 – 16 LPA',
    requiredSkills: ['Talent Management', 'Project Management', 'Business Analysis', 'Excel', 'CRM'],
    recommendedSoftwareAndTools: ['Workday', 'Darwinbox', 'SAP SuccessFactors', 'Jira', 'Excel'],
    industryOpportunities: 'Global consultancies and enterprise technology providers (Deloitte HR Tech, PwC, Mercer, Aon Hewitt, Darwinbox).',
    compatibleQualifications: ['MBA', 'BBA', 'B.Tech', 'B.Com'],
    compatibleSpecializations: ['Human Resources', 'Information Technology', 'General Management', 'Business Analytics'],
    compatibleInterests: ['Human Resources', 'Business & Management', 'Operations'],
    learningRoadmap: [
      { phase: 'Phase 1: HRMS Architecture & Workflows', duration: 'Weeks 1–3', focus: 'Employee lifecycle states, approval chains, leave & attendance rules.', milestone: 'Document an end-to-end recruitment-to-onboarding system workflow.' },
      { phase: 'Phase 2: Configuration & Business Rules', duration: 'Weeks 4–6', focus: 'Role-based access permissions, compensation matrices, and integration webhooks.', milestone: 'Draft a system configuration matrix for a 500-employee company.' },
      { phase: 'Phase 3: Change Management & Training', duration: 'Weeks 7–10', focus: 'User acceptance testing (UAT), training modules, and data migration audits.', milestone: 'Lead an HRMS go-live readiness simulation.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Enterprise HRMS Implementation Blueprint & Change Roadmap',
        description: 'Designed business process requirements and data migration mapping for transitioning legacy employee records to modern cloud HRMS.',
        toolsUsed: ['Talent Management', 'Project Management', 'Excel', 'Lucidchart'],
        deliverable: 'Complete 30-page HRMS deployment playbook.'
      }
    ]
  },

  // 10. Data Scientist
  {
    id: 'data-scientist',
    careerName: 'Data Scientist',
    careerDescription: 'Applies statistical rigor, predictive machine learning models, and quantitative experimentation to solve complex business decisions.',
    primaryDomain: 'Data & Analytics',
    careerType: 'Technical',
    salaryRange: '₹9 – 22 LPA',
    requiredSkills: ['Python', 'Pandas', 'NumPy', 'SQL', 'Machine Learning'],
    recommendedSoftwareAndTools: ['Python', 'Jupyter Notebook', 'Scikit-Learn', 'SQL', 'Pandas / NumPy', 'Tableau'],
    industryOpportunities: 'Deep demand in Tech Giants, FinTech, E-commerce, Healthcare AI, and Telecom (Amazon, Microsoft, Swiggy, InMobi, Flipkart).',
    compatibleQualifications: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'B.Sc', 'MBA'],
    compatibleSpecializations: ['Computer Science', 'AI & Data Science', 'IT', 'Mathematics & Statistics', 'Business Analytics'],
    compatibleInterests: ['Data & Analytics', 'Artificial Intelligence', 'Research'],
    learningRoadmap: [
      { phase: 'Phase 1: Mathematical & Python Mastery', duration: 'Weeks 1–3', focus: 'Linear algebra, probability, Pandas wrangling, and exploratory data analysis (EDA).', milestone: 'Clean and visualize a 100,000-row dataset.' },
      { phase: 'Phase 2: Classical Machine Learning', duration: 'Weeks 4–7', focus: 'Supervised regression, classification (XGBoost, Random Forest), and feature engineering.', milestone: 'Train and evaluate a customer churn model with 85%+ F1-score.' },
      { phase: 'Phase 3: Model Evaluation & Storytelling', duration: 'Weeks 8–10', focus: 'Hyperparameter tuning, cross-validation, and executive presentation of model insights.', milestone: 'Publish a Kaggle / GitHub end-to-end data science study.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Predictive Customer Churn & Lifetime Value Engine',
        description: 'Built a gradient-boosted decision tree pipeline in Python to forecast customer cancellation probability and highlight key risk factors.',
        toolsUsed: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'SQL'],
        deliverable: 'Tested Jupyter notebook with clear model interpretability plots.'
      }
    ]
  },

  // 11. Machine Learning Engineer
  {
    id: 'ml-engineer',
    careerName: 'Machine Learning Engineer',
    careerDescription: 'Designs, trains, and operationalizes machine learning systems into production microservices with real-time inference endpoints.',
    primaryDomain: 'Artificial Intelligence & Engineering',
    careerType: 'Technical',
    salaryRange: '₹10 – 25 LPA',
    requiredSkills: ['Python', 'Machine Learning', 'SQL', 'Pandas', 'Generative AI'],
    recommendedSoftwareAndTools: ['Python', 'PyTorch / Scikit-Learn', 'FastAPI', 'Docker', 'PostgreSQL', 'MLflow'],
    industryOpportunities: 'Autonomous vehicles, EdTech AI, Streaming Recommendation systems, and Cloud Enterprises (NVIDIA, Adobe, Qualcomm, Ola Electric).',
    compatibleQualifications: ['B.Tech', 'M.Tech', 'MCA', 'BCA', 'B.Sc'],
    compatibleSpecializations: ['Computer Science', 'AI & Data Science', 'IT', 'Electronics'],
    compatibleInterests: ['Artificial Intelligence', 'Software Development', 'Data & Analytics'],
    learningRoadmap: [
      { phase: 'Phase 1: Core ML Algorithms & Code', duration: 'Weeks 1–3', focus: 'Data pre-processing pipelines, modular Python OOP code, and loss function tuning.', milestone: 'Build a modular Scikit-Learn pipeline script.' },
      { phase: 'Phase 2: Deep Learning & Embeddings', duration: 'Weeks 4–7', focus: 'Neural networks, vector embeddings, and evaluation metrics.', milestone: 'Train a neural classification model using PyTorch.' },
      { phase: 'Phase 3: Production Serving (MLOps)', duration: 'Weeks 8–10', focus: 'Packaging models with FastAPI, containerizing with Docker, and latency profiling.', milestone: 'Deploy a live prediction REST API.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Real-Time Fraud Detection REST API with FastAPI & Docker',
        description: 'Trained an anomaly detection model, packaged it into an asynchronous FastAPI endpoint, and benchmarked sub-50ms latency.',
        toolsUsed: ['Python', 'Machine Learning', 'FastAPI', 'Docker'],
        deliverable: 'Containerized GitHub repo with documentation and API tests.'
      }
    ]
  },

  // 12. AI Engineer (LangChain / GenAI)
  {
    id: 'ai-engineer',
    careerName: 'AI Engineer (GenAI & LLM Solutions)',
    careerDescription: 'Builds intelligent autonomous agents, Retrieval-Augmented Generation (RAG) pipelines, and multimodal LLM business applications.',
    primaryDomain: 'Artificial Intelligence',
    careerType: 'Technical',
    salaryRange: '₹10 – 26 LPA',
    requiredSkills: ['Python', 'Generative AI', 'LangChain', 'RAG', 'SQL'],
    recommendedSoftwareAndTools: ['Python', 'LangChain / LlamaIndex', 'OpenAI / Claude API', 'ChromaDB / Pinecone', 'FastAPI'],
    industryOpportunities: 'Exploding demand across every modern technology company, enterprise SaaS, legal tech, and customer automation suites.',
    compatibleQualifications: ['B.Tech', 'M.Tech', 'MCA', 'BCA', 'B.Sc'],
    compatibleSpecializations: ['AI & Data Science', 'Computer Science', 'IT'],
    compatibleInterests: ['Artificial Intelligence', 'Software Development', 'Data & Analytics'],
    learningRoadmap: [
      { phase: 'Phase 1: LLM APIs & Prompt Engineering', duration: 'Weeks 1–3', focus: 'System prompts, structured JSON outputs, function calling, and temperature parameters.', milestone: 'Build an automated contract parser script.' },
      { phase: 'Phase 2: RAG & Vector Databases', duration: 'Weeks 4–7', focus: 'Document chunking strategies, embeddings, ChromaDB vector indexing, and hybrid search.', milestone: 'Create a private document Q&A assistant.' },
      { phase: 'Phase 3: Multi-Agent Workflows', duration: 'Weeks 8–10', focus: 'LangChain/LangGraph agent loops, memory states, tool integrations, and safety guards.', milestone: 'Publish a live autonomous agent application.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Enterprise Knowledge Base RAG Assistant with ChromaDB',
        description: 'Built a full retrieval pipeline that ingests company PDF manuals and answers technical queries with accurate citations.',
        toolsUsed: ['Python', 'Generative AI', 'LangChain', 'RAG'],
        deliverable: 'Deployed Streamlit web app with vector search integration.'
      }
    ]
  },

  // 13. Full-Stack Software Developer
  {
    id: 'fullstack-developer',
    careerName: 'Full-Stack Software Developer',
    careerDescription: 'Engineers responsive client-facing web applications, scalable REST/GraphQL APIs, and relational database schemas.',
    primaryDomain: 'Software Development',
    careerType: 'Technical',
    salaryRange: '₹7 – 18 LPA',
    requiredSkills: ['JavaScript', 'Python', 'SQL', 'PostgreSQL', 'Java'],
    recommendedSoftwareAndTools: ['React / Next.js', 'Node.js / Express', 'PostgreSQL', 'Git / GitHub', 'Docker'],
    industryOpportunities: 'Global evergreen demand across Tech Startups, IT Services, Banking, and Consumer Internet (Zoho, Freshworks, Microsoft, Swiggy).',
    compatibleQualifications: ['B.Tech', 'BCA', 'MCA', 'M.Tech', 'Diploma', 'B.Sc'],
    compatibleSpecializations: ['Computer Science', 'IT', 'Software Development', 'Electronics'],
    compatibleInterests: ['Software Development', 'Cybersecurity', 'Artificial Intelligence'],
    learningRoadmap: [
      { phase: 'Phase 1: Modern Frontend & State', duration: 'Weeks 1–3', focus: 'Component hierarchies, responsive CSS, React hooks, and REST API integration.', milestone: 'Build a multi-page interactive web application.' },
      { phase: 'Phase 2: Backend Architecture & Databases', duration: 'Weeks 4–7', focus: 'Node.js / Express server, database schema design, and secure authentication.', milestone: 'Construct a full CRUD API with JWT authentication.' },
      { phase: 'Phase 3: Production Deployment & CI/CD', duration: 'Weeks 8–10', focus: 'Docker containers, cloud hosting on Render/AWS, and database indexes.', milestone: 'Deploy an active production SaaS product.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Collaborative Workspace & Project Tracking Web App',
        description: 'Designed a responsive web application featuring real-time task updates, user authorization, and PostgreSQL relational data storage.',
        toolsUsed: ['JavaScript', 'SQL', 'PostgreSQL'],
        deliverable: 'Live web app hosted with public GitHub codebase.'
      }
    ]
  },

  // 14. MIS Analyst / Accounts Data Analyst
  {
    id: 'mis-analyst',
    careerName: 'MIS Analyst / Reporting Specialist',
    careerDescription: 'Compiles high-volume management information reports, automated sales audits, payroll summaries, and daily business reconciliation.',
    primaryDomain: 'Business & Operations',
    careerType: 'Business-Oriented',
    salaryRange: '₹7 – 14 LPA',
    requiredSkills: ['Excel', 'SQL', 'Power BI', 'Financial Analysis'],
    recommendedSoftwareAndTools: ['Excel (VBA / Power Query)', 'SQL (MySQL)', 'Power BI', 'Tally / ERP'],
    industryOpportunities: 'Stable demand across Retail, FMCG, Banking branches, Supply Chain distributors, and Manufacturing plants (ITC, Marico, HDFC Bank, Asian Paints).',
    compatibleQualifications: ['B.Com', 'BBA', 'BCA', 'BA', 'Diploma'],
    compatibleSpecializations: ['Accounting & Finance', 'General Management', 'Commerce', 'Computer Science'],
    compatibleInterests: ['Business & Management', 'Finance', 'Operations'],
    learningRoadmap: [
      { phase: 'Phase 1: Advanced Excel & Formulas', duration: 'Weeks 1–3', focus: 'Index/Match, XLOOKUP, Nested IFs, Pivot Tables, and conditional formatting.', milestone: 'Automate a complex daily sales reconciliation sheet.' },
      { phase: 'Phase 2: Power Query & SQL Extraction', duration: 'Weeks 4–6', focus: 'Automating multi-file data imports with Power Query and writing database queries.', milestone: 'Build an automated monthly MIS pack in Power Query.' },
      { phase: 'Phase 3: Interactive Visual Scorecards', duration: 'Weeks 7–10', focus: 'Power BI scorecards, automated email alerts, and management presentation.', milestone: 'Deliver an executive business performance dashboard.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Automated Multi-Branch Sales & Cash Reconciliation MIS',
        description: 'Consolidated transactional data from 20 regional retail branches, automating variance tracking and eliminating 15 hours of manual weekly work.',
        toolsUsed: ['Excel', 'SQL', 'Power BI'],
        deliverable: 'Automated Power Query workbook with linked Power BI report.'
      }
    ]
  },

  // 15. Product Manager
  {
    id: 'product-manager',
    careerName: 'Product Manager (Tech & Business)',
    careerDescription: 'Owns product strategy, user discovery, feature prioritization, engineering sprint backlogs, and cross-functional go-to-market execution.',
    primaryDomain: 'Product & Strategy',
    careerType: 'Hybrid (Technical + Business)',
    salaryRange: '₹12 – 28 LPA',
    requiredSkills: ['Project Management', 'Market Research', 'Business Analysis', 'Excel', 'SQL'],
    recommendedSoftwareAndTools: ['Jira', 'Figma', 'Mixpanel', 'SQL', 'Notion'],
    industryOpportunities: 'Premier high-growth career across Tech Unicorns, Global SaaS, Consumer Platforms, and E-commerce (Flipkart, Uber, Jio, Atlassian).',
    compatibleQualifications: ['MBA', 'B.Tech', 'BBA', 'MCA', 'B.Com'],
    compatibleSpecializations: ['General Management', 'Computer Science', 'Business Analytics', 'Marketing', 'IT', 'Operations'],
    compatibleInterests: ['Business & Management', 'Software Development', 'Artificial Intelligence', 'Marketing'],
    learningRoadmap: [
      { phase: 'Phase 1: Customer Discovery & Problem Definition', duration: 'Weeks 1–3', focus: 'User interview synthesis, problem statements, and opportunity solution trees.', milestone: 'Conduct 5 user discovery interviews and draft insights report.' },
      { phase: 'Phase 2: PRDs, Wireframing & Prioritization', duration: 'Weeks 4–6', focus: 'Writing Product Requirement Documents (PRDs), wireframes in Figma, and RICE scoring.', milestone: 'Write a comprehensive 10-page PRD for a mobile app feature.' },
      { phase: 'Phase 3: Metrics, Launch & Go-To-Market', duration: 'Weeks 7–10', focus: 'North Star metrics, funnels, release planning in Jira, and release communication.', milestone: 'Publish a product teardown and feature roadmap.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'FinTech Micro-Savings Feature PRD & Interactive Prototype',
        description: 'Researched Gen-Z saving friction, authored complete technical PRD with user flows, and mocked clickable Figma wireframes.',
        toolsUsed: ['Project Management', 'Market Research', 'Business Analysis'],
        deliverable: 'Complete Product Requirement Document with Figma prototype.'
      }
    ]
  },

  // 16. Digital Marketing & SEO Strategist
  {
    id: 'digital-marketer',
    careerName: 'Digital Marketing & Growth Strategist',
    careerDescription: 'Directs search engine optimization (SEO), paid search campaigns, conversion rate optimization, and automated email nurturing funnels.',
    primaryDomain: 'Marketing & Digital Media',
    careerType: 'Non-Technical',
    salaryRange: '₹8 – 16 LPA',
    requiredSkills: ['SEO', 'Digital Marketing', 'Google Analytics', 'CRM', 'Market Research'],
    recommendedSoftwareAndTools: ['Google Analytics 4', 'Ahrefs / SEMrush', 'Google Search Console', 'HubSpot / Mailchimp', 'Canva'],
    industryOpportunities: 'High demand across Digital Agencies, D2C brands, Tech startups, and Media Conglomerates (Zomato, Schbang, Nykaa, Dentsu).',
    compatibleQualifications: ['BBA', 'MBA', 'BA', 'B.Com', 'Diploma', 'B.Sc'],
    compatibleSpecializations: ['Marketing', 'Digital Business', 'Journalism & Mass Comm', 'English & Literature', 'General Management'],
    compatibleInterests: ['Marketing', 'Business & Management', 'Data & Analytics'],
    learningRoadmap: [
      { phase: 'Phase 1: SEO Architecture & Content Audit', duration: 'Weeks 1–3', focus: 'Keyword intent research, on-page optimization, and technical crawl fixes.', milestone: 'Execute an SEO site audit finding 10 high-value ranking keywords.' },
      { phase: 'Phase 2: Paid Ads & Funnel Optimization', duration: 'Weeks 4–6', focus: 'Google Search ads, Meta ad testing, and landing page conversion rate tuning.', milestone: 'Create a simulated search ad campaign with target CAC benchmarks.' },
      { phase: 'Phase 3: Lifecycle Email & CRM Automation', duration: 'Weeks 7–10', focus: 'Lead nurturing sequences, segmentation, and automated drip campaigns in HubSpot.', milestone: 'Deliver a multi-channel growth marketing strategy deck.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'E-Commerce Organic Search Growth & Keyword Strategy Campaign',
        description: 'Conducted search volume audits, restructured on-page semantic headings, and mapped targeted commercial intent landing pages.',
        toolsUsed: ['SEO', 'Digital Marketing', 'Google Analytics'],
        deliverable: 'Comprehensive 15-page SEO strategy and keyword matrix.'
      }
    ]
  },

  // 17. Cybersecurity Analyst
  {
    id: 'cybersecurity-analyst',
    careerName: 'Cybersecurity & Threat Intelligence Analyst',
    careerDescription: 'Monitors corporate networks, conducts vulnerability assessments, investigates security incident logs, and enforces zero-trust data protection.',
    primaryDomain: 'Cybersecurity & IT Infrastructure',
    careerType: 'Technical',
    salaryRange: '₹7.5 – 18 LPA',
    requiredSkills: ['Python', 'SQL', 'Project Management'],
    recommendedSoftwareAndTools: ['Wireshark', 'Burp Suite', 'Kali Linux', 'Splunk / SIEM', 'PostgreSQL'],
    industryOpportunities: 'Critical demand in Financial Institutions, Defense Contractors, IT Services, and Cloud Platforms (Palo Alto, Cisco, PwC Cyber, IBM).',
    compatibleQualifications: ['B.Tech', 'BCA', 'MCA', 'M.Tech', 'Diploma', 'B.Sc'],
    compatibleSpecializations: ['Computer Science', 'IT', 'Cyber Security', 'Electronics'],
    compatibleInterests: ['Cybersecurity', 'Software Development', 'Research'],
    learningRoadmap: [
      { phase: 'Phase 1: Networking & Linux Fundamentals', duration: 'Weeks 1–3', focus: 'TCP/IP, subnetting, packet tracing with Wireshark, and Linux permissions.', milestone: 'Capture and analyze network packet traffic logs.' },
      { phase: 'Phase 2: Web App Security & OWASP', duration: 'Weeks 4–6', focus: 'SQL injection, Cross-Site Scripting (XSS), authentication bypass, and Burp Suite.', milestone: 'Execute a vulnerability audit on a sandbox application.' },
      { phase: 'Phase 3: SIEM & Incident Response', duration: 'Weeks 7–10', focus: 'Log aggregation in Splunk, intrusion detection, and incident response runbooks.', milestone: 'Draft a security incident report and remediation playbook.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Web Application Vulnerability Assessment & Remediation Report',
        description: 'Identified SQL injection and authentication vulnerabilities in a test environment, documenting mitigation steps for development teams.',
        toolsUsed: ['Python', 'SQL'],
        deliverable: 'Industry-standard penetration test report and remediation guide.'
      }
    ]
  },

  // 18. Operations & Supply Chain Manager
  {
    id: 'operations-manager',
    careerName: 'Operations & Supply Chain Manager',
    careerDescription: 'Oversees procurement logistics, inventory turn velocity, warehouse fulfillment workflows, and vendor performance standards.',
    primaryDomain: 'Operations & Logistics',
    careerType: 'Business-Oriented',
    salaryRange: '₹8 – 17 LPA',
    requiredSkills: ['Project Management', 'Business Analysis', 'Excel', 'Market Research', 'Operations Management', 'Supply Chain Management'],
    recommendedSoftwareAndTools: ['SAP ERP', 'Excel (Advanced)', 'Power BI', 'Jira / Trello'],
    industryOpportunities: 'Amazon Logistics, Flipkart Fulfillment, FMCG Giants, Auto OEM Plants, and Port Terminals (Unilever, DHL, Maersk, Tata Steel).',
    compatibleQualifications: ['MBA', 'B.Tech', 'BBA', 'B.Com', 'Diploma'],
    compatibleSpecializations: ['Operations', 'Mechanical', 'General Management', 'Civil', 'Industrial Engineering'],
    compatibleInterests: ['Operations', 'Business & Management'],
    learningRoadmap: [
      { phase: 'Phase 1: Lean Operations & Process Flow', duration: 'Weeks 1–3', focus: 'Six Sigma 5S, Bottleneck analysis, Value Stream Mapping, and inventory cycles.', milestone: 'Map the supply chain value stream of a manufacturing line.' },
      { phase: 'Phase 2: ERP Systems & Demand Planning', duration: 'Weeks 4–6', focus: 'Safety stock calculations, re-order point modeling, and ERP logistics workflows.', milestone: 'Build an inventory reorder optimization spreadsheet.' },
      { phase: 'Phase 3: Vendor Negotiations & KPI Dashboards', duration: 'Weeks 7–10', focus: 'Vendor SLA scorecards, freight cost benchmarking, and operational briefings.', milestone: 'Publish an operations efficiency optimization deck.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Warehouse Fulfillment Optimization & Turnaround Time Audit',
        description: 'Analyzed order picking routes and freight shipping delays, proposing layout changes that reduced order fulfillment time by 18%.',
        toolsUsed: ['Project Management', 'Business Analysis', 'Excel'],
        deliverable: 'Supply chain optimization report with process flow diagrams.'
      }
    ]
  },

  // 19. UI/UX & Product Designer
  {
    id: 'ui-ux-designer',
    careerName: 'UI/UX & Product Designer',
    careerDescription: 'Designs intuitive digital product experiences, interactive wireframes, design systems, and user empathy journeys.',
    primaryDomain: 'Design & Creative',
    careerType: 'Non-Technical',
    salaryRange: '₹8.5 – 18 LPA',
    requiredSkills: ['UI/UX Design', 'Figma', 'Market Research', 'Graphic Design', 'Product Management'],
    recommendedSoftwareAndTools: ['Figma', 'Adobe XD', 'Miro', 'Notion', 'Protopie'],
    industryOpportunities: 'Universal high demand across Tech Startups, Digital Agencies, SaaS Enterprises, and Consumer Apps (Swiggy, Razorpay, CRED, Zomato, Google).',
    compatibleQualifications: ['BBA', 'B.Tech', 'BA', 'BCA', 'B.Sc', 'MBA', 'Diploma', 'Other'],
    compatibleSpecializations: ['Computer Science', 'IT', 'Design & Multimedia', 'Marketing', 'Psychology', 'English & Literature', 'Other'],
    compatibleInterests: ['Marketing', 'Software Development', 'Business & Management', 'Research'],
    learningRoadmap: [
      { phase: 'Phase 1: Design Principles & User Research', duration: 'Weeks 1–3', focus: 'User empathy mapping, heuristic evaluations, information architecture, and low-fidelity sketching.', milestone: 'Conduct user research and create user personas for a mobile app.' },
      { phase: 'Phase 2: Figma Mastery & Interactive Prototyping', duration: 'Weeks 4–7', focus: 'Design systems, auto-layout, components, typography, micro-interactions, and clickable prototypes.', milestone: 'Design a complete 15-screen mobile app in Figma.' },
      { phase: 'Phase 3: Usability Testing & Portfolio Case Study', duration: 'Weeks 8–10', focus: 'A/B testing, accessibility standards (WCAG), handoff to engineers, and portfolio curation.', milestone: 'Publish a polished Behance / Dribbble product design case study.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Fintech Mobile Investment App Redesign',
        description: 'Conducted user interviews, streamlined onboarding flow from 7 steps to 3, and created an accessible design system in Figma.',
        toolsUsed: ['Figma', 'Miro', 'Notion'],
        deliverable: 'Interactive prototype with documentation and usability test metrics.'
      }
    ]
  },

  // 20. Cloud & DevOps Engineer
  {
    id: 'cloud-devops-engineer',
    careerName: 'Cloud & DevOps Engineer',
    careerDescription: 'Architects scalable cloud infrastructure, automated CI/CD deployment pipelines, container clusters, and site reliability.',
    primaryDomain: 'Cloud & Infrastructure',
    careerType: 'Technical',
    salaryRange: '₹8 – 18 LPA',
    requiredSkills: ['AWS', 'Docker', 'Linux', 'Git & GitHub', 'Python', 'Microsoft Azure'],
    recommendedSoftwareAndTools: ['AWS / Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Linux Bash'],
    industryOpportunities: 'High demand across SaaS enterprises, Cloud Consultancies, Banking IT, and Global Tech Centers (Amazon, Microsoft, TCS, Infosys, Cisco).',
    compatibleQualifications: ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'B.Sc'],
    compatibleSpecializations: ['Computer Science', 'IT', 'Electronics', 'AI & Data Science', 'Other'],
    compatibleInterests: ['Software Development', 'Cybersecurity', 'Artificial Intelligence', 'Data & Analytics'],
    learningRoadmap: [
      { phase: 'Phase 1: Linux & Cloud Fundamentals', duration: 'Weeks 1–3', focus: 'Linux system administration, shell scripting, networking (VPC, DNS, Subnets), and AWS/Azure core services.', milestone: 'Deploy a multi-tier web application on cloud compute instances.' },
      { phase: 'Phase 2: Containers & Automated CI/CD', duration: 'Weeks 4–7', focus: 'Docker containerization, multi-stage builds, and automated GitHub Actions pipelines.', milestone: 'Build an automated CI/CD pipeline that runs tests and builds images.' },
      { phase: 'Phase 3: Infrastructure as Code & Monitoring', duration: 'Weeks 8–10', focus: 'Terraform provisioning, Kubernetes basics, and Prometheus/Grafana system monitoring.', milestone: 'Publish a reproducible cloud infrastructure repo on GitHub.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Automated Containerized Cloud Deployment Pipeline',
        description: 'Containerized a full-stack Node.js/Python application using Docker and configured GitHub Actions to deploy automatically to AWS ECS with zero downtime.',
        toolsUsed: ['Docker', 'AWS', 'GitHub Actions', 'Linux'],
        deliverable: 'Live cloud deployment with automated testing and rollback triggers.'
      }
    ]
  },

  // 21. Content & Brand Communications Strategist
  {
    id: 'content-brand-strategist',
    careerName: 'Content & Brand Communications Strategist',
    careerDescription: 'Crafts high-impact brand narratives, multimedia content campaigns, SEO thought-leadership articles, and cross-channel editorial calendars.',
    primaryDomain: 'Content & Marketing',
    careerType: 'Non-Technical',
    salaryRange: '₹7.5 – 15 LPA',
    requiredSkills: ['Copywriting & Content Writing', 'Content Marketing', 'SEO', 'Social Media Strategy', 'Brand Strategy'],
    recommendedSoftwareAndTools: ['WordPress / Webflow', 'Ahrefs / SEMrush', 'Canva', 'Notion', 'Grammarly / ChatGPT'],
    industryOpportunities: 'High demand across D2C brands, B2B SaaS firms, Media Houses, Creative Agencies, and EdTech (HubSpot, Canva, Unacademy, Nykaa).',
    compatibleQualifications: ['BA', 'BBA', 'B.Com', 'MBA', 'B.Sc', 'Other'],
    compatibleSpecializations: ['English & Literature', 'Journalism & Mass Comm', 'Marketing', 'Psychology', 'General Management', 'Other'],
    compatibleInterests: ['Marketing', 'Business & Management', 'Research'],
    learningRoadmap: [
      { phase: 'Phase 1: Brand Messaging & SEO Foundations', duration: 'Weeks 1–3', focus: 'Target persona definition, brand tone-of-voice, keyword research, and search-intent matching.', milestone: 'Draft a 1,500-word SEO-optimized long-form pillar article.' },
      { phase: 'Phase 2: Multi-Channel Distribution', duration: 'Weeks 4–7', focus: 'Repurposing long-form content into LinkedIn carousels, newsletter editions, and viral social threads.', milestone: 'Build a 30-day cross-platform editorial calendar.' },
      { phase: 'Phase 3: Content Analytics & Lead Conversion', duration: 'Weeks 8–10', focus: 'Measuring click-through rates, conversion funnels, subscriber retention, and brand sentiment.', milestone: 'Publish a public content marketing portfolio.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Zero-to-One Organic Content Campaign for B2B SaaS',
        description: 'Developed a comprehensive content strategy including 5 pillar blog posts, an email drip sequence, and 15 LinkedIn posts that increased organic traffic by 40%.',
        toolsUsed: ['Notion', 'Ahrefs', 'Canva', 'Google Analytics'],
        deliverable: 'Full strategic content playbook with writing samples and engagement metrics.'
      }
    ]
  },

  // 22. Corporate Sales & Client Relationship Manager
  {
    id: 'corporate-sales-manager',
    careerName: 'Corporate Sales & Client Relationship Manager',
    careerDescription: 'Drives enterprise B2B sales cycles, manages high-value corporate client relationships, and negotiates long-term commercial contracts.',
    primaryDomain: 'Business & Commercial',
    careerType: 'Non-Technical',
    salaryRange: '₹7 – 18 LPA',
    requiredSkills: ['Client Negotiation', 'CRM (HubSpot/Salesforce)', 'B2B Sales', 'Public Speaking & Pitching', 'Business Analysis'],
    recommendedSoftwareAndTools: ['Salesforce', 'HubSpot', 'LinkedIn Sales Navigator', 'ZoomInfo', 'PowerPoint'],
    industryOpportunities: 'Lucrative opportunities across Tech Enterprises, Consulting, Banking, Insurance, and SaaS (Microsoft, Salesforce, Oracle, IBM, ICICI).',
    compatibleQualifications: ['BBA', 'MBA', 'B.Com', 'B.Tech', 'BA', 'Other'],
    compatibleSpecializations: ['Marketing', 'Finance', 'International Business', 'Operations', 'General Management', 'Other'],
    compatibleInterests: ['Business & Management', 'Marketing', 'Finance'],
    learningRoadmap: [
      { phase: 'Phase 1: B2B Sales Methodologies', duration: 'Weeks 1–3', focus: 'SPIN Selling, Challenger Sale techniques, enterprise buyer personas, and discovery call structuring.', milestone: 'Execute a mock enterprise discovery call and qualifying pitch.' },
      { phase: 'Phase 2: CRM Pipeline & Opportunity Management', duration: 'Weeks 4–7', focus: 'Lead qualification (BANT), pipeline velocity tracking, Salesforce/HubSpot deal stages, and proposal drafting.', milestone: 'Build an automated sales pipeline and email sequence in HubSpot.' },
      { phase: 'Phase 3: High-Stakes Negotiation & Key Account Management', duration: 'Weeks 8–10', focus: 'Contract negotiation, overcoming client objections, upsell/cross-sell playbooks, and stakeholder mapping.', milestone: 'Deliver a comprehensive commercial sales pitch deck.' }
    ],
    suggestedProjects: [
      {
        projectTitle: 'Enterprise B2B Go-to-Market Sales Playbook',
        description: 'Created an end-to-end sales prospecting cadence for mid-market software buyers, including cold email templates, objection handling matrix, and deal tracking.',
        toolsUsed: ['Salesforce', 'LinkedIn Sales Navigator', 'PowerPoint'],
        deliverable: 'Complete enterprise sales deck and outreach playbook.'
      }
    ]
  }
];

function isSkillMatch(selSkill: string, reqSkill: string): boolean {
  const sel = selSkill.toLowerCase().trim();
  const req = reqSkill.toLowerCase().trim();
  if (sel === req) return true;
  if (sel.includes(req) || req.includes(sel)) return true;
  // Common synonyms
  if ((sel.includes('react') || sel.includes('javascript') || sel.includes('typescript')) && req.includes('javascript')) return true;
  if (sel.includes('cloud') && (req.includes('aws') || req.includes('azure'))) return true;
  return false;
}

interface AdjacentTemplate {
  adjacentCareerName: string;
  salaryRange: string;
  keySkillsRequired: string[];
  whyThisIsClose: string;
  unlockedRoleScope: string;
}

const ADJACENT_CAREER_TEMPLATES: Record<string, AdjacentTemplate[]> = {
  'financial-data-analyst': [
    {
      adjacentCareerName: 'FinTech Quantitative Analyst',
      salaryRange: '₹10 – 20 LPA',
      keySkillsRequired: ['Financial Modeling', 'Machine Learning', 'Python'],
      whyThisIsClose: 'You already possess the core SQL, Excel, and numerical acumen. Adding financial modeling and machine learning algorithms allows you to transition directly into quantitative fund management, algorithmic credit scoring, and fintech scale-ups.',
      unlockedRoleScope: 'Build automated valuation models, credit default algorithms, and robo-advisory engines.'
    },
    {
      adjacentCareerName: 'Business Intelligence & FP&A Lead',
      salaryRange: '₹9 – 16 LPA',
      keySkillsRequired: ['Power BI', 'Tableau', 'Data Warehousing'],
      whyThisIsClose: 'Extending your financial ledger queries into cross-enterprise data models bridges the gap from purely financial analysis to full corporate BI leadership.',
      unlockedRoleScope: 'Direct multi-departmental corporate budgeting, board KPI scorecards, and cash-flow reporting.'
    }
  ],
  'bi-analyst': [
    {
      adjacentCareerName: 'Analytics Engineer (dbt & Modern Data Stack)',
      salaryRange: '₹9 – 18 LPA',
      keySkillsRequired: ['ETL Pipelines', 'Data Warehousing', 'Python'],
      whyThisIsClose: 'You already master SQL and semantic dashboard metrics. Learning data transformation pipelines (ETL/dbt) makes you a coveted Analytics Engineer who owns the entire data flow.',
      unlockedRoleScope: 'Design robust data warehouse schemas and orchestrate automated data pipelines.'
    },
    {
      adjacentCareerName: 'Product Analytics Specialist',
      salaryRange: '₹8 – 16 LPA',
      keySkillsRequired: ['Product Management', 'Market Research', 'Google Analytics'],
      whyThisIsClose: 'Applying your dashboarding skills to user retention cohorts and feature adoption rates transitions you into core digital product teams.',
      unlockedRoleScope: 'Measure product funnel velocity, run A/B experiments, and influence product roadmap decisions.'
    }
  ],
  'fintech-analyst': [
    {
      adjacentCareerName: 'Quantitative Risk & Algorithmic Strategist',
      salaryRange: '₹12 – 24 LPA',
      keySkillsRequired: ['Machine Learning', 'Statistics', 'C++'],
      whyThisIsClose: 'Leveraging your payments and credit domain expertise with statistical modeling opens high-frequency trading and risk algorithmic roles.',
      unlockedRoleScope: 'Engineer automated risk hedging engines and high-throughput trade execution pipelines.'
    },
    {
      adjacentCareerName: 'FinTech Technical Product Manager',
      salaryRange: '₹11 – 20 LPA',
      keySkillsRequired: ['Product Management', 'Agile / Scrum', 'UI/UX Design'],
      whyThisIsClose: 'Your grasp of financial APIs and transaction reconciliation makes you uniquely qualified to lead cross-functional banking engineering squads.',
      unlockedRoleScope: 'Define neobanking workflows, lending APIs, and payment gateway architectures.'
    }
  ],
  'risk-analyst': [
    {
      adjacentCareerName: 'Fraud Analytics & Predictive Risk Lead',
      salaryRange: '₹9 – 18 LPA',
      keySkillsRequired: ['Machine Learning', 'Python', 'SQL'],
      whyThisIsClose: 'Combining regulatory compliance knowledge with predictive machine learning algorithms unlocks senior risk detection roles across banking and payments.',
      unlockedRoleScope: 'Deploy real-time transaction monitoring and automated fraud prevention systems.'
    },
    {
      adjacentCareerName: 'Enterprise Governance & Cybersecurity Risk Consultant',
      salaryRange: '₹8 – 17 LPA',
      keySkillsRequired: ['Information Security', 'Network Security', 'Risk Management'],
      whyThisIsClose: 'Extending financial risk heuristics into digital asset security makes you a vital risk consultant for corporate audits.',
      unlockedRoleScope: 'Advise executive boards on regulatory cybersecurity standards and data sovereignty.'
    }
  ],
  'business-analyst': [
    {
      adjacentCareerName: 'Technical Product Manager (TPM)',
      salaryRange: '₹12 – 22 LPA',
      keySkillsRequired: ['Product Management', 'Agile / Scrum', 'Figma'],
      whyThisIsClose: 'You already bridge business requirements and technical feasibility. Adding formal product backlog management and wireframing unlocks higher-paying TPM paths.',
      unlockedRoleScope: 'Own core product vision, author detailed PRDs, and guide sprint execution.'
    },
    {
      adjacentCareerName: 'Management & Strategy Consultant',
      salaryRange: '₹10 – 20 LPA',
      keySkillsRequired: ['Strategic Planning', 'Market Research', 'Financial Modeling'],
      whyThisIsClose: 'Moving from process documentation to executive strategy presentations unlocks roles at top advisory firms (McKinsey, BCG, Big 4).',
      unlockedRoleScope: 'Deliver corporate turnaround playbooks, market entry strategies, and M&A evaluations.'
    }
  ],
  'marketing-data-analyst': [
    {
      adjacentCareerName: 'Growth Product Manager',
      salaryRange: '₹10 – 19 LPA',
      keySkillsRequired: ['Product Management', 'Meta & Google Ads', 'UI/UX Design'],
      whyThisIsClose: 'You know user acquisition metrics inside out; mastering conversion optimization and product onboarding flows makes you a high-impact Growth PM.',
      unlockedRoleScope: 'Lead user onboarding experimentation, viral referral loops, and pricing tests.'
    },
    {
      adjacentCareerName: 'Performance Marketing & Media Director',
      salaryRange: '₹9 – 18 LPA',
      keySkillsRequired: ['Meta & Google Ads', 'Brand Strategy', 'Content Strategy'],
      whyThisIsClose: 'Pairing conversion data with creative media buying allows you to direct large corporate advertising budgets with guaranteed ROI.',
      unlockedRoleScope: 'Oversee multi-million rupee advertising campaigns across search, social, and programmatic channels.'
    }
  ],
  'growth-analyst': [
    {
      adjacentCareerName: 'Digital Marketing & Omnichannel Strategist',
      salaryRange: '₹9 – 18 LPA',
      keySkillsRequired: ['Brand Strategy', 'Content Strategy', 'Social Media Strategy'],
      whyThisIsClose: 'Extending quantitative funnel optimizations to organic brand storytelling creates a versatile 360-degree marketing leader.',
      unlockedRoleScope: 'Design comprehensive brand positioning, organic content distribution, and viral PR campaigns.'
    },
    {
      adjacentCareerName: 'Customer Lifecycle & Retention Director',
      salaryRange: '₹8 – 16 LPA',
      keySkillsRequired: ['CRM (HubSpot/Salesforce)', 'Email Marketing', 'Power BI'],
      whyThisIsClose: 'Focusing on customer lifetime value (LTV) cohorts and retention automations provides rapid advancement in subscription and SaaS companies.',
      unlockedRoleScope: 'Build automated churn-prevention workflows and personalized customer journeys.'
    }
  ],
  'hr-analyst': [
    {
      adjacentCareerName: 'HR Technology & Digital Transformation Consultant',
      salaryRange: '₹9 – 18 LPA',
      keySkillsRequired: ['HRIS Software', 'Project Management', 'Vendor Management'],
      whyThisIsClose: 'Transitioning from analyzing workforce spreadsheets to architecting enterprise HR platforms (Workday, Darwinbox) doubles career earnings and mobility.',
      unlockedRoleScope: 'Direct enterprise HR software migrations, vendor evaluations, and automated employee workflows.'
    },
    {
      adjacentCareerName: 'Strategic HR Business Partner (HRBP)',
      salaryRange: '₹8 – 16 LPA',
      keySkillsRequired: ['Talent Management', 'Employee Relations', 'Strategic Planning'],
      whyThisIsClose: 'Using data-backed people insights to advise business vice presidents makes you an indispensable strategic talent leader.',
      unlockedRoleScope: 'Oversee departmental org redesigns, leadership succession pipelines, and retention strategy.'
    }
  ],
  'hr-tech-consultant': [
    {
      adjacentCareerName: 'Enterprise People Analytics Director',
      salaryRange: '₹11 – 20 LPA',
      keySkillsRequired: ['Python', 'SQL', 'Tableau'],
      whyThisIsClose: 'Your systems knowledge combined with statistical querying allows you to build internal predictive attrition and compensation intelligence engines.',
      unlockedRoleScope: 'Build custom workforce analytics engines and present quarterly talent forecasts to executive leadership.'
    },
    {
      adjacentCareerName: 'Enterprise SaaS Implementation Architect',
      salaryRange: '₹12 – 22 LPA',
      keySkillsRequired: ['Agile / Scrum', 'Docker', 'AWS'],
      whyThisIsClose: 'Deepening your cloud integration and API expertise lets you architect global multi-country software deployments.',
      unlockedRoleScope: 'Architect end-to-end enterprise software integrations, single sign-on (SSO), and secure data pipelines.'
    }
  ],
  'data-scientist': [
    {
      adjacentCareerName: 'AI Engineer (GenAI & LLM Solutions)',
      salaryRange: '₹14 – 28 LPA',
      keySkillsRequired: ['Generative AI', 'LangChain', 'RAG', 'Prompt Engineering'],
      whyThisIsClose: 'You already possess strong Python and statistical modeling foundations; learning vector databases and LangChain puts you at the leading edge of generative AI.',
      unlockedRoleScope: 'Build multi-agent AI assistants, semantic search pipelines, and enterprise LLM orchestrations.'
    },
    {
      adjacentCareerName: 'MLOps Production Engineer',
      salaryRange: '₹12 – 24 LPA',
      keySkillsRequired: ['Docker', 'AWS', 'Linux', 'Git & GitHub'],
      whyThisIsClose: 'Complementing your algorithms with containerization and cloud orchestration turns you into an end-to-end machine learning engineer.',
      unlockedRoleScope: 'Deploy low-latency model inference endpoints and maintain automated model retraining pipelines.'
    }
  ],
  'ml-engineer': [
    {
      adjacentCareerName: 'Foundation Model & Generative Systems Architect',
      salaryRange: '₹16 – 32 LPA',
      keySkillsRequired: ['Generative AI', 'Hugging Face', 'Deep Learning', 'C++'],
      whyThisIsClose: 'Upgrading deep learning architectures to transformer fine-tuning and GPU acceleration opens the highest tier of AI engineering.',
      unlockedRoleScope: 'Fine-tune large language models, optimize tensor kernels, and author distributed training routines.'
    },
    {
      adjacentCareerName: 'Cloud & Infrastructure Engineer (AI Platform)',
      salaryRange: '₹11 – 22 LPA',
      keySkillsRequired: ['AWS', 'Docker', 'Linux', 'Microsoft Azure'],
      whyThisIsClose: 'Managing large compute clusters and distributed training environments positions you as an indispensable AI Infrastructure specialist.',
      unlockedRoleScope: 'Build scalable GPU clusters, cloud storage backbones, and zero-downtime serving clusters.'
    }
  ],
  'ai-engineer': [
    {
      adjacentCareerName: 'Autonomous Agent & Robotics Specialist',
      salaryRange: '₹16 – 32 LPA',
      keySkillsRequired: ['Python', 'Computer Vision', 'Deep Learning'],
      whyThisIsClose: 'Applying LLM reasoning frameworks to multi-modal sensor data opens breakthrough careers in autonomous agents and spatial computing.',
      unlockedRoleScope: 'Orchestrate autonomous agent swarms and multi-modal perception systems.'
    },
    {
      adjacentCareerName: 'AI Product Architect',
      salaryRange: '₹14 – 26 LPA',
      keySkillsRequired: ['Product Management', 'UI/UX Design', 'Market Research'],
      whyThisIsClose: 'Combining deep GenAI implementation skills with product intuition allows you to design intuitive AI apps that people love to use.',
      unlockedRoleScope: 'Lead commercial AI product strategy, user interaction paradigms, and API monetization.'
    }
  ],
  'software-developer': [
    {
      adjacentCareerName: 'Cloud & DevOps Platform Engineer',
      salaryRange: '₹10 – 20 LPA',
      keySkillsRequired: ['AWS', 'Docker', 'Linux', 'Git & GitHub'],
      whyThisIsClose: 'You already write application code; mastering continuous deployment and cloud infrastructure unlocks higher-paying DevOps and Site Reliability roles.',
      unlockedRoleScope: 'Automate CI/CD pipelines, container orchestration, and multi-region cloud deployments.'
    },
    {
      adjacentCareerName: 'AI Full-Stack Application Engineer',
      salaryRange: '₹12 – 22 LPA',
      keySkillsRequired: ['Generative AI', 'LangChain', 'Python'],
      whyThisIsClose: 'Embedding LLM APIs, vector retrieval, and natural language interfaces into modern web applications makes you a top-tier modern developer.',
      unlockedRoleScope: 'Build intelligent web applications with real-time AI copilot capabilities.'
    }
  ],
  'mis-analyst': [
    {
      adjacentCareerName: 'Financial & Corporate Modeling Specialist',
      salaryRange: '₹7.5 – 15 LPA',
      keySkillsRequired: ['Financial Analysis', 'Financial Modeling', 'Power BI'],
      whyThisIsClose: 'Transitioning from manual operational spreadsheets to financial valuation models unlocks high-paying corporate finance roles.',
      unlockedRoleScope: 'Build corporate financial projections, 3-statement models, and variance analysis reports.'
    },
    {
      adjacentCareerName: 'Enterprise Business Intelligence Analyst',
      salaryRange: '₹8 – 15 LPA',
      keySkillsRequired: ['SQL', 'Tableau', 'Data Warehousing'],
      whyThisIsClose: 'Upgrading spreadsheet macros to relational SQL databases and automated BI dashboards dramatically boosts your market value.',
      unlockedRoleScope: 'Create live enterprise data scorecards and automate weekly management reporting.'
    }
  ],
  'product-manager': [
    {
      adjacentCareerName: 'Growth & Monetization Product Lead',
      salaryRange: '₹16 – 30 LPA',
      keySkillsRequired: ['Digital Marketing', 'Data Analytics', 'Meta & Google Ads'],
      whyThisIsClose: 'Adding quantitative acquisition and monetization experiments to your product toolkit lets you own the entire commercial P&L.',
      unlockedRoleScope: 'Direct pricing tiers, viral loops, customer onboarding optimization, and expansion revenue.'
    },
    {
      adjacentCareerName: 'Technical Program Manager (TPM)',
      salaryRange: '₹15 – 28 LPA',
      keySkillsRequired: ['Agile / Scrum', 'Cloud Services', 'System Architecture'],
      whyThisIsClose: 'Managing large technical dependencies across multiple engineering squads positions you for senior technical management.',
      unlockedRoleScope: 'Orchestrate complex technical cross-functional software initiatives across engineering teams.'
    }
  ],
  'digital-marketer': [
    {
      adjacentCareerName: 'Performance Marketing & Growth Lead',
      salaryRange: '₹9 – 18 LPA',
      keySkillsRequired: ['Meta & Google Ads', 'Google Analytics', 'SQL'],
      whyThisIsClose: 'Backing your marketing instincts with rigorous data analytics and paid media optimization turns you into an indispensable growth leader.',
      unlockedRoleScope: 'Scale paid acquisition budgets with strict return-on-ad-spend (ROAS) and CAC targets.'
    },
    {
      adjacentCareerName: 'Brand & Communications Director',
      salaryRange: '₹8 – 16 LPA',
      keySkillsRequired: ['Brand Strategy', 'Copywriting & Content Writing', 'Public Speaking & Pitching'],
      whyThisIsClose: 'Elevating digital campaigns into high-profile executive thought leadership and brand narrative leads to executive CMO tracks.',
      unlockedRoleScope: 'Oversee corporate brand identity, PR campaigns, and customer trust initiatives.'
    }
  ],
  'cybersecurity-analyst': [
    {
      adjacentCareerName: 'Cloud Security Architect',
      salaryRange: '₹12 – 24 LPA',
      keySkillsRequired: ['AWS', 'Docker', 'Linux', 'Microsoft Azure'],
      whyThisIsClose: 'Shifting traditional firewall defense to modern cloud posture security (CSPM) and zero-trust policies gives you the most in-demand security role.',
      unlockedRoleScope: 'Architect cloud IAM access controls, container security policies, and automated compliance.'
    },
    {
      adjacentCareerName: 'Penetration Tester & Ethical Hacker',
      salaryRange: '₹10 – 20 LPA',
      keySkillsRequired: ['Ethical Hacking', 'Python', 'Cryptography'],
      whyThisIsClose: 'Transitioning from passive monitoring to authorized offensive red-team simulations makes you a sought-after security specialist.',
      unlockedRoleScope: 'Conduct vulnerability assessments, exploit simulations, and secure code audits.'
    }
  ],
  'operations-manager': [
    {
      adjacentCareerName: 'Operations Excellence & Automation Lead',
      salaryRange: '₹9 – 18 LPA',
      keySkillsRequired: ['Power BI', 'Process Optimization', 'SQL'],
      whyThisIsClose: 'Replacing manual warehouse and logistics tracking with automated real-time KPI alerts elevates your role to operational transformation.',
      unlockedRoleScope: 'Eliminate operational bottlenecks and build automated supply chain command centers.'
    },
    {
      adjacentCareerName: 'Global Sourcing & Procurement Director',
      salaryRange: '₹9 – 17 LPA',
      keySkillsRequired: ['Client Negotiation', 'Vendor Management', 'Risk Management'],
      whyThisIsClose: 'Mastering commercial supplier contracts and cross-border vendor negotiation unlocks senior corporate procurement leadership.',
      unlockedRoleScope: 'Negotiate enterprise supply agreements, manage vendor SLAs, and mitigate shipping risks.'
    }
  ],
  'ui-ux-designer': [
    {
      adjacentCareerName: 'Associate Product Manager (APM)',
      salaryRange: '₹10 – 18 LPA',
      keySkillsRequired: ['Product Management', 'Agile / Scrum', 'Market Research'],
      whyThisIsClose: 'You already own user journey maps, empathy interviews, and wireframes. Adding business requirements and sprint planning makes you a natural Product Manager.',
      unlockedRoleScope: 'Define product feature roadmaps, write PRDs, and prioritize development sprints.'
    },
    {
      adjacentCareerName: 'Design Technologist & Frontend UI Specialist',
      salaryRange: '₹9 – 17 LPA',
      keySkillsRequired: ['HTML/CSS', 'React', 'JavaScript'],
      whyThisIsClose: 'Being able to turn your own Figma designs into interactive code makes you a "Design Technologist" with rare, elite market value.',
      unlockedRoleScope: 'Build production design systems and seamless component libraries in React and Tailwind.'
    }
  ],
  'cloud-devops-engineer': [
    {
      adjacentCareerName: 'Site Reliability Engineer (SRE)',
      salaryRange: '₹12 – 24 LPA',
      keySkillsRequired: ['Linux', 'Python', 'Kubernetes'],
      whyThisIsClose: 'Focusing on high availability, latency optimization, and automated failover makes you an elite Site Reliability Engineer.',
      unlockedRoleScope: 'Maintain 99.99% service uptime, manage incident response, and automate disaster recovery.'
    },
    {
      adjacentCareerName: 'MLOps & AI Platform Engineer',
      salaryRange: '₹14 – 26 LPA',
      keySkillsRequired: ['Machine Learning', 'Docker', 'AWS'],
      whyThisIsClose: 'Providing the infrastructure backbone for GPU training clusters and low-latency model inference is the fastest growing specialty in cloud.',
      unlockedRoleScope: 'Architect high-throughput GPU model training clusters and model deployment APIs.'
    }
  ],
  'content-brand-strategist': [
    {
      adjacentCareerName: 'Product Marketing Specialist (PMM)',
      salaryRange: '₹8 – 16 LPA',
      keySkillsRequired: ['Product Management', 'Market Research', 'Digital Marketing'],
      whyThisIsClose: 'Translating storytelling into product positioning, buyer personas, and competitive battlecards unlocks high-paying PMM roles.',
      unlockedRoleScope: 'Lead product launch campaigns, positioning frameworks, and sales enablement collateral.'
    },
    {
      adjacentCareerName: 'Public Relations & Strategic Communications Lead',
      salaryRange: '₹9 – 18 LPA',
      keySkillsRequired: ['Public Speaking & Pitching', 'Client Negotiation', 'Brand Strategy'],
      whyThisIsClose: 'Expanding from written content to corporate media relations and executive communications puts you in direct senior leadership.',
      unlockedRoleScope: 'Manage corporate press releases, media interviews, and executive thought leadership.'
    }
  ],
  'corporate-sales-manager': [
    {
      adjacentCareerName: 'Strategic Business Partnerships Director',
      salaryRange: '₹12 – 26 LPA',
      keySkillsRequired: ['Strategic Planning', 'Financial Analysis', 'Client Negotiation'],
      whyThisIsClose: 'Moving from individual enterprise deals to multi-year corporate alliances and revenue-sharing joint ventures unlocks director-level compensation.',
      unlockedRoleScope: 'Structure high-value corporate partnerships, channel reseller agreements, and commercial alliances.'
    },
    {
      adjacentCareerName: 'Commercial Go-to-Market (GTM) Director',
      salaryRange: '₹11 – 22 LPA',
      keySkillsRequired: ['Digital Marketing', 'CRM (HubSpot/Salesforce)', 'Business Analysis'],
      whyThisIsClose: 'Designing the repeatable sales playbook, hiring SDRs, and aligning marketing leads with sales pipeline gives you full GTM leadership.',
      unlockedRoleScope: 'Define enterprise territory models, compensation plans, and sales training playbooks.'
    }
  ]
};

export function getExistingRoleBaseline(
  qualification: string,
  specialization: string
): {
  traditionalRoleName: string;
  traditionalPackage: string;
  minLpa: number;
  maxLpa: number;
} {
  const q = (qualification || '').toLowerCase();
  const s = (specialization || '').toLowerCase();

  if (q.includes('mba') || q.includes('bba') || q.includes('pgdm')) {
    if (s.includes('finance') || s.includes('account')) {
      return {
        traditionalRoleName: 'Conventional Accounts / Junior Financial Executive',
        traditionalPackage: '₹3.5 – 5.0 LPA',
        minLpa: 3.5,
        maxLpa: 5.0
      };
    }
    if (s.includes('market')) {
      return {
        traditionalRoleName: 'Traditional Marketing Executive / Field Sales Rep',
        traditionalPackage: '₹3.2 – 4.8 LPA',
        minLpa: 3.2,
        maxLpa: 4.8
      };
    }
    if (s.includes('human') || s.includes('hr')) {
      return {
        traditionalRoleName: 'Traditional HR Recruiter / Office Coordinator',
        traditionalPackage: '₹2.8 – 4.2 LPA',
        minLpa: 2.8,
        maxLpa: 4.2
      };
    }
    return {
      traditionalRoleName: 'General Management Trainee / Operations Associate',
      traditionalPackage: '₹3.5 – 5.0 LPA',
      minLpa: 3.5,
      maxLpa: 5.0
    };
  }

  if (q.includes('b.tech') || q.includes('bca') || q.includes('mca') || q.includes('m.tech')) {
    return {
      traditionalRoleName: 'Legacy IT Support / Maintenance Clerk / Manual QA',
      traditionalPackage: '₹3.6 – 5.2 LPA',
      minLpa: 3.6,
      maxLpa: 5.2
    };
  }

  if (q.includes('b.com')) {
    return {
      traditionalRoleName: 'Junior Accountant / Bookkeeper / Billing Clerk',
      traditionalPackage: '₹2.8 – 4.2 LPA',
      minLpa: 2.8,
      maxLpa: 4.2
    };
  }

  return {
    traditionalRoleName: 'Conventional Entry-Level / Generalist Role',
    traditionalPackage: '₹3.0 – 4.5 LPA',
    minLpa: 3.0,
    maxLpa: 4.5
  };
}

export function calculateSalaryHike(
  suggestedSalaryRange: string,
  baseline: { minLpa: number; maxLpa: number; traditionalPackage: string }
): {
  hikePercentage: string;
  multiplier: string;
  numericHike: number;
} {
  const matches = suggestedSalaryRange.match(/[\d.]+/g);
  let sugMin = 8;
  let sugMax = 16;
  if (matches && matches.length >= 2) {
    sugMin = parseFloat(matches[0]);
    sugMax = parseFloat(matches[1]);
  } else if (matches && matches.length === 1) {
    sugMin = parseFloat(matches[0]);
    sugMax = sugMin * 1.8;
  }

  const sugAvg = (sugMin + sugMax) / 2;
  const baseAvg = (baseline.minLpa + baseline.maxLpa) / 2;

  const pct = Math.max(30, Math.round(((sugAvg - baseAvg) / baseAvg) * 100));
  const mult = Math.max(1.3, parseFloat((sugAvg / baseAvg).toFixed(1)));

  return {
    hikePercentage: `+${pct}% Higher Package`,
    multiplier: `${mult}x`,
    numericHike: pct
  };
}

function computeAdjacentCareerUnlocks(
  careerId: string,
  selectedSkills: string[],
  baseline?: { minLpa: number; maxLpa: number; traditionalPackage: string }
): AdjacentCareerUnlock[] {
  const templates = ADJACENT_CAREER_TEMPLATES[careerId] || [];
  return templates.map((tpl) => {
    const skillsAlreadyPossessed = tpl.keySkillsRequired.filter((sk) =>
      selectedSkills.some((sel) => isSkillMatch(sel, sk))
    );
    const extraSkillsToAdd = tpl.keySkillsRequired.filter(
      (sk) => !skillsAlreadyPossessed.includes(sk)
    );
    const readinessPercentage = Math.min(
      95,
      Math.max(
        50,
        Math.round(((skillsAlreadyPossessed.length + 1) / (tpl.keySkillsRequired.length + 1)) * 100)
      )
    );
    const transitionEase =
      extraSkillsToAdd.length <= 2
        ? ('Fast-Track (1–2 Skills Away)' as const)
        : ('Moderate (2–3 Skills Away)' as const);

    let packageHikePercentage: string | undefined;
    if (baseline) {
      const hike = calculateSalaryHike(tpl.salaryRange, baseline);
      packageHikePercentage = hike.hikePercentage;
    }

    return {
      adjacentCareerName: tpl.adjacentCareerName,
      salaryRange: tpl.salaryRange,
      existingRoleSalary: baseline?.traditionalPackage,
      packageHikePercentage,
      skillsAlreadyPossessed,
      extraSkillsToAdd: extraSkillsToAdd.length > 0 ? extraSkillsToAdd : [tpl.keySkillsRequired[0]],
      readinessPercentage,
      transitionEase,
      whyThisIsClose: tpl.whyThisIsClose,
      unlockedRoleScope: tpl.unlockedRoleScope
    };
  });
}

function computeHighImpactSkills(
  selectedSkills: string[]
): HighImpactSkillMultiplier[] {
  const HIGH_IMPACT_CATALOG = [
    {
      skillName: 'Power BI / Tableau',
      category: 'Data & Analytics',
      whyItExpandsOptions: 'Adds executive dashboarding and visual storytelling to any technical or business role.',
      targetCareers: ['Financial Data Analyst', 'Business Intelligence Analyst', 'HR Analyst', 'Operations Manager']
    },
    {
      skillName: 'Python (Data & Automation)',
      category: 'Programming & Automation',
      whyItExpandsOptions: 'Bridges spreadsheet workflows to high-speed data engineering and algorithmic automation.',
      targetCareers: ['FinTech Analyst', 'Data Scientist', 'Cloud & DevOps Engineer', 'Software Developer']
    },
    {
      skillName: 'Product Management & Agile',
      category: 'Business & Management',
      whyItExpandsOptions: 'Elevates technical, operational, or design contributors into strategic product decision-makers.',
      targetCareers: ['Technical Product Manager', 'Associate Product Manager', 'Business Analyst', 'Growth Lead']
    },
    {
      skillName: 'Generative AI & LLM Prompting',
      category: 'Artificial Intelligence',
      whyItExpandsOptions: 'Future-proofs any career by automating workflows and embedding AI copilot architectures.',
      targetCareers: ['AI Engineer', 'AI Product Architect', 'Growth Strategist', 'Content Strategist']
    },
    {
      skillName: 'Cloud (AWS / Azure) & Docker',
      category: 'Cloud & Infrastructure',
      whyItExpandsOptions: 'Expands local developer or analyst code into scalable, resilient production cloud environments.',
      targetCareers: ['Cloud & DevOps Engineer', 'MLOps Engineer', 'Full-Stack Developer', 'Data Architect']
    },
    {
      skillName: 'Digital Marketing & Meta/Google Ads',
      category: 'Marketing & Commercial',
      whyItExpandsOptions: 'Pairs data metrics with revenue acquisition, making you an indispensable growth driver.',
      targetCareers: ['Growth Analyst', 'Performance Marketing Lead', 'Digital Marketing Strategist']
    }
  ];

  return HIGH_IMPACT_CATALOG.filter(
    (item) => !selectedSkills.some((sel) => isSkillMatch(sel, item.skillName))
  ).slice(0, 3).map((item) => ({
    skillName: item.skillName,
    category: item.category,
    whyItExpandsOptions: item.whyItExpandsOptions,
    careersUnlockedCount: item.targetCareers.length,
    unlockedCareers: item.targetCareers
  }));
}

/**
 * Calculates dynamic career recommendations based on the 5 intake answers:
 * - Educational qualification
 * - Specialization
 * - Selected skills
 * - Career interest
 * - Preferred work type
 */
export function generateDynamicCareerRecommendations(
  profile: StudentProfileInput
): CareerGuidanceResultData {
  const { qualification, specialization, selectedSkills, careerInterest, preferredCareerType } = profile;

  const effectiveQualification = qualification === 'Other' && profile.customQualification?.trim()
    ? profile.customQualification.trim()
    : qualification;
  const effectiveSpecialization = specialization === 'Other' && profile.customSpecialization?.trim()
    ? profile.customSpecialization.trim()
    : specialization;
  const effectiveInterest = careerInterest === 'Other' && profile.customCareerInterest?.trim()
    ? profile.customCareerInterest.trim()
    : careerInterest;

  const scoredCareers = CAREER_MASTER_DATABASE.map((career) => {
    let score = 50; // base score

    // 1. Career Interest Alignment (Highest Weight +25)
    if (
      career.compatibleInterests.includes(careerInterest) ||
      career.compatibleInterests.some(
        (i) => i.toLowerCase().includes(effectiveInterest.toLowerCase()) || effectiveInterest.toLowerCase().includes(i.toLowerCase())
      )
    ) {
      score += 25;
    }

    // 2. Work Type Preference Alignment (+15)
    if (preferredCareerType === career.careerType) {
      score += 15;
    } else if (
      preferredCareerType === 'Hybrid (Technical + Business)' &&
      (career.careerType === 'Technical' || career.careerType === 'Business-Oriented')
    ) {
      score += 8;
    } else if (
      (preferredCareerType === 'Technical' || preferredCareerType === 'Business-Oriented') &&
      career.careerType === 'Hybrid (Technical + Business)'
    ) {
      score += 10;
    }

    // 3. Qualification Compatibility (+10)
    if (
      career.compatibleQualifications.includes(qualification) ||
      career.compatibleQualifications.some((q) => q.toLowerCase() === effectiveQualification.toLowerCase()) ||
      qualification === 'Other'
    ) {
      score += 10;
    }

    // 4. Specialization Compatibility (+12)
    if (
      career.compatibleSpecializations.some(
        (s) =>
          s.toLowerCase() === effectiveSpecialization.toLowerCase() ||
          effectiveSpecialization.toLowerCase().includes(s.toLowerCase()) ||
          s.toLowerCase().includes(effectiveSpecialization.toLowerCase())
      )
    ) {
      score += 12;
    }

    // 5. Selected Skills Overlap (+6 per matched skill)
    const matchingSkills = career.requiredSkills.filter((reqSkill) =>
      selectedSkills.some((selSkill) => isSkillMatch(selSkill, reqSkill))
    );
    score += matchingSkills.length * 6;

    // RULE 1: Never recommend pure Data Science to every student just because they select Python!
    if (
      qualification === 'MBA' &&
      (career.id === 'data-scientist' || career.id === 'ml-engineer') &&
      specialization !== 'Business Analytics'
    ) {
      score -= 20; // Penalize heavy ML/Data Science for non-analytics MBA, favoring Financial Data Analyst, BI Analyst, etc.
    }

    // RULE 2: MBA + Finance + Python/SQL -> Boost Financial Data Analyst, FinTech Analyst, Risk Analyst, BI Analyst
    if (qualification === 'MBA' && specialization.toLowerCase().includes('finance')) {
      if (['financial-data-analyst', 'fintech-analyst', 'risk-analyst', 'bi-analyst', 'business-analyst'].includes(career.id)) {
        score += 20;
      }
    }

    // RULE 3: MBA + Marketing + Google Analytics/Excel/SQL -> Boost Marketing Data Analyst, Growth Analyst
    if (qualification === 'MBA' && specialization.toLowerCase().includes('marketing')) {
      if (['marketing-data-analyst', 'growth-analyst', 'digital-marketer', 'bi-analyst', 'business-analyst'].includes(career.id)) {
        score += 20;
      }
    }

    // RULE 4: MBA + HR + Excel/SQL/Power BI -> Boost HR Analyst, HR Tech Consultant
    if (qualification === 'MBA' && specialization.toLowerCase().includes('human')) {
      if (['hr-analyst', 'hr-tech-consultant', 'bi-analyst', 'business-analyst'].includes(career.id)) {
        score += 25;
      }
    }

    // RULE 5: B.Tech AI & Data Science + Python/Pandas/ML -> Boost Data Scientist, ML Engineer, AI Engineer, BI Analyst
    if (
      (qualification === 'B.Tech' || qualification === 'M.Tech') &&
      specialization.toLowerCase().includes('ai')
    ) {
      if (['data-scientist', 'ml-engineer', 'ai-engineer', 'bi-analyst'].includes(career.id)) {
        score += 25;
      }
    }

    // RULE 6: B.Com + Excel/SQL/Power BI -> Boost Financial Analyst, MIS Analyst, Business Analyst
    if (qualification === 'B.Com') {
      if (['financial-data-analyst', 'mis-analyst', 'business-analyst', 'bi-analyst', 'risk-analyst'].includes(career.id)) {
        score += 20;
      }
    }

    // Skills analysis
    const skillsStudentHas = career.requiredSkills.filter((reqSkill) =>
      selectedSkills.some((selSkill) => isSkillMatch(selSkill, reqSkill))
    );
    const skillsToLearn = career.requiredSkills.filter(
      (reqSkill) => !skillsStudentHas.includes(reqSkill)
    );

    // Dynamic reason why this matches
    let whyThisMatches = `Strong alignment with your ${effectiveQualification} in ${effectiveSpecialization}`;
    if (skillsStudentHas.length > 0) {
      whyThisMatches += ` leveraging your selected skills in ${skillsStudentHas.join(', ')}`;
    }
    whyThisMatches += `, directly supporting your interest in ${effectiveInterest} within a ${career.careerType.toLowerCase()} career model.`;

    const normalizedScore = Math.min(Math.max(score, 60), 98);

    const baseline = getExistingRoleBaseline(effectiveQualification, effectiveSpecialization);
    const adjacentCareersUnlocked = computeAdjacentCareerUnlocks(career.id, selectedSkills, baseline);
    const hike = calculateSalaryHike(career.salaryRange, baseline);

    const recommendedOption: RecommendedCareerOption = {
      id: career.id,
      careerName: career.careerName,
      careerDescription: career.careerDescription,
      matchScore: normalizedScore,
      whyThisMatches,
      careerType: career.careerType,
      primaryDomain: career.primaryDomain,
      salaryRange: career.salaryRange,
      existingJobRoleTitle: baseline.traditionalRoleName,
      existingJobRoleSalary: baseline.traditionalPackage,
      packageHikePercentage: hike.hikePercentage,
      packageMultiplier: hike.multiplier,
      requiredSkills: career.requiredSkills,
      skillsStudentHas,
      skillsToLearn,
      recommendedSoftwareAndTools: career.recommendedSoftwareAndTools,
      industryOpportunities: career.industryOpportunities,
      learningRoadmap: career.learningRoadmap,
      suggestedProjects: career.suggestedProjects,
      adjacentCareersUnlocked
    };

    return {
      option: recommendedOption,
      score: normalizedScore
    };
  });

  // Sort by highest score
  scoredCareers.sort((a, b) => b.score - a.score);

  // Return top 5 to 7 career options
  const topRecommendations = scoredCareers.slice(0, 6).map((c) => c.option);

  const referenceId = `CG-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const highImpactSkillsToLearn = computeHighImpactSkills(selectedSkills);

  const baseline = getExistingRoleBaseline(effectiveQualification, effectiveSpecialization);
  const avgSuggestedMin =
    topRecommendations.reduce((acc, c) => {
      const m = c.salaryRange.match(/[\d.]+/g);
      return acc + (m ? parseFloat(m[0]) : 8);
    }, 0) / (topRecommendations.length || 1);

  const avgSuggestedMax =
    topRecommendations.reduce((acc, c) => {
      const m = c.salaryRange.match(/[\d.]+/g);
      return acc + (m && m.length > 1 ? parseFloat(m[1]) : 16);
    }, 0) / (topRecommendations.length || 1);

  const suggestedAveragePackage = `₹${avgSuggestedMin.toFixed(1)} – ${avgSuggestedMax.toFixed(0)} LPA`;
  const overallHike = Math.round(
    (((avgSuggestedMin + avgSuggestedMax) / 2 - (baseline.minLpa + baseline.maxLpa) / 2) /
      ((baseline.minLpa + baseline.maxLpa) / 2)) *
      100
  );

  return {
    referenceId,
    generatedAt: new Date().toISOString(),
    studentProfile: profile,
    recommendedCareers: topRecommendations,
    highImpactSkillsToLearn,
    existingRoleBaseline: {
      traditionalRoleName: baseline.traditionalRoleName,
      traditionalPackage: baseline.traditionalPackage,
      suggestedAveragePackage,
      averageHike: `+${overallHike}%`
    }
  };
}
