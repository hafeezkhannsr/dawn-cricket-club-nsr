import type { CricketMatch, BallRecord, Innings } from "@/lib/cricket/types";
declare global {
  var __dawn_matches__: Map<string, CricketMatch> | undefined;
}
const matches: Map<string, CricketMatch> =
  globalThis.__dawn_matches__ ?? new Map<string, CricketMatch>();
globalThis.__dawn_matches__ = matches;
export function listMatches(): CricketMatch[] {
  return Array.from(matches.values()).sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
}
export function getMatch(id: string): CricketMatch | undefined {
  return matches.get(id);
}
export function saveMatch(m: CricketMatch): CricketMatch {
  m.updatedAt = new Date().toISOString();
  matches.set(m.id, m);
  return m;
}
export function deleteMatch(id: string): boolean {
  return matches.delete(id);
}
function currentInnings(m: CricketMatch): Innings {
  return m.innings[m.currentInnings];
}
export function recordBall(
  matchId: string,
  input: {
    runs: number;
    extraType?: "WIDE" | "NO_BALL" | "BYE" | "LEG_BYE" | null;
    isWicket?: boolean;
    wicketType?: string | null;
    fielderId?: string | null;
    dismissedPlayerId?: string | null;
    commentary?: string;
  }
): { ok: true; match: CricketMatch } | { ok: false; error: string } {
  const m = getMatch(matchId);
  if (!m) return { ok: false, error: "Match not found" };
  if (m.status !== "LIVE") return { ok: false, error: "Match is not live" };
  const inn = currentInnings(m);
  if (inn.isComplete) return { ok: false, error: "Innings already complete" };
  const strikerId = inn.currentStrikerId;
  const bowlerId = inn.currentBowlerId;
  if (!strikerId || !bowlerId) return { ok: false, error: "Select striker and bowler first" };
  const legalBefore = inn.balls;
  const ballInOver = (legalBefore % 6) + 1;
  const overNumber = Math.floor(legalBefore / 6);
  const isLegal = input.extraType !== "WIDE" && input.extraType !== "NO_BALL";
  const runs = input.runs | 0;
  const ball: BallRecord = {
    id: Math.random().toString(36).slice(2, 12),
    inningsIndex: m.currentInnings,
    overNumber,
    ballInOver,
    batterId: strikerId,
    bowlerId,
    runs,
    extraType: (input.extraType as never) ?? null,
    extraRuns: input.extraType ? 1 : 0,
    isWicket: !!input.isWicket,
    wicketType: (input.wicketType as never) ?? null,
    dismissedPlayerId: input.dismissedPlayerId ?? (input.isWicket ? strikerId : null),
    fielderId: input.fielderId ?? null,
    commentary: input.commentary,
    timestamp: new Date().toISOString(),
  };
  if (input.extraType === "WIDE") {
    inn.runs += 1 + runs;
    inn.extras.wides += 1 + runs;
  } else if (input.extraType === "NO_BALL") {
    inn.runs += 1 + runs;
    inn.extras.noBalls += 1;
  } else if (input.extraType === "BYE") {
    inn.runs += runs;
    inn.extras.byes += runs;
  } else if (input.extraType === "LEG_BYE") {
    inn.runs += runs;
    inn.extras.legByes += runs;
  } else {
    inn.runs += runs;
  }
  if (isLegal) inn.balls += 1;
  if (input.isWicket) inn.wickets += 1;
  m.balls.push(ball);
  const isBoundaryOrOdd = !input.isWicket && (runs % 2 === 1);
  if (isBoundaryOrOdd) {
    const tmp = inn.currentStrikerId;
    inn.currentStrikerId = inn.currentNonStrikerId;
    inn.currentNonStrikerId = tmp;
  }
  if (isLegal && inn.balls % 6 === 0) {
    const tmp = inn.currentStrikerId;
    inn.currentStrikerId = inn.currentNonStrikerId;
    inn.currentNonStrikerId = tmp;
    inn.currentBowlerId = null;
  }
  const maxBalls = m.oversPerInnings * 6;
  const target = m.currentInnings === 1 ? m.innings[0].runs + 1 : null;
  if (target !== null && inn.runs >= target) {
    inn.isComplete = true;
    m.status = "COMPLETED";
    const winner = m.teamA.id === inn.battingTeamId ? m.teamA.name : m.teamB.name;
    const wktsLeft = 10 - inn.wickets;
    m.result = `${winner} won by ${wktsLeft} wicket${wktsLeft === 1 ? "" : "s"}`;
  } else if (inn.balls >= maxBalls || inn.wickets >= 10) {
    inn.isComplete = true;
    if (m.currentInnings === 0) {
      m.status = "INNINGS_BREAK";
    } else {
      m.status = "COMPLETED";
      const first = m.innings[0].runs;
      const second = inn.runs;
      if (second > first) {
        const winner = m.teamA.id === inn.battingTeamId ? m.teamA.name : m.teamB.name;
        const wktsLeft = 10 - inn.wickets;
        m.result = `${winner} won by ${wktsLeft} wicket${wktsLeft === 1 ? "" : "s"}`;
      } else if (second < first) {
        const winner = m.teamA.id === m.innings[0].battingTeamId ? m.teamA.name : m.teamB.name;
        const margin = first - second;
        m.result = `${winner} won by ${margin} run${margin === 1 ? "" : "s"}`;
      } else {
        m.result = "Match tied";
      }
    }
  }
  return { ok: true, match: saveMatch(m) };
}
export function undoLastBall(matchId: string): { ok: true; match: CricketMatch } | { ok: false; error: string } {
  const m = getMatch(matchId);
  if (!m) return { ok: false, error: "Match not found" };
  const ball = m.balls.pop();
  if (!ball) return { ok: false, error: "Nothing to undo" };
  const inn = m.innings[ball.inningsIndex];
  const isLegal = ball.extraType !== "WIDE" && ball.extraType !== "NO_BALL";
  if (ball.extraType === "WIDE") {
    inn.runs -= 1 + ball.runs;
    inn.extras.wides -= 1 + ball.runs;
  } else if (ball.extraType === "NO_BALL") {
    inn.runs -= 1 + ball.runs;
    inn.extras.noBalls -= 1;
  } else if (ball.extraType === "BYE") {
    inn.runs -= ball.runs;
    inn.extras.byes -= ball.runs;
  } else if (ball.extraType === "LEG_BYE") {
    inn.runs -= ball.runs;
    inn.extras.legByes -= ball.runs;
  } else {
    inn.runs -= ball.runs;
  }
  if (isLegal) inn.balls -= 1;
  if (ball.isWicket) inn.wickets -= 1;
  if (isLegal && (inn.balls % 6 === 0)) {
    const tmp = inn.currentStrikerId;
    inn.currentStrikerId = inn.currentNonStrikerId;
    inn.currentNonStrikerId = tmp;
  }
  if (!ball.isWicket && ball.runs % 2 === 1) {
    const tmp = inn.currentStrikerId;
    inn.currentStrikerId = inn.currentNonStrikerId;
    inn.currentNonStrikerId = tmp;
  }
  inn.isComplete = false;
  m.status = "LIVE";
  m.result = null;
  return { ok: true, match: saveMatch(m) };
}
export function startSecondInnings(matchId: string): { ok: true; match: CricketMatch } | { ok: false; error: string } {
  const m = getMatch(matchId);
  if (!m) return { ok: false, error: "Match not found" };
  if (m.currentInnings === 1) return { ok: false, error: "Already in second innings" };
  const first = m.innings[0];
  if (!first.isComplete) return { ok: false, error: "First innings not complete" };
  const newInnings: Innings = {
    index: 1,
    battingTeamId: first.bowlingTeamId,
    bowlingTeamId: first.battingTeamId,
    runs: 0,
    wickets: 0,
    balls: 0,
    extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0 },
    battingOrder: [],
    bowlingOrder: [],
    currentStrikerId: null,
    currentNonStrikerId: null,
    currentBowlerId: null,
    isComplete: false,
  };
  m.innings.push(newInnings);
  m.currentInnings = 1;
  m.status = "LIVE";
  return { ok: true, match: saveMatch(m) };
}