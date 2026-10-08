import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { MOCK_TOURNAMENTS } from "@/lib/data/mock-tournaments";
export const dynamic = "force-dynamic";
export const metadata = { title: "All Matches" };
export default function MatchesListPage() {
  const allMatches = MOCK_TOURNAMENTS.flatMap((t) =>
    t.matches.map((m) => ({ ...m, tournamentName: t.shortName, tournamentId: t.id }))
  );
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Matches</span>
          </nav>
          <header style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900 }}>
              All Matches
            </h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
              {allMatches.length} matches across {MOCK_TOURNAMENTS.length} tournaments
            </p>
          </header>
          {/* Filter pills */}
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <FilterPill label="All" count={allMatches.length} active />
            <FilterPill label="Live" count={allMatches.filter((m) => m.status === "LIVE").length} color="#dc2626" />
            <FilterPill label="Upcoming" count={allMatches.filter((m) => m.status === "UPCOMING").length} color="#93c5fd" />
            <FilterPill label="Completed" count={allMatches.filter((m) => m.status === "COMPLETED").length} color="#f0b429" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1rem" }}>
            {allMatches.map((m) => (
              <Link key={m.id} href={"/match-central/matches/" + m.id + "/scorecard"} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <div style={{
                  padding: "1.1rem",
                  background: m.status === "LIVE" ? "linear-gradient(135deg, rgba(220,38,38,.1), rgba(240,180,41,.05))" : "rgba(255,255,255,.03)",
                  border: m.status === "LIVE" ? "1px solid rgba(220,38,38,.4)" : "1px solid rgba(255,255,255,.08)",
                  borderRadius: ".85rem",
                  overflow: "hidden",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".6rem", flexWrap: "wrap", gap: ".35rem" }}>
                    <span style={{ fontSize: ".7rem", color: "#f0b429", fontWeight: 800 }}>{m.tournamentName}</span>
                    <span style={{ fontSize: ".62rem", padding: ".2rem .5rem", borderRadius: ".3rem", background: m.status === "LIVE" ? "rgba(220,38,38,.2)" : m.status === "COMPLETED" ? "rgba(20,164,77,.2)" : "rgba(147,197,253,.15)", color: m.status === "LIVE" ? "#fca5a5" : m.status === "COMPLETED" ? "#86efac" : "#93c5fd", fontWeight: 800 }}>{m.status}</span>
                  </div>
                  <div style={{ fontSize: ".95rem", fontWeight: 800, color: "#fff", marginBottom: ".4rem" }}>
                    {m.teamA.shortName} vs {m.teamB.shortName}
                  </div>
                  {m.teamAScore && (
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".5rem", fontSize: ".85rem" }}>
                      <span style={{ color: "rgba(238,244,251,.85)" }}>{m.teamA.shortName} <b style={{ color: "#fff" }}>{m.teamAScore}</b></span>
                      <span style={{ color: "rgba(238,244,251,.5)", fontSize: ".75rem" }}>({m.teamAOvers} Ov)</span>
                    </div>
                  )}
                  {m.teamBScore && (
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".3rem", fontSize: ".85rem" }}>
                      <span style={{ color: "rgba(238,244,251,.85)" }}>{m.teamB.shortName} <b style={{ color: "#fff" }}>{m.teamBScore}</b></span>
                      <span style={{ color: "rgba(238,244,251,.5)", fontSize: ".75rem" }}>({m.teamBOvers} Ov)</span>
                    </div>
                  )}
                  <div style={{ marginTop: ".65rem", fontSize: ".72rem", color: "rgba(238,244,251,.55)" }}>
                    {m.matchNumber} · {new Date(m.date).toLocaleDateString()} · 📍 {m.city}
                  </div>
                  {m.result && (
                    <div style={{ marginTop: ".65rem", fontSize: ".78rem", color: "#86efac", fontWeight: 600, padding: ".5rem .65rem", background: "rgba(20,164,77,.08)", border: "1px solid rgba(20,164,77,.2)", borderRadius: ".5rem" }}>
                      {m.result}
                    </div>
                  )}
                  <div style={{ marginTop: ".85rem", fontSize: ".75rem", color: "#f0b429", fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{m.format}</span>
                    <span>View Scorecard →</span>
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
function FilterPill({ label, count, color = "#f0b429", active = false }: { label: string; count: number; color?: string; active?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".45rem .85rem", borderRadius: "999px", background: active ? `${color}22` : "rgba(255,255,255,.03)", border: active ? `1px solid ${color}` : "1px solid rgba(255,255,255,.1)", color: active ? color : "rgba(238,244,251,.75)", fontSize: ".78rem", fontWeight: active ? 800 : 600 }}>
      {label}
      <span style={{ padding: ".05rem .4rem", borderRadius: ".6rem", background: active ? `${color}44` : "rgba(255,255,255,.08)", fontSize: ".65rem", fontWeight: 800, color: active ? color : "rgba(238,244,251,.6)" }}>{count}</span>
    </span>
  );
}