import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dawn-cricket-club-nsr.vercel.app";
  const now = new Date();
  const paths = [
    "/", "/about", "/contact", "/register", "/register/status-check", "/dsl-register", "/verify",
    "/players", "/statistics", "/news", "/news/live", "/news/pcb", "/news/psl", "/news/icc", "/news/pakistan",
    "/news/youth", "/news/talent-hunt", "/rules", "/faq", "/terms", "/privacy", "/grounds",
    "/academy", "/academy/batches", "/academy/batches/u13-morning", "/academy/batches/u15-morning",
    "/academy/batches/u17-morning", "/academy/batches/u19-evening", "/academy/coaches",
    "/academy/coaches/coach-ilyas", "/academy/coaches/coach-khalid", "/academy/coaches/coach-saeed",
    "/academy/students", "/pcb-talent-hunt", "/pcb-talent-hunt/u13", "/pcb-talent-hunt/u15",
    "/pcb-talent-hunt/u17", "/pcb-talent-hunt/u19", "/match-central", "/match-central/matches",
    "/match-central/tournaments", "/match-central/tournaments/pcb-u15-2026-27/overview",
    "/match-central/tournaments/pcb-u15-2026-27/matches", "/match-central/tournaments/pcb-u15-2026-27/leaderboard",
    "/match-central/tournaments/pcb-u15-2026-27/boundaries", "/match-central/tournaments/pcb-u15-2026-27/awards",
    "/match-central/tournaments/pcb-u15-2026-27/squads", "/match-central/tournaments/dsl-2027/overview",
    "/match-central/tournaments/pcb-u17-2026-27/overview", "/match-central/tournaments/pcb-u19-2026-27/overview",
    "/match-central/leaderboard", "/match-central/boundaries", "/match-central/teams",
    "/match-central/teams/ghsn", "/match-central/teams/assc", "/match-central/teams/rgs",
    "/match-central/teams/gzqn", "/match-central/players", "/match-central/grounds",
    "/match-central/grounds/abbas-ground", "/match-central/grounds/abbas-ground/book",
    "/match-central/grounds/dawn-ground", "/match-central/clubs", "/match-central/academies",
    "/match-central/associations", "/search", "/login", "/signup",
  ];
  return paths.map((p) => ({ url: base + p, lastModified: now, changeFrequency: "weekly" as const, priority: p === "/" ? 1.0 : 0.7 }));
}