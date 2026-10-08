"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
type LiveScore = {
  id: string;
  matchNumber: string;
  tournamentName: string;
  teamA: string;
  teamAShort: string;
  teamB: string;
  teamBShort: string;
  teamAScore: string | null;
  teamAOvers: string | null;
  teamBScore: string | null;
  teamBOvers: string | null;
  status: string;
  venue: string;
  city: string;
  format: string;
  result: string | null;
  battingTeamId?: string | null;
};
export default function LiveScoresClient() {
  const [scores, setScores] = useState<LiveScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  async function load() {
    try {
      const res = await fetch("/api/v1/live-scores", { cache: "no-store" });
      const j = await res.json();
      if (j.ok) {
        setScores(j.items);
        setLastUpdate(new Date());
      }
    } catch {}
    setLoading(false);
  }
  useEffect(() => {
    load();
    if (!autoRefresh) return;
    const t = setInterval(load, 10000);
    return () => clearInterval(t);
  }, [autoRefresh]);
  if (loading) {
    return <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>Loading scores…</div>;
  }
  if (scores.length === 0) {
    return (
      <div style={{ padding: "3rem 1.5rem", textAlign: "center", background: "rgba(255,255,255,.03)", border: "1px dashed rgba(255,255,255,.12)", borderRadius: ".9rem", color: "rgba(238,244,251,.6)" }}>
        <div style={{ fontSize: "3rem", marginBottom: ".75rem", opacity: .5 }}>🏏</div>
        <div style={{ fontWeight: 800, color: "#fff", marginBottom: ".5rem" }}>No live matches right now</div>
        <p style={{ maxWidth: 480, margin: "0 auto 1.5rem", fontSize: ".85rem", lineHeight: 1.6 }}>
          Check the fixtures page for upcoming matches, or view recent results.
        </p>
        <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/fixtures" className="btn btn-gold">View Fixtures</Link>
          <Link href="/results" className="btn btn-outline">Recent Results</Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: ".5rem" }}>
        <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.55)" }}>
          {lastUpdate && `Last update: ${lastUpdate.toLocaleTimeString()}`}
          {scores.length > 0 && ` · ${scores.length} live`}
        </div>
        <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
          <label style={{ display: "flex", gap: ".35rem", alignItems: "center", fontSize: ".78rem", color: "rgba(238,244,251,.75)", cursor: "pointer" }}>
            <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} style={{ accentColor: "#f0b429" }} />
            Auto-refresh
          </label>
          <button className="btn btn-outline" onClick={load} style={{ padding: ".4rem .8rem", fontSize: ".78rem" }}>↻ Refresh</button>
        </div>
      </div>
      <div style={{ display: "grid", gap: "1rem" }}>
        {scores.map((s) => (
          <Link key={s.id} href={`/match-central/matches/${s.id}/scorecard`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
            <div style={{
              padding: "1.25rem",
              background: "linear-gradient(135deg, rgba(220,38,38,.08), rgba(240,180,41,.05))",
              border: "1px solid rgba(240,180,41,.4)",
              borderRadius: ".9rem",
              animation: "liveGlow 3s ease-in-out infinite",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: ".4rem", alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: ".3rem", padding: ".25rem .6rem", background: "rgba(220,38,38,.2)", border: "1px solid rgba(220,38,38,.5)", color: "#fca5a5", fontSize: ".65rem", fontWeight: 800, letterSpacing: ".06em", borderRadius: ".35rem" }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: "#dc2626", animation: "livePulse 1.6s ease-in-out infinite" }} />
                    LIVE NOW
                  </span>
                  <span style={{ fontSize: ".68rem", color: "#f0b429", fontWeight: 700, textTransform: "uppercase" }}>{s.tournamentName}</span>
                </div>
                <span style={{ fontFamily: "monospace", fontSize: ".72rem", color: "rgba(238,244,251,.5)" }}>{s.matchNumber}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1rem", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: ".85rem", fontWeight: 800, color: "#fff", marginBottom: ".25rem" }}>{s.teamAShort}</div>
                  <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.teamAScore || "—"}</div>
                  {s.teamAOvers && <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)", marginTop: ".25rem" }}>({s.teamAOvers} Ov)</div>}
                </div>
                <div style={{ padding: ".4rem .8rem", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 999, fontSize: ".75rem", color: "rgba(238,244,251,.6)", fontWeight: 800 }}>VS</div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: ".85rem", fontWeight: 800, color: "#fff", marginBottom: ".25rem" }}>{s.teamBShort}</div>
                  <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.teamBScore || "—"}</div>
                  {s.teamBOvers && <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)", marginTop: ".25rem" }}>({s.teamBOvers} Ov)</div>}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", paddingTop: ".75rem", borderTop: "1px solid rgba(255,255,255,.08)", fontSize: ".72rem", color: "rgba(238,244,251,.6)", flexWrap: "wrap", gap: ".5rem" }}>
                <span>📍 {s.venue}</span>
                <span style={{ color: "#f0b429", fontWeight: 700 }}>View Scorecard →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}