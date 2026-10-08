import { NextRequest, NextResponse } from "next/server";
import { listEmails, sendEmail, clearEmails } from "@/lib/server/email";
export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json({ ok: true, items: listEmails() });
}
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (body.action === "clear") {
    clearEmails();
    return NextResponse.json({ ok: true });
  }
  const to = String(body.to || "").trim();
  if (!to.includes("@")) {
    return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });
  }
  const entry = await sendEmail({
    to,
    templateId: String(body.templateId || "registration.submitted"),
    data: body.data || {},
  });
  return NextResponse.json({ ok: true, entry });
}