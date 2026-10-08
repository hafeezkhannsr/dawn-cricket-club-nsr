import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTournament } from "@/lib/data/mock-tournaments";
import TournamentLayout from "../TournamentLayout";
import SideCard from "../components/SideCard";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function AwardsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = getTournament(id);
  if (!t) notFound();
  const awards = [
    { label: "Player of the Tournament", name: t.awards?.playerOfTournament || t.awards?.bestBatsman || "TBD", icon: "🏆" },
    { label: "Best Batsman", name: t.awards?.bestBatsman || "TBD", icon: "🏏" },
    { label: "Best Bowler", name: t.awards?.bestBowler || "TBD", icon: "🎯" },
    { label: "Best Fielder", name: t.awards?.bestFielder || "TBD", icon: "🧤" },
  ];
  return (
    <>
      <Navbar />
      <TournamentLayout tournament={t} />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="tournament-grid">
            <SideCard tournament={t} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              {awards.map((a) => (
                <div key={a.label} style={{
                  padding: "1.5rem",
                  background: "linear-gradient(135deg, rgba(240,180,41,.1), rgba(20,164,77,.05))",
                  border: "1px solid rgba(240,180,41,.35)",
                  borderRadius: ".9rem",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: ".75rem" }}>{a.icon}</div>
                  <div style={{ fontSize: ".7rem", letterSpacing: ".1em", color: "#f0b429", fontWeight: 800, textTransform: "uppercase", marginBottom: ".5rem" }}>
                    {a.label}
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#fff" }}>{a.name}</div>
                </div>
              ))}
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