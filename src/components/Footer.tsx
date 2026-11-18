import React from 'react';
import { Sparkles, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-8 mt-20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-500 to-violetAccent-500 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">MindLyft AI</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Empowering professionals, career changers, and students to discover their ideal niche in the artificial intelligence economy through deterministic role matching, four-week roadmaps, and actionable portfolio projects.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>No mandatory registration • Privacy-first • Deterministic recommendations</span>
            </div>
          </div>

          {/* Col 2: Six Pathways */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">AI Career Pathways</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition-colors">Creative & Communication</li>
              <li className="hover:text-white transition-colors">Business & Productivity</li>
              <li className="hover:text-white transition-colors">Automation & Tools</li>
              <li className="hover:text-white transition-colors">People & Education</li>
              <li className="hover:text-white transition-colors">Customer Experience</li>
              <li className="hover:text-white transition-colors">Data & Technology</li>
            </ul>
          </div>

          {/* Col 3: Technology & Architecture */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Architecture</h4>
            <ul className="space-y-2 text-xs">
              <li>React 18 + TypeScript</li>
              <li>SQLite Database (mindlyft.db)</li>
              <li>Deterministic Recommendation Engine</li>
              <li>Browser Print-to-PDF Engine</li>
              <li>Admin Analytics Dashboard</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 text-xs text-slate-400 space-y-2">
          <p className="leading-relaxed">
            <strong className="text-slate-400">Important Advisory & Disclaimer:</strong> The MindLyft AI Career Discovery Platform provides career exploration recommendations, learning roadmaps, and portfolio project frameworks based on self-reported survey answers. It does not constitute a psychometric test, psychological evaluation, formal credential, or guarantee of employment, job placement, interview opportunities, or salary levels.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-[11px] text-slate-400 gap-2">
            <p>© {new Date().getFullYear()} MindLyft AI. Built with state-of-the-art web engineering.</p>
            <p className="flex items-center gap-1">
              Crafted for continuous learning & professional empowerment
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
