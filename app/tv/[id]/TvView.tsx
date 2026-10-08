"use client";
import { useEffect, useState } from "react";
import type { CricketMatch } from "@/lib/cricket/types";
import { oversDisplay, runRate, requiredRunRate } from "@/lib/cricket/types";
export default function TvView({ matchId }: { matchId: string }) {
  const [match, setMatch] = useState<CricketMatch | null>(null);
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/v1/matches/${matchId}`, { cache: "no-store" });
        const j = await res.json();
        if (j.ok) setMatch(j.match);
      } catch {}
    }
    load();
    const t = setInterval(load, 4000);
    return () => clearInterval(t);
  }, [matchId]);
  if (!match) {
    return (
      <div style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", display: "grid", placeItems: "center", fontSize: "1.2rem" }}>
        Loading TV display…
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
      background: "radial-gradient(ellipse at top, #0a1f3d 0%, #030a18 70%)",
      color: "#eef4fb",
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "2rem",
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{
          fontSize: "1rem", letterSpacing: ".4em", color: "#f0b429",
          fontWeight: 700, marginBottom: ".75rem",
        }}>
          DAWN CRICKET CLUB
        </div>
        <h1 style={{
          fontSize: "clamp(2rem, 6vw, 4rem)",
          fontWeight: 900, margin: 0, lineHeight: 1.05,
          textAlign: "center",
        }}>
          {match.teamA.name} <span style={{ color: "rgba(238,244,251,.4)", fontWeight: 400 }}>vs</span> {match.teamB.name}
        </h1>
        <div style={{ fontSize: "1rem", color: "rgba(238,244,251,.55)", marginTop: ".75rem" }}>
          {match.venue} · {match.matchNumber} · {match.status.replace(/_/g, " ")}
        </div>
      </div>
      {/* Score */}
      <div style={{
        padding: "2rem 3rem",
        background: "linear-gradient(135deg, rgba(240,180,41,.15), rgba(20,164,77,.08))",
        border: "2px solid rgba(240,180,41,.5)",
        borderRadius: "1.5rem",
        textAlign: "center",
        marginBottom: "2rem",
      }}>
        <div style={{ fontSize: ".95rem", letterSpacing: ".15em", color: "#f0b429", fontWeight: 800, marginBottom: ".5rem", textTransform: "uppercase" }}>
          {battingTeam.name} batting
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", justifyContent: "center" }}>
          <span style={{ fontSize: "clamp(3.5rem, 10vw, 6rem)", fontWeight: 900, lineHeight: 1 }}>
            {inn.runs}
          </span>
          <span style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "rgba(238,244,251,.7)" }}>
            / {inn.wickets}
          </span>
          <span style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", color: "rgba(238,244,251,.55)", marginLeft: "1rem" }}>
            ({oversDisplay(inn.balls)}/{match.oversPerInnings})
          </span>
        </div>
        <div style={{ marginTop: "1rem", fontSize: "1rem", color: "rgba(238,244,251,.75)", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          <span>CRR <b style={{ color: "#fff" }}>{runRate(inn.runs, inn.balls)}</b></span>
          {target !== null && (
            <>
              <span>Target <b style={{ color: "#f0b429" }}>{target}</b></span>
              <span>Need <b style={{ color: "#f0b429" }}>{Math.max(0, target - inn.runs)}</b> off <b style={{ color: "#f0b429" }}>{ballsRemaining}</b></span>
              <span>RRR <b style={{ color: "#f0b429" }}>{requiredRunRate(target, inn.runs, ballsRemaining)}</b></span>
            </>
          )}
        </div>
      </div>
      {/* Batters */}
      <div style={{ display: "flex", gap: "3rem", marginBottom: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: ".7rem", color: "rgba(238,244,251,.5)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".35rem" }}>Striker</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff" }}>
            {striker?.name ?? "—"} <span style={{ color: "#f0b429" }}>*</span>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: ".7rem", color: "rgba(238,244,251,.5)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".35rem" }}>Non-Striker</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "rgba(238,244,251,.85)" }}>{nonStriker?.name ?? "—"}</div>
        </div>
      </div>
      {/* This over */}
      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", justifyContent: "center" }}>
        <span style={{ fontSize: ".75rem", color: "rgba(238,244,251,.5)", letterSpacing: ".1em", fontWeight: 700, alignSelf: "center", marginRight: ".5rem", textTransform: "uppercase" }}>
          This over
        </span>
        {recent.length === 0 && <span style={{ color: "rgba(238,244,251,.35)" }}>—</span>}
        {recent.map((b) => (
          <span key={b.id} style={{
            width: 48, height: 48, borderRadius: 999,
            background: b.isWicket ? "#b01e1e" : b.extraType ? "#f0b429" : b.runs >= 4 ? "#14a44d" : "rgba(255,255,255,.08)",
            color: "#fff",
            display: "grid", placeItems: "center",
            fontSize: "1.1rem", fontWeight: 800,
            border: "1px solid rgba(255,255,255,.15)",
          }}>
            {b.isWicket ? "W" : b.extraType === "WIDE" ? "Wd" : b.extraType === "NO_BALL" ? "Nb" : b.extraType === "BYE" ? "B" : b.extraType === "LEG_BYE" ? "Lb" : b.runs}
          </span>
        ))}
      </div>
      {match.result && (
        <div style={{
          marginTop: "3rem",
          padding: "1.25rem 2.5rem",
          background: "rgba(240,180,41,.15)",
          border: "2px solid #f0b429",
          borderRadius: "1rem",
          fontSize: "1.5rem", fontWeight: 900, color: "#f0b429",
          textAlign: "center",
        }}>
          🏆 {match.result}
        </div>
      )}
    </div>
  );
}