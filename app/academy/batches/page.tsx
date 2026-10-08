import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BATCHES, getCoach, getStudentsInBatch } from "@/lib/data/mock-academy";
export const metadata = { title: "Academy Batches" };
export default function BatchesPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/academy" style={{ color: "inherit" }}>Academy</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Batches</span>
          </nav>
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>Academy Batches</h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              {BATCHES.length} training batches from U13 to U19 — click any batch to view details
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem" }}>
            {BATCHES.map((b) => {
              const headCoach = getCoach(b.coachId);
              const students = getStudentsInBatch(b.id);
              const fillPct = Math.round((b.enrolled / b.capacity) * 100);
              return (
                <Link key={b.id} href={`/academy/batches/${b.id}`} style={{ display: "block", textDecoration: "none", color: "inherit", padding: "1.35rem", background: "rgba(255,255,255,.03)", border: `1px solid ${b.color}55`, borderRadius: ".9rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: ".5rem", marginBottom: ".75rem" }}>
                    <span style={{ fontSize: ".7rem", fontWeight: 800, padding: ".25rem .6rem", background: `${b.color}22`, color: b.color, borderRadius: ".4rem", border: `1px solid ${b.color}55` }}>{b.category}</span>
                    <span style={{ fontSize: ".65rem", padding: ".25rem .6rem", background: b.status === "OPEN" ? "rgba(20,164,77,.2)" : "rgba(220,38,38,.2)", color: b.status === "OPEN" ? "#86efac" : "#fca5a5", borderRadius: ".35rem", fontWeight: 800 }}>
                      {b.status === "OPEN" ? "● ENROLLING" : b.status === "FULL" ? "✕ FULL" : "CLOSED"}
                    </span>
                  </div>
                  <h2 style={{ margin: "0 0 .5rem", fontSize: "1.1rem", fontWeight: 900, color: "#fff" }}>{b.name}</h2>
                  <p style={{ margin: "0 0 1rem", fontSize: ".8rem", color: "rgba(238,244,251,.65)", lineHeight: 1.6 }}>{b.description}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".55rem", marginBottom: ".85rem", fontSize: ".75rem" }}>
                    <div style={{ padding: ".55rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem" }}>
                      <div style={{ color: "rgba(238,244,251,.5)", fontSize: ".62rem", textTransform: "uppercase" }}>Ages</div>
                      <div style={{ color: "#fff", fontWeight: 700, marginTop: ".15rem" }}>{b.ageRange}</div>
                    </div>
                    <div style={{ padding: ".55rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem" }}>
                      <div style={{ color: "rgba(238,244,251,.5)", fontSize: ".62rem", textTransform: "uppercase" }}>Fee / Month</div>
                      <div style={{ color: b.color, fontWeight: 800, marginTop: ".15rem" }}>PKR {b.monthlyFee.toLocaleString()}</div>
                    </div>
                    <div style={{ padding: ".55rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem", gridColumn: "1 / -1" }}>
                      <div style={{ color: "rgba(238,244,251,.5)", fontSize: ".62rem", textTransform: "uppercase" }}>Timing</div>
                      <div style={{ color: "#fff", fontWeight: 700, marginTop: ".15rem" }}>⏰ {b.timing} · {b.schedule}</div>
                    </div>
                    <div style={{ padding: ".55rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem", gridColumn: "1 / -1" }}>
                      <div style={{ color: "rgba(238,244,251,.5)", fontSize: ".62rem", textTransform: "uppercase" }}>Venue</div>
                      <div style={{ color: "#fff", fontWeight: 700, marginTop: ".15rem" }}>📍 {b.venue}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".65rem", padding: ".55rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 999, background: `${headCoach?.color}22`, border: `1px solid ${headCoach?.color}66`, display: "grid", placeItems: "center", fontSize: ".9rem" }}>{headCoach?.avatar}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: ".75rem", color: "#fff", fontWeight: 700 }}>{headCoach?.name}</div>
                      <div style={{ fontSize: ".65rem", color: "rgba(238,244,251,.55)" }}>{headCoach?.role}</div>
                    </div>
                  </div>
                  <div style={{ marginBottom: ".35rem", fontSize: ".72rem", color: "rgba(238,244,251,.65)", display: "flex", justifyContent: "space-between" }}>
                    <span>{b.enrolled} / {b.capacity} enrolled · {students.length} shown</span>
                    <span style={{ color: b.color, fontWeight: 800 }}>{fillPct}%</span>
                  </div>
                  <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,.05)", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: fillPct + "%", background: b.color, borderRadius: 999 }} />
                  </div>
                  <div style={{ marginTop: "1rem", fontSize: ".78rem", color: b.color, fontWeight: 700 }}>View batch →</div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}