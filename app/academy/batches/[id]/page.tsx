import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getBatch, getCoach, getStudentsInBatch } from "@/lib/data/mock-academy";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = getBatch(id);
  return { title: b ? b.name : "Batch" };
}
export default async function BatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const batch = getBatch(id);
  if (!batch) notFound();
  const headCoach = getCoach(batch.coachId);
  const assistant = batch.assistantCoachId ? getCoach(batch.assistantCoachId) : null;
  const students = getStudentsInBatch(batch.id);
  const fillPct = Math.round((batch.enrolled / batch.capacity) * 100);
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/academy" style={{ color: "inherit" }}>Academy</Link> ·{" "}
            <Link href="/academy/batches" style={{ color: "inherit" }}>Batches</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>{batch.category}</span>
          </nav>
          {/* HEADER */}
          <div style={{ padding: "1.5rem", background: `linear-gradient(135deg, ${batch.color}15, transparent)`, border: `1px solid ${batch.color}55`, borderRadius: ".9rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ width: 72, height: 72, borderRadius: ".7rem", background: `${batch.color}22`, border: `2px solid ${batch.color}`, display: "grid", placeItems: "center", fontSize: "2rem", flexShrink: 0 }}>🏏</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: ".5rem", alignItems: "center", flexWrap: "wrap", marginBottom: ".4rem" }}>
                  <span style={{ fontSize: ".68rem", fontWeight: 800, padding: ".25rem .6rem", background: `${batch.color}22`, color: batch.color, borderRadius: ".4rem" }}>{batch.category}</span>
                  <span style={{ fontSize: ".62rem", padding: ".25rem .6rem", background: batch.status === "OPEN" ? "rgba(20,164,77,.2)" : "rgba(220,38,38,.2)", color: batch.status === "OPEN" ? "#86efac" : "#fca5a5", borderRadius: ".35rem", fontWeight: 800 }}>
                    {batch.status === "OPEN" ? "● ENROLLING" : batch.status === "FULL" ? "✕ FULL" : "CLOSED"}
                  </span>
                </div>
                <h1 style={{ margin: 0, fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 900 }}>{batch.name}</h1>
                <div style={{ fontSize: ".82rem", color: "rgba(238,244,251,.7)", marginTop: ".4rem" }}>
                  {batch.ageRange} · 📍 {batch.venue}
                </div>
              </div>
            </div>
          </div>
          {/* STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: ".75rem", marginBottom: "1.5rem" }}>
            <StatCard label="Enrolled" value={batch.enrolled + "/" + batch.capacity} color={batch.color} />
            <StatCard label="Fill Rate" value={fillPct + "%"} color="#f0b429" />
            <StatCard label="Monthly Fee" value={"PKR " + batch.monthlyFee.toLocaleString()} color="#86efac" />
            <StatCard label="Sessions/Week" value={batch.days.length.toString()} color="#93c5fd" />
          </div>
          {/* SCHEDULE */}
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", padding: "1.25rem", marginBottom: "1.5rem" }}>
            <h2 style={{ margin: "0 0 1rem", fontSize: "1.05rem", fontWeight: 900 }}>📅 Schedule</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: ".75rem" }}>
              <div style={{ padding: ".75rem", background: "rgba(255,255,255,.03)", borderRadius: ".6rem" }}>
                <div style={{ fontSize: ".65rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase" }}>Timing</div>
                <div style={{ fontSize: ".88rem", color: "#fff", fontWeight: 700, marginTop: ".2rem" }}>{batch.timing}</div>
              </div>
              <div style={{ padding: ".75rem", background: "rgba(255,255,255,.03)", borderRadius: ".6rem" }}>
                <div style={{ fontSize: ".65rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase" }}>Days</div>
                <div style={{ fontSize: ".88rem", color: "#fff", fontWeight: 700, marginTop: ".2rem" }}>{batch.schedule}</div>
              </div>
              <div style={{ padding: ".75rem", background: "rgba(255,255,255,.03)", borderRadius: ".6rem" }}>
                <div style={{ fontSize: ".65rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase" }}>Venue</div>
                <div style={{ fontSize: ".88rem", color: "#fff", fontWeight: 700, marginTop: ".2rem" }}>{batch.venue}</div>
              </div>
            </div>
          </div>
          {/* COACHES */}
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", padding: "1.25rem", marginBottom: "1.5rem" }}>
            <h2 style={{ margin: "0 0 1rem", fontSize: "1.05rem", fontWeight: 900 }}>👨‍🏫 Coaching Staff</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: ".75rem" }}>
              {headCoach && (
                <Link href={`/academy/coaches/${headCoach.id}`} style={{ textDecoration: "none", color: "inherit", padding: "1rem", background: "rgba(240,180,41,.06)", border: "1px solid rgba(240,180,41,.3)", borderRadius: ".7rem", display: "flex", gap: ".75rem", alignItems: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 999, background: `${headCoach.color}22`, border: `1px solid ${headCoach.color}66`, display: "grid", placeItems: "center", fontSize: "1.4rem", flexShrink: 0 }}>{headCoach.avatar}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: ".68rem", color: "#f0b429", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em" }}>Head Coach</div>
                    <div style={{ fontSize: ".9rem", fontWeight: 800, color: "#fff", marginTop: ".15rem" }}>{headCoach.name}</div>
                    <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)" }}>{headCoach.specialty}</div>
                  </div>
                </Link>
              )}
              {assistant && (
                <Link href={`/academy/coaches/${assistant.id}`} style={{ textDecoration: "none", color: "inherit", padding: "1rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".7rem", display: "flex", gap: ".75rem", alignItems: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 999, background: `${assistant.color}22`, border: `1px solid ${assistant.color}66`, display: "grid", placeItems: "center", fontSize: "1.4rem", flexShrink: 0 }}>{assistant.avatar}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: ".68rem", color: "rgba(238,244,251,.55)", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".05em" }}>Assistant Coach</div>
                    <div style={{ fontSize: ".9rem", fontWeight: 800, color: "#fff", marginTop: ".15rem" }}>{assistant.name}</div>
                    <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)" }}>{assistant.specialty}</div>
                  </div>
                </Link>
              )}
            </div>
          </div>
          {/* STUDENTS */}
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", overflow: "hidden" }}>
            <div style={{ padding: "1rem 1.25rem", background: `${batch.color}15`, borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: ".5rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 900 }}>👥 Enrolled Students</h2>
              <span style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)" }}>{students.length} shown · {batch.enrolled} total</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 720 }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,.02)" }}>
                    <th style={thL}>#</th>
                    <th style={thL}>Student</th>
                    <th style={thL}>Age</th>
                    <th style={thL}>Role</th>
                    <th style={thR}>Attendance</th>
                    <th style={thR}>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, i) => (
                    <tr key={s.id} style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                      <td style={{ padding: ".7rem 1.25rem", color: "#f0b429", fontWeight: 800 }}>{i + 1}</td>
                      <td style={{ padding: ".7rem 1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                          <div style={{ width: 32, height: 32, borderRadius: 999, background: `${batch.color}22`, border: `1px solid ${batch.color}66`, display: "grid", placeItems: "center", fontSize: ".85rem" }}>{s.avatar}</div>
                          <span style={{ color: "#fff", fontWeight: 700 }}>{s.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: ".7rem 1.25rem", color: "rgba(238,244,251,.8)" }}>{s.age}</td>
                      <td style={{ padding: ".7rem 1.25rem", color: "rgba(238,244,251,.75)" }}>{s.role}</td>
                      <td style={{ padding: ".7rem 1.25rem", textAlign: "right" }}>
                        <span style={{ color: s.attendance >= 90 ? "#86efac" : s.attendance >= 80 ? "#f0b429" : "#fca5a5", fontWeight: 800 }}>{s.attendance}%</span>
                      </td>
                      <td style={{ padding: ".7rem 1.25rem", textAlign: "right", minWidth: 120 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: ".5rem", justifyContent: "flex-end" }}>
                          <div style={{ width: 70, height: 6, background: "rgba(255,255,255,.08)", borderRadius: 999, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: s.progress + "%", background: batch.color, borderRadius: 999 }} />
                          </div>
                          <span style={{ color: batch.color, fontWeight: 800, fontSize: ".75rem" }}>{s.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <Link href="/academy/batches" className="btn btn-outline">← All Batches</Link>
            <Link href="/academy/coaches" className="btn btn-outline">Meet Coaches</Link>
            <Link href="/register" className="btn btn-gold">Register for this batch →</Link>
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
      <div style={{ fontSize: "1.2rem", fontWeight: 900, color, marginTop: ".25rem" }}>{value}</div>
    </div>
  );
}
const thL: React.CSSProperties = { padding: ".7rem 1.25rem", textAlign: "left", fontSize: ".68rem", color: "rgba(238,244,251,.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" };
const thR: React.CSSProperties = { ...thL, textAlign: "right" };