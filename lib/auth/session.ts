import { SignJWT, jwtVerify } from "jose";
const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dawn-dev-secret-CHANGE-THIS-in-production-please-2026"
);
const ISSUER = "dawn-cricket-club";
const COOKIE = "dawn_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days
export type SessionPayload = {
  userId: string;
  email: string;
  role: "SUPER_ADMIN" | "CLUB_ADMIN" | "REVIEWER" | "SCORER" | "PLAYER";
  name?: string;
};
export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(SECRET);
}
export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET, { issuer: ISSUER });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}
export const SESSION_COOKIE = COOKIE;
export const SESSION_MAX_AGE = MAX_AGE;