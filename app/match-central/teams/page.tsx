import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export const metadata = { title: "Teams" };
const TEAMS = [
  { name: "Government High School Nowshera", short: "GHSN", city: "Nowshera", players: 15, captain: "Adnan Irshad", color: "#14a44d" },
  { name: "Allied School Sohan Campus", short: "ASSC", city: "Rawalpindi", players: 14, captain: "Asad Khan", color: "#f0b429" },
  { name: "Roots Garden School", short: "RGS", city: "Islamabad", players: 15, captain: "Fida Ullah", color: "#93c5fd" },
  { name: "Govt Zakhi Qabristan Nowshera", short: "GZQN", city: "Nowshera", players: 15, captain: "Naseer Ahmad", color: "#c4b5fd" },
  { name: "Peshawar Model School", short: "PMS", city: "Peshawar", players: 14, captain: "Wajdan Tariq", color: "#fca5a5" },
  { name: "Beaconhouse Mardan", short: "BHM", city: "Mardan", players: 15, captain: "N. Shah", color: "#fdba74" },
];
export default function TeamsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Teams</span>
          </nav>
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>Teams Directory</h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              {TEAMS.length} registered teams across PCB Talent Hunt tournaments
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {TEAMS.map((t) => (
              <div key={t.short} style={{ padding: "1.25rem", background: "rgba(255,255,255,.03)", border: `1px solid ${t.color}44`, borderRadius: ".9rem" }}>
                <div style={{ display: "flex", gap: ".85rem", alignItems: "center", marginBottom: "1rem" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 999, background: `${t.color}22`, border: `1px solid ${t.color}66`, display: "grid", placeItems: "center", fontSize: "1.4rem", fontWeight: 800, color: t.color, flexShrink: 0 }}>{t.short.charAt(0)}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>{t.name}</div>
                    <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", marginTop: ".15rem" }}>{t.short} · 📍 {t.city}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".5rem", fontSize: ".78rem" }}>
                  <div style={{ padding: ".5rem .65rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem" }}>
                    <div style={{ color: "rgba(238,244,251,.5)", fontSize: ".65rem", textTransform: "uppercase" }}>Players</div>
                    <div style={{ color: "#fff", fontWeight: 800, marginTop: ".15rem" }}>{t.players}</div>
                  </div>
                  <div style={{ padding: ".5rem .65rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem" }}>
                    <div style={{ color: "rgba(238,244,251,.5)", fontSize: ".65rem", textTransform: "uppercase" }}>Captain</div>
                    <div style={{ color: "#fff", fontWeight: 700, marginTop: ".15rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.captain}</div>
                  </div>
                </div>
                <div style={{ marginTop: "1rem", fontSize: ".75rem", color: t.color, fontWeight: 700 }}>View Squad →</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}