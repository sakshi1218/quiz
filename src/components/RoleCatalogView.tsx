import React, { useState } from 'react';
import { Search, BookOpen, Filter, ArrowRight, Code2, CheckCircle2, Sparkles } from 'lucide-react';
import { CAREER_CATEGORIES } from '../data/categories';
import { CAREER_ROLES } from '../data/roles';
import { CareerRole, CategoryCode, AssessmentTrack } from '../types';

interface RoleCatalogViewProps {
  initialTrack?: 'all' | 'technical' | 'non_technical';
  onSelectRole: (role: CareerRole) => void;
  onStartAssessment: (roleCode?: string, track?: AssessmentTrack) => void;
}

export const RoleCatalogView: React.FC<RoleCatalogViewProps> = ({
  initialTrack = 'all',
  onSelectRole,
  onStartAssessment
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryCode | 'all'>('all');
  const [trackFilter, setTrackFilter] = useState<'all' | 'technical' | 'non_technical'>(initialTrack);

  const filteredRoles = CAREER_ROLES.filter((role) => {
    // Track filter (Technical = data_tech & automation_tools; Non-Technical = creative_comm, business_ops, people_edu, customer_exp)
    const isTech = role.categoryCode === 'data_tech' || role.categoryCode === 'automation_tools';
    if (trackFilter === 'technical' && !isTech) return false;
    if (trackFilter === 'non_technical' && isTech) return false;

    // Category filter
    if (selectedCategory !== 'all' && role.categoryCode !== selectedCategory) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = role.title.toLowerCase().includes(q);
      const matchTagline = role.tagline.toLowerCase().includes(q);
      const matchSkills = role.requiredBeginnerSkills.some((s) => s.toLowerCase().includes(q));
      const matchTools = role.suggestedTools.primary.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchTagline || matchSkills || matchTools;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold border border-brand-200">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Master Career Repository</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Centralized 18-Role Catalog
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Explore complete structured descriptions, roadmaps, tool recommendations, and beginner projects across all specialized AI career categories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onStartAssessment()}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-violetAccent-600 hover:from-brand-500 hover:to-violetAccent-500 shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Career Guidance (5 Qs)</span>
          </button>
        </div>
      </div>

      {/* Filter Bar with Track Pills */}
      <div className="space-y-3">
        {/* Track Segmented Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setTrackFilter('all')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              trackFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Roles (18)
          </button>
          <button
            onClick={() => setTrackFilter('technical')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              trackFilter === 'technical'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-cyan-700'
            }`}
          >
            <span>Technical Track (6)</span>
          </button>
          <button
            onClick={() => setTrackFilter('non_technical')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              trackFilter === 'non_technical'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            <span>Non-Technical Track (12)</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search roles, tools, skills (e.g. Claude, Zapier, Python, Content)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/40 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {CAREER_CATEGORIES.map((c) => (
                <option key={c.id} value={c.code}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-brand-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                  {role.categoryTitle}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {role.codingNeeded ? 'Coding Path' : 'No-Code'}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-snug">{role.title}</h3>
                <p className="text-xs text-brand-700 font-medium mt-0.5">{role.tagline}</p>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {role.description}
              </p>

              {/* Tools chips */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Primary Tools:
                </span>
                <div className="flex flex-wrap gap-1">
                  {role.suggestedTools.primary.slice(0, 3).map((t, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => onSelectRole(role)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onStartAssessment(role.roleCode)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-brand-600" />
                <span>Career Guidance</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRoles.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
          <p className="text-sm font-semibold text-slate-700">No roles match your search filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setTrackFilter('all');
            }}
            className="text-xs text-brand-600 font-bold hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
