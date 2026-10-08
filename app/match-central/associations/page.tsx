import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export const metadata = { title: "Associations" };
const ASSOCIATIONS = [
  { name: "Pakistan Cricket Board", short: "PCB", scope: "National", clubs: 0, players: "200K+", link: "https://www.pcb.com.pk/" },
  { name: "KP Cricket Association", short: "KPCA", scope: "Provincial", clubs: 45, players: "5K+", link: "#" },
  { name: "Nowshera District CA", short: "NDCA", scope: "District", clubs: 12, players: "800+", link: "#" },
  { name: "Peshawar District CA", short: "PDCA", scope: "District", clubs: 24, players: "1.5K+", link: "#" },
  { name: "Mardan District CA", short: "MDCA", scope: "District", clubs: 18, players: "1.2K+", link: "#" },
];
export default function AssociationsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Associations</span>
          </nav>
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>Cricket Associations</h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              National, provincial, and district cricket boards
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
            {ASSOCIATIONS.map((a) => (
              <div key={a.short} style={{ padding: "1.25rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem" }}>
                <div style={{ display: "flex", gap: ".85rem", alignItems: "center", marginBottom: "1rem" }}>
                  <div style={{ width: 52, height: 52, borderRadius: ".7rem", background: "rgba(253,230,138,.15)", border: "1px solid rgba(253,230,138,.4)", display: "grid", placeItems: "center", fontSize: "1.4rem", fontWeight: 800, color: "#fde68a", flexShrink: 0 }}>{a.short.charAt(0)}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{a.name}</div>
                    <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", marginTop: ".15rem" }}>{a.short} · {a.scope} scope</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: ".5rem", fontSize: ".75rem", marginBottom: ".75rem" }}>
                  <span style={{ padding: ".3rem .55rem", background: "rgba(255,255,255,.05)", borderRadius: ".4rem", color: "rgba(238,244,251,.75)" }}>🏛️ {a.clubs} clubs</span>
                  <span style={{ padding: ".3rem .55rem", background: "rgba(255,255,255,.05)", borderRadius: ".4rem", color: "rgba(238,244,251,.75)" }}>👥 {a.players}</span>
                </div>
                {a.link !== "#" && (
                  <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: ".75rem", color: "#f0b429", fontWeight: 700, textDecoration: "none" }}>
                    Official Website ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}