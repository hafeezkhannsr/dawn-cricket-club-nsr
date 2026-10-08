import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
/**
 * Simple connectivity check for the configured Google Sheets webhook.
 * GET /api/v1/export/sheets-setup/test
 * Returns ok:false with a helpful message if GOOGLE_SHEETS_WEBHOOK_URL is missing.
 */
export async function GET() {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_SECRET;
  if (!url) {
    return NextResponse.json({
      ok: false,
      configured: false,
      error: "GOOGLE_SHEETS_WEBHOOK_URL is not set in .env.local",
      hint: "Follow the instructions at /admin → Export & Sync → 'How to connect Google Sheets'",
    });
  }
  try {
    const res = await fetch(url, { method: "GET" });
    const text = (await res.text()).slice(0, 200);
    return NextResponse.json({
      ok: res.ok,
      configured: true,
      hasSecret: !!secret,
      status: res.status,
      sample: text,
    });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      configured: true,
      error: e instanceof Error ? e.message : "Network error",
    });
  }
}