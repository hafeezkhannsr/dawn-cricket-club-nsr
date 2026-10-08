import { NextRequest, NextResponse } from "next/server";
import { findByMobile, findByEmail, listAll } from "@/lib/server/registration-store";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mobile = searchParams.get("mobile") || "";
  const email = searchParams.get("email") || "";
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  let items: Awaited<ReturnType<typeof listAll>> = [];
  if (mobile) items = await findByMobile(mobile);
  else if (email) items = await findByEmail(email);
  else if (q) { const all = await listAll(); items = all.filter((r) => { const d = r.data as Record<string, unknown>; const hay = [r.registrationNumber, d.fullNameEn, d.fatherName, d.primaryMobile].map((v) => String(v ?? "").toLowerCase()).join(" "); return hay.includes(q); }); }
  else return NextResponse.json({ ok: false, error: "Provide mobile, email or q" }, { status: 400 });
  const safe = items.map((r) => { const d = r.data as Record<string, unknown>; return { id: r.id, registrationNumber: r.registrationNumber, program: r.program, registrationType: r.registrationType, status: r.status, paymentStatus: r.paymentStatus, feeAmount: r.feeAmount, currency: r.currency, createdAt: r.createdAt, updatedAt: r.updatedAt, fullNameEn: String(d.fullNameEn || ""), fatherName: String(d.fatherName || ""), primaryMobile: String(d.primaryMobile || ""), playingRole: String(d.playingRole || ""), ageCategory: String(d.ageCategory || ""), statusHistory: r.statusHistory }; });
  return NextResponse.json({ ok: true, items: safe });
}