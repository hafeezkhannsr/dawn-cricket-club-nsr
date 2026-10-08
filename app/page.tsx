import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import Footer from "@/components/Footer";
import Link from "next/link";
import LiveMatchWidget from "@/components/LiveMatchWidget";
import LiveScoreCard from "@/components/LiveScoreCard";
import SeoSchema from "@/components/SeoSchema";
import { organizationSchema, websiteSchema } from "@/lib/seo/structured-data";
import { listMatches } from "@/lib/server/match-store";
export const dynamic = "force-dynamic";
export default async function HomePage() {
  const allMatches = await listMatches();
  const liveMatches = allMatches.filter((m) => m.status === "LIVE");
  const upcomingMatches = allMatches.filter((m) => m.status === "SCHEDULED").slice(0, 3);
  const recentMatches = allMatches.filter((m) => m.status === "COMPLETED").slice(0, 3);
  const allForDisplay = [...liveMatches, ...upcomingMatches, ...recentMatches].slice(0, 6);
  return (
    <>
      <SeoSchema data={[organizationSchema(), websiteSchema()]} />
      <Navbar />
      <main>
        <Hero />
        <section className="container" style={{ paddingTop: "2.5rem", paddingBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            <div>
              <div style={{ fontSize: ".7rem", letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 800, color: "#f0b429", marginBottom: ".4rem" }}>⚡ Real-time Updates</div>
              <h2 style={{ margin: 0, fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 900 }}>Live Match Center</h2>
            </div>
            <Link href="/match-central/matches" className="btn btn-gold" style={{ fontSize: ".85rem" }}>View All Matches →</Link>
          </div>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1.25rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <CategoryPill label="All" count={allMatches.length} active />
            <CategoryPill label="Live" count={liveMatches.length} color="#dc2626" live={liveMatches.length > 0} />
            <CategoryPill label="Upcoming" count={allMatches.filter((m) => m.status === "SCHEDULED").length} color="#93c5fd" />
            <CategoryPill label="Completed" count={allMatches.filter((m) => m.status === "COMPLETED").length} color="#f0b429" />
          </div>
          {allForDisplay.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1rem" }}>
              {allForDisplay.map((m) => <LiveScoreCard key={m.id} match={m} />)}
            </div>
          ) : (
            <div style={{ padding: "2.5rem 1.5rem", background: "rgba(255,255,255,.02)", border: "1px dashed rgba(240,180,41,.3)", borderRadius: ".9rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: ".5rem", opacity: .5 }}>🏏</div>
              <div style={{ fontWeight: 700, color: "#fff", marginBottom: ".5rem" }}>No matches yet</div>
              <p style={{ maxWidth: 480, margin: "0 auto 1.25rem", fontSize: ".9rem", lineHeight: 1.6 }}>Create your first match in the Scorer Console to see live scores here.</p>
              <Link href="/scorer" className="btn btn-gold">Open Scorer Console</Link>
            </div>
          )}
        </section>
        <section className="container" style={{ paddingTop: "1rem" }}>
          <div className="live-section-grid">
            <div style={{ padding: "1.5rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 900, marginBottom: "1rem" }}>🏏 Live Right Now</h2>
              <LiveMatchWidget />
            </div>
            <div style={{ padding: "1.5rem", background: "linear-gradient(135deg, rgba(240,180,41,.1), rgba(20,164,77,.05))", border: "1px solid rgba(240,180,41,.35)", borderRadius: ".9rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 900, marginBottom: "1rem" }}>🎯 Explore</h2>
              <div style={{ display: "grid", gap: ".5rem" }}>
                <Link href="/pcb-talent-hunt" className="btn btn-gold" style={{ justifyContent: "flex-start" }}>🏆 PCB Talent Hunt</Link>
                <Link href="/academy" className="btn btn-outline" style={{ justifyContent: "flex-start" }}>🎓 Academy</Link>
                <Link href="/match-central" className="btn btn-outline" style={{ justifyContent: "flex-start" }}>🏟️ Match Central</Link>
                <Link href="/notices" className="btn btn-outline" style={{ justifyContent: "flex-start" }}>📢 Notices</Link>
                <Link href="/fixtures" className="btn btn-outline" style={{ justifyContent: "flex-start" }}>📅 Fixtures</Link>
                <Link href="/live" className="btn btn-outline" style={{ justifyContent: "flex-start" }}>🔴 Live Scores</Link>
                <Link href="/news/live" className="btn btn-outline" style={{ justifyContent: "flex-start" }}>📰 Live News</Link>
                <Link href="/statistics" className="btn btn-outline" style={{ justifyContent: "flex-start" }}>📊 Statistics</Link>
              </div>
            </div>
          </div>
        </section>
        <FeatureStrip />
      </main>
      <Footer />
      <style>{`@media (min-width: 900px) { .live-section-grid { grid-template-columns: 1.5fr 1fr; } } .live-section-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }`}</style>
    </>
  );
}
function CategoryPill({ label, count, color = "#f0b429", active = false, live = false }: { label: string; count: number; color?: string; active?: boolean; live?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".45rem .85rem", borderRadius: "999px", background: active ? color + "22" : "rgba(255,255,255,.03)", border: active ? "1px solid " + color : "1px solid rgba(255,255,255,.1)", color: active ? color : "rgba(238,244,251,.75)", fontSize: ".78rem", fontWeight: active ? 800 : 600 }}>
      {live && <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 999, background: "#dc2626", animation: "livePulse 1.6s ease-in-out infinite" }} />}
      {label}
      <span style={{ padding: ".05rem .4rem", borderRadius: ".6rem", background: active ? color + "44" : "rgba(255,255,255,.08)", fontSize: ".65rem", fontWeight: 800, color: active ? color : "rgba(238,244,251,.6)" }}>{count}</span>
    </span>
  );
}