import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTournament } from "@/lib/data/mock-tournaments";
import TournamentLayout from "../TournamentLayout";
import SideCard from "../components/SideCard";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function BoundariesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = getTournament(id);
  if (!t) notFound();
  const topFours = t.leaderboard.batsmen.slice(0, 5).map((b, i) => ({ ...b, fours: 12 - i * 2, sixes: 6 - i }));
  const topSixes = t.leaderboard.batsmen.slice(0, 5).map((b, i) => ({ ...b, fours: 8 - i, sixes: 9 - i }));
  return (
    <>
      <Navbar />
      <TournamentLayout tournament={t} />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="tournament-grid">
            <SideCard tournament={t} />
            <div style={{ display: "grid", gap: "1.25rem" }}>
              <BoundaryTable title="Most Fours 🔵" rows={topFours} stat="fours" />
              <BoundaryTable title="Most Sixes 💥" rows={topSixes} stat="sixes" />
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
function BoundaryTable({ title, rows, stat }: { title: string; rows: Array<{ playerId: string; playerName: string; teamName: string; rank: number; fours?: number; sixes?: number }>; stat: "fours" | "sixes" }) {
  return (
    <div style={{
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: ".9rem",
      overflow: "hidden",
    }}>
      <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 900 }}>{title}</h2>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,.03)" }}>
            <th style={{ padding: ".7rem 1rem", textAlign: "left", fontSize: ".68rem", color: "rgba(238,244,251,.6)", textTransform: "uppercase" }}>#</th>
            <th style={{ padding: ".7rem 1rem", textAlign: "left", fontSize: ".68rem", color: "rgba(238,244,251,.6)", textTransform: "uppercase" }}>Player</th>
            <th style={{ padding: ".7rem 1rem", textAlign: "left", fontSize: ".68rem", color: "rgba(238,244,251,.6)", textTransform: "uppercase" }}>Team</th>
            <th style={{ padding: ".7rem 1rem", textAlign: "right", fontSize: ".68rem", color: "rgba(238,244,251,.6)", textTransform: "uppercase" }}>{stat === "fours" ? "4s" : "6s"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.playerId} style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
              <td style={{ padding: ".65rem 1rem", color: "#f0b429", fontWeight: 800 }}>{r.rank}</td>
              <td style={{ padding: ".65rem 1rem", color: "#fff", fontWeight: 700 }}>{r.playerName}</td>
              <td style={{ padding: ".65rem 1rem", color: "rgba(238,244,251,.7)" }}>{r.teamName}</td>
              <td style={{ padding: ".65rem 1rem", textAlign: "right", color: "#86efac", fontWeight: 800 }}>
                {stat === "fours" ? r.fours : r.sixes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}