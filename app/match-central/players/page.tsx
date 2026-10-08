import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export const metadata = { title: "Players" };
const PLAYERS = [
  { name: "Naseer Ahmad", team: "GZQN", role: "Batter", runs: 91, matches: 3, avatar: "🧑" },
  { name: "Muhammad Musa", team: "GHSN", role: "Batter", runs: 58, matches: 3, avatar: "👦" },
  { name: "Roohullah", team: "GHSN", role: "Wicket-keeper", runs: 47, matches: 3, avatar: "🧑" },
  { name: "Maaz Khan", team: "GZQN", role: "All-rounder", runs: 47, matches: 3, avatar: "👦" },
  { name: "Adnan Irshad", team: "GHSN", role: "Batter", runs: 46, matches: 3, avatar: "🧑" },
  { name: "Hamza Ahmad", team: "GHSN", role: "Batter", runs: 42, matches: 3, avatar: "👦" },
  { name: "Asad Khan", team: "ASSC", role: "Bowler", runs: 38, matches: 3, avatar: "🧑" },
  { name: "Fida Ullah", team: "RGS", role: "Bowler", runs: 30, matches: 3, avatar: "👦" },
];
export default function PlayersPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Players</span>
          </nav>
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>Players Directory</h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              {PLAYERS.length} players from PCB Talent Hunt tournaments
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            {PLAYERS.map((p) => (
              <div key={p.name} style={{ padding: "1.1rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".85rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".65rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 999, background: "linear-gradient(135deg, #f0b429, #cb6e17)", display: "grid", placeItems: "center", fontSize: "1.2rem", flexShrink: 0 }}>{p.avatar}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: ".95rem", fontWeight: 800, color: "#fff" }}>{p.name}</div>
                    <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)" }}>{p.team} · {p.role}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: ".5rem", fontSize: ".75rem" }}>
                  <span style={{ padding: ".3rem .55rem", background: "rgba(240,180,41,.12)", borderRadius: ".4rem", color: "#f0b429", fontWeight: 700 }}>{p.runs} runs</span>
                  <span style={{ padding: ".3rem .55rem", background: "rgba(20,164,77,.12)", borderRadius: ".4rem", color: "#86efac", fontWeight: 700 }}>{p.matches} matches</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}