import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  Clock,
  Shield,
  Layers,
  Code2,
  Users,
  Briefcase,
  Headphones,
  Cpu,
  PenTool,
  Database,
  Printer,
  Terminal,
  Binary,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Workflow,
  Wand2,
  Zap
} from 'lucide-react';
import { CAREER_CATEGORIES } from '../data/categories';
import { CAREER_ROLES } from '../data/roles';
import { CareerRole, AssessmentTrack } from '../types';

interface LandingPageProps {
  onStartAssessment: (targetRoleCode?: string, track?: AssessmentTrack) => void;
  onExploreRole: (role: CareerRole) => void;
  onOpenCatalog: (track?: 'technical' | 'non_technical' | 'all') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onExploreRole,
  onOpenCatalog
}) => {
  const [showFullOverview, setShowFullOverview] = useState<boolean>(false);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'PenTool':
        return <PenTool className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5" />;
      case 'Database':
        return <Database className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-16 pb-10 overflow-hidden">
        {/* Subtle decorative background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-cyan-400/20 via-brand-300/20 to-emerald-400/20 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
            <span>Dynamic Career Guidance • Based on Education & Skills</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Find Your Ideal Career Pathway{' '}
              <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violetAccent-600 bg-clip-text text-transparent">
                Based on Your Background & Skills
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              No tests, quizzes, or exams. Answer 5 simple questions about your degree, specialization, and existing skills to instantly unlock personalized high-paying career options, learning roadmaps, and tools.
            </p>
          </div>

          {/* Single Prominent CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onStartAssessment()}
              id="start-career-guidance-btn"
              className="px-8 py-4 rounded-2xl text-base font-extrabold text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-violetAccent-600 hover:from-brand-500 hover:to-violetAccent-500 shadow-xl shadow-brand-500/25 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Start Career Guidance (5 Simple Questions)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Highlights bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-600" />
              Takes ~4 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              No registration or password required
            </span>
            <span className="flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5 text-violetAccent-600" />
              Instant Print / Save to PDF
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              Actionable 4-week roadmap
            </span>
          </div>

          {/* Expandable Overview Toggle */}
          <div className="pt-6">
            <button
              onClick={() => setShowFullOverview((prev) => !prev)}
              className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs hover:shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{showFullOverview ? 'Hide Full Platform Overview' : 'Explore Complete Platform Overview & Categories'}</span>
              {showFullOverview ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
          </div>
        </div>
      </section>

      {/* Collapsible Overview Section */}
      {showFullOverview && (
        <div className="space-y-16 animate-fadeIn">
          {/* The 6 Career Categories Overview */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Six Comprehensive AI Career Pathways
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                From creative storytelling and no-code automation to prompt facilitation and software engineering, find where you fit best in the emerging AI economy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CAREER_CATEGORIES.map((cat) => {
                const categoryRoles = CAREER_ROLES.filter((r) => r.categoryCode === cat.code);

                return (
                  <div
                    key={cat.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
                          {getCategoryIcon(cat.iconName)}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-base leading-snug">{cat.title}</h3>
                          <span className="text-[11px] font-medium text-brand-600 uppercase tracking-wider">
                            {categoryRoles.length} Roles Cataloged
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                        {cat.description}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                          Included Roles:
                        </span>
                        {categoryRoles.map((role) => (
                          <button
                            key={role.id}
                            onClick={() => onExploreRole(role)}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-brand-600 hover:bg-brand-50/60 transition-colors flex items-center justify-between group cursor-pointer"
                          >
                            <span className="truncate">{role.title}</span>
                            <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* How the Career Guidance Works */}
          <section className="bg-slate-100/70 border-y border-slate-200 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-3 mb-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  How MindLyft Career Guidance Works
                </h2>
                <p className="text-slate-600 text-sm max-w-xl mx-auto">
                  A transparent, interactive 3-step pathway matching your exact educational background and skills to real industry careers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-sm">
                    01
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Select Degree & Specialization</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Choose your qualification (B.Tech, MBA, B.Com, BCA, etc.) and your dynamic specialization to set your foundational academic context.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-violetAccent-100 text-violetAccent-700 font-bold flex items-center justify-center text-sm">
                    02
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Choose Skills & Interests</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Multi-select your current or desired tools across Programming, Data Analytics, AI/ML, Business, HR, and Marketing, plus your preferred work style.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                    03
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Get Tailored Careers & Roadmaps</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Instantly explore 5–8 high-paying matched career options, why they fit, missing skills to learn, recommended software, and step-by-step roadmaps.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Honest Principles & Ethics */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Our Commitment to Honest Career Guidance</h3>
                  <p className="text-xs text-slate-500">Realistic expectations for the artificial intelligence landscape</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>No False Guarantees:</strong> We never invent job placement promises, inflated salaries, or fake accredited certifications.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>No Coding Barrier:</strong> Non-technical paths never require software programming to get started.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Portfolio First:</strong> Every role comes with an actionable beginner portfolio project and clear completion criteria.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Total Privacy:</strong> Taking the assessment requires no account creation, no password, and no mandatory email.</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
