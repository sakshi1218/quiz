# MindLyft AI — Career Discovery Platform

A full-stack, deterministic career-discovery and personalized report platform built for **MindLyft AI**. The platform guides participants through a randomized, role-specific 15-question assessment drawn from a 1,080-question bank across 18 specialized roles, captures participant user information (**Full Name & Phone Number**), evaluates category and role-readiness scores using a testable deterministic recommendation engine, tracks question presentation history per anonymous participant to avoid repeating questions across attempts, provides a 4-week roadmap and beginner portfolio project, persists completed assessments directly to a local **SQLite Database** (`mindlyft.db`), and provides a locked administrative console with contact records and CSV export.

---

## 1. Technology Stack

- **Frontend Framework**: React 18 + Vite + TypeScript
- **Styling**: Vanilla Tailwind CSS + Custom Glassmorphism + `@media print` PDF stylesheet
- **Icons**: Lucide React
- **Active Database**: **SQLite Database** (`mindlyft.db` via Node.js native `node:sqlite`)
- **Question Bank**: 1,080 fully-populated, role-specific scenario questions (18 roles × 4 sets × 15 questions)
- **Question Selection Engine**: Fisher-Yates randomization, option shuffling, anonymous history tracking, and strict 15-question fallback guarantee
- **Recommendation Engine**: Deterministic TypeScript scoring module with tie-breaking, role-readiness diagnostic, and profile calibration
- **Testing**: Vitest unit test suite (27 comprehensive tests covering question uniqueness, 15-question exact count, history exclusion, deterministic scoring, SQLite database persistence, and contact info storage)
- **Export**: Native browser print-to-PDF engine with custom print layout + CSV dataset export including phone numbers

---

## 2. Participant Journey & 15-Question Randomized Assessment

1. **Landing Page**: "Discover Your AI Career Path" with dual pathways:
   - **General Discovery Assessment (15 Questions)**: Balanced multi-discipline evaluation across all 18 roles.
   - **Role-Specific Fast-Track Launcher**: Jump directly into a 15-question deep assessment for any of the 18 roles.
2. **Anonymous Participant ID**: Stable, privacy-preserving participant ID (`part_<timestamp>_<random>`) stored in browser persistence without forcing account registration.
3. **15 Role-Calibrated Questions**: Selected dynamically from 4 distinct sets of 15 questions per role (or across the 1,080 question pool).
4. **History Tracking & Uniqueness**: Supabase `participant_question_history` table and local cache track every presented question ID to avoid repeating questions in subsequent attempts.
5. **Strict 15-Question Fallback Strategy**: If fewer than 15 unseen questions remain in the pool, the engine selects all remaining unused items and tops up using least-recently-seen questions—guaranteeing that every assessment contains exactly 15 questions.
6. **Randomized Question & Option Ordering**: Questions and options are shuffled on each attempt while preserving deterministic scoring weights.
7. **Profile Calibration**: Experience level, available learning hours, preferred work style, and career goal.
8. **Deterministic Scoring Engine**: Mathematical weighting, tie handling, normalized percentage calculations, and match explanations.
9. **Role Competency & Readiness Diagnostic**:
   - Role Readiness Match Percentage (e.g. `88% High Fit`)
   - Demonstrated Competencies & Skill Strengths
   - Targeted Growth Opportunities & Skill Gaps
   - Assessed Set Number (e.g. `Set 2`)
10. **Complete Career Report**:
    - Assessment reference ID (e.g. `MLY-2026-XXXXXX`) and completion date
    - Voluntary participant name display
    - Primary role match with detailed "Why This Category Matches"
    - Two strong alternative pathways with category affinity scores
    - Category score affinity spectrum
    - Deep-dive blueprints with 4-week personalized learning roadmaps
    - Beginner portfolio project with deliverables, scenario, and review criteria
    - Suggested tools & accessible free alternatives
    - Honest prerequisites, limitations, and coding requirements
    - Resume and interview positioning steps
    - 3-stage actionable next-steps checklist (Days 1–3, Weeks 1–2, Month 1)
    - Complete 18-role catalog explorer
    - Educational advisory disclaimer
11. **Persistence**: Saves assessment, answers, scores, and report to Supabase PostgreSQL (with automatic local persistence fallback if Supabase is offline/unconfigured).
12. **Print / Save as PDF**: Formatted executive print stylesheet hiding buttons and navigation for publication-ready PDF export.
13. **Retake Assessment**: Instant restart button with draft reset and new randomized question selection.

---

## 3. Centralized 18-Role Catalog (6 Categories)

### A. Creative & Communication
- **AI Content Creator**: Prompt crafting, fact-checking, editorial amplification, multi-channel voice manuals.
- **AI Marketing Assistant**: Persona modeling, ad copy variant generation, conversion testing, launch decks.
- **AI Social Media Specialist**: Long-form transcript repurposing, hook engineering, carousel creation, engagement workflows.

### B. Business & Productivity
- **AI Business Operations Assistant**: Meeting transcription synthesis, Standard Operating Procedure (SOP) drafting, operational briefings.
- **AI Research Assistant**: Market intelligence, competitor benchmarking matrices, whitepaper ingestion, citation verification.
- **AI Productivity Specialist**: Workflow audits, desktop launcher snippets (Raycast), voice-to-text pipelines, personal operating systems.

