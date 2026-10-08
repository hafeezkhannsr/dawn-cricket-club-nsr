"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { TimeSlot } from "@/lib/data/mock-grounds";
type Props = {
  groundId: string;
  groundName: string;
  hourlyRate: number;
  days: string[];
  slots: Record<string, TimeSlot[]>;
  defaultSlot?: string;
  defaultDate?: string;
};
type Booking = {
  id: string;
  groundId: string;
  groundName: string;
  date: string;
  slotId: string;
  start: string;
  end: string;
  purpose: string;
  teamName: string;
  captainName: string;
  captainMobile: string;
  notes: string;
  price: number;
  status: "PENDING" | "CONFIRMED";
  createdAt: string;
};
export default function BookingForm({
  groundId, groundName, hourlyRate, days, slots, defaultSlot, defaultDate,
}: Props) {
  const [selectedDate, setSelectedDate] = useState(defaultDate || days[0]);
  const [selectedSlot, setSelectedSlot] = useState(defaultSlot || "");
  const [purpose, setPurpose] = useState("Practice Match");
  const [teamName, setTeamName] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [captainMobile, setCaptainMobile] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Booking | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const daySlots = slots[selectedDate] || [];
  const selected = daySlots.find((s) => s.id === selectedSlot);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!selectedSlot) { setErr("Please select a time slot"); return; }
    if (!teamName.trim()) { setErr("Team name required"); return; }
    if (!captainName.trim()) { setErr("Captain name required"); return; }
    if (!/^03\d{2}-?\d{7}$/.test(captainMobile.replace(/\D/g, "").slice(0, 11)) && captainMobile.replace(/\D/g, "").length !== 11) {
      setErr("Valid mobile required (11 digits)");
      return;
    }
    if (!selected) { setErr("Invalid slot"); return; }
    setBusy(true);
    try {
      const booking: Booking = {
        id: "bk-" + Date.now(),
        groundId,
        groundName,
        date: selectedDate,
        slotId: selectedSlot,
        start: selected.start,
        end: selected.end,
        purpose,
        teamName: teamName.trim(),
        captainName: captainName.trim(),
        captainMobile: captainMobile.trim(),
        notes: notes.trim(),
        price: hourlyRate,
        status: "PENDING",
        createdAt: new Date().toISOString(),
      };
      const key = "dawn.ground.bookings";
      const existing = JSON.parse(window.localStorage.getItem(key) || "[]");
      existing.push(booking);
      window.localStorage.setItem(key, JSON.stringify(existing));
      setDone(booking);
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Booking failed");
    }
    setBusy(false);
  }
  if (done) {
    return (
      <div style={{ padding: "2rem", background: "rgba(20,164,77,.08)", border: "1px solid rgba(20,164,77,.4)", borderRadius: "1rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: ".75rem" }}>✓</div>
        <h2 style={{ margin: "0 0 .5rem", fontSize: "1.35rem", fontWeight: 900 }}>Booking Submitted!</h2>
        <p style={{ color: "rgba(238,244,251,.75)", fontSize: ".9rem", marginBottom: "1.5rem" }}>
          Your booking request has been recorded. Our team will contact you shortly to confirm.
        </p>
        <div style={{ padding: "1.25rem", background: "rgba(0,0,0,.25)", borderRadius: ".7rem", textAlign: "left", fontSize: ".85rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".6rem" }}>
            <KV k="Booking ID" v={done.id} mono />
            <KV k="Ground" v={done.groundName} />
            <KV k="Date" v={new Date(done.date).toLocaleDateString()} />
            <KV k="Time" v={done.start + " - " + done.end} />
            <KV k="Team" v={done.teamName} />
            <KV k="Captain" v={done.captainName} />
            <KV k="Mobile" v={done.captainMobile} />
            <KV k="Total" v={"PKR " + done.price.toLocaleString()} highlight />
          </div>
        </div>
        <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/match-central/grounds/bookings" className="btn btn-gold">View All Bookings</Link>
          <Link href="/match-central/grounds" className="btn btn-outline">Book Another</Link>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={submit} style={{ padding: "1.5rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "1rem" }}>
      {/* Date selection */}
      <label style={{ display: "block", fontSize: ".8rem", fontWeight: 700, color: "rgba(238,244,251,.85)", marginBottom: ".5rem" }}>
        Select Date
      </label>
      <div style={{ display: "flex", gap: ".35rem", marginBottom: "1.25rem", overflowX: "auto", paddingBottom: ".4rem" }}>
        {days.map((d) => {
          const isActive = selectedDate === d;
          const dateObj = new Date(d);
          return (
            <button
              key={d}
              type="button"
              onClick={() => { setSelectedDate(d); setSelectedSlot(""); }}
              style={{
                flex: "0 0 auto",
                padding: ".6rem .85rem",
                background: isActive ? "rgba(240,180,41,.15)" : "rgba(255,255,255,.03)",
                border: isActive ? "1px solid #f0b429" : "1px solid rgba(255,255,255,.1)",
                borderRadius: ".5rem",
                color: isActive ? "#f0b429" : "rgba(238,244,251,.75)",
                fontWeight: isActive ? 800 : 600,
                fontSize: ".78rem",
                cursor: "pointer",
                minWidth: 72,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: ".65rem", opacity: .8 }}>{dateObj.toLocaleDateString("en", { weekday: "short" })}</div>
              <div style={{ fontSize: ".9rem", fontWeight: 800, marginTop: ".15rem" }}>{dateObj.getDate()}</div>
              <div style={{ fontSize: ".62rem", opacity: .7 }}>{dateObj.toLocaleDateString("en", { month: "short" })}</div>
            </button>
          );
        })}
      </div>
      {/* Slot selection */}
      <label style={{ display: "block", fontSize: ".8rem", fontWeight: 700, color: "rgba(238,244,251,.85)", marginBottom: ".5rem" }}>
        Select Time Slot
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: ".5rem", marginBottom: "1.25rem" }}>
        {daySlots.map((s) => {
          const isActive = selectedSlot === s.id;
          return (
            <button
              key={s.id}
              type="button"
              disabled={!s.available}
              onClick={() => setSelectedSlot(s.id)}
              style={{
                padding: ".7rem",
                background: !s.available ? "rgba(220,38,38,.08)" : isActive ? "rgba(20,164,77,.18)" : "rgba(255,255,255,.03)",
                border: !s.available ? "1px solid rgba(220,38,38,.3)" : isActive ? "1px solid #14a44d" : "1px solid rgba(255,255,255,.1)",
                borderRadius: ".55rem",
                color: !s.available ? "rgba(238,244,251,.4)" : isActive ? "#86efac" : "rgba(238,244,251,.8)",
                fontWeight: 700,
                fontSize: ".78rem",
                cursor: !s.available ? "not-allowed" : "pointer",
                textAlign: "center",
              }}
            >
              <div>{s.start} - {s.end}</div>
              <div style={{ fontSize: ".65rem", marginTop: ".2rem", color: !s.available ? "#fca5a5" : isActive ? "#86efac" : "#f0b429", fontWeight: 800 }}>
                {!s.available ? "✕ Booked" : "PKR " + s.price.toLocaleString()}
              </div>
            </button>
          );
        })}
      </div>
      {/* Purpose */}
      <label style={labelStyle}>Purpose</label>
      <select value={purpose} onChange={(e) => setPurpose(e.target.value)} style={inputStyle}>
        <option>Practice Match</option>
        <option>Friendly Match</option>
        <option>Tournament Match</option>
        <option>Net Practice</option>
        <option>Academy Training</option>
        <option>Other</option>
      </select>
      {/* Team */}
      <label style={labelStyle}>Team Name</label>
      <input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="e.g. DAWN Cricket Club" style={inputStyle} />
      {/* Captain */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
        <div>
          <label style={labelStyle}>Captain Name</label>
          <input value={captainName} onChange={(e) => setCaptainName(e.target.value)} placeholder="Muhammad Ahsan" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Mobile</label>
          <input value={captainMobile} onChange={(e) => setCaptainMobile(e.target.value)} placeholder="0300-1234567" style={inputStyle} />
        </div>
      </div>
      {/* Notes */}
      <label style={labelStyle}>Notes (optional)</label>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special requirements..." style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} />
      {/* Total */}
      <div style={{ marginTop: "1.25rem", padding: "1rem 1.25rem", background: "rgba(240,180,41,.08)", border: "1px solid rgba(240,180,41,.3)", borderRadius: ".7rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: ".85rem", color: "rgba(238,244,251,.85)" }}>Total Payable</span>
        <strong style={{ fontSize: "1.4rem", color: "#f0b429" }}>PKR {hourlyRate.toLocaleString()}</strong>
      </div>
      {err && (
        <div style={{ marginTop: "1rem", padding: ".7rem 1rem", background: "rgba(255,80,80,.12)", border: "1px solid rgba(255,80,80,.4)", borderRadius: ".55rem", color: "#ff8b8b", fontSize: ".85rem" }}>
          {err}
        </div>
      )}
      <div style={{ marginTop: "1.5rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
        <Link href={`/match-central/grounds/${groundId}`} className="btn btn-outline">← Back to Ground</Link>
        <button type="submit" disabled={busy} className="btn btn-gold" style={{ opacity: busy ? .7 : 1 }}>
          {busy ? "Booking..." : "Confirm Booking →"}
        </button>
      </div>
    </form>
  );
}
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: ".8rem",
  fontWeight: 700,
  color: "rgba(238,244,251,.85)",
  marginBottom: ".35rem",
  marginTop: "1rem",
};
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: ".7rem .9rem",
  background: "#0a1f3d",
  border: "1px solid rgba(255,255,255,.15)",
  borderRadius: ".6rem",
  color: "#eef4fb",
  fontSize: ".9rem",
  fontFamily: "inherit",
  outline: "none",
  colorScheme: "dark",
};
function KV({ k, v, mono, highlight }: { k: string; v: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: ".65rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase", letterSpacing: ".04em" }}>{k}</div>
      <div style={{ fontSize: ".85rem", color: highlight ? "#f0b429" : "#fff", fontWeight: highlight ? 800 : 600, fontFamily: mono ? "monospace" : "inherit", marginTop: ".15rem", wordBreak: "break-word" }}>{v}</div>
    </div>
  );
}