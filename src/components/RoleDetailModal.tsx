import React from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Briefcase,
  Target,
  FileText,
  AlertTriangle,
  Clock,
  ArrowRight,
  Code2
} from 'lucide-react';
import { CareerRole } from '../types';

interface RoleDetailModalProps {
  role: CareerRole | null;
  onClose: () => void;
  onStartAssessment?: (roleCode: string) => void;
}

export const RoleDetailModal: React.FC<RoleDetailModalProps> = ({ role, onClose, onStartAssessment }) => {
  if (!role) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 border-b border-slate-100 pb-5 pr-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
              {role.categoryTitle}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {role.codingNeeded ? 'Coding Required' : 'No Coding Required'}
            </span>
          </div>

          <h3 className="text-2xl font-extrabold text-slate-900">{role.title}</h3>
          <p className="text-sm font-medium text-brand-700">{role.tagline}</p>
          <p className="text-xs text-slate-600 leading-relaxed pt-1">{role.description}</p>
        </div>

        {/* Typical Responsibilities */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Typical Responsibilities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            {role.typicalResponsibilities.map((resp, i) => (
              <div key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{resp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-brand-50/50 border border-brand-100 space-y-2">
            <span className="font-bold text-brand-900 block">Required Beginner Skills:</span>
            <ul className="space-y-1 text-slate-700">
              {role.requiredBeginnerSkills.map((skill, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-brand-500 font-bold">•</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-violetAccent-50/50 border border-violetAccent-100 space-y-2">
            <span className="font-bold text-violetAccent-900 block">Skills to Develop Next:</span>
            <ul className="space-y-1 text-slate-700">
              {role.skillsToDevelopNext.map((skill, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-violetAccent-500 font-bold">•</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Suggested Tools */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <span className="font-bold text-slate-900 block">Suggested Software Stack:</span>
          <div className="flex flex-wrap gap-1.5">
            {role.suggestedTools.primary.map((t, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-semibold text-slate-800">
                {t}
              </span>
            ))}
            {role.suggestedTools.alternatives.map((t, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 4-Week Roadmap */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-600" />
            <span>Four-Week Learning Roadmap</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {role.fourWeekRoadmap.map((wk) => (
              <div key={wk.week} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <span className="font-bold text-brand-700 text-[11px]">Week {wk.week}: {wk.title}</span>
                <p className="text-slate-600">{wk.focus}</p>
                <p className="text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-100">
                  <strong>Deliverable:</strong> {wk.deliverable}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Project */}
        <div className="p-4 rounded-xl bg-brand-50/60 border border-brand-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-brand-900">Beginner Portfolio Project: {role.portfolioProject.title}</span>
            <span className="text-slate-500">Est. {role.portfolioProject.estimatedHours}</span>
          </div>
          <p className="text-slate-700">{role.portfolioProject.scenario}</p>
        </div>

        {/* Honest Limitations */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
          <span className="font-bold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Prerequisites & Limitations
          </span>
          <p className="text-amber-800 leading-relaxed">{role.limitationsAndPrerequisites}</p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close Blueprint
          </button>

          {onStartAssessment && (
            <button
              onClick={() => {
                onClose();
                onStartAssessment(role.roleCode);
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-violetAccent-600 hover:from-brand-500 hover:to-violetAccent-500 shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Start Career Guidance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
