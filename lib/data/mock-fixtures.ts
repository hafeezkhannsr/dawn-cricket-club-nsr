import { MOCK_TOURNAMENTS } from "./mock-tournaments";
export type FixtureStatus = "UPCOMING" | "LIVE" | "COMPLETED" | "CANCELLED";
export type Fixture = {
  id: string;
  tournamentName: string;
  tournamentId: string;
  matchNumber: string;
  teamA: string;
  teamAShort: string;
  teamB: string;
  teamBShort: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  format: string;
  group?: string;
  status: FixtureStatus;
  teamAScore?: string;
  teamAOvers?: string;
  teamBScore?: string;
  teamBOvers?: string;
  result?: string;
};
// Aggregate all matches from all tournaments
export const ALL_FIXTURES: Fixture[] = MOCK_TOURNAMENTS.flatMap((t) =>
  t.matches.map((m) => ({
    id: m.id,
    tournamentName: t.name,
    tournamentId: t.id,
    matchNumber: m.matchNumber,
    teamA: m.teamA.name,
    teamAShort: m.teamA.shortName,
    teamB: m.teamB.name,
    teamBShort: m.teamB.shortName,
    date: m.date,
    time: m.time,
    venue: m.venue,
    city: m.city,
    format: m.format,
    group: m.group,
    status: (m.status === "UPCOMING" ? "UPCOMING" : m.status === "LIVE" ? "LIVE" : m.status === "COMPLETED" ? "COMPLETED" : "CANCELLED") as FixtureStatus,
    teamAScore: m.teamAScore,
    teamAOvers: m.teamAOvers,
    teamBScore: m.teamBScore,
    teamBOvers: m.teamBOvers,
    result: m.result,
  }))
);
export function getUpcomingFixtures(): Fixture[] {
  return ALL_FIXTURES.filter((f) => f.status === "UPCOMING").sort((a, b) => a.date.localeCompare(b.date));
}
export function getLiveFixtures(): Fixture[] {
  return ALL_FIXTURES.filter((f) => f.status === "LIVE");
}
export function getRecentResults(): Fixture[] {
  return ALL_FIXTURES.filter((f) => f.status === "COMPLETED").sort((a, b) => b.date.localeCompare(a.date));
}
export function getFixturesByTournament(tid: string): Fixture[] {
  return ALL_FIXTURES.filter((f) => f.tournamentId === tid);
}