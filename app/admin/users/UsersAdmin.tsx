"use client";
import { useCallback, useEffect, useState } from "react";
type U = {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
};
const ROLES = ["SUPER_ADMIN", "CLUB_ADMIN", "REVIEWER", "SCORER", "PLAYER"];
export default function UsersAdmin() {
  const [users, setUsers] = useState<U[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PLAYER");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/users", { cache: "no-store" });
      const j = await res.json();
      if (j.ok) setUsers(j.items);
    } catch {}
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);
  async function addUser() {
    setMsg(null);
    if (!email.includes("@")) { setMsg("Valid email required"); return; }
    if (password.length < 6) { setMsg("Password must be at least 6 characters"); return; }
    setBusy(true);
    try {
      const res = await fetch("/api/v1/auth/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role }),
      });
      const j = await res.json();
      if (j.ok) {
        setMsg(`✓ User created: ${email}`);
        setEmail(""); setName(""); setPassword(""); setRole("PLAYER");
        await load();
      } else setMsg(j.error || "Failed");
    } catch { setMsg("Network error"); }
    setBusy(false);
  }
  const inputStyle: React.CSSProperties = {
    padding: ".65rem .8rem",
    background: "#0a1f3d",
    border: "1px solid rgba(255,255,255,.15)",
    borderRadius: ".55rem",
    color: "#eef4fb",
    fontSize: ".88rem",
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    colorScheme: "dark",
  };
  return (
    <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
      <div className="container">
        <header style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}>Users & Roles</h1>
          <p style={{ margin: ".35rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
            Manage admin and player accounts with role-based access
          </p>
        </header>
        {/* Add user */}
        <div style={{
          padding: "1.25rem",
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(240,180,41,.35)",
          borderRadius: ".9rem",
          marginBottom: "1.5rem",
        }}>
          <h2 style={{ margin: "0 0 1rem", fontSize: "1rem", fontWeight: 800 }}>Add user</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: ".65rem" }} className="usr-row">
            <input style={inputStyle} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <input style={inputStyle} placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input style={inputStyle} placeholder="Password (min 6)" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <select style={inputStyle} value={role} onChange={(e) => setRole(e.target.value)}>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button className="btn btn-gold" onClick={addUser} disabled={busy} style={{ opacity: busy ? .7 : 1 }}>
              {busy ? "…" : "Create"}
            </button>
          </div>
          {msg && (
            <div style={{
              marginTop: ".75rem", fontSize: ".82rem",
              color: msg.startsWith("✓") ? "#86efac" : "#ff8b8b",
            }}>{msg}</div>
          )}
        </div>
        {/* Users table */}
        <div style={{
          background: "rgba(255,255,255,.02)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: ".9rem",
          overflow: "hidden",
        }}>
          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>Loading…</div>
          ) : users.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>No users yet.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 620 }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,.03)" }}>
                    {["Name", "Email", "Role", "Created"].map((h) => (
                      <th key={h} style={{
                        textAlign: "left", padding: ".7rem .9rem",
                        fontSize: ".72rem", letterSpacing: ".04em", textTransform: "uppercase",
                        color: "rgba(238,244,251,.7)", fontWeight: 700,
                        borderBottom: "1px solid rgba(255,255,255,.08)",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                      <td style={{ padding: ".7rem .9rem", color: "#fff", fontWeight: 600 }}>{u.name}</td>
                      <td style={{ padding: ".7rem .9rem", color: "rgba(238,244,251,.75)" }}>{u.email}</td>
                      <td style={{ padding: ".7rem .9rem" }}>
                        <span style={{
                          fontSize: ".68rem", fontWeight: 800, letterSpacing: ".05em",
                          padding: ".2rem .55rem", borderRadius: ".35rem",
                          background: u.role === "SUPER_ADMIN" ? "rgba(240,180,41,.18)"
                                    : u.role === "SCORER" ? "rgba(20,164,77,.18)"
                                    : "rgba(255,255,255,.06)",
                          color: u.role === "SUPER_ADMIN" ? "#f0b429"
                               : u.role === "SCORER" ? "#86efac"
                               : "rgba(238,244,251,.8)",
                        }}>{u.role}</span>
                      </td>
                      <td style={{ padding: ".7rem .9rem", color: "rgba(238,244,251,.55)", fontSize: ".78rem" }}>
                        {new Date(u.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div style={{
          marginTop: "1.25rem",
          padding: "1rem 1.25rem",
          background: "rgba(240,180,41,.06)",
          border: "1px solid rgba(240,180,41,.25)",
          borderRadius: ".7rem",
          fontSize: ".82rem",
          color: "rgba(238,244,251,.85)",
          lineHeight: 1.6,
        }}>
          <b style={{ color: "#f0b429" }}>Default accounts (dev only):</b>{" "}
          <code>admin@dawn.local</code> / <code>DawnAdmin#2026</code> ·{" "}
          <code>scorer@dawn.local</code> / <code>DawnScorer#2026</code>
          <br />
          <b style={{ color: "#ff8b8b" }}>Change these before production!</b>
        </div>
      </div>
      <style>{`
        @media (min-width: 900px) {
          .usr-row { grid-template-columns: 1.2fr 1.4fr 1.2fr 1fr auto !important; }
        }
      `}</style>
    </main>
  );
}