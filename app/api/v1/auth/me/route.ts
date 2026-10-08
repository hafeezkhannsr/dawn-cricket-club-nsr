import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth/session";
import { findById } from "@/lib/server/user-store";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return NextResponse.json({ ok: false, user: null });
  const session = await verifySession(token);
  if (!session) return NextResponse.json({ ok: false, user: null });
  const u = findById(session.userId);
  if (!u) return NextResponse.json({ ok: false, user: null });
  return NextResponse.json({
    ok: true,
    user: { id: u.id, email: u.email, name: u.name, role: u.role },
  });
}