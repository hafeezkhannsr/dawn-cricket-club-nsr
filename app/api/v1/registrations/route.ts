import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { create, listAll, stats, type StoredRegistration } from "@/lib/server/registration-store";
import { feeFor, fullRegistrationSchema } from "@/lib/registration-model";
import { sendEmail } from "@/lib/server/email";
export const dynamic = "force-dynamic";
// ---------- GET: list all ----------
export async function GET() {
  return NextResponse.json({ ok: true, stats: stats(), items: listAll() });
}
// ---------- POST: create ----------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = fullRegistrationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;
    const id = nanoid(14);
    const year = new Date().getFullYear();
    const seq = Math.floor(1000 + Math.random() * 9000);
    const registrationNumber = `${data.program}-${year}-${seq}`;
    const now = new Date().toISOString();
    const rec: StoredRegistration = {
      id,
      registrationNumber,
      program: data.program,
      registrationType: data.registrationType,
      edition: data.edition,
      status: "SUBMITTED",
      paymentStatus: "PROOF_SUBMITTED",
      feeAmount: feeFor(data.program, data.registrationType),
      currency: "PKR",
      data: data as Record<string, unknown>,
      createdAt: now,
      updatedAt: now,
      statusHistory: [{ at: now, from: null, to: "SUBMITTED", note: "Initial submission" }],
    };
    create(rec);
    // best-effort confirmation email
    const toEmail = String(data.email || "").trim();
    if (toEmail.includes("@")) {
      sendEmail({
        to: toEmail,
        templateId: "registration.submitted",
        data: { name: data.fullNameEn, reg: registrationNumber },
      }).catch(() => {});
    }
    return NextResponse.json({ ok: true, id, registrationNumber });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}