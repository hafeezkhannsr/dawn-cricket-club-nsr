import { NextRequest, NextResponse } from "next/server";
import { findByMobile, findByEmail, listAll } from "@/lib/server/registration-store";
export const dynamic = "force-dynamic";
/**
 * GET /api/v1/my-registrations?mobile=...&email=...
 * OR   /api/v1/my-registrations?q=...  (search)
 *
 * This is a *lightweight* lookup that returns only safe fields (no CNIC, no docs).
 * In production, this should be behind authenticated session and query by session user.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mobile = searchParams.get("mobile") || "";
  const email = searchParams.get("email") || "";
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  let items = [] as ReturnType<typeof listAll>;
  if (mobile) items = findByMobile(mobile);
  else if (email) items = findByEmail(email);
  else if (q) {
    items = listAll().filter((r) => {
      const d = r.data as Record<string, unknown>;
      const hay = [r.registrationNumber, d.fullNameEn, d.fatherName, d.primaryMobile]
        .map((v) => String(v ?? "").toLowerCase()).join(" ");
      return hay.includes(q);
    });
  } else {
    return NextResponse.json({ ok: false, error: "Provide mobile, email or q" }, { status: 400 });
  }
  // Return SAFE summary (no CNIC, no address, no documents)
  const safe = items.map((r) => {
    const d = r.data as Record<string, unknown>;
    return {
      id: r.id,
      registrationNumber: r.registrationNumber,
      program: r.program,
      registrationType: r.registrationType,
      status: r.status,
      paymentStatus: r.paymentStatus,
      feeAmount: r.feeAmount,
      currency: r.currency,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      fullNameEn: String(d.fullNameEn || ""),
      fatherName: String(d.fatherName || ""),
      primaryMobile: String(d.primaryMobile || ""),
      playingRole: String(d.playingRole || ""),
      ageCategory: String(d.ageCategory || ""),
      statusHistory: r.statusHistory,
    };
  });
  return NextResponse.json({ ok: true, items: safe });
}