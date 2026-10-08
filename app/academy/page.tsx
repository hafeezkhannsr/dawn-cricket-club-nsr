import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PROGRAMS, BATCHES, COACHES, STUDENTS } from "@/lib/data/mock-academy";
export const metadata = {
  title: "DAWN Cricket Academy",
  description: "Professional cricket academy in Nowshera — batches for U13, U15, U17, U19 with certified coaches.",
};
export default function AcademyPage() {
  const totalStudents = STUDENTS.length;
  const totalCoaches = COACHES.length;
  const openBatches = BATCHES.filter((b) => b.status === "OPEN").length;
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", paddingBottom: "4rem" }}>
        {/* HERO */}
        <section style={{ padding: "3rem 0 2.5rem", background: "linear-gradient(135deg, rgba(20,164,77,.15), rgba(240,180,41,.08))", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <div className="container">
            <div style={{ display: "flex", gap: ".6rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 800, padding: ".3rem .7rem", borderRadius: ".4rem", background: "rgba(20,164,77,.25)", color: "#86efac", border: "1px solid rgba(20,164,77,.5)" }}>
                ★ Professional Academy
              </span>
              <span style={{ fontSize: ".68rem", padding: ".3rem .7rem", borderRadius: ".4rem", background: "rgba(240,180,41,.2)", color: "#f0b429", border: "1px solid rgba(240,180,41,.5)", fontWeight: 700 }}>
                ● Now Enrolling 2026-27
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)", fontWeight: 900, lineHeight: 1.15 }}>
              DAWN Cricket <span style={{ color: "#f0b429" }}>Academy</span>
            </h1>
            <p style={{ margin: "1rem 0 0", color: "rgba(238,244,251,.75)", fontSize: "1.05rem", maxWidth: 780, lineHeight: 1.65 }}>
              Pakistan's premier youth cricket academy in Nowshera. Structured programs from U13 to U19,
              certified coaches, professional facilities, and a proven pathway to PCB cricket.
            </p>
            <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
              <Link href="/academy/batches" className="btn btn-gold btn-lg">
                🏏 View Batches
              </Link>
              <Link href="/register" className="btn btn-primary btn-lg">
                Register Now
              </Link>
              <Link href="/academy/coaches" className="btn btn-outline btn-lg">
                Meet Coaches
              </Link>
            </div>
          </div>
        </section>
        {/* STATS */}
        <section className="container" style={{ paddingTop: "2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: ".85rem", marginBottom: "2.5rem" }}>
            <StatCard label="Students Enrolled" value={totalStudents + "+"} color="#86efac" icon="👥" />
            <StatCard label="Certified Coaches" value={totalCoaches.toString()} color="#f0b429" icon="👨‍🏫" />
            <StatCard label="Open Batches" value={openBatches.toString()} color="#93c5fd" icon="🏏" />
            <StatCard label="Weekly Sessions" value="3-4" color="#c4b5fd" icon="📅" />
          </div>
        </section>
        {/* PROGRAMS */}
        <section className="container">
          <h2 style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: "1.25rem" }}>
            🎓 Programs
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
            {PROGRAMS.map((p) => (
              <div key={p.id} style={{ padding: "1.25rem", background: "rgba(255,255,255,.03)", border: `1px solid ${p.color}44`, borderRadius: ".9rem", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: ".68rem", letterSpacing: ".08em", color: p.color, fontWeight: 800, textTransform: "uppercase", marginBottom: ".4rem" }}>
                  {p.ageRange}
                </div>
                <h3 style={{ margin: "0 0 .5rem", fontSize: "1.1rem", fontWeight: 900, color: "#fff" }}>{p.name}</h3>
                <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.65)", marginBottom: ".85rem" }}>
                  ⏱️ {p.duration} · {p.sessionsPerWeek} sessions/week
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem", flex: 1 }}>
                  {p.features.map((f, i) => (
                    <li key={i} style={{ fontSize: ".78rem", color: "rgba(238,244,251,.75)", lineHeight: 1.8, display: "flex", gap: ".4rem", alignItems: "flex-start" }}>
                      <span style={{ color: p.color, flexShrink: 0 }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ paddingTop: ".85rem", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)" }}>Monthly Fee</span>
                  <strong style={{ fontSize: "1.05rem", color: p.color }}>PKR {p.monthlyFee.toLocaleString()}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* BATCHES PREVIEW */}
        <section className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, margin: 0 }}>📅 Current Batches</h2>
            <Link href="/academy/batches" style={{ color: "#f0b429", fontSize: ".85rem", fontWeight: 700 }}>
              View all →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
            {BATCHES.map((b) => {
              const fillPct = Math.round((b.enrolled / b.capacity) * 100);
              return (
                <Link key={b.id} href={`/academy/batches/${b.id}`} style={{ textDecoration: "none", color: "inherit", padding: "1.25rem", background: "rgba(255,255,255,.03)", border: `1px solid ${b.color}44`, borderRadius: ".9rem", display: "block" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".5rem" }}>
                    <span style={{ fontSize: ".68rem", fontWeight: 800, padding: ".2rem .5rem", background: `${b.color}22`, color: b.color, borderRadius: ".35rem" }}>{b.category}</span>
                    <span style={{ fontSize: ".65rem", padding: ".2rem .5rem", background: b.status === "OPEN" ? "rgba(20,164,77,.2)" : "rgba(220,38,38,.2)", color: b.status === "OPEN" ? "#86efac" : "#fca5a5", borderRadius: ".35rem", fontWeight: 800 }}>
                      {b.status === "OPEN" ? "● ENROLLING" : b.status === "FULL" ? "✕ FULL" : "CLOSED"}
                    </span>
                  </div>
                  <h3 style={{ margin: "0 0 .5rem", fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{b.name}</h3>
                  <div style={{ fontSize: ".75rem", color: "rgba(238,244,251,.6)", lineHeight: 1.6, marginBottom: ".75rem" }}>
                    📍 {b.venue}<br />
                    ⏰ {b.timing}<br />
                    📅 {b.schedule}
                  </div>
                  <div style={{ marginBottom: ".35rem", fontSize: ".72rem", color: "rgba(238,244,251,.6)", display: "flex", justifyContent: "space-between" }}>
                    <span>{b.enrolled} / {b.capacity} enrolled</span>
                    <span>{fillPct}%</span>
                  </div>
                  <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,.05)", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: fillPct + "%", background: b.color, borderRadius: 999 }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        {/* COACHES PREVIEW */}
        <section className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, margin: 0 }}>👨‍🏫 Our Coaches</h2>
            <Link href="/academy/coaches" style={{ color: "#f0b429", fontSize: ".85rem", fontWeight: 700 }}>
              View all →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
            {COACHES.slice(0, 3).map((c) => (
              <Link key={c.id} href={`/academy/coaches/${c.id}`} style={{ textDecoration: "none", color: "inherit", padding: "1.25rem", background: "rgba(255,255,255,.03)", border: `1px solid ${c.color}44`, borderRadius: ".9rem", display: "flex", gap: ".85rem", alignItems: "flex-start" }}>
                <div style={{ width: 56, height: 56, borderRadius: 999, background: `${c.color}22`, border: `2px solid ${c.color}66`, display: "grid", placeItems: "center", fontSize: "1.6rem", flexShrink: 0 }}>{c.avatar}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{c.name}</div>
                  <div style={{ fontSize: ".72rem", color: c.color, fontWeight: 700, marginTop: ".15rem" }}>{c.role}</div>
                  <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)", marginTop: ".3rem" }}>{c.experience} years exp · {c.specialty}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        {/* CTA */}
        <section className="container">
          <div style={{ padding: "2rem", background: "linear-gradient(135deg, rgba(240,180,41,.15), rgba(20,164,77,.08))", border: "1px solid rgba(240,180,41,.4)", borderRadius: "1rem", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, margin: "0 0 .75rem" }}>
              Ready to become a Future Champion?
            </h2>
            <p style={{ color: "rgba(238,244,251,.75)", fontSize: ".95rem", margin: "0 auto 1.5rem", maxWidth: 560, lineHeight: 1.6 }}>
              Join Pakistan's most advanced youth cricket academy. Register now for the 2026-27 season.
            </p>
            <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/register" className="btn btn-gold btn-lg">Register Player →</Link>
              <Link href="/academy/students" className="btn btn-outline btn-lg">View Students</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
function StatCard({ label, value, color, icon }: { label: string; value: string; color: string; icon: string }) {
  return (
    <div style={{ padding: "1.1rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".35rem" }}>
        <span style={{ fontSize: ".68rem", color: "rgba(238,244,251,.55)", letterSpacing: ".04em", textTransform: "uppercase", fontWeight: 700 }}>{label}</span>
        <span style={{ fontSize: "1.1rem" }}>{icon}</span>
      </div>
      <div style={{ fontSize: "1.7rem", fontWeight: 900, color }}>{value}</div>
    </div>
  );
}