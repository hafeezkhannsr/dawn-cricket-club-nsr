import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getUpcomingFixtures, getLiveFixtures } from "@/lib/data/mock-fixtures";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Fixtures & Schedule",
  description: "Upcoming cricket matches and fixtures for DAWN Cricket Club and PCB Talent Hunt tournaments.",
};
export default function FixturesPage() {
  const upcoming = getUpcomingFixtures();
  const live = getLiveFixtures();
  // Group upcoming by date
  const grouped: Record<string, typeof upcoming> = {};
  for (const f of upcoming) {
    if (!grouped[f.date]) grouped[f.date] = [];
    grouped[f.date].push(f);
  }
  const dates = Object.keys(grouped).sort();
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Fixtures</span>
          </nav>
          <header style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap" }}>
              <div>
                <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>📅 Fixtures</h1>
                <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
                  {upcoming.length} upcoming matches · {live.length} live now
                </p>
              </div>
              <Link href="/live" className="btn btn-gold">🔴 Live Scores</Link>
            </div>
          </header>
          {/* Live section */}
          {live.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 900, marginBottom: "1rem", display: "flex", alignItems: "center", gap: ".5rem" }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "#dc2626", animation: "livePulse 1.6s ease-in-out infinite" }} />
                Live Right Now
              </h2>
              <div style={{ display: "grid", gap: ".75rem" }}>
                {live.map((f) => <FixtureCard key={f.id} f={f} />)}
              </div>
            </div>
          )}
          {/* Upcoming grouped by date */}
          {dates.length === 0 ? (
            <div style={{ padding: "3rem 1.5rem", textAlign: "center", background: "rgba(255,255,255,.03)", border: "1px dashed rgba(255,255,255,.12)", borderRadius: ".9rem", color: "rgba(238,244,251,.6)" }}>
              No upcoming fixtures at the moment.
            </div>
          ) : (
            dates.map((date) => (
              <div key={date} style={{ marginBottom: "1.75rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 900, marginBottom: ".75rem", color: "#f0b429" }}>
                  {new Date(date).toLocaleDateString("en", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </h2>
                <div style={{ display: "grid", gap: ".65rem" }}>
                  {grouped[date].map((f) => <FixtureCard key={f.id} f={f} />)}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
function FixtureCard({ f }: { f: ReturnType<typeof getUpcomingFixtures>[number] }) {
  const isLive = f.status === "LIVE";
  return (
    <Link href={`/match-central/matches/${f.id}/scorecard`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
      <div style={{
        padding: "1rem 1.15rem",
        background: isLive ? "linear-gradient(135deg, rgba(220,38,38,.08), rgba(240,180,41,.05))" : "rgba(255,255,255,.03)",
        border: isLive ? "1px solid rgba(220,38,38,.4)" : "1px solid rgba(255,255,255,.08)",
        borderRadius: ".85rem",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".5rem", marginBottom: ".6rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: ".7rem", color: "#f0b429", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".04em" }}>
            {f.tournamentName}
          </span>
          <div style={{ display: "flex", gap: ".35rem", alignItems: "center" }}>
            <span style={{ fontSize: ".62rem", padding: ".2rem .5rem", background: "rgba(240,180,41,.15)", color: "#f0b429", borderRadius: ".3rem", fontWeight: 800 }}>{f.format}</span>
            {isLive && <span style={{ display: "inline-flex", alignItems: "center", gap: ".3rem", fontSize: ".62rem", padding: ".2rem .5rem", background: "rgba(220,38,38,.2)", color: "#fca5a5", borderRadius: ".3rem", fontWeight: 800 }}>
              <span style={{ width: 5, height: 5, borderRadius: 999, background: "#dc2626", animation: "livePulse 1.6s ease-in-out infinite" }} />
              LIVE
            </span>}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: ".75rem", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: ".9rem", fontWeight: 800, color: "#fff" }}>{f.teamAShort}</div>
            <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", marginTop: ".15rem" }}>{f.teamA}</div>
          </div>
          <div style={{ padding: ".3rem .65rem", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 999, fontSize: ".68rem", color: "rgba(238,244,251,.6)", fontWeight: 800 }}>VS</div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: ".9rem", fontWeight: 800, color: "#fff" }}>{f.teamBShort}</div>
            <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", marginTop: ".15rem" }}>{f.teamB}</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: ".85rem", paddingTop: ".65rem", borderTop: "1px solid rgba(255,255,255,.06)", fontSize: ".72rem", color: "rgba(238,244,251,.6)", flexWrap: "wrap", gap: ".5rem" }}>
          <span>🕐 {f.time}</span>
          <span>📍 {f.venue}</span>
          <span style={{ color: "#f0b429", fontWeight: 700 }}>View →</span>
        </div>
      </div>
    </Link>
  );
}