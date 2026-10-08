import { NextRequest, NextResponse } from "next/server";
import { listUsers, ensureSeed, createUser } from "@/lib/server/user-store";
export const dynamic = "force-dynamic";
export async function GET() {
  await ensureSeed();
  const users = listUsers().map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    createdAt: u.createdAt,
  }));
  return NextResponse.json({ ok: true, items: users });
}
export async function POST(req: NextRequest) {
  await ensureSeed();
  const body = await req.json().catch(() => ({}));
  const { email, password, name, role } = body;
  const r = await createUser({
    email,
    password,
    name,
    role: role || "PLAYER",
  });
  if (!r.ok) return NextResponse.json({ ok: false, error: r.error }, { status: 400 });
  return NextResponse.json({
    ok: true,
    user: { id: r.user.id, email: r.user.email, name: r.user.name, role: r.user.role },
  });
}