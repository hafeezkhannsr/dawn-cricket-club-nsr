import { NextRequest, NextResponse } from "next/server";
import { getById, updateData, remove } from "@/lib/server/registration-store";
import { deepDeleteRegistration } from "@/lib/server/deep-delete";
export const dynamic = "force-dynamic";
/* GET — full details (used by /player/registrations/[id]) */
export async function GET(_: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const r = getById(id);
  if (!r) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, item: r });
}
/* PATCH — edit allowed only when status is DRAFT / NEEDS_CORRECTION / SUBMITTED */
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const r = getById(id);
  if (!r) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  if (!["DRAFT", "NEEDS_CORRECTION", "SUBMITTED", "UNDER_REVIEW"].includes(r.status)) {
    return NextResponse.json(
      { ok: false, error: `Editing not allowed when status is ${r.status}. Contact the club.` },
      { status: 400 }
    );
  }
  const body = await req.json().catch(() => ({}));
  const patch = (body.patch || {}) as Record<string, unknown>;
  // Never allow override of protected fields
  for (const k of ["id", "registrationNumber", "program", "registrationType", "feeAmount", "currency", "status", "paymentStatus"]) {
    delete patch[k];
  }
  const updated = updateData(id, patch);
  return NextResponse.json({ ok: true, item: updated });
}
/* DELETE — deep delete: SQLite + files + Google Sheets */
export async function DELETE(_: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const result = await deepDeleteRegistration(id);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Delete failed", details: result.errors },
      { status: 400 }
    );
  }
  return NextResponse.json({
    ok: true,
    removedFiles: result.removedFiles,
    sheetsNotified: result.sheetsNotified,
    warnings: result.errors,
  });
}