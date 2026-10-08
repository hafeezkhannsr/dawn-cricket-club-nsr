import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/server/email";
export const dynamic = "force-dynamic";
declare global {
  // eslint-disable-next-line no-var
  var __dawn_volunteers__: Array<Record<string, unknown>> | undefined;
}
const volunteers = globalThis.__dawn_volunteers__ ?? [];
globalThis.__dawn_volunteers__ = volunteers;
export async function GET() {
  return NextResponse.json({ ok: true, count: volunteers.length, items: volunteers });
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, mobile, city, role, experience, availability } = body;
    if (!name || name.length < 2) return NextResponse.json({ ok: false, error: "Name required" }, { status: 400 });
    if (!email || !email.includes("@")) return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });
    if (!mobile) return NextResponse.json({ ok: false, error: "Mobile required" }, { status: 400 });
    if (!availability) return NextResponse.json({ ok: false, error: "Availability required" }, { status: 400 });
    const record = { name, email, mobile, city: city || "", role, experience: experience || "", availability, submittedAt: new Date().toISOString() };
    volunteers.push(record);
    // Send notification to admin
    await sendEmail({
      to: "info@dawncricketclub.pk",
      templateId: "volunteer.application",
      subject: "[Volunteer] " + name + " — " + role,
      body: "New volunteer application\n\nName: " + name + "\nEmail: " + email + "\nMobile: " + mobile + "\nCity: " + (city || "n/a") + "\nRole: " + role + "\nAvailability: " + availability + "\n\nExperience:\n" + (experience || "not provided"),
    }).catch(() => {});
    return NextResponse.json({ ok: true, message: "Thank you! We'll contact you within 48 hours." });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Failed" }, { status: 500 });
  }
}