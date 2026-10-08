import { NextResponse } from "next/server";
import { listAll } from "@/lib/server/registration-store";
import { listMatches } from "@/lib/server/match-store";
import { buildBatting, buildBowling } from "@/lib/cricket/scorecard";
export const dynamic = "force-dynamic";
type PlayerStat = {
  playerId: string;
  name: string;
  team: string;
  matches: number;
  // batting
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  highest: number;
  fifties: number;
  hundreds: number;
  // bowling
  wickets: number;
  overs: number;
  runsConceded: number;
  best: string;
  // shared
  strikeRate: number;
  average: number;
  economy: number;
};
export async function GET() {
  const matches = listMatches().filter((m) => m.status === "COMPLETED" || m.status === "LIVE");
  const players = new Map<string, PlayerStat>();
  for (const m of matches) {
    for (const inn of m.innings) {
      const battingTeam = m.teamA.id === inn.battingTeamId ? m.teamA : m.teamB;
      const bowlingTeam = m.teamA.id === inn.bowlingTeamId ? m.teamA : m.teamB;
      const bat = buildBatting(m, inn, battingTeam.players, bowlingTeam.players);
      for (const b of bat) {
        const key = b.playerId;
        const cur = players.get(key) ?? {
          playerId: b.playerId, name: b.name, team: battingTeam.name,
          matches: 0,
          runs: 0, balls: 0, fours: 0, sixes: 0, highest: 0, fifties: 0, hundreds: 0,
          wickets: 0, overs: 0, runsConceded: 0, best: "-",
          strikeRate: 0, average: 0, economy: 0,
        };
        cur.runs += b.runs;
        cur.balls += b.balls;
        cur.fours += b.fours;
        cur.sixes += b.sixes;
        if (b.runs > cur.highest) cur.highest = b.runs;
        if (b.runs >= 50 && b.runs < 100) cur.fifties += 1;
        if (b.runs >= 100) cur.hundreds += 1;
        players.set(key, cur);
      }
      const bowl = buildBowling(m, inn, bowlingTeam.players);
      for (const b of bowl) {
        const key = b.playerId;
        const cur = players.get(key) ?? {
          playerId: b.playerId, name: b.name, team: bowlingTeam.name,
          matches: 0,
          runs: 0, balls: 0, fours: 0, sixes: 0, highest: 0, fifties: 0, hundreds: 0,
          wickets: 0, overs: 0, runsConceded: 0, best: "-",
          strikeRate: 0, average: 0, economy: 0,
        };
        cur.wickets += b.wickets;
        cur.overs += b.balls;
        cur.runsConceded += b.runs;
        if (b.wickets > 0) {
          const prevBest = cur.best === "-" ? 0 : Number(cur.best.split("/")[0]);
          if (b.wickets > prevBest) cur.best = `${b.wickets}/${b.runs}`;
        }
        players.set(key, cur);
      }
    }
  }
  // Match counts per player
  for (const m of matches) {
    const seen = new Set<string>();
    for (const t of [m.teamA, m.teamB]) {
      for (const p of t.players) {
        if (seen.has(p.id)) continue;
        seen.add(p.id);
        const cur = players.get(p.id);
        if (cur) cur.matches += 1;
      }
    }
  }
  const arr = Array.from(players.values()).map((s) => ({
    ...s,
    strikeRate: s.balls > 0 ? Number(((s.runs / s.balls) * 100).toFixed(2)) : 0,
    economy: s.overs > 0 ? Number((s.runsConceded / (s.overs / 6)).toFixed(2)) : 0,
    average: s.wickets > 0 ? Number((s.runsConceded / s.wickets).toFixed(2)) : 0,
  }));
  const topBatters = [...arr].sort((a, b) => b.runs - a.runs).slice(0, 20);
  const topBowlers = [...arr].sort((a, b) => b.wickets - a.wickets || a.economy - b.economy).slice(0, 20);
  const topSixes = [...arr].sort((a, b) => b.sixes - a.sixes).slice(0, 10);
  // Public club-level stats
  const approved = listAll().filter((r) => r.status === "APPROVED");
  const totalPlayers = approved.length;
  const totalMatches = matches.length;
  const liveMatches = listMatches().filter((m) => m.status === "LIVE").length;
  return NextResponse.json({
    ok: true,
    club: {
      totalPlayers,
      totalMatches,
      liveMatches,
    },
    topBatters,
    topBowlers,
    topSixes,
  });
}