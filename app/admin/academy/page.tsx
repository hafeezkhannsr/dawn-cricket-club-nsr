import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { BATCHES, COACHES, STUDENTS, getCoach, getStudentsInBatch } from "@/lib/data/mock-academy";
export const metadata = { title: "Academy — Admin" };
export default function AdminAcademyPage() {
  const totalStudents = STUDENTS.length;
  const totalCapacity = BATCHES.reduce((s, b) => s + b.capacity, 0);
  const totalEnrolled = BATCHES.reduce((s, b) => s + b.enrolled, 0);
  return (
    <AdminShell title="Academy Management" subtitle="Batches, coaches, and students overview">
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: ".75rem", marginBottom: "1.75rem" }}>
        <Stat label="Batches" value={BATCHES.length.toString()} color="#f0b429" icon="📅" />
        <Stat label="Coaches" value={COACHES.length.toString()} color="#86efac" icon="👨‍🏫" />
        <Stat label="Students" value={totalStudents.toString()} color="#93c5fd" icon="👥" />
        <Stat label="Enrollment" value={totalEnrolled + "/" + totalCapacity} color="#c4b5fd" icon="📊" />
      </div>
      {/* Batches */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 900 }}>📅 Batches</h2>
          <Link href="/academy/batches" className="btn btn-outline" style={{ fontSize: ".78rem", padding: ".4rem .8rem" }}>View Public →</Link>
        </div>
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 800 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,.03)" }}>
                  {["Batch", "Category", "Coach", "Timing", "Enrolled", "Status", "Fee"].map((h) => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BATCHES.map((b) => {
                  const coach = getCoach(b.coachId);
                  const fill = Math.round((b.enrolled / b.capacity) * 100);
                  return (
                    <tr key={b.id} style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                      <td style={td}>
                        <div style={{ color: "#fff", fontWeight: 700 }}>{b.name}</div>
                        <div style={{ fontSize: ".7rem", color: "rgba(238,244,251,.5)" }}>{b.ageRange}</div>
                      </td>
                      <td style={td}><span style={{ padding: ".2rem .5rem", background: b.color + "22", color: b.color, borderRadius: ".3rem", fontWeight: 800, fontSize: ".72rem" }}>{b.category}</span></td>
                      <td style={td}>{coach?.name || "—"}</td>
                      <td style={td}><span style={{ fontSize: ".78rem" }}>{b.timing}</span></td>
                      <td style={td}>
                        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                          <div style={{ width: 60, height: 6, background: "rgba(255,255,255,.08)", borderRadius: 999, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: fill + "%", background: b.color }} />
                          </div>
                          <span style={{ fontSize: ".75rem", color: "rgba(238,244,251,.75)" }}>{b.enrolled}/{b.capacity}</span>
                        </div>
                      </td>
                      <td style={td}>
                        <span style={{ padding: ".2rem .5rem", background: b.status === "OPEN" ? "rgba(20,164,77,.2)" : "rgba(220,38,38,.2)", color: b.status === "OPEN" ? "#86efac" : "#fca5a5", borderRadius: ".3rem", fontWeight: 800, fontSize: ".68rem" }}>{b.status}</span>
                      </td>
                      <td style={td}>PKR {b.monthlyFee.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Coaches */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 900 }}>👨‍🏫 Coaches</h2>
          <Link href="/academy/coaches" className="btn btn-outline" style={{ fontSize: ".78rem", padding: ".4rem .8rem" }}>View Public →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: ".75rem" }}>
          {COACHES.map((c) => (
            <Link key={c.id} href={`/academy/coaches/${c.id}`} style={{ textDecoration: "none", color: "inherit", padding: "1rem", background: "rgba(255,255,255,.03)", border: `1px solid ${c.color}44`, borderRadius: ".7rem", display: "flex", gap: ".75rem", alignItems: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: c.color + "22", border: `1px solid ${c.color}66`, display: "grid", placeItems: "center", fontSize: "1.4rem", flexShrink: 0 }}>{c.avatar}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: ".9rem", fontWeight: 800, color: "#fff" }}>{c.name}</div>
                <div style={{ fontSize: ".7rem", color: c.color, fontWeight: 700 }}>{c.role}</div>
                <div style={{ fontSize: ".68rem", color: "rgba(238,244,251,.55)", marginTop: ".15rem" }}>{c.experience} yrs · {c.city}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Students */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 900 }}>👥 Students ({STUDENTS.length})</h2>
          <Link href="/academy/students" className="btn btn-outline" style={{ fontSize: ".78rem", padding: ".4rem .8rem" }}>View Public →</Link>
        </div>
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 700 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,.03)" }}>
                  {["Name", "Age", "Batch", "Role", "Attendance", "Progress"].map((h) => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STUDENTS.slice(0, 15).map((s) => {
                  const batch = BATCHES.find((b) => b.id === s.batchId);
                  return (
                    <tr key={s.id} style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                      <td style={{ padding: ".6rem .9rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                          <div style={{ width: 28, height: 28, borderRadius: 999, background: (batch?.color || "#14a44d") + "22", display: "grid", placeItems: "center", fontSize: ".8rem" }}>{s.avatar}</div>
                          <span style={{ color: "#fff", fontWeight: 700 }}>{s.name}</span>
                        </div>
                      </td>
                      <td style={td}>{s.age}</td>
                      <td style={td}><span style={{ padding: ".2rem .5rem", background: (batch?.color || "#14a44d") + "22", color: batch?.color, borderRadius: ".3rem", fontSize: ".7rem", fontWeight: 800 }}>{s.category}</span></td>
                      <td style={td}>{s.role}</td>
                      <td style={{ ...td, color: s.attendance >= 90 ? "#86efac" : s.attendance >= 80 ? "#f0b429" : "#fca5a5", fontWeight: 800 }}>{s.attendance}%</td>
                      <td style={td}>
                        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                          <div style={{ width: 60, height: 6, background: "rgba(255,255,255,.08)", borderRadius: 999, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: s.progress + "%", background: batch?.color || "#14a44d" }} />
                          </div>
                          <span style={{ fontSize: ".72rem", color: batch?.color }}>{s.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
function Stat({ label, value, color, icon }: { label: string; value: string; color: string; icon: string }) {
  return (
    <div style={{ padding: "1rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".25rem" }}>
        <span style={{ fontSize: ".68rem", color: "rgba(238,244,251,.55)", letterSpacing: ".04em", textTransform: "uppercase", fontWeight: 700 }}>{label}</span>
        <span>{icon}</span>
      </div>
      <div style={{ fontSize: "1.55rem", fontWeight: 900, color }}>{value}</div>
    </div>
  );
}
const th: React.CSSProperties = { padding: ".65rem .9rem", textAlign: "left", fontSize: ".68rem", color: "rgba(238,244,251,.55)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: ".6rem .9rem", color: "rgba(238,244,251,.8)", fontSize: ".82rem" };