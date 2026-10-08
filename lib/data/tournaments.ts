export type Tournament = {
  id: string;
  name: string;
  ageGroup: "U13" | "U15" | "U17" | "U19" | "Senior" | "School";
  season: string;
  status: "UPCOMING" | "LIVE" | "COMPLETED" | "REGISTRATION_OPEN";
  startDate: string;
  endDate: string;
  venue: string;
  city: string;
  teams: number;
  matches: number;
  organizer: string;
  registrationUrl?: string;
  prizePool?: string;
};
export const TOURNAMENTS: Tournament[] = [
  {
    id: "pcb-u15-2026-27",
    name: "PCB U15 Talent Hunt Trials",
    ageGroup: "U15",
    season: "2026-27",
    status: "REGISTRATION_OPEN",
    startDate: "2026-12-15",
    endDate: "2026-12-20",
    venue: "Regional Cricket Grounds",
    city: "Peshawar, Nowshera, Mardan",
    teams: 24,
    matches: 48,
    organizer: "Pakistan Cricket Board",
    registrationUrl: "https://www.pcb.com.pk/",
    prizePool: "Selection to Regional Camp",
  },
  {
    id: "pcb-u17-2026-27",
    name: "PCB U17 Regional Trials",
    ageGroup: "U17",
    season: "2026-27",
    status: "REGISTRATION_OPEN",
    startDate: "2027-01-10",
    endDate: "2027-01-18",
    venue: "Regional Cricket Grounds",
    city: "Peshawar, Mardan, Abbottabad",
    teams: 32,
    matches: 64,
    organizer: "Pakistan Cricket Board",
    registrationUrl: "https://www.pcb.com.pk/",
    prizePool: "Provincial U17 Squad",
  },
  {
    id: "pcb-u19-2026-27",
    name: "PCB U19 Provincial Trials",
    ageGroup: "U19",
    season: "2026-27",
    status: "UPCOMING",
    startDate: "2027-02-05",
    endDate: "2027-02-15",
    venue: "Provincial Cricket Grounds",
    city: "Peshawar, Nowshera, Pabbi",
    teams: 40,
    matches: 80,
    organizer: "Pakistan Cricket Board",
    registrationUrl: "https://www.pcb.com.pk/",
    prizePool: "First-Class Contract",
  },
  {
    id: "pcb-school-2026-27",
    name: "PCB School Cricket Championship",
    ageGroup: "School",
    season: "2026-27",
    status: "UPCOMING",
    startDate: "2027-03-01",
    endDate: "2027-04-30",
    venue: "School Grounds",
    city: "All KP Districts",
    teams: 64,
    matches: 128,
    organizer: "PCB + Education Dept",
    registrationUrl: "https://www.pcb.com.pk/",
    prizePool: "School Team Trophy",
  },
  {
    id: "dsl-2027",
    name: "Dawn Super League 2027 — Edition 7",
    ageGroup: "Senior",
    season: "2027",
    status: "REGISTRATION_OPEN",
    startDate: "2027-04-01",
    endDate: "2027-06-30",
    venue: "DAWN Ground",
    city: "Nowshera, KP",
    teams: 12,
    matches: 42,
    organizer: "DAWN Cricket Club",
    registrationUrl: "/dsl-register",
    prizePool: "PKR 500,000",
  },
];