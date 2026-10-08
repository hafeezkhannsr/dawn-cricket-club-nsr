import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { NOTICES, NOTICE_CATEGORIES, getCategoryMeta } from "@/lib/data/mock-notices";
export const metadata = { title: "Notices — Admin" };
export default function AdminNoticesPage() {
  const byCat = NOTICE_CATEGORIES.map((c) => ({
    ...c,
    count: NOTICES.filter((n) => n.category === c.key).length,
  }));
  return (
    <AdminShell title="Notices & Announcements" subtitle="Manage public notices — read-only demo (edit requires DB)">
      {/* Info banner */}
      <div style={{ padding: "1rem 1.25rem", background: "rgba(240,180,41,.08)", border: "1px solid rgba(240,180,41,.3)", borderRadius: ".7rem", marginBottom: "1.5rem", fontSize: ".82rem", color: "rgba(238,244,251,.85)", lineHeight: 1.6 }}>
        <b style={{ color: "#f0b429" }}>ℹ️ Demo Mode:</b> Notices are currently read-only. To enable creating, editing, and deleting notices, connect a database (Neon PostgreSQL). Public page: <Link href="/notices" style={{ color: "#f0b429" }}>/notices</Link>
      </div>
      {/* Stats by category */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: ".6rem", marginBottom: "1.75rem" }}>
        <div style={{ padding: ".85rem 1rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".7rem" }}>
          <div style={{ fontSize: ".65rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase", fontWeight: 700 }}>Total</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff" }}>{NOTICES.length}</div>
        </div>
        {byCat.map((c) => (
          <div key={c.key} style={{ padding: ".85rem 1rem", background: "rgba(255,255,255,.03)", border: `1px solid ${c.color}44`, borderRadius: ".7rem" }}>
            <div style={{ fontSize: ".65rem", color: c.color, textTransform: "uppercase", fontWeight: 800, display: "flex", alignItems: "center", gap: ".35rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: c.color }} />
              {c.label}
            </div>
            <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff", marginTop: ".15rem" }}>{c.count}</div>
          </div>
        ))}
      </div>
      {/* Action buttons (disabled — demo) */}
      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <button className="btn btn-gold" disabled style={{ opacity: .55, cursor: "not-allowed" }}>
          + New Notice
        </button>
        <Link href="/notices" className="btn btn-outline">
          View Public Page →
        </Link>
      </div>
      {/* Notices list */}
      <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 800 }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,.03)" }}>
                {["Title", "Category", "Priority", "Author", "Published", "Expires", ""].map((h) => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {NOTICES.map((n) => {
                const meta = getCategoryMeta(n.category);
                return (
                  <tr key={n.id} style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                    <td style={{ padding: ".7rem 1rem" }}>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: ".85rem" }}>{n.title}</div>
                      <div style={{ fontSize: ".68rem", color: "rgba(238,244,251,.5)", fontFamily: "monospace", marginTop: ".15rem" }}>{n.id}</div>
                    </td>
                    <td style={td}>
                      <span style={{ fontSize: ".68rem", padding: ".2rem .55rem", background: `${meta.color}22`, color: meta.color, borderRadius: ".3rem", fontWeight: 800 }}>{meta.label}</span>
                    </td>
                    <td style={td}>
                      <span style={{ fontSize: ".65rem", padding: ".2rem .5rem", background: n.priority === "HIGH" ? "rgba(220,38,38,.2)" : n.priority === "MEDIUM" ? "rgba(240,180,41,.15)" : "rgba(255,255,255,.05)", color: n.priority === "HIGH" ? "#fca5a5" : n.priority === "MEDIUM" ? "#f0b429" : "rgba(238,244,251,.6)", borderRadius: ".3rem", fontWeight: 800 }}>{n.priority}</span>
                    </td>
                    <td style={td}>{n.author}</td>
                    <td style={td}>{new Date(n.publishedAt).toLocaleDateString()}</td>
                    <td style={td}>{n.expiresAt ? new Date(n.expiresAt).toLocaleDateString() : "—"}</td>
                    <td style={td}>
                      <Link href={`/notices/${n.id}`} className="btn btn-outline" style={{ padding: ".3rem .6rem", fontSize: ".72rem" }}>View</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Roadmap */}
      <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "rgba(20,164,77,.06)", border: "1px solid rgba(20,164,77,.3)", borderRadius: ".7rem" }}>
        <h3 style={{ margin: "0 0 .5rem", fontSize: ".95rem", fontWeight: 800, color: "#86efac" }}>📌 Roadmap</h3>
        <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: ".82rem", color: "rgba(238,244,251,.75)", lineHeight: 1.8 }}>
          <li>Enable creating/editing notices (needs DB)</li>
          <li>Publish/unpublish toggle</li>
          <li>Attach PDFs and images</li>
          <li>Schedule publish date</li>
          <li>Email/SMS notifications to subscribers</li>
          <li>Push notification integration</li>
        </ul>
      </div>
    </AdminShell>
  );
}
const th: React.CSSProperties = { padding: ".7rem 1rem", textAlign: "left", fontSize: ".68rem", color: "rgba(238,244,251,.55)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: ".7rem 1rem", color: "rgba(238,244,251,.8)", fontSize: ".82rem" };