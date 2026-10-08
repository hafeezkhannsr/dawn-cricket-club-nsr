import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { STUDENTS, getBatch } from "@/lib/data/mock-academy";
export const metadata = { title: "Academy Students" };
export default function StudentsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/academy" style={{ color: "inherit" }}>Academy</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Students</span>
          </nav>
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>Academy Students</h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              {STUDENTS.length} active students · Ages 14-16 · U15 & U17 batches
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            {STUDENTS.map((s) => {
              const batch = getBatch(s.batchId);
              return (
                <div key={s.id} style={{ padding: "1.15rem", background: "rgba(255,255,255,.03)", border: `1px solid ${batch?.color}44`, borderRadius: ".85rem" }}>
                  <div style={{ display: "flex", gap: ".75rem", alignItems: "center", marginBottom: ".85rem" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 999, background: `${batch?.color}22`, border: `1px solid ${batch?.color}66`, display: "grid", placeItems: "center", fontSize: "1.2rem", flexShrink: 0 }}>{s.avatar}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: ".95rem", fontWeight: 800, color: "#fff" }}>{s.name}</div>
                      <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)" }}>{s.age} years · {s.role}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: ".4rem", marginBottom: ".75rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: ".65rem", padding: ".2rem .5rem", background: `${batch?.color}22`, color: batch?.color, borderRadius: ".3rem", fontWeight: 700 }}>{s.category}</span>
                    <span style={{ fontSize: ".65rem", padding: ".2rem .5rem", background: "rgba(255,255,255,.05)", color: "rgba(238,244,251,.75)", borderRadius: ".3rem" }}>{s.batting}</span>
                    {s.bowling !== "-" && <span style={{ fontSize: ".65rem", padding: ".2rem .5rem", background: "rgba(255,255,255,.05)", color: "rgba(238,244,251,.75)", borderRadius: ".3rem" }}>{s.bowling}</span>}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".5rem", fontSize: ".72rem" }}>
                    <div style={{ padding: ".5rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem" }}>
                      <div style={{ color: "rgba(238,244,251,.5)", fontSize: ".6rem", textTransform: "uppercase" }}>Attendance</div>
                      <div style={{ color: s.attendance >= 90 ? "#86efac" : s.attendance >= 80 ? "#f0b429" : "#fca5a5", fontWeight: 800, marginTop: ".1rem" }}>{s.attendance}%</div>
                    </div>
                    <div style={{ padding: ".5rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem" }}>
                      <div style={{ color: "rgba(238,244,251,.5)", fontSize: ".6rem", textTransform: "uppercase" }}>Progress</div>
                      <div style={{ color: batch?.color, fontWeight: 800, marginTop: ".1rem" }}>{s.progress}%</div>
                    </div>
                  </div>
                  {batch && (
                    <Link href={`/academy/batches/${batch.id}`} style={{ display: "block", marginTop: ".75rem", fontSize: ".72rem", color: batch.color, fontWeight: 700, textDecoration: "none" }}>
                      {batch.name} →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: "2rem", padding: "1.5rem", background: "linear-gradient(135deg, rgba(240,180,41,.1), rgba(20,164,77,.05))", border: "1px solid rgba(240,180,41,.35)", borderRadius: ".9rem", textAlign: "center" }}>
            <h2 style={{ margin: "0 0 .5rem", fontSize: "1.15rem", fontWeight: 900 }}>Want your child to join?</h2>
            <p style={{ margin: "0 0 1.25rem", color: "rgba(238,244,251,.7)", fontSize: ".88rem" }}>
              Enroll now for the 2026-27 season. Limited seats available.
            </p>
            <Link href="/register" className="btn btn-gold">Register Now →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}