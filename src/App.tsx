import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AssessmentFlow } from './components/AssessmentFlow';
import { ReportPage } from './components/ReportPage';
import { RoleCatalogView } from './components/RoleCatalogView';
import { RoleDetailModal } from './components/RoleDetailModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CareerReportData, CareerRole, AssessmentTrack, CareerGuidanceResultData } from './types';
import { getAssessmentReport } from './services/assessmentService';
import { getCurrentAdminUser, signOutAdmin, AdminUser } from './services/authService';
import { AlertCircle, Database, Sparkles, X } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'assessment' | 'report' | 'catalog' | 'admin'>('assessment');
  const [activeReport, setActiveReport] = useState<CareerReportData | null>(null);
  const [guidanceResult, setGuidanceResult] = useState<CareerGuidanceResultData | null>(null);
  const [inspectedRole, setInspectedRole] = useState<CareerRole | null>(null);
  const [targetRoleCode, setTargetRoleCode] = useState<string | undefined>(undefined);
  const [targetTrack, setTargetTrack] = useState<AssessmentTrack | undefined>(undefined);
  const [catalogInitialTrack, setCatalogInitialTrack] = useState<'all' | 'technical' | 'non_technical'>('all');
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [showConfigNotice, setShowConfigNotice] = useState<boolean>(false);

  // Check for saved report or admin session on mount
  useEffect(() => {
    // 1. Check admin session
    getCurrentAdminUser().then((user) => {
      if (user) setAdminUser(user);
    });

    // 2. Check last active report
    const lastRef = localStorage.getItem('mindlyft_last_active_ref');
    if (lastRef) {
      getAssessmentReport(lastRef).then((report) => {
        if (report) setActiveReport(report);
      });
    }

    // 3. Handle URL query param: ?ref=MLY-XXXXXX
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view');
    if (viewParam === 'landing' || viewParam === 'catalog' || viewParam === 'assessment') {
      setCurrentView(viewParam);
    }

    const refParam = urlParams.get('ref');
    if (refParam) {
      getAssessmentReport(refParam).then((report) => {
        if (report) {
          setActiveReport(report);
          setCurrentView('report');
        }
      });
    }

    const isExplicitAdmin =
      window.location.pathname === '/admin' ||
      window.location.pathname.endsWith('/admin') ||
      window.location.pathname.includes('admin.html') ||
      window.location.hash === '#admin' ||
      urlParams.has('admin');

    if (isExplicitAdmin) {
      setCurrentView('admin');
    }
  }, []);

  const handleAssessmentCompleted = (report: CareerReportData) => {
    setActiveReport(report);
    setCurrentView('report');
    // Update URL quietly with ref ID
    window.history.replaceState({}, '', `?ref=${report.referenceId}`);
  };

  const handleGuidanceCompleted = (result: CareerGuidanceResultData) => {
    setGuidanceResult(result);
    setCurrentView('report');
    window.history.replaceState({}, '', `?ref=${result.referenceId}`);
  };

  const handleStartAssessment = (targetRole?: string, track?: AssessmentTrack) => {
    if (track) {
      localStorage.removeItem('mindlyft_assessment_draft_state_v2');
    }
    setTargetRoleCode(targetRole);
    setTargetTrack(track);
    setCurrentView('assessment');
  };

  const handleRetakeAssessment = () => {
    localStorage.removeItem('mindlyft_assessment_draft_state_v2');
    setTargetRoleCode(undefined);
    setTargetTrack(undefined);
    setGuidanceResult(null);
    setActiveReport(null);
    setCurrentView('assessment');
  };

  const handleOpenCatalog = (track?: 'technical' | 'non_technical' | 'all') => {
    setCatalogInitialTrack(track || 'all');
    setCurrentView('catalog');
  };

  const handleLogoutAdmin = async () => {
    await signOutAdmin();
    setAdminUser(null);
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
      {/* Optional Configuration Notice (Local Evaluation Mode Banner) */}
      {showConfigNotice && (
        <div className="no-print bg-slate-900 text-slate-200 px-4 py-2.5 text-xs border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 max-w-5xl mx-auto">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
            <p>
              <strong>MindLyft AI Active Database:</strong> Connected directly to <strong>SQLite database</strong> (<code className="bg-slate-800 text-brand-300 px-1 py-0.5 rounded font-mono">mindlyft.db</code>). Assessments, participant contact information (name & phone number), and question records are securely stored to SQLite.
            </p>
          </div>
          <button
            onClick={() => setShowConfigNotice(false)}
            className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Global Navbar - Hidden when viewing Admin portal */}
      {currentView !== 'admin' && (
        <Navbar
          currentView={currentView}
          onNavigate={(view) => {
            if (view === 'catalog') {
              setCatalogInitialTrack('all');
            }
            setCurrentView(view);
          }}
          hasActiveReport={Boolean(activeReport)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onStartAssessment={handleStartAssessment}
            onExploreRole={(role) => setInspectedRole(role)}
            onOpenCatalog={handleOpenCatalog}
          />
        )}

        {currentView === 'assessment' && (
          <AssessmentFlow
            onGuidanceComplete={handleGuidanceCompleted}
            onCancel={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'report' && (guidanceResult || activeReport) && (
          <ReportPage
            guidanceResult={guidanceResult || undefined}
            report={activeReport || undefined}
            onRetakeAssessment={handleRetakeAssessment}
            onExploreRole={(role) => setInspectedRole(role)}
          />
        )}

        {currentView === 'catalog' && (
          <RoleCatalogView
            initialTrack={catalogInitialTrack}
            onSelectRole={(role) => setInspectedRole(role)}
            onStartAssessment={handleStartAssessment}
          />
        )}

        {currentView === 'admin' && (
          adminUser ? (
            <AdminDashboard
              adminUser={adminUser}
              onLogout={handleLogoutAdmin}
              onPreviewReport={(report) => {
                setActiveReport(report);
                setCurrentView('report');
              }}
            />
          ) : (
            <AdminLogin
              onLoginSuccess={(user) => setAdminUser(user)}
              onCancel={() => {
                if (window.location.pathname.includes('admin')) {
                  window.location.href = './index.html';
                } else {
                  setCurrentView('landing');
                }
              }}
            />
          )
        )}
      </main>

      {/* Global Role Detail Blueprint Modal */}
      <RoleDetailModal
        role={inspectedRole}
        onClose={() => setInspectedRole(null)}
        onStartAssessment={handleStartAssessment}
      />

      {/* Global Footer - Hidden when viewing Admin portal */}
      {currentView !== 'admin' && <Footer />}
    </div>
  );
}

export default App;
