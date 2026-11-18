import React, { useState, useEffect } from 'react';
import {
  Shield,
  LogOut,
  Download,
  Search,
  Filter,
  BarChart3,
  Layers,
  FileText,
  Users,
  Compass,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Edit3,
  Save,
  RotateCcw,
  Sparkles,
  Database,
  ArrowUpDown,
  BookOpen,
  Eye,
  X,
  Key,
  Lock,
  ShieldCheck,
  AlertCircle,
  Phone
} from 'lucide-react';
import { AdminUser, signOutAdmin, updateAdminCredentials } from '../../services/authService';
import {
  adminFetchAssessments,
  adminExportAssessmentsCSV,
  getActiveRoles,
  saveRoleUpdate,
  getAllBankQuestions,
  saveQuestionUpdate,
  toggleQuestionStatus
} from '../../services/assessmentService';
import { AssessmentRecord, CareerRole, CareerReportData, QuizQuestion } from '../../types';
import { QUIZ_QUESTIONS } from '../../data/questions';
import { CAREER_CATEGORIES } from '../../data/categories';
import { CAREER_ROLES } from '../../data/roles';

interface AdminDashboardProps {
  adminUser: AdminUser;
  onLogout: () => void;
  onPreviewReport: (report: CareerReportData) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  onLogout,
  onPreviewReport
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'records' | 'catalog' | 'questions'>('analytics');
  const [records, setRecords] = useState<AssessmentRecord[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'createdAt' | 'referenceId' | 'participantName'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLocalMode, setIsLocalMode] = useState<boolean>(false);

  // Catalog management state
  const [rolesList, setRolesList] = useState<CareerRole[]>([]);
  const [editingRole, setEditingRole] = useState<CareerRole | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Selected assessment record preview modal
  const [selectedRecord, setSelectedRecord] = useState<AssessmentRecord | null>(null);

  // Question Bank management state (1,080 questions)
  const [bankQuestions, setBankQuestions] = useState<QuizQuestion[]>([]);
  const [questionRoleFilter, setQuestionRoleFilter] = useState<string>('all');
  const [questionSetFilter, setQuestionSetFilter] = useState<string>('all');
  const [questionTypeFilter, setQuestionTypeFilter] = useState<string>('all');
  const [questionSearch, setQuestionSearch] = useState<string>('');
  const [questionPage, setQuestionPage] = useState<number>(1);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [questionActionMsg, setQuestionActionMsg] = useState<string | null>(null);

