import { NextRequest, NextResponse } from "next/server";
import { getById, updateData } from "@/lib/server/registration-store";
import { deepDeleteRegistration } from "@/lib/server/deep-delete";
export const dynamic = "force-dynamic";
export async function GET(_: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const r = await getById(id);
  if (!r) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, item: r });
}
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const r = await getById(id);
  if (!r) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  if (!["DRAFT", "NEEDS_CORRECTION", "SUBMITTED", "UNDER_REVIEW"].includes(r.status)) return NextResponse.json({ ok: false, error: "Editing not allowed" }, { status: 400 });
  const body = await req.json().catch(() => ({}));
  const patch = (body.patch || {}) as Record<string, unknown>;
  for (const k of ["id", "registrationNumber", "program", "registrationType", "feeAmount", "currency", "status", "paymentStatus"]) delete patch[k];
  const updated = await updateData(id, patch);
  return NextResponse.json({ ok: true, item: updated });
}
export async function DELETE(_: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const result = await deepDeleteRegistration(id);
  if (!result.ok) return NextResponse.json({ ok: false, error: "Delete failed", details: result.errors }, { status: 400 });
  return NextResponse.json({ ok: true, removedFiles: result.removedFiles, sheetsNotified: result.sheetsNotified, warnings: result.errors });
}