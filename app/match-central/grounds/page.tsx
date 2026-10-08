import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export const metadata = { title: "Grounds" };
const GROUNDS = [
  { name: "DAWN Cricket Ground", city: "Hakeemabad, Nowshera", capacity: 500, pitch: "Turf", matches: 24 },
  { name: "Nowshera Cricket Ground", city: "Nowshera Kalan", capacity: 1200, pitch: "Turf", matches: 18 },
  { name: "Pabbi Sports Complex", city: "Pabbi", capacity: 800, pitch: "Turf", matches: 12 },
  { name: "Peshawar Stadium", city: "Peshawar", capacity: 5000, pitch: "Turf", matches: 8 },
  { name: "Mardan Cricket Ground", city: "Mardan", capacity: 2000, pitch: "Turf", matches: 6 },
  { name: "Rawalpindi Cricket Academy", city: "Rawalpindi", capacity: 800, pitch: "Turf", matches: 4 },
];
export default function GroundsPage() {
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
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>Grounds & Venues</h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              {GROUNDS.length} cricket venues in Khyber Pakhtunkhwa region
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
            {GROUNDS.map((g) => (
              <div key={g.name} style={{ padding: "1.25rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem" }}>
                <div style={{ display: "flex", gap: ".85rem", alignItems: "center", marginBottom: ".85rem" }}>
                  <div style={{ width: 52, height: 52, borderRadius: ".7rem", background: "rgba(196,181,253,.15)", border: "1px solid rgba(196,181,253,.4)", display: "grid", placeItems: "center", fontSize: "1.5rem", flexShrink: 0 }}>🏟️</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{g.name}</div>
                    <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", marginTop: ".15rem" }}>📍 {g.city}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: ".4rem" }}>
                  <div style={{ padding: ".5rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem", textAlign: "center" }}>
                    <div style={{ fontSize: ".62rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase" }}>Capacity</div>
                    <div style={{ fontSize: ".85rem", color: "#fff", fontWeight: 800, marginTop: ".15rem" }}>{g.capacity}</div>
                  </div>
                  <div style={{ padding: ".5rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem", textAlign: "center" }}>
                    <div style={{ fontSize: ".62rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase" }}>Pitch</div>
                    <div style={{ fontSize: ".85rem", color: "#fff", fontWeight: 800, marginTop: ".15rem" }}>{g.pitch}</div>
                  </div>
                  <div style={{ padding: ".5rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem", textAlign: "center" }}>
                    <div style={{ fontSize: ".62rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase" }}>Matches</div>
                    <div style={{ fontSize: ".85rem", color: "#fff", fontWeight: 800, marginTop: ".15rem" }}>{g.matches}</div>
                  </div>
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