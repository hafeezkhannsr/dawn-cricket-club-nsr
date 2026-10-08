"use client";
import { useState } from "react";
import Link from "next/link";
type Ticket = {
  id: string;
  ticketNumber: string;
  matchName: string;
  matchDate: string;
  venue: string;
  category: string;
  quantity: number;
  pricePerTicket: number;
  totalPrice: number;
  buyerName: string;
  buyerMobile: string;
  status: string;
};
const CATEGORIES = [
  { key: "GENERAL", label: "General", price: 200, desc: "Standard seating" },
  { key: "VIP", label: "VIP", price: 500, desc: "Premium view, closer to pitch" },
  { key: "PREMIUM", label: "Premium", price: 1000, desc: "Best seats, refreshments included" },
];
export default function TicketForm({
  matchId, matchName, matchDate, venue,
}: { matchId: string; matchName: string; matchDate: string; venue: string }) {
  const [category, setCategory] = useState("GENERAL");
  const [quantity, setQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState("");
  const [buyerMobile, setBuyerMobile] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState<Ticket | null>(null);
  const price = CATEGORIES.find((c) => c.key === category)?.price || 0;
  const total = price * quantity;
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setBusy(true);
    try {
      const res = await fetch("/api/v1/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId, matchName, matchDate, venue,
          category, quantity,
          buyerName: buyerName.trim(),
          buyerMobile: buyerMobile.trim(),
          buyerEmail: buyerEmail.trim(),
        }),
      });
      const j = await res.json();
      if (!j.ok) { setErr(j.error || "Failed"); setBusy(false); return; }
      setDone(j.ticket);
    } catch (e2) { setErr(e2 instanceof Error ? e2.message : "Network error"); }
    setBusy(false);
  }
  if (done) {
    return (
      <div style={{ padding: "1.5rem", background: "rgba(20,164,77,.08)", border: "1px solid rgba(20,164,77,.4)", borderRadius: "1rem", textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: ".5rem" }}>🎉</div>
        <h2 style={{ margin: "0 0 .35rem", fontSize: "1.25rem", fontWeight: 900 }}>Ticket Booked!</h2>
        <p style={{ color: "rgba(238,244,251,.7)", fontSize: ".85rem", marginBottom: "1.25rem" }}>
          Booking confirmed. Show the QR code at the gate.
        </p>
        <div style={{ padding: "1.25rem", background: "rgba(255,255,255,.03)", border: "1px dashed rgba(240,180,41,.4)", borderRadius: ".75rem", textAlign: "left", marginBottom: "1.25rem" }}>
          <div style={{ fontFamily: "monospace", color: "#f0b429", fontSize: ".85rem", fontWeight: 800, marginBottom: ".75rem", textAlign: "center", letterSpacing: ".05em" }}>
            {done.ticketNumber}
          </div>
          <KV k="Match" v={done.matchName} />
          <KV k="Date" v={new Date(done.matchDate).toLocaleDateString()} />
          <KV k="Venue" v={done.venue} />
          <KV k="Category" v={done.category} />
          <KV k="Quantity" v={done.quantity.toString()} />
          <KV k="Total" v={"PKR " + done.totalPrice.toLocaleString()} highlight />
          <KV k="Name" v={done.buyerName} />
          <KV k="Mobile" v={done.buyerMobile} />
        </div>
        <div style={{ padding: "1rem", background: "#fff", borderRadius: ".7rem", display: "grid", placeItems: "center", marginBottom: "1.25rem" }}>
          <img
            src={"/api/v1/qr?data=" + encodeURIComponent(done.ticketNumber) + "&size=180"}
            alt="Ticket QR"
            width={180}
            height={180}
          />
        </div>
        <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/my-tickets" className="btn btn-gold">My Tickets</Link>
          <button onClick={() => { setDone(null); setBuyerName(""); setBuyerMobile(""); setBuyerEmail(""); setQuantity(1); }} className="btn btn-outline">Book Another</button>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={submit} style={{ padding: "1.5rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "1rem" }}>
      <h2 style={{ margin: "0 0 1rem", fontSize: "1.1rem", fontWeight: 900 }}>🎟️ Select Ticket Type</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: ".6rem", marginBottom: "1.25rem" }}>
        {CATEGORIES.map((c) => {
          const active = category === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setCategory(c.key)}
              style={{
                padding: "1rem",
                background: active ? "rgba(240,180,41,.15)" : "rgba(255,255,255,.03)",
                border: active ? "1.5px solid #f0b429" : "1px solid rgba(255,255,255,.1)",
                borderRadius: ".7rem",
                color: "#eef4fb",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{ fontSize: ".9rem", fontWeight: 800, color: active ? "#f0b429" : "#fff" }}>{c.label}</div>
              <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)", marginTop: ".15rem" }}>{c.desc}</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 900, color: active ? "#f0b429" : "#fff", marginTop: ".5rem" }}>PKR {c.price}</div>
            </button>
          );
        })}
      </div>
      <label style={labelStyle}>Quantity (1-10)</label>
      <input
        type="number" min={1} max={10}
        value={quantity}
        onChange={(e) => setQuantity(Math.min(10, Math.max(1, Number(e.target.value) || 1)))}
        style={inputStyle}
      />
      <label style={labelStyle}>Full Name *</label>
      <input value={buyerName} onChange={(e) => setBuyerName(e.target.value)} placeholder="Muhammad Ahsan" style={inputStyle} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
        <div>
          <label style={labelStyle}>Mobile *</label>
          <input value={buyerMobile} onChange={(e) => setBuyerMobile(e.target.value)} placeholder="0300-1234567" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Email (optional)</label>
          <input type="email" value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
        </div>
      </div>
      <div style={{ marginTop: "1.25rem", padding: "1rem 1.25rem", background: "rgba(240,180,41,.08)", border: "1px solid rgba(240,180,41,.3)", borderRadius: ".7rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: ".85rem", color: "rgba(238,244,251,.85)" }}>Total</span>
        <strong style={{ fontSize: "1.5rem", color: "#f0b429" }}>PKR {total.toLocaleString()}</strong>
      </div>
      {err && <div style={{ marginTop: "1rem", padding: ".7rem 1rem", background: "rgba(255,80,80,.12)", border: "1px solid rgba(255,80,80,.4)", borderRadius: ".55rem", color: "#ff8b8b", fontSize: ".85rem" }}>{err}</div>}
      <div style={{ marginTop: "1.25rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
        <Link href={"/match-central/matches/" + matchId + "/scorecard"} className="btn btn-outline">← Back</Link>
        <button type="submit" disabled={busy} className="btn btn-gold" style={{ opacity: busy ? .7 : 1 }}>{busy ? "Booking..." : "Book Tickets →"}</button>
      </div>
    </form>
  );
}
function KV({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", padding: ".35rem 0", borderBottom: "1px solid rgba(255,255,255,.05)", fontSize: ".82rem" }}>
      <span style={{ color: "rgba(238,244,251,.55)" }}>{k}</span>
      <span style={{ color: highlight ? "#f0b429" : "#fff", fontWeight: 700, textAlign: "right", wordBreak: "break-word" }}>{v}</span>
    </div>
  );
}
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: ".8rem", fontWeight: 700,
  color: "rgba(238,244,251,.85)", marginBottom: ".35rem", marginTop: "1rem",
};
const inputStyle: React.CSSProperties = {
  width: "100%", padding: ".75rem .9rem",
  background: "#0a1f3d", border: "1px solid rgba(255,255,255,.15)",
  borderRadius: ".6rem", color: "#eef4fb", fontSize: ".9rem",
  fontFamily: "inherit", outline: "none", colorScheme: "dark",
};