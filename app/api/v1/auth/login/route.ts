import { NextRequest, NextResponse } from "next/server";
import { findByEmail, ensureSeed } from "@/lib/server/user-store";
import { verifyPassword } from "@/lib/auth/password";
import { signSession, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth/session";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  await ensureSeed();
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email and password required" }, { status: 400 });
    }
    const user = findByEmail(String(email));
    if (!user) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    const valid = await verifyPassword(String(password), user.passwordHash);
    if (!valid) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    const token = await signSession({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });
    const res = NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });
    return res;
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Error" }, { status: 500 });
  }
}