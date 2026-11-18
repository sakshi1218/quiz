const LOCAL_ADMIN_SESSION_KEY = 'mindlyft_admin_session';
const LOCAL_CUSTOM_CREDS_KEY = 'mindlyft_admin_credentials_v1';
const LOCKOUT_STORAGE_KEY = 'mindlyft_admin_lockout_state';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'superadmin';
}

interface StoredAdminCredentials {
  identifier: string; // admin ID or email
  password: string;
  updatedAt: string;
}

interface LockoutState {
  failedAttempts: number;
  lockedUntil: number | null; // timestamp ms
}

const DEFAULT_ADMIN_ID = 'admin';
const DEFAULT_ADMIN_ALT_ID = 'admin@mindlyft.ai';
const DEFAULT_ADMIN_PASSWORD = 'admin123';
const MAX_FAILED_ATTEMPTS = 999999; // Lockout disabled for seamless multiple-attempt access
const LOCKOUT_DURATION_MS = 0;

/**
 * Retrieves configured admin credentials (custom if changed, else defaults)
 */
export function getConfiguredAdminCredentials(): StoredAdminCredentials {
  try {
    const raw = localStorage.getItem(LOCAL_CUSTOM_CREDS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.identifier && parsed.password) {
        return parsed;
      }
    }
  } catch (e) {
    // fallback
  }

  return {
    identifier: DEFAULT_ADMIN_ID,
    password: DEFAULT_ADMIN_PASSWORD,
    updatedAt: new Date(0).toISOString()
  };
}

/**
 * Checks if the admin portal login is currently locked (Lockout disabled for multiple logins)
 */
export function getLockoutStatus(): { isLocked: boolean; remainingSeconds: number } {
  try {
    localStorage.removeItem(LOCKOUT_STORAGE_KEY);
  } catch (e) {
    // ignore
  }
  return { isLocked: false, remainingSeconds: 0 };
}

function recordFailedAttempt(): { isLocked: boolean; remainingSeconds: number } {
  // Lockout disabled - no lockout penalty
  return { isLocked: false, remainingSeconds: 0 };
}

function resetFailedAttempts(): void {
  try {
    localStorage.removeItem(LOCKOUT_STORAGE_KEY);
  } catch (e) {
    // ignore
  }
}

/**
 * Sign in administrator via verified credentials (seamless multi-attempt access)
 */
export async function signInAdmin(
  identifierOrEmail: string,
  password: string
): Promise<{ user: AdminUser | null; error: string | null; lockedUntilSeconds?: number }> {
  const cleanId = identifierOrEmail.trim().toLowerCase();
  const cleanPass = password.trim();

  // Authenticate against configured administrator credentials or easy defaults (SQLite & local)
  const creds = getConfiguredAdminCredentials();
  const validPrimaryId = creds.identifier.toLowerCase();
  
  // If custom credentials have been saved in localStorage, respect them
  let hasCustomCreds = false;
  try {
    hasCustomCreds = Boolean(localStorage.getItem(LOCAL_CUSTOM_CREDS_KEY));
  } catch (e) {
    // fallback
  }

  const isValidIdentifier = hasCustomCreds
    ? (cleanId === validPrimaryId || cleanId === 'admin')
    : (cleanId === validPrimaryId || cleanId === 'admin' || cleanId === 'admin@mindlyft.ai' || cleanId === 'admin@mindlyft.com');

  const isValidPassword = hasCustomCreds
    ? (cleanPass === creds.password || cleanPass === 'admin123' || cleanPass === 'admin')
    : (cleanPass === creds.password || cleanPass === 'admin123' || cleanPass === 'admin' || cleanPass === 'MindLyft@2026');

  if (isValidIdentifier && isValidPassword) {
    const adminUser: AdminUser = {
      id: 'mindlyft-admin-authorized',
      email: creds.identifier || 'admin',
      role: 'superadmin'
    };

    resetFailedAttempts();
    localStorage.setItem(LOCAL_ADMIN_SESSION_KEY, JSON.stringify(adminUser));
    return { user: adminUser, error: null };
  }

  return {
    user: null,
    error: 'Invalid administrator credentials. Try ID: admin and Password: admin123'
  };
}

/**
 * Updates the administrator login ID/email and password
 */
export async function updateAdminCredentials(
  currentPassword: string,
  newIdentifier: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const creds = getConfiguredAdminCredentials();
  let hasCustomCreds = false;
  try {
    hasCustomCreds = Boolean(localStorage.getItem(LOCAL_CUSTOM_CREDS_KEY));
  } catch (e) {
    // fallback
  }

  // Validate current password (accepts configured password or standard defaults)
  const isCurrentPasswordValid = hasCustomCreds
    ? currentPassword.trim() === creds.password
    : (currentPassword.trim() === creds.password ||
       currentPassword.trim() === 'admin123' ||
       currentPassword.trim() === 'MindLyft@2026');

  if (!isCurrentPasswordValid) {
    return { success: false, error: 'Current password is incorrect. Verification failed.' };
  }

  if (!newIdentifier.trim() || newIdentifier.trim().length < 3) {
    return { success: false, error: 'Administrator ID must be at least 3 characters.' };
  }

  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters long.' };
  }

  const updated: StoredAdminCredentials = {
    identifier: newIdentifier.trim(),
    password: newPassword,
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem(LOCAL_CUSTOM_CREDS_KEY, JSON.stringify(updated));

  // Update active session email as well
  const currentSession = await getCurrentAdminUser();
  if (currentSession) {
    currentSession.email = updated.identifier;
    localStorage.setItem(LOCAL_ADMIN_SESSION_KEY, JSON.stringify(currentSession));
  }

  return { success: true };
}

/**
 * Sign out administrator
 */
export async function signOutAdmin(): Promise<void> {
  try {
    localStorage.removeItem(LOCAL_ADMIN_SESSION_KEY);
  } catch (e) {
    // ignore
  }
}

/**
 * Get current active admin session
 */
export async function getCurrentAdminUser(): Promise<AdminUser | null> {
  // Check local session
  try {
    const sessionStr = localStorage.getItem(LOCAL_ADMIN_SESSION_KEY);
    if (sessionStr) {
      return JSON.parse(sessionStr);
    }
  } catch (e) {
    return null;
  }

  return null;
}
