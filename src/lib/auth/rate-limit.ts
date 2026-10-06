import {
  loadLoginAttempts,
  saveLoginAttempts,
} from "@/lib/store/menu-store";

const MAX_FAILURES = 5;
const LOCK_MS = 15 * 60 * 1000;

export async function assertNotLocked(key: string): Promise<void> {
  const state = await loadLoginAttempts(key);
  if (state.lockedUntil && state.lockedUntil > Date.now()) {
    const minutes = Math.ceil((state.lockedUntil - Date.now()) / 60000);
    throw new Error(
      `Zu viele Fehlversuche. Bitte in ${minutes} Minute(n) erneut versuchen.`
    );
  }
}

export async function recordLoginFailure(key: string): Promise<void> {
  const state = await loadLoginAttempts(key);
  const failures = state.failures + 1;
  await saveLoginAttempts(key, {
    failures,
    lockedUntil: failures >= MAX_FAILURES ? Date.now() + LOCK_MS : null,
  });
}

export async function clearLoginFailures(key: string): Promise<void> {
  await saveLoginAttempts(key, { failures: 0, lockedUntil: null });
}
