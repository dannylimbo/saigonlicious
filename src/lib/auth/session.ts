import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/auth/constants";

export { SESSION_COOKIE };
const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

export type AdminSession = {
  authenticated: true;
  mustChangePassword: boolean;
  issuedAt: number;
};

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("SESSION_SECRET fehlt oder ist zu kurz.");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(
  payload: Omit<AdminSession, "authenticated" | "issuedAt">
): Promise<string> {
  return new SignJWT({
    authenticated: true,
    mustChangePassword: payload.mustChangePassword,
    issuedAt: Date.now(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

export async function readSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, getSecret());
    if (!payload.authenticated) return null;
    return {
      authenticated: true,
      mustChangePassword: Boolean(payload.mustChangePassword),
      issuedAt: Number(payload.issuedAt ?? Date.now()),
    };
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function requireAdminSession(options?: {
  allowSetup?: boolean;
}): Promise<AdminSession> {
  const session = await readSession();
  if (!session) {
    throw new Error("Nicht angemeldet.");
  }
  if (session.mustChangePassword && !options?.allowSetup) {
    throw new Error("Bitte zuerst ein neues Passwort festlegen.");
  }
  return session;
}
