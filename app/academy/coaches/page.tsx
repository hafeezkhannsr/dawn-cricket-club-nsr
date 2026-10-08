import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { COACHES } from "@/lib/data/mock-academy";
export const metadata = { title: "Academy Coaches" };
export default function CoachesPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/academy" style={{ color: "inherit" }}>Academy</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Coaches</span>
          </nav>
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>Coaching Staff</h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              {COACHES.length} certified coaches with combined 77+ years of experience
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem" }}>
            {COACHES.map((c) => (
              <Link key={c.id} href={`/academy/coaches/${c.id}`} style={{ display: "block", textDecoration: "none", color: "inherit", padding: "1.35rem", background: "rgba(255,255,255,.03)", border: `1px solid ${c.color}44`, borderRadius: ".9rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div style={{ width: 64, height: 64, borderRadius: 999, background: `${c.color}22`, border: `2px solid ${c.color}66`, display: "grid", placeItems: "center", fontSize: "1.8rem", flexShrink: 0 }}>{c.avatar}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "1.05rem", fontWeight: 900, color: "#fff" }}>{c.name}</div>
                    <div style={{ fontSize: ".78rem", color: c.color, fontWeight: 700, marginTop: ".15rem" }}>{c.role}</div>
                    <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", marginTop: ".2rem" }}>📍 {c.city}</div>
                  </div>
                </div>
                <p style={{ margin: "0 0 1rem", fontSize: ".8rem", color: "rgba(238,244,251,.7)", lineHeight: 1.6 }}>{c.bio}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".55rem", fontSize: ".75rem", marginBottom: ".85rem" }}>
                  <div style={{ padding: ".55rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem" }}>
                    <div style={{ color: "rgba(238,244,251,.5)", fontSize: ".62rem", textTransform: "uppercase" }}>Experience</div>
                    <div style={{ color: "#fff", fontWeight: 800, marginTop: ".15rem" }}>{c.experience} years</div>
                  </div>
                  <div style={{ padding: ".55rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem" }}>
                    <div style={{ color: "rgba(238,244,251,.5)", fontSize: ".62rem", textTransform: "uppercase" }}>Specialty</div>
                    <div style={{ color: "#fff", fontWeight: 700, marginTop: ".15rem", fontSize: ".72rem" }}>{c.specialty}</div>
                  </div>
                </div>
                <div style={{ marginBottom: ".85rem", display: "flex", gap: ".35rem", flexWrap: "wrap" }}>
                  {c.certifications.map((cert) => (
                    <span key={cert} style={{ fontSize: ".65rem", padding: ".2rem .5rem", background: `${c.color}22`, color: c.color, borderRadius: ".3rem", fontWeight: 700, border: `1px solid ${c.color}44` }}>{cert}</span>
                  ))}
                </div>
                <div style={{ fontSize: ".75rem", color: c.color, fontWeight: 700 }}>View profile →</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}