import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTournament } from "@/lib/data/mock-tournaments";
import TournamentLayout from "../TournamentLayout";
import SideCard from "../components/SideCard";
import MatchCard from "../components/MatchCard";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function MatchesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = getTournament(id);
  if (!t) notFound();
  return (
    <>
      <Navbar />
      <TournamentLayout tournament={t} />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="tournament-grid">
            <SideCard tournament={t} />
            <div>
              <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                {["All", "Live", "Upcoming", "Recent"].map((f, i) => (
                  <span key={f} style={{
                    padding: ".45rem .9rem",
                    borderRadius: ".5rem",
                    fontSize: ".82rem",
                    fontWeight: i === 0 ? 800 : 600,
                    background: i === 0 ? "rgba(240,180,41,.15)" : "rgba(255,255,255,.03)",
                    border: i === 0 ? "1px solid #f0b429" : "1px solid rgba(255,255,255,.1)",
                    color: i === 0 ? "#f0b429" : "rgba(238,244,251,.7)",
                    cursor: "pointer",
                  }}>{f}</span>
                ))}
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: ".85rem",
              }}>
                {t.matches.slice(0, 8).map((m) => (
                  <MatchCard key={m.id} match={m} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media (min-width: 900px) {
          .tournament-grid { grid-template-columns: 320px 1fr !important; }
        }
      `}</style>
    </>
  );
}