import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/server/email";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    const name = String(b.name || "").trim();
    const email = String(b.email || "").trim();
    const phone = String(b.phone || "").trim();
    const subject = String(b.subject || "General inquiry").trim();
    const message = String(b.message || "").trim();
    if (!name || name.length < 2) return NextResponse.json({ ok: false, error: "Name required" }, { status: 400 });
    if (!email.includes("@")) return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });
    if (!message || message.length < 10) return NextResponse.json({ ok: false, error: "Message min 10 chars" }, { status: 400 });
    await sendEmail({
      to: "info@dawncricketclub.pk",
      templateId: "contact.form",
      subject: "[Contact] " + subject + " - " + name,
      body: "Name: " + name + "\nEmail: " + email + "\nPhone: " + (phone || "n/a") + "\nSubject: " + subject + "\n\n" + message,
    });
    return NextResponse.json({ ok: true, message: "Thank you! We will respond within 24 hours." });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Failed" }, { status: 500 });
  }
}