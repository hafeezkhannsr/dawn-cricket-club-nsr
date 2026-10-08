import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export const metadata = {
  title: "Match Central",
  description: "Live cricket matches, tournaments, teams, players, grounds, clubs and academies.",
};
const SECTIONS = [
  { href: "/match-central/matches", label: "Matches", desc: "Live scores, upcoming fixtures, and past results", icon: "🏏", color: "#14a44d" },
  { href: "/match-central/tournaments", label: "Tournaments", desc: "U13 to U19 PCB tournaments, DSL, and school cricket", icon: "🏆", color: "#f0b429" },
  { href: "/match-central/leaderboard", label: "Leaderboard", desc: "Global top batters and bowlers across all tournaments", icon: "🥇", color: "#f0b429" },
  { href: "/match-central/boundaries", label: "Boundaries", desc: "Most 4s and 6s across all matches", icon: "💥", color: "#86efac" },
  { href: "/match-central/teams", label: "Teams", desc: "District, regional, and club squads with rankings", icon: "👥", color: "#93c5fd" },
  { href: "/match-central/players", label: "Players", desc: "Player profiles, career stats, and performances", icon: "👤", color: "#86efac" },
  { href: "/match-central/grounds", label: "Grounds", desc: "Venue details, capacity, and match history", icon: "🏟️", color: "#c4b5fd" },
  { href: "/match-central/clubs", label: "Clubs", desc: "Registered cricket clubs and communities", icon: "🏛️", color: "#fdba74" },
  { href: "/match-central/academies", label: "Academies", desc: "Training centres and expert coaching", icon: "🎓", color: "#fca5a5" },
  { href: "/match-central/associations", label: "Associations", desc: "District and provincial cricket boards", icon: "🔗", color: "#fde68a" },
];
export default function MatchCentralPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2.5rem 0 4rem" }}>
        <div className="container">
          <header style={{ marginBottom: "2rem" }}>
            <div style={{ fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 800, color: "#f0b429", marginBottom: ".5rem" }}>
              Live Cricket Platform
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)", fontWeight: 900 }}>Match Central</h1>
            <p style={{ margin: ".75rem 0 0", color: "rgba(238,244,251,.7)", fontSize: "1rem", maxWidth: 700, lineHeight: 1.6 }}>
              Complete cricket ecosystem — live matches, tournaments, teams, players, venues,
              clubs, academies and associations. Everything connected. Everything live.
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            {SECTIONS.map((s) => (
              <Link key={s.href} href={s.href} style={{ padding: "1.5rem", background: "rgba(255,255,255,.03)", border: "1px solid " + s.color + "44", borderRadius: ".9rem", textDecoration: "none", color: "inherit", display: "flex", gap: "1rem", alignItems: "flex-start", transition: "all .15s ease" }}>
                <div style={{ width: 52, height: 52, borderRadius: ".7rem", background: s.color + "22", border: "1px solid " + s.color + "55", display: "grid", placeItems: "center", fontSize: "1.6rem", flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", marginBottom: ".3rem" }}>{s.label}</div>
                  <div style={{ fontSize: ".82rem", color: "rgba(238,244,251,.65)", lineHeight: 1.55 }}>{s.desc}</div>
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