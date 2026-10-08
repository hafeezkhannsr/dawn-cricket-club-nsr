"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PLAYERS, type PlayerCareer } from "@/lib/data/mock-players";
type Registration = {
  id: string;
  registrationNumber: string;
  status: string;
  program: string;
  createdAt: string;
};
export default function PlayerDashboardClient() {
  const [me, setMe] = useState<{ name: string; email: string; role: string } | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [playerProfile, setPlayerProfile] = useState<PlayerCareer | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/v1/auth/me");
        const j = await res.json();
        if (j.ok) {
          setMe(j.user);
          // Try to find registrations by email
          const regRes = await fetch("/api/v1/my-registrations?email=" + encodeURIComponent(j.user.email));
          const regJ = await regRes.json();
          if (regJ.ok) setRegistrations(regJ.items);
          // Try to find player profile
          const p = PLAYERS.find((x) => x.name.toLowerCase().includes(j.user.name.toLowerCase().split(" ")[0]));
          if (p) setPlayerProfile(p);
        }
      } catch {}
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>Loading dashboard…</div>;
  }
  if (!me) {
    return (
      <div style={{ padding: "2rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "1rem", textAlign: "center", maxWidth: 480, margin: "2rem auto" }}>
        <div style={{ fontSize: "3rem", marginBottom: ".5rem" }}>🔒</div>
        <h2 style={{ margin: "0 0 .5rem", fontSize: "1.25rem", fontWeight: 900 }}>Login required</h2>
        <p style={{ color: "rgba(238,244,251,.65)", fontSize: ".85rem", marginBottom: "1.5rem" }}>
          Please login to access your player dashboard.
        </p>
        <Link href="/login" className="btn btn-gold">Login →</Link>
      </div>
    );
  }
  return (
    <div>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900 }}>
          👋 Welcome, {me.name}
        </h1>
        <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
          {me.email} · <span style={{ color: "#f0b429", fontWeight: 700 }}>{me.role}</span>
        </p>
      </header>
      {/* Quick actions */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: ".65rem", marginBottom: "2rem" }}>
        <Link href="/register" className="btn btn-gold" style={{ justifyContent: "center" }}>📝 New Registration</Link>
        <Link href="/player/registrations" className="btn btn-outline" style={{ justifyContent: "center" }}>📋 My Registrations</Link>
        <Link href="/my-tickets" className="btn btn-outline" style={{ justifyContent: "center" }}>🎟️ My Tickets</Link>
        <Link href="/register/status-check" className="btn btn-outline" style={{ justifyContent: "center" }}>🔍 Check Status</Link>
      </div>
      {/* Career stats */}
      {playerProfile ? (
        <>
          <div style={{ padding: "1.25rem", background: "linear-gradient(135deg, rgba(240,180,41,.1), rgba(20,164,77,.05))", border: "1px solid rgba(240,180,41,.3)", borderRadius: ".9rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div style={{ display: "flex", gap: ".85rem", alignItems: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: 999, background: "linear-gradient(135deg, " + playerProfile.color + ", " + playerProfile.color + "aa)", display: "grid", placeItems: "center", fontSize: "2rem", flexShrink: 0 }}>{playerProfile.avatar}</div>
                <div>
                  <div style={{ fontSize: ".7rem", color: "#f0b429", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em" }}>Career Profile</div>
                  <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#fff", marginTop: ".15rem" }}>{playerProfile.name}</div>
                  <div style={{ fontSize: ".75rem", color: "rgba(238,244,251,.65)" }}>{playerProfile.team} · {playerProfile.role}</div>
                </div>
              </div>
              <Link href={"/match-central/players/" + playerProfile.id} className="btn btn-outline" style={{ fontSize: ".78rem" }}>View Public Profile →</Link>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: ".65rem", marginBottom: "1.5rem" }}>
            <StatCard label="Matches" value={playerProfile.stats.matches.toString()} color="#f0b429" />
            <StatCard label="Runs" value={playerProfile.stats.runs.toString()} color="#86efac" />
            <StatCard label="High Score" value={playerProfile.stats.highScore.toString()} color="#93c5fd" />
            <StatCard label="Wickets" value={playerProfile.stats.wickets.toString()} color="#c4b5fd" />
            <StatCard label="Catches" value={playerProfile.stats.catches.toString()} color="#fca5a5" />
            <StatCard label="Fifties" value={playerProfile.stats.fifties.toString()} color="#fdba74" />
          </div>
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", padding: "1.25rem", marginBottom: "1.5rem" }}>
            <h2 style={{ margin: "0 0 1rem", fontSize: "1.05rem", fontWeight: 900 }}>🏆 Achievements</h2>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
              {playerProfile.achievements.map((a, i) => (
                <li key={i} style={{ fontSize: ".85rem", color: "rgba(238,244,251,.85)", lineHeight: 1.9, display: "flex", gap: ".5rem" }}>
                  <span style={{ color: "#f0b429" }}>★</span><span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div style={{ padding: "2rem", background: "rgba(255,255,255,.03)", border: "1px dashed rgba(255,255,255,.15)", borderRadius: ".9rem", marginBottom: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: ".5rem", opacity: .5 }}>📊</div>
          <div style={{ fontWeight: 700, color: "#fff", marginBottom: ".5rem" }}>Career stats not yet available</div>
          <p style={{ color: "rgba(238,244,251,.6)", fontSize: ".85rem", maxWidth: 480, margin: "0 auto 1rem", lineHeight: 1.6 }}>
            Your career statistics will appear here after your first match. Register and get selected for a team to begin.
          </p>
          <Link href="/register" className="btn btn-gold">Register Now</Link>
        </div>
      )}
      {/* Registrations */}
      <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 900 }}>📋 My Registrations</h2>
          <Link href="/player/registrations" style={{ fontSize: ".78rem", color: "#f0b429", fontWeight: 700 }}>View all →</Link>
        </div>
        {registrations.length === 0 ? (
          <div style={{ padding: "1.5rem", textAlign: "center", color: "rgba(238,244,251,.55)", fontSize: ".85rem" }}>
            No registrations yet. <Link href="/register" style={{ color: "#f0b429" }}>Register now →</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gap: ".5rem" }}>
            {registrations.slice(0, 5).map((r) => (
              <Link key={r.id} href={"/player/registrations/" + r.id} style={{ display: "block", padding: ".75rem 1rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".6rem", textDecoration: "none", color: "inherit" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".5rem", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: ".75rem", color: "#f0b429", fontWeight: 700 }}>{r.registrationNumber}</div>
                    <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.65)", marginTop: ".15rem" }}>{r.program} · {new Date(r.createdAt).toLocaleDateString()}</div>
                  </div>
                  <span style={{ padding: ".22rem .55rem", background: "rgba(240,180,41,.15)", color: "#f0b429", borderRadius: ".35rem", fontSize: ".65rem", fontWeight: 800 }}>{r.status}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ padding: "1rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".75rem" }}>
      <div style={{ fontSize: ".65rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase", letterSpacing: ".05em", fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: "1.4rem", fontWeight: 900, color, marginTop: ".25rem" }}>{value}</div>
    </div>
  );
}