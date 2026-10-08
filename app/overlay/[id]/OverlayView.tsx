"use client";
import { useEffect, useState } from "react";
import type { CricketMatch } from "@/lib/cricket/types";
import { oversDisplay, runRate, requiredRunRate } from "@/lib/cricket/types";
export default function OverlayView({ matchId }: { matchId: string }) {
  const [match, setMatch] = useState<CricketMatch | null>(null);
  const [transparent, setTransparent] = useState(true);
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/v1/matches/${matchId}`, { cache: "no-store" });
        const j = await res.json();
        if (j.ok) setMatch(j.match);
      } catch {}
    }
    load();
    const t = setInterval(load, 3000);
    return () => clearInterval(t);
  }, [matchId]);
  if (!match) {
    return (
      <div style={{ minHeight: "100vh", background: transparent ? "transparent" : "#030a18", color: "#eef4fb", display: "grid", placeItems: "center", fontFamily: "system-ui" }}>
        Loading overlay…
      </div>
    );
  }
  const inn = match.innings[match.currentInnings];
  const battingTeam = match.teamA.id === inn.battingTeamId ? match.teamA : match.teamB;
  const striker = battingTeam.players.find((p) => p.id === inn.currentStrikerId);
  const nonStriker = battingTeam.players.find((p) => p.id === inn.currentNonStrikerId);
  const target = match.currentInnings === 1 ? match.innings[0].runs + 1 : null;
  const ballsRemaining = match.oversPerInnings * 6 - inn.balls;
  const recent = match.balls.filter((b) => b.inningsIndex === match.currentInnings).slice(-6);
  return (
    <div style={{
      minHeight: "100vh",
      background: transparent ? "transparent" : "#030a18",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      padding: "1.5rem",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <div style={{
        width: "100%", maxWidth: 1000,
        background: "linear-gradient(135deg, rgba(6,20,40,.96), rgba(10,31,61,.96))",
        border: "2px solid #f0b429",
        borderRadius: ".85rem",
        overflow: "hidden",
        boxShadow: "0 20px 60px -20px rgba(0,0,0,.9)",
      }}>
        {/* Top bar */}
        <div style={{
          background: "linear-gradient(90deg, #f0b429, #cb6e17)",
          color: "#061428",
          padding: ".55rem 1rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontWeight: 900,
          fontSize: ".85rem",
          letterSpacing: ".05em",
        }}>
          <div>DAWN CRICKET CLUB · {match.matchNumber}</div>
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <span style={{ width: 8, height: 8, background: match.status === "LIVE" ? "#b01e1e" : "#0f8a3e", borderRadius: 999, display: "inline-block" }} />
            {match.status.replace(/_/g, " ")}
          </div>
        </div>
        {/* Main */}
        <div style={{ padding: "1rem 1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: ".75rem", color: "#f0b429", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>
                {battingTeam.name}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: ".6rem", marginTop: ".2rem" }}>
                <span style={{ fontSize: "2.6rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{inn.runs}</span>
                <span style={{ fontSize: "1.4rem", color: "rgba(238,244,251,.7)" }}>/ {inn.wickets}</span>
                <span style={{ fontSize: "1rem", color: "rgba(238,244,251,.7)", marginLeft: ".4rem" }}>
                  ({oversDisplay(inn.balls)}/{match.oversPerInnings})
                </span>
              </div>
              {target !== null && (
                <div style={{ marginTop: ".5rem", fontSize: ".85rem", color: "#f0b429", fontWeight: 700 }}>
                  Need {Math.max(0, target - inn.runs)} off {ballsRemaining} balls · RRR {requiredRunRate(target, inn.runs, ballsRemaining)}
                </div>
              )}
              {target === null && (
                <div style={{ marginTop: ".5rem", fontSize: ".85rem", color: "rgba(238,244,251,.7)" }}>
                  CRR {runRate(inn.runs, inn.balls)}
                </div>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: ".7rem", color: "rgba(238,244,251,.5)", marginBottom: ".35rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>
                Batters
              </div>
              <div style={{ fontSize: ".9rem", color: striker ? "#fff" : "rgba(238,244,251,.4)", fontWeight: 700 }}>
                {striker?.name ?? "—"} <span style={{ color: "#f0b429" }}>*</span>
              </div>
              <div style={{ fontSize: ".85rem", color: nonStriker ? "rgba(238,244,251,.75)" : "rgba(238,244,251,.4)", marginTop: ".15rem" }}>
                {nonStriker?.name ?? "—"}
              </div>
            </div>
          </div>
          {/* This over strip */}
          <div style={{ marginTop: ".9rem", display: "flex", gap: ".35rem", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: ".7rem", color: "rgba(238,244,251,.5)", letterSpacing: ".08em", fontWeight: 700, textTransform: "uppercase", marginRight: ".35rem" }}>
              This over
            </span>
            {recent.length === 0 && <span style={{ fontSize: ".78rem", color: "rgba(238,244,251,.4)" }}>—</span>}
            {recent.map((b) => (
              <span key={b.id} style={{
                width: 32, height: 32, borderRadius: 999,
                background: b.isWicket ? "#b01e1e" : b.extraType ? "#f0b429" : b.runs >= 4 ? "#14a44d" : "rgba(255,255,255,.08)",
                color: "#fff",
                display: "grid", placeItems: "center",
                fontSize: ".75rem", fontWeight: 800,
                border: "1px solid rgba(255,255,255,.15)",
              }}>
                {b.isWicket ? "W" : b.extraType === "WIDE" ? "Wd" : b.extraType === "NO_BALL" ? "Nb" : b.extraType === "BYE" ? "B" : b.extraType === "LEG_BYE" ? "Lb" : b.runs}
              </span>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div style={{
          background: "rgba(0,0,0,.3)",
          padding: ".5rem 1rem",
          fontSize: ".75rem",
          color: "rgba(238,244,251,.6)",
          display: "flex",
          justifyContent: "space-between", gap: "1rem", flexWrap: "wrap",
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}>
          <span>{match.venue}</span>
          {match.result && <span style={{ color: "#f0b429", fontWeight: 700 }}>🏆 {match.result}</span>}
        </div>
      </div>
      {/* Controls */}
      <div style={{ position: "fixed", top: ".75rem", right: ".75rem", display: "flex", gap: ".35rem", zIndex: 10 }}>
        <button
          onClick={() => setTransparent((t) => !t)}
          style={{
            padding: ".35rem .7rem",
            background: "rgba(0,0,0,.7)",
            border: "1px solid rgba(240,180,41,.5)",
            borderRadius: ".4rem",
            color: "#f0b429",
            fontSize: ".72rem",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          {transparent ? "BG: OFF" : "BG: ON"}
        </button>
      </div>
    </div>
  );
}