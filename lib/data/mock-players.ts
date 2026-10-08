export type PlayerCareer = {
  id: string;
  name: string;
  team: string;
  teamId?: string;
  role: "Batter" | "Bowler" | "All-rounder" | "Wicket-keeper";
  age: number;
  city: string;
  category: "U13" | "U15" | "U17" | "U19" | "Senior";
  batting: string;
  bowling: string;
  avatar: string;
  color: string;
  stats: {
    matches: number;
    innings: number;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    highScore: number;
    fifties: number;
    hundreds: number;
    wickets: number;
    overs: number;
    bestBowling: string;
    economy: number;
    catches: number;
    stumpings: number;
  };
  recent: { match: string; runs: number; wickets: number; opposition: string }[];
  achievements: string[];
};
export const PLAYERS: PlayerCareer[] = [
  {
    id: "naseer-ahmad",
    name: "Naseer Ahmad",
    team: "Govt Zakhi Qabristan Nowshera",
    teamId: "gzqn",
    role: "Batter",
    age: 15,
    city: "Nowshera",
    category: "U15",
    batting: "Right-hand",
    bowling: "Does not bowl",
    avatar: "🧑",
    color: "#14a44d",
    stats: { matches: 12, innings: 11, runs: 421, balls: 385, fours: 42, sixes: 8, highScore: 91, fifties: 3, hundreds: 0, wickets: 0, overs: 0, bestBowling: "-", economy: 0, catches: 7, stumpings: 0 },
    recent: [
      { match: "GZQN vs GHSN", runs: 66, wickets: 0, opposition: "GHSN" },
      { match: "GZQN vs ASSC", runs: 25, wickets: 0, opposition: "ASSC" },
      { match: "GZQN vs RGS", runs: 40, wickets: 0, opposition: "RGS" },
    ],
    achievements: ["Top run scorer PCB U15 2026-27", "2 Player of the Match awards", "Fastest fifty of the season (28 balls)"],
  },
  {
    id: "adnan-irshad",
    name: "Adnan Irshad",
    team: "Government High School Nowshera",
    teamId: "ghsn",
    role: "Batter",
    age: 15,
    city: "Nowshera",
    category: "U15",
    batting: "Right-hand",
    bowling: "Does not bowl",
    avatar: "🧑",
    color: "#14a44d",
    stats: { matches: 14, innings: 13, runs: 387, balls: 445, fours: 35, sixes: 4, highScore: 78, fifties: 2, hundreds: 0, wickets: 0, overs: 0, bestBowling: "-", economy: 0, catches: 5, stumpings: 0 },
    recent: [
      { match: "GHSN vs ASSC", runs: 22, wickets: 0, opposition: "ASSC" },
      { match: "GHSN vs RGS", runs: 46, wickets: 0, opposition: "RGS" },
      { match: "GHSN vs GZQN", runs: 30, wickets: 0, opposition: "GZQN" },
    ],
    achievements: ["Captain — GHSN U15 team", "Highest score 78* vs PMS", "Best opening batsman of the season"],
  },
  {
    id: "hamza-ahmad",
    name: "Hamza Ahmad",
    team: "Government High School Nowshera",
    teamId: "ghsn",
    role: "All-rounder",
    age: 14,
    city: "Nowshera",
    category: "U15",
    batting: "Right-hand",
    bowling: "Right-arm medium",
    avatar: "👦",
    color: "#f0b429",
    stats: { matches: 12, innings: 11, runs: 298, balls: 312, fours: 28, sixes: 3, highScore: 65, fifties: 1, hundreds: 0, wickets: 14, overs: 78, bestBowling: "3/18", economy: 4.62, catches: 6, stumpings: 0 },
    recent: [
      { match: "GHSN vs ASSC", runs: 28, wickets: 1, opposition: "ASSC" },
      { match: "GHSN vs RGS", runs: 42, wickets: 2, opposition: "RGS" },
      { match: "GHSN vs GZQN", runs: 15, wickets: 3, opposition: "GZQN" },
    ],
    achievements: ["All-rounder of the season", "3-wicket hauls: 4 times", "Best fielder — 6 catches"],
  },
  {
    id: "asad-khan",
    name: "Asad Khan",
    team: "Allied School Sohan Campus",
    teamId: "assc",
    role: "Bowler",
    age: 15,
    city: "Rawalpindi",
    category: "U15",
    batting: "Right-hand",
    bowling: "Right-arm fast",
    avatar: "🧑",
    color: "#93c5fd",
    stats: { matches: 13, innings: 12, runs: 118, balls: 152, fours: 9, sixes: 1, highScore: 32, fifties: 0, hundreds: 0, wickets: 22, overs: 104, bestBowling: "4/12", economy: 4.33, catches: 4, stumpings: 0 },
    recent: [
      { match: "ASSC vs GHSN", runs: 8, wickets: 3, opposition: "GHSN" },
      { match: "ASSC vs RGS", runs: 12, wickets: 2, opposition: "RGS" },
      { match: "ASSC vs GZQN", runs: 5, wickets: 4, opposition: "GZQN" },
    ],
    achievements: ["Highest wicket taker — 22 wickets", "Best bowling 4/12 vs GZQN", "Best new player of the season"],
  },
  {
    id: "fida-ullah",
    name: "Fida Ullah",
    team: "Roots Garden School",
    teamId: "rgs",
    role: "Bowler",
    age: 15,
    city: "Islamabad",
    category: "U15",
    batting: "Left-hand",
    bowling: "Left-arm orthodox",
    avatar: "👦",
    color: "#c4b5fd",
    stats: { matches: 11, innings: 10, runs: 148, balls: 175, fours: 12, sixes: 2, highScore: 42, fifties: 0, hundreds: 0, wickets: 18, overs: 92, bestBowling: "3/8", economy: 3.85, catches: 5, stumpings: 0 },
    recent: [
      { match: "RGS vs GHSN", runs: 15, wickets: 2, opposition: "GHSN" },
      { match: "RGS vs ASSC", runs: 20, wickets: 3, opposition: "ASSC" },
      { match: "RGS vs GZQN", runs: 8, wickets: 1, opposition: "GZQN" },
    ],
    achievements: ["Captain — RGS U15 team", "Lowest economy of the season (3.85)", "Best bowling 3/8 vs GHSN"],
  },
  {
    id: "maaz-khan",
    name: "Maaz Khan",
    team: "Govt Zakhi Qabristan Nowshera",
    teamId: "gzqn",
    role: "All-rounder",
    age: 14,
    city: "Nowshera",
    category: "U15",
    batting: "Right-hand",
    bowling: "Right-arm medium",
    avatar: "🧑",
    color: "#f0b429",
    stats: { matches: 12, innings: 11, runs: 267, balls: 295, fours: 24, sixes: 5, highScore: 47, fifties: 0, hundreds: 0, wickets: 11, overs: 65, bestBowling: "2/14", economy: 4.95, catches: 6, stumpings: 0 },
    recent: [
      { match: "GZQN vs GHSN", runs: 47, wickets: 1, opposition: "GHSN" },
      { match: "GZQN vs ASSC", runs: 22, wickets: 2, opposition: "ASSC" },
      { match: "GZQN vs RGS", runs: 15, wickets: 0, opposition: "RGS" },
    ],
    achievements: ["Second highest run scorer — GZQN", "Consistent performer throughout season"],
  },
  {
    id: "roohullah",
    name: "Roohullah",
    team: "Government High School Nowshera",
    teamId: "ghsn",
    role: "Wicket-keeper",
    age: 15,
    city: "Nowshera",
    category: "U15",
    batting: "Left-hand",
    bowling: "Does not bowl",
    avatar: "🧑",
    color: "#14a44d",
    stats: { matches: 13, innings: 12, runs: 218, balls: 245, fours: 21, sixes: 3, highScore: 47, fifties: 0, hundreds: 0, wickets: 0, overs: 0, bestBowling: "-", economy: 0, catches: 14, stumpings: 8 },
    recent: [
      { match: "GHSN vs ASSC", runs: 25, wickets: 0, opposition: "ASSC" },
      { match: "GHSN vs RGS", runs: 32, wickets: 0, opposition: "RGS" },
      { match: "GHSN vs GZQN", runs: 18, wickets: 0, opposition: "GZQN" },
    ],
    achievements: ["14 catches, 8 stumpings — best keeper", "Fastest stumping of the season"],
  },
  {
    id: "wajdan-tariq",
    name: "Wajdan Tariq",
    team: "Peshawar Model School",
    teamId: "pms",
    role: "Bowler",
    age: 15,
    city: "Peshawar",
    category: "U15",
    batting: "Right-hand",
    bowling: "Right-arm fast",
    avatar: "👦",
    color: "#fca5a5",
    stats: { matches: 10, innings: 9, runs: 87, balls: 105, fours: 7, sixes: 1, highScore: 22, fifties: 0, hundreds: 0, wickets: 15, overs: 78, bestBowling: "3/22", economy: 5.67, catches: 3, stumpings: 0 },
    recent: [
      { match: "PMS vs GHSN", runs: 15, wickets: 2, opposition: "GHSN" },
      { match: "PMS vs ASSC", runs: 8, wickets: 3, opposition: "ASSC" },
      { match: "PMS vs RGS", runs: 12, wickets: 1, opposition: "RGS" },
    ],
    achievements: ["Captain — PMS U15 team", "3-wicket hauls: 2 times"],
  },
];
export function getPlayer(id: string): PlayerCareer | undefined {
  return PLAYERS.find((p) => p.id === id);
}