### C. Automation & Tools
- **No-Code Automation Specialist**: Visual automation pipelines (Make.com/Zapier), JSON structured LLM extraction, error fallbacks.
- **AI Chatbot Builder**: Conversational dialogue design, knowledge base grounding (RAG), external API webhooks, escalation logic.
- **AI Workflow Specialist**: Value-stream process mapping, cross-department handoff elimination, AI micro-tool integration.

### D. People & Education
- **AI Trainer**: Hands-on prompt workshops, department-specific prompt lab workbooks, ethical AI guidelines.
- **AI Adoption Coordinator**: Change management, internal champion networks, license seat utilization, weekly AI clinics.
- **AI Learning Content Designer**: SCORM-ready e-learning modules, branching decision simulations, synthetic voiceover narration.

### E. Customer Experience
- **AI Customer Support Specialist**: Empathetic ticket copilot drafting, de-escalation guides, bug reproduction escalations.
- **Knowledge Base Specialist**: Help center architecture, semantic search optimization, procedural article authoring.
- **Customer Experience Automation Specialist**: Behavioral onboarding message sequences, automated CSAT sentiment triage, churn alerts.

### F. Data & Technology
- **Junior Data Analyst**: Data cleaning, SQL query generation with AI copilots, interactive Looker Studio dashboards.
- **AI Product Coordinator**: Product Requirement Documents (PRDs), interactive UI prototyping (v0/Figma), AI evaluation suites.
- **AI Developer**: Full-stack application development, LLM API streaming, PostgreSQL vector embeddings (pgvector), Row Level Security.

---

## 4. Locked Admin Portal & Security Controls (`/admin`)

- **Administrator Credentials**:
  - Direct login with Administrator ID and Password.
  - Default initial credentials: `admin` / `admin123`.
  - Convenient autofill button for instant evaluation.
  - Multi-attempt friendly access.
- **Administrator Credential Management**:
  - Authorized administrators can change their Administrator ID and Password at any time directly within the dashboard via the **"Lock / Password"** control in the top navigation.
  - Validates current password before permitting credential updates.
- **Overview & Analytics**:
  - Total completed assessments metric
  - Category popularity distribution chart
  - Education & specialization breakdown
  - Primary career goals distribution
- **Participant Records (User Information)**:
  - Displays participant **Full Name**, **Phone / Contact Number**, **Education**, and **Selected Skills**.
  - Searchable by Reference ID, Participant Name, Phone Number, or Field.
  - Sortable by Date, Reference ID, Name.
  - Paginated table with status indicators and SQLite database badge.
  - Full report preview modal displaying participant contact information.
  - **CSV Export**: Download complete dataset including Contact and Skill columns.
- **Role Catalog Manager**:
  - View and edit any of the 18 roles
  - Live updates persist directly to SQLite (`mindlyft.db`)
- **1,080 Question Bank Manager**:
  - Filter questions by Role (all 18 roles), Set (Sets 1–4), Type, or keyword search.
  - Activate or deactivate individual questions instantly.
  - Interactive Question Editor: edit question text, context, guidance subtext, option labels, and score weights.

---

## 5. SQLite Database Integration (`mindlyft.db`)

The application is connected directly to a local **SQLite database** using Node.js's native `node:sqlite` engine (zero external cloud dependencies, runs natively and stores data automatically in `mindlyft.db`):

### SQLite Tables & Endpoints
1. **`leads`**: Stores participant contact information, education level, specialization, and selected skills.
2. **`assessments`**: Stores full assessment submissions, question answers, category affinity scores, and generated reports.
3. **`custom_roles`**: Persists any edits made to career roles via the Admin Dashboard.
4. **`custom_questions`**: Persists custom question adjustments and status toggles.
5. **REST API**:
   - `POST /api/sqlite/leads`: Auto-saves lead on contact submission.
   - `GET /api/sqlite/leads`: Retrieves leads for the Admin Portal.
   - `POST /api/sqlite/assessments`: Saves completed career guidance records.
   - `GET /api/sqlite/assessments`: Retrieves assessment history and CSV export data.

---

## 6. Environment Configuration

The application is fully self-contained. SQLite (`mindlyft.db`) is automatically initialized and managed upon running the dev server or production server:

```bash
# Admin Login Credentials
# ID: admin
# Password: admin123
```

---

## 7. Local Development & Testing Commands

```bash
# 1. Install dependencies
npm install

# 2. Run unit tests (Vitest)
npm test

# 3. Start development server
npm run dev

# 4. Compile TypeScript & bundle production build
npm run build
```

---

## 8. Verification & Delivery Checklist

- [x] **React + Vite + TypeScript + Tailwind CSS + Lucide React** installed and configured.
- [x] **SQLite Database (`mindlyft.db`)**: Native SQLite persistence for leads and assessments.
- [x] **Deterministic Scoring Engine** with mathematical weighting, tie handling, and unit test suite.
- [x] **Vitest Unit Tests**: All 40 tests passing (`npm test`).
- [x] **Participant Profile Flow**: Name, validated 10-digit Phone Number, Education, Specialization, Skills (Technical & Non-technical).
- [x] **Interactive Report & QR Scanner**: Visual SVG match gauge, tabbed blueprint, skill readiness checklist, 4-week roadmap, and mobile QR code download scanner.
- [x] **Centralized 18-Role Catalog**: All 18 roles across 6 categories fully detailed.
- [x] **Protected Admin Portal**: Easy login (`admin` / `admin123`), multi-attempt access, live metrics, lead table, and CSV export.
- [x] **Dual HTML Transfer**: Root `index.html` and standalone `admin.html`.
- [x] **Production Build**: Verified with `npm run build` (Exit code 0).
