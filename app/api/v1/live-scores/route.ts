import { NextResponse } from "next/server";
import { listMatches } from "@/lib/server/match-store";
import { MOCK_TOURNAMENTS } from "@/lib/data/mock-tournaments";
export const dynamic = "force-dynamic";
export async function GET() {
  const realLive = (await listMatches()).filter((m) => m.status === "LIVE");
  const items = realLive.map((m) => {
    const inn = m.innings[m.currentInnings];
    const battingTeam = m.teamA.id === inn.battingTeamId ? m.teamA : m.teamB;
    return { id: m.id, matchNumber: m.matchNumber, tournamentName: m.title, teamA: m.teamA.name, teamAShort: m.teamA.shortName, teamB: m.teamB.name, teamBShort: m.teamB.shortName, teamAScore: m.teamA.id === battingTeam.id ? (inn.runs + "/" + inn.wickets) : null, teamAOvers: m.teamA.id === battingTeam.id ? (Math.floor(inn.balls / 6) + "." + (inn.balls % 6)) : null, teamBScore: m.teamB.id === battingTeam.id ? (inn.runs + "/" + inn.wickets) : null, teamBOvers: m.teamB.id === battingTeam.id ? (Math.floor(inn.balls / 6) + "." + (inn.balls % 6)) : null, status: m.status, venue: m.venue, city: m.venue, format: m.oversPerInnings + " overs", result: m.result, battingTeamId: inn.battingTeamId };
  });
  const mockLive = MOCK_TOURNAMENTS.flatMap((t) => t.matches.filter((m) => m.status === "LIVE").map((m) => ({ id: m.id, matchNumber: m.matchNumber, tournamentName: t.name, teamA: m.teamA.name, teamAShort: m.teamA.shortName, teamB: m.teamB.name, teamBShort: m.teamB.shortName, teamAScore: m.teamAScore || null, teamAOvers: m.teamAOvers || null, teamBScore: m.teamBScore || null, teamBOvers: m.teamBOvers || null, status: m.status, venue: m.venue, city: m.city, format: m.format, result: m.result || null, battingTeamId: null })));
  return NextResponse.json({ ok: true, items: [...items, ...mockLive], fetchedAt: new Date().toISOString() });
}