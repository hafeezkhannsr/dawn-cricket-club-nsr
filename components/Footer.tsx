import Link from "next/link";
const COLUMNS = [
  {
    title: "Match Central",
    links: [
      { label: "Matches", href: "/match-central/matches" },
      { label: "Tournaments", href: "/match-central/tournaments" },
      { label: "Leaderboard", href: "/match-central/leaderboard" },
      { label: "Boundaries", href: "/match-central/boundaries" },
      { label: "Teams", href: "/match-central/teams" },
      { label: "Players", href: "/match-central/players" },
    ],
  },
  {
    title: "Club",
    links: [
      { label: "About", href: "/about" },
      { label: "Players", href: "/players" },
      { label: "Statistics", href: "/statistics" },
      { label: "PCB Talent Hunt", href: "/pcb-talent-hunt" },
      { label: "Academy", href: "/academy" },
      { label: "Grounds", href: "/grounds" },
    ],
  },
  {
    title: "Register",
    links: [
      { label: "Player Registration", href: "/register" },
      { label: "DSL Registration", href: "/dsl-register" },
      { label: "Check Status", href: "/register/status-check" },
      { label: "Verify Player", href: "/verify" },
      { label: "Login", href: "/login" },
      { label: "Sign up", href: "/signup" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "News Hub", href: "/news" },
      { label: "Live News", href: "/news/live" },
      { label: "Rules & Laws", href: "/rules" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Search", href: "/search" },
    ],
  },
];
const SOCIAL = [
  { key: "fb", label: "Facebook", href: "https://www.facebook.com/", color: "#1877F2" },
  { key: "x", label: "X", href: "https://x.com/", color: "#ffffff" },
  { key: "yt", label: "YouTube", href: "https://www.youtube.com/", color: "#FF0000" },
  { key: "wa", label: "WhatsApp", href: "https://wa.me/923000000000", color: "#25D366" },
  { key: "ig", label: "Instagram", href: "https://www.instagram.com/", color: "#E1306C" },
  { key: "in", label: "LinkedIn", href: "https://www.linkedin.com/", color: "#0A66C2" },
];
export default function Footer() {
  return (
    <footer style={{ background: "#030a18", borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: "3rem", color: "#eef4fb" }}>
      <div className="container">
        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", marginBottom: "2rem" }} className="footer-grid">
          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: ".7rem", marginBottom: "1rem" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg, #14a44d, #0f8a3e)", display: "grid", placeItems: "center", fontSize: "1.3rem" }}>🏏</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: "1rem", color: "#fff" }}>DAWN CRICKET CLUB</div>
                <div style={{ fontSize: ".68rem", color: "rgba(238,244,251,.55)" }}>DKK | Nowshera, KPK</div>
              </div>
            </div>
            <p style={{ fontSize: ".82rem", color: "rgba(238,244,251,.6)", lineHeight: 1.7, marginBottom: "1rem", maxWidth: 320 }}>
              Building Future Champions. Digital cricket ecosystem for DAWN Cricket Club,
              Dheri Katti Khel, Nowshera, Khyber Pakhtunkhwa, Pakistan.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              {SOCIAL.map((s) => (
                <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label} style={{ width: 34, height: 34, borderRadius: 999, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", display: "grid", placeItems: "center", color: s.color, textDecoration: "none", fontSize: ".7rem", fontWeight: 800 }}>
                  {s.label.charAt(0)}
                </a>
              ))}
            </div>
            {/* App-like buttons */}
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
              <span style={{ padding: ".45rem .8rem", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: ".5rem", fontSize: ".7rem", color: "rgba(238,244,251,.7)" }}>
                📱 Add to Home Screen
              </span>
              <span style={{ padding: ".45rem .8rem", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: ".5rem", fontSize: ".7rem", color: "rgba(238,244,251,.7)" }}>
                🌐 Works Offline
              </span>
            </div>
          </div>
          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize: ".78rem", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "#f0b429", margin: "0 0 .85rem" }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".45rem" }}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} style={{ fontSize: ".82rem", color: "rgba(238,244,251,.65)", textDecoration: "none" }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: "1.25rem", paddingBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: ".75rem", color: "rgba(238,244,251,.55)" }}>
            <Link href="/privacy" style={{ color: "inherit" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: "inherit" }}>Terms of Use</Link>
            <Link href="/faq" style={{ color: "inherit" }}>Support</Link>
          </div>
          <div style={{ fontSize: ".75rem", color: "rgba(238,244,251,.45)" }}>
            © {new Date().getFullYear()} DAWN Cricket Club · All rights reserved
          </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 900px) {
          .footer-grid { grid-template-columns: 1.3fr 1fr 1fr 1fr 1fr !important; }
        }
        @media (min-width: 640px) and (max-width: 899px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}