import type { CricketMatch, BallRecord, Player, Innings } from "./types";
export type BattingLine = {
  playerId: string;
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isOut: boolean;
  dismissalType: string | null;
  dismissedBy: string | null;
  fielder: string | null;
  isStriker: boolean;
  isNonStriker: boolean;
};
export type BowlingLine = {
  playerId: string;
  name: string;
  overs: string;
  balls: number;
  runs: number;
  wickets: number;
  maidens: number;
  economy: number;
  wides: number;
  noBalls: number;
};
function nameOf(players: Player[], id: string | null): string {
  if (!id) return "—";
  return players.find((p) => p.id === id)?.name ?? "—";
}
/* ---------------- Batting ---------------- */
export function buildBatting(m: CricketMatch, inn: Innings, battingPlayers: Player[], bowlingPlayers: Player[]): BattingLine[] {
  const innBalls = m.balls.filter((b) => b.inningsIndex === inn.index);
  const order: string[] = [];
  for (const id of inn.battingOrder) if (!order.includes(id)) order.push(id);
  for (const b of innBalls) {
    if (!order.includes(b.batterId)) order.push(b.batterId);
    if (b.isWicket && b.dismissedPlayerId && !order.includes(b.dismissedPlayerId)) {
      order.push(b.dismissedPlayerId);
    }
  }
  return order.map((id) => {
    const playerBalls = innBalls.filter((b) => b.batterId === id);
    let runs = 0;
    let fours = 0;
    let sixes = 0;
    let ballsFaced = 0;
    for (const b of playerBalls) {
      if (b.extraType === "WIDE") continue;
      if (b.extraType === "BYE" || b.extraType === "LEG_BYE") {
        ballsFaced += 1;
        continue;
      }
      if (b.extraType === "NO_BALL") {
        runs += b.runs;
        if (b.runs === 4) fours += 1;
        if (b.runs === 6) sixes += 1;
        continue;
      }
      runs += b.runs;
      ballsFaced += 1;
      if (b.runs === 4) fours += 1;
      if (b.runs === 6) sixes += 1;
    }
    const wicketBall = innBalls.find(
      (b) => b.isWicket && b.dismissedPlayerId === id
    );
    const strikeRate = ballsFaced > 0 ? Number(((runs / ballsFaced) * 100).toFixed(2)) : 0;
    return {
      playerId: id,
      name: nameOf(battingPlayers, id),
      runs,
      balls: ballsFaced,
      fours,
      sixes,
      strikeRate,
      isOut: !!wicketBall,
      dismissalType: wicketBall?.wicketType ?? null,
      dismissedBy: wicketBall ? nameOf(bowlingPlayers, wicketBall.bowlerId) : null,
      fielder: wicketBall?.fielderId ? nameOf(bowlingPlayers, wicketBall.fielderId) : null,
      isStriker: id === inn.currentStrikerId,
      isNonStriker: id === inn.currentNonStrikerId,
    };
  });
}
export function formatDismissal(line: BattingLine): string {
  if (!line.isOut) {
    if (line.isStriker) return "batting *";
    if (line.isNonStriker) return "batting";
    return "not out";
  }
  switch (line.dismissalType) {
    case "BOWLED": return `b ${line.dismissedBy}`;
    case "CAUGHT": return `c ${line.fielder ?? "?"} b ${line.dismissedBy}`;
    case "LBW": return `lbw b ${line.dismissedBy}`;
    case "RUN_OUT": return `run out (${line.fielder ?? "?"})`;
    case "STUMPED": return `st ${line.fielder ?? "?"} b ${line.dismissedBy}`;
    case "HIT_WICKET": return `hit wicket b ${line.dismissedBy}`;
    case "RETIRED": return "retired";
    default: return "out";
  }
}
/* ---------------- Bowling ---------------- */
export function buildBowling(m: CricketMatch, inn: Innings, bowlingPlayers: Player[]): BowlingLine[] {
  const innBalls = m.balls.filter((b) => b.inningsIndex === inn.index);
  const order: string[] = [];
  for (const id of inn.bowlingOrder) if (!order.includes(id)) order.push(id);
  for (const b of innBalls) if (!order.includes(b.bowlerId)) order.push(b.bowlerId);
  return order.map((id) => {
    const myBalls = innBalls.filter((b) => b.bowlerId === id);
    let legal = 0;
    let runs = 0;
    let wickets = 0;
    let wides = 0;
    let noBalls = 0;
    for (const b of myBalls) {
      if (b.extraType === "WIDE") { runs += 1 + b.runs; wides += 1; continue; }
      if (b.extraType === "NO_BALL") { runs += 1 + b.runs; noBalls += 1; continue; }
      if (b.extraType === "BYE" || b.extraType === "LEG_BYE") { legal += 1; continue; }
      runs += b.runs;
      legal += 1;
      if (b.isWicket && b.wicketType !== "RUN_OUT" && b.wicketType !== "RETIRED") wickets += 1;
    }
    const oversStr = `${Math.floor(legal / 6)}.${legal % 6}`;
    const economy = legal > 0 ? Number((runs / (legal / 6)).toFixed(2)) : 0;
    return {
      playerId: id,
      name: nameOf(bowlingPlayers, id),
      overs: oversStr,
      balls: legal,
      runs,
      wickets,
      maidens: 0,
      economy,
      wides,
      noBalls,
    };
  });
}
/* ---------------- Man of the Match ---------------- */
export function calculateManOfMatch(m: CricketMatch): { playerId: string; name: string; team: string; points: number; summary: string } | null {
  if (m.status !== "COMPLETED") return null;
  type Score = { playerId: string; name: string; team: string; points: number; runs: number; wickets: number };
  const tally = new Map<string, Score>();
  const add = (id: string, name: string, team: string, patch: { runs?: number; wickets?: number; points: number }) => {
    const cur = tally.get(id) ?? { playerId: id, name, team, points: 0, runs: 0, wickets: 0 };
    cur.points += patch.points;
    cur.runs += patch.runs ?? 0;
    cur.wickets += patch.wickets ?? 0;
    tally.set(id, cur);
  };
  for (const inn of m.innings) {
    const battingTeam = m.teamA.id === inn.battingTeamId ? m.teamA : m.teamB;
    const bowlingTeam = m.teamA.id === inn.bowlingTeamId ? m.teamA : m.teamB;
    const bat = buildBatting(m, inn, battingTeam.players, bowlingTeam.players);
    for (const line of bat) {
      const points =
        line.runs * 1 +
        line.fours * 1 +
        line.sixes * 2 +
        (line.runs >= 50 ? 10 : 0) +
        (line.runs >= 100 ? 20 : 0);
      if (points > 0) add(line.playerId, line.name, battingTeam.name, { runs: line.runs, points });
    }
    const bowl = buildBowling(m, inn, bowlingTeam.players);
    for (const line of bowl) {
      const points =
        line.wickets * 20 +
        (line.wickets >= 3 ? 10 : 0) +
        (line.wickets >= 5 ? 20 : 0);
      if (points > 0) add(line.playerId, line.name, bowlingTeam.name, { wickets: line.wickets, points });
    }
  }
  const all = Array.from(tally.values()).sort((a, b) => b.points - a.points);
  const top = all[0];
  if (!top) return null;
  // prefer winner
  const winnerId = m.result?.includes(m.teamA.name) ? m.teamA.id
                 : m.result?.includes(m.teamB.name) ? m.teamB.id
                 : null;
  if (winnerId) {
    const winnerTop = all.find((s) =>
      (m.teamA.name === s.team && m.teamA.id === winnerId) ||
      (m.teamB.name === s.team && m.teamB.id === winnerId)
    );
    if (winnerTop && winnerTop.points >= top.points - 15) {
      return {
        playerId: winnerTop.playerId, name: winnerTop.name, team: winnerTop.team,
        points: winnerTop.points,
        summary: `${winnerTop.runs} runs${winnerTop.wickets > 0 ? `, ${winnerTop.wickets} wkts` : ""}`,
      };
    }
  }
  return {
    playerId: top.playerId, name: top.name, team: top.team,
    points: top.points,
    summary: `${top.runs} runs${top.wickets > 0 ? `, ${top.wickets} wkts` : ""}`,
  };
}