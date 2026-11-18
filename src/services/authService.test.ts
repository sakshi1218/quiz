import { describe, it, expect, beforeEach } from 'vitest';
import {
  signInAdmin,
  signOutAdmin,
  updateAdminCredentials,
  getCurrentAdminUser,
  getLockoutStatus
} from './authService';

// In-memory localStorage polyfill for Node.js test runner
const store: Record<string, string> = {};
const mockLocalStorage = {
  getItem: (key: string) => (key in store ? store[key] : null),
  setItem: (key: string, value: string) => { store[key] = String(value); },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => {
    for (const key of Object.keys(store)) {
      delete store[key];
    }
  },
  length: 0,
  key: (i: number) => Object.keys(store)[i] || null,
};

if (typeof globalThis.localStorage === 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  });
}

describe('Admin Authentication & Portal Lock System', () => {
  beforeEach(() => {
    globalThis.localStorage.clear();
  });

  it('should deny access when invalid credentials are provided', async () => {
    const res = await signInAdmin('wrong_user', 'wrong_pass');
    expect(res.user).toBeNull();
    expect(res.error).toContain('Invalid administrator credentials');

    const currentUser = await getCurrentAdminUser();
    expect(currentUser).toBeNull();
  });

  it('should unlock the admin portal when easy credentials are provided (admin / admin123)', async () => {
    const res = await signInAdmin('admin', 'admin123');
    expect(res.error).toBeNull();
    expect(res.user).not.toBeNull();
    expect(res.user?.email).toBe('admin');

    const currentUser = await getCurrentAdminUser();
    expect(currentUser).not.toBeNull();
  });

  it('should allow login with backward compatible credentials', async () => {
    const res = await signInAdmin('admin', 'MindLyft@2026');
    expect(res.error).toBeNull();
    expect(res.user).not.toBeNull();
  });

  it('should allow multiple consecutive login attempts without locking out the administrator', async () => {
    for (let i = 0; i < 10; i++) {
      const res = await signInAdmin('wrong_user', 'bad_pass');
      expect(res.user).toBeNull();
      expect(res.lockedUntilSeconds || 0).toBe(0);
    }

    // Status check remains unlocked
    const status = getLockoutStatus();
    expect(status.isLocked).toBe(false);

    // Valid login immediately succeeds after multiple failed attempts
    const validRes = await signInAdmin('admin', 'admin123');
    expect(validRes.user).not.toBeNull();
  });

  it('should allow authorized admin to update their ID and password', async () => {
    // 1. Initial login
    const login1 = await signInAdmin('admin', 'MindLyft@2026');
    expect(login1.user).not.toBeNull();

    // 2. Reject update if current password incorrect
    const badUpdate = await updateAdminCredentials('WrongCurrentPassword', 'super_admin_2026', 'NewSecret123!');
    expect(badUpdate.success).toBe(false);
    expect(badUpdate.error).toContain('Current password is incorrect');

    // 3. Successfully update credentials
    const updateRes = await updateAdminCredentials('MindLyft@2026', 'lead_admin@mindlyft.ai', 'CustomSecret2026!');
    expect(updateRes.success).toBe(true);

    // 4. Old password should now be rejected
    const oldLogin = await signInAdmin('admin', 'MindLyft@2026');
    expect(oldLogin.user).toBeNull();

    // 5. New credentials unlock the portal
    const newLogin = await signInAdmin('lead_admin@mindlyft.ai', 'CustomSecret2026!');
    expect(newLogin.user).not.toBeNull();
    expect(newLogin.user?.email).toBe('lead_admin@mindlyft.ai');
  });

  it('should properly sign out and destroy active session', async () => {
    await signInAdmin('admin', 'MindLyft@2026');
    expect(await getCurrentAdminUser()).not.toBeNull();

    await signOutAdmin();
    expect(await getCurrentAdminUser()).toBeNull();
  });
});
