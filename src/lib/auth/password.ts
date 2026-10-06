import { compare, hash } from "bcryptjs";

export const SETUP_BOOTSTRAP_PASSWORD = "123";
export const MIN_PASSWORD_LENGTH = 12;

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(
  password: string,
  passwordHash: string | null
): Promise<boolean> {
  if (!passwordHash) return false;
  return compare(password, passwordHash);
}

export function validateNewPassword(password: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Das Passwort muss mindestens ${MIN_PASSWORD_LENGTH} Zeichen haben.`;
  }
  if (password === SETUP_BOOTSTRAP_PASSWORD) {
    return "Bitte wähle ein eigenes Passwort – nicht das Startpasswort.";
  }
  return null;
}
