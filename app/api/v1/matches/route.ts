import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { listMatches, saveMatch } from "@/lib/server/match-store";
import type { CricketMatch, Team, Player, Innings } from "@/lib/cricket/types";
import { shortName } from "@/lib/cricket/types";
export const dynamic = "force-dynamic";
export async function GET() {
const items = await listMatches();
return NextResponse.json({ ok: true, items });
}
export async function POST(req: NextRequest) {
try {
 const body = await req.json();
 const { title, venue, matchDate, oversPerInnings, teamAName, teamAPlayers, teamBName, teamBPlayers, tossWinnerId, tossDecision } = body;
 if (!title || !venue || !teamAName || !teamBName) {
   return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
 }
 const aPlayers: Player[] = (teamAPlayers || []).slice(0, 11).map((p: { id?: string; name: string }) => ({
   id: p.id || nanoid(8), name: p.name, shortName: shortName(p.name),
 }));
 const bPlayers: Player[] = (teamBPlayers || []).slice(0, 11).map((p: { id?: string; name: string }) => ({
   id: p.id || nanoid(8), name: p.name, shortName: shortName(p.name),
 }));
 if (aPlayers.length < 2 || bPlayers.length < 2) {
   return NextResponse.json({ ok: false, error: "Each team needs at least 2 players" }, { status: 400 });
 }
 const teamA: Team = { id: nanoid(8), name: teamAName, shortName: shortName(teamAName), players: aPlayers };
 const teamB: Team = { id: nanoid(8), name: teamBName, shortName: shortName(teamBName), players: bPlayers };
 const winnerId = tossWinnerId === "A" ? teamA.id : teamB.id;
 const battingFirstTeamId = tossDecision === "BAT" ? winnerId : (winnerId === teamA.id ? teamB.id : teamA.id);
 const bowlingFirstTeamId = battingFirstTeamId === teamA.id ? teamB.id : teamA.id;
 const innings1: Innings = {
   index: 0, battingTeamId: battingFirstTeamId, bowlingTeamId: bowlingFirstTeamId,
   runs: 0, wickets: 0, balls: 0,
   extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0 },
   battingOrder: [], bowlingOrder: [],
   currentStrikerId: null, currentNonStrikerId: null, currentBowlerId: null,
   isComplete: false,
 };
 const match: CricketMatch = {
   id: nanoid(10),
   matchNumber: "M-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000),
   title, venue, matchDate,
   oversPerInnings: Number(oversPerInnings) || 20,
   status: "LIVE",
   teamA, teamB,
   tossWinnerId: winnerId, tossDecision,
   innings: [innings1],
   currentInnings: 0, balls: [], result: null,
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
 };
 await saveMatch(match);
 return NextResponse.json({ ok: true, id: match.id });
} catch (e) {
 return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Unknown error" }, { status: 500 });
}
}