export type MatchStatus = "SCHEDULED" | "LIVE" | "INNINGS_BREAK" | "COMPLETED" | "ABANDONED";
export type TossDecision = "BAT" | "BOWL";
export type ExtraType = "WIDE" | "NO_BALL" | "BYE" | "LEG_BYE" | null;
export type WicketType =
  | "BOWLED"
  | "CAUGHT"
  | "LBW"
  | "RUN_OUT"
  | "STUMPED"
  | "HIT_WICKET"
  | "RETIRED"
  | null;
export type Player = {
  id: string;
  name: string;
  shortName: string;
};
export type Team = {
  id: string;
  name: string;
  shortName: string;
  players: Player[];
};
export type BallRecord = {
  id: string;
  inningsIndex: 0 | 1;
  overNumber: number;
  ballInOver: number;
  batterId: string;
  bowlerId: string;
  runs: number;
  extraType: ExtraType;
  extraRuns: number;
  isWicket: boolean;
  wicketType: WicketType;
  dismissedPlayerId: string | null;
  fielderId: string | null;
  commentary?: string;
  timestamp: string;
};
export type Innings = {
  index: 0 | 1;
  battingTeamId: string;
  bowlingTeamId: string;
  runs: number;
  wickets: number;
  balls: number;
  extras: {
    wides: number;
    noBalls: number;
    byes: number;
    legByes: number;
  };
  battingOrder: string[];
  bowlingOrder: string[];
  currentStrikerId: string | null;
  currentNonStrikerId: string | null;
  currentBowlerId: string | null;
  isComplete: boolean;
};
export type CricketMatch = {
  id: string;
  matchNumber: string;
  title: string;
  venue: string;
  matchDate: string;
  oversPerInnings: number;
  status: MatchStatus;
  teamA: Team;
  teamB: Team;
  tossWinnerId: string;
  tossDecision: TossDecision;
  innings: Innings[];
  currentInnings: 0 | 1;
  balls: BallRecord[];
  result: string | null;
  createdAt: string;
  updatedAt: string;
};
/* ----------- helpers ----------- */
export function oversDisplay(balls: number): string {
  const o = Math.floor(balls / 6);
  const b = balls % 6;
  return `${o}.${b}`;
}
export function runRate(runs: number, balls: number): string {
  if (balls === 0) return "0.00";
  return (runs / (balls / 6)).toFixed(2);
}
export function requiredRunRate(target: number, runs: number, ballsRemaining: number): string {
  if (ballsRemaining <= 0) return "0.00";
  const need = target - runs;
  if (need <= 0) return "0.00";
  return (need / (ballsRemaining / 6)).toFixed(2);
}
export function shortName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 8);
  return (parts[0][0] + ". " + parts[parts.length - 1]).slice(0, 14);
}