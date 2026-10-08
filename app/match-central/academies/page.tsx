import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export const metadata = { title: "Academies" };
const ACADEMIES = [
  { name: "DAWN Cricket Academy", city: "Nowshera", batches: 4, students: 68, coaches: 5, isMain: true },
  { name: "KP Cricket Academy", city: "Peshawar", batches: 6, students: 120, coaches: 8 },
  { name: "Nowshera Sports Academy", city: "Nowshera", batches: 3, students: 45, coaches: 4 },
  { name: "Mardan Cricket School", city: "Mardan", batches: 4, students: 72, coaches: 6 },
];
export default function AcademiesPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Academies</span>
          </nav>
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>Cricket Academies</h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              {ACADEMIES.length} training academies with expert coaching
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {ACADEMIES.map((a) => (
              <div key={a.name} style={{
                padding: "1.25rem",
                background: a.isMain ? "linear-gradient(135deg, rgba(20,164,77,.12), rgba(240,180,41,.05))" : "rgba(255,255,255,.03)",
                border: a.isMain ? "1px solid rgba(20,164,77,.4)" : "1px solid rgba(255,255,255,.08)",
                borderRadius: ".9rem",
              }}>
                <div style={{ display: "flex", gap: ".85rem", alignItems: "center", marginBottom: "1rem" }}>
                  <div style={{ width: 52, height: 52, borderRadius: ".7rem", background: "rgba(252,165,165,.15)", border: "1px solid rgba(252,165,165,.4)", display: "grid", placeItems: "center", fontSize: "1.5rem", flexShrink: 0 }}>🎓</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{a.name}</div>
                    <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", marginTop: ".15rem" }}>📍 {a.city}</div>
                  </div>
                </div>
                {a.isMain && (
                  <span style={{ display: "inline-block", padding: ".2rem .5rem", background: "rgba(20,164,77,.2)", color: "#86efac", borderRadius: ".3rem", fontSize: ".62rem", fontWeight: 800, marginBottom: ".65rem" }}>★ DAWN ACADEMY</span>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: ".4rem" }}>
                  <div style={{ padding: ".5rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem", textAlign: "center" }}>
                    <div style={{ fontSize: ".62rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase" }}>Batches</div>
                    <div style={{ fontSize: ".85rem", color: "#fff", fontWeight: 800, marginTop: ".15rem" }}>{a.batches}</div>
                  </div>
                  <div style={{ padding: ".5rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem", textAlign: "center" }}>
                    <div style={{ fontSize: ".62rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase" }}>Students</div>
                    <div style={{ fontSize: ".85rem", color: "#fff", fontWeight: 800, marginTop: ".15rem" }}>{a.students}</div>
                  </div>
                  <div style={{ padding: ".5rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem", textAlign: "center" }}>
                    <div style={{ fontSize: ".62rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase" }}>Coaches</div>
                    <div style={{ fontSize: ".85rem", color: "#fff", fontWeight: 800, marginTop: ".15rem" }}>{a.coaches}</div>
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