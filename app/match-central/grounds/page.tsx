import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { GROUNDS } from "@/lib/data/mock-grounds";
export const metadata = { title: "Grounds & Venues" };
export default function GroundsPage() {
  const home = GROUNDS.find((g) => g.isHome);
  const others = GROUNDS.filter((g) => !g.isHome);
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Grounds</span>
          </nav>
          <header style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap" }}>
              <div>
                <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>Grounds & Venues</h1>
                <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
                  {GROUNDS.length} cricket venues · Book online 24/7
                </p>
              </div>
              <Link href="/match-central/grounds/bookings" className="btn btn-outline">📋 My Bookings</Link>
            </div>
          </header>
          {home && (
            <Link href={`/match-central/grounds/${home.id}`} style={{ display: "block", textDecoration: "none", color: "inherit", padding: "1.5rem", background: "linear-gradient(135deg, rgba(240,180,41,.15), rgba(20,164,77,.05))", border: "1px solid rgba(240,180,41,.4)", borderRadius: ".9rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ width: 72, height: 72, borderRadius: "1rem", background: "linear-gradient(135deg, #f0b429, #cb6e17)", display: "grid", placeItems: "center", fontSize: "2rem", flexShrink: 0 }}>{home.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "inline-block", padding: ".2rem .55rem", background: "rgba(240,180,41,.2)", color: "#f0b429", borderRadius: ".3rem", fontSize: ".62rem", fontWeight: 800, marginBottom: ".4rem" }}>★ HOME GROUND</span>
                  <h2 style={{ margin: 0, fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 900 }}>{home.name}</h2>
                  <div style={{ fontSize: ".82rem", color: "rgba(238,244,251,.75)", marginTop: ".4rem" }}>
                    📍 {home.city} · 👥 {home.capacity} · 🎯 {home.pitch} · ⭐ {home.rating}
                  </div>
                  {home.note && <div style={{ fontSize: ".75rem", color: "#f0b429", marginTop: ".35rem", fontWeight: 700 }}>{home.note}</div>}
                </div>
                <span className="btn btn-gold">Book Now →</span>
              </div>
            </Link>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
            {others.map((g) => (
              <Link key={g.id} href={`/match-central/grounds/${g.id}`} style={{ display: "block", textDecoration: "none", color: "inherit", padding: "1.25rem", background: "rgba(255,255,255,.03)", border: `1px solid ${g.color}44`, borderRadius: ".9rem" }}>
                <div style={{ display: "flex", gap: ".85rem", alignItems: "center", marginBottom: ".85rem" }}>
                  <div style={{ width: 52, height: 52, borderRadius: ".7rem", background: `${g.color}22`, border: `1px solid ${g.color}66`, display: "grid", placeItems: "center", fontSize: "1.5rem", flexShrink: 0 }}>{g.icon}</div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{g.name}</div>
                    <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", marginTop: ".15rem" }}>📍 {g.city}</div>
                  </div>
                  <div style={{ fontSize: ".75rem", color: "#f0b429", fontWeight: 800, flexShrink: 0 }}>⭐ {g.rating}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: ".4rem", marginBottom: ".85rem" }}>
                  <MiniStat label="Capacity" value={g.capacity.toString()} />
                  <MiniStat label="Pitch" value={g.pitch} />
                  <MiniStat label="Matches" value={g.matches.toString()} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: ".65rem", borderTop: "1px solid rgba(255,255,255,.06)" }}>
                  <span style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)" }}>From</span>
                  <strong style={{ fontSize: ".92rem", color: g.color }}>PKR {g.hourlyRate.toLocaleString()}/hr</strong>
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
function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: ".5rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem", textAlign: "center" }}>
      <div style={{ fontSize: ".6rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: ".78rem", color: "#fff", fontWeight: 800, marginTop: ".15rem" }}>{value}</div>
    </div>
  );
}