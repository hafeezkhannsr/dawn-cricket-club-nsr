import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { TOURNAMENTS } from "@/lib/data/tournaments";
export const metadata = {
  title: "PCB Talent Hunt & School Program",
  description: "Complete PCB Talent Hunt information — U13, U15, U17, U19 trials, school cricket programs, and live match updates.",
};
const AGE_GROUPS = [
  { age: "U13", name: "Under-13 School Program", year: "2026-27", status: "Coming Soon", ageRange: "10-13 years", trialDate: "March 2027", venue: "School Grounds (KP)", color: "#93c5fd" },
  { age: "U15", name: "Under-15 District Trials", year: "2026-27", status: "OPEN", ageRange: "13-15 years", trialDate: "December 2026", venue: "District Grounds (KP)", color: "#86efac" },
  { age: "U17", name: "Under-17 Regional Trials", year: "2026-27", status: "OPEN", ageRange: "15-17 years", trialDate: "January 2027", venue: "Regional Centres", color: "#86efac" },
  { age: "U19", name: "Under-19 Provincial Trials", year: "2026-27", status: "OPEN", ageRange: "17-19 years", trialDate: "February 2027", venue: "Provincial Centres", color: "#86efac" },
];
const MATCH_CENTRAL_LINKS = [
  { href: "/match-central/matches", label: "Live Matches", desc: "Real-time ball-by-ball scores from active trials", icon: "🏏" },
  { href: "/match-central/tournaments", label: "Tournaments", desc: "Browse U13 to U19 PCB tournaments and leagues", icon: "🏆" },
  { href: "/match-central/teams", label: "Teams", desc: "District and regional squads", icon: "👥" },
  { href: "/match-central/players", label: "Players", desc: "Player profiles and verified stats", icon: "👤" },
  { href: "/match-central/grounds", label: "Grounds", desc: "Venue details and match history", icon: "🏟️" },
  { href: "/match-central/clubs", label: "Clubs", desc: "Registered cricket clubs", icon: "🏛️" },
  { href: "/match-central/academies", label: "Academies", desc: "Training centres and expert coaches", icon: "🎓" },
  { href: "/match-central/associations", label: "Associations", desc: "District and provincial boards", icon: "🔗" },
];
export default function PcbTalentHuntPage() {
  const activeTournaments = TOURNAMENTS.filter((t) => t.status === "REGISTRATION_OPEN" || t.status === "LIVE");
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", paddingBottom: "4rem" }}>
        {/* Hero Banner */}
        <section style={{
          padding: "3rem 0 2.5rem",
          background: "linear-gradient(135deg, rgba(15,138,62,.15), rgba(240,180,41,.08))",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}>
          <div className="container">
            <div style={{ display: "flex", gap: ".6rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span style={{
                fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase",
                fontWeight: 800, padding: ".3rem .7rem", borderRadius: ".4rem",
                background: "rgba(15,138,62,.25)", color: "#86efac",
                border: "1px solid rgba(15,138,62,.5)",
              }}>Official PCB Program</span>
              <span style={{
                fontSize: ".68rem", padding: ".3rem .7rem", borderRadius: ".4rem",
                background: "rgba(20,164,77,.2)", color: "#86efac",
                border: "1px solid rgba(20,164,77,.4)",
                fontWeight: 700,
              }}>● LIVE NOW</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)", fontWeight: 900, lineHeight: 1.15 }}>
              PCB Talent Hunt & School Program
            </h1>
            <p style={{ margin: "1rem 0 0", color: "rgba(238,244,251,.75)", fontSize: "1.05rem", maxWidth: 780, lineHeight: 1.65 }}>
              Complete player pathway from U13 to U19 — district trials, regional camps, provincial squads.
              Track live matches, view fixtures, explore venues, and follow Pakistan cricket's future stars.
            </p>
            <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
              <Link href="/match-central/matches" className="btn btn-gold btn-lg">
                🏏 View Live Matches
              </Link>
              <Link href="/match-central/tournaments" className="btn btn-outline btn-lg">
                🏆 All Tournaments
              </Link>
              <a href="https://www.pcb.com.pk/" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
                PCB Official ↗
              </a>
            </div>
          </div>
        </section>
        {/* Active Tournaments - Live Updates */}
        <section className="container" style={{ paddingTop: "2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 900, margin: 0 }}>
              🔥 Active Tournaments & Trials
            </h2>
            <Link href="/match-central/tournaments" style={{ color: "#f0b429", fontSize: ".85rem", fontWeight: 700 }}>
              View all →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
            {activeTournaments.map((t) => (
              <div key={t.id} style={{
                padding: "1.25rem",
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(240,180,41,.3)",
                borderRadius: ".9rem",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: ".5rem", marginBottom: ".7rem" }}>
                  <span style={{
                    fontSize: ".68rem", fontWeight: 800, letterSpacing: ".05em",
                    padding: ".22rem .55rem", borderRadius: ".35rem",
                    background: t.status === "LIVE" ? "rgba(176,30,30,.25)" : "rgba(20,164,77,.2)",
                    color: t.status === "LIVE" ? "#fca5a5" : "#86efac",
                    border: t.status === "LIVE" ? "1px solid rgba(176,30,30,.5)" : "1px solid rgba(20,164,77,.4)",
                  }}>
                    {t.status === "LIVE" && "● "}{t.status === "REGISTRATION_OPEN" ? "REGISTRATION OPEN" : t.status}
                  </span>
                  <span style={{ fontSize: ".72rem", fontWeight: 700, color: "#f0b429" }}>{t.ageGroup}</span>
                </div>
                <h3 style={{ margin: "0 0 .5rem", fontSize: "1rem", fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>
                  {t.name}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: ".3rem", fontSize: ".78rem", color: "rgba(238,244,251,.65)", marginBottom: ".75rem" }}>
                  <span>📅 {new Date(t.startDate).toLocaleDateString()} → {new Date(t.endDate).toLocaleDateString()}</span>
                  <span>📍 {t.city}</span>
                  <span>🏟️ {t.venue}</span>
                  <span>👥 {t.teams} teams · {t.matches} matches</span>
                </div>
                {t.registrationUrl && (
                  <a
                    href={t.registrationUrl.startsWith("http") ? t.registrationUrl : undefined}
                    target={t.registrationUrl.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                    style={{ width: "100%", justifyContent: "center", padding: ".5rem" }}
                  >
                    {t.status === "REGISTRATION_OPEN" ? "Register Now →" : "View Details →"}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
        {/* Age Group Grid */}
        <section className="container" style={{ paddingTop: ".5rem" }}>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 900, marginBottom: "1.25rem" }}>
            📋 Age Group Trials
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
            {AGE_GROUPS.map((g) => (
              <Link key={g.age} href={`/pcb-talent-hunt/${g.age.toLowerCase()}`} style={{
                padding: "1.25rem",
                background: "rgba(255,255,255,.03)",
                border: `1px solid ${g.color}55`,
                borderRadius: ".9rem",
                textDecoration: "none", color: "inherit",
                display: "flex", flexDirection: "column", gap: ".5rem",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1.6rem", fontWeight: 900, color: g.color }}>{g.age}</span>
                  <span style={{
                    fontSize: ".65rem", fontWeight: 800, padding: ".2rem .5rem", borderRadius: ".35rem",
                    background: g.status === "OPEN" ? "rgba(20,164,77,.25)" : "rgba(240,180,41,.15)",
                    color: g.status === "OPEN" ? "#86efac" : "#f0b429",
                  }}>{g.status}</span>
                </div>
                <div style={{ fontSize: ".95rem", fontWeight: 700, color: "#fff" }}>{g.name}</div>
                <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.6)", lineHeight: 1.6 }}>
                  Age: {g.ageRange}<br />
                  📅 {g.trialDate}<br />
                  📍 {g.venue}
                </div>
              </Link>
            ))}
          </div>
        </section>
        {/* Match Central - CricksLab style */}
        <section className="container" style={{ paddingTop: ".5rem" }}>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 900, marginBottom: "1.25rem" }}>
            🏟️ Match Central
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
            {MATCH_CENTRAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} style={{
                padding: "1.25rem",
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: ".9rem",
                textDecoration: "none", color: "inherit",
                display: "flex", gap: "1rem", alignItems: "flex-start",
              }}>
                <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>{l.icon}</span>
                <div>
                  <div style={{ fontSize: ".95rem", fontWeight: 800, color: "#fff", marginBottom: ".2rem" }}>{l.label}</div>
                  <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.65)", lineHeight: 1.5 }}>{l.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        {/* Registration Guide */}
        <section className="container" style={{ paddingTop: ".5rem" }}>
          <div style={{
            padding: "1.75rem",
            background: "linear-gradient(135deg, rgba(240,180,41,.1), rgba(20,164,77,.05))",
            border: "1px solid rgba(240,180,41,.35)",
            borderRadius: ".9rem",
          }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 900, marginBottom: "1rem", color: "#f0b429" }}>
              How to Register for PCB Trials
            </h2>
            <ol style={{ margin: 0, paddingLeft: "1.3rem", lineHeight: 2.1, fontSize: ".9rem", color: "rgba(238,244,251,.85)" }}>
              <li>Monitor <a href="https://www.pcb.com.pk/" target="_blank" rel="noopener noreferrer" style={{ color: "#f0b429" }}>pcb.com.pk</a> for trial announcements</li>
              <li>Watch district cricket association notices in your area</li>
              <li>Prepare documents: B-Form/CNIC, birth certificate, school ID, medical fitness</li>
              <li>Register through your school or district association</li>
              <li>Attend trials with full cricket kit</li>
              <li>Selected players advance to regional camps and provincial squads</li>
              <li>Top performers earn PCB central contracts and First-Class opportunities</li>
            </ol>
          </div>
          <div style={{
            marginTop: "1.5rem",
            padding: "1rem 1.25rem",
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: ".7rem",
            fontSize: ".82rem",
            color: "rgba(238,244,251,.7)",
            lineHeight: 1.7,
          }}>
            <b style={{ color: "#f0b429" }}>Note:</b> DAWN Cricket Club is an independent club. We do not claim official
            PCB affiliation. This page aggregates publicly available information from official PCB sources
            for player awareness. Always verify at <a href="https://www.pcb.com.pk/" target="_blank" rel="noopener noreferrer" style={{ color: "#f0b429" }}>pcb.com.pk</a>.
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}