"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { CricketMatch } from "@/lib/cricket/types";
import { oversDisplay, runRate } from "@/lib/cricket/types";
export default function LiveMatchWidget() {
  const [matches, setMatches] = useState<CricketMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  async function load(showSpin = false) {
    if (showSpin) setRefreshing(true);
    try {
      const res = await fetch("/api/v1/matches", { cache: "no-store" });
      const j = await res.json();
      if (j.ok) {
        const live = j.items.filter((m: CricketMatch) => m.status === "LIVE");
        setMatches(live);
        setLastUpdate(new Date());
      }
    } catch {}
    setLoading(false);
    if (showSpin) setTimeout(() => setRefreshing(false), 800);
  }
  useEffect(() => {
    load();
    const t = setInterval(() => load(), 5000); // Auto refresh every 5 sec
    return () => clearInterval(t);
  }, []);
  if (loading) {
    return (
      <div style={{ padding: "1.5rem", textAlign: "center", color: "rgba(238,244,251,.5)", fontSize: ".85rem" }}>
        Loading live matches…
      </div>
    );
  }
  if (matches.length === 0) {
    return (
      <div style={{
        padding: "1.25rem",
        background: "rgba(255,255,255,.02)",
        border: "1px dashed rgba(255,255,255,.1)",
        borderRadius: ".7rem",
        textAlign: "center",
        color: "rgba(238,244,251,.55)",
        fontSize: ".85rem",
      }}>
        No live matches right now.
        <div style={{ marginTop: ".5rem", fontSize: ".75rem" }}>
          <Link href="/scorer" style={{ color: "#f0b429" }}>Open Scorer Console →</Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <span style={{
            display: "inline-block",
            width: 8, height: 8,
            borderRadius: 999,
            background: "#dc2626",
            animation: "livePulse 1.6s ease-in-out infinite",
          }} />
          <span style={{ fontSize: ".72rem", fontWeight: 800, letterSpacing: ".06em", color: "#fca5a5", textTransform: "uppercase" }}>
            {matches.length} Match{matches.length === 1 ? "" : "es"} Live
          </span>
        </div>
        <button
          onClick={() => load(true)}
          disabled={refreshing}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,.15)",
            borderRadius: ".4rem",
            color: "#eef4fb",
            padding: ".25rem .55rem",
            fontSize: ".72rem",
            cursor: refreshing ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: ".3rem",
          }}
        >
          <span style={{
            display: "inline-block",
            animation: refreshing ? "spin 1s linear infinite" : "none",
          }}>↻</span>
          {refreshing ? "Updating…" : "Refresh"}
        </button>
      </div>
      <div style={{ display: "grid", gap: ".6rem" }}>
        {matches.map((m) => {
          const inn = m.innings[m.currentInnings];
          const batting = m.teamA.id === inn.battingTeamId ? m.teamA : m.teamB;
          return (
            <Link
              key={m.id}
              href={`/scoreboard/${m.id}`}
              style={{
                display: "block",
                padding: "1rem 1.1rem",
                background: "linear-gradient(135deg, rgba(220,38,38,.08), rgba(240,180,41,.05))",
                border: "1px solid rgba(240,180,41,.35)",
                borderRadius: ".7rem",
                textDecoration: "none",
                color: "inherit",
                animation: "liveGlow 3s ease-in-out infinite",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".5rem", flexWrap: "wrap", marginBottom: ".5rem" }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: ".3rem",
                  padding: ".18rem .5rem",
                  borderRadius: ".3rem",
                  background: "rgba(220,38,38,.2)",
                  border: "1px solid rgba(220,38,38,.5)",
                  color: "#fca5a5",
                  fontSize: ".62rem",
                  fontWeight: 800,
                  letterSpacing: ".06em",
                }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: 999,
                    background: "#dc2626",
                    animation: "livePulse 1.6s ease-in-out infinite",
                  }} />
                  LIVE
                </span>
                <span style={{ fontFamily: "monospace", fontSize: ".7rem", color: "#f0b429" }}>
                  {m.matchNumber}
                </span>
              </div>
              <div style={{ fontSize: ".95rem", fontWeight: 800, color: "#fff", marginBottom: ".35rem" }}>
                {m.teamA.shortName} vs {m.teamB.shortName}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: ".5rem" }}>
                <div style={{ fontSize: ".82rem", color: "rgba(238,244,251,.75)" }}>
                  {batting.shortName}
                </div>
                <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#fff" }}>
                  {inn.runs}/{inn.wickets}
                  <span style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)", marginLeft: ".35rem", fontWeight: 500 }}>
                    ({oversDisplay(inn.balls)})
                  </span>
                </div>
              </div>
              <div style={{ marginTop: ".35rem", fontSize: ".68rem", color: "rgba(238,244,251,.5)", display: "flex", justifyContent: "space-between" }}>
                <span>CRR: {runRate(inn.runs, inn.balls)}</span>
                {lastUpdate && <span>Updated {lastUpdate.toLocaleTimeString()}</span>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}