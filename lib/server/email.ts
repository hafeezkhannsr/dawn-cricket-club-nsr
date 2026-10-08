export type EmailLog = {
  id: string;
  to: string;
  subject: string;
  body: string;
  templateId: string;
  provider: "mock" | "resend" | "smtp";
  status: "queued" | "sent" | "failed";
  error?: string;
  createdAt: string;
};
declare global {
  var __dawn_emails__: EmailLog[] | undefined;
}
const logs: EmailLog[] = globalThis.__dawn_emails__ ?? [];
globalThis.__dawn_emails__ = logs;
const TEMPLATES: Record<string, { subject: string; body: (data: Record<string, unknown>) => string }> = {
  "registration.submitted": {
    subject: "Registration received — {{reg}}",
    body: (d) => `Assalam-o-Alaikum ${d.name || "Player"},\n\nWe received your registration (${d.reg}). Our team will review it within 2-3 working days.\n\nTrack status: ${d.statusUrl || "/register?status=check"}\n\n— DAWN Cricket Club`,
  },
  "registration.approved": {
    subject: "Congratulations! Registration approved — {{reg}}",
    body: (d) => `Mubarak ${d.name || "Player"}!\n\nYour registration ${d.reg} has been APPROVED.\n\nView your digital card: ${d.cardUrl || "/player"}\n\n— DAWN Cricket Club`,
  },
  "registration.rejected": {
    subject: "Registration update — {{reg}}",
    body: (d) => `${d.name || "Player"},\n\nUnfortunately, your registration ${d.reg} could not be approved.\n\nReason: ${d.reason || "Please contact the club for details."}\n\n— DAWN Cricket Club`,
  },
  "registration.needs_correction": {
    subject: "Correction needed — {{reg}}",
    body: (d) => `${d.name || "Player"},\n\nSome information needs correction in registration ${d.reg}.\n\nNote: ${d.note || "Please review your submission."}\n\n— DAWN Cricket Club`,
  },
  "payment.verified": {
    subject: "Payment verified — {{reg}}",
    body: (d) => `Payment for ${d.reg} has been verified.\n\nAmount: PKR ${d.amount || "—"}\n\n— DAWN Cricket Club`,
  },
};
function interpolate(tpl: string, data: Record<string, unknown>): string {
  return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => String(data[key] ?? ""));
}
export async function sendEmail(input: {
  to: string;
  templateId: keyof typeof TEMPLATES | string;
  data?: Record<string, unknown>;
  subject?: string;
  body?: string;
}): Promise<EmailLog> {
  const tpl = TEMPLATES[input.templateId];
  const subject = input.subject ?? (tpl ? interpolate(tpl.subject, input.data || {}) : "DAWN message");
  const body = input.body ?? (tpl ? interpolate(tpl.body(input.data || {}), input.data || {}) : "");
  const id = "em-" + Math.random().toString(36).slice(2, 10);
  const entry: EmailLog = {
    id,
    to: input.to,
    subject,
    body,
    templateId: String(input.templateId),
    provider: process.env.RESEND_API_KEY ? "resend" : "mock",
    status: "queued",
    createdAt: new Date().toISOString(),
  };
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "DAWN Cricket Club <noreply@dawncricketclub.pk>",
          to: [input.to],
          subject,
          text: body,
        }),
      });
      if (res.ok) { entry.status = "sent"; }
      else {
        entry.status = "failed";
        entry.error = `HTTP ${res.status}`;
      }
    } catch (e) {
      entry.status = "failed";
      entry.error = e instanceof Error ? e.message : "send error";
    }
  } else {
    // Mock mode — always queue (for dev)
    entry.status = "sent";
  }
  logs.unshift(entry);
  if (logs.length > 500) logs.length = 500;
  // eslint-disable-next-line no-console
  console.log(`[EMAIL ${entry.status}] → ${entry.to} · ${entry.subject}`);
  return entry;
}
export function listEmails(): EmailLog[] {
  return logs.slice(0, 100);
}
export function clearEmails(): void {
  logs.length = 0;
}