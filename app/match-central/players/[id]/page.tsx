import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getPlayer } from "@/lib/data/mock-players";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getPlayer(id);
  return { title: p ? p.name : "Player" };
}
export default async function PlayerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getPlayer(id);
  if (!p) notFound();
  const strikeRate = p.stats.balls > 0 ? ((p.stats.runs / p.stats.balls) * 100).toFixed(2) : "0.00";
  const battingAvg = p.stats.innings > 0 ? (p.stats.runs / p.stats.innings).toFixed(2) : "0.00";
  const bowlingAvg = p.stats.wickets > 0 ? (p.stats.overs / p.stats.wickets).toFixed(2) : "-";
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <Link href="/match-central/players" style={{ color: "inherit" }}>Players</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>{p.name}</span>
          </nav>
          {/* Hero */}
          <div style={{ padding: "1.75rem", background: `linear-gradient(135deg, ${p.color}15, transparent)`, border: `1px solid ${p.color}55`, borderRadius: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ width: 100, height: 100, borderRadius: 999, background: `linear-gradient(135deg, ${p.color}, ${p.color}aa)`, border: `3px solid ${p.color}66`, display: "grid", placeItems: "center", fontSize: "3rem", flexShrink: 0 }}>{p.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: ".5rem", alignItems: "center", flexWrap: "wrap", marginBottom: ".4rem" }}>
                  <span style={{ fontSize: ".68rem", fontWeight: 800, padding: ".25rem .6rem", background: `${p.color}22`, color: p.color, borderRadius: ".4rem", textTransform: "uppercase" }}>{p.category}</span>
                  <span style={{ fontSize: ".68rem", padding: ".25rem .6rem", background: "rgba(255,255,255,.05)", color: "rgba(238,244,251,.75)", borderRadius: ".4rem", fontWeight: 700 }}>{p.role}</span>
                </div>
                <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", fontWeight: 900 }}>{p.name}</h1>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: ".5rem", fontSize: ".82rem", color: "rgba(238,244,251,.7)" }}>
                  <span>📍 {p.city}</span>
                  <span>🎂 Age {p.age}</span>
                  <span>🏏 {p.team}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: ".65rem", marginBottom: "1.5rem" }}>
            <Stat label="Matches" value={p.stats.matches.toString()} color="#f0b429" />
            <Stat label="Runs" value={p.stats.runs.toString()} color="#86efac" />
            <Stat label="High Score" value={p.stats.highScore.toString()} color="#93c5fd" />
            <Stat label="Wickets" value={p.stats.wickets.toString()} color="#c4b5fd" />
            <Stat label="Catches" value={p.stats.catches.toString()} color="#fca5a5" />
            <Stat label="Stumpings" value={p.stats.stumpings.toString()} color="#fdba74" />
          </div>
          {/* Batting stats */}
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", padding: "1.25rem", marginBottom: "1.25rem" }}>
            <h2 style={{ margin: "0 0 1rem", fontSize: "1.05rem", fontWeight: 900 }}>🏏 Batting Statistics</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: ".75rem" }}>
              <Stat label="Innings" value={p.stats.innings.toString()} color="#fff" small />
              <Stat label="Runs" value={p.stats.runs.toString()} color="#86efac" small />
              <Stat label="Balls" value={p.stats.balls.toString()} color="#fff" small />
              <Stat label="Fours" value={p.stats.fours.toString()} color="#93c5fd" small />
              <Stat label="Sixes" value={p.stats.sixes.toString()} color="#c4b5fd" small />
              <Stat label="Strike Rate" value={strikeRate} color="#f0b429" small />
              <Stat label="Average" value={battingAvg} color="#f0b429" small />
              <Stat label="50s" value={p.stats.fifties.toString()} color="#86efac" small />
              <Stat label="100s" value={p.stats.hundreds.toString()} color="#86efac" small />
            </div>
          </div>
          {/* Bowling stats (if bowler) */}
          {(p.role === "Bowler" || p.role === "All-rounder") && (
            <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", padding: "1.25rem", marginBottom: "1.25rem" }}>
              <h2 style={{ margin: "0 0 1rem", fontSize: "1.05rem", fontWeight: 900 }}>🎯 Bowling Statistics</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: ".75rem" }}>
                <Stat label="Overs" value={p.stats.overs.toString()} color="#fff" small />
                <Stat label="Wickets" value={p.stats.wickets.toString()} color="#86efac" small />
                <Stat label="Best" value={p.stats.bestBowling} color="#f0b429" small />
                <Stat label="Economy" value={p.stats.economy.toFixed(2)} color="#93c5fd" small />
                <Stat label="Avg" value={bowlingAvg} color="#f0b429" small />
                <Stat label="Style" value={p.bowling} color="#c4b5fd" small />
              </div>
            </div>
          )}
          {/* Recent form */}
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", padding: "1.25rem", marginBottom: "1.25rem" }}>
            <h2 style={{ margin: "0 0 1rem", fontSize: "1.05rem", fontWeight: 900 }}>📈 Recent Form (Last 3 matches)</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,.02)" }}>
                    <th style={thL}>Match</th>
                    <th style={thL}>Opposition</th>
                    <th style={thL}>Runs</th>
                    <th style={thL}>Wickets</th>
                  </tr>
                </thead>
                <tbody>
                  {p.recent.map((r, i) => (
                    <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                      <td style={{ padding: ".6rem 1rem", color: "#fff", fontWeight: 600 }}>{r.match}</td>
                      <td style={td}>{r.opposition}</td>
                      <td style={{ ...td, textAlign: "right", color: "#86efac", fontWeight: 800 }}>{r.runs}</td>
                      <td style={{ ...td, textAlign: "right", color: "#93c5fd", fontWeight: 800 }}>{r.wickets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Achievements */}
          {p.achievements.length > 0 && (
            <div style={{ background: "linear-gradient(135deg, rgba(240,180,41,.08), transparent)", border: "1px solid rgba(240,180,41,.3)", borderRadius: ".9rem", padding: "1.25rem" }}>
              <h2 style={{ margin: "0 0 1rem", fontSize: "1.05rem", fontWeight: 900, color: "#f0b429" }}>🏆 Achievements</h2>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", listStyle: "none" }}>
                {p.achievements.map((a, i) => (
                  <li key={i} style={{ fontSize: ".88rem", color: "rgba(238,244,251,.85)", lineHeight: 1.9, display: "flex", gap: ".5rem", alignItems: "flex-start" }}>
                    <span style={{ color: "#f0b429", flexShrink: 0 }}>★</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div style={{ marginTop: "1.5rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <Link href="/match-central/players" className="btn btn-outline">← All Players</Link>
            <Link href={`/match-central/teams/${p.teamId || "ghsn"}`} className="btn btn-outline">View Team</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
function Stat({ label, value, color, small }: { label: string; value: string; color: string; small?: boolean }) {
  return (
    <div style={{ padding: small ? ".65rem .75rem" : "1rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".7rem" }}>
      <div style={{ fontSize: small ? ".6rem" : ".68rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase", letterSpacing: ".04em", fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: small ? "1.05rem" : "1.3rem", fontWeight: 900, color, marginTop: ".2rem", wordBreak: "break-word" }}>{value}</div>
    </div>
  );
}
const thL: React.CSSProperties = { padding: ".6rem 1rem", textAlign: "left", fontSize: ".68rem", color: "rgba(238,244,251,.55)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: ".6rem 1rem", color: "rgba(238,244,251,.8)" };