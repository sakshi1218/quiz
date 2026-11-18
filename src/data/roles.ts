import { CareerRole } from '../types';

export const CAREER_ROLES: CareerRole[] = [
  // --------------------------------------------------------------------------
  // A. Creative & Communication
  // --------------------------------------------------------------------------
  {
    id: 'role-ai-content-creator',
    roleCode: 'ai_content_creator',
    categoryId: 'cat-creative-comm',
    categoryCode: 'creative_comm',
    categoryTitle: 'Creative & Communication',
    title: 'AI Content Creator',
    tagline: 'Drafting high-converting editorial, visual, and multi-format content with generative AI amplification.',
    description: 'AI Content Creators partner with generative text, image, and multimedia models to produce articles, newsletters, scripts, and visual assets faster while maintaining high editorial standards and distinctive brand voice.',
    typicalResponsibilities: [
      'Craft structured prompts and style guidelines for AI copy generation across blog posts, newsletters, and video scripts',
      'Fact-check, refine tone, and eliminate hallucinations from raw AI drafts before publication',
      'Generate complementary visual assets and infographic concepts using modern image generation tools',
      'Develop reusable content templates and custom instructions aligned with specific brand guidelines',
      'Analyze reader engagement metrics to iterate on storytelling frameworks and prompt libraries'
    ],
    requiredBeginnerSkills: [
      'Strong written English grammar, storytelling fundamentals, and editorial judgment',
      'Effective prompt structuring (role assignment, context framing, few-shot examples, constraints)',
      'Basic image editing and graphic layout awareness (Canva, Figma basics)',
      'Fact-checking diligence and citation verification techniques'
    ],
    skillsToDevelopNext: [
      'Multi-modal prompt chaining (combining text, audio voiceovers, and video avatars)',
      'Search intent modeling and AI-assisted SEO content architecture',
      'Building custom GPTs and workspace writing assistants with unique style manuals',
      'Content repurposing workflows across LinkedIn, newsletters, YouTube, and X'
    ],
    suggestedTools: {
      primary: ['Claude', 'ChatGPT Plus', 'Midjourney', 'Canva Magic Studio'],
      alternatives: ['Google Gemini', 'Microsoft Copilot', 'Leonardo.ai', 'Grammarly']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No coding is required. Work relies on prompt craft, clear editorial standards, creative vision, and content management systems.',
    portfolioProject: {
      title: 'Multi-Channel AI Editorial Campaign & Brand Voice Kit',
      scenario: 'A sustainable coffee subscription startup needs a 4-part launch series: a foundational article, an email newsletter sequence, and 5 visual social snippets with strict tone guidelines.',
      deliverables: [
        '1,200-word deep-dive article fact-checked with external citations',
        '3-part onboarding email sequence with subject line variants and hooks',
        '5 social carousel scripts with Midjourney/Canva visual mockups',
        'Brand Voice Prompt Guide document showing prompt iterations and negative constraints'
      ],
      completionCriteria: [
        'Zero factual hallucination: all claims cited or verifiable',
        'Consistent conversational tone maintained across all 4 deliverables',
        'Includes before-and-after prompt engineering documentation highlighting human editorial adjustments'
      ],
      toolsUsed: ['Claude or ChatGPT', 'Canva', 'Notion or Google Docs'],
      estimatedHours: '12-16 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Prompt Foundations & Brand Voice Modeling',
        focus: 'Mastering role-based prompting, few-shot conditioning, and negative prompting for editorial consistency.',
        actionItems: [
          'Study core prompt structures: System prompt, Task, Context, Format, and Tone constraints',
          'Create a 1-page Brand Voice Profile for a hypothetical or real company',
          'Generate 5 variations of a product announcement and refine them through editorial iterations'
        ],
        deliverable: 'A documented Brand Voice Prompt Matrix with 3 tested prompting templates.'
      },
      {
        week: 2,
        title: 'Editorial Rigor, Fact-Checking & Hallucination Defense',
        focus: 'Developing rigorous editorial checks to catch hallucinations, bias, and generic output.',
        actionItems: [
          'Practice cross-referencing AI factual statements against primary sources',
          'Learn prompt techniques to enforce citations ("only use verified knowledge or declare uncertainty")',
          'Draft a comprehensive 1,200-word thought leadership article using outline-first workflow'
        ],
        deliverable: 'Fact-checked, fully referenced article with an audit log of edited AI statements.'
      },
      {
        week: 3,
        title: 'Visual & Multi-Modal Asset Generation',
        focus: 'Producing companion visuals, social graphics, and layout mockups using generative visual tools.',
        actionItems: [
          'Experiment with Midjourney or Leonardo prompt parameters (aspect ratio, stylize, lighting)',
          'Integrate generated imagery into Canva templates with branded typography and color schemes',
          'Create a 5-slide visual carousel ready for publishing'
        ],
        deliverable: 'Complete set of 5 branded visual assets supporting the written article.'
      },
      {
        week: 4,
        title: 'Portfolio Assembly & Workflow Packaging',
        focus: 'Compiling the full campaign into a shareable Notion or PDF case study with clear outcome evidence.',
        actionItems: [
          'Document the creative process, prompt evolution, and time saved vs. manual production',
          'Publish the case study on a personal portfolio site, Notion page, or Medium',
          'Craft a targeted LinkedIn summary highlighting AI content strategy competencies'
        ],
        deliverable: 'Publicly shareable portfolio case study link demonstrating end-to-end creative workflow.'
      }
    ],
    learningResources: [
      {
        title: 'Learn Prompting: Prompt Engineering Guide',
        type: 'Interactive Tutorial',
        provider: 'LearnPrompting.org',
        description: 'Comprehensive, accessible course covering beginner to advanced prompting principles.',
        searchQuery: 'learn prompting interactive guide for generative ai'
      },
      {
        title: 'OpenAI Prompt Engineering Documentation',
        type: 'Documentation',
        provider: 'OpenAI',
        description: 'Official best practices for clear instructions, role framing, and few-shot examples.',
        searchQuery: 'openai prompt engineering best practices guide'
      },
      {
        title: 'Canva Design School: AI & Visual Hierarchy',
        type: 'Course',
        provider: 'Canva',
        description: 'Practical training on combining AI-generated art with professional typographic design.',
        searchQuery: 'canva design school typography and visual hierarchy'
      }
    ],
    portfolioEvidence: 'A public Notion case study or Substack post displaying the full editorial campaign, accompanied by prompt logs, before/after editing samples, and visual carousels.',
    resumeInterviewPrep: [
      'Highlight specific workflows: "Authored multi-channel campaign utilizing Claude & Midjourney, accelerating drafting turnaround by 60% while upholding style guide fidelity."',
      'Prepare to explain during interviews how you verify facts and safeguard against brand risk and copyrighted material.',
      'Bring a 1-page prompt cheat sheet you built to demonstrate systematic methodology over random experimentation.'
    ],
    progressionPathways: [
      'AI Content Strategist',
      'Head of AI Creative Operations',
      'Brand Storytelling Lead',
      'Digital Publication Editor'
    ],
    limitationsAndPrerequisites: 'Strong fundamental writing and editing skills are essential; AI amplifies your taste but cannot compensate for weak underlying communication sense.',
    displayOrder: 1
  },
  {
    id: 'role-ai-marketing-assistant',
    roleCode: 'ai_marketing_assistant',
    categoryId: 'cat-creative-comm',
    categoryCode: 'creative_comm',
    categoryTitle: 'Creative & Communication',
    title: 'AI Marketing Assistant',
    tagline: 'Orchestrating audience research, ad copy iteration, and campaign asset generation with AI precision.',
    description: 'AI Marketing Assistants support marketing teams by rapidly drafting ad creative variants, mapping audience personas, generating landing page copy, and summarizing campaign analytics into actionable recommendations.',
    typicalResponsibilities: [
      'Develop 10+ ad copy variations for Meta, Google, and LinkedIn ads tailored to specific buyer personas',
      'Synthesize competitor messaging, customer reviews, and survey feedback into persona pain point maps',
      'Draft conversion-focused landing page wireframe copy, headlines, and call-to-action hooks',
      'Assist with A/B test structuring and summarize campaign performance reports into executive summaries',
      'Maintain an organized prompt library for repeatable marketing campaign cycles'
    ],
    requiredBeginnerSkills: [
      'Core marketing concepts (buyer personas, value proposition, AIDA copywriting framework, conversion rate)',
      'Prompt design for iterative copywriting and persona roleplaying',
      'Basic spreadsheet literacy (Google Sheets/Excel) for campaign tracking',
      'Analytical mindset to evaluate copy test results objectively'
    ],
    skillsToDevelopNext: [
      'Marketing automation tool integration (Zapier, HubSpot, Mailchimp)',
      'Keyword clustering and AI-assisted search intent analysis',
      'Conversion Rate Optimization (CRO) experimentation methodologies',
      'Automated reporting pipelines using AI spreadsheet plugins'
    ],
    suggestedTools: {
      primary: ['ChatGPT Plus', 'Claude', 'Google Sheets + GPT for Sheets', 'Jasper or Copy.ai'],
      alternatives: ['Perplexity AI', 'Microsoft Copilot', 'MailerLite AI', 'AdCreative.ai']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No coding required. Basic comfort with web tools, marketing dashboards, and spreadsheets is sufficient.',
    portfolioProject: {
      title: 'Full-Funnel AI Product Launch Marketing Kit',
      scenario: 'An indie productivity SaaS is launching a new task management feature. Create an entire launch kit tailored to two distinct buyer personas: Freelancers and Remote Team Leads.',
      deliverables: [
        'Detailed Customer Persona Dossier (pain points, triggers, objections) generated via AI analysis',
        'Landing page copy outline featuring headline variations, feature-benefit bullets, and FAQ section',
        '12 ad creative concepts (6 per persona) with copy, visual directions, and CTA buttons',
        'Campaign launch timeline and metrics tracking template'
      ],
      completionCriteria: [
        'Clear differentiation between the two persona messaging strategies',
        'Application of recognized conversion copy frameworks (PAS or AIDA)',
        'Inclusion of an evaluation rubric showing why specific hooks were selected'
      ],
      toolsUsed: ['Claude or ChatGPT', 'Google Docs / Sheets', 'Loom for video walkthrough'],
      estimatedHours: '10-14 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Customer Research & Persona Simulation',
        focus: 'Leveraging LLMs to analyze customer reviews, forums, and market feedback to construct realistic persona profiles.',
        actionItems: [
          'Collect 20 customer reviews from public marketplaces (G2, Trustpilot, Amazon)',
          'Prompt Claude/ChatGPT to extract recurring emotional pain points, feature desires, and hesitation triggers',
          'Build two structured persona cards with verbatim quote approximations'
        ],
        deliverable: 'Persona Research Dossier with verified buyer motivations.'
      },
      {
        week: 2,
        title: 'Conversion Copywriting & Ad Variation Generation',
        focus: 'Applying Problem-Agitate-Solve (PAS) and Benefits-First prompt workflows to produce high-intent copy.',
        actionItems: [
          'Design prompts that enforce strict character counts for Google Search and Meta Ads',
          'Generate 10 headline variations and evaluate against emotional resonance and clarity',
          'Draft a complete landing page copy deck from Hero section to final CTA'
        ],
        deliverable: 'Landing Page Copy Deck and 10 Ad Copy Variants organized in a spreadsheet.'
      },
      {
        week: 3,
        title: 'Email Sequences & Lead Nurturing',
        focus: 'Drafting multi-touch email nurture sequences with personalized segmentation hooks.',
        actionItems: [
          'Draft a 4-part automated email welcome sequence for trial users',
          'Implement conversational tone adjustments and clear, singular call-to-actions',
          'Simulate objection handling in email 3 (pricing, onboarding time, alternatives)'
        ],
        deliverable: '4-part automated email sequence with subject line A/B test options.'
      },
      {
        week: 4,
        title: 'Campaign Kit Synthesis & Portfolio Presentation',
        focus: 'Packaging the campaign deliverables into an executive-ready portfolio presentation.',
        actionItems: [
          'Assemble all assets into a clean Notion document or slide deck',
          'Record a 3-minute Loom video walking through your strategic decisions and AI prompting workflow',
          'Publish to LinkedIn and update resume with quantifiable workflow achievements'
        ],
        deliverable: 'Polished marketing portfolio deck with video commentary link.'
      }
    ],
    learningResources: [
      {
        title: 'HubSpot Academy: Inbound Marketing Certification',
        type: 'Course',
        provider: 'HubSpot',
        description: 'Free foundational marketing education covering funnels, buyer personas, and content strategy.',
        searchQuery: 'hubspot academy inbound marketing certification free'
      },
      {
        title: 'Marketing Examples: Copywriting Gallery',
        type: 'Interactive Tutorial',
        provider: 'Harry Dry / Marketing Examples',
        description: 'Visual breakdowns of high-converting headlines, value propositions, and email formats.',
        searchQuery: 'marketing examples harry dry copywriting gallery'
      },
      {
        title: 'Google Digital Garage: Fundamentals of Digital Marketing',
        type: 'Course',
        provider: 'Google',
        description: 'Foundations of digital advertising channels, search marketing, and metrics.',
        searchQuery: 'google digital garage fundamentals digital marketing'
      }
    ],
    portfolioEvidence: 'A Notion or slide-deck portfolio containing the persona research, landing page copy deck, ad variations, and a 3-minute video explaining the campaign logic.',
    resumeInterviewPrep: [
      'Emphasize speed and experimentation: "Developed AI-assisted ad testing system generating 30+ compliant variations weekly, cutting copy drafting time by 50%."',
      'Demonstrate strategic thinking: explain how you prevent bland, generic marketing language by feeding the AI specific customer objections and proof points.',
      'Show understanding of marketing KPIs: CTR, CPC, conversion rate, and customer acquisition cost.'
    ],
    progressionPathways: [
      'Growth Marketing Manager',
      'Performance Marketing Specialist',
      'Lifecycle Marketing Lead',
      'AI Marketing Operations Manager'
    ],
    limitationsAndPrerequisites: 'Requires an understanding of marketing psychology and persuasion; AI will generate clichés unless guided by sharp positioning insights.',
    displayOrder: 2
  },
  {
    id: 'role-ai-social-media-specialist',
    roleCode: 'ai_social_media_specialist',
    categoryId: 'cat-creative-comm',
    categoryCode: 'creative_comm',
    categoryTitle: 'Creative & Communication',
    title: 'AI Social Media Specialist',
    tagline: 'Scaling social engagement, trend adaptation, and cross-platform publishing with generative tools.',
    description: 'AI Social Media Specialists strategize, draft, schedule, and optimize organic social posts across LinkedIn, X, Instagram, and TikTok, using AI to repurpose long-form assets and maintain continuous audience engagement.',
    typicalResponsibilities: [
      'Transform podcasts, webinars, and long-form articles into 10+ bite-sized social posts and threads',
      'Monitor industry conversations and generate timely, relevant commentary drafts for brand accounts',
      'Produce visual quote cards, video captions, and carousel graphics using AI-powered creative software',
      'Draft community reply variations for team review to accelerate customer engagement',
      'Maintain an editorial calendar and track weekly engagement metrics to identify top-performing hooks'
    ],
    requiredBeginnerSkills: [
      'Intuitive understanding of social media platform algorithms and native formatting rules (LinkedIn vs. X vs. Instagram)',
      'Hook writing and concise storytelling skills',
      'Basic video snippet editing (CapCut, Descript) and visual layout (Canva)',
      'Prompting for tone flexibility (witty, authoritative, informative, empathetic)'
    ],
    skillsToDevelopNext: [
      'Automated social scheduling via webhooks or social media management tools (Buffer, Hootsuite)',
      'Video repurposing pipelines (Descript, OpusClip, Submagic)',
      'Community growth strategy and influencer collaboration workflows',
      'Social listening and sentiment analysis using AI summarization'
    ],
    suggestedTools: {
      primary: ['ChatGPT Plus', 'Claude', 'Canva Magic Studio', 'Descript / OpusClip'],
      alternatives: ['Buffer AI Assistant', 'Taplio', 'CapCut', 'Notion AI']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No coding required. Proficiency with web-based social tools and media editors is what matters.',
    portfolioProject: {
      title: '30-Day Multi-Platform Social Repurposing Engine',
      scenario: 'A B2B tech executive gave a 45-minute keynote presentation. Turn this single recording transcript into a full month of engaging social media content.',
      deliverables: [
        'Content atomization map breaking the talk into 5 core themes',
        '10 LinkedIn thought-leadership posts with hooks, formatted whitespace, and conversation prompts',
        '5 high-impact X (Twitter) threads summarizing specific takeaways',
        '3 video short scripts with timestamped audio cuts and visual slide prompts',
        '30-day publishing calendar with hashtag strategy and engagement guidelines'
      ],
      completionCriteria: [
        'Posts read as human-written, avoiding clichéd AI intros ("In today\'s fast-paced world")',
        'Native formatting applied properly for each platform',
        'Includes visual mockups showing how carousel or quote cards will look in the feed'
      ],
      toolsUsed: ['Claude / ChatGPT', 'Canva', 'Notion or Trello'],
      estimatedHours: '10-14 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Platform Mechanics & Hook Mastery',
        focus: 'Deconstructing what makes social posts perform and mastering AI hook generation.',
        actionItems: [
          'Analyze 20 viral posts on LinkedIn and X; identify recurring hook archetypes (curiosity gap, contrary opinion, data reveal)',
          'Create a prompt template that generates 10 hook variations for any core idea',
          'Practice rewriting boring corporate statements into punchy conversational openings'
        ],
        deliverable: 'Hook Swipe File and Prompt Template tested across 5 distinct topics.'
      },
      {
        week: 2,
        title: 'Long-Form Content Atomization',
        focus: 'Extracting valuable insights from long transcripts and formatting them for bite-sized consumption.',
        actionItems: [
          'Take a public YouTube interview transcript and feed sections into Claude with clear extraction rules',
          'Produce 5 standalone LinkedIn posts focusing on a single actionable tip each',
          'Build an educational carousel slide deck outline'
        ],
        deliverable: 'Batch of 5 complete LinkedIn posts with formatting and call-to-actions.'
      },
      {
        week: 3,
        title: 'Multimedia & Short-Form Video Workflows',
        focus: 'Using AI video clipping tools and visual generators to create multimedia social assets.',
        actionItems: [
          'Test OpusClip or Descript to generate 2 short video clips with animated captions',
          'Design 3 carousel graphics in Canva using AI layout assistants',
          'Write companion captions for short-form video releases'
        ],
        deliverable: '2 captioned video shorts and 1 complete Canva carousel PDF.'
      },
      {
        week: 4,
        title: 'Calendar Architecture & Portfolio Showcase',
        focus: 'Assembling a complete 30-day social calendar and publishing a public case study.',
        actionItems: [
          'Organize all content into a public Notion editorial calendar with post status tags',
          'Write a brief process overview explaining how AI was utilized responsibly for efficiency',
          'Link the portfolio to your professional profile and reach out to 3 potential freelance clients or employers'
        ],
        deliverable: 'Interactive 30-day content calendar ready for review by prospective hiring managers.'
      }
    ],
    learningResources: [
      {
        title: 'Social Media Examiner: AI for Social Media Guide',
        type: 'Interactive Tutorial',
        provider: 'Social Media Examiner',
        description: 'Guides and podcasts on integrating AI into daily community and social management.',
        searchQuery: 'social media examiner ai marketing guide'
      },
      {
        title: 'Canva Design School: Social Media Mastery',
        type: 'Course',
        provider: 'Canva',
        description: 'Best practices for social asset dimensions, visual branding, and mobile readability.',
        searchQuery: 'canva design school social media graphic design'
      },
      {
        title: 'Buffer: The State of Social Media',
        type: 'Search Guide',
        provider: 'Buffer',
        description: 'Industry benchmark reports on engagement rates, optimal posting times, and format trends.',
        searchQuery: 'buffer state of social media benchmark report'
      }
    ],
    portfolioEvidence: 'A public Notion calendar showing 30 scheduled posts, visual carousel mockups, hook generation prompt logs, and 2 sample video snippets.',
    resumeInterviewPrep: [
      'Highlight efficiency and engagement: "Transformed monthly webinar series into 40+ multi-platform social assets, tripling organic impressions without increasing headcount."',
      'Demonstrate understanding of platform algorithms, audience retention, and community management ethics.',
      'Show your ability to write distinct hooks for diverse industries.'
    ],
    progressionPathways: [
      'Social Media Director',
      'Brand Engagement Lead',
      'Content Operations Manager',
      'Digital Community Strategist'
    ],
    limitationsAndPrerequisites: 'Requires constant awareness of cultural nuances and online trends; AI cannot judge real-time public sentiment without human guidance.',
    displayOrder: 3
  },

  // --------------------------------------------------------------------------
  // B. Business & Productivity
  // --------------------------------------------------------------------------
  {
    id: 'role-ai-business-ops-assistant',
    roleCode: 'ai_business_ops_assistant',
    categoryId: 'cat-business-ops',
    categoryCode: 'business_ops',
    categoryTitle: 'Business & Productivity',
    title: 'AI Business Operations Assistant',
    tagline: 'Streamlining internal documentation, meeting synthesis, SOP drafting, and operational reporting.',
    description: 'AI Business Operations Assistants help leadership and operations teams run smoothly by turning disorganized notes, transcripts, and operational data into clear Standard Operating Procedures (SOPs), executive briefing notes, and project status trackers.',
    typicalResponsibilities: [
      'Transform recorded team meetings and workshop transcripts into structured action items and decision logs',
      'Draft, update, and maintain comprehensive Standard Operating Procedures (SOPs) using company templates',
      'Summarize quarterly reports, vendor proposals, and client contracts into concise executive digests',
      'Create standardized project briefs and team update templates inside Notion, Asana, or ClickUp',
      'Identify recurring procedural bottlenecks and recommend AI-assisted workflow simplifications'
    ],
    requiredBeginnerSkills: [
      'Clear business communication and professional writing etiquette',
      'Strong organizational skills and attention to procedural detail',
      'Familiarity with cloud collaboration suites (Google Workspace, Microsoft 365, Notion)',
      'Prompting for structured data extraction and markdown table formatting'
    ],
    skillsToDevelopNext: [
      'Workflow mapping with Miro or Lucidchart',
      'Light automation of form submissions into task managers via Zapier or Make',
      'Knowledge management architecture inside Notion or Confluence',
      'Basic spreadsheet data modeling and dashboard creation'
    ],
    suggestedTools: {
      primary: ['Claude (Projects feature)', 'ChatGPT Plus', 'Notion AI', 'Otter.ai / Fireflies'],
      alternatives: ['Microsoft 365 Copilot', 'Google Gemini for Workspace', 'Coda AI', 'ClickUp AI']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No coding required. Requires structured thinking, business literacy, and documentation hygiene.',
    portfolioProject: {
      title: 'Company Operations Playbook & Meeting Synthesis System',
      scenario: 'A growing remote software consultancy lacks documented operational processes. Create an onboarding playbook and an executive meeting synthesis workflow.',
      deliverables: [
        'Comprehensive 5-part Standard Operating Procedure (SOP) for Client Project Onboarding',
        'Executive Meeting Digest template translating a 45-minute transcript into decisions, risks, and next steps',
        'Weekly Project Status Digest template ready for distribution to company leadership',
        'Prompt Library for internal team members to generate standardized meeting notes'
      ],
      completionCriteria: [
        'SOP is immediately actionable by an untrained employee without external guidance',
        'Meeting digest clearly distinguishes between firm decisions and ongoing discussions',
        'Includes a 1-page visual process flow map'
      ],
      toolsUsed: ['Claude or ChatGPT', 'Notion or Google Docs', 'Loom'],
      estimatedHours: '12-16 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Business Documentation & SOP Frameworks',
        focus: 'Mastering the anatomy of high-clarity SOPs, process checklists, and RACI matrices.',
        actionItems: [
          'Study standard business process templates and document structures',
          'Prompt an LLM with raw, rambling bullet points to organize into a professional SOP with prerequisites and step-by-step actions',
          'Create a reusable SOP generation prompt template with strict formatting guidelines'
        ],
        deliverable: 'Complete SOP draft for an everyday business task (e.g., employee offboarding).'
      },
      {
        week: 2,
        title: 'Meeting Transcription & Action Extraction',
        focus: 'Converting unstructured meeting transcripts into actionable executive summaries.',
        actionItems: [
          'Process an open-source meeting transcript (e.g., city council or tech all-hands) using Claude',
          'Extract: 1) Key Decisions Made, 2) Action Items with Owners, 3) Open Questions, 4) Deadlines',
          'Refine prompts to eliminate extraneous chit-chat and highlight business blockers'
        ],
        deliverable: 'Standardized Meeting Synthesis Template tested on two disparate meeting transcripts.'
      },
      {
        week: 3,
        title: 'Vendor Analysis & Proposal Summarization',
        focus: 'Comparing complex business documents and generating decision-ready comparative matrices.',
        actionItems: [
          'Ingest two hypothetical vendor software proposals (pricing, features, support terms)',
          'Prompt AI to build a markdown comparison table highlighting pros, cons, hidden fees, and risks',
          'Write a 1-page executive recommendation memo summarizing the choice'
        ],
        deliverable: 'Executive Vendor Evaluation Memo with comparative scoring matrix.'
      },
      {
        week: 4,
        title: 'Playbook Packaging & Presentation',
        focus: 'Consolidating operational templates into an interactive Notion knowledge workspace.',
        actionItems: [
          'Build a public Notion workspace housing the SOPs, meeting templates, and prompt cheat sheet',
          'Record a 3-minute video demonstrating how a team member uses the workspace to save 4 hours weekly',
          'Update resume to highlight operational efficiency, prompt engineering, and process documentation'
        ],
        deliverable: 'Interactive Notion Business Operations Playbook with video overview.'
      }
    ],
    learningResources: [
      {
        title: 'Process Street: The Ultimate Guide to SOPs',
        type: 'Documentation',
        provider: 'Process Street',
        description: 'Standard methodology for documenting business processes and operational checklists.',
        searchQuery: 'process street standard operating procedure writing guide'
      },
      {
        title: 'Google Project Management Certificate (Audit Free)',
        type: 'Course',
        provider: 'Coursera / Google',
        description: 'Fundamentals of project documentation, stakeholder communication, and workflow tracking.',
        searchQuery: 'google project management foundations coursera free audit'
      },
      {
        title: 'Notion Academy: Team Workspace Architecture',
        type: 'Interactive Tutorial',
        provider: 'Notion',
        description: 'Structuring connected databases, wikis, and SOP repositories for distributed teams.',
        searchQuery: 'notion academy workspace architecture databases wikis'
      }
    ],
    portfolioEvidence: 'A public Notion workspace containing a complete Operations Playbook, 3 SOPs, a meeting synthesis workflow, and a 3-minute video demonstration.',
    resumeInterviewPrep: [
      'Focus on business impact: "Architected AI-driven documentation workflow that reduced meeting-to-action-item turnaround from 24 hours to 15 minutes."',
      'Demonstrate discretion: discuss how you handle confidential corporate data, PII scrubbing, and enterprise AI privacy settings.',
      'Show competence in organizing chaotic information into clear, structured formats.'
    ],
    progressionPathways: [
      'Operations Manager',
      'Chief of Staff / Executive Operations Lead',
      'Business Process Consultant',
      'Program Manager'
    ],
    limitationsAndPrerequisites: 'Requires strong business maturity and confidentiality awareness; cannot blindly paste proprietary company secrets into public, non-enterprise AI models.',
    displayOrder: 4
  },
  {
    id: 'role-ai-research-assistant',
    roleCode: 'ai_research_assistant',
    categoryId: 'cat-business-ops',
    categoryCode: 'business_ops',
    categoryTitle: 'Business & Productivity',
    title: 'AI Research Assistant',
    tagline: 'Synthesizing market intelligence, regulatory filings, academic literature, and competitor benchmarking.',
    description: 'AI Research Assistants leverage specialized research engines and large context models to ingest whitepapers, customer interviews, and industry data, transforming hundreds of pages into crisp briefings, market landscape maps, and factual dossiers.',
    typicalResponsibilities: [
      'Conduct rapid literature reviews and market landscape sweeps using AI research engines',
      'Extract data points, statistics, and direct citations from complex PDF reports and annual filings',
      'Synthesize competitor product offerings, pricing tiers, and customer sentiment into benchmarking grids',
      'Draft annotated bibliographies and executive briefing decks on emerging industry trends',
      'Validate claims by cross-referencing AI outputs against primary sources and peer-reviewed journals'
    ],
    requiredBeginnerSkills: [
      'Critical thinking, source skepticism, and academic/business research fundamentals',
      'Ability to formulate precise research questions and Boolean search queries',
      'Familiarity with citation formats and research ethics',
      'Prompting models for deep synthesis, thematic analysis, and balanced perspectives'
    ],
    skillsToDevelopNext: [
      'Advanced document interrogation techniques using NotebookLM and vector document search',
      'Quantitative data validation and survey methodology',
      'Market sizing frameworks (TAM, SAM, SOM) with AI estimation assistance',
      'Data visualization of research findings (charts, graphs, timelines)'
    ],
    suggestedTools: {
      primary: ['Perplexity Pro', 'Google NotebookLM', 'Claude', 'Elicit / Consensus'],
      alternatives: ['ChatGPT Plus (Browse)', 'Scite.ai', 'Mendeley', 'Semantic Scholar']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No coding required. Requires deep curiosity, intellectual rigor, and disciplined citation habits.',
    portfolioProject: {
      title: 'Industry Intelligence Briefing & Competitor Dossier',
      scenario: 'An investment firm is evaluating the commercial drone delivery market. Produce an intelligence briefing covering market drivers, regulatory hurdles, top 5 competitors, and customer adoption barriers.',
      deliverables: [
        '10-page synthesized Market Intelligence Dossier with executive summary',
        'Competitor benchmarking matrix comparing 5 key players across technology, funding, and partnerships',
        'Regulatory analysis summarizing recent FAA/EU guidelines and their business implications',
        'Annotated Bibliography with 15 verified primary sources and DOI/URL references'
      ],
      completionCriteria: [
        'Every quantitative claim accompanied by a verifiable primary source citation',
        'Objective analysis highlighting conflicting viewpoints and market risks',
        'Clarity of executive summary allowing a decision-maker to grasp the landscape in 5 minutes'
      ],
      toolsUsed: ['Perplexity Pro / Elicit', 'NotebookLM', 'Google Docs / Slides'],
      estimatedHours: '14-18 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Deep Querying & AI Search Engine Mechanics',
        focus: 'Mastering AI research platforms (Perplexity, Elicit, Consensus) to discover hard-to-find academic and industry data.',
        actionItems: [
          'Formulate 5 complex business research hypotheses',
          'Execute targeted searches comparing Perplexity Pro, Google Scholar, and Consensus',
          'Evaluate how different tools handle citations and contradictory evidence'
        ],
        deliverable: 'Comparison analysis of 3 research engines with best-practice querying guide.'
      },
      {
        week: 2,
        title: 'Large-Document Interrogation with NotebookLM',
        focus: 'Ingesting multiple 50+ page PDFs into NotebookLM and Claude to extract cross-document insights.',
        actionItems: [
          'Upload 4 industry whitepapers into Google NotebookLM',
          'Prompt for thematic clustering, timeline reconstruction, and conflicting statistics',
          'Verify every generated quote against the original PDF page number'
        ],
        deliverable: 'Cross-document thematic synthesis memo with exact page citations.'
      },
      {
        week: 3,
        title: 'Competitor Benchmarking & Matrix Design',
        focus: 'Structuring competitive intelligence into clean, scannable comparative tables.',
        actionItems: [
          'Identify top 5 companies in a specific emerging technology niche',
          'Extract pricing models, target audiences, key differentiators, and weakness disclosures',
          'Synthesize into a multi-attribute matrix with strategic takeaways'
        ],
        deliverable: 'Comprehensive Competitor Comparison Matrix with strategic commentary.'
      },
      {
        week: 4,
        title: 'Executive Briefing & Portfolio Publication',
        focus: 'Refining the full report into a polished executive briefing document and presentation.',
        actionItems: [
          'Format the comprehensive report with executive summary, tables, and bibliography',
          'Design an accompanying 6-slide executive deck summarizing core findings',
          'Publish case study to an online portfolio with a discussion of research methodology'
        ],
        deliverable: 'Polished Market Intelligence Dossier and 6-slide presentation deck.'
      }
    ],
    learningResources: [
      {
        title: 'Purdue OWL: Research and Citation Resources',
        type: 'Documentation',
        provider: 'Purdue University',
        description: 'Authoritative guide to primary vs. secondary sources, citation rigor, and academic standards.',
        searchQuery: 'purdue owl conducting research evaluating sources citation'
      },
      {
        title: 'Google NotebookLM Comprehensive Guide',
        type: 'Interactive Tutorial',
        provider: 'Google Labs',
        description: 'Official workflows for grounding AI on your personal notes and uploaded source documents.',
        searchQuery: 'google notebooklm documentation tutorial workflows'
      },
      {
        title: 'Coursera: Critical Thinking in the Information Age',
        type: 'Course',
        provider: 'University of Michigan / Coursera',
        description: 'Techniques for identifying cognitive bias, validating claims, and evaluating data credibility.',
        searchQuery: 'critical thinking information age university of michigan coursera'
      }
    ],
    portfolioEvidence: 'A 10-page market intelligence report with complete citations, accompanied by a competitor matrix and a slide deck summarizing strategic findings.',
    resumeInterviewPrep: [
      'Stress rigor and accuracy: "Conducted AI-assisted market landscape analysis covering 40+ industry papers, reducing research phase from 3 weeks to 4 days with zero citation errors."',
      'Prepare to walk through your source verification workflow and how you detect outdated or biased datasets.',
      'Demonstrate how you format findings for executive audiences who only have 2 minutes to read.'
    ],
    progressionPathways: [
      'Market Intelligence Lead',
      'Strategy & Corporate Development Analyst',
      'Senior Research Consultant',
      'Competitive Intelligence Director'
    ],
    limitationsAndPrerequisites: 'Requires patience and methodical scrutiny; using AI for research without checking original citations leads to severe credibility failures.',
    displayOrder: 5
  },
  {
    id: 'role-ai-productivity-specialist',
    roleCode: 'ai_productivity_specialist',
    categoryId: 'cat-business-ops',
    categoryCode: 'business_ops',
    categoryTitle: 'Business & Productivity',
    title: 'AI Productivity Specialist',
    tagline: 'Auditing personal and team time sinks, implementing AI shortcuts, and teaching daily efficiency.',
    description: 'AI Productivity Specialists diagnose daily operational friction in knowledge workers’ routines, then design custom AI assistants, browser automations, keyboard snippets, and personal operating systems that save 5 to 10 hours weekly.',
    typicalResponsibilities: [
      'Conduct 1-on-1 workflow audits to map daily repetitive tasks, email burdens, and scheduling bottlenecks',
      'Configure custom GPTs, Claude artifacts, and system prompts tailored to specific worker roles',
      'Set up voice-to-text dictation and real-time audio memo processing workflows (Wispr Flow, AudioPen)',
      'Design personal knowledge management dashboards that automatically organize notes and tasks',
      'Deliver practical workshops on prompt shortcuts and day-to-day generative AI productivity hacks'
    ],
    requiredBeginnerSkills: [
      'Empathy and active listening to understand user frustration with technology',
      'High personal productivity habits (time blocking, task triage, inbox zero principles)',
      'Proficiency with modern productivity tools (Raycast, Notion, Obsidian, Todoist)',
      'Creating clear, user-friendly prompt cheat sheets for non-technical peers'
    ],
    skillsToDevelopNext: [
      'System-level shortcuts (Apple Shortcuts, Raycast extensions, Windows PowerToys)',
      'Basic webhook connections between personal apps via Zapier or Make',
      'Advanced personal knowledge management (PKM) with vector embeddings and local LLMs',
      'Designing behavioral change and habit-formation coaching programs'
    ],
    suggestedTools: {
      primary: ['Raycast / Alfred', 'Claude Projects', 'Wispr Flow / AudioPen', 'Notion AI'],
      alternatives: ['TextExpander', 'Superhuman AI', 'Obsidian + Smart Connections', 'ChatGPT Custom GPTs']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No coding required. Relies on desktop power tools, browser extensions, and workflow optimization principles.',
    portfolioProject: {
      title: 'Individual Productivity Transformation & System Blueprint',
      scenario: 'A freelance consultant spends 15 hours a week on client admin, calendar back-and-forth, meeting notes, and email triage. Build a personalized AI Productivity Stack to reclaim 8 hours weekly.',
      deliverables: [
        'Time Audit & Bottleneck Analysis report detailing where the 15 hours were spent',
        'Custom AI Assistant Suite: 3 tailored system prompts (Email Triage, Proposal Drafter, Meeting Debriefer)',
        'Voice-to-Task Pipeline setup guide converting rambling voice notes into structured tasks',
        '1-Page Daily Productivity Operating Manual with keyboard shortcuts and prompt triggers'
      ],
      completionCriteria: [
        'Measurable reduction in task completion time demonstrated across 3 core workflows',
        'Templates require no more than 2 clicks or keyboard shortcuts to activate',
        'Includes user feedback documentation or self-tested time-study metrics'
      ],
      toolsUsed: ['Raycast or TextExpander', 'Claude / ChatGPT', 'Wispr Flow or AudioPen', 'Notion'],
      estimatedHours: '8-12 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Time Auditing & Friction Mapping',
        focus: 'Identifying high-frequency, low-cognitive-load tasks ripe for AI delegation.',
        actionItems: [
          'Track personal or peer work activities for 3 days using a time-logging sheet',
          'Categorize activities into: Drafting, Summarizing, Formatting, Scheduling, and Communicating',
          'Select the top 3 highest-friction workflows for automation'
        ],
        deliverable: 'Friction Audit Matrix quantifying time spent and automation potential.'
      },
      {
        week: 2,
        title: 'System Prompts & Desktop Quick-Launchers',
        focus: 'Configuring instant desktop access to tailored AI prompts via Raycast, Alfred, or browser shortcuts.',
        actionItems: [
          'Install Raycast or an equivalent desktop shortcut manager',
          'Create 5 quick-launch AI snippets: Email Polisher, Grammar Simplifier, Meeting Action Extractor',
          'Test shortcut speed: trigger prompts in under 3 seconds from anywhere on the desktop'
        ],
        deliverable: 'Set of 5 tested desktop AI snippet triggers with documentation.'
      },
      {
        week: 3,
        title: 'Voice-First Workflow & Note Processing',
        focus: 'Mastering voice dictation and automated note restructuring for high-speed drafting.',
        actionItems: [
          'Experiment with Wispr Flow, AudioPen, or ChatGPT Voice mode',
          'Practice talking through a complex idea for 3 minutes and prompting the AI to output an executive summary',
          'Set up a template that routes audio summaries into a central task list'
        ],
        deliverable: 'Voice-to-Document Workflow Guide with sample audio and converted deliverables.'
      },
      {
        week: 4,
        title: 'System Blueprint & Client Case Study',
        focus: 'Synthesizing the entire setup into a replicable consulting blueprint and marketing it.',
        actionItems: [
          'Assemble the setup into a clean Notion "Personal AI OS" template',
          'Record a 4-minute screen share showing the before/after speed comparison',
          'Publish a LinkedIn post detailing how the system saves 8 hours each week'
        ],
        deliverable: 'Public Personal AI OS Template and video demonstration walkthrough.'
      }
    ],
    learningResources: [
      {
        title: 'Ali Abdaal: Productivity Masterclass & Systems',
        type: 'Course',
        provider: 'Skillshare / YouTube',
        description: 'Foundations of personal workflow architecture, time audits, and friction reduction.',
        searchQuery: 'ali abdaal productivity systems time management friction'
      },
      {
        title: 'Raycast Manual: AI Quick-Prompts & Extensions',
        type: 'Documentation',
        provider: 'Raycast',
        description: 'Official guide to setting up custom AI commands and system shortcuts on desktop.',
        searchQuery: 'raycast documentation custom ai commands prompt extensions'
      },
      {
        title: 'Tiago Forte: Building a Second Brain Overview',
        type: 'Search Guide',
        provider: 'Forte Labs',
        description: 'Principles for capturing, organizing, distilling, and expressing knowledge with digital tools.',
        searchQuery: 'tiago forte building a second brain code method summary'
      }
    ],
    portfolioEvidence: 'A public Notion "Personal AI OS" guide with video walkthrough, time audit logs, and downloadable Raycast/browser prompt snippets.',
    resumeInterviewPrep: [
      'Quantify results: "Designed and rolled out personal AI workflow system across 12-person department, saving an average of 6.5 hours per employee per week."',
      'Demonstrate user empathy: explain how you overcome tech hesitation in non-technical colleagues.',
      'Show that you prioritize simple, reliable tools over fragile, over-complicated automations.'
    ],
    progressionPathways: [
      'Workplace Technology Consultant',
      'Operations Enablement Lead',
      'Director of Organizational Productivity',
      'Executive Coach & Workflow Architect'
    ],
    limitationsAndPrerequisites: 'Requires genuine curiosity about human behavior and patience; tools alone fail if people are unwilling to adjust their personal habits.',
    displayOrder: 6
  },

  // --------------------------------------------------------------------------
  // C. Automation & Tools
  // --------------------------------------------------------------------------
  {
    id: 'role-no-code-automation-specialist',
    roleCode: 'no_code_automation_specialist',
    categoryId: 'cat-automation-tools',
    categoryCode: 'automation_tools',
    categoryTitle: 'Automation & Tools',
    title: 'No-Code Automation Specialist',
    tagline: 'Connecting business software, routing webhooks, and embedding AI reasoning into automated pipelines.',
    description: 'No-Code Automation Specialists build resilient, automated workflows connecting CRM systems, form builders, email services, and databases using visual platforms like Zapier, Make, and Airtable, with AI steps for classification and drafting.',
    typicalResponsibilities: [
      'Design, build, and debug multi-step automations across cloud apps using Make (Integromat) and Zapier',
      'Embed LLM API modules to classify incoming emails, score leads, and extract structured JSON data',
      'Build relational database schemas and automated views inside Airtable or Notion',
      'Implement error handling, router fallbacks, and alert notifications for broken webhooks',
      'Document workflow logic and maintain API quota budgets across connected services'
    ],
    requiredBeginnerSkills: [
      'Understanding fundamental data types (strings, integers, booleans, arrays, key-value objects)',
      'Basic concept of HTTP requests, triggers, actions, and webhooks',
      'Logical problem-solving and systematic troubleshooting skills',
      'Prompting LLMs to return strict, parseable JSON output'
    ],
    skillsToDevelopNext: [
      'Regular expressions (Regex) for text extraction and data cleanup',
      'Basic JavaScript/Python snippets inside automation code steps',
      'Advanced API authentication (OAuth 2.0, API keys, bearer tokens)',
      'Database normalization and automated backup architecture'
    ],
    suggestedTools: {
      primary: ['Make.com', 'Zapier', 'Airtable', 'OpenAI API / Claude API'],
      alternatives: ['n8n', 'Relay.app', 'SmartSuite', 'Google Apps Script']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No formal coding required. Uses visual flow builders. Basic familiarity with JSON structure and logic statements (IF/THEN) is helpful.',
    portfolioProject: {
      title: 'Automated AI Customer Inquiry Triage & Routing System',
      scenario: 'A real estate agency receives 50+ inquiries daily via website forms, emails, and WhatsApp. Build an automated Make/Zapier workflow that classifies intent, scores urgency, and drafts personalized replies.',
      deliverables: [
        'Multi-branch Make.com or Zapier workflow with error handling paths',
        'Structured Airtable CRM schema tracking leads, sentiment, category, and response status',
        'OpenAI prompt module that parses unstructured message text into strict JSON output',
        'Automated Slack/Email alert notification sent to the responsible agent based on inquiry urgency'
      ],
      completionCriteria: [
        'Zero failure rate on test batch of 10 diverse simulated inquiries (including edge cases)',
        'AI classification correctly distinguishes between buyers, sellers, renters, and spam',
        'Complete workflow documentation including architecture diagram and data dictionary'
      ],
      toolsUsed: ['Make.com or Zapier', 'Airtable', 'OpenAI / Claude API', 'Slack'],
      estimatedHours: '14-18 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Core Automation Mechanics & Webhooks',
        focus: 'Mastering triggers, actions, webhooks, and data mappings in Make.com or Zapier.',
        actionItems: [
          'Create a free Make.com account and complete their foundational academy courses',
          'Build a basic 3-step automation: Google Forms submission -> Airtable record creation -> Slack alert',
          'Learn to inspect execution history bundles and troubleshoot variable mapping errors'
        ],
        deliverable: 'Working 3-step automated form routing pipeline with test execution logs.'
      },
      {
        week: 2,
        title: 'Integrating AI Modules & JSON Structuring',
        focus: 'Calling OpenAI/Claude within automations and enforcing strict structured JSON responses.',
        actionItems: [
          'Add an OpenAI module to your Make scenario to analyze input text',
          'Write a system prompt with JSON schema constraints (Sentiment, Urgency, Category, DraftResponse)',
          'Parse the JSON response and route records into different Airtable tables based on category'
        ],
        deliverable: 'AI-augmented automation scenario with JSON parsing and conditional routing.'
      },
      {
        week: 3,
        title: 'Error Handling, Routers & Fallbacks',
        focus: 'Making automations enterprise-grade with error handlers, rate limits, and fallback paths.',
        actionItems: [
          'Implement Make.com error directives (Resume, Ignore, Rollback, Commit)',
          'Build a catch-all notification branch that alerts you if an API call fails or times out',
          'Test the workflow against malformed inputs (empty fields, huge text blobs, foreign languages)'
        ],
        deliverable: 'Resilient multi-branch automation pipeline with documented error handling rules.'
      },
      {
        week: 4,
        title: 'System Documentation & Client Handoff Kit',
        focus: 'Packaging the project with architectural diagrams, user instructions, and a portfolio case study.',
        actionItems: [
          'Draw a clean flow diagram using Lucidchart or Miro showing all triggers and branches',
          'Record a 4-minute Loom video demonstrating live execution with test data',
          'Publish the project to your portfolio or GitHub/Notion documentation repository'
        ],
        deliverable: 'Public case study with architectural diagram, Loom walkthrough, and downloadable blueprint.'
      }
    ],
    learningResources: [
      {
        title: 'Make Academy: Foundation & Advanced Tracks',
        type: 'Interactive Tutorial',
        provider: 'Make.com',
        description: 'Official free certification covering scenarios, routers, data structures, and error handling.',
        searchQuery: 'make com academy foundational certification courses'
      },
      {
        title: 'Zapier University: Building Intelligent Automations',
        type: 'Course',
        provider: 'Zapier',
        description: 'Step-by-step guides for connecting business applications and using Zapier Central / AI.',
        searchQuery: 'zapier university course automation fundamentals free'
      },
      {
        title: 'Airtable Guides: Relational Database Architecture',
        type: 'Documentation',
        provider: 'Airtable',
        description: 'Foundations of tables, primary keys, linked records, lookups, and formula fields.',
        searchQuery: 'airtable guide relational database design linked records formulas'
      }
    ],
    portfolioEvidence: 'A Make.com scenario blueprint export, an Airtable base template, a Lucidchart architecture diagram, and a 4-minute video demonstrating end-to-end execution.',
    resumeInterviewPrep: [
      'Emphasize stability and scale: "Built autonomous lead-routing pipeline processing 1,200+ monthly inquiries with 99.4% uptime and zero lost records."',
      'Demonstrate understanding of API costs, token consumption, and rate-limiting strategies.',
      'Show your approach to error recovery and preventing infinite execution loops.'
    ],
    progressionPathways: [
      'Lead Automation Engineer',
      'RevOps (Revenue Operations) Specialist',
      'Solutions Architect',
      'Digital Transformation Consultant'
    ],
    limitationsAndPrerequisites: 'Requires patience for debugging broken connections; third-party software updates can occasionally change API schemas or disconnect tokens.',
    displayOrder: 7
  },
  {
    id: 'role-ai-chatbot-builder',
    roleCode: 'ai_chatbot_builder',
    categoryId: 'cat-automation-tools',
    categoryCode: 'automation_tools',
    categoryTitle: 'Automation & Tools',
    title: 'AI Chatbot Builder',
    tagline: 'Designing conversational flows, grounding bots on company knowledge bases, and deploying web agents.',
    description: 'AI Chatbot Builders design, build, test, and maintain interactive conversational agents for customer support, lead qualification, and internal company assistance using platforms like Voiceflow, Botpress, and custom assistant frameworks.',
    typicalResponsibilities: [
      'Design conversational dialogue trees, fallback logic, and personality guidelines for chat agents',
      'Upload, index, and organize company documentation, FAQs, and product manuals into knowledge bases',
      'Set up intent recognition, variable collection (name, email, order ID), and human escalation handoffs',
      'Integrate chatbots with external APIs to query order status, book calendar appointments, or log tickets',
      'Analyze conversation transcripts to patch knowledge gaps and improve resolution rates'
    ],
    requiredBeginnerSkills: [
      'Conversational design principles (concise messages, quick-reply chips, polite clarification prompts)',
      'Basic knowledge of Retrieval-Augmented Generation (RAG) concepts (chunks, embeddings, grounding)',
      'Flowchart logic (decision nodes, loops, conditional branching)',
      'Writing empathetic, brand-aligned system prompts'
    ],
    skillsToDevelopNext: [
      'Custom API webhooks (POST/GET) within chatbot nodes to fetch dynamic real-time data',
      'Voice bot design and telephony integration (Twilio, Vapi, Bland AI)',
      'Multi-channel deployment (WhatsApp, Messenger, website widget, Slack)',
      'Advanced RAG evaluation metrics (groundedness, context relevance, answer relevance)'
    ],
    suggestedTools: {
      primary: ['Voiceflow', 'Botpress', 'OpenAI Assistants API', 'Stack AI'],
      alternatives: ['Tidio Lyro', 'Chatbase', 'ManyChat', 'Flowise']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No coding required for standard implementations. JavaScript snippets are optional for advanced custom logic.',
    portfolioProject: {
      title: 'Full-Service E-Commerce AI Support & Recommendation Chatbot',
      scenario: 'An online eco-friendly apparel retailer needs a 24/7 web assistant that answers shipping policies, recommends products based on user style preferences, and seamlessly escalates to human agents when needed.',
      deliverables: [
        'Interactive Voiceflow or Botpress project with visual flow canvas',
        'Structured Knowledge Base containing 20 product descriptions, sizing tables, and return policies',
        'Lead capture node storing customer email and product preference into a CRM/Google Sheet',
        'Human handoff protocol triggering an email notification when user requests human support'
      ],
      completionCriteria: [
        'Zero hallucinated policies: bot strictly cites uploaded store documents',
        'Smooth conversational recovery when faced with out-of-scope or hostile queries',
        'Live testable prototype link that can be shared in a web browser'
      ],
      toolsUsed: ['Voiceflow or Botpress', 'Google Sheets / Webhook', 'Notion for documentation'],
      estimatedHours: '12-16 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Conversational Design & Flow Basics',
        focus: 'Learning Voiceflow/Botpress interface, intent design, and dialogue state management.',
        actionItems: [
          'Create a free Voiceflow account and build a 4-step branching greeting bot',
          'Implement quick-reply choice cards and user variable captures (Name, Email, Issue Type)',
          'Test fallback triggers when user types unrecognized input'
        ],
        deliverable: 'Simple interactive greeting and information-gathering bot prototype.'
      },
      {
        week: 2,
        title: 'Knowledge Base Grounding & RAG Integration',
        focus: 'Uploading documents, managing chunking, and testing retrieval accuracy.',
        actionItems: [
          'Curate a 5-page markdown knowledge document covering mock store policies and products',
          'Upload into the bot platform’s Knowledge Base and configure system prompt constraints',
          'Run 15 benchmark questions testing for accurate retrieval and refusal of out-of-bounds queries'
        ],
        deliverable: 'Knowledge-grounded chatbot answering specific store questions accurately.'
      },
      {
        week: 3,
        title: 'External API Actions & Lead Storage',
        focus: 'Connecting the bot to external systems via API calls (storing leads or checking dummy orders).',
        actionItems: [
          'Add an API step in Voiceflow sending collected lead variables to a webhook or Google Sheet',
          'Simulate a mock order-status lookup using a static JSON endpoint or Airtable',
          'Configure a graceful "Escalate to Human Specialist" message card'
        ],
        deliverable: 'Bot with active external data write capability and human handoff path.'
      },
      {
        week: 4,
        title: 'Transcript Analytics & Portfolio Publishing',
        focus: 'Auditing conversation logs, optimizing weak nodes, and embedding on a live portfolio page.',
        actionItems: [
          'Share prototype with 3 peers and analyze transcript failure points',
          'Patch gaps in documentation and fine-tune system prompt tone',
          'Embed the chat widget on a public web page and record a 3-minute video walkthrough'
        ],
        deliverable: 'Live testable chatbot widget embedded on a portfolio page with video review.'
      }
    ],
    learningResources: [
      {
        title: 'Voiceflow University: Conversational AI Certification',
        type: 'Interactive Tutorial',
        provider: 'Voiceflow',
        description: 'Complete video course on canvas architecture, variables, components, and KB integration.',
        searchQuery: 'voiceflow university conversational ai design course free'
      },
      {
        title: 'Botpress Open Documentation & Community',
        type: 'Documentation',
        provider: 'Botpress',
        description: 'Guides on autonomous nodes, natural language understanding, and webhooks.',
        searchQuery: 'botpress cloud documentation getting started tutorial'
      },
      {
        title: 'Google Conversation Design Guidelines',
        type: 'Search Guide',
        provider: 'Google Design',
        description: 'Foundations of conversational etiquette, error handling, and persona development.',
        searchQuery: 'google conversation design guidelines principles'
      }
    ],
    portfolioEvidence: 'A shareable Voiceflow/Botpress interactive web link, a flow diagram screenshot, an export of the prompt and knowledge base, and a video walkthrough.',
    resumeInterviewPrep: [
      'Focus on containment and satisfaction: "Constructed knowledge-grounded support bot that handled 65% of routine tier-1 questions without human intervention."',
      'Demonstrate understanding of hallucination risks and prompt guarding techniques.',
      'Show that you know how to build human escalation protocols for delicate edge cases.'
    ],
    progressionPathways: [
      'Conversational AI Architect',
      'AI Product Manager (Virtual Agents)',
      'CX Automation Lead',
      'Enterprise Chatbot Consultant'
    ],
    limitationsAndPrerequisites: 'Chatbots can frustrate users if forced to answer questions beyond their knowledge base; building clean escalation pathways is mandatory.',
    displayOrder: 8
  },
  {
    id: 'role-ai-workflow-specialist',
    roleCode: 'ai_workflow_specialist',
    categoryId: 'cat-automation-tools',
    categoryCode: 'automation_tools',
    categoryTitle: 'Automation & Tools',
    title: 'AI Workflow Specialist',
    tagline: 'Diagnosing organizational process friction, restructuring handoffs, and integrating AI micro-tools.',
    description: 'AI Workflow Specialists look at complex enterprise business processes—like recruitment screening, client onboarding, or contract approvals—and re-engineer them end-to-end using a hybrid of modern SaaS, AI summarization, and task automation.',
    typicalResponsibilities: [
      'Conduct value-stream mapping workshops to visually chart how work moves across departments',
      'Identify handoff delays, duplicate data entry, and manual approval bottlenecks',
      'Select and integrate best-of-breed AI micro-tools into existing company software suites',
      'Build pilot workflows and track cycle-time reduction before enterprise-wide rollout',
      'Provide change management documentation and training sessions for affected teams'
    ],
    requiredBeginnerSkills: [
      'Systems thinking and end-to-end business process visualization',
      'Strong interview and stakeholder consultation skills',
      'Familiarity with enterprise software ecosystems (Slack, Microsoft Teams, Salesforce, Jira)',
      'Basic automation flow logic (triggers, conditions, notifications)'
    ],
    skillsToDevelopNext: [
      'Lean Six Sigma / Business Process Modeling Notation (BPMN 2.0)',
      'Enterprise security, data governance, and SOC2 compliance considerations',
      'Advanced iPaaS solutions (Workato, Tray.io, n8n)',
      'Cost-benefit financial modeling for technology investments'
    ],
    suggestedTools: {
      primary: ['Miro / Lucidchart', 'Make.com / Zapier', 'Notion / Coda', 'Claude Projects'],
      alternatives: ['n8n', 'Smartsheet', 'Microsoft Power Automate', 'Airslate']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No coding required. Success centers on analytical systems thinking, stakeholder alignment, and tool configuration.',
    portfolioProject: {
      title: 'End-to-End Candidate Recruitment & Onboarding Workflow Redesign',
      scenario: 'A high-growth 100-person tech firm takes 38 days on average to hire and onboard engineers, losing top talent due to slow resume screening and delayed interviewer feedback.',
      deliverables: [
        'Before-and-After Process Architecture Map (BPMN format in Miro/Lucidchart)',
        'AI-Assisted Resume Anonymization & Skills Extraction specification sheet',
        'Automated Interviewer Reminder and Synthesis pipeline blueprint',
        'Quantified ROI model estimating days saved and recruiter capacity gained'
      ],
      completionCriteria: [
        'Clear identification of at least 3 high-friction manual bottlenecks eliminated',
        'Includes privacy and bias mitigation guidelines for resume handling',
        'Executive presentation deck explaining the rollout strategy to leadership'
      ],
      toolsUsed: ['Miro / Lucidchart', 'Google Slides', 'Make / Zapier', 'Claude'],
      estimatedHours: '14-18 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Process Mapping & Friction Identification',
        focus: 'Learning value-stream mapping, swimlane diagrams, and bottleneck identification.',
        actionItems: [
          'Study standard BPMN flow notation (events, activities, gateways, flows)',
          'Chart an existing convoluted process (e.g., procurement approval) in Miro',
          'Calculate cycle time, wait time, and touch time across all steps'
        ],
        deliverable: 'Current-State Swimlane Map identifying 3 critical operational bottlenecks.'
      },
      {
        week: 2,
        title: 'Future-State Workflow Design with AI Integration',
        focus: 'Designing an optimized workflow that injects AI at high-leverage decision and summarization points.',
        actionItems: [
          'Design the Future-State map eliminating duplicate manual data entry',
          'Specify exact AI interventions (e.g., auto-summarizing candidate scorecards into a 1-page digest)',
          'Ensure human-in-the-loop validation for all critical approval gates'
        ],
        deliverable: 'Future-State Workflow Architecture diagram with explicit AI integration touchpoints.'
      },
      {
        week: 3,
        title: 'Prototype Implementation & Automation Proof-of-Concept',
        focus: 'Building a working proof-of-concept for the most painful single step using no-code tools.',
        actionItems: [
          'Build a working Make.com scenario that ingests sample data, runs AI analysis, and posts to Slack',
          'Test with 10 varied inputs to verify speed, data fidelity, and notification triggers',
          'Document technical dependencies and API consumption costs'
        ],
        deliverable: 'Functional proof-of-concept automation with documented performance metrics.'
      },
      {
        week: 4,
        title: 'Executive Business Case & Presentation',
        focus: 'Synthesizing the project into an executive pitch deck and portfolio case study.',
        actionItems: [
          'Build a 6-slide executive deck highlighting projected time saved and implementation risk mitigation',
          'Record a 4-minute presentation explaining the business case as if presenting to a COO',
          'Publish case study to personal website or LinkedIn'
        ],
        deliverable: 'Comprehensive Workflow Redesign Case Study and executive presentation deck.'
      }
    ],
    learningResources: [
      {
        title: 'Miro Academy: Process Mapping & Continuous Improvement',
        type: 'Interactive Tutorial',
        provider: 'Miro',
        description: 'Visual techniques for mapping workflows, swimlanes, and cross-functional handoffs.',
        searchQuery: 'miro academy process mapping workflow design tutorial'
      },
      {
        title: 'Coursera: Business Process Management (Audit Free)',
        type: 'Course',
        provider: 'Queensland University / Coursera',
        description: 'Academic foundations of business process identification, redesign, and automation.',
        searchQuery: 'business process management coursera fundamentals free audit'
      },
      {
        title: 'Lucidchart BPMN 2.0 Complete Guide',
        type: 'Documentation',
        provider: 'Lucid Software',
        description: 'Standardized symbol guide for professional enterprise process modeling.',
        searchQuery: 'lucidchart bpmn 2 guide symbols standard notation'
      }
    ],
    portfolioEvidence: 'A detailed before-and-after Miro/Lucidchart diagram, a proof-of-concept automation walkthrough video, and an executive ROI presentation deck.',
    resumeInterviewPrep: [
      'Focus on business efficiency: "Re-engineered client onboarding workflow across 4 departments, cutting cycle time by 42% and eliminating 12 hours of weekly manual data entry."',
      'Demonstrate understanding of human change management and team resistance to new tools.',
      'Show your ability to balance automation speed with corporate compliance and governance.'
    ],
    progressionPathways: [
      'Director of Business Architecture',
      'Head of Operational Excellence',
      'Enterprise Transformation Consultant',
      'Chief Operating Officer (COO)'
    ],
    limitationsAndPrerequisites: 'Requires strong stakeholder management skills; re-engineering workflows without winning buy-in from front-line workers leads to process abandonment.',
    displayOrder: 9
  },

  // --------------------------------------------------------------------------
  // D. People & Education
  // --------------------------------------------------------------------------
  {
    id: 'role-ai-trainer',
    roleCode: 'ai_trainer',
    categoryId: 'cat-people-edu',
    categoryCode: 'people_edu',
    categoryTitle: 'People & Education',
    title: 'AI Trainer',
    tagline: 'Upskilling professionals on generative AI tools, prompt crafting, ethical guidelines, and daily adoption.',
    description: 'AI Trainers create and deliver hands-on workshops, webinars, and interactive exercises that teach professionals—from marketers to legal teams—how to safely, effectively, and confidently incorporate generative AI into their specific daily job functions.',
    typicalResponsibilities: [
      'Design tailored training curriculum and practical prompt labs for specific corporate departments',
      'Deliver engaging live workshops (in-person and remote) breaking down AI concepts into plain language',
      'Develop department-specific prompt cheat sheets, template packs, and safety checklists',
      'Address AI anxiety, demystify misconceptions, and teach responsible AI ethics and privacy policies',
      'Evaluate participant learning outcomes through pre- and post-training skill assessments'
    ],
    requiredBeginnerSkills: [
      'Exceptional public speaking, workshop facilitation, and empathetic teaching abilities',
      'Ability to explain complex technical concepts using intuitive real-world analogies',
      'Deep hands-on familiarity with consumer AI tools (ChatGPT, Claude, Gemini, Perplexity)',
      'Patience and active listening when addressing learners of differing technical backgrounds'
    ],
    skillsToDevelopNext: [
      'Instructional design models (ADDIE, Bloom’s Taxonomy for AI prompt skills)',
      'Designing gamified prompt competitions ("Prompt Battles" and hackathons)',
      'Developing asynchronous micro-learning video modules',
      'Measuring corporate training ROI and long-term behavioral change metrics'
    ],
    suggestedTools: {
      primary: ['ChatGPT Plus', 'Claude', 'Loom / Zoom', 'Canva / Google Slides'],
      alternatives: ['Mentimeter / Slido', 'Kahoot', 'Miro', 'Gamma App']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No coding required. Requires superb communication, educational empathy, and pedagogical structuring.',
    portfolioProject: {
      title: 'Departmental Generative AI Upskilling Workshop & Prompt Lab Kit',
      scenario: 'A mid-sized advertising agency with 40 employees wants a half-day interactive workshop to train their account managers and copywriters on using Claude and Midjourney safely and effectively.',
      deliverables: [
        'Complete 3-hour Workshop Curriculum & Facilitator Guide with timed lesson plans',
        '30-Slide Interactive Presentation Deck with live exercise prompts and group discussion hooks',
        'Hands-On Prompt Lab Workbook: 5 progressive department-specific exercises with solution keys',
        '1-Page "Responsible AI & Company Privacy Guidelines" reference sheet for participants'
      ],
      completionCriteria: [
        'Exercises move logically from foundational prompting to advanced few-shot workflows',
        'Includes pre- and post-workshop evaluation survey to measure skill acquisition',
        'Clear, plain-language explanations with zero confusing technical jargon'
      ],
      toolsUsed: ['Google Slides or Canva', 'Google Docs', 'Loom for mock facilitator session'],
      estimatedHours: '12-16 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Pedagogical Foundations & Curriculum Design',
        focus: 'Structuring adult learning experiences and translating AI capabilities into relatable competencies.',
        actionItems: [
          'Study adult learning theory (andragogy) and hands-on workshop design frameworks',
          'Identify the 5 biggest stumbling blocks beginners face when opening ChatGPT or Claude',
          'Outline a modular 3-hour curriculum: Foundations -> Hands-On Lab -> Ethics & Privacy'
        ],
        deliverable: 'Comprehensive 3-Hour Workshop Syllabus with learning objectives.'
      },
      {
        week: 2,
        title: 'Interactive Exercise & Prompt Lab Creation',
        focus: 'Developing engaging, practical exercises where participants immediately see tangible value.',
        actionItems: [
          'Design 5 hands-on challenges: Bad Prompt vs. Great Prompt rewrite, persona framing, data extraction',
          'Create a participant workbook with fill-in-the-blank prompt templates and sample outputs',
          'Develop a scoring rubric to help participants self-evaluate their prompt quality'
        ],
        deliverable: 'Participant Prompt Lab Workbook with 5 interactive exercises and answer keys.'
      },
      {
        week: 3,
        title: 'Slide Deck & Interactive Facilitation Elements',
        focus: 'Designing dynamic presentation visuals, audience polls, and discussion questions.',
        actionItems: [
          'Build a 30-slide presentation in Canva or Google Slides with clean visual hierarchy',
          'Incorporate interactive polling questions using Mentimeter or Slido concepts',
          'Draft a facilitator script with timing cues, speaker notes, and transition stories'
        ],
        deliverable: '30-slide presentation deck with comprehensive speaker notes and timing guide.'
      },
      {
        week: 4,
        title: 'Mock Delivery & Facilitator Showcase Video',
        focus: 'Recording a live teaching sample to demonstrate facilitation stage presence and clarity.',
        actionItems: [
          'Record a 5-minute video delivering one module of the workshop (e.g., explaining few-shot prompting)',
          'Assemble curriculum, workbook, slides, and video into a public portfolio page',
          'Share workshop materials on LinkedIn and offer a free mini-session to a non-profit or peer group'
        ],
        deliverable: 'Public portfolio page featuring curriculum kit and 5-minute facilitation video sample.'
      }
    ],
    learningResources: [
      {
        title: 'IDOL Courses: Instructional Design Fundamentals',
        type: 'Interactive Tutorial',
        provider: 'IDOL Academy',
        description: 'Guides on creating engaging adult training materials, learning objectives, and workbooks.',
        searchQuery: 'instructional design adult learning theory basics workshop design'
      },
      {
        title: 'Vanderbilt University: Prompt Engineering for ChatGPT',
        type: 'Course',
        provider: 'Coursera / Vanderbilt',
        description: 'Academic curriculum breaking down prompt patterns into teachable frameworks.',
        searchQuery: 'prompt engineering for chatgpt vanderbilt coursera audit free'
      },
      {
        title: 'Facilitator School: Interactive Workshop Design',
        type: 'Search Guide',
        provider: 'Facilitator School',
        description: 'Best practices for keeping virtual and in-person workshop attendees engaged.',
        searchQuery: 'interactive workshop facilitation techniques engagement exercises'
      }
    ],
    portfolioEvidence: 'A public Notion or website kit containing a full 30-slide deck, a participant workbook PDF, a 5-minute video of you teaching a prompt lesson, and an evaluation rubric.',
    resumeInterviewPrep: [
      'Highlight engagement and adoption: "Trained 150+ corporate employees across 6 workshops, achieving a 94% positive rating and 3.2x increase in daily AI tool usage."',
      'Demonstrate how you handle skeptical or anxious learners who fear AI will replace their jobs.',
      'Show your ability to customize training materials for completely different departments (e.g., HR vs. Finance).'
    ],
    progressionPathways: [
      'Head of AI Enablement & Training',
      'Director of Learning & Development (L&D)',
      'Organizational Change Consultant',
      'Independent Corporate AI Keynote Speaker'
    ],
    limitationsAndPrerequisites: 'Requires high social energy and strong presentation charisma; simply reading slides about AI prompts will quickly disengage participants.',
    displayOrder: 10
  },
  {
    id: 'role-ai-adoption-coordinator',
    roleCode: 'ai_adoption_coordinator',
    categoryId: 'cat-people-edu',
    categoryCode: 'people_edu',
    categoryTitle: 'People & Education',
    title: 'AI Adoption Coordinator',
    tagline: 'Driving organizational change, tracking software license utilization, and supporting departmental champions.',
    description: 'AI Adoption Coordinators shepherd enterprises through the cultural and operational transition to AI. They run internal champion networks, manage pilot programs, track seat utilization, gather qualitative feedback, and address governance compliance.',
    typicalResponsibilities: [
      'Track and analyze enterprise AI tool license usage, login frequency, and feature adoption rates',
      'Organize and facilitate internal "AI Champions" networks across departments to share wins',
      'Host weekly "Office Hours" to help employees unblock specific prompts and workflow snags',
      'Conduct departmental readiness assessments and identify safety risks or shadow-AI usage',
      'Publish internal monthly AI newsletters spotlighting successful employee use-cases and prompt wins'
    ],
    requiredBeginnerSkills: [
      'Change management fundamentals and stakeholder empathy',
      'Spreadsheet analysis for tracking user cohorts and adoption metrics',
      'Clear cross-functional communication and community-building skills',
      'Solid understanding of enterprise data security policies and copyright considerations'
    ],
    skillsToDevelopNext: [
      'Prosci ADKAR change management certification methodologies',
      'Data visualization with Tableau, Power BI, or Looker Studio',
      'Developing AI governance frameworks, acceptable use policies, and compliance audits',
      'Enterprise software procurement and vendor evaluation'
    ],
    suggestedTools: {
      primary: ['Slack / Microsoft Teams', 'Google Sheets / Excel', 'Notion', 'Loom'],
      alternatives: ['Looker Studio', 'Miro', 'Typeform / Google Forms', 'SurveyMonkey']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No coding required. Centers on community building, change management, and cohort tracking.',
    portfolioProject: {
      title: 'Enterprise AI Adoption Playbook & 90-Day Rollout Strategy',
      scenario: 'A financial services firm purchased 200 Microsoft Copilot / ChatGPT Enterprise licenses, but after 60 days, only 22% of staff log in regularly. Create a 90-day turnaround adoption strategy.',
      deliverables: [
        'Adoption Barrier Audit analyzing why employees are not using their assigned licenses',
        '90-Day Phased Rollout Roadmap: Awareness -> Enablement -> Champions -> Institutionalization',
        'Internal Champions Program Blueprint (selection criteria, weekly sync agenda, recognition badges)',
        'Weekly Office Hours Format & FAQ Tracker resolving common user hesitations'
      ],
      completionCriteria: [
        'Addresses both psychological barriers (fear of looking incompetent) and operational hurdles',
        'Includes measurable KPI targets (Daily Active Users, departmental use-case documentation)',
        'Includes an Acceptable Use Policy summary sheet for employee reference'
      ],
      toolsUsed: ['Notion or Google Docs', 'Google Sheets for KPI dashboard', 'Google Slides'],
      estimatedHours: '12-16 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Adoption Diagnostics & Barrier Identification',
        focus: 'Designing employee surveys and interviews to uncover root causes of low tool adoption.',
        actionItems: [
          'Design an 8-question anonymous employee survey assessing AI awareness, anxiety, and usage frequency',
          'Map out the 4 primary adoption friction points: Lack of awareness, fear of errors, no time to experiment, unclear guidelines',
          'Synthesize survey results into an Executive Summary diagnosis'
        ],
        deliverable: 'Employee Adoption Survey Template and Barrier Analysis memo.'
      },
      {
        week: 2,
        title: 'The Departmental Champion Network',
        focus: 'Structuring an internal champion program that empowers enthusiastic peers to guide teammates.',
        actionItems: [
          'Define the role profile and weekly time commitment for a Departmental AI Champion',
          'Create a 4-week onboarding curriculum for champions to equip them with advanced prompt skills',
          'Design a Slack/Teams community structure for sharing prompts and celebrating wins'
        ],
        deliverable: 'Internal AI Champions Program Blueprint and communication templates.'
      },
      {
        week: 3,
        title: 'Office Hours & Continuous Feedback Loops',
        focus: 'Establishing safe, recurring drop-in spaces where employees get personalized guidance.',
        actionItems: [
          'Design the format for a weekly 45-minute "AI Clinic / Office Hours"',
          'Create a shared "Prompt Request Backlog" where employees submit tasks they want help automating',
          'Document solutions into a searchable company FAQ database'
        ],
        deliverable: 'AI Clinic Operating Manual with real-world case resolution templates.'
      },
      {
        week: 4,
        title: 'Measurement Dashboard & Rollout Playbook',
        focus: 'Building an adoption metrics tracker and packaging the complete strategy.',
        actionItems: [
          'Build a Google Sheets / Looker dashboard tracking Active Users, use cases cataloged, and satisfaction scores',
          'Compile all elements into a comprehensive 90-Day Rollout Playbook',
          'Record a 4-minute presentation walking leadership through the expected ROI and milestones'
        ],
        deliverable: 'Complete Enterprise Adoption Playbook and interactive KPI dashboard template.'
      }
    ],
    learningResources: [
      {
        title: 'Prosci: ADKAR Change Management Overview',
        type: 'Documentation',
        provider: 'Prosci',
        description: 'Leading framework for managing individual change within organizational transitions.',
        searchQuery: 'prosci adkar change management model guide overview'
      },
      {
        title: 'Microsoft: WorkLab AI Adoption Insights',
        type: 'Search Guide',
        provider: 'Microsoft WorkLab',
        description: 'Research studies and practical guides on enterprise AI transformation and employee habits.',
        searchQuery: 'microsoft worklab ai adoption change management guide'
      },
      {
        title: 'Coursera: Leading Organizational Change (Audit Free)',
        type: 'Course',
        provider: 'Northwestern University / Coursera',
        description: 'Strategies for overcoming organizational resistance and driving tech adoption.',
        searchQuery: 'leading organizational change northwestern university coursera audit'
      }
    ],
    portfolioEvidence: 'A 90-day adoption rollout playbook, an interactive Google Sheets metrics dashboard, a sample employee survey template, and an internal champion program blueprint.',
    resumeInterviewPrep: [
      'Highlight measurable engagement: "Architected internal champions network across 8 departments, elevating 90-day active enterprise AI seat usage from 28% to 81%."',
      'Demonstrate deep familiarity with corporate governance, privacy policies, and compliance considerations.',
      'Show how you turn casual employee experiments into documented, repeatable company assets.'
    ],
    progressionPathways: [
      'Director of Digital Transformation',
      'Head of Enterprise AI Strategy',
      'Change Management Practice Lead',
      'VP of People & Culture'
    ],
    limitationsAndPrerequisites: 'Requires high emotional intelligence and political savvy; forcing tool adoption top-down without listening to employee concerns causes resentment.',
    displayOrder: 11
  },
  {
    id: 'role-ai-learning-content-designer',
    roleCode: 'ai_learning_content_designer',
    categoryId: 'cat-people-edu',
    categoryCode: 'people_edu',
    categoryTitle: 'People & Education',
    title: 'AI Learning Content Designer',
    tagline: 'Designing interactive e-learning modules, scenario simulations, quizzes, and educational media with AI.',
    description: 'AI Learning Content Designers combine instructional design expertise with generative AI to rapidly produce interactive digital courses, branching scenario simulations, multimedia explainer videos, and assessment rubrics for corporate training and higher education.',
    typicalResponsibilities: [
      'Convert subject-matter expert (SME) transcripts and raw manuals into structured e-learning course modules',
      'Generate realistic branching case study scenarios and roleplay dialogue using conversational AI',
      'Produce AI voiceovers, synthesized video avatars, and visual storyboards (HeyGen, ElevenLabs, Synthesia)',
      'Design formative quizzes, knowledge checks, and Rubrics aligned with Bloom’s Taxonomy',
      'Package content into SCORM/xAPI-compliant packages for Learning Management Systems (LMS)'
    ],
    requiredBeginnerSkills: [
      'Instructional design theory (learning objectives, micro-learning, cognitive load management)',
      'Strong writing and storytelling skills tailored for diverse learning styles',
      'Familiarity with digital media tools (audio editing, video pacing, slide formatting)',
      'Prompt engineering for scenario generation and varied difficulty question sets'
    ],
    skillsToDevelopNext: [
      'Authoring tools (Articulate 360 / Storyline, Rise, Adobe Captivate)',
      'Advanced synthetic media generation (ElevenLabs voice cloning, HeyGen video generation)',
      'Learning analytics and learner drop-off rate optimization',
      'Gamification mechanics and adaptive learning pathways'
    ],
    suggestedTools: {
      primary: ['Claude / ChatGPT', 'ElevenLabs', 'HeyGen / Synthesia', 'Articulate Rise / Canva'],
      alternatives: ['Descript', 'Murf.ai', 'Gamma App', 'TalentLMS']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No coding required. Requires pedagogical structuring, multimedia editing familiarity, and curriculum design sense.',
    portfolioProject: {
      title: 'Interactive Micro-Learning Course: Cybersecurity & Social Engineering Defense',
      scenario: 'A modern company needs an engaging 15-minute interactive e-learning module to train remote workers to identify and defend against AI-generated phishing and deepfake scams.',
      deliverables: [
        'Complete Course Storyboard detailing script, visual cues, and interactive decision branches',
        '3 Branching Scenario Simulations where user choices dictate the outcome of a phishing attack',
        '2-Minute AI-Narrated Explainer Video produced with synthetic voiceover and motion graphics',
        '10-Question Formative Knowledge Check with detailed remediation explanations for incorrect answers'
      ],
      completionCriteria: [
        'Clear alignment between stated learning objectives and assessment questions',
        'Realistic dialogue that avoids artificial, simplistic "obviously fake" phishing examples',
        'Clean multimedia integration demonstrating polished pacing and audio balance'
      ],
      toolsUsed: ['Claude / ChatGPT', 'ElevenLabs / Descript', 'Canva / Rise', 'Loom'],
      estimatedHours: '14-18 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Instructional Objectives & Storyboard Architecture',
        focus: 'Writing measurable learning objectives (Bloom’s Taxonomy) and structured lesson outlines.',
        actionItems: [
          'Select a technical or compliance training topic (e.g., Information Security)',
          'Write 3 clear learning objectives using action verbs ("Identify", "Differentiate", "Execute")',
          'Design a comprehensive 4-column storyboard: Screen ID, Audio Script, Visual Description, Interaction'
        ],
        deliverable: 'Complete 15-screen Course Storyboard ready for production.'
      },
      {
        week: 2,
        title: 'Branching Scenarios & Roleplay Scripting',
        focus: 'Using LLMs to generate nuanced, multi-turn decision trees where choices have realistic consequences.',
        actionItems: [
          'Prompt Claude to generate a 3-tier branching scenario depicting a difficult workplace dilemma',
          'Craft feedback responses for suboptimal choices that guide the learner toward the correct principle',
          'Review text for natural conversational tone and appropriate reading difficulty'
        ],
        deliverable: 'Documented Branching Scenario Flowchart with all choice paths and feedback responses.'
      },
      {
        week: 3,
        title: 'Synthetic Voiceover & Media Production',
        focus: 'Integrating AI voice generation and video tools to produce professional multimedia assets.',
        actionItems: [
          'Generate clean, natural-sounding voiceover narration using ElevenLabs or Descript',
          'Assemble visual slides or video animations in Canva or Descript synchronized with audio pacing',
          'Export a 2-minute micro-learning video module'
        ],
        deliverable: 'Polished 2-minute educational video clip with AI voiceover and captions.'
      },
      {
        week: 4,
        title: 'Course Packaging & Portfolio Case Study',
        focus: 'Assembling all components into an interactive course module and publishing a public showcase.',
        actionItems: [
          'Assemble storyboard, video, scenarios, and quiz into an interactive prototype (Rise, Notion, or Canva site)',
          'Record a 3-minute video walkthrough explaining your instructional design choices',
          'Publish case study to portfolio showcasing the full design-to-delivery lifecycle'
        ],
        deliverable: 'Interactive e-learning prototype link and walkthrough video case study.'
      }
    ],
    learningResources: [
      {
        title: 'The eLearning Coach: Instructional Design Guides',
        type: 'Interactive Tutorial',
        provider: 'Connie Malamed',
        description: 'Comprehensive tutorials on cognitive load, storyboarding, and visual instructional design.',
        searchQuery: 'the elearning coach storyboarding visual design tutorial'
      },
      {
        title: 'Open University: Learning Design for 21st Century',
        type: 'Course',
        provider: 'OpenLearn',
        description: 'Free academic course on pedagogical principles and technology-enhanced learning.',
        searchQuery: 'openlearn learning design technology enhanced course free'
      },
      {
        title: 'ElevenLabs & Synthetic Media Guidelines',
        type: 'Documentation',
        provider: 'ElevenLabs',
        description: 'Best practices for audio pacing, emotion tags, and natural speech synthesis.',
        searchQuery: 'elevenlabs documentation prompt audio pacing pronunciation'
      }
    ],
    portfolioEvidence: 'A complete course storyboard PDF, a 2-minute video with AI narration, a branching scenario map, and a live link to an interactive e-learning prototype.',
    resumeInterviewPrep: [
      'Highlight speed and quality: "Accelerated course authoring cycle by 65% by pairing Claude storyboarding with ElevenLabs narration, delivering 12 modules on time and under budget."',
      'Demonstrate sound pedagogical reasoning: explain how your assessments measure true behavioral change rather than superficial rote memorization.',
      'Show your awareness of accessibility standards (WCAG, closed captioning, readable color contrast).'
    ],
    progressionPathways: [
      'Senior Instructional Designer',
      'Director of Digital Learning',
      'Curriculum Architect',
      'Head of Corporate Training Technologies'
    ],
    limitationsAndPrerequisites: 'Requires an eye for layout and narrative flow; generating heaps of AI course slides without solid pedagogy creates boring, unengaging "click-next" courses.',
    displayOrder: 12
  },

  // --------------------------------------------------------------------------
  // E. Customer Experience
  // --------------------------------------------------------------------------
  {
    id: 'role-ai-customer-support-specialist',
    roleCode: 'ai_customer_support_specialist',
    categoryId: 'cat-customer-exp',
    categoryCode: 'customer_exp',
    categoryTitle: 'Customer Experience',
    title: 'AI Customer Support Specialist',
    tagline: 'Delivering empathetic, ultra-fast support responses augmented by AI drafting and ticket summarization.',
    description: 'AI Customer Support Specialists handle complex, high-touch customer conversations while leveraging generative copilots to summarize previous interactions, suggest precise technical fixes, draft polite responses in seconds, and eliminate repetitive typing.',
    typicalResponsibilities: [
      'Manage multi-channel customer inquiries (email, chat, social) with AI copilot drafting assistance',
      'Review and refine AI-suggested responses to ensure technical accuracy, warmth, and brand tone',
      'Quickly synthesize long, multi-month ticket histories into 3-bullet handover summaries for senior engineers',
      'Identify recurring customer complaints and tag tickets systematically to feed product roadmap priorities',
      'Test and provide feedback on internal support copilot macros and automated snippet accuracy'
    ],
    requiredBeginnerSkills: [
      'Deep customer empathy, active listening, and conflict de-escalation skills',
      'Clear, concise, and grammatically impeccable written communication',
      'Speed and comfort navigating multi-tab support software (Zendesk, Intercom, Freshdesk)',
      'Prompting for tone adjustment (firm, apologetic, celebratory, reassuring)'
    ],
    skillsToDevelopNext: [
      'Support analytics and CSAT/NPS root-cause analysis',
      'Creating canned response macros and automated workflow rules',
      'Technical troubleshooting fundamentals (inspecting browser consoles, reading error logs)',
      'Building customer journey friction maps'
    ],
    suggestedTools: {
      primary: ['Intercom Fin / Copilot', 'Zendesk AI', 'ChatGPT Plus', 'Grammarly Go'],
      alternatives: ['Freshdesk Freddy AI', 'Help Scout AI', 'Claude', 'Front AI']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No coding required. Requires high emotional intelligence, problem-solving speed, and tool literacy.',
    portfolioProject: {
      title: 'Tier-1 Support Modernization & Response Excellence Kit',
      scenario: 'A high-volume SaaS company has a 4-hour first-response time and inconsistent support tone. Build an AI-assisted macro kit and escalation system for their top 10 most common customer issues.',
      deliverables: [
        'Top 10 High-Frequency Support Scenarios Playbook (billing disputes, bug reports, feature requests)',
        'AI-Copilot Response Templates with customizable bracket tokens and empathy hooks',
        'Complex Ticket Summarization Prompt Sheet translating messy customer rants into crisp engineering bug tickets',
        'De-escalation Guidebook with before-and-after examples of turning angry users into brand advocates'
      ],
      completionCriteria: [
        'Templates cut drafting time by estimated 70% while maintaining genuine personal warmth',
        'Bug report templates capture critical technical reproduction details (OS, browser, steps)',
        'Includes self-assessment rubric evaluating empathy, clarity, and resolution efficiency'
      ],
      toolsUsed: ['Zendesk/Intercom mock environment', 'Claude / ChatGPT', 'Google Docs'],
      estimatedHours: '10-14 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Customer Empathy & De-escalation Craft',
        focus: 'Mastering the art of de-escalating upset customers and communicating with warmth.',
        actionItems: [
          'Study the principles of empathetic customer communication (Hear, Empathize, Apologize, Resolve, Diagnose)',
          'Collect 5 examples of angry customer emails and practice drafting manual de-escalation responses',
          'Design a prompt that refines blunt or defensive drafts into empathetic, reassuring replies'
        ],
        deliverable: 'De-escalation Response Guide with 5 tested real-world scenarios.'
      },
      {
        week: 2,
        title: 'AI Copilot Prompting & Macro Engineering',
        focus: 'Creating modular, high-speed macros that integrate AI suggestions seamlessly.',
        actionItems: [
          'Identify the 10 most frequent SaaS support inquiries (password resets, billing errors, data exports)',
          'Write prompt-driven response templates containing variable placeholders',
          'Test templates against edge-case customer queries to ensure accuracy'
        ],
        deliverable: '10-Scenario Modular Response Macro Library.'
      },
      {
        week: 3,
        title: 'Ticket Synthesis & Cross-Team Escalations',
        focus: 'Translating lengthy customer tickets into actionable briefs for engineering and product teams.',
        actionItems: [
          'Process an 8-message ticket chain involving an intermittent software glitch',
          'Prompt an LLM to generate: 1) Executive Summary, 2) Reproduction Steps, 3) Customer Impact, 4) Proposed Action',
          'Refine formatting into standard Jira/Linear bug report format'
        ],
        deliverable: 'Bug Escalation Synthesis Template and sample completed bug ticket.'
      },
      {
        week: 4,
        title: 'Support Excellence Portfolio Assembly',
        focus: 'Packaging the templates and demonstrating speed gains in a shareable case study.',
        actionItems: [
          'Assemble all templates into an organized Notion or PDF support playbook',
          'Record a 3-minute video showing a live response being drafted and personalized in 45 seconds',
          'Publish case study on LinkedIn or portfolio site targeting modern tech support roles'
        ],
        deliverable: 'Public Customer Support Modernization Portfolio with video demonstration.'
      }
    ],
    learningResources: [
      {
        title: 'Help Scout: Customer Service Excellence & Tone',
        type: 'Documentation',
        provider: 'Help Scout',
        description: 'Industry-standard guides on writing empathetic, effective customer support emails.',
        searchQuery: 'help scout resources customer service tone empathy guide'
      },
      {
        title: 'Intercom Academy: AI-Driven Customer Support',
        type: 'Interactive Tutorial',
        provider: 'Intercom',
        description: 'How modern support teams blend AI chatbots with human-in-the-loop support agents.',
        searchQuery: 'intercom academy ai customer support customer service courses'
      },
      {
        title: 'Coursera: Customer Service Fundamentals (Audit Free)',
        type: 'Course',
        provider: 'ServiceSkills / Coursera',
        description: 'Foundations of conflict resolution, active listening, and customer satisfaction metrics.',
        searchQuery: 'customer service fundamentals coursera audit free'
      }
    ],
    portfolioEvidence: 'A comprehensive Support Playbook in Notion containing 10 AI-assisted response macros, a de-escalation guide, a bug escalation template, and a 3-minute video walkthrough.',
    resumeInterviewPrep: [
      'Quantify speed and quality: "Handled 60+ daily complex customer tickets utilizing AI copilot assistance, maintaining a 98.2% CSAT score and reducing resolution time by 35%."',
      'Demonstrate emotional intelligence: explain how you prevent AI responses from sounding robotic or insincere.',
      'Show your ability to partner with engineering teams through crisp, bug-reproduction reporting.'
    ],
    progressionPathways: [
      'Customer Support Team Lead',
      'Customer Experience (CX) Manager',
      'Customer Success Specialist',
      'Knowledge Base & Training Specialist'
    ],
    limitationsAndPrerequisites: 'Requires emotional resilience and patience; customers in distress can be harsh, and the AI cannot solve fundamental software outages on its own.',
    displayOrder: 13
  },
  {
    id: 'role-knowledge-base-specialist',
    roleCode: 'knowledge_base_specialist',
    categoryId: 'cat-customer-exp',
    categoryCode: 'customer_exp',
    categoryTitle: 'Customer Experience',
    title: 'Knowledge Base Specialist',
    tagline: 'Structuring company help centers, optimizing semantic search retrieval, and maintaining internal documentation.',
    description: 'Knowledge Base Specialists curate, structure, and maintain the documentation ecosystems that power customer self-service portals and internal AI search engines. They ensure articles are accurate, easily scannable, and formatted for optimal AI retrieval.',
    typicalResponsibilities: [
      'Audit existing help centers and internal wikis to eliminate outdated information and duplicate articles',
      'Author clear, scannable customer-facing help articles with step-by-step screenshots and video clips',
      'Optimize documentation structure for Semantic Search and LLM Retrieval-Augmented Generation (RAG)',
      'Analyze search query logs to identify "zero-result" queries and author missing documentation',
      'Collaborate with product and engineering teams to document new software features prior to release'
    ],
    requiredBeginnerSkills: [
      'Technical writing clarity and plain-language exposition',
      'Information architecture (taxonomies, tagging, categorization, breadcrumb hierarchy)',
      'Basic markdown formatting and screenshot annotation skills',
      'Methodical attention to detail and version control habits'
    ],
    skillsToDevelopNext: [
      'RAG chunking strategies and embedding optimization',
      'Search Engine Optimization (SEO) for public help centers',
      'Basic HTML/CSS styling for knowledge portal customization',
      'Content lifecycle management and automated staleness alerting'
    ],
    suggestedTools: {
      primary: ['Notion / Confluence', 'Zendesk Guide / Intercom Articles', 'Claude', 'Snagit / CleanShot'],
      alternatives: ['GitBook', 'Document360', 'Helpjuice', 'Mintlify']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No coding required. Markdown knowledge and familiarity with content management systems are all that is needed.',
    portfolioProject: {
      title: 'Complete SaaS Product Help Center & Semantic Knowledge Architecture',
      scenario: 'A fast-growing fintech app has 30 disheveled Google Docs as its documentation. Build a structured 12-article customer Help Center optimized for both human readability and AI chatbot search.',
      deliverables: [
        'Knowledge Base Taxonomy & Category Hierarchy Map',
        '5 High-Impact "Getting Started & Core Features" Help Articles with step-by-step numbered instructions',
        '4 Troubleshooting Articles formatted with Symptom-Cause-Resolution architecture',
        '3 Policy & Security Articles clearly explaining data privacy and account protections',
        'AI Ingestion Audit verifying that an LLM can accurately answer customer questions using the articles'
      ],
      completionCriteria: [
        'Articles adhere to strict technical writing style guide (active voice, consistent terminology)',
        'Zero jargon without prior definition',
        'Includes visual callouts (Notes, Warnings, Tips) for improved visual scanning'
      ],
      toolsUsed: ['GitBook or Notion', 'Claude / ChatGPT', 'CleanShot or Canva'],
      estimatedHours: '12-16 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Information Architecture & Taxonomy Design',
        focus: 'Structuring knowledge bases for intuitive human navigation and optimal AI retrieval.',
        actionItems: [
          'Study standard knowledge base structures (Top-level categories -> Subcategories -> Articles)',
          'Create an Information Architecture map for a mock SaaS product covering 15 topics',
          'Define a 1-page Technical Writing Style Guide (capitalization, button names, callout styles)'
        ],
        deliverable: 'Complete Help Center Taxonomy Map and Style Guide.'
      },
      {
        week: 2,
        title: 'Step-by-Step Article Authoring with AI Assistance',
        focus: 'Using AI to draft, structure, and refine procedural "How-To" articles.',
        actionItems: [
          'Feed raw feature bullet points into Claude and prompt for step-by-step instructions',
          'Review output to ensure imperative verbs start each step ("Click", "Select", "Enter")',
          'Annotate mock screenshots to accompany written instructions'
        ],
        deliverable: '5 polished procedural help articles with annotated visual mockups.'
      },
      {
        week: 3,
        title: 'Troubleshooting & Diagnostic Article Craft',
        focus: 'Writing structured troubleshooting guides that resolve user errors rapidly.',
        actionItems: [
          'Design a 3-part troubleshooting layout: 1) What You See, 2) Why It Happens, 3) How to Fix It',
          'Author 4 troubleshooting articles addressing common error codes and permission issues',
          'Add related article cross-links to prevent dead ends'
        ],
        deliverable: '4 structured troubleshooting guides with clear diagnostic paths.'
      },
      {
        week: 4,
        title: 'RAG Grounding Test & Portfolio Showcase',
        focus: 'Validating that your articles work seamlessly when ingested into an AI chatbot knowledge base.',
        actionItems: [
          'Upload your markdown articles into Claude Projects or an AI chatbot builder',
          'Query the model with 10 varied customer phrasing variations to test retrieval accuracy',
          'Publish the complete knowledge base to a public GitBook or Notion site and record a video overview'
        ],
        deliverable: 'Public live Help Center site and 3-minute video walking through the architecture.'
      }
    ],
    learningResources: [
      {
        title: 'Google Technical Writing One & Two',
        type: 'Interactive Tutorial',
        provider: 'Google for Developers',
        description: 'Industry-standard free training on active voice, clear formatting, and technical documentation.',
        searchQuery: 'google technical writing one courses for developers free'
      },
      {
        title: 'GitBook Docs: Structuring Great Documentation',
        type: 'Documentation',
        provider: 'GitBook',
        description: 'Guides on modern documentation hierarchies, search navigation, and publishing.',
        searchQuery: 'gitbook documentation guide structuring technical content'
      },
      {
        title: 'Write the Docs: Knowledge Base Best Practices',
        type: 'Search Guide',
        provider: 'Write the Docs Community',
        description: 'Global community guidelines for documentation managers and technical writers.',
        searchQuery: 'write the docs documentation guide beginner technical writing'
      }
    ],
    portfolioEvidence: 'A public GitBook or Notion Help Center housing 12 beautifully formatted articles, a taxonomy diagram, a technical style guide, and an AI retrieval audit report.',
    resumeInterviewPrep: [
      'Highlight self-service deflection: "Architected modern knowledge base of 45+ articles, driving a 30% reduction in inbound support tickets and improving search success rate to 88%."',
      'Demonstrate understanding of how modern LLM search engines index and parse markdown headings and tables.',
      'Show your ability to translate complicated developer explanations into friendly consumer language.'
    ],
    progressionPathways: [
      'Lead Technical Writer',
      'Head of Customer Education & Content',
      'Knowledge Operations Manager',
      'Product Documentation Architect'
    ],
    limitationsAndPrerequisites: 'Requires disciplined consistency and neatness; a messy knowledge base with conflicting information actively harms both users and AI chatbots.',
    displayOrder: 14
  },
  {
    id: 'role-cx-automation-specialist',
    roleCode: 'cx_automation_specialist',
    categoryId: 'cat-customer-exp',
    categoryCode: 'customer_exp',
    categoryTitle: 'Customer Experience',
    title: 'Customer Experience Automation Specialist',
    tagline: 'Automating customer onboarding sequences, feedback surveys, churn alerts, and proactive outreach.',
    description: 'Customer Experience (CX) Automation Specialists connect support systems, CRM databases, and messaging channels to trigger automated customer communications, proactive satisfaction surveys, renewal reminders, and churn-risk alerts without manual oversight.',
    typicalResponsibilities: [
      'Map end-to-end customer journey milestones (signup, activation, first milestone, renewal, at-risk)',
      'Build automated email and in-app messaging sequences triggered by user product behavior',
      'Automate Customer Satisfaction (CSAT) and Net Promoter Score (NPS) survey collection and sentiment tagging',
      'Set up proactive alert notifications when high-value accounts show signs of disengagement or churn',
      'Maintain integration health between support tools, marketing automation, and the core customer database'
    ],
    requiredBeginnerSkills: [
      'Customer journey mapping and lifecycle stage awareness',
      'Familiarity with CRM and customer success platforms (HubSpot, Customer.io, Intercom)',
      'Basic logic triggers (Event-based triggers, delays, branch conditions)',
      'Clear, friendly copywriting for lifecycle notifications'
    ],
    skillsToDevelopNext: [
      'Webhook data payloads and API event tracking',
      'Cohort retention analysis and churn prediction modeling',
      'Advanced behavioral segmentation logic',
      'A/B testing of automated onboarding sequences'
    ],
    suggestedTools: {
      primary: ['Customer.io / HubSpot', 'Make.com / Zapier', 'Intercom', 'ChatGPT Plus'],
      alternatives: ['ActiveCampaign', 'ChurnZero', 'Mixpanel', 'Klaviyo']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No coding required. Relies on visual journey builders, workflow automation rules, and trigger configurations.',
    portfolioProject: {
      title: 'Automated SaaS Customer Onboarding & Churn-Prevention Engine',
      scenario: 'A B2B project management software sees 40% of new trial signups abandon the app within 7 days. Build an automated onboarding journey and churn-intervention workflow.',
      deliverables: [
        'Complete Customer Journey Map documenting 5 critical activation milestones',
        'Behavior-Triggered Email & Notification Sequence (Welcome, First Project Created, Inactivity Nudge)',
        'Automated Sentiment Classification Workflow parsing survey responses and routing detractors to account leads',
        'Churn-Risk Slack Alert Trigger for customer success managers when a paying account goes dormant for 14 days'
      ],
      completionCriteria: [
        'Sequence only sends messages relevant to the user’s actual product action (no spamming activated users)',
        'Includes copy variations and fallback timing rules',
        'Includes architectural flow diagram showing all software connections'
      ],
      toolsUsed: ['Make.com or Zapier', 'HubSpot / Customer.io mock', 'Google Docs / Miro'],
      estimatedHours: '12-16 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Lifecycle Mapping & Activation Milestones',
        focus: 'Mapping out the critical path that leads a new customer to their "Aha!" moment.',
        actionItems: [
          'Choose a real or hypothetical digital product and identify its primary value milestone',
          'Map out the ideal 14-day user onboarding journey in Miro or Lucidchart',
          'Identify 3 drop-off hazard points where users get stuck or lose momentum'
        ],
        deliverable: 'Visual Customer Lifecycle Journey Map with activation trigger points.'
      },
      {
        week: 2,
        title: 'Behavioral Trigger Sequence Design',
        focus: 'Writing and configuring event-triggered emails that respond to user activity or inactivity.',
        actionItems: [
          'Write a 4-part event-triggered email series with clear, helpful guidance',
          'Configure logic rules: If user completed Action A -> Send Tip B; If user inactive for 48h -> Send Help C',
          'Use Claude to optimize email copy for concise, encouraging language'
        ],
        deliverable: 'Complete Behavioral Onboarding Copy Deck with trigger logic rules.'
      },
      {
        week: 3,
        title: 'Automated Sentiment Triage & Survey Routing',
        focus: 'Automating post-interaction CSAT surveys and AI-assisted sentiment categorization.',
        actionItems: [
          'Build an automation scenario that ingests sample customer survey scores and comments',
          'Use an AI module to analyze sentiment and extract key complaint themes',
          'Route negative feedback (Scores 1-3) immediately to a manager Slack channel for rapid recovery'
        ],
        deliverable: 'Automated CSAT Analysis & Slack Alert Scenario Blueprint.'
      },
      {
        week: 4,
        title: 'System Integration & Portfolio Case Study',
        focus: 'Assembling the full lifecycle automation kit into an executive presentation.',
        actionItems: [
          'Document the complete system architecture, trigger rules, and expected business impact',
          'Record a 4-minute video demonstrating how the behavioral triggers fire in real time',
          'Publish case study to personal portfolio highlighting customer retention skills'
        ],
        deliverable: 'Public CX Automation Case Study with architecture diagrams and walkthrough video.'
      }
    ],
    learningResources: [
      {
        title: 'Customer.io: Mobile & Web Messaging Masterclass',
        type: 'Interactive Tutorial',
        provider: 'Customer.io',
        description: 'Guides on behavioral event tracking, segmentation, and automated message orchestration.',
        searchQuery: 'customer io university behavioral email marketing automation'
      },
      {
        title: 'Reforge: Retention & Engagement Overview',
        type: 'Search Guide',
        provider: 'Reforge',
        description: 'Industry-standard frameworks for customer activation, retention loops, and churn mitigation.',
        searchQuery: 'reforge retention engagement customer lifecycle frameworks summary'
      },
      {
        title: 'HubSpot Academy: Email Marketing & Automation',
        type: 'Course',
        provider: 'HubSpot',
        description: 'Free certification covering lifecycle marketing, contact segmentation, and workflow triggers.',
        searchQuery: 'hubspot academy email marketing automation certification free'
      }
    ],
    portfolioEvidence: 'A visual lifecycle journey map, an event-triggered email copy deck, an automated sentiment triage blueprint in Make/Zapier, and a video demonstration.',
    resumeInterviewPrep: [
      'Quantify retention gains: "Built automated customer activation sequence that increased 30-day user retention by 22% and reduced time-to-first-project from 6 days to 36 hours."',
      'Demonstrate understanding of notification fatigue: explain how you prevent bombarding users with too many automated emails.',
      'Show your ability to connect technical triggers with commercial business outcomes.'
    ],
    progressionPathways: [
      'Director of Customer Lifecycle',
      'Head of Customer Success Operations',
      'VP of Customer Experience',
      'Growth Operations Strategist'
    ],
    limitationsAndPrerequisites: 'Requires an understanding of data privacy rules (GDPR, CAN-SPAM) and email deliverability best practices; sending irrelevant automated blasts harms brand trust.',
    displayOrder: 15
  },

  // --------------------------------------------------------------------------
  // F. Data & Technology
  // --------------------------------------------------------------------------
  {
    id: 'role-junior-data-analyst',
    roleCode: 'junior_data_analyst',
    categoryId: 'cat-data-tech',
    categoryCode: 'data_tech',
    categoryTitle: 'Data & Technology',
    title: 'Junior Data Analyst',
    tagline: 'Cleaning data, writing SQL queries, querying datasets with AI Code Interpreters, and visualizing trends.',
    description: 'Junior Data Analysts clean raw datasets, extract actionable business trends, build dashboards, and answer commercial questions by combining foundational SQL and spreadsheet skills with AI-powered data analysis environments like ChatGPT Advanced Data Analysis.',
    typicalResponsibilities: [
      'Clean, normalize, and inspect messy CSV/Excel datasets for missing values, duplicates, and anomalies',
      'Write and debug fundamental SQL queries (SELECT, WHERE, GROUP BY, JOIN) with AI assistance',
      'Use AI Code Interpreters (Python/Pandas) to run exploratory data analysis and generate charts in seconds',
      'Build clean, interactive dashboards in Google Looker Studio, Tableau, or Power BI',
      'Draft plain-language executive summaries explaining what data trends mean for business decision-makers'
    ],
    requiredBeginnerSkills: [
      'Basic spreadsheet proficiency (VLOOKUP/XLOOKUP, Pivot Tables, SUMIFS)',
      'Basic understanding of relational databases and SQL concepts (tables, columns, primary keys)',
      'Curiosity for uncovering patterns, correlations, and outliers',
      'Prompting AI tools to generate and explain Python/SQL code snippets'
    ],
    skillsToDevelopNext: [
      'Intermediate to advanced SQL (window functions, subqueries, CTEs)',
      'Python data science libraries (Pandas, NumPy, Matplotlib, Seaborn)',
      'Data storytelling and executive presentation design',
      'Basic statistical concepts (distributions, standard deviation, hypothesis testing)'
    ],
    suggestedTools: {
      primary: ['ChatGPT Plus (Advanced Data Analysis)', 'Google Sheets / Excel', 'Looker Studio', 'Claude'],
      alternatives: ['Tableau Public', 'Power BI', 'Hex.tech', 'DB Browser for SQLite']
    },
    codingNeeded: false,
    codingRequirementDetails: 'Traditional software engineering is NOT required to start. Foundational SQL querying and prompt-assisted Python/spreadsheet formulas are used.',
    portfolioProject: {
      title: 'E-Commerce Sales Performance & Customer Lifetime Value Analysis',
      scenario: 'An e-commerce retailer has 50,000 raw transaction records spanning 2 years. Ingest the data, clean anomalies, identify top customer cohorts, and present strategic revenue recommendations.',
      deliverables: [
        'Data Cleaning Log detailing removed anomalies, missing values, and formatting adjustments',
        'SQL Query Repository containing 8 documented queries answering specific commercial questions',
        'Interactive Looker Studio / Tableau Dashboard displaying Monthly Recurring Revenue, Average Order Value, and Churn',
        'Executive Data Storytelling Memo summarizing 3 strategic opportunities to increase customer lifetime value'
      ],
      completionCriteria: [
        'All calculations verified for mathematical consistency (no unverified hallucinated figures)',
        'Charts use appropriate visual encodings (line for time series, bar for discrete categories)',
        'Includes reproducible prompt log showing how Python code was generated and verified'
      ],
      toolsUsed: ['ChatGPT Advanced Data Analysis', 'Google Sheets', 'Looker Studio', 'SQL'],
      estimatedHours: '14-18 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Spreadsheet Hygiene & AI Data Interpretation',
        focus: 'Cleaning datasets and conducting rapid exploratory data analysis with AI assistance.',
        actionItems: [
          'Download an open-source dataset from Kaggle (e.g., retail sales or movie box office)',
          'Upload into ChatGPT Advanced Data Analysis and prompt for missing value inspection and summary stats',
          'Verify AI calculations by checking pivot table outputs independently in Google Sheets'
        ],
        deliverable: 'Data Cleaning Audit and Exploratory Data Analysis Summary.'
      },
      {
        week: 2,
        title: 'SQL Query Fundamentals with AI Copilots',
        focus: 'Learning core SQL queries and leveraging AI to write, debug, and explain complex joins.',
        actionItems: [
          'Practice basic SQL queries on SQLite or BigQuery public datasets',
          'Use Claude to explain SQL syntax errors and optimize query structure',
          'Write queries to calculate monthly revenue growth, top 10 customers, and repeat purchase rates'
        ],
        deliverable: 'SQL Query Portfolio featuring 8 well-commented business queries.'
      },
      {
        week: 3,
        title: 'Interactive Dashboard Construction',
        focus: 'Building clear, intuitive visualizations and dashboards in Looker Studio or Tableau.',
        actionItems: [
          'Connect cleaned data to Google Looker Studio (free tool)',
          'Design an executive dashboard featuring KPI scorecards, trend lines, and segment breakdown filters',
          'Ensure high accessibility: legible labels, uncluttered layout, consistent color scheme'
        ],
        deliverable: 'Interactive Looker Studio Dashboard with public viewable link.'
      },
      {
        week: 4,
        title: 'Data Storytelling & Executive Memo',
        focus: 'Translating charts into commercial recommendations and packaging the portfolio.',
        actionItems: [
          'Write a 2-page executive memo translating dashboard insights into 3 business actions',
          'Record a 4-minute video walking through the dashboard as if presenting to the VP of Sales',
          'Publish the full project on GitHub or Notion with clear links to the dashboard'
        ],
        deliverable: 'Complete End-to-End Data Analysis Case Study with video presentation.'
      }
    ],
    learningResources: [
      {
        title: 'Google Data Analytics Professional Certificate (Audit Free)',
        type: 'Course',
        provider: 'Coursera / Google',
        description: 'Comprehensive introduction to data cleaning, spreadsheets, SQL, and data visualization.',
        searchQuery: 'google data analytics professional certificate coursera free audit'
      },
      {
        title: 'Mode Analytics: The SQL Tutorial for Data Analysis',
        type: 'Interactive Tutorial',
        provider: 'Mode Analytics',
        description: 'Free, interactive SQL tutorial covering basic to advanced analytical querying.',
        searchQuery: 'mode analytics sql tutorial for data analysis interactive'
      },
      {
        title: 'Storytelling with Data: Chart Design Principles',
        type: 'Documentation',
        provider: 'Cole Nussbaumer Knaflic',
        description: 'Authoritative guide on eliminating chart clutter and highlighting key business insights.',
        searchQuery: 'storytelling with data cole nussbaumer chart guide principles'
      }
    ],
    portfolioEvidence: 'A public Looker Studio or Tableau dashboard link, a GitHub repository containing documented SQL queries, a cleaned dataset sample, and an executive briefing memo.',
    resumeInterviewPrep: [
      'Stress business context over raw numbers: "Analyzed 50,000+ retail records using SQL and Looker Studio, identifying an underperforming customer cohort and modeling a strategy to recover $120k in revenue."',
      'Demonstrate how you check and validate AI-written queries against raw data to prevent false conclusions.',
      'Show that you know how to explain complex metrics in plain English to non-technical stakeholders.'
    ],
    progressionPathways: [
      'Senior Data Analyst',
      'Business Intelligence (BI) Engineer',
      'Analytics Engineer',
      'Product Data Scientist'
    ],
    limitationsAndPrerequisites: 'Requires numerical literacy and healthy skepticism; blindly accepting an AI-generated calculation without verifying the math will lead to flawed business decisions.',
    displayOrder: 16
  },
  {
    id: 'role-ai-product-coordinator',
    roleCode: 'ai_product_coordinator',
    categoryId: 'cat-data-tech',
    categoryCode: 'data_tech',
    categoryTitle: 'Data & Technology',
    title: 'AI Product Coordinator',
    tagline: 'Bridging users, designers, and engineers to define, prototype, and ship AI-powered software features.',
    description: 'AI Product Coordinators assist product managers in scoping AI capabilities. They write clear Product Requirement Documents (PRDs), benchmark competitive AI features, test model outputs for edge cases, and coordinate user feedback loops to build intuitive AI products.',
    typicalResponsibilities: [
      'Draft detailed Product Requirement Documents (PRDs) and user stories for AI-assisted software features',
      'Create interactive wireframe prototypes using modern design and rapid-prototyping tools (v0, Figma, Lovable)',
      'Benchmark competitor AI capabilities and document feature gaps and UX opportunities',
      'Design test evaluation suites (evals) to measure whether AI outputs meet quality and safety thresholds',
      'Track feature development sprints and coordinate bug triage between QA and engineering'
    ],
    requiredBeginnerSkills: [
      'Strong product thinking and user-centric problem definition',
      'Clear technical writing (user stories, acceptance criteria, edge-case specification)',
      'Familiarity with agile product management concepts (sprints, backlog, MVP)',
      'Prompting LLMs to simulate user personas and generate rapid UI mockups'
    ],
    skillsToDevelopNext: [
      'AI evaluation frameworks and metric benchmarking (precision, recall, toxicity checks)',
      'Interactive prototyping in Figma and v0 by Vercel',
      'User interview facilitation and usability testing methodologies',
      'Basic understanding of LLM APIs, token budgets, and latency considerations'
    ],
    suggestedTools: {
      primary: ['v0 by Vercel', 'Claude Projects', 'Figma', 'Linear / Jira'],
      alternatives: ['Notion', 'Miro', 'Lovable.dev', 'Whimsical']
    },
    codingNeeded: false,
    codingRequirementDetails: 'No coding required. Requires strong product logic, user empathy, clear specification writing, and wireframing.',
    portfolioProject: {
      title: 'AI Feature Specification & Interactive Prototype: Intelligent Travel Copilot',
      scenario: 'A travel booking platform wants to add an AI feature that generates personalized 3-day weekend itineraries based on traveler budget, pace, and dietary restrictions.',
      deliverables: [
        'Comprehensive Product Requirements Document (PRD) detailing user personas, feature scope, and non-functional requirements',
        'Interactive UI Wireframe Prototype built with v0 / Figma showing all user states (empty, loading, results, error)',
        'AI Evaluation Matrix (Eval Set) of 20 test inputs with expected criteria and safety guardrails',
        '6-Slide Product Pitch Deck for executive leadership outlining the business case and MVP rollout'
      ],
      completionCriteria: [
        'PRD clearly specifies edge cases (e.g., flight cancellations, unsupported destinations, dietary conflicts)',
        'Prototype is interactive and testable by an external user',
        'Includes explicit metrics for feature success (conversion to booking, user edit rate)'
      ],
      toolsUsed: ['v0 by Vercel or Figma', 'Claude / ChatGPT', 'Google Docs / Slides'],
      estimatedHours: '14-18 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'Product Scoping & PRD Architecture',
        focus: 'Writing comprehensive Product Requirement Documents with clear acceptance criteria.',
        actionItems: [
          'Study industry PRD templates from top tech companies (Shape Up, Agile user stories)',
          'Define the user problem, target audience, and success metrics for a new AI feature',
          'Prompt Claude to challenge your assumptions and uncover overlooked edge cases'
        ],
        deliverable: 'Complete Product Requirement Document (PRD) with user stories and constraints.'
      },
      {
        week: 2,
        title: 'Rapid Prototyping with v0 & Wireframing',
        focus: 'Building interactive visual prototypes using generative UI tools without writing manual code.',
        actionItems: [
          'Use v0 by Vercel or Figma to generate the core user interface screens',
          'Design states: 1) Initial prompt screen, 2) Animated loading state, 3) Interactive results view, 4) Error state',
          'Test user flow with 2 peers and iterate based on confusing interactions'
        ],
        deliverable: 'Shareable interactive prototype link demonstrating the full user flow.'
      },
      {
        week: 3,
        title: 'AI Quality Evals & Edge-Case Guardrails',
        focus: 'Creating structured test suites (evals) to measure and maintain AI output quality.',
        actionItems: [
          'Design an evaluation spreadsheet with 20 diverse user prompt scenarios (including hostile and edge-case inputs)',
          'Define explicit pass/fail criteria (accuracy, tone, refusal of harmful requests)',
          'Test the feature against multiple model versions and document failure rates'
        ],
        deliverable: 'Documented AI Quality Evaluation Matrix with test results and mitigation notes.'
      },
      {
        week: 4,
        title: 'Executive Pitch & Portfolio Publication',
        focus: 'Packaging the PRD, prototype, and evals into an executive-ready portfolio case study.',
        actionItems: [
          'Create a 6-slide executive pitch deck summarizing market opportunity, UX, and rollout roadmap',
          'Record a 4-minute video walking through the PRD and clicking through the live prototype',
          'Publish case study to personal website or Notion portfolio'
        ],
        deliverable: 'Complete Product Coordinator Portfolio Case Study with prototype and video.'
      }
    ],
    learningResources: [
      {
        title: 'Product School: The Product Management Handbook',
        type: 'Documentation',
        provider: 'Product School',
        description: 'Comprehensive guides on writing PRDs, prioritization frameworks, and sprint management.',
        searchQuery: 'product school product management handbook prd guide free'
      },
      {
        title: 'v0 by Vercel: Generative UI Prototyping Tutorial',
        type: 'Interactive Tutorial',
        provider: 'Vercel',
        description: 'How to describe interfaces in natural language to produce working React/Tailwind prototypes.',
        searchQuery: 'v0 by vercel generative ui prototyping documentation tutorial'
      },
      {
        title: 'Lenny’s Newsletter: How to Build AI Products',
        type: 'Search Guide',
        provider: 'Lenny Rachitsky',
        description: 'In-depth interviews and case studies on AI product management, evals, and UX patterns.',
        searchQuery: 'lennys newsletter how to build ai products evals guide'
      }
    ],
    portfolioEvidence: 'A comprehensive PRD document, an interactive v0/Figma prototype link, a 20-case AI evaluation matrix, and a 4-minute video walkthrough.',
    resumeInterviewPrep: [
      'Focus on product trade-offs: "Scoped and designed interactive prototype for AI search feature, creating a 20-scenario eval suite that identified 4 key failure modes before engineering kickoff."',
      'Demonstrate understanding of AI limitations: explain how you design UX fallbacks when the model is slow or uncertain.',
      'Show your ability to bridge communication between design, engineering, and business stakeholders.'
    ],
    progressionPathways: [
      'Associate Product Manager (APM)',
      'Technical Product Manager (AI/ML)',
      'Director of Product Management',
      'VP of Product'
    ],
    limitationsAndPrerequisites: 'Requires strong judgment and decisive prioritization; trying to solve every user problem with AI creates bloated, confusing products.',
    displayOrder: 17
  },
  {
    id: 'role-ai-developer',
    roleCode: 'ai_developer',
    categoryId: 'cat-data-tech',
    categoryCode: 'data_tech',
    categoryTitle: 'Data & Technology',
    title: 'AI Developer',
    tagline: 'Building full-stack AI applications, integrating LLM APIs, implementing RAG pipelines, and deploying web apps.',
    description: 'AI Developers write production code to integrate large language models into real-world applications. They connect APIs, engineer vector search and Retrieval-Augmented Generation (RAG) pipelines, manage database state, and deploy secure, responsive web experiences.',
    typicalResponsibilities: [
      'Write frontend and backend code to integrate OpenAI, Anthropic, and open-source models via REST APIs',
      'Implement Retrieval-Augmented Generation (RAG) pipelines using vector databases (Supabase pgvector, Pinecone)',
      'Design structured database schemas (PostgreSQL) and write secure API endpoints with authentication and rate limiting',
      'Handle streaming responses, token estimation, and asynchronous job processing',
      'Deploy, monitor, and maintain modern full-stack web applications on cloud platforms (Vercel, Supabase)'
    ],
    requiredBeginnerSkills: [
      'Foundations of JavaScript/TypeScript and modern web development (React, Node.js)',
      'Understanding of REST APIs, JSON data structures, and asynchronous programming (async/await)',
      'Basic database concepts (relational tables, SQL queries, environment variables)',
      'Using AI coding assistants (Cursor, GitHub Copilot) to accelerate development and debugging'
    ],
    skillsToDevelopNext: [
      'Vector embeddings and semantic search (pgvector, cosine similarity)',
      'Frameworks for complex agentic workflows (LangChain, LlamaIndex, Vercel AI SDK)',
      'Prompt caching, context window management, and inference latency optimization',
      'Full-stack security (OAuth, Row Level Security, sanitizing LLM inputs and outputs)'
    ],
    suggestedTools: {
      primary: ['TypeScript / React', 'Supabase (PostgreSQL + pgvector)', 'Cursor / VS Code', 'Vercel AI SDK'],
      alternatives: ['Python / FastAPI', 'Pinecone', 'Next.js', 'OpenAI / Anthropic SDK']
    },
    codingNeeded: true,
    codingRequirementDetails: 'Yes, coding is required. Requires foundational JavaScript/TypeScript and web development concepts.',
    portfolioProject: {
      title: 'Full-Stack Semantic Knowledge Assistant & Document Q&A App',
      scenario: 'Build a production-ready web application where users can upload PDF documents, store them in a PostgreSQL database with vector embeddings, and chat with their documents with source citations.',
      deliverables: [
        'Responsive full-stack web application built in React/TypeScript and hosted on Vercel',
        'Supabase backend with Row Level Security, pgvector embedding storage, and user authentication',
        'Server-side streaming API route calling OpenAI/Claude with grounded context injection',
        'Public GitHub repository with comprehensive README, architectural diagram, and test suite'
      ],
      completionCriteria: [
        'Zero exposed API keys in frontend code (all calls route through secure server endpoints)',
        'Streaming text responses render smoothly in the UI without freezing',
        'Answers include clickable footnote citations jumping to relevant document excerpts'
      ],
      toolsUsed: ['React + TypeScript', 'Supabase + pgvector', 'Vercel AI SDK', 'Tailwind CSS'],
      estimatedHours: '20-25 hours'
    },
    fourWeekRoadmap: [
      {
        week: 1,
        title: 'API Integration & Streaming Mechanics',
        focus: 'Calling LLM APIs programmatically and rendering streamed tokens in a web interface.',
        actionItems: [
          'Initialize a Vite React TypeScript project with Tailwind CSS',
          'Write a backend endpoint that forwards user prompts to OpenAI/Claude with secure API keys',
          'Implement server-sent events (SSE) or Vercel AI SDK `useChat` hook to render streaming responses'
        ],
        deliverable: 'Working web chat interface with live streaming response generation.'
      },
      {
        week: 2,
        title: 'Database Schema, Auth & Row Level Security',
        focus: 'Setting up Supabase PostgreSQL with user authentication and secure Row Level Security policies.',
        actionItems: [
          'Create a Supabase project and define tables for Users, Documents, and Chat Messages',
          'Enable Row Level Security (RLS) so users can only view and query their own records',
          'Implement Supabase Auth (Email or OAuth) in the frontend application'
        ],
        deliverable: 'Authenticated web app persisting user chats securely in PostgreSQL.'
      },
      {
        week: 3,
        title: 'Vector Embeddings & Semantic Search (RAG)',
        focus: 'Chunking uploaded text, generating vector embeddings, and running similarity queries.',
        actionItems: [
          'Enable the `vector` extension in Supabase and create an embedding column with match function',
          'Write a utility to split uploaded text into 500-token chunks with 50-token overlap',
          'Generate embeddings using OpenAI text-embedding-3-small and retrieve top-3 matches using cosine similarity'
        ],
        deliverable: 'Functional RAG pipeline answering questions grounded on user-uploaded text.'
      },
      {
        week: 4,
        title: 'Production Hardening, Deployment & Open-Source Showcase',
        focus: 'Adding rate limiting, error handling, writing tests, and deploying to Vercel.',
        actionItems: [
          'Add rate limiting and input length constraints to protect your API budget',
          'Write unit tests for chunking and scoring modules using Vitest',
          'Deploy to Vercel, record a 4-minute demonstration video, and write a thorough GitHub README'
        ],
        deliverable: 'Live deployed full-stack application URL and public GitHub repository.'
      }
    ],
    learningResources: [
      {
        title: 'Supabase: Vector Embeddings & AI Search Guide',
        type: 'Interactive Tutorial',
        provider: 'Supabase',
        description: 'Complete guide to pgvector, cosine similarity queries, and building RAG on PostgreSQL.',
        searchQuery: 'supabase vector search pgvector documentation tutorial'
      },
      {
        title: 'Vercel AI SDK Official Documentation',
        type: 'Documentation',
        provider: 'Vercel',
        description: 'Modern standard for streaming LLM responses, tool calling, and UI hooks in React.',
        searchQuery: 'vercel ai sdk documentation usechat react typescript'
      },
      {
        title: 'Full Stack Deep Learning: LLM Boot Camp',
        type: 'Course',
        provider: 'Full Stack Deep Learning',
        description: 'Free comprehensive video series on productionizing LLMs, evals, and system architecture.',
        searchQuery: 'full stack deep learning llm bootcamp free course videos'
      }
    ],
    portfolioEvidence: 'A live deployed web application URL on Vercel, a public GitHub repository with clean TypeScript code, and a 4-minute video demonstrating code architecture and live RAG retrieval.',
    resumeInterviewPrep: [
      'Highlight full-stack engineering competency: "Built and deployed full-stack AI document assistant with React, TypeScript, and Supabase pgvector, delivering sub-second streaming answers with citation verification."',
      'Demonstrate security best practices: explain why API keys never belong in client-side bundles and how RLS enforces data isolation.',
      'Discuss how you manage LLM rate limits, token budgets, and edge-case errors.'
    ],
    progressionPathways: [
      'Senior AI Application Engineer',
      'Full-Stack Machine Learning Engineer',
      'AI Systems Architect',
      'Founding Engineer / CTO'
    ],
    limitationsAndPrerequisites: 'Requires real coding dedication and comfort with debugging TypeScript, database constraints, and asynchronous APIs.',
    displayOrder: 18
  }
];
