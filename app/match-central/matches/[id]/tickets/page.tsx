import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { MOCK_TOURNAMENTS } from "@/lib/data/mock-tournaments";
import TicketForm from "./TicketForm";
export const dynamic = "force-dynamic";
function findMatch(id: string) {
  for (const t of MOCK_TOURNAMENTS) {
    const m = t.matches.find((x) => x.id === id);
    if (m) return { match: m, tournament: t };
  }
  return null;
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = findMatch(id);
  return { title: found ? "Tickets - " + found.match.teamA.shortName + " vs " + found.match.teamB.shortName : "Tickets" };
}
export default async function TicketsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = findMatch(id);
  if (!found) notFound();
  const { match, tournament } = found;
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <Link href={"/match-central/matches/" + match.id + "/scorecard"} style={{ color: "inherit" }}>{match.matchNumber}</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Tickets</span>
          </nav>
          <div style={{ padding: "1.25rem", background: "linear-gradient(135deg, rgba(240,180,41,.12), rgba(20,164,77,.05))", border: "1px solid rgba(240,180,41,.4)", borderRadius: ".9rem", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: ".7rem", color: "#f0b429", fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: ".35rem" }}>
              {tournament.name}
            </div>
            <h1 style={{ margin: "0 0 .5rem", fontSize: "clamp(1.3rem, 3vw, 1.7rem)", fontWeight: 900 }}>
              {match.teamA.name} vs {match.teamB.name}
            </h1>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: ".82rem", color: "rgba(238,244,251,.75)" }}>
              <span>📅 {new Date(match.date).toLocaleDateString()}</span>
              <span>🕐 {match.time}</span>
              <span>📍 {match.venue}</span>
              <span>🏏 {match.format}</span>
            </div>
          </div>
          <TicketForm
            matchId={match.id}
            matchName={match.teamA.shortName + " vs " + match.teamB.shortName}
            matchDate={match.date}
            venue={match.venue}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}