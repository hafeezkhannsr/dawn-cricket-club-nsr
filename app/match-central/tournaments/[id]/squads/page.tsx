import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTournament } from "@/lib/data/mock-tournaments";
import TournamentLayout from "../TournamentLayout";
import SideCard from "../components/SideCard";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function SquadsPage({ params }: { params: Promise<{ id: string }> }) {
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: ".85rem" }}>
              {t.teams.map((team) => (
                <div key={team.id} style={{
                  padding: "1.1rem",
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: ".85rem",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".7rem", marginBottom: ".75rem" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 999,
                      background: "linear-gradient(135deg, #14a44d, #0f8a3e)",
                      display: "grid", placeItems: "center",
                      fontSize: "1.2rem",
                    }}>🏏</div>
                    <div>
                      <div style={{ fontSize: ".9rem", fontWeight: 800, color: "#fff" }}>{team.name}</div>
                      <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)" }}>{team.city}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: ".8rem", color: "rgba(238,244,251,.65)", lineHeight: 1.7 }}>
                    <div>👥 Squad size: 15 players</div>
                    <div>🏏 Captain: TBD</div>
                    <div>🎯 Coach: TBD</div>
                  </div>
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