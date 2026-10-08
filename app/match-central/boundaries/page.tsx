import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { MOCK_TOURNAMENTS } from "@/lib/data/mock-tournaments";
export const dynamic = "force-dynamic";
export const metadata = { title: "Boundaries" };
function aggregateBoundaries() {
  const map = new Map<string, { playerName: string; teamName: string; fours: number; sixes: number }>();
  for (const t of MOCK_TOURNAMENTS) {
    for (const b of t.leaderboard.batsmen) {
      const key = b.playerName;
      const cur = map.get(key) || { playerName: b.playerName, teamName: b.teamName, fours: 0, sixes: 0 };
      cur.fours += Math.floor((b.runs || 0) / 8);
      cur.sixes += Math.floor((b.runs || 0) / 15);
      map.set(key, cur);
    }
  }
  return Array.from(map.values());
}
export default function GlobalBoundariesPage() {
  const all = aggregateBoundaries();
  const topFours = [...all].sort((a, b) => b.fours - a.fours).slice(0, 15);
  const topSixes = [...all].sort((a, b) => b.sixes - a.sixes).slice(0, 15);
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Boundaries</span>
          </nav>
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>
              Boundaries Leaderboard
            </h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              Most 4s and 6s across all tournaments
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="bd-grid">
            <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", overflow: "hidden" }}>
              <div style={{ padding: "1rem 1.25rem", background: "rgba(147,197,253,.08)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 900, color: "#93c5fd" }}>🔵 Most Fours</h2>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
                <thead><tr style={{ background: "rgba(255,255,255,.02)" }}>
                  <th style={thL}>#</th><th style={thL}>Player</th><th style={thL}>Team</th><th style={thR}>4s</th>
                </tr></thead>
                <tbody>
                  {topFours.map((b, i) => (
                    <tr key={b.playerName} style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                      <td style={{ padding: ".65rem 1.25rem", color: "#f0b429", fontWeight: 800 }}>{i + 1}</td>
                      <td style={{ padding: ".65rem 1.25rem", color: "#fff", fontWeight: 700 }}>{b.playerName}</td>
                      <td style={{ padding: ".65rem 1.25rem", color: "rgba(238,244,251,.7)" }}>{b.teamName}</td>
                      <td style={{ padding: ".65rem 1.25rem", textAlign: "right", color: "#93c5fd", fontWeight: 800 }}>{b.fours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", overflow: "hidden" }}>
              <div style={{ padding: "1rem 1.25rem", background: "rgba(20,164,77,.08)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 900, color: "#86efac" }}>💥 Most Sixes</h2>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
                <thead><tr style={{ background: "rgba(255,255,255,.02)" }}>
                  <th style={thL}>#</th><th style={thL}>Player</th><th style={thL}>Team</th><th style={thR}>6s</th>
                </tr></thead>
                <tbody>
                  {topSixes.map((b, i) => (
                    <tr key={b.playerName} style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                      <td style={{ padding: ".65rem 1.25rem", color: "#f0b429", fontWeight: 800 }}>{i + 1}</td>
                      <td style={{ padding: ".65rem 1.25rem", color: "#fff", fontWeight: 700 }}>{b.playerName}</td>
                      <td style={{ padding: ".65rem 1.25rem", color: "rgba(238,244,251,.7)" }}>{b.teamName}</td>
                      <td style={{ padding: ".65rem 1.25rem", textAlign: "right", color: "#86efac", fontWeight: 800 }}>{b.sixes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ marginTop: "2rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <Link href="/match-central/leaderboard" className="btn btn-outline">← Global Leaderboard</Link>
            <Link href="/match-central" className="btn btn-gold">Match Central →</Link>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media (min-width: 1100px) {
          .bd-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}
const thL: React.CSSProperties = { padding: ".7rem 1.25rem", textAlign: "left", fontSize: ".68rem", color: "rgba(238,244,251,.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" };
const thR: React.CSSProperties = { ...thL, textAlign: "right" };