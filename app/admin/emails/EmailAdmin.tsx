"use client";
import { useCallback, useEffect, useState } from "react";
type EmailLog = {
  id: string;
  to: string;
  subject: string;
  body: string;
  templateId: string;
  provider: string;
  status: "queued" | "sent" | "failed";
  error?: string;
  createdAt: string;
};
const TEMPLATES = [
  { id: "registration.submitted", label: "Registration received" },
  { id: "registration.approved", label: "Registration approved" },
  { id: "registration.rejected", label: "Registration rejected" },
  { id: "registration.needs_correction", label: "Correction needed" },
  { id: "payment.verified", label: "Payment verified" },
];
export default function EmailAdmin() {
  const [items, setItems] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [to, setTo] = useState("");
  const [tpl, setTpl] = useState(TEMPLATES[0].id);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/email/test", { cache: "no-store" });
      const j = await res.json();
      if (j.ok) setItems(j.items);
    } catch {}
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);
  async function sendTest() {
    if (!to.includes("@")) { setMsg("Valid email required"); return; }
    setBusy(true); setMsg(null);
    try {
      const res = await fetch("/api/v1/email/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          templateId: tpl,
          data: {
            name: "Test Player",
            reg: "DAWN-2026-0001",
            statusUrl: "/register?status=check",
            cardUrl: "/player",
            amount: "3000",
          },
        }),
      });
      const j = await res.json();
      if (j.ok) { setMsg(`✓ Email queued to ${to}`); await load(); }
      else setMsg(j.error || "Failed");
    } catch { setMsg("Network error"); }
    setBusy(false);
  }
  async function clearAll() {
    if (!confirm("Clear all email logs?")) return;
    await fetch("/api/v1/email/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "clear" }),
    });
    await load();
  }
  return (
    <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
      <div className="container">
        <header style={{ marginBottom: "1.25rem" }}>
          <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}>Email Logs</h1>
          <p style={{ margin: ".35rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
            Test templates and view sent emails. Add RESEND_API_KEY in .env to actually deliver.
          </p>
        </header>
        <div style={{
          padding: "1.25rem",
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: ".9rem",
          marginBottom: "1.5rem",
        }}>
          <h2 style={{ margin: "0 0 1rem", fontSize: "1rem", fontWeight: 800 }}>Send test email</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: ".65rem" }} className="email-row">
            <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="player@example.com"
              style={{ padding: ".7rem .9rem", background: "#0a1f3d", border: "1px solid rgba(255,255,255,.14)", borderRadius: ".6rem", color: "#eef4fb", fontSize: ".9rem", outline: "none", fontFamily: "inherit" }} />
            <select value={tpl} onChange={(e) => setTpl(e.target.value)}
              style={{ padding: ".7rem .9rem", background: "#0a1f3d", border: "1px solid rgba(255,255,255,.14)", borderRadius: ".6rem", color: "#eef4fb", fontSize: ".9rem", outline: "none", colorScheme: "dark", cursor: "pointer" }}>
              {TEMPLATES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
            <button className="btn btn-gold" onClick={sendTest} disabled={busy} style={{ opacity: busy ? .7 : 1 }}>
              {busy ? "…" : "Send test"}
            </button>
            <button className="btn btn-outline" onClick={clearAll}>Clear log</button>
          </div>
          {msg && <div style={{ marginTop: ".75rem", fontSize: ".82rem", color: msg.startsWith("✓") ? "#86efac" : "#ff8b8b" }}>{msg}</div>}
          <p style={{ marginTop: "1rem", fontSize: ".75rem", color: "rgba(238,244,251,.55)", lineHeight: 1.6 }}>
            <b style={{ color: "#f0b429" }}>Setup:</b> Add to <code>.env.local</code>:<br />
            <code style={{ background: "rgba(0,0,0,.4)", padding: ".15rem .35rem", borderRadius: ".3rem" }}>RESEND_API_KEY=re_xxx</code><br />
            <code style={{ background: "rgba(0,0,0,.4)", padding: ".15rem .35rem", borderRadius: ".3rem" }}>RESEND_FROM=&quot;DAWN CC &lt;noreply@yourdomain.com&gt;&quot;</code><br />
            Free tier: 3,000 emails/month.
          </p>
        </div>
        <div style={{
          background: "rgba(255,255,255,.02)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: ".9rem",
          overflow: "hidden",
        }}>
          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>Loading…</div>
          ) : items.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>
              No emails yet. Send a test above.
            </div>
          ) : (
            items.map((e, i) => (
              <div key={e.id} style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,.05)" }}>
                <button
                  onClick={() => setOpen(open === e.id ? null : e.id)}
                  style={{
                    width: "100%", textAlign: "left",
                    padding: ".8rem 1rem",
                    background: "transparent",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".75rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div style={{ fontSize: ".88rem", fontWeight: 700, color: "#fff" }}>{e.subject}</div>
                    <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", marginTop: ".15rem" }}>
                      To: {e.to} · {new Date(e.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <span style={{
                    fontSize: ".68rem", fontWeight: 800, letterSpacing: ".05em",
                    padding: ".25rem .55rem", borderRadius: ".35rem",
                    background: e.status === "sent" ? "rgba(20,164,77,.18)" : e.status === "failed" ? "rgba(255,80,80,.18)" : "rgba(240,180,41,.18)",
                    color: e.status === "sent" ? "#86efac" : e.status === "failed" ? "#ff8b8b" : "#f0b429",
                  }}>{e.status.toUpperCase()} · {e.provider}</span>
                </button>
                {open === e.id && (
                  <pre style={{
                    margin: 0,
                    padding: "1rem",
                    background: "rgba(0,0,0,.25)",
                    color: "rgba(238,244,251,.85)",
                    fontSize: ".78rem",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    borderTop: "1px solid rgba(255,255,255,.05)",
                  }}>{e.body}</pre>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <style>{`
        @media (min-width: 768px) { .email-row { grid-template-columns: 2fr 2fr 1fr auto !important; } }
      `}</style>
    </main>
  );
}