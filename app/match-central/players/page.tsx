import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PLAYERS } from "@/lib/data/mock-players";
export const metadata = { title: "Players" };
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
              {PLAYERS.length} top performers · Click any player to view full career profile
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            {PLAYERS.map((p) => (
              <Link key={p.id} href={`/match-central/players/${p.id}`} style={{ display: "block", padding: "1.15rem", background: "rgba(255,255,255,.03)", border: `1px solid ${p.color}44`, borderRadius: ".85rem", textDecoration: "none", color: "inherit" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".85rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 999, background: `linear-gradient(135deg, ${p.color}, ${p.color}aa)`, display: "grid", placeItems: "center", fontSize: "1.2rem", flexShrink: 0 }}>{p.avatar}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: ".95rem", fontWeight: 800, color: "#fff" }}>{p.name}</div>
                    <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)" }}>{p.team}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: ".35rem", marginBottom: ".75rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: ".62rem", padding: ".2rem .5rem", background: `${p.color}22`, color: p.color, borderRadius: ".3rem", fontWeight: 700 }}>{p.category}</span>
                  <span style={{ fontSize: ".62rem", padding: ".2rem .5rem", background: "rgba(255,255,255,.05)", color: "rgba(238,244,251,.75)", borderRadius: ".3rem" }}>{p.role}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: ".4rem", fontSize: ".72rem" }}>
                  <Mini label="Runs" value={p.stats.runs.toString()} color="#86efac" />
                  <Mini label="HS" value={p.stats.highScore.toString()} color="#f0b429" />
                  <Mini label="Wkts" value={p.stats.wickets.toString()} color="#93c5fd" />
                </div>
                <div style={{ marginTop: ".85rem", fontSize: ".72rem", color: p.color, fontWeight: 700 }}>View profile →</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
function Mini({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ padding: ".45rem", background: "rgba(255,255,255,.03)", borderRadius: ".4rem", textAlign: "center" }}>
      <div style={{ fontSize: ".58rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: ".82rem", color, fontWeight: 800, marginTop: ".1rem" }}>{value}</div>
    </div>
  );
}