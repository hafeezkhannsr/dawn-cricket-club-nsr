import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getCoach, getCoachBatches, getStudentsInBatch } from "@/lib/data/mock-academy";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = getCoach(id);
  return { title: c ? c.name : "Coach" };
}
export default async function CoachDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const coach = getCoach(id);
  if (!coach) notFound();
  const batches = getCoachBatches(coach.id);
  const totalStudents = batches.reduce((sum, b) => sum + getStudentsInBatch(b.id).length, 0);
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/academy" style={{ color: "inherit" }}>Academy</Link> ·{" "}
            <Link href="/academy/coaches" style={{ color: "inherit" }}>Coaches</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>{coach.name}</span>
          </nav>
          {/* HERO */}
          <div style={{ padding: "1.5rem", background: `linear-gradient(135deg, ${coach.color}15, transparent)`, border: `1px solid ${coach.color}55`, borderRadius: ".9rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ width: 96, height: 96, borderRadius: 999, background: `${coach.color}22`, border: `3px solid ${coach.color}66`, display: "grid", placeItems: "center", fontSize: "2.5rem", flexShrink: 0 }}>{coach.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{ margin: 0, fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 900 }}>{coach.name}</h1>
                <div style={{ fontSize: ".95rem", color: coach.color, fontWeight: 800, marginTop: ".35rem" }}>{coach.role}</div>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: ".5rem", fontSize: ".82rem", color: "rgba(238,244,251,.7)" }}>
                  <span>📍 {coach.city}</span>
                  <span>🏅 {coach.experience} years exp</span>
                  <span>⭐ {coach.specialty}</span>
                </div>
              </div>
            </div>
          </div>
          {/* STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: ".75rem", marginBottom: "1.5rem" }}>
            <StatCard label="Experience" value={coach.experience + " yrs"} color={coach.color} />
            <StatCard label="Batches" value={batches.length.toString()} color="#f0b429" />
            <StatCard label="Students" value={totalStudents + "+"} color="#86efac" />
            <StatCard label="Certifications" value={coach.certifications.length.toString()} color="#93c5fd" />
          </div>
          {/* BIO + CERTS */}
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", padding: "1.25rem", marginBottom: "1.5rem" }}>
            <h2 style={{ margin: "0 0 .75rem", fontSize: "1.05rem", fontWeight: 900 }}>📖 About</h2>
            <p style={{ margin: "0 0 1.25rem", fontSize: ".9rem", color: "rgba(238,244,251,.8)", lineHeight: 1.75 }}>{coach.bio}</p>
            <h3 style={{ margin: "0 0 .75rem", fontSize: ".9rem", fontWeight: 800, color: "#f0b429", textTransform: "uppercase", letterSpacing: ".05em" }}>Certifications</h3>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              {coach.certifications.map((cert) => (
                <span key={cert} style={{ fontSize: ".78rem", padding: ".4rem .75rem", background: `${coach.color}22`, color: coach.color, borderRadius: ".5rem", fontWeight: 700, border: `1px solid ${coach.color}55` }}>🏅 {cert}</span>
              ))}
            </div>
            <h3 style={{ margin: "0 0 .75rem", fontSize: ".9rem", fontWeight: 800, color: "#f0b429", textTransform: "uppercase", letterSpacing: ".05em" }}>Contact</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: ".5rem", fontSize: ".82rem" }}>
              <div style={{ padding: ".6rem .85rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem", color: "rgba(238,244,251,.8)" }}>📧 {coach.email}</div>
              <div style={{ padding: ".6rem .85rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem", color: "rgba(238,244,251,.8)" }}>📱 {coach.phone}</div>
            </div>
          </div>
          {/* BATCHES */}
          {batches.length > 0 && (
            <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", padding: "1.25rem" }}>
              <h2 style={{ margin: "0 0 1rem", fontSize: "1.05rem", fontWeight: 900 }}>📅 Assigned Batches</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: ".75rem" }}>
                {batches.map((b) => (
                  <Link key={b.id} href={`/academy/batches/${b.id}`} style={{ textDecoration: "none", color: "inherit", padding: "1rem", background: `${b.color}11`, border: `1px solid ${b.color}44`, borderRadius: ".7rem" }}>
                    <div style={{ fontSize: ".65rem", color: b.color, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: ".3rem" }}>{b.category}</div>
                    <div style={{ fontSize: ".92rem", fontWeight: 800, color: "#fff", marginBottom: ".4rem" }}>{b.name}</div>
                    <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)", lineHeight: 1.6 }}>
                      ⏰ {b.timing}<br />
                      👥 {b.enrolled} students
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div style={{ marginTop: "1.5rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <Link href="/academy/coaches" className="btn btn-outline">← All Coaches</Link>
            <Link href="/academy/batches" className="btn btn-gold">View Batches →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ padding: "1rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".75rem" }}>
      <div style={{ fontSize: ".65rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase", letterSpacing: ".05em" }}>{label}</div>
      <div style={{ fontSize: "1.3rem", fontWeight: 900, color, marginTop: ".25rem" }}>{value}</div>
    </div>
  );
}