"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
type Me = { id: string; email: string; name: string; role: string };
export default function PlayerDashboard() {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/v1/auth/me");
      const j = await res.json();
      if (!j.ok) { router.push("/login"); return; }
      setMe(j.user);
      setLoading(false);
    })();
  }, [router]);
  async function logout() {
    await fetch("/api/v1/auth/logout", { method: "POST" });
    router.push("/");
  }
  if (loading) {
    return (
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "3rem 1rem", textAlign: "center" }}>
        Loading…
      </main>
    );
  }
  if (!me) return null;
  return (
    <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}>My Account</h1>
            <p style={{ margin: ".35rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
              {me.name} · {me.email} · <span style={{ color: "#f0b429", fontWeight: 700 }}>{me.role}</span>
            </p>
          </div>
          <button onClick={logout} className="btn btn-outline">Logout</button>
        </div>
        <div style={{
          padding: "1.5rem",
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: ".9rem",
        }}>
          <h2 style={{ margin: "0 0 1rem", fontSize: "1.05rem", fontWeight: 800 }}>Quick actions</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: ".6rem" }}>
            <Link href="/player/registrations" className="btn btn-gold" style={{ justifyContent: "center" }}>My Registrations</Link>
            <Link href="/register" className="btn btn-outline" style={{ justifyContent: "center" }}>New Registration</Link>
            <Link href="/register?status=check" className="btn btn-outline" style={{ justifyContent: "center" }}>Check Status</Link>
            <Link href="/verify" className="btn btn-outline" style={{ justifyContent: "center" }}>Verify Player</Link>
            <Link href="/news/live" className="btn btn-outline" style={{ justifyContent: "center" }}>Cricket News</Link>
          </div>
          {me.role !== "PLAYER" && (
            <>
              <h2 style={{ margin: "1.75rem 0 1rem", fontSize: "1.05rem", fontWeight: 800 }}>Admin tools</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: ".6rem" }}>
                <Link href="/admin" className="btn btn-primary" style={{ justifyContent: "center" }}>Dashboard</Link>
                <Link href="/admin/matches" className="btn btn-primary" style={{ justifyContent: "center" }}>Matches</Link>
                <Link href="/scorer" className="btn btn-primary" style={{ justifyContent: "center" }}>Scorer</Link>
              </div>
            </>
          )}
        </div>
        <div style={{
          marginTop: "1rem",
          padding: "1rem 1.25rem",
          background: "rgba(240,180,41,.08)",
          border: "1px solid rgba(240,180,41,.3)",
          borderRadius: ".7rem",
          fontSize: ".82rem",
          color: "rgba(238,244,251,.85)",
          lineHeight: 1.55,
        }}>
          <b style={{ color: "#f0b429" }}>Developer note:</b> Auth uses in-memory storage for the demo.
          For production, connect a database (Neon PostgreSQL recommended) and enable password reset via email.
        </div>
      </div>
    </main>
  );
}