import { hashPassword } from "@/lib/auth/password";
export type StoredUser = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "SUPER_ADMIN" | "CLUB_ADMIN" | "REVIEWER" | "SCORER" | "PLAYER";
  createdAt: string;
};
declare global {
  var __dawn_users__: Map<string, StoredUser> | undefined;
}
const users: Map<string, StoredUser> =
  globalThis.__dawn_users__ ?? new Map<string, StoredUser>();
globalThis.__dawn_users__ = users;
let seeded = false;
async function seedDefaultAdmins() {
  if (seeded) return;
  seeded = true;
  if (users.size > 0) return;
  const now = new Date().toISOString();
  const admins: Array<{ email: string; password: string; name: string; role: StoredUser["role"] }> = [
    { email: "admin@dawn.local",     password: "DawnAdmin#2026",     name: "Super Admin",   role: "SUPER_ADMIN" },
    { email: "reviewer@dawn.local",  password: "DawnReviewer#2026",  name: "Reviewer",      role: "REVIEWER" },
    { email: "scorer@dawn.local",    password: "DawnScorer#2026",    name: "Scorer",        role: "SCORER" },
  ];
  for (const a of admins) {
    const hash = await hashPassword(a.password);
    const id = a.email.split("@")[0] + "-" + Math.random().toString(36).slice(2, 6);
    users.set(a.email.toLowerCase(), {
      id,
      email: a.email.toLowerCase(),
      passwordHash: hash,
      name: a.name,
      role: a.role,
      createdAt: now,
    });
  }
  // eslint-disable-next-line no-console
  console.log("[DAWN] Seeded default users:");
  // eslint-disable-next-line no-console
  console.log("  admin@dawn.local     / DawnAdmin#2026");
  // eslint-disable-next-line no-console
  console.log("  reviewer@dawn.local  / DawnReviewer#2026");
  // eslint-disable-next-line no-console
  console.log("  scorer@dawn.local    / DawnScorer#2026");
  // eslint-disable-next-line no-console
  console.log("*** CHANGE THESE BEFORE PRODUCTION ***");
}
export async function ensureSeed() {
  await seedDefaultAdmins();
}
export function findByEmail(email: string): StoredUser | undefined {
  return users.get(email.toLowerCase());
}
export function findById(id: string): StoredUser | undefined {
  for (const u of users.values()) if (u.id === id) return u;
  return undefined;
}
export async function createUser(input: {
  email: string;
  password: string;
  name: string;
  role?: StoredUser["role"];
}): Promise<{ ok: true; user: StoredUser } | { ok: false; error: string }> {
  const email = input.email.toLowerCase().trim();
  if (!email || !email.includes("@")) return { ok: false, error: "Valid email required" };
  if (!input.password || input.password.length < 6) return { ok: false, error: "Password must be at least 6 characters" };
  if (findByEmail(email)) return { ok: false, error: "Email already registered" };
  const hash = await hashPassword(input.password);
  const id = "u-" + Math.random().toString(36).slice(2, 10);
  const u: StoredUser = {
    id,
    email,
    passwordHash: hash,
    name: input.name || email.split("@")[0],
    role: input.role ?? "PLAYER",
    createdAt: new Date().toISOString(),
  };
  users.set(email, u);
  return { ok: true, user: u };
}
export function listUsers(): StoredUser[] {
  return Array.from(users.values()).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}