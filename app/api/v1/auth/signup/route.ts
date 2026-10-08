import { NextRequest, NextResponse } from "next/server";
import { createUser, ensureSeed } from "@/lib/server/user-store";
import { signSession, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth/session";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  await ensureSeed();
  try {
    const { email, password, name } = await req.json();
    const r = await createUser({ email, password, name, role: "PLAYER" });
    if (!r.ok) return NextResponse.json({ ok: false, error: r.error }, { status: 400 });
    const token = await signSession({
      userId: r.user.id,
      email: r.user.email,
      role: r.user.role,
      name: r.user.name,
    });
    const res = NextResponse.json({
      ok: true,
      user: { id: r.user.id, email: r.user.email, name: r.user.name, role: r.user.role },
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