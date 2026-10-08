"use client";
import { useState } from "react";
const SUBJECTS = ["General inquiry","Player Registration","DSL Registration","Academy admission","Ground booking","Sponsorship","Media & press","Complaint","Other"];
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(null); setSuccess(null); setBusy(true);
    try {
      const res = await fetch("/api/v1/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, subject, message }) });
      const j = await res.json();
      if (!j.ok) { setErr(j.error || "Failed"); setBusy(false); return; }
      setSuccess(j.message || "Sent!"); setName(""); setEmail(""); setPhone(""); setMessage("");
    } catch (e2) { setErr("Network error"); }
    setBusy(false);
  }
  const iStyle: React.CSSProperties = { width: "100%", padding: ".75rem .9rem", background: "#0a1f3d", border: "1px solid rgba(255,255,255,.15)", borderRadius: ".6rem", color: "#eef4fb", fontSize: ".92rem", fontFamily: "inherit", outline: "none", colorScheme: "dark" };
  const lStyle: React.CSSProperties = { display: "block", fontSize: ".8rem", fontWeight: 700, color: "rgba(238,244,251,.85)", marginBottom: ".35rem", marginTop: "1rem" };
  return (
    <form onSubmit={submit} style={{ padding: "1.5rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "1rem" }}>
      <h2 style={{ margin: "0 0 1rem", fontSize: "1.15rem", fontWeight: 900 }}>✉️ Send us a message</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
        <div><label style={{ ...lStyle, marginTop: 0 }}>Name *</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Muhammad Ahsan" style={iStyle} /></div>
        <div><label style={{ ...lStyle, marginTop: 0 }}>Email *</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="player@example.com" style={iStyle} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
        <div><label style={lStyle}>Phone</label><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 300 1234567" style={iStyle} /></div>
        <div><label style={lStyle}>Subject</label><select value={subject} onChange={(e) => setSubject(e.target.value)} style={iStyle}>{SUBJECTS.map((s) => <option key={s}>{s}</option>)}</select></div>
      </div>
      <label style={lStyle}>Message *</label>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message..." style={{ ...iStyle, minHeight: 140, resize: "vertical" }} />
      {err && <div style={{ marginTop: "1rem", padding: ".7rem 1rem", background: "rgba(255,80,80,.12)", border: "1px solid rgba(255,80,80,.4)", borderRadius: ".55rem", color: "#ff8b8b", fontSize: ".85rem" }}>{err}</div>}
      {success && <div style={{ marginTop: "1rem", padding: ".7rem 1rem", background: "rgba(20,164,77,.12)", border: "1px solid rgba(20,164,77,.4)", borderRadius: ".55rem", color: "#86efac", fontSize: ".85rem" }}>✓ {success}</div>}
      <button type="submit" disabled={busy} className="btn btn-gold" style={{ marginTop: "1.25rem", opacity: busy ? .7 : 1 }}>{busy ? "Sending..." : "Send Message →"}</button>
    </form>
  );
}