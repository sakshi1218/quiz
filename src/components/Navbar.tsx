import React, { useState } from 'react';
import { Sparkles, Compass, BookOpen, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'assessment' | 'report' | 'catalog' | 'admin';
  onNavigate: (view: 'landing' | 'assessment' | 'report' | 'catalog' | 'admin') => void;
  hasActiveReport: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, hasActiveReport }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: 'landing' | 'assessment' | 'report' | 'catalog' | 'admin') => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNav('assessment')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-violetAccent-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-brand-700 to-violetAccent-700 bg-clip-text text-transparent">
                MindLyft <span className="text-brand-600 font-bold text-xs uppercase px-1.5 py-0.5 rounded bg-brand-50 border border-brand-200 ml-1">AI</span>
              </span>
              <p className="text-[10px] text-slate-500 -mt-1 font-medium tracking-wide">Career Discovery Platform</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              id="nav-overview-btn"
              onClick={() => handleNav('landing')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'landing'
                  ? 'bg-brand-50 text-brand-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Overview
            </button>

            <button
              id="nav-catalog-btn"
              onClick={() => handleNav('catalog')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'catalog'
                  ? 'bg-brand-50 text-brand-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Role Catalog (18)
            </button>

            {hasActiveReport && (
              <button
                id="nav-report-btn"
                onClick={() => handleNav('report')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentView === 'report'
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Compass className="w-4 h-4" />
                My Report
              </button>
            )}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            {currentView !== 'assessment' && (
              <button
                onClick={() => handleNav('assessment')}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-violetAccent-600 hover:from-brand-500 hover:to-violetAccent-500 shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30 transition-all flex items-center gap-1.5 active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Career Guidance
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => handleNav('landing')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Overview
          </button>
          <button
            onClick={() => handleNav('catalog')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            18 Roles Catalog
          </button>
          {hasActiveReport && (
            <button
              onClick={() => handleNav('report')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              My Career Report
            </button>
          )}
          <div className="pt-2">
            <button
              onClick={() => handleNav('assessment')}
              className="w-full py-2.5 rounded-xl text-center text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-violetAccent-600 shadow-md cursor-pointer"
            >
              Start Career Guidance
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
