import { NextResponse } from "next/server";
import { listAll as listRegs } from "@/lib/server/registration-store";
import { MOCK_TOURNAMENTS } from "@/lib/data/mock-tournaments";
import { PLAYERS } from "@/lib/data/mock-players";
import { BATCHES, STUDENTS, COACHES } from "@/lib/data/mock-academy";
import { GROUNDS } from "@/lib/data/mock-grounds";
import { NOTICES } from "@/lib/data/mock-notices";
export const dynamic = "force-dynamic";
export async function GET() {
  const regs = listRegs();
  // Registration stats
  const registrationStats = {
    total: regs.length,
    submitted: regs.filter((r) => r.status === "SUBMITTED").length,
    approved: regs.filter((r) => r.status === "APPROVED").length,
    rejected: regs.filter((r) => r.status === "REJECTED").length,
    pending: regs.filter((r) => r.status === "UNDER_REVIEW").length,
    paymentVerified: regs.filter((r) => r.paymentStatus === "VERIFIED").length,
  };
  // Tournament stats
  const allMatches = MOCK_TOURNAMENTS.flatMap((t) => t.matches);
  const tournamentStats = {
    total: MOCK_TOURNAMENTS.length,
    live: MOCK_TOURNAMENTS.filter((t) => t.status === "LIVE").length,
    totalMatches: allMatches.length,
    liveMatches: allMatches.filter((m) => m.status === "LIVE").length,
    completedMatches: allMatches.filter((m) => m.status === "COMPLETED").length,
    upcomingMatches: allMatches.filter((m) => m.status === "UPCOMING").length,
  };
  // Player stats
  const playerStats = {
    total: PLAYERS.length,
    topScorer: PLAYERS.reduce((top, p) => (p.stats.runs > top.stats.runs ? p : top), PLAYERS[0]),
    topWicketTaker: PLAYERS.reduce((top, p) => (p.stats.wickets > top.stats.wickets ? p : top), PLAYERS[0]),
    totalRuns: PLAYERS.reduce((sum, p) => sum + p.stats.runs, 0),
    totalWickets: PLAYERS.reduce((sum, p) => sum + p.stats.wickets, 0),
  };
  // Academy stats
  const academyStats = {
    batches: BATCHES.length,
    students: STUDENTS.length,
    coaches: COACHES.length,
    totalCapacity: BATCHES.reduce((s, b) => s + b.capacity, 0),
    totalEnrolled: BATCHES.reduce((s, b) => s + b.enrolled, 0),
  };
  // Ground stats
  const groundStats = {
    total: GROUNDS.length,
    homeGround: GROUNDS.find((g) => g.isHome)?.name || "—",
    totalMatches: GROUNDS.reduce((s, g) => s + g.matches, 0),
    avgRating: (GROUNDS.reduce((s, g) => s + g.rating, 0) / GROUNDS.length).toFixed(2),
  };
  // Content stats
  const contentStats = {
    notices: NOTICES.length,
    urgentNotices: NOTICES.filter((n) => n.category === "URGENT").length,
  };
  // Trend data (last 30 days mock)
  const trend = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return {
      date: d.toISOString().slice(0, 10),
      registrations: Math.floor(Math.random() * 8) + 1,
      pageViews: Math.floor(Math.random() * 500) + 200,
    };
  });
  return NextResponse.json({
    ok: true,
    registration: registrationStats,
    tournament: tournamentStats,
    player: playerStats,
    academy: academyStats,
    ground: groundStats,
    content: contentStats,
    trend,
  });
}