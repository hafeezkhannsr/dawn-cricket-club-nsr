import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { MOCK_TOURNAMENTS } from "@/lib/data/mock-tournaments";
export const dynamic = "force-dynamic";
export const metadata = { title: "Global Leaderboard" };
function aggregateBatsmen() {
  const map = new Map<string, { playerName: string; teamName: string; runs: number; innings: number; highScore: number; matches: number }>();
  for (const t of MOCK_TOURNAMENTS) {
    for (const b of t.leaderboard.batsmen) {
      const key = b.playerName;
      const cur = map.get(key) || { playerName: b.playerName, teamName: b.teamName, runs: 0, innings: 0, highScore: 0, matches: 0 };
      cur.runs += b.runs || 0;
      cur.innings += b.innings || 0;
      cur.matches += b.matches || 0;
      cur.highScore = Math.max(cur.highScore, Number(b.highScore) || 0);
      map.set(key, cur);
    }
  }
  return Array.from(map.values()).sort((a, b) => b.runs - a.runs).slice(0, 20);
}
function aggregateBowlers() {
  const map = new Map<string, { playerName: string; teamName: string; wickets: number; matches: number; economy: number; best: string }>();
  for (const t of MOCK_TOURNAMENTS) {
    for (const b of t.leaderboard.bowlers) {
      const key = b.playerName;
      const cur = map.get(key) || { playerName: b.playerName, teamName: b.teamName, wickets: 0, matches: 0, economy: 0, best: "-" };
      cur.wickets += b.wickets || 0;
      cur.matches += b.matches || 0;
      cur.economy = b.economy || cur.economy;
      cur.best = b.best || cur.best;
      map.set(key, cur);
    }
  }
  return Array.from(map.values()).sort((a, b) => b.wickets - a.wickets).slice(0, 20);
}
export default function GlobalLeaderboardPage() {
  const batsmen = aggregateBatsmen();
  const bowlers = aggregateBowlers();
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Leaderboard</span>
          </nav>
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>
              Global Leaderboard
            </h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              Combined stats across all tournaments — PCB U15, U17, U19 & DSL
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="lb-grid">
            <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", overflow: "hidden" }}>
              <div style={{ padding: "1rem 1.25rem", background: "rgba(240,180,41,.08)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 900, color: "#f0b429" }}>🏏 Top Run Scorers</h2>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 620 }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,.02)" }}>
                      <th style={thL}>#</th>
                      <th style={thL}>Player</th>
                      <th style={thL}>Team</th>
                      <th style={thR}>M</th>
                      <th style={thR}>Inn</th>
                      <th style={thR}>Runs</th>
                      <th style={thR}>HS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batsmen.map((b, i) => (
                      <tr key={b.playerName} style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                        <td style={{ padding: ".7rem 1.25rem", color: "#f0b429", fontWeight: 800 }}>{i + 1}</td>
                        <td style={{ padding: ".7rem 1.25rem", color: "#fff", fontWeight: 700 }}>{b.playerName}</td>
                        <td style={{ padding: ".7rem 1.25rem", color: "rgba(238,244,251,.7)" }}>{b.teamName}</td>
                        <td style={tdR}>{b.matches}</td>
                        <td style={tdR}>{b.innings}</td>
                        <td style={{ ...tdR, color: "#fff", fontWeight: 800 }}>{b.runs}</td>
                        <td style={tdR}>{b.highScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", overflow: "hidden" }}>
              <div style={{ padding: "1rem 1.25rem", background: "rgba(20,164,77,.08)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 900, color: "#86efac" }}>🎯 Top Wicket Takers</h2>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 620 }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,.02)" }}>
                      <th style={thL}>#</th>
                      <th style={thL}>Player</th>
                      <th style={thL}>Team</th>
                      <th style={thR}>M</th>
                      <th style={thR}>Wkts</th>
                      <th style={thR}>Best</th>
                      <th style={thR}>Econ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bowlers.map((b, i) => (
                      <tr key={b.playerName} style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                        <td style={{ padding: ".7rem 1.25rem", color: "#f0b429", fontWeight: 800 }}>{i + 1}</td>
                        <td style={{ padding: ".7rem 1.25rem", color: "#fff", fontWeight: 700 }}>{b.playerName}</td>
                        <td style={{ padding: ".7rem 1.25rem", color: "rgba(238,244,251,.7)" }}>{b.teamName}</td>
                        <td style={tdR}>{b.matches}</td>
                        <td style={{ ...tdR, color: "#fff", fontWeight: 800 }}>{b.wickets}</td>
                        <td style={tdR}>{b.best}</td>
                        <td style={{ ...tdR, color: "#86efac" }}>{b.economy?.toFixed(2) || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "2rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <Link href="/match-central" className="btn btn-outline">← Match Central</Link>
            <Link href="/match-central/boundaries" className="btn btn-gold">Most 4s & 6s →</Link>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media (min-width: 1100px) {
          .lb-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}
const thL: React.CSSProperties = { padding: ".7rem 1.25rem", textAlign: "left", fontSize: ".68rem", color: "rgba(238,244,251,.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", whiteSpace: "nowrap" };
const thR: React.CSSProperties = { ...thL, textAlign: "right", padding: ".7rem 1rem" };
const tdR: React.CSSProperties = { padding: ".7rem 1rem", textAlign: "right", color: "rgba(238,244,251,.85)", whiteSpace: "nowrap" };