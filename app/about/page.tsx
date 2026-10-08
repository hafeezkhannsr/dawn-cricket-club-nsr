import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import Link from "next/link";
export const metadata = {
  title: "About DAWN Cricket Club",
  description: "DAWN Cricket Club (DKK) — promoting cricket and developing young talent in Dheri Katti Khel, Nowshera, KP.",
};
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            <Logo size={100} />
            <div>
              <h1 style={{ margin: 0, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900 }}>
                About DAWN Cricket Club
              </h1>
              <p style={{ margin: ".4rem 0 0", color: "rgba(238,244,251,.65)", fontSize: "1rem" }}>
                Discipline · Skills · Teamwork
              </p>
            </div>
          </div>
          <div style={{
            padding: "1.5rem",
            background: "linear-gradient(135deg, rgba(240,180,41,.08), rgba(20,164,77,.04))",
            border: "1px solid rgba(240,180,41,.25)",
            borderRadius: ".9rem",
            marginBottom: "1.5rem",
            lineHeight: 1.75,
            fontSize: ".95rem",
            color: "rgba(238,244,251,.9)",
          }}>
            <b style={{ color: "#f0b429" }}>DAWN Cricket Club (DKK)</b> is a community-based cricket
            organization located in <b>Dheri Katti Khel</b>, Nowshera District, Khyber Pakhtunkhwa,
            Pakistan. Founded with the mission of promoting cricket at the grassroots level, DKK
            provides a professional platform for young players to develop their skills, compete in
            organized matches, and pursue their cricketing dreams.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
            <Card title="Our Mission" accent="#14a44d">
              Promote cricket, develop talent, and provide world-class facilities for young
              cricketers in Nowshera and beyond.
            </Card>
            <Card title="Our Vision" accent="#f0b429">
              Become a reference-quality digital cricket institution that other clubs can study
              and adopt.
            </Card>
            <Card title="Our Values" accent="#93c5fd">
              Discipline, integrity, inclusivity and respect for the game — on and off the field.
            </Card>
          </div>
          <div style={{
            padding: "1.5rem",
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: ".9rem",
            marginBottom: "1.5rem",
          }}>
            <h2 style={{ margin: "0 0 1rem", fontSize: "1.2rem", fontWeight: 800 }}>What we offer</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: ".75rem" }}>
              {[
                "Professional player registration",
                "Digital player ID with QR verification",
                "Organized matches and tournaments",
                "Live scoreboards and statistics",
                "Youth development programs (U13 to U19)",
                "Free access to rules and regulations",
              ].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: ".5rem", fontSize: ".88rem", color: "rgba(238,244,251,.85)" }}>
                  <span style={{ color: "#14a44d", fontWeight: 800, flexShrink: 0 }}>✓</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href="/register" className="btn btn-gold btn-lg">
              Register as a player →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
function Card({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div style={{
      padding: "1.25rem",
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: ".85rem",
      borderTop: `3px solid ${accent}`,
    }}>
      <div style={{ fontSize: ".72rem", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 800, color: accent, marginBottom: ".5rem" }}>
        {title}
      </div>
      <div style={{ fontSize: ".9rem", color: "rgba(238,244,251,.85)", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}