  // Security & Credentials modal state
  const [showSecurityModal, setShowSecurityModal] = useState<boolean>(false);
  const [currentPasswordInput, setCurrentPasswordInput] = useState<string>('');
  const [newAdminIdInput, setNewAdminIdInput] = useState<string>(adminUser.email || '');
  const [newPasswordInput, setNewPasswordInput] = useState<string>('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('');
  const [securityModalMsg, setSecurityModalMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [securityUpdating, setSecurityUpdating] = useState<boolean>(false);

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityModalMsg(null);

    if (newPasswordInput !== confirmPasswordInput) {
      setSecurityModalMsg({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    if (newPasswordInput.length < 6) {
      setSecurityModalMsg({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    setSecurityUpdating(true);
    try {
      const res = await updateAdminCredentials(currentPasswordInput, newAdminIdInput, newPasswordInput);
      if (res.success) {
        setSecurityModalMsg({
          type: 'success',
          text: 'Administrator ID & Password updated successfully! Use these new credentials for future logins.'
        });
        setCurrentPasswordInput('');
        setNewPasswordInput('');
        setConfirmPasswordInput('');
        setTimeout(() => {
          setShowSecurityModal(false);
          setSecurityModalMsg(null);
        }, 2500);
      } else {
        setSecurityModalMsg({ type: 'error', text: res.error || 'Failed to update credentials.' });
      }
    } catch (err: any) {
      setSecurityModalMsg({ type: 'error', text: err.message || 'Error updating credentials.' });
    } finally {
      setSecurityUpdating(false);
    }
  };

  useEffect(() => {
    loadAssessments();
    setRolesList(getActiveRoles());
    setBankQuestions(getAllBankQuestions());
  }, [searchQuery, sortBy, sortOrder, currentPage]);

  const handleToggleQuestion = async (q: QuizQuestion) => {
    const updatedStatus = q.isActive === false ? true : false;
    await toggleQuestionStatus(q.id, updatedStatus);
    setBankQuestions((prev) =>
      prev.map((item) => (item.id === q.id ? { ...item, isActive: updatedStatus } : item))
    );
    setQuestionActionMsg(`Question ${q.questionCode} ${updatedStatus ? 'activated' : 'deactivated'}.`);
    setTimeout(() => setQuestionActionMsg(null), 3000);
  };

  const handleSaveQuestion = async () => {
    if (!editingQuestion) return;
    await saveQuestionUpdate(editingQuestion);
    setBankQuestions((prev) =>
      prev.map((item) => (item.id === editingQuestion.id ? { ...editingQuestion } : item))
    );
    setQuestionActionMsg(`Question ${editingQuestion.questionCode} updated successfully.`);
    setTimeout(() => setQuestionActionMsg(null), 3000);
    setEditingQuestion(null);
  };

  const loadAssessments = async () => {
    setLoading(true);
    try {
      const data = await adminFetchAssessments({
        search: searchQuery,
        sortBy,
        sortOrder,
        page: currentPage,
        pageSize: 10
      });
      setRecords(data.records);
      setTotalCount(data.totalCount);
      setIsLocalMode(data.isLocal);
    } catch (err) {
      console.error('Failed to load assessments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const csv = await adminExportAssessmentsCSV();
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `mindlyft_assessments_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Failed to export CSV: ' + err);
    }
  };

  const handleSaveRole = async () => {
    if (!editingRole) return;
    try {
      await saveRoleUpdate(editingRole);
      setRolesList(getActiveRoles());
      setSaveSuccessMsg(`Role "${editingRole.title}" updated successfully.`);
      setTimeout(() => setSaveSuccessMsg(null), 3000);
      setEditingRole(null);
    } catch (err) {
      alert('Failed to save role: ' + err);
    }
  };

  // Compute analytics from loaded records
  const categoryCount: Record<string, number> = {};
  const expCount: Record<string, number> = {};
  const goalCount: Record<string, number> = {};

  records.forEach((r) => {
    const cat = r.primaryCategory || 'unclassified';
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;

    const exp = r.experienceLevel || 'beginner';
    expCount[exp] = (expCount[exp] || 0) + 1;

    const goal = r.careerGoal || 'job_entry';
    goalCount[goal] = (goalCount[goal] || 0) + 1;
  });

  const totalAssessmentsMetric = totalCount;
  const topCategoryCode = Object.keys(categoryCount).sort((a, b) => categoryCount[b] - categoryCount[a])[0] || 'creative_comm';
  const topCategoryTitle = CAREER_CATEGORIES.find((c) => c.code === topCategoryCode)?.title || topCategoryCode;

  const totalPages = Math.ceil(totalCount / 10) || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">MindLyft AI Administrator Console</h1>
              <p className="text-xs text-slate-400">
                Logged in as <span className="text-brand-300 font-semibold">{adminUser.email}</span> ({adminUser.role})
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="text-xs px-3 py-1.5 rounded-full border flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 border-emerald-800 shadow-xs"
            title="MindLyft AI uses SQLite database (mindlyft.db)"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">SQLite DB (mindlyft.db)</span>
          </div>

          <button
            onClick={() => setShowSecurityModal(true)}
            id="admin-security-settings-btn"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Update Administrator ID & Password"
          >
            <Key className="w-3.5 h-3.5 text-brand-300" />
            <span>Lock / Password</span>
          </button>

          <button
            onClick={onLogout}
            id="admin-logout-btn"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Administrator Security & Password Change Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-w-md w-full space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <Lock className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Administrator Security</h3>
                  <p className="text-xs text-slate-500">Update Administrator ID & Password</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowSecurityModal(false);
                  setSecurityModalMsg(null);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {securityModalMsg && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-start gap-2 ${
                  securityModalMsg.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border border-rose-200 text-rose-800'
                }`}
              >
                {securityModalMsg.type === 'success' ? (
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                )}
                <span>{securityModalMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleUpdateCredentials} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase">Administrator ID or Email</label>
                <input
                  type="text"
                  required
                  value={newAdminIdInput}
                  onChange={(e) => setNewAdminIdInput(e.target.value)}
                  placeholder="e.g. admin or admin@mindlyft.ai"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPasswordInput}
                  onChange={(e) => setCurrentPasswordInput(e.target.value)}
                  placeholder="Enter current password to verify identity"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase">New Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase">Confirm New Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowSecurityModal(false);
                    setSecurityModalMsg(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={securityUpdating}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5 text-brand-300" />
                  <span>{securityUpdating ? 'Saving...' : 'Update Password'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'analytics', label: 'Overview & Analytics', icon: BarChart3 },
          { id: 'records', label: `Participant Records (${totalCount})`, icon: FileText },
          { id: 'catalog', label: '18-Role Catalog Manager', icon: Layers },
          { id: 'questions', label: `Question Bank (${bankQuestions.length || 1080})`, icon: BookOpen }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ANALYTICS OVERVIEW */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Assessments
              </span>
              <div className="text-3xl font-extrabold text-slate-900">{totalAssessmentsMetric}</div>
              <p className="text-[11px] text-emerald-600 font-medium">100% completed & validated</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Top Category Match
              </span>
              <div className="text-lg font-extrabold text-brand-700 truncate">{topCategoryTitle}</div>
              <p className="text-[11px] text-slate-500">Highest matching frequency</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Catalog Roles
              </span>
              <div className="text-3xl font-extrabold text-slate-900">18</div>
              <p className="text-[11px] text-slate-500">Across 6 distinct disciplines</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Recommendation Engine
              </span>
              <div className="text-lg font-extrabold text-emerald-700">Deterministic</div>
              <p className="text-[11px] text-slate-500">Mathematical weight calibration</p>
            </div>
          </div>

          {/* Charts & Breakdown Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Popularity Bar Chart */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-brand-600" />
                <span>Career Category Popularity</span>
              </h3>

              <div className="space-y-3">
                {CAREER_CATEGORIES.map((cat) => {
                  const count = categoryCount[cat.code] || 0;
                  const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;

                  return (
                    <div key={cat.code} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-700 font-medium">{cat.title}</span>
                        <span className="text-slate-500 font-mono">
                          {count} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-brand-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(pct, count > 0 ? 8 : 2)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Experience Level & Career Goal Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-violetAccent-600" />
                  <span>Participant Experience Level Distribution</span>
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries({
                    beginner: 'Beginner',
                    intermediate: 'Intermediate',
                    career_changer: 'Career Changer',
                    advanced: 'Advanced'
                  }).map(([key, label]) => (
                    <div key={key} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-500 block text-[11px]">{label}</span>
                      <span className="text-base font-bold text-slate-900">
                        {expCount[key] || 0}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>Primary Career Goals</span>
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries({
                    job_entry: 'Job Entry',
                    freelance: 'Freelance',
                    internal_promotion: 'Promotion',
                    entrepreneurship: 'Solopreneur'
                  }).map(([key, label]) => (
                    <div key={key} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-500 block text-[11px]">{label}</span>
                      <span className="text-base font-bold text-slate-900">
                        {goalCount[key] || 0}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PARTICIPANT RECORDS TABLE */}
      {activeTab === 'records' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6 animate-fadeIn">
          {/* Search, Filter & CSV Export Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reference ID, participant name, or phone number..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => loadAssessments()}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Refresh live SQLite records"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Refresh Live Data</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export to CSV</span>
              </button>
            </div>
          </div>

          {/* Records Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Reference ID</th>
                  <th className="py-3 px-4">Date Completed</th>
                  <th className="py-3 px-4">Participant Name</th>
                  <th className="py-3 px-4">Phone / Contact</th>
                  <th className="py-3 px-4">Primary Category</th>
                  <th className="py-3 px-4">Top Role Match</th>
                  <th className="py-3 px-4">Experience / Goal</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {rec.referenceId}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(rec.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      {rec.participantName || <span className="text-slate-400 italic">Anonymous</span>}
                    </td>
                    <td className="py-3.5 px-4 font-medium">
                      {rec.phoneNumber ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-mono text-[11px] font-semibold">
                          <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{rec.phoneNumber}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-[11px] font-semibold">
                        {rec.primaryCategory || 'General'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {rec.primaryRole || 'Analyzed'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {rec.backgroundField && (
                        <span className="font-semibold text-brand-700 capitalize block">
                          {rec.backgroundField.replace('engineering_', '').replace(/_/g, ' ')}
                        </span>
                      )}
                      <span>{rec.experienceLevel} • {rec.careerGoal}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          if (rec.reportData) {
                            onPreviewReport(rec.reportData);
                          } else {
                            setSelectedRecord(rec);
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold text-brand-600 hover:text-brand-800 hover:bg-brand-50 transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    </td>
                  </tr>
                ))}

                {records.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                      No assessment records found matching your query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
            <span>
              Showing {records.length} of {totalCount} records (Page {currentPage} of {totalPages})
            </span>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Record Details Modal */}
          {selectedRecord && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-w-xl w-full space-y-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 border border-brand-200 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Student Lead & Assessment Profile</h3>
                      <p className="text-xs font-mono text-slate-500">{selectedRecord.referenceId}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-0.5">Participant Name</span>
                      <span className="text-sm font-bold text-slate-900">{selectedRecord.participantName || 'Anonymous'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-0.5">Contact Number</span>
                      {selectedRecord.phoneNumber ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-semibold">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{selectedRecord.phoneNumber}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Not provided</span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Academic Background</span>
                    <p className="text-sm font-semibold text-slate-800">
                      {selectedRecord.backgroundField || selectedRecord.educationLevel || 'General Academic'}
                    </p>
                  </div>

                  {selectedRecord.existingSkills && selectedRecord.existingSkills.length > 0 && (
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
                        Selected Skills ({selectedRecord.existingSkills.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedRecord.existingSkills.map((sk, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-brand-50 border border-brand-200 text-brand-800 text-[11px] font-semibold"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-0.5">Career Field / Interest</span>
                      <span className="font-semibold text-slate-800">{selectedRecord.primaryCategory || selectedRecord.careerGoal || 'Data & Analytics'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block mb-0.5">Matched Career / Role</span>
                      <span className="font-semibold text-brand-700">{selectedRecord.primaryRole || 'Analyzed'}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2">
                    <span>Recorded in SQLite: {new Date(selectedRecord.createdAt).toLocaleString()}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">Active in SQLite</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  {selectedRecord.reportData && (
                    <button
                      onClick={() => {
                        const rep = selectedRecord.reportData;
                        setSelectedRecord(null);
                        if (rep) onPreviewReport(rep);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 transition-colors cursor-pointer"
                    >
                      Open Full Report
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ROLE CATALOG MANAGEMENT */}
      {activeTab === 'catalog' && (
        <div className="space-y-6 animate-fadeIn">
          {saveSuccessMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          {/* Edit Role Modal / Overlay */}
          {editingRole && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-2xl w-full my-8 space-y-5 max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    Edit Catalog Role: {editingRole.title}
                  </h3>
                  <button
                    onClick={() => setEditingRole(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase">Role Title</label>
                    <input
                      type="text"
                      value={editingRole.title}
                      onChange={(e) => setEditingRole({ ...editingRole, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase">Tagline</label>
                    <input
                      type="text"
                      value={editingRole.tagline}
                      onChange={(e) => setEditingRole({ ...editingRole, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase">Description</label>
                    <textarea
                      rows={3}
                      value={editingRole.description}
                      onChange={(e) => setEditingRole({ ...editingRole, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase">Coding Requirement Details</label>
                    <input
                      type="text"
                      value={editingRole.codingRequirementDetails}
                      onChange={(e) => setEditingRole({ ...editingRole, codingRequirementDetails: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase">Limitations & Prerequisites</label>
                    <textarea
                      rows={2}
                      value={editingRole.limitationsAndPrerequisites}
                      onChange={(e) => setEditingRole({ ...editingRole, limitationsAndPrerequisites: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setEditingRole(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveRole}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 shadow-md flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Role Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Manage 18 Role Records</h3>
                <p className="text-xs text-slate-500">
                  Update descriptions, requirements, and roadmaps. Changes persist to SQLite database (mindlyft.db).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rolesList.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-brand-300 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-brand-600 font-bold uppercase tracking-wider">
                      <span>{r.categoryTitle}</span>
                      <span className="text-slate-400">{r.codingNeeded ? 'Coding' : 'No-Code'}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{r.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{r.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">{r.roleCode}</span>
                    <button
                      onClick={() => setEditingRole({ ...r })}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold text-brand-600 hover:bg-brand-50 flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 1,080 ROLE-SPECIFIC QUESTION BANK MANAGER */}
      {activeTab === 'questions' && (() => {
        // Filter logic for 1,080 bank questions
        const filteredBank = bankQuestions.filter((q) => {
          if (questionRoleFilter !== 'all' && q.roleCode !== questionRoleFilter) {
            return false;
          }
          if (questionSetFilter !== 'all' && q.setNumber !== Number(questionSetFilter)) {
            return false;
          }
          if (questionTypeFilter !== 'all' && q.questionType !== questionTypeFilter) {
            return false;
          }
          if (questionSearch.trim()) {
            const query = questionSearch.toLowerCase();
            const textMatch = q.questionText.toLowerCase().includes(query);
            const codeMatch = q.questionCode.toLowerCase().includes(query);
            const optMatch = q.options.some((o) => o.label.toLowerCase().includes(query));
            return textMatch || codeMatch || optMatch;
          }
          return true;
        });

        const qPageSize = 10;
        const totalQPages = Math.ceil(filteredBank.length / qPageSize) || 1;
        const safeQPage = Math.min(questionPage, totalQPages);
        const paginatedQuestions = filteredBank.slice((safeQPage - 1) * qPageSize, safeQPage * qPageSize);
        const activeCount = bankQuestions.filter((q) => q.isActive !== false).length;

        return (
          <div className="space-y-6 animate-fadeIn">
            {/* Action Feedback Notification */}
            {questionActionMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-4 py-3 rounded-2xl flex items-center justify-between shadow-xs">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {questionActionMsg}
                </span>
                <button onClick={() => setQuestionActionMsg(null)} className="text-emerald-600 hover:text-emerald-900">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Edit Question Modal */}
            {editingQuestion && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200 uppercase tracking-wider">
                        {editingQuestion.roleCode || 'General'} • Set {editingQuestion.setNumber || 1} • {editingQuestion.questionType?.replace(/_/g, ' ')}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">
                        Edit Question {editingQuestion.questionCode}
                      </h3>
                    </div>
                    <button
                      onClick={() => setEditingQuestion(null)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 uppercase">Question Text</label>
                      <textarea
                        rows={3}
                        value={editingQuestion.questionText}
                        onChange={(e) =>
                          setEditingQuestion({ ...editingQuestion, questionText: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 uppercase">Category Focus / Workplace Context</label>
                      <input
                        type="text"
                        value={editingQuestion.categoryFocus}
                        onChange={(e) =>
                          setEditingQuestion({ ...editingQuestion, categoryFocus: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
                      />
                    </div>

                    {editingQuestion.subtext && (
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 uppercase">Subtext / Guidance</label>
                        <input
                          type="text"
                          value={editingQuestion.subtext}
                          onChange={(e) =>
                            setEditingQuestion({ ...editingQuestion, subtext: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="font-bold text-slate-700 uppercase block">Answer Options & Scores</label>
                      {editingQuestion.options.map((opt, idx) => (
                        <div key={opt.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-700 uppercase text-[10px]">
                              Option {String.fromCharCode(65 + idx)} ({opt.optionCode})
                            </span>
                            <div className="flex items-center gap-1.5 text-[11px]">
                              <span className="text-slate-500">Score Weight:</span>
                              <input
                                type="number"
                                min={0}
                                max={3}
                                value={opt.scoreWeight ?? 1}
                                onChange={(e) => {
                                  const updatedOptions = [...editingQuestion.options];
                                  updatedOptions[idx] = {
                                    ...updatedOptions[idx],
                                    scoreWeight: Number(e.target.value)
                                  };
                                  setEditingQuestion({ ...editingQuestion, options: updatedOptions });
                                }}
                                className="w-12 px-1.5 py-0.5 rounded border border-slate-200 text-center font-bold"
                              />
                            </div>
                          </div>
                          <input
                            type="text"
                            value={opt.label}
                            onChange={(e) => {
                              const updatedOptions = [...editingQuestion.options];
                              updatedOptions[idx] = {
                                ...updatedOptions[idx],
                                label: e.target.value
                              };
                              setEditingQuestion({ ...editingQuestion, options: updatedOptions });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setEditingQuestion(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveQuestion}
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 shadow-md flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Question Changes</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Question Bank Header & Metrics */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold border border-brand-200">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Structured Question Repository</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Role-Specific Randomized Question Bank
                  </h3>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    1,080 distinct questions across all 18 roles and 4 non-overlapping sets per role (15 questions each). Administrators can edit questions, adjust weights, and toggle active status.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Pool</span>
                    <span className="font-bold text-slate-900 text-sm">{bankQuestions.length}</span>
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <span className="text-[10px] text-emerald-600 block uppercase font-bold">Active</span>
                    <span className="font-bold text-emerald-800 text-sm">{activeCount}</span>
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-brand-50 border border-brand-200 text-center">
                    <span className="text-[10px] text-brand-600 block uppercase font-bold">Roles Covered</span>
                    <span className="font-bold text-brand-800 text-sm">18 Roles (4 Sets)</span>
                  </div>
                </div>
              </div>

              {/* Filter Controls Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search question text or code..."
                    value={questionSearch}
                    onChange={(e) => {
                      setQuestionSearch(e.target.value);
                      setQuestionPage(1);
                    }}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
                  />
                </div>

                {/* Role Filter */}
                <div>
                  <select
                    value={questionRoleFilter}
                    onChange={(e) => {
                      setQuestionRoleFilter(e.target.value);
                      setQuestionPage(1);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
                  >
                    <option value="all">All 18 Career Roles</option>
                    {CAREER_ROLES.map((r) => (
                      <option key={r.id} value={r.roleCode}>
                        {r.title} ({r.roleCode})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Set Filter */}
                <div>
                  <select
                    value={questionSetFilter}
                    onChange={(e) => {
                      setQuestionSetFilter(e.target.value);
                      setQuestionPage(1);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
                  >
                    <option value="all">All Question Sets (Sets 1-4)</option>
                    <option value="1">Set 1 (Questions 1-15)</option>
                    <option value="2">Set 2 (Questions 1-15)</option>
                    <option value="3">Set 3 (Questions 1-15)</option>
                    <option value="4">Set 4 (Questions 1-15)</option>
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <select
                    value={questionTypeFilter}
                    onChange={(e) => {
                      setQuestionTypeFilter(e.target.value);
                      setQuestionPage(1);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
                  >
                    <option value="all">All Question Types</option>
                    <option value="practical_scenario">Practical Scenario</option>
                    <option value="problem_solving">Problem Solving</option>
                    <option value="role_interest">Role Interest</option>
                    <option value="learning_readiness">Learning Readiness</option>
                  </select>
                </div>
              </div>

              {/* Filter Results Info */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>
                  Showing {paginatedQuestions.length} of {filteredBank.length} matching questions
                </span>
                {(questionRoleFilter !== 'all' ||
                  questionSetFilter !== 'all' ||
                  questionTypeFilter !== 'all' ||
                  questionSearch) && (
                  <button
                    onClick={() => {
                      setQuestionRoleFilter('all');
                      setQuestionSetFilter('all');
                      setQuestionTypeFilter('all');
                      setQuestionSearch('');
                      setQuestionPage(1);
                    }}
                    className="text-brand-600 font-bold hover:underline cursor-pointer"
                  >
                    Reset all filters
                  </button>
                )}
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {paginatedQuestions.map((q) => {
                  const roleObj = CAREER_ROLES.find((r) => r.roleCode === q.roleCode);
                  const isQActive = q.isActive !== false;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border transition-all space-y-3 ${
                        isQActive
                          ? 'bg-white border-slate-200 shadow-2xs hover:border-brand-300'
                          : 'bg-slate-50/70 border-slate-200 opacity-60'
                      }`}
                    >
                      {/* Top Badges & Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                            {roleObj?.title || q.roleCode || 'General'}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            Set {q.setNumber || 1} • Q{q.orderIndex}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-violetAccent-700 bg-violetAccent-50 px-2 py-0.5 rounded border border-violetAccent-200">
                            {q.questionType?.replace(/_/g, ' ') || 'scenario'}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {q.questionCode}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleQuestion(q)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                              isQActive
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                            }`}
                          >
                            {isQActive ? 'Active' : 'Deactivated'}
                          </button>

                          <button
                            onClick={() => setEditingQuestion({ ...q })}
                            className="px-3 py-1 rounded-lg text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                        </div>
                      </div>

                      {/* Question Text */}
                      <div>
                        <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                          {q.questionText}
                        </p>
                        {q.subtext && (
                          <p className="text-xs text-slate-500 mt-0.5">{q.subtext}</p>
                        )}
                      </div>

                      {/* 4 Options Matrix */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                        {q.options.map((opt, oIdx) => (
                          <div
                            key={opt.id}
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                          >
                            <div className="flex items-start gap-1.5">
                              <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span className="text-slate-800 leading-snug">{opt.label}</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-1 border-t border-slate-100">
                              <span>Weight: <strong>+{opt.scoreWeight ?? 1} pts</strong></span>
                              <span className="font-mono text-brand-700">{q.categoryCode}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {filteredBank.length === 0 && (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <p className="text-sm font-semibold text-slate-700">No questions match the current filters.</p>
                    <p className="text-xs text-slate-400">Try adjusting your search terms, role, or set selection.</p>
                  </div>
                )}
              </div>

              {/* Pagination Controls */}
              {totalQPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    Page {safeQPage} of {totalQPages} ({filteredBank.length} questions)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={safeQPage <= 1}
                      onClick={() => setQuestionPage((p) => Math.max(p - 1, 1))}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      disabled={safeQPage >= totalQPages}
                      onClick={() => setQuestionPage((p) => Math.min(p + 1, totalQPages))}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
};
