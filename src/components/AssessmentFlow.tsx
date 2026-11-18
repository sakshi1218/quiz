import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  User,
  Phone,
  GraduationCap,
  Layers,
  Heart,
  Briefcase,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Search,
  X,
  PenTool,
  Plus
} from 'lucide-react';
import {
  EducationQualification,
  CareerFieldInterest,
  PreferredCareerType,
  StudentProfileInput,
  CareerGuidanceResultData,
  AssessmentRecord
} from '../types';
import { generateDynamicCareerRecommendations } from '../engine/careerGuidanceEngine';
import { saveUserLeadToSqlite, saveAssessmentToSqlite } from '../services/sqliteClient';

interface AssessmentFlowProps {
  onGuidanceComplete: (result: CareerGuidanceResultData) => void;
  onCancel?: () => void;
}

const QUALIFICATION_OPTIONS: EducationQualification[] = [
  'BBA',
  'MBA',
  'B.Com',
  'BCA',
  'B.Tech',
  'MCA',
  'M.Tech',
  'Diploma',
  'BA',
  'B.Sc',
  'Other'
];

const SPECIALIZATION_MAP: Record<EducationQualification, string[]> = {
  MBA: [
    'Finance',
    'Marketing',
    'Human Resources',
    'Business Analytics',
    'Operations',
    'International Business',
    'Other'
  ],
  'B.Tech': [
    'Computer Science',
    'IT',
    'AI & Data Science',
    'Mechanical',
    'Electronics',
    'Civil',
    'Other'
  ],
  BBA: [
    'General Management',
    'Marketing',
    'Finance',
    'Human Resources',
    'Business Analytics',
    'Digital Business',
    'Other'
  ],
  'B.Com': [
    'Accounting & Finance',
    'Banking & Insurance',
    'Taxation',
    'Corporate Finance',
    'General Commerce',
    'Other'
  ],
  BCA: [
    'Software Development',
    'Data Science & Analytics',
    'Web Development',
    'Cloud Computing',
    'Cyber Security',
    'Other'
  ],
  MCA: [
    'Software Engineering',
    'Data Science & AI',
    'Cloud & DevOps',
    'Database Systems',
    'Other'
  ],
  'M.Tech': [
    'Computer Science',
    'AI & Machine Learning',
    'VLSI & Embedded Systems',
    'Thermal Engineering',
    'Structural Engineering',
    'Other'
  ],
  Diploma: [
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical & Electronics',
    'Computer Engineering',
    'Automobile Engineering',
    'Other'
  ],
  BA: [
    'Economics',
    'English & Literature',
    'Journalism & Mass Comm',
    'Psychology',
    'Political Science',
    'Other'
  ],
  'B.Sc': [
    'Mathematics',
    'Statistics',
    'Physics',
    'Chemistry',
    'Computer Science',
    'Biology / Life Sciences',
    'Other'
  ],
  Other: [
    'General / Interdisciplinary',
    'Management Studies',
    'Technical Studies',
    'Applied Sciences',
    'Other'
  ]
};

