import type { Tournament, Match, PointTableRow, LeaderboardEntry, Team } from "./tournament-types";
const TEAMS_PCB_U15: Team[] = [
  { id: "t1", name: "Government High School Nowshera", shortName: "GHSN", city: "Nowshera" },
  { id: "t2", name: "Allied School Sohan Campus", shortName: "ASSC", city: "Rawalpindi" },
  { id: "t3", name: "Roots Garden School", shortName: "RGS", city: "Islamabad" },
  { id: "t4", name: "Government Zakhi Qabristan Nowshera", shortName: "GZQN", city: "Nowshera" },
  { id: "t5", name: "Peshawar Model School", shortName: "PMS", city: "Peshawar" },
  { id: "t6", name: "Beaconhouse Mardan", shortName: "BHM", city: "Mardan" },
];
function makePointRow(rank: number, team: Team, w: number, l: number, nr = 0): PointTableRow {
  const m = w + l + nr;
  const pts = w * 2 + nr * 1;
  return {
    rank,
    teamId: team.id,
    teamName: team.name,
    shortName: team.shortName,
    matches: m,
    won: w,
    lost: l,
    draw: 0,
    nr,
    points: pts,
    pct: ((pts / (m * 2 || 1)) * 100).toFixed(3),
    seriesForm: [
      ...Array.from({ length: w }, () => "WIN" as const),
      ...Array.from({ length: l }, () => "LOSS" as const),
      ...Array.from({ length: nr }, () => "NR" as const),
    ],
    runRate: Number((Math.random() * 3 - 1.5).toFixed(3)),
  };
}
function makeMockMatches(tid: string, teams: Team[]): Match[] {
  const cities = ["Rawalpindi", "Nowshera", "Peshawar", "Mardan", "Islamabad"];
  const groups = ["Group A", "Group B", "POOL A"];
  const matches: Match[] = [];
  let mNo = 1;
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      if (matches.length >= 12) break;
      const status = matches.length < 3 ? "LIVE" : matches.length < 6 ? "COMPLETED" : "UPCOMING";
      const aRuns = Math.floor(Math.random() * 150) + 80;
      const bRuns = Math.floor(Math.random() * 150) + 80;
      const aWkts = Math.floor(Math.random() * 8) + 2;
      const bWkts = Math.floor(Math.random() * 8) + 2;
      const aOvers = (Math.random() * 20 + 20).toFixed(1);
      const bOvers = (Math.random() * 20 + 20).toFixed(1);
      matches.push({
        id: `m-${tid}-${mNo}`,
        matchNumber: `MATCH ${mNo}`,
        tournamentId: tid,
        teamA: teams[i],
        teamB: teams[j],
        venue: `${cities[mNo % cities.length]} Cricket Ground`,
        city: cities[mNo % cities.length],
        date: `2026-${(10 + (mNo % 3)).toString().padStart(2, "0")}-${(mNo * 3 % 28 + 1).toString().padStart(2, "0")}`,
        time: "10:00 AM",
        status: status as never,
        format: "T40",
        group: groups[mNo % groups.length],
        teamAScore: status === "UPCOMING" ? undefined : `${aRuns}/${aWkts}`,
        teamAOvers: status === "UPCOMING" ? undefined : aOvers,
        teamBScore: status === "UPCOMING" ? undefined : `${bRuns}/${bWkts}`,
        teamBOvers: status === "UPCOMING" ? undefined : bOvers,
        result: status === "COMPLETED"
          ? aRuns > bRuns
            ? `${teams[i].shortName} won by ${Math.max(1, 10 - bWkts)} wickets`
            : `${teams[j].shortName} won by ${Math.abs(aRuns - bRuns)} runs`
          : undefined,
        winnerId: status === "COMPLETED" ? (aRuns > bRuns ? teams[i].id : teams[j].id) : undefined,
        toss: `${teams[i].shortName} won the toss and elected to bat`,
      });
      mNo++;
    }
  }
  return matches;
}
function makeBattingLeaderboard(): LeaderboardEntry[] {
  const players = [
    { name: "Naseer Ahmad", team: "GZQN", runs: 91, sr: 175.0, hs: "66" },
    { name: "Muhammad Musa", team: "GHSN", runs: 58, sr: 87.88, hs: "54" },
    { name: "Roohullah", team: "GHSN", runs: 47, sr: 73.44, hs: "25" },
    { name: "Maaz Khan", team: "GZQN", runs: 47, sr: 88.68, hs: "40" },
    { name: "Adnan Irshad", team: "GHSN", runs: 46, sr: 46.67, hs: "44" },
    { name: "Hamza Ahmad", team: "GHSN", runs: 42, sr: 63.64, hs: "30" },
    { name: "Umad Rohail", team: "GHSN", runs: 25, sr: 25.0, hs: "15" },
    { name: "Asad Khan", team: "ASSC", runs: 38, sr: 110.0, hs: "28" },
    { name: "Fida Ullah", team: "RGS", runs: 30, sr: 95.0, hs: "22" },
    { name: "Wajdan Tariq", team: "PMS", runs: 22, sr: 78.5, hs: "18" },
  ];
  return players.map((p, i) => ({
    rank: i + 1,
    playerId: `p-${i + 1}`,
    playerName: p.name,
    teamName: p.team,
    matches: 3,
    innings: 2 + (i % 2),
    runs: p.runs,
    balls: Math.round((p.runs / p.sr) * 100),
    highScore: p.hs,
    strikeRate: p.sr,
  }));
}
function makeBowlingLeaderboard(): LeaderboardEntry[] {
  const players = [
    { name: "Asad Khan", team: "ASSC", wickets: 8, econ: 4.33, best: "4/12" },
    { name: "Fida Ullah", team: "RGS", wickets: 6, econ: 2.0, best: "3/8" },
    { name: "Wajdan Tariq", team: "PMS", wickets: 5, econ: 5.67, best: "3/22" },
    { name: "N. Shah", team: "BHM", wickets: 4, econ: 5.0, best: "2/14" },
    { name: "M. Hassan", team: "GHSN", wickets: 4, econ: 3.5, best: "2/18" },
  ];
  return players.map((p, i) => ({
    rank: i + 1,
    playerId: `bw-${i + 1}`,
    playerName: p.name,
    teamName: p.team,
    matches: 4,
    innings: 4,
    wickets: p.wickets,
    economy: p.econ,
    best: p.best,
  }));
}
function makeFieldersLeaderboard(): LeaderboardEntry[] {
  const players = [
    { name: "Naseer Ahmad", team: "GZQN", catches: 5, stumpings: 2 },
    { name: "Roohullah", team: "GHSN", catches: 4, stumpings: 1 },
    { name: "Adnan Irshad", team: "GHSN", catches: 3, stumpings: 3 },
    { name: "Maaz Khan", team: "GZQN", catches: 3, stumpings: 0 },
  ];
  return players.map((p, i) => ({
    rank: i + 1,
    playerId: `f-${i + 1}`,
    playerName: p.name,
    teamName: p.team,
    matches: 4,
    innings: 4,
    catches: p.catches,
    stumpings: p.stumpings,
  }));
}
// ==============================
// TOURNAMENT 1: PCB U15 Talent Hunt
// ==============================
export const PCB_U15: Tournament = {
  id: "pcb-u15-2026-27",
  name: "PCB TALENT HUNT SCHOOL PROGRAMME 2026-27",
  shortName: "PCB U15",
  ageGroup: "U15",
  season: "2026-27",
  status: "LIVE",
  startDate: "2026-09-15",
  endDate: "2026-11-30",
  organizer: "Pakistan Cricket Board",
  region: "Khyber Pakhtunkhwa",
  group: "Group A",
  format: "T40",
  teams: TEAMS_PCB_U15,
  matches: makeMockMatches("pcb-u15-2026-27", TEAMS_PCB_U15),
  pointTable: [
    makePointRow(1, TEAMS_PCB_U15[1], 2, 0, 0),
    makePointRow(2, TEAMS_PCB_U15[0], 1, 1, 0),
    makePointRow(3, TEAMS_PCB_U15[2], 0, 1, 1),
    makePointRow(4, TEAMS_PCB_U15[3], 0, 1, 1),
  ],
  leaderboard: {
    batsmen: makeBattingLeaderboard(),
    bowlers: makeBowlingLeaderboard(),
    fielders: makeFieldersLeaderboard(),
    teams: [],
  },
  awards: {
    bestBatsman: "Naseer Ahmad",
    bestBowler: "Asad Khan",
    bestFielder: "Naseer Ahmad",
  },
  followers: 648,
  visits: 104800,
};
// ==============================
// TOURNAMENT 2: PCB U17
// ==============================
export const PCB_U17: Tournament = {
  id: "pcb-u17-2026-27",
  name: "PCB U17 REGIONAL TRIALS 2026-27",
  shortName: "PCB U17",
  ageGroup: "U17",
  season: "2026-27",
  status: "UPCOMING",
  startDate: "2027-01-10",
  endDate: "2027-01-18",
  organizer: "Pakistan Cricket Board",
  region: "Khyber Pakhtunkhwa",
  group: "POOL A",
  format: "T20",
  teams: TEAMS_PCB_U15,
  matches: makeMockMatches("pcb-u17-2026-27", TEAMS_PCB_U15),
  pointTable: [
    makePointRow(1, TEAMS_PCB_U15[0], 0, 0, 0),
    makePointRow(2, TEAMS_PCB_U15[1], 0, 0, 0),
    makePointRow(3, TEAMS_PCB_U15[2], 0, 0, 0),
    makePointRow(4, TEAMS_PCB_U15[3], 0, 0, 0),
  ],
  leaderboard: { batsmen: [], bowlers: [], fielders: [], teams: [] },
  followers: 412,
  visits: 52800,
};
// ==============================
// TOURNAMENT 3: PCB U19
// ==============================
export const PCB_U19: Tournament = {
  id: "pcb-u19-2026-27",
  name: "PCB U19 PROVINCIAL TRIALS 2026-27",
  shortName: "PCB U19",
  ageGroup: "U19",
  season: "2026-27",
  status: "UPCOMING",
  startDate: "2027-02-05",
  endDate: "2027-02-15",
  organizer: "Pakistan Cricket Board",
  region: "Khyber Pakhtunkhwa",
  group: "POOL A",
  format: "T20",
  teams: TEAMS_PCB_U15,
  matches: makeMockMatches("pcb-u19-2026-27", TEAMS_PCB_U15),
  pointTable: [
    makePointRow(1, TEAMS_PCB_U15[0], 0, 0, 0),
    makePointRow(2, TEAMS_PCB_U15[1], 0, 0, 0),
  ],
  leaderboard: { batsmen: [], bowlers: [], fielders: [], teams: [] },
  followers: 287,
  visits: 31200,
};
// ==============================
// TOURNAMENT 4: DSL 2027
// ==============================
export const DSL_2027: Tournament = {
  id: "dsl-2027",
  name: "DAWN SUPER LEAGUE 2027 — EDITION 7",
  shortName: "DSL 2027",
  ageGroup: "Senior",
  season: "2027",
  status: "REGISTRATION_OPEN",
  startDate: "2027-04-01",
  endDate: "2027-06-30",
  organizer: "DAWN Cricket Club",
  region: "Nowshera",
  group: "POOL A",
  format: "T20",
  teams: TEAMS_PCB_U15.slice(0, 4),
  matches: makeMockMatches("dsl-2027", TEAMS_PCB_U15.slice(0, 4)),
  pointTable: [
    makePointRow(1, TEAMS_PCB_U15[0], 0, 0, 0),
    makePointRow(2, TEAMS_PCB_U15[1], 0, 0, 0),
    makePointRow(3, TEAMS_PCB_U15[2], 0, 0, 0),
    makePointRow(4, TEAMS_PCB_U15[3], 0, 0, 0),
  ],
  leaderboard: { batsmen: [], bowlers: [], fielders: [], teams: [] },
  followers: 1240,
  visits: 186500,
};
// ==============================
// All tournaments
// ==============================
export const MOCK_TOURNAMENTS: Tournament[] = [PCB_U15, PCB_U17, PCB_U19, DSL_2027];
export function getTournament(id: string): Tournament | undefined {
  return MOCK_TOURNAMENTS.find((t) => t.id === id);
}