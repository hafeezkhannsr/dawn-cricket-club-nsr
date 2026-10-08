import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getRecentResults } from "@/lib/data/mock-fixtures";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Match Results",
  description: "Recent match results and scorecards from DAWN Cricket Club and PCB tournaments.",
};
export default function ResultsPage() {
  const results = getRecentResults();
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Results</span>
          </nav>
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>✅ Match Results</h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              {results.length} completed matches · Click any match for full scorecard
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1rem" }}>
            {results.map((f) => (
              <Link key={f.id} href={`/match-central/matches/${f.id}/scorecard`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <div style={{ padding: "1.15rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".5rem", marginBottom: ".6rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: ".7rem", color: "#f0b429", fontWeight: 800, textTransform: "uppercase" }}>{f.tournamentName}</span>
                    <span style={{ fontSize: ".62rem", padding: ".2rem .5rem", background: "rgba(20,164,77,.2)", color: "#86efac", borderRadius: ".3rem", fontWeight: 800 }}>✓ COMPLETED</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: ".5rem", marginBottom: ".4rem" }}>
                    <span style={{ fontSize: ".88rem", fontWeight: 700, color: "#fff" }}>{f.teamAShort}</span>
                    <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "#fff" }}>{f.teamAScore}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: ".5rem", marginBottom: ".65rem" }}>
                    <span style={{ fontSize: ".88rem", fontWeight: 700, color: "#fff" }}>{f.teamBShort}</span>
                    <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "#fff" }}>{f.teamBScore}</span>
                  </div>
                  {f.result && (
                    <div style={{ padding: ".55rem .7rem", background: "rgba(20,164,77,.1)", border: "1px solid rgba(20,164,77,.3)", borderRadius: ".5rem", fontSize: ".78rem", color: "#86efac", fontWeight: 700 }}>
                      🏆 {f.result}
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".7rem", fontSize: ".7rem", color: "rgba(238,244,251,.55)", flexWrap: "wrap", gap: ".35rem" }}>
                    <span>📅 {new Date(f.date).toLocaleDateString()}</span>
                    <span>📍 {f.city}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}