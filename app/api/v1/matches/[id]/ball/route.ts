import { NextRequest, NextResponse } from "next/server";
import { recordBall, undoLastBall } from "@/lib/server/match-store";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  if (body.action === "undo") { const r = await undoLastBall(id); if (!r.ok) return NextResponse.json(r, { status: 400 }); return NextResponse.json({ ok: true, match: r.match }); }
  const r = await recordBall(id, { runs: Number(body.runs) || 0, extraType: body.extraType || null, isWicket: !!body.isWicket, wicketType: body.wicketType || null, fielderId: body.fielderId || null, dismissedPlayerId: body.dismissedPlayerId || null, commentary: body.commentary || "" });
  if (!r.ok) return NextResponse.json(r, { status: 400 });
  return NextResponse.json({ ok: true, match: r.match });
}