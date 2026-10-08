"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { CricketMatch, BallRecord } from "@/lib/cricket/types";
import { oversDisplay, runRate } from "@/lib/cricket/types";
import ScorecardPanel from "./ScorecardPanel";
export default function ScoreboardView({ matchId }: { matchId: string }) {
  const [match, setMatch] = useState<CricketMatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/v1/matches/${matchId}`, { cache: "no-store" });
      const j = await res.json();
      if (j.ok) setMatch(j.match);
    } catch {}
    setLoading(false);
  }, [matchId]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    if (!autoRefresh) return;
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, [autoRefresh, load]);
  if (loading) {
    return (
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "3rem 1rem", textAlign: "center" }}>
        Loading scoreboard…
      </main>
    );
  }
  if (!match) {
    return (
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "3rem 1rem", textAlign: "center" }}>
        <p style={{ color: "#ff8b8b" }}>Match not found</p>
        <Link href="/" className="btn btn-gold">← Home</Link>
      </main>
    );
  }
  return (
    <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", paddingBottom: "3rem" }}>
      <div className="container" style={{ paddingTop: "1.5rem", paddingBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginBottom: ".35rem" }}>
              <span style={{
                padding: ".22rem .6rem", borderRadius: ".35rem",
                background: match.status === "LIVE" ? "rgba(20,164,77,.18)" : "rgba(240,180,41,.18)",
                color: match.status === "LIVE" ? "#86efac" : "#f0b429",
                fontSize: ".68rem", fontWeight: 800, letterSpacing: ".06em",
                border: `1px solid ${match.status === "LIVE" ? "#14a44d" : "#f0b429"}66`,
              }}>
                {match.status === "LIVE" && <span style={{ marginRight: 4, display: "inline-block", width: 6, height: 6, background: "#14a44d", borderRadius: 999 }} />}
                {match.status.replace(/_/g, " ")}
              </span>
              <span style={{ fontFamily: "monospace", color: "#f0b429", fontSize: ".78rem" }}>{match.matchNumber}</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(1.2rem, 3vw, 1.7rem)", fontWeight: 900 }}>
              {match.teamA.name} vs {match.teamB.name}
            </h1>
            <div style={{ fontSize: ".82rem", color: "rgba(238,244,251,.6)", marginTop: ".2rem" }}>{match.venue} · {match.matchDate}</div>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: ".5rem", fontSize: ".82rem", color: "rgba(238,244,251,.7)" }}>
            <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} style={{ accentColor: "#f0b429" }} />
            Auto-refresh (5s)
          </label>
        </div>
      </div>
      {match.result && (
        <div className="container" style={{ marginBottom: "1rem" }}>
          <div style={{ padding: "1rem", background: "rgba(240,180,41,.12)", border: "1px solid rgba(240,180,41,.4)", borderRadius: ".7rem", color: "#f0b429", fontSize: "1rem", fontWeight: 800, textAlign: "center" }}>
            🏆 {match.result}
          </div>
        </div>
      )}
      {/* Both innings summary */}
      {match.innings.map((inn, idx) => {
        const team = match.teamA.id === inn.battingTeamId ? match.teamA : match.teamB;
        const isCurrent = idx === match.currentInnings;
        return (
          <div key={idx} className="container" style={{ marginBottom: "1rem" }}>
            <div style={{
              padding: "1.1rem 1.25rem",
              background: isCurrent ? "linear-gradient(135deg, rgba(240,180,41,.12), rgba(20,164,77,.06))" : "rgba(255,255,255,.03)",
              border: isCurrent ? "1px solid rgba(240,180,41,.4)" : "1px solid rgba(255,255,255,.08)",
              borderRadius: ".8rem",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: ".72rem", color: "#f0b429", fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: ".25rem" }}>
                    {team.name} {isCurrent && "· Batting"}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: ".5rem" }}>
                    <span style={{ fontSize: "2rem", fontWeight: 900, lineHeight: 1 }}>{inn.runs}</span>
                    <span style={{ fontSize: "1.15rem", color: "rgba(238,244,251,.7)" }}>/ {inn.wickets}</span>
                    <span style={{ fontSize: ".88rem", color: "rgba(238,244,251,.6)", marginLeft: ".4rem" }}>
                      ({oversDisplay(inn.balls)} ov)
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.6)", textAlign: "right" }}>
                  <div>CRR: <b style={{ color: "#fff" }}>{runRate(inn.runs, inn.balls)}</b></div>
                  <div>Extras: {inn.extras.wides + inn.extras.noBalls + inn.extras.byes + inn.extras.legByes}</div>
                </div>
              </div>
              {inn.balls > 0 && (
                <div style={{ marginTop: ".75rem", display: "flex", gap: ".35rem", flexWrap: "wrap" }}>
                  {match.balls.filter((b) => b.inningsIndex === idx).slice(-6).map((b: BallRecord) => (
                    <span key={b.id} style={{
                      width: 30, height: 30, borderRadius: 999,
                      background: b.isWicket ? "#b01e1e" : b.extraType ? "#f0b429" : b.runs >= 4 ? "#14a44d" : "rgba(255,255,255,.08)",
                      color: "#fff",
                      display: "grid", placeItems: "center",
                      fontSize: ".72rem", fontWeight: 800,
                    }}>
                      {b.isWicket ? "W" : b.extraType === "WIDE" ? "Wd" : b.extraType === "NO_BALL" ? "Nb" : b.extraType === "BYE" ? "B" : b.extraType === "LEG_BYE" ? "Lb" : b.runs}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
      {/* Full scorecard */}
      <div className="container">
        <ScorecardPanel match={match} />
      </div>
      {/* This over */}
      <div className="container" style={{ marginBottom: "1rem" }}>
        <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)", textAlign: "center" }}>
          Live scoreboard updates every 5 seconds · Last updated {new Date(match.updatedAt).toLocaleTimeString()}
        </div>
      </div>
    </main>
  );
}