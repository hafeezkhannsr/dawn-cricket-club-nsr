import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export const metadata = { title: "Clubs" };
const CLUBS = [
  { name: "DAWN Cricket Club", city: "Nowshera", founded: 2010, players: 156, isMain: true },
  { name: "Young Stars CC", city: "Pabbi", founded: 2015, players: 45 },
  { name: "Khyber Green CC", city: "Nowshera", founded: 2018, players: 38 },
  { name: "Rising Nowshera CC", city: "Nowshera", founded: 2016, players: 42 },
  { name: "Mardan United", city: "Mardan", founded: 2014, players: 56 },
  { name: "Peshawar Warriors", city: "Peshawar", founded: 2012, players: 72 },
];
export default function ClubsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Clubs</span>
          </nav>
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>Cricket Clubs</h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              {CLUBS.length} registered cricket clubs
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {CLUBS.map((c) => (
              <div key={c.name} style={{
                padding: "1.25rem",
                background: c.isMain ? "linear-gradient(135deg, rgba(240,180,41,.1), rgba(20,164,77,.05))" : "rgba(255,255,255,.03)",
                border: c.isMain ? "1px solid rgba(240,180,41,.4)" : "1px solid rgba(255,255,255,.08)",
                borderRadius: ".9rem",
              }}>
                <div style={{ display: "flex", gap: ".85rem", alignItems: "center", marginBottom: "1rem" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 999, background: c.isMain ? "linear-gradient(135deg, #f0b429, #cb6e17)" : "rgba(253,186,116,.15)", border: c.isMain ? "1px solid #f7c948" : "1px solid rgba(253,186,116,.4)", display: "grid", placeItems: "center", fontSize: "1.4rem", flexShrink: 0 }}>🏛️</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{c.name}</div>
                    <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", marginTop: ".15rem" }}>📍 {c.city} · Est. {c.founded}</div>
                  </div>
                </div>
                {c.isMain && (
                  <span style={{ display: "inline-block", padding: ".2rem .5rem", background: "rgba(240,180,41,.2)", color: "#f0b429", borderRadius: ".3rem", fontSize: ".62rem", fontWeight: 800, marginBottom: ".65rem" }}>★ HOME CLUB</span>
                )}
                <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.7)" }}>
                  👥 {c.players} registered players
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