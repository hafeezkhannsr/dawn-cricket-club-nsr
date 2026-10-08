import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
declare global { var __dawn_newsletter__: Set<string> | undefined; }
const subs = globalThis.__dawn_newsletter__ ?? new Set<string>();
globalThis.__dawn_newsletter__ = subs;
export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    const email = String(b.email || "").trim().toLowerCase();
    if (!email.includes("@")) return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });
    if (subs.has(email)) return NextResponse.json({ ok: true, message: "Already subscribed." });
    subs.add(email);
    return NextResponse.json({ ok: true, message: "Subscribed!" });
  } catch { return NextResponse.json({ ok: false, error: "Failed" }, { status: 500 }); }
}
export async function GET() { return NextResponse.json({ ok: true, count: subs.size }); }