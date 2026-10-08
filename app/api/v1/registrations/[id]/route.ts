import { NextRequest, NextResponse } from "next/server";
import { getById, updateStatus, updatePaymentStatus } from "@/lib/server/registration-store";
export const dynamic = "force-dynamic";
export async function GET(_: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const r = await getById(id);
  if (!r) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, item: r });
}
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const action = body.action as string | undefined;
  const note = body.note as string | undefined;
  const paymentStatus = body.paymentStatus as string | undefined;
  if (action === "approve") { const r = await updateStatus(id, "APPROVED", note); if (!r) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 }); return NextResponse.json({ ok: true, item: r }); }
  if (action === "reject") { const r = await updateStatus(id, "REJECTED", note); if (!r) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 }); return NextResponse.json({ ok: true, item: r }); }
  if (action === "needs_correction") { const r = await updateStatus(id, "NEEDS_CORRECTION", note); if (!r) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 }); return NextResponse.json({ ok: true, item: r }); }
  if (action === "under_review") { const r = await updateStatus(id, "UNDER_REVIEW", note); if (!r) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 }); return NextResponse.json({ ok: true, item: r }); }
  if (action === "payment" && paymentStatus) { const r = await updatePaymentStatus(id, paymentStatus as never); if (!r) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 }); return NextResponse.json({ ok: true, item: r }); }
  return NextResponse.json({ ok: false, error: "Unknown action" }, { status: 400 });
}
export async function DELETE(_: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const { remove } = await import("@/lib/server/registration-store");
  return NextResponse.json({ ok: await remove(id) });
}