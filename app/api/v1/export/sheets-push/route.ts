import { NextRequest, NextResponse } from "next/server";
import { listAll } from "@/lib/server/registration-store";
import { REGISTRATION_COLUMNS } from "@/lib/server/exports";
export const dynamic = "force-dynamic";
type Row = string[];
function safe(v: unknown): string { if (v === null || v === undefined) return ""; const str = String(v); if (/^[=+\-@]/.test(str)) return "'" + str; return str; }
function buildRows(items: Awaited<ReturnType<typeof listAll>>): Row[] {
  return items.map((r) => {
    const d = r.data as Record<string, unknown>;
    const g = (k: string) => safe(d[k]);
    return [safe(r.registrationNumber), safe(r.program), safe(r.registrationType), g("playerCategory"), safe(r.edition ?? ""), safe(r.status), safe(r.paymentStatus), safe(r.feeAmount), safe(r.currency), g("fullNameEn"), g("fatherName"), g("dateOfBirth"), g("gender"), g("nationality"), g("religion"), g("maritalStatus"), g("bloodGroup"), g("primaryMobile"), g("email"), g("residenceCity"), g("identityType"), g("identityNumber"), g("country"), g("province"), g("division"), g("district"), g("tehsil"), g("unionCouncil"), g("village"), g("postalAddress"), g("playingRole"), g("battingStyle"), g("bowlingStyle"), g("ballType"), g("experienceYears"), g("previousClub"), g("isStudent"), g("educationLevel"), g("schoolName"), g("availability"), g("guardianName"), g("guardianRelation"), g("guardianMobile"), g("publicPhotoConsent"), g("rulesConsent"), g("paymentMethod"), g("paymentDate"), g("transactionReference"), g("signatureName"), safe(r.createdAt), safe(r.updatedAt)];
  });
}
export async function POST(req: NextRequest) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_SECRET || "";
  if (!url) return NextResponse.json({ ok: false, error: "Google Sheets webhook not configured." }, { status: 400 });
  const body = await req.json().catch(() => ({}));
  const onlyNew = body.onlyNew === true;
  let items = await listAll();
  if (onlyNew) items = items.slice(0, 1);
  const rows = buildRows(items);
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ secret, columns: [...REGISTRATION_COLUMNS], rows }) });
    const text = await res.text();
    let parsed: { ok?: boolean; appended?: number; error?: string } = {};
    try { parsed = JSON.parse(text); } catch {}
    if (!res.ok || !parsed.ok) return NextResponse.json({ ok: false, error: parsed.error || "Rejected" }, { status: 500 });
    return NextResponse.json({ ok: true, appended: parsed.appended ?? rows.length });
  } catch (e) { return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Network error" }, { status: 500 }); }
}