"use client";
import { useState } from "react";
const ROLES = [
  "Match Scorer",
  "Assistant Coach",
  "Social Media Manager",
  "Photographer / Videographer",
  "Event Management",
  "Registration Desk",
  "Ground Staff",
  "Content Writer",
  "Graphic Designer",
  "Other",
];
export default function VolunteerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setSuccess(null); setBusy(true);
    try {
      const res = await fetch("/api/v1/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile, city, role, experience, availability }),
      });
      const j = await res.json();
      if (!j.ok) { setErr(j.error || "Failed"); setBusy(false); return; }
      setSuccess(j.message || "Application submitted!");
      setName(""); setEmail(""); setMobile(""); setCity(""); setExperience(""); setAvailability("");
    } catch (e2) { setErr(e2 instanceof Error ? e2.message : "Network error"); }
    setBusy(false);
  }
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: ".75rem .9rem",
    background: "#0a1f3d", border: "1px solid rgba(255,255,255,.15)",
    borderRadius: ".6rem", color: "#eef4fb", fontSize: ".9rem",
    fontFamily: "inherit", outline: "none", colorScheme: "dark",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: ".8rem", fontWeight: 700,
    color: "rgba(238,244,251,.85)", marginBottom: ".35rem", marginTop: "1rem",
  };
  return (
    <form onSubmit={submit} style={{ padding: "1.5rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "1rem" }}>
      <h2 style={{ margin: "0 0 1rem", fontSize: "1.1rem", fontWeight: 900 }}>📝 Volunteer Application</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
        <div><label style={{ ...labelStyle, marginTop: 0 }}>Full Name *</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Muhammad Ahsan" style={inputStyle} /></div>
        <div><label style={{ ...labelStyle, marginTop: 0 }}>Email *</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
        <div><label style={labelStyle}>Mobile *</label><input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="0300-1234567" style={inputStyle} /></div>
        <div><label style={labelStyle}>City</label><input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Nowshera" style={inputStyle} /></div>
      </div>
      <label style={labelStyle}>Preferred Role *</label>
      <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
        {ROLES.map((r) => <option key={r}>{r}</option>)}
      </select>
      <label style={labelStyle}>Previous Experience (optional)</label>
      <textarea value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Any relevant experience..." style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} />
      <label style={labelStyle}>Availability *</label>
      <input value={availability} onChange={(e) => setAvailability(e.target.value)} placeholder="e.g. Weekends, Evenings" style={inputStyle} />
      {err && <div style={{ marginTop: "1rem", padding: ".7rem 1rem", background: "rgba(255,80,80,.12)", border: "1px solid rgba(255,80,80,.4)", borderRadius: ".55rem", color: "#ff8b8b", fontSize: ".85rem" }}>{err}</div>}
      {success && <div style={{ marginTop: "1rem", padding: ".7rem 1rem", background: "rgba(20,164,77,.12)", border: "1px solid rgba(20,164,77,.4)", borderRadius: ".55rem", color: "#86efac", fontSize: ".85rem" }}>✓ {success}</div>}
      <button type="submit" disabled={busy} className="btn btn-gold" style={{ marginTop: "1.25rem", opacity: busy ? .7 : 1 }}>
        {busy ? "Submitting…" : "Submit Application →"}
      </button>
    </form>
  );
}