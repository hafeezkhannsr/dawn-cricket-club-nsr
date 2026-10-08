"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
type Summary = {
  id: string;
  registrationNumber: string;
  program: string;
  registrationType: string;
  status: string;
  paymentStatus: string;
  feeAmount: number;
  currency: string;
  createdAt: string;
  fullNameEn: string;
  playingRole: string;
  ageCategory: string;
};
export default function MyRegistrations() {
  const [items, setItems] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [lookedUp, setLookedUp] = useState(false);
  // Auto-load if user is logged in and we can match by email
  useEffect(() => {
    (async () => {
      try {
        const me = await fetch("/api/v1/auth/me").then((r) => r.json());
        if (me.ok && me.user?.email) {
          setQ(me.user.email);
          await lookup(me.user.email);
        }
      } catch {}
    })();
  }, []);
  const lookup = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const isEmail = query.includes("@");
      const isMobile = /^\+?\d{10,13}$/.test(query.replace(/\D+/g, ""));
      const url = isEmail
        ? `/api/v1/my-registrations?email=${encodeURIComponent(query)}`
        : isMobile
        ? `/api/v1/my-registrations?mobile=${encodeURIComponent(query)}`
        : `/api/v1/my-registrations?q=${encodeURIComponent(query)}`;
      const res = await fetch(url, { cache: "no-store" });
      const j = await res.json();
      if (j.ok) setItems(j.items);
      else setItems([]);
    } catch {}
    setLoading(false);
    setLookedUp(true);
  }, []);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    lookup(q);
  }
  const inputStyle: React.CSSProperties = {
    flex: 1, minWidth: 200,
    padding: ".75rem .9rem",
    background: "#0a1f3d",
    border: "1px solid rgba(255,255,255,.15)",
    borderRadius: ".6rem",
    color: "#eef4fb",
    fontSize: ".92rem",
    fontFamily: "inherit",
    outline: "none",
  };
  const statusColor = (s: string) =>
    s === "APPROVED" ? "#86efac"
    : s === "REJECTED" ? "#ff8b8b"
    : s === "NEEDS_CORRECTION" ? "#fdba74"
    : s === "UNDER_REVIEW" ? "#93c5fd"
    : "#f0b429";
  return (
    <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <header style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 900 }}>
            My Registrations
          </h1>
          <p style={{ margin: ".4rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
            View, edit or delete your registrations. Deleting removes the record from the database
            and (if connected) from Google Sheets too.
          </p>
        </header>
        <form onSubmit={submit} style={{
          padding: "1.25rem",
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: ".9rem",
          marginBottom: "1.25rem",
        }}>
          <label style={{ display: "block", fontSize: ".85rem", color: "rgba(238,244,251,.85)", marginBottom: ".5rem", fontWeight: 600 }}>
            Look up by mobile, email or registration number
          </label>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <input style={inputStyle} value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="0300-1234567 or player@example.com or DAWN-2026-1234" />
            <button type="submit" disabled={loading} className="btn btn-gold" style={{ opacity: loading ? .7 : 1 }}>
              {loading ? "…" : "Look up"}
            </button>
          </div>
        </form>
        {loading && <div style={{ padding: "2rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>Searching…</div>}
        {!loading && lookedUp && items.length === 0 && (
          <div style={{
            padding: "2.5rem 1.5rem", textAlign: "center",
            background: "rgba(255,255,255,.02)",
            border: "1px dashed rgba(255,255,255,.12)",
            borderRadius: ".9rem",
            color: "rgba(238,244,251,.6)",
          }}>
            No registrations found. Try a different mobile, email or registration number.
          </div>
        )}
        {!loading && items.length > 0 && (
          <div style={{ display: "grid", gap: ".75rem" }}>
            {items.map((r) => (
              <div key={r.id} style={{
                padding: "1rem 1.25rem",
                background: "rgba(255,255,255,.03)",
                border: `1px solid ${statusColor(r.status)}44`,
                borderRadius: ".75rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                gap: "1rem", flexWrap: "wrap",
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginBottom: ".35rem", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "monospace", color: "#f0b429", fontSize: ".82rem", fontWeight: 700 }}>
                      {r.registrationNumber}
                    </span>
                    <span style={{
                      fontSize: ".68rem", fontWeight: 800, letterSpacing: ".05em",
                      padding: ".2rem .55rem", borderRadius: ".35rem",
                      background: statusColor(r.status) + "22",
                      color: statusColor(r.status),
                      border: `1px solid ${statusColor(r.status)}66`,
                    }}>{r.status.replace(/_/g, " ")}</span>
                  </div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>{r.fullNameEn}</div>
                  <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.6)", marginTop: ".15rem" }}>
                    {r.program} · {r.registrationType} · {r.playingRole || "—"} · PKR {r.feeAmount}
                  </div>
                </div>
                <Link href={`/player/registrations/${r.id}`} className="btn btn-gold" style={{ padding: ".5rem .9rem", fontSize: ".8rem" }}>
                  Manage →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}