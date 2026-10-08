import { NextRequest, NextResponse } from "next/server";
import { getMatch, saveMatch, startSecondInnings, deleteMatch } from "@/lib/server/match-store";
export const dynamic = "force-dynamic";
export async function GET(_: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const m = await getMatch(id);
  if (!m) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, match: m });
}
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const m = await getMatch(id);
  if (!m) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  if (body.action === "set-players") {
    const inn = m.innings[m.currentInnings];
    if (typeof body.strikerId === "string") inn.currentStrikerId = body.strikerId;
    if (typeof body.nonStrikerId === "string") inn.currentNonStrikerId = body.nonStrikerId;
    if (typeof body.bowlerId === "string") inn.currentBowlerId = body.bowlerId;
    if (inn.currentStrikerId && !inn.battingOrder.includes(inn.currentStrikerId)) inn.battingOrder.push(inn.currentStrikerId);
    if (inn.currentNonStrikerId && !inn.battingOrder.includes(inn.currentNonStrikerId)) inn.battingOrder.push(inn.currentNonStrikerId);
    if (inn.currentBowlerId && !inn.bowlingOrder.includes(inn.currentBowlerId)) inn.bowlingOrder.push(inn.currentBowlerId);
    await saveMatch(m);
    return NextResponse.json({ ok: true, match: m });
  }
  if (body.action === "start-second-innings") { const r = await startSecondInnings(id); if (!r.ok) return NextResponse.json(r, { status: 400 }); return NextResponse.json({ ok: true, match: r.match }); }
  if (body.action === "set-bowler" && typeof body.bowlerId === "string") { const inn = m.innings[m.currentInnings]; inn.currentBowlerId = body.bowlerId; if (!inn.bowlingOrder.includes(body.bowlerId)) inn.bowlingOrder.push(body.bowlerId); await saveMatch(m); return NextResponse.json({ ok: true, match: m }); }
  return NextResponse.json({ ok: false, error: "Unknown action" }, { status: 400 });
}
export async function DELETE(_: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  return NextResponse.json({ ok: await deleteMatch(id) });
}