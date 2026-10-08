"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
type Ticket = {
  id: string;
  ticketNumber: string;
  matchName: string;
  matchDate: string;
  venue: string;
  category: string;
  quantity: number;
  totalPrice: number;
  buyerName: string;
  status: string;
  createdAt: string;
};
export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/v1/tickets", { cache: "no-store" });
        const j = await res.json();
        if (j.ok) setTickets(j.items);
      } catch {}
      setLoading(false);
    })();
  }, []);
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>My Tickets</span>
          </nav>
          <header style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900 }}>🎟️ My Tickets</h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
              {tickets.length} ticket{tickets.length === 1 ? "" : "s"} booked
            </p>
          </header>
          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>Loading…</div>
          ) : tickets.length === 0 ? (
            <div style={{ padding: "3rem 1.5rem", textAlign: "center", background: "rgba(255,255,255,.03)", border: "1px dashed rgba(255,255,255,.12)", borderRadius: ".9rem", color: "rgba(238,244,251,.6)" }}>
              <div style={{ fontSize: "3rem", marginBottom: ".75rem", opacity: .5 }}>🎟️</div>
              <div style={{ fontWeight: 800, color: "#fff", marginBottom: ".5rem" }}>No tickets yet</div>
              <p style={{ maxWidth: 480, margin: "0 auto 1.5rem", fontSize: ".85rem", lineHeight: 1.6 }}>
                Book a ticket from any match page to see it here.
              </p>
              <Link href="/fixtures" className="btn btn-gold">View Fixtures</Link>
            </div>
          ) : (
            <div style={{ display: "grid", gap: ".85rem" }}>
              {tickets.map((t) => (
                <div key={t.id} style={{ padding: "1.15rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(240,180,41,.3)", borderRadius: ".85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap", marginBottom: ".75rem" }}>
                    <div>
                      <div style={{ fontFamily: "monospace", fontSize: ".72rem", color: "#f0b429", fontWeight: 800, marginBottom: ".25rem" }}>{t.ticketNumber}</div>
                      <div style={{ fontSize: ".95rem", fontWeight: 800, color: "#fff" }}>{t.matchName}</div>
                      <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)", marginTop: ".2rem" }}>
                        {new Date(t.matchDate).toLocaleDateString()} · {t.venue}
                      </div>
                    </div>
                    <span style={{ padding: ".25rem .6rem", background: "rgba(240,180,41,.15)", color: "#f0b429", borderRadius: ".35rem", fontSize: ".65rem", fontWeight: 800 }}>{t.status}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: ".5rem" }}>
                    <div style={{ padding: ".5rem .65rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem" }}>
                      <div style={{ fontSize: ".6rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase" }}>Category</div>
                      <div style={{ fontSize: ".85rem", color: "#fff", fontWeight: 700 }}>{t.category}</div>
                    </div>
                    <div style={{ padding: ".5rem .65rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem" }}>
                      <div style={{ fontSize: ".6rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase" }}>Qty</div>
                      <div style={{ fontSize: ".85rem", color: "#fff", fontWeight: 700 }}>{t.quantity}</div>
                    </div>
                    <div style={{ padding: ".5rem .65rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem" }}>
                      <div style={{ fontSize: ".6rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase" }}>Total</div>
                      <div style={{ fontSize: ".85rem", color: "#f0b429", fontWeight: 800 }}>PKR {t.totalPrice.toLocaleString()}</div>
                    </div>
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