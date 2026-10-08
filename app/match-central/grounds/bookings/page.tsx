"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  status: string;
  createdAt: string;
};
export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("dawn.ground.bookings");
      const parsed = raw ? JSON.parse(raw) : [];
      setBookings(Array.isArray(parsed) ? parsed : []);
    } catch {}
    setLoading(false);
  }, []);
  function remove(id: string) {
    if (!confirm("Cancel this booking?")) return;
    const filtered = bookings.filter((b) => b.id !== id);
    setBookings(filtered);
    try {
      window.localStorage.setItem("dawn.ground.bookings", JSON.stringify(filtered));
    } catch {}
  }
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <Link href="/match-central/grounds" style={{ color: "inherit" }}>Grounds</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>My Bookings</span>
          </nav>
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>📋 My Bookings</h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              {bookings.length} booking{bookings.length !== 1 ? "s" : ""} on this device
            </p>
          </header>
          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>Loading…</div>
          ) : bookings.length === 0 ? (
            <div style={{ padding: "3rem 1.5rem", textAlign: "center", background: "rgba(255,255,255,.03)", border: "1px dashed rgba(255,255,255,.12)", borderRadius: ".9rem", color: "rgba(238,244,251,.6)" }}>
              <div style={{ fontSize: "3rem", marginBottom: ".75rem", opacity: .5 }}>📅</div>
              <div style={{ fontWeight: 700, color: "#fff", marginBottom: ".5rem" }}>No bookings yet</div>
              <p style={{ fontSize: ".85rem", maxWidth: 480, margin: "0 auto 1.5rem", lineHeight: 1.6 }}>
                Book a ground and your reservations will appear here.
              </p>
              <Link href="/match-central/grounds" className="btn btn-gold">Browse Grounds</Link>
            </div>
          ) : (
            <div style={{ display: "grid", gap: ".85rem" }}>
              {bookings.map((b) => (
                <div key={b.id} style={{ padding: "1.25rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(240,180,41,.3)", borderRadius: ".85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: "monospace", fontSize: ".72rem", color: "#f0b429", fontWeight: 700, marginBottom: ".3rem" }}>{b.id}</div>
                      <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff" }}>{b.groundName}</div>
                      <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.6)", marginTop: ".15rem" }}>
                        {new Date(b.date).toLocaleDateString()} · {b.start} - {b.end}
                      </div>
                    </div>
                    <span style={{ padding: ".3rem .7rem", background: "rgba(240,180,41,.15)", color: "#f0b429", borderRadius: ".4rem", fontSize: ".65rem", fontWeight: 800 }}>
                      {b.status}
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: ".6rem", fontSize: ".78rem", marginBottom: "1rem" }}>
                    <Info k="Purpose" v={b.purpose} />
                    <Info k="Team" v={b.teamName} />
                    <Info k="Captain" v={b.captainName} />
                    <Info k="Mobile" v={b.captainMobile} />
                    <Info k="Total" v={"PKR " + b.price.toLocaleString()} highlight />
                  </div>
                  <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", paddingTop: ".75rem", borderTop: "1px solid rgba(255,255,255,.06)" }}>
                    <Link href={`/match-central/grounds/${b.groundId}`} className="btn btn-outline" style={{ padding: ".4rem .8rem", fontSize: ".75rem" }}>View Ground</Link>
                    <button onClick={() => remove(b.id)} style={{ padding: ".4rem .8rem", fontSize: ".75rem", background: "rgba(220,38,38,.15)", border: "1px solid rgba(220,38,38,.5)", color: "#fca5a5", borderRadius: ".5rem", fontWeight: 700, cursor: "pointer" }}>
                      Cancel Booking
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
function Info({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div style={{ padding: ".55rem .7rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem" }}>
      <div style={{ fontSize: ".6rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase", letterSpacing: ".04em" }}>{k}</div>
      <div style={{ fontSize: ".82rem", color: highlight ? "#f0b429" : "#fff", fontWeight: 700, marginTop: ".15rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v}</div>
    </div>
  );
}