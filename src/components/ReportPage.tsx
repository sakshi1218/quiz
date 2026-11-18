import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Printer,
  RotateCcw,
  Share2,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Target,
  Lightbulb,
  Briefcase,
  TrendingUp,
  Zap,
  Award,
  GraduationCap,
  Building2,
  Compass,
  ArrowRight,
  Calendar,
  Clock,
  BookOpen,
  Layers,
  FileText,
  Code2,
  FolderGit2,
  Check,
  Plus,
  QrCode,
  DollarSign,
  BarChart3,
  Activity,
  CheckSquare,
  Square,
  SlidersHorizontal,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import {
  CareerGuidanceResultData,
  RecommendedCareerOption,
  CareerReportData,
  CareerRole
} from '../types';
import { ReportQrCode } from './ReportQrCode';

interface ReportPageProps {
  guidanceResult?: CareerGuidanceResultData;
  report?: CareerReportData;
  onRetakeAssessment: () => void;
  onExploreRole?: (role: CareerRole) => void;
}

type ActiveSectionTab = 'overview' | 'skills' | 'roadmap' | 'projects' | 'adjacencies';

export const ReportPage: React.FC<ReportPageProps> = ({
  guidanceResult,
  report,
  onRetakeAssessment
}) => {
  const [selectedCareerId, setSelectedCareerId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<ActiveSectionTab>('overview');
  const [copiedLink, setCopiedLink] = useState(false);

  // Interactive skill targets added by student in real time
  const [interactivePlannedSkills, setInteractivePlannedSkills] = useState<string[]>([]);
  // Expandable roadmap phases
  const [expandedPhaseIndex, setExpandedPhaseIndex] = useState<number>(0);

  // Interactive filters and sorting
  const [careerTypeFilter, setCareerTypeFilter] = useState<string>('all');
  const [careerSortBy, setCareerSortBy] = useState<'match' | 'salary' | 'ease'>('match');

  // Interactive salary tenure slider (0 = Entry, 1 = Mid 1-2y, 2 = Lead 3y+)
  const [salaryExpLevel, setSalaryExpLevel] = useState<number>(0);

  // Interactive roadmap completion checkboxes
  const [completedRoadmapPhases, setCompletedRoadmapPhases] = useState<number[]>([]);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // optional
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const careers: RecommendedCareerOption[] = guidanceResult?.recommendedCareers || [];

  useEffect(() => {
    if (careers.length > 0 && !selectedCareerId) {
      setSelectedCareerId(careers[0].id);
    }
  }, [careers, selectedCareerId]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const togglePlannedSkill = (skill: string) => {
    const isAdding = !interactivePlannedSkills.includes(skill);
    if (isAdding) {
      setInteractivePlannedSkills([...interactivePlannedSkills, skill]);
      try {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // ignore
      }
    } else {
      setInteractivePlannedSkills(interactivePlannedSkills.filter((s) => s !== skill));
    }
  };

  const togglePhaseCompletion = (idx: number) => {
    if (completedRoadmapPhases.includes(idx)) {
      setCompletedRoadmapPhases(completedRoadmapPhases.filter((i) => i !== idx));
    } else {
      const next = [...completedRoadmapPhases, idx];
      setCompletedRoadmapPhases(next);
      if (next.length === 4) {
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.5 }
          });
        } catch (e) {
          // ignore
        }
      }
    }
  };

  // If classic report fallback is provided without guidanceResult
  if (!guidanceResult && report) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200">
          <h2 className="text-xl font-bold">{report.primaryRole.title}</h2>
          <p className="text-sm text-slate-600">{report.primaryRole.tagline}</p>
          <button onClick={onRetakeAssessment} className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold">
            Retake Guidance
          </button>
        </div>
      </div>
    );
  }

  const student = guidanceResult?.studentProfile;
  const activeCareer = careers.find((c) => c.id === selectedCareerId) || careers[0];

  const displayQualification = student?.qualification === 'Other' && student.customQualification
    ? student.customQualification
    : student?.qualification;
  const displaySpecialization = student?.specialization === 'Other' && student.customSpecialization
    ? student.customSpecialization
    : student?.specialization;
  const displayCareerInterest = student?.careerInterest === 'Other' && student.customCareerInterest
    ? student.customCareerInterest
    : student?.careerInterest;

  // Filtered & sorted careers
  const filteredCareers = careers
    .filter((c) => {
      if (careerTypeFilter === 'all') return true;
      return c.careerType === careerTypeFilter;
    })
    .sort((a, b) => {
      if (careerSortBy === 'salary') {
        const getAvg = (s: string) => {
          const m = s.match(/[\d.]+/g);
          return m && m.length > 1 ? (parseFloat(m[0]) + parseFloat(m[1])) / 2 : 10;
        };
        return getAvg(b.salaryRange) - getAvg(a.salaryRange);
      }
      if (careerSortBy === 'ease') {
        return b.skillsStudentHas.length - a.skillsStudentHas.length;
      }
      return b.matchScore - a.matchScore;
    });

  // Dynamic match percentage recalculation when student marks skills as planned
  const baseMatch = activeCareer?.matchScore || 85;
  const missingTotal = activeCareer?.skillsToLearn?.length || 1;
  const plannedCount = activeCareer?.skillsToLearn?.filter((s) => interactivePlannedSkills.includes(s)).length || 0;
  const boost = Math.round((plannedCount / Math.max(missingTotal, 1)) * (100 - baseMatch));
  const dynamicScore = Math.min(100, baseMatch + boost);

  // Dynamic salary numbers based on interactive experience level slider
  const parseLpaRange = (salaryStr?: string) => {
    if (!salaryStr) return { min: 8.5, max: 17 };
    const m = salaryStr.match(/[\d.]+/g);
    if (m && m.length >= 2) return { min: parseFloat(m[0]), max: parseFloat(m[1]) };
    if (m && m.length === 1) return { min: parseFloat(m[0]), max: parseFloat(m[0]) * 1.8 };
    return { min: 8.5, max: 17 };
  };

  const careerRange = parseLpaRange(activeCareer?.salaryRange);
  const baselineRange = parseLpaRange(guidanceResult?.existingRoleBaseline?.traditionalPackage);

  const tenureMultipliers = [1.0, 1.35, 1.85];
  const mult = tenureMultipliers[salaryExpLevel] || 1.0;

  const currentSuggestedMin = (careerRange.min * mult).toFixed(1);
  const currentSuggestedMax = (careerRange.max * mult).toFixed(1);
  const currentBaselineMin = (baselineRange.min * (salaryExpLevel === 0 ? 1.0 : salaryExpLevel === 1 ? 1.25 : 1.55)).toFixed(1);
  const currentBaselineMax = (baselineRange.max * (salaryExpLevel === 0 ? 1.0 : salaryExpLevel === 1 ? 1.25 : 1.55)).toFixed(1);

  // Approximate monthly take-home (LPA / 12 * ~0.88 for tax/PF deductions)
  const monthlySuggestedMin = Math.round((parseFloat(currentSuggestedMin) * 100000) / 12 * 0.88);
  const monthlySuggestedMax = Math.round((parseFloat(currentSuggestedMax) * 100000) / 12 * 0.88);
  const monthlyBaselineMin = Math.round((parseFloat(currentBaselineMin) * 100000) / 12 * 0.94);
  const monthlyBaselineMax = Math.round((parseFloat(currentBaselineMax) * 100000) / 12 * 0.94);

  // Width percentages for the visual dual-bar chart
  const maxPossibleLpa = 40;
  const suggestedBarWidth = Math.min(100, Math.round((parseFloat(currentSuggestedMax) / maxPossibleLpa) * 100));
  const baselineBarWidth = Math.min(100, Math.round((parseFloat(currentBaselineMax) / maxPossibleLpa) * 100));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print-container animate-fadeIn">
      {/* 1. Dedicated Mobile Scanner & Download Component */}
      <ReportQrCode
        referenceId={guidanceResult?.referenceId || 'MLY-REPORT'}
        studentName={student?.name}
        primaryRoleTitle={activeCareer?.careerName || 'Recommended Career Pathway'}
        onPrint={handlePrint}
      />

      {/* 2. Visual Student Profile Summary Strip */}
      {student && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-brand-600" />
              <span>Verified Candidate Discovery Profile</span>
            </span>

            {student.name && (
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                👤 {student.name} {student.phone ? `(${student.phone})` : ''}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Stream & Degree</span>
              <span className="text-sm font-black text-slate-900 mt-1 block truncate">
                {displayQualification} — {displaySpecialization}
              </span>
            </div>

            <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-200 flex flex-col justify-between">
              <span className="text-blue-600 block text-[10px] uppercase font-bold tracking-wider">Target Domain</span>
              <span className="text-sm font-black text-blue-900 mt-1 block truncate">
                {displayCareerInterest}
              </span>
            </div>

            <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-200 flex flex-col justify-between">
              <span className="text-purple-600 block text-[10px] uppercase font-bold tracking-wider">Work Model</span>
              <span className="text-sm font-black text-purple-900 mt-1 block truncate">
                {student.preferredCareerType}
              </span>
            </div>

            <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200 flex flex-col justify-between">
              <span className="text-emerald-700 block text-[10px] uppercase font-bold tracking-wider">Skill Portfolio</span>
              <span className="text-sm font-black text-emerald-900 mt-1 block">
                {student.selectedSkills.length} Skills Logged
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Interactive Visual Salary & Package Growth Visualizer */}
      {guidanceResult?.existingRoleBaseline && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  Visual Package & Salary Growth Simulator
                </span>
                <span className="text-xs font-black text-emerald-400">
                  {guidanceResult.existingRoleBaseline.averageHike} Package Hike
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Package Comparison: Suggested High-Growth Role vs Conventional Baseline
              </h3>
            </div>

            {/* Interactive Tenure Switcher */}
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl border border-white/10 self-start sm:self-auto text-xs font-bold">
              {[
                { level: 0, label: 'Entry Level (0-1y)' },
                { level: 1, label: '1-2y Specialist' },
                { level: 2, label: '3y+ Lead' }
              ].map((t) => (
                <button
                  key={t.level}
                  onClick={() => setSalaryExpLevel(t.level)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    salaryExpLevel === t.level
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Horizontal Dual-Bar Chart */}
          <div className="space-y-4">
            {/* Suggested Career Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  Suggested Career: <strong>{activeCareer?.careerName}</strong>
                </span>
                <span className="text-emerald-300 font-black text-sm">
                  ₹{currentSuggestedMin} – {currentSuggestedMax} LPA
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-4 p-0.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2 text-[10px] font-black text-slate-950"
                  style={{ width: `${Math.max(suggestedBarWidth, 25)}%` }}
                >
                  Target Package
                </div>
              </div>
            </div>

            {/* Traditional Conventional Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                  Conventional Traditional Role: {guidanceResult.existingRoleBaseline.traditionalRoleName}
                </span>
                <span className="text-slate-400 font-bold">
                  ₹{currentBaselineMin} – {currentBaselineMax} LPA
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-3 p-0.5 overflow-hidden">
                <div
                  className="bg-slate-500 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${Math.max(baselineBarWidth, 15)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Visual Mini Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                💰
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Monthly In-Hand</span>
                <span className="text-sm font-black text-emerald-300">
                  ₹{monthlySuggestedMin.toLocaleString()} – {monthlySuggestedMax.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black">
                ⚡
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Monthly Income Boost</span>
                <span className="text-sm font-black text-purple-300">
                  +₹{(monthlySuggestedMin - monthlyBaselineMin).toLocaleString()} /mo Extra
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center font-black">
                🚀
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Package Growth Multiple</span>
                <span className="text-sm font-black text-white">
                  {(parseFloat(currentSuggestedMax) / parseFloat(currentBaselineMax)).toFixed(1)}x Higher Package
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Interactive Recommended Career Pathways Selector */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="w-6 h-6 text-brand-600" />
              <span>Recommended Career Pathways ({filteredCareers.length})</span>
            </h2>
            <p className="text-xs text-slate-500">
              Interactive matching cards: Click any role to instantly inspect visual skill readiness, weekly roadmap, and starter projects.
            </p>
          </div>

          {/* Interactive Filters & Sorters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Filter by Type */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {[
                { key: 'all', label: 'All Roles' },
                { key: 'Hybrid (Technical + Business)', label: 'Hybrid' },
                { key: 'Technical', label: 'Technical' },
                { key: 'Business-Oriented', label: 'Business' }
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setCareerTypeFilter(f.key)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    careerTypeFilter === f.key
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sort by */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {[
                { key: 'match', label: '🎯 Match' },
                { key: 'salary', label: '💰 Package' },
                { key: 'ease', label: '⚡ Transition' }
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => setCareerSortBy(s.key as any)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    careerSortBy === s.key
                      ? 'bg-brand-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Career Selection Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 no-print">
          {filteredCareers.map((career, idx) => {
            const isSelected = career.id === activeCareer?.id;
            return (
              <button
                key={career.id}
                onClick={() => {
                  setSelectedCareerId(career.id);
                  setActiveTab('overview');
                }}
                className={`p-5 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl ring-2 ring-brand-500/40 scale-[1.01]'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-brand-400 hover:bg-slate-50/80 shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-white/15 text-brand-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      #{idx + 1} &bull; {career.primaryDomain}
                    </span>
                    <span className={`text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      isSelected ? 'bg-emerald-400/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      <span>{career.matchScore}% Match</span>
                    </span>
                  </div>

                  <h3 className={`text-base font-black line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {career.careerName}
                  </h3>
                  <p className={`text-xs line-clamp-2 leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {career.careerDescription}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100/20 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className={`font-black ${isSelected ? 'text-emerald-300' : 'text-emerald-700'}`}>
                      💰 {career.salaryRange}
                    </span>
                    {career.packageHikePercentage && (
                      <span className={`font-black text-[10px] px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-emerald-400/20 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {career.packageHikePercentage}
                      </span>
                    )}
                  </div>
                  {career.existingJobRoleSalary && (
                    <div className={`flex items-center justify-between text-[11px] ${
                      isSelected ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <span>vs Traditional: <span className="line-through">{career.existingJobRoleSalary}</span></span>
                      <span className={`font-bold flex items-center gap-0.5 ${isSelected ? 'text-brand-300' : 'text-brand-600'}`}>
                        <span>Explore</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Active Career In-Depth Interactive View */}
      {activeCareer && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
          {/* Active Career Hero Banner with Circular Progress Ring */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-brand-50 text-brand-800 border border-brand-200">
                  {activeCareer.primaryDomain}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200">
                  {activeCareer.careerType}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-2xs">
                  <span>💰 Suggested Package: {activeCareer.salaryRange}</span>
                  {activeCareer.packageHikePercentage && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px]">
                      {activeCareer.packageHikePercentage}
                    </span>
                  )}
                </span>
                {activeCareer.existingJobRoleSalary && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                    Traditional Role: <span className="line-through">{activeCareer.existingJobRoleSalary}</span>
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {activeCareer.careerName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-medium">
                {activeCareer.careerDescription}
              </p>
            </div>

            {/* Circular Gauge / Score Widget */}
            <div className="shrink-0 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-brand-50/50 border border-brand-100 flex items-center gap-4">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-brand-600 transition-all duration-700 ease-out"
                    strokeDasharray={`${dynamicScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-sm font-black text-slate-900">{dynamicScore}%</span>
                </div>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Readiness Score</span>
                <span className="text-xs font-bold text-slate-900 block">
                  {dynamicScore >= 90 ? '🌟 Highly Ready' : '🎯 Strong Candidate'}
                </span>
                {plannedCount > 0 && (
                  <span className="text-[10px] text-emerald-600 font-bold block">
                    +{boost}% with planned skills
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-print border-b border-slate-100 text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Overview & Fit Analysis</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'skills'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Interactive Skills Simulator ({activeCareer.requiredSkills.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'roadmap'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>4-Week Roadmap ({completedRoadmapPhases.length}/4 Done)</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'projects'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Project Studio ({activeCareer.suggestedProjects.length})</span>
            </button>

            {activeCareer.adjacentCareersUnlocked && activeCareer.adjacentCareersUnlocked.length > 0 && (
              <button
                onClick={() => setActiveTab('adjacencies')}
                className={`px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'adjacencies'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-purple-700 hover:bg-purple-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Career Multipliers ({activeCareer.adjacentCareersUnlocked.length})</span>
              </button>
            )}
          </div>

          {/* TAB 1: OVERVIEW & FIT ANALYSIS (HIGHLY VISUAL) */}
          {(activeTab === 'overview' || typeof window === 'undefined') && (
            <div className="space-y-6 animate-fadeIn">
              {/* Visual Domain Match Spectrum (4 Progress Gauges) */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-brand-600" />
                    <span>Visual Fit & Alignment Breakdown</span>
                  </h4>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                    Overall {dynamicScore}% High Affinity
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                  {/* Metric 1 */}
                  <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700 font-bold">🎓 Academic Background Alignment</span>
                      <span className="text-brand-700 font-black">95%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-600 h-full rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700 font-bold">🛠️ Core Skill Overlap</span>
                      <span className="text-emerald-700 font-black">{Math.min(98, 70 + activeCareer.skillsStudentHas.length * 8)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full"
                        style={{ width: `${Math.min(98, 70 + activeCareer.skillsStudentHas.length * 8)}%` }}
                      />
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700 font-bold">💼 Industry Demand Trajectory</span>
                      <span className="text-purple-700 font-black">94%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full rounded-full" style={{ width: '94%' }} />
                    </div>
                  </div>

                  {/* Metric 4 */}
                  <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700 font-bold">🎯 Work Preference Harmony</span>
                      <span className="text-amber-700 font-black">96%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-600 h-full rounded-full" style={{ width: '96%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Why This Career Matches Badge */}
              <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200/90 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="space-y-1 text-xs">
                  <span className="font-black text-brand-950 uppercase tracking-wide">Strategic Profile Synthesis:</span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {activeCareer.whyThisMatches}
                  </p>
                </div>
              </div>

              {/* Tools & Hiring Sectors Visual Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-brand-600" />
                    <span>Recommended Tools & Platforms</span>
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeCareer.recommendedSoftwareAndTools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 font-mono text-xs font-bold text-slate-800 shadow-2xs hover:border-brand-400 hover:text-brand-600 transition-colors"
                      >
                        ⚡ {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    <span>Industry Demand & Target Employers</span>
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {activeCareer.industryOpportunities}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE SKILLS SIMULATOR */}
          {activeTab === 'skills' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Header with Visual Real-Time Boost Indicator */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-black text-slate-900">Interactive Skill Simulator</h4>
                  <p className="text-xs text-slate-500">
                    Click any missing skill to add it to your learning plan and watch your live readiness score increase!
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black">
                    ✓ {activeCareer.skillsStudentHas.length} Mastered
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-black">
                    ⚡ {activeCareer.skillsToLearn.length} To Learn
                  </span>
                </div>
              </div>

              {/* Live Competency Meter Gauges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-brand-50/40 border border-brand-200/80 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-700">Domain Acumen</span>
                    <span className="text-brand-800">92%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-brand-600 h-full rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-700">Tool Fluency</span>
                    <span className="text-amber-800">{Math.min(100, 65 + plannedCount * 12)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, 65 + plannedCount * 12)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-700">Hiring Probability</span>
                    <span className="text-emerald-800">{dynamicScore}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${dynamicScore}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mastered Skills */}
                <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200 space-y-3">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Skills You Already Have ({activeCareer.skillsStudentHas.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeCareer.skillsStudentHas.map((sk, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-xs font-bold text-emerald-900 shadow-2xs flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        <span>{sk}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills (Interactive Toggle) */}
                <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-3">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Skills to Learn Next (Click to Simulate Boost)</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeCareer.skillsToLearn.map((sk, i) => {
                      const isPlanned = interactivePlannedSkills.includes(sk);
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => togglePlannedSkill(sk)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-2xs ${
                            isPlanned
                              ? 'bg-amber-600 text-white border-amber-600 ring-2 ring-amber-500/30'
                              : 'bg-white text-amber-950 border-amber-300 hover:border-amber-400 hover:bg-amber-100/50'
                          }`}
                        >
                          {isPlanned ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : (
                            <Plus className="w-3.5 h-3.5 text-amber-700" />
                          )}
                          <span>{sk}</span>
                          {isPlanned && <span className="text-[10px] bg-black/20 px-1 rounded font-black">+Planned</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STEP-BY-STEP ROADMAP TIMELINE WITH INTERACTIVE PHASE CHECKBOXES */}
          {activeTab === 'roadmap' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Overall Progress Meter */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-black text-slate-900">Interactive 4-Week Career Pathway</h4>
                    <p className="text-xs text-slate-500">
                      Track your learning progress by ticking off completed milestones!
                    </p>
                  </div>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-brand-100 text-brand-800">
                    {completedRoadmapPhases.length} of {activeCareer.learningRoadmap.length} Completed
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-600 h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.round((completedRoadmapPhases.length / Math.max(activeCareer.learningRoadmap.length, 1)) * 100)}%`
                    }}
                  />
                </div>
              </div>

              {/* Visual Vertical Stepper Timeline */}
              <div className="space-y-3">
                {activeCareer.learningRoadmap.map((step, idx) => {
                  const isExpanded = expandedPhaseIndex === idx;
                  const isCompleted = completedRoadmapPhases.includes(idx);

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        isCompleted
                          ? 'border-emerald-300 bg-emerald-50/20 shadow-2xs'
                          : isExpanded
                          ? 'border-brand-500 bg-brand-50/20 shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="p-4 flex items-center justify-between gap-3">
                        <div
                          onClick={() => setExpandedPhaseIndex(isExpanded ? -1 : idx)}
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          <span className={`w-9 h-9 rounded-xl font-black flex items-center justify-center text-xs transition-colors ${
                            isCompleted
                              ? 'bg-emerald-600 text-white'
                              : isExpanded
                              ? 'bg-brand-600 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {isCompleted ? '✓' : `0${idx + 1}`}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-black text-slate-900">{step.phase}</h5>
                              {isCompleted && (
                                <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                  Done
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 font-medium">{step.duration} commitment</span>
                          </div>
                        </div>

                        {/* Interactive Phase Toggle Button */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => togglePhaseCompletion(idx)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                              isCompleted
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {isCompleted ? (
                              <>
                                <CheckSquare className="w-3.5 h-3.5" />
                                <span>Completed</span>
                              </>
                            ) : (
                              <>
                                <Square className="w-3.5 h-3.5" />
                                <span>Mark Done</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => setExpandedPhaseIndex(isExpanded ? -1 : idx)}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="px-5 pb-5 pt-1 space-y-3 border-t border-slate-100 text-xs">
                          <div>
                            <strong className="text-slate-800 block mb-0.5">Primary Focus:</strong>
                            <p className="text-slate-600 leading-relaxed font-medium">{step.focus}</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white border border-brand-200 text-brand-950 flex items-start gap-2">
                            <Target className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-brand-900 block">Deliverable Milestone:</strong>
                              <span>{step.milestone}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECT STUDIO (VISUAL 3-STAGE PIPELINES) */}
          {activeTab === 'projects' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-black text-slate-900">Hands-On Portfolio Project Studio</h4>
                <p className="text-xs text-slate-500">
                  Build these verified projects to stand out to hiring managers with tangible, end-to-end proof of competence.
                </p>
              </div>

              <div className="space-y-4">
                {activeCareer.suggestedProjects.map((proj, pIdx) => (
                  <div key={pIdx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase text-brand-600 tracking-wider">
                          Portfolio Project #{pIdx + 1}
                        </span>
                        <h4 className="text-base font-black text-slate-900">{proj.projectTitle}</h4>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {proj.toolsUsed.map((t, ti) => (
                          <span key={ti} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                            🛠️ {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Visual 3-Step Project Pipeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Step 1: Ingestion</span>
                        <p className="text-slate-800 font-bold">Data & Ledger Setup</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                        <span className="text-[10px] font-bold text-brand-600 uppercase">Step 2: Processing</span>
                        <p className="text-slate-800 font-bold">Querying & Modeling</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">Step 3: Output</span>
                        <p className="text-slate-800 font-bold">Executive Dashboard</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-medium">{proj.description}</p>

                    <div className="p-3.5 rounded-xl bg-white border border-emerald-200 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-slate-800">Final Deliverable:</span>
                        <span className="text-slate-600 font-medium">{proj.deliverable}</span>
                      </div>
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Portfolio Ready
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ADJACENT CAREER MULTIPLIERS (VISUAL CARDS & READINESS) */}
          {activeTab === 'adjacencies' && activeCareer.adjacentCareersUnlocked && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
                <h4 className="text-sm font-black text-purple-950">Fast-Track Adjacent Career Pathways</h4>
                <p className="text-xs text-purple-800">
                  By mastering just 1 or 2 extra skills, you immediately become eligible for these adjacent high-paying roles:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCareer.adjacentCareersUnlocked.map((adj, aIdx) => (
                  <div key={aIdx} className="p-5 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-3 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-black text-purple-600 uppercase tracking-wider">Adjacent Role #{aIdx + 1}</span>
                          <h5 className="text-base font-black text-slate-900">{adj.adjacentCareerName}</h5>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full block">
                            💰 {adj.salaryRange}
                          </span>
                          {adj.packageHikePercentage && (
                            <span className="text-[10px] font-black text-emerald-700 block mt-1">
                              {adj.packageHikePercentage}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Visual Readiness Meter */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-600">{adj.transitionEase}</span>
                          <span className="text-purple-700 font-black">{adj.readinessPercentage}% Readiness</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                            style={{ width: `${adj.readinessPercentage}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{adj.whyThisIsClose}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-xs space-y-1.5">
                      <span className="text-[10px] font-black text-purple-700 uppercase block tracking-wider">Extra Skills Needed:</span>
                      <div className="flex flex-wrap gap-1">
                        {adj.extraSkillsToAdd.map((sk, ski) => (
                          <span key={ski} className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-900 font-bold text-[11px] border border-purple-200">
                            + {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. High-Impact Skill Multipliers Visual Overview */}
      {guidanceResult?.highImpactSkillsToLearn && guidanceResult.highImpactSkillsToLearn.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="space-y-0.5">
              <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 inline-flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-purple-600" />
                <span>High-Impact Skill Multipliers</span>
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-2">
                Learn 1 Extra Skill, Unlock 4+ Adjacent Careers
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              These high-leverage skills bridge your current profile to adjacent industries with maximum salary growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guidanceResult.highImpactSkillsToLearn.map((hi, hIdx) => (
              <div
                key={hIdx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{hi.category}</span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      +{hi.careersUnlockedCount} Careers
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900">{hi.skillName}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{hi.whyItExpandsOptions}</p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-200 text-xs">
                  <span className="font-bold text-slate-700 block text-[10px] uppercase">Unlocks Careers Like:</span>
                  <div className="flex flex-wrap gap-1">
                    {hi.unlockedCareers.map((cName, cIdx) => (
                      <span key={cIdx} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-medium text-[10px]">
                        {cName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Footer Navigation Bar */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
        <p>
          <strong>MindLyft AI Career Report:</strong> Generated dynamically based on your qualifications and skills.
        </p>
        <button
          onClick={onRetakeAssessment}
          className="px-4 py-2 rounded-xl text-xs font-bold text-brand-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake Career Guidance</span>
        </button>
      </div>
    </div>
  );
};