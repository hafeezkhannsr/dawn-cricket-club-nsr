import { NextRequest, NextResponse } from "next/server";
import { listNotifications, createNotification, markRead, markAllRead, deleteNotification } from "@/lib/server/notification-store";
export const dynamic = "force-dynamic";
export async function GET() {
  const items = await listNotifications();
  return NextResponse.json({ ok: true, items, unread: items.filter((n) => !n.read).length });
}
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (body.action === "mark-all-read") {
    await markAllRead();
    return NextResponse.json({ ok: true });
  }
  if (body.action === "mark-read" && body.id) {
    await markRead(body.id);
    return NextResponse.json({ ok: true });
  }
  if (body.action === "delete" && body.id) {
    await deleteNotification(body.id);
    return NextResponse.json({ ok: true });
  }
  if (body.action === "create" && body.title && body.message) {
    const n = await createNotification({
      type: body.type || "GENERAL",
      title: body.title,
      message: body.message,
      link: body.link,
    });
    return NextResponse.json({ ok: true, item: n });
  }
  return NextResponse.json({ ok: false, error: "Unknown action" }, { status: 400 });
}