export interface SkillCategoryItem {
  categoryName: string;
  badge: string;
  track: 'technical' | 'non_technical';
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategoryItem[] = [
  // --- TECHNICAL SKILLS ---
  {
    categoryName: 'Programming & Web Development',
    badge: '💻 Code / Tech',
    track: 'technical',
    skills: [
      'Python',
      'Java',
      'C++',
      'JavaScript',
      'TypeScript',
      'HTML/CSS',
      'React',
      'Node.js',
      'C#',
      'Git & GitHub'
    ]
  },
  {
    categoryName: 'Data Analytics & Business Intelligence',
    badge: '📊 Data / Tech',
    track: 'technical',
    skills: [
      'Excel',
      'SQL',
      'Power BI',
      'Tableau',
      'Pandas',
      'NumPy',
      'Statistics',
      'ETL Pipelines',
      'Looker',
      'Data Warehousing'
    ]
  },
  {
    categoryName: 'AI, Machine Learning & Generative AI',
    badge: '🤖 AI / Tech',
    track: 'technical',
    skills: [
      'Machine Learning',
      'Generative AI',
      'LangChain',
      'RAG',
      'Deep Learning',
      'Prompt Engineering',
      'NLP',
      'Computer Vision',
      'Hugging Face'
    ]
  },
  {
    categoryName: 'Cloud, DevOps & Databases',
    badge: '☁️ Cloud / Tech',
    track: 'technical',
    skills: [
      'MySQL',
      'PostgreSQL',
      'MongoDB',
      'AWS',
      'Microsoft Azure',
      'Google Cloud',
      'Docker',
      'Linux',
      'Redis'
    ]
  },
  {
    categoryName: 'Cybersecurity & Systems',
    badge: '🛡️ Security / Tech',
    track: 'technical',
    skills: [
      'Network Security',
      'Ethical Hacking',
      'SOC Analysis',
      'Information Security',
      'Cryptography',
      'Firewalls & VPNs'
    ]
  },

  // --- NON-TECHNICAL & BUSINESS SKILLS ---
  {
    categoryName: 'Business, Finance & Strategy',
    badge: '💼 Non-Tech / Business',
    track: 'non_technical',
    skills: [
      'Business Analysis',
      'Financial Analysis',
      'Financial Modeling',
      'Market Research',
      'Project Management',
      'Agile / Scrum',
      'Product Management',
      'Risk Management',
      'Strategic Planning'
    ]
  },
  {
    categoryName: 'Marketing, Growth & Social Media',
    badge: '📱 Non-Tech / Growth',
    track: 'non_technical',
    skills: [
      'SEO',
      'Digital Marketing',
      'Google Analytics',
      'CRM (HubSpot/Salesforce)',
      'Social Media Strategy',
      'Content Marketing',
      'Meta & Google Ads',
      'Email Marketing',
      'Brand Strategy'
    ]
  },
  {
    categoryName: 'HR & People Operations',
    badge: '👥 Non-Tech / People',
    track: 'non_technical',
    skills: [
      'HR Analytics',
      'Recruitment & Sourcing',
      'Talent Management',
      'Employee Relations',
      'HRIS Software',
      'Training & Development',
      'Payroll & Compliance',
      'Performance Management'
    ]
  },
  {
    categoryName: 'Operations, Logistics & Supply Chain',
    badge: '📦 Non-Tech / Ops',
    track: 'non_technical',
    skills: [
      'Operations Management',
      'Supply Chain Management',
      'Logistics Planning',
      'Process Optimization',
      'Vendor Management',
      'Quality Management (Six Sigma)'
    ]
  },
  {
    categoryName: 'Design, Content & Communication',
    badge: '🎨 Non-Tech / Creative',
    track: 'non_technical',
    skills: [
      'UI/UX Design',
      'Figma',
      'Copywriting & Content Writing',
      'Graphic Design',
      'Video Editing',
      'Technical Writing',
      'Public Speaking & Pitching',
      'Client Negotiation'
    ]
  }
];

const CAREER_INTERESTS: CareerFieldInterest[] = [
  'Data & Analytics',
  'Artificial Intelligence',
  'Business & Management',
  'Finance',
  'Marketing',
  'Human Resources',
  'Software Development',
  'Research',
  'Operations',
  'Cybersecurity',
  'Other'
];

const PREFERRED_CAREER_TYPES: { id: PreferredCareerType; label: string; desc: string }[] = [
  { id: 'Technical', label: 'Technical', desc: 'Hands-on coding, systems architecture, model engineering, or infrastructure' },
  { id: 'Non-Technical', label: 'Non-Technical', desc: 'Creative strategy, marketing, client relations, and people operations' },
  { id: 'Business-Oriented', label: 'Business-Oriented', desc: 'Financial planning, management consulting, and business analysis' },
  { id: 'Hybrid (Technical + Business)', label: 'Hybrid (Tech + Business)', desc: 'Bridging tech tools (SQL, BI, Python) with commercial business decisions' }
];

export function validatePhoneNumber(phoneNumber: string): { isValid: boolean; message?: string } {
  const trimmed = phoneNumber.trim();
  if (!trimmed) {
    return { isValid: false, message: 'Please enter your phone number.' };
  }

  // Check for invalid characters (only +, -, digits, spaces, parentheses allowed)
  if (!/^[+\d\s\-()]+$/.test(trimmed)) {
    return { isValid: false, message: 'Phone number can only contain digits, spaces, and + or -.' };
  }

  // Extract pure digits
  const digits = trimmed.replace(/\D/g, '');

  if (digits.length < 10) {
    return {
      isValid: false,
      message: `Phone number is too short (${digits.length}/10 digits). Please enter a valid 10-digit number.`
    };
  }

  if (digits.length > 15) {
    return { isValid: false, message: 'Phone number cannot exceed 15 digits.' };
  }

  // Check repeated digits like 0000000000, 1111111111, 9999999999
  if (/^(\d)\1{9,}$/.test(digits)) {
    return { isValid: false, message: 'Please enter a genuine, active phone number.' };
  }

  // If 10 digits (Standard Indian Mobile format)
  if (digits.length === 10) {
    if (!/^[6-9]/.test(digits)) {
      return { isValid: false, message: '10-digit mobile number must start with 6, 7, 8, or 9.' };
    }
  }

  // If 11 digits starting with 0 (e.g. 09876543210)
  if (digits.length === 11 && digits.startsWith('0')) {
    const withoutZero = digits.slice(1);
    if (!/^[6-9]/.test(withoutZero)) {
      return { isValid: false, message: 'Mobile number must start with 6, 7, 8, or 9.' };
    }
  }

  // If 12 digits starting with 91 (+91 Indian country code)
  if (digits.length === 12 && digits.startsWith('91')) {
    const without91 = digits.slice(2);
    if (!/^[6-9]/.test(without91)) {
      return { isValid: false, message: 'Indian mobile number (+91) must start with 6, 7, 8, or 9.' };
    }
  }

  return { isValid: true };
}

export const AssessmentFlow: React.FC<AssessmentFlowProps> = ({
  onGuidanceComplete,
  onCancel
}) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [qualification, setQualification] = useState<EducationQualification | ''>('');
  const [customQualification, setCustomQualification] = useState<string>('');
  const [specialization, setSpecialization] = useState<string>('');
  const [customSpecialization, setCustomSpecialization] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkillInput, setCustomSkillInput] = useState<string>('');
  const [careerInterest, setCareerInterest] = useState<CareerFieldInterest | ''>('');
  const [customCareerInterest, setCustomCareerInterest] = useState<string>('');
  const [preferredCareerType, setPreferredCareerType] = useState<PreferredCareerType | ''>('');
  const [skillFilter, setSkillFilter] = useState<'all' | 'technical' | 'non_technical'>('all');
  const [skillSearch, setSkillSearch] = useState<string>('');

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // When qualification changes, reset specialization so user chooses explicitly
  const handleQualificationChange = (newQual: EducationQualification) => {
    setQualification(newQual);
    setSpecialization('');
    setCustomSpecialization('');
    setValidationError(null);
  };

  const toggleSkill = (skill: string) => {
    setValidationError(null);
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = () => {
    const trimmed = customSkillInput.trim();
    if (!trimmed) return;
    if (!selectedSkills.includes(trimmed)) {
      setSelectedSkills([...selectedSkills, trimmed]);
    }
    setCustomSkillInput('');
  };

  // Auto-sync lead data to SQLite as soon as name and/or phone are typed or blurred
  const autoSyncLeadToSqlite = (overrideName?: string, overridePhone?: string) => {
    const curName = (overrideName !== undefined ? overrideName : name).trim();
    const curPhone = (overridePhone !== undefined ? overridePhone : phone).trim();
    if (!curName && !curPhone) return;

    // If phone number is present, ensure it passes validation before saving to SQLite
    if (curPhone && !validatePhoneNumber(curPhone).isValid) {
      return;
    }

    const displayQual = qualification === 'Other' && customQualification.trim()
      ? customQualification.trim()
      : qualification || null;
    const displaySpec = specialization === 'Other' && customSpecialization.trim()
      ? customSpecialization.trim()
      : specialization || null;

    saveUserLeadToSqlite({
      name: curName || null,
      phone: curPhone || null,
      backgroundField: displayQual ? `${displayQual} - ${displaySpec || 'General'}` : null,
      educationLevel: displayQual,
      existingSkills: selectedSkills,
      careerGoal: careerInterest || null
    }).catch(() => {});
  };

  const handleFindCareer = async () => {
    if (!name.trim()) {
      setValidationError('Please enter your name.');
      return;
    }
    if (!phone.trim()) {
      setValidationError('Please enter your phone number.');
      return;
    }
    const phoneCheck = validatePhoneNumber(phone);
    if (!phoneCheck.isValid) {
      setValidationError(phoneCheck.message || 'Please enter a valid phone number.');
      return;
    }
    if (!qualification) {
      setValidationError('Please select your educational qualification in Question 1.');
      return;
    }
    if (qualification === 'Other' && !customQualification.trim()) {
      setValidationError('Please specify your educational qualification in the text box.');
      return;
    }
    if (!specialization) {
      setValidationError('Please select your specialization in Question 2.');
      return;
    }
    if (specialization === 'Other' && !customSpecialization.trim()) {
      setValidationError('Please specify your specialization in the text box.');
      return;
    }
    if (selectedSkills.length === 0) {
      setValidationError('Please select at least 1 or 2 skills in Question 3.');
      return;
    }
    if (!careerInterest) {
      setValidationError('Please select which field interests you the most in Question 4.');
      return;
    }
    if (careerInterest === 'Other' && !customCareerInterest.trim()) {
      setValidationError('Please specify your career interest in the text box.');
      return;
    }
    if (!preferredCareerType) {
      setValidationError('Please select your preferred career type in Question 5.');
      return;
    }

    setValidationError(null);
    setIsSubmitting(true);

    const displayQual = qualification === 'Other' && customQualification.trim()
      ? customQualification.trim()
      : qualification;
    const displaySpec = specialization === 'Other' && customSpecialization.trim()
      ? customSpecialization.trim()
      : specialization;

    const studentProfile: StudentProfileInput = {
      name: name.trim() || undefined,
      phone: phone.trim() || undefined,
      qualification: qualification as EducationQualification,
      customQualification: customQualification.trim() || undefined,
      specialization,
      customSpecialization: customSpecialization.trim() || undefined,
      selectedSkills,
      careerInterest: careerInterest as CareerFieldInterest,
      customCareerInterest: customCareerInterest.trim() || undefined,
      preferredCareerType: preferredCareerType as PreferredCareerType
    };

    // 1. Generate dynamic career options
    const guidanceResult = generateDynamicCareerRecommendations(studentProfile);
    const topCareer = guidanceResult.recommendedCareers?.[0];

    // 2. Save student lead to SQLite user_leads table
    try {
      await saveUserLeadToSqlite({
        name: studentProfile.name,
        phone: studentProfile.phone,
        backgroundField: `${displayQual} - ${displaySpec}`,
        educationLevel: displayQual,
        existingSkills: selectedSkills,
        careerGoal: careerInterest
      });
    } catch (e) {
      // safe fallback
    }

    // 3. Save full assessment record to SQLite assessments table
    try {
      const assessmentRecord: AssessmentRecord = {
        id: `rec-${guidanceResult.referenceId}`,
        referenceId: guidanceResult.referenceId,
        participantName: studentProfile.name || null,
        phoneNumber: studentProfile.phone || null,
        backgroundField: `${displayQual} - ${displaySpec}`,
        educationLevel: displayQual,
        existingSkills: selectedSkills,
        experienceLevel: 'student',
        learningTime: 'flexible',
        workStyle: studentProfile.preferredCareerType,
        careerGoal: studentProfile.careerInterest,
        track: studentProfile.preferredCareerType.includes('Technical') ? 'technical' : 'non_technical',
        primaryCategory: studentProfile.careerInterest,
        primaryRole: topCareer ? topCareer.careerName : 'Dynamic Career Guidance',
        scores: [],
        status: 'completed',
        createdAt: new Date().toISOString()
      };
      await saveAssessmentToSqlite(assessmentRecord);
    } catch (e) {
      // safe fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onGuidanceComplete(guidanceResult);
    }, 400);
  };

  const availableSpecializations = qualification
    ? (SPECIALIZATION_MAP[qualification as EducationQualification] || ['Other'])
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>Dynamic Career Guidance • No Tests • No Exams</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Find Your Ideal Career Pathways
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          Answer 5 simple questions about your degree, specialization, and skills. Our recommendation engine will dynamically map 5–8 high-paying career options tailored specifically to your profile.
        </p>

        {/* Contact info bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Your Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setValidationError(null);
                }}
                onBlur={(e) => autoSyncLeadToSqlite(e.target.value, undefined)}
                placeholder="e.g. Rahul Sharma"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Phone Number <span className="text-brand-600 font-normal normal-case">(10 digits)</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const sanitized = e.target.value.replace(/[^0-9+\s\-()]/g, '');
                  setPhone(sanitized);
                  setValidationError(null);
                }}
                onBlur={(e) => {
                  const val = e.target.value.trim();
                  if (val) {
                    const check = validatePhoneNumber(val);
                    if (!check.isValid) {
                      setValidationError(check.message || 'Invalid phone number.');
                    } else {
                      autoSyncLeadToSqlite(undefined, val);
                    }
                  }
                }}
                placeholder="e.g. 98765 43210 or +91 98765 43210"
                maxLength={18}
                className={`w-full pl-9 pr-8 py-2 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                  phone.trim() && !validatePhoneNumber(phone).isValid && validationError?.toLowerCase().includes('phone')
                    ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400/30'
                    : phone.trim() && validatePhoneNumber(phone).isValid
                    ? 'border-emerald-400 bg-emerald-50/20 focus:ring-emerald-400/30'
                    : 'border-slate-200 bg-slate-50/50 focus:ring-brand-500/30'
                }`}
              />
              {phone.trim() && validatePhoneNumber(phone).isValid && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 flex items-center">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
              )}
            </div>
            {phone.trim() && !validatePhoneNumber(phone).isValid && (
              <p className="text-[11px] text-rose-600 mt-1 font-medium">
                {validatePhoneNumber(phone).message}
              </p>
            )}
            {phone.trim() && validatePhoneNumber(phone).isValid && (
              <p className="text-[11px] text-emerald-600 mt-1 font-medium flex items-center gap-1">
                <span>✓ Valid phone number</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Validation Message */}
      {validationError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Question 1: Educational Qualification */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="space-y-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-600 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" />
            <span>Question 1 of 5</span>
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            What is your current educational qualification?
          </h2>
          <p className="text-xs text-slate-500">Select your highest or currently pursuing degree program.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 pt-1">
          {QUALIFICATION_OPTIONS.map((qual) => {
            const isSelected = qualification === qual;
            return (
              <button
                key={qual}
                type="button"
                onClick={() => handleQualificationChange(qual)}
                className={`py-3 px-3 rounded-2xl text-xs font-bold text-center border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/30 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {qual}
              </button>
            );
          })}
        </div>

        {/* Writing Option if "Other" qualification is selected */}
        {qualification === 'Other' && (
          <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200 space-y-1.5 animate-fadeIn">
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-brand-900 flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-brand-600" />
              <span>Specify Your Educational Qualification:</span>
            </label>
            <input
              type="text"
              value={customQualification}
              onChange={(e) => setCustomQualification(e.target.value)}
              placeholder="Type your degree / diploma here (e.g. LL.B, B.Des, MBBS, B.Ed, M.Sc, PhD)..."
              autoFocus
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-300 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
          </div>
        )}
      </div>

      {/* Question 2: Specialization (Dynamic based on Question 1) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="space-y-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Question 2 of 5</span>
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            {qualification
              ? `What is your specialization in ${qualification === 'Other' && customQualification ? customQualification : qualification}?`
              : 'What is your specialization?'}
          </h2>
          <p className="text-xs text-slate-500">
            {qualification
              ? 'Specialization options are dynamically updated based on your selected qualification.'
              : 'Please select your educational qualification in Question 1 first to view specializations.'}
          </p>
        </div>

        {!qualification ? (
          <div className="p-6 rounded-2xl bg-slate-50/80 border border-dashed border-slate-300 text-center text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">No Qualification Selected Yet</p>
            <p>Select your degree/qualification in Question 1 above to reveal dynamic specialization choices.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
            {availableSpecializations.map((spec) => {
              const isSelected = specialization === spec;
              return (
                <button
                  key={spec}
                  type="button"
                  onClick={() => {
                    setSpecialization(spec);
                    setValidationError(null);
                  }}
                  className={`p-3.5 rounded-2xl text-xs font-semibold text-left border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/70 text-brand-950 font-bold ring-2 ring-brand-500/25 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>{spec}</span>
                  {isSelected && <Check className="w-4 h-4 text-brand-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Writing Option if "Other" specialization is selected */}
        {specialization === 'Other' && (
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1.5 animate-fadeIn">
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-blue-600" />
              <span>Specify Your Specialization:</span>
            </label>
            <input
              type="text"
              value={customSpecialization}
              onChange={(e) => setCustomSpecialization(e.target.value)}
              placeholder="Type your specialization here (e.g. Biomedical, Cybersecurity, Fashion Design, Cloud Architecture)..."
              autoFocus
              className="w-full px-3.5 py-2.5 rounded-xl border border-blue-300 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>
        )}
      </div>

      {/* Question 3: Skills you have or want to learn (Multi-select by category) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-600 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>Question 3 of 5</span>
                </span>
                <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                  {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                Which skills do you currently have or want to learn?
              </h2>
              <p className="text-xs text-slate-500">
                Explore comprehensive technical and non-technical options. Multi-select as many skills as you want.
              </p>
            </div>

            {selectedSkills.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedSkills([])}
                className="text-xs text-rose-600 font-semibold hover:underline self-start sm:self-center cursor-pointer"
              >
                Clear all selected ({selectedSkills.length})
              </button>
            )}
          </div>

          {/* Quick Track Switcher & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-fit">
              <button
                type="button"
                onClick={() => setSkillFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  skillFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Skills (80+)
              </button>
              <button
                type="button"
                onClick={() => setSkillFilter('technical')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  skillFilter === 'technical'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-blue-700'
                }`}
              >
                <span>💻 Technical (45+)</span>
              </button>
              <button
                type="button"
                onClick={() => setSkillFilter('non_technical')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  skillFilter === 'non_technical'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                <span>💼 Non-Technical (40+)</span>
              </button>
            </div>

            {/* Instant Search Bar */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search skills (e.g. Python, SEO, Excel, Figma)..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              />
              {skillSearch && (
                <button
                  type="button"
                  onClick={() => setSkillSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Selected Skills Chips Strip */}
        {selectedSkills.length > 0 && (
          <div className="p-3 rounded-2xl bg-brand-50/50 border border-brand-100/80 space-y-1.5">
            <span className="text-[11px] font-bold text-brand-900 block">
              Currently Selected Skills ({selectedSkills.length}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedSkills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-brand-200 text-brand-800 text-xs font-semibold shadow-2xs"
                >
                  <span>{s}</span>
                  <button
                    type="button"
                    onClick={() => toggleSkill(s)}
                    className="hover:text-rose-600 ml-0.5 cursor-pointer"
                    title={`Remove ${s}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4 pt-1">
          {SKILL_CATEGORIES.map((cat) => {
            // Track tab filter
            if (skillFilter !== 'all' && cat.track !== skillFilter) return null;

            // Search query filter
            let visibleSkills = cat.skills;
            if (skillSearch.trim()) {
              const q = skillSearch.toLowerCase().trim();
              const matched = cat.skills.filter((s) => s.toLowerCase().includes(q));
              if (matched.length === 0 && !cat.categoryName.toLowerCase().includes(q)) {
                return null;
              }
              if (matched.length > 0) {
                visibleSkills = matched;
              }
            }

            return (
              <div key={cat.categoryName} className="space-y-2 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-800">{cat.categoryName}</span>
                    <span className="text-[10px] text-slate-500 font-medium">({cat.badge})</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    cat.track === 'technical'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {cat.track === 'technical' ? 'Technical' : 'Non-Technical'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {visibleSkills.map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs ring-2 ring-slate-900/20'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <span>{skill}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {/* Custom / Other Skill Writing Option */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-purple-600" />
              <span>Have another skill not listed above?</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type any custom skill (e.g. Kotlin, Rust, Solidity, AutoCAD, Salesforce)..."
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomSkill();
                  }
                }}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 bg-white"
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Question 4: Career Field Interest */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="space-y-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
            <Heart className="w-4 h-4" />
            <span>Question 4 of 5</span>
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            Which field interests you the most?
          </h2>
          <p className="text-xs text-slate-500">Pick the primary industry or functional area you are drawn to.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-1">
          {CAREER_INTERESTS.map((interest) => {
            const isSelected = careerInterest === interest;
            return (
              <button
                key={interest}
                type="button"
                onClick={() => {
                  setCareerInterest(interest);
                  setValidationError(null);
                }}
                className={`p-3 rounded-2xl text-xs font-bold text-center border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/30 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>

        {/* Writing Option if "Other" career interest is selected */}
        {careerInterest === 'Other' && (
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5 animate-fadeIn">
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-rose-600" />
              <span>Specify Your Career Interest:</span>
            </label>
            <input
              type="text"
              value={customCareerInterest}
              onChange={(e) => setCustomCareerInterest(e.target.value)}
              placeholder="Type your area of interest (e.g. Healthcare Tech, Game Development, Space Tech, Legal Tech)..."
              autoFocus
              className="w-full px-3.5 py-2.5 rounded-xl border border-rose-300 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
            />
          </div>
        )}
      </div>

      {/* Question 5: Preferred Career Type */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="space-y-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4" />
            <span>Question 5 of 5</span>
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            What type of career would you prefer?
          </h2>
          <p className="text-xs text-slate-500">Indicate whether you prefer pure coding, non-tech, commercial, or hybrid work.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {PREFERRED_CAREER_TYPES.map((type) => {
            const isSelected = preferredCareerType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => {
                  setPreferredCareerType(type.id);
                  setValidationError(null);
                }}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer space-y-1 ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50/70 text-brand-950 ring-2 ring-brand-500/25 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{type.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-brand-600" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">{type.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Action Button: Find My Career */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            ← Back to Home
          </button>
        )}

        <button
          type="button"
          onClick={handleFindCareer}
          disabled={isSubmitting}
          id="find-my-career-btn"
          className="w-full sm:w-auto px-10 py-4 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-violetAccent-600 hover:from-brand-500 hover:to-violetAccent-500 shadow-lg shadow-brand-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Analyzing Your Career Pathways...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Find My Career</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
