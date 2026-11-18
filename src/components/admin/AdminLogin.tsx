import React, { useState, useEffect } from 'react';
import { Shield, Lock, User, AlertCircle, KeyRound, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { signInAdmin, AdminUser, getLockoutStatus } from '../../services/authService';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [identifier, setIdentifier] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lockedSeconds, setLockedSeconds] = useState<number>(0);

  // Check lockout on mount and tick down timer if active
  useEffect(() => {
    const status = getLockoutStatus();
    if (status.isLocked) {
      setLockedSeconds(status.remainingSeconds);
    }
  }, []);

  useEffect(() => {
    if (lockedSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockedSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setError(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockedSeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockedSeconds > 0) return;

    if (!identifier.trim() || !password) {
      setError('Please provide both administrator ID and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await signInAdmin(identifier, password);
      if (res.lockedUntilSeconds && res.lockedUntilSeconds > 0) {
        setLockedSeconds(res.lockedUntilSeconds);
        setError(res.error);
      } else if (res.error) {
        setError(res.error);
      } else if (res.user) {
        onLoginSuccess(res.user);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const isFormLocked = lockedSeconds > 0;

  return (
    <div className="max-w-md mx-auto px-4 py-12 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-8 space-y-6 relative overflow-hidden">
        {/* Top security status strip */}
        <div className="flex items-center justify-center gap-1.5 py-1 px-3 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-semibold w-fit mx-auto">
          <Lock className="w-3.5 h-3.5 text-slate-700" />
          <span>Restricted Portal • Authorized Personnel Only</span>
        </div>

        {/* Lock header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white flex items-center justify-center mx-auto shadow-lg shadow-slate-900/20">
            {isFormLocked ? (
              <ShieldAlert className="w-7 h-7 text-rose-400 animate-pulse" />
            ) : (
              <Shield className="w-7 h-7 text-brand-400" />
            )}
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Administrator Login
          </h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Enter your secure administrator credentials to unlock system controls and data records.
          </p>
        </div>

        {/* Quick Fill Box for Easy Admin Access */}
        <div className="p-3.5 rounded-2xl bg-brand-50/70 border border-brand-200/90 text-xs text-brand-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[11px] uppercase tracking-wider text-brand-800">Default Credentials</span>
            <button
              type="button"
              onClick={() => {
                setIdentifier('admin');
                setPassword('admin123');
                setError(null);
              }}
              className="px-2.5 py-1 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold text-[10px] transition-colors cursor-pointer"
            >
              Quick Autofill
            </button>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-700">
            <span>ID: <strong className="text-brand-900">admin</strong></span>
            <span>Pass: <strong className="text-brand-900">admin123</strong></span>
          </div>
        </div>

        {/* Standard Error Message */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <span className="leading-relaxed font-medium">{error}</span>
          </div>
        )}

        {/* Secure Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Admin ID / Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="admin-identifier-input"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Administrator ID or Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute top-1/2 left-3.5 -translate-y-1/2" />
              <input
                id="admin-identifier-input"
                type="text"
                required
                disabled={isFormLocked || loading}
                autoComplete="username"
                placeholder="Enter your admin ID or email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="admin-password-input"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hide</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Show</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute top-1/2 left-3.5 -translate-y-1/2" />
              <input
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                required
                disabled={isFormLocked || loading}
                autoComplete="current-password"
                placeholder="Enter your administrator password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="admin-submit-btn"
            type="submit"
            disabled={isFormLocked || loading}
            className="w-full py-3 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="animate-pulse">Verifying Credentials...</span>
            ) : isFormLocked ? (
              <span>Locked ({lockedSeconds}s)</span>
            ) : (
              <>
                <KeyRound className="w-4 h-4 text-brand-300" />
                <span>Unlock Administrator Portal</span>
              </>
            )}
          </button>
        </form>

        {/* Security advisory note */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 text-center space-y-0.5">
          <p className="font-semibold text-slate-700">Protected Security Perimeter</p>
          <p>All administrative actions, session tokens, and data mutations are strictly logged.</p>
        </div>

        {/* Back Link */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-slate-500 hover:text-slate-900 font-medium cursor-pointer transition-colors"
          >
            ← Return to Public Assessment
          </button>
        </div>
      </div>
    </div>
  );
};
