"use client";
import Link from "next/link";
import type { CricketMatch } from "@/lib/cricket/types";
import { oversDisplay, runRate, requiredRunRate } from "@/lib/cricket/types";
type Props = {
  match: CricketMatch;
  compact?: boolean;
};
export default function LiveScoreCard({ match, compact = false }: Props) {
  const inn = match.innings[match.currentInnings];
  const batting = match.teamA.id === inn.battingTeamId ? match.teamA : match.teamB;
  const bowling = match.teamA.id === inn.bowlingTeamId ? match.teamA : match.teamB;
  const striker = batting.players.find((p) => p.id === inn.currentStrikerId);
  const nonStriker = batting.players.find((p) => p.id === inn.currentNonStrikerId);
  const bowler = bowling.players.find((p) => p.id === inn.currentBowlerId);
  const ballsRemaining = match.oversPerInnings * 6 - inn.balls;
  const target = match.currentInnings === 1 ? match.innings[0].runs + 1 : null;
  const recentBalls = match.balls.filter((b) => b.inningsIndex === match.currentInnings).slice(-6);
  const isLive = match.status === "LIVE";
  const isCompleted = match.status === "COMPLETED";
  const isInningsBreak = match.status === "INNINGS_BREAK";
  /* Category badge */
  const category = match.innings.length === 2 ? "2nd Innings" : "1st Innings";
  const categoryColor = isLive ? "#dc2626" : isCompleted ? "#f0b429" : "#93c5fd";
  return (
    <Link
      href={`/scoreboard/${match.id}`}
      style={{
        display: "block",
        background: isLive
          ? "linear-gradient(135deg, rgba(220,38,38,.10), rgba(240,180,41,.06))"
          : "rgba(255,255,255,.03)",
        border: isLive ? "1px solid rgba(240,180,41,.4)" : "1px solid rgba(255,255,255,.08)",
        borderRadius: "1rem",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        animation: isLive ? "liveGlow 3s ease-in-out infinite" : "none",
        transition: "transform .15s ease, box-shadow .15s ease",
      }}
    >
      {/* Top bar — status + category */}
      <div style={{
        padding: ".6rem 1rem",
        background: isLive
          ? "linear-gradient(90deg, rgba(220,38,38,.25), rgba(240,180,41,.15))"
          : "rgba(255,255,255,.03)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: ".5rem",
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".4rem", flexWrap: "wrap" }}>
          {isLive && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: ".35rem",
              padding: ".22rem .55rem", borderRadius: ".4rem",
              background: "rgba(220,38,38,.25)",
              border: "1px solid rgba(220,38,38,.6)",
              color: "#fca5a5",
              fontSize: ".65rem", fontWeight: 800, letterSpacing: ".08em",
            }}>
              <span style={{
                display: "inline-block", width: 6, height: 6, borderRadius: 999,
                background: "#dc2626",
                animation: "livePulse 1.6s ease-in-out infinite",
              }} />
              <span style={{ animation: "liveBlink 1.8s ease-in-out infinite" }}>LIVE NOW</span>
            </span>
          )}
          {isCompleted && (
            <span style={{
              padding: ".22rem .55rem", borderRadius: ".4rem",
              background: "rgba(240,180,41,.18)",
              border: "1px solid rgba(240,180,41,.5)",
              color: "#f0b429",
              fontSize: ".65rem", fontWeight: 800, letterSpacing: ".06em",
            }}>✓ COMPLETED</span>
          )}
          {isInningsBreak && (
            <span style={{
              padding: ".22rem .55rem", borderRadius: ".4rem",
              background: "rgba(147,197,253,.15)",
              border: "1px solid rgba(147,197,253,.5)",
              color: "#93c5fd",
              fontSize: ".65rem", fontWeight: 800, letterSpacing: ".06em",
            }}>⏸ INNINGS BREAK</span>
          )}
          <span style={{
            padding: ".22rem .55rem", borderRadius: ".4rem",
            background: `${categoryColor}22`,
            border: `1px solid ${categoryColor}66`,
            color: categoryColor,
            fontSize: ".65rem", fontWeight: 800, letterSpacing: ".05em",
          }}>{category}</span>
        </div>
        <span style={{
          fontFamily: "monospace",
          fontSize: ".7rem",
          color: "rgba(238,244,251,.5)",
        }}>{match.matchNumber}</span>
      </div>
      {/* Main content */}
      <div style={{ padding: "1.1rem 1.25rem" }}>
        {/* Teams */}
        <div style={{ marginBottom: ".85rem" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            gap: ".5rem", marginBottom: ".4rem",
          }}>
            <span style={{
              fontSize: ".95rem", fontWeight: 800,
              color: batting.id === inn.battingTeamId ? "#fff" : "rgba(238,244,251,.55)",
            }}>
              {batting.name}
            </span>
            {inn.battingTeamId === batting.id && (
              <span style={{ fontSize: ".65rem", color: "#f0b429", fontWeight: 700 }}>
                BATTING {isLive && "●"}
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: ".6rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
              {inn.runs}
            </span>
            <span style={{ fontSize: "1.15rem", color: "rgba(238,244,251,.7)" }}>
              /{inn.wickets}
            </span>
            <span style={{ fontSize: ".85rem", color: "rgba(238,244,251,.6)" }}>
              ({oversDisplay(inn.balls)}/{match.oversPerInnings} ov)
            </span>
            <span style={{
              fontSize: ".72rem", color: "#f0b429", fontWeight: 700,
              padding: ".15rem .45rem",
              background: "rgba(240,180,41,.12)",
              borderRadius: ".3rem",
            }}>CRR {runRate(inn.runs, inn.balls)}</span>
          </div>
        </div>
        {/* Second innings info (target) */}
        {target !== null && !inn.isComplete && (
          <div style={{
            padding: ".55rem .75rem",
            background: "rgba(20,164,77,.1)",
            border: "1px solid rgba(20,164,77,.3)",
            borderRadius: ".5rem",
            fontSize: ".78rem",
            color: "rgba(238,244,251,.85)",
            marginBottom: ".85rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}>
            <span>🎯 Target <b style={{ color: "#86efac" }}>{target}</b></span>
            <span>Need <b style={{ color: "#f0b429" }}>{Math.max(0, target - inn.runs)}</b> off <b style={{ color: "#f0b429" }}>{ballsRemaining}</b> balls</span>
            <span>RRR <b style={{ color: "#f0b429" }}>{requiredRunRate(target, inn.runs, ballsRemaining)}</b></span>
          </div>
        )}
        {/* First innings summary (when in 2nd) */}
        {match.currentInnings === 1 && match.innings[0] && (
          <div style={{
            padding: ".45rem .65rem",
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.06)",
            borderRadius: ".4rem",
            fontSize: ".75rem",
            color: "rgba(238,244,251,.65)",
            marginBottom: ".85rem",
          }}>
            1st Innings: <b style={{ color: "#fff" }}>{match.innings[0].runs}/{match.innings[0].wickets}</b>
            {" "}({oversDisplay(match.innings[0].balls)} ov)
          </div>
        )}
        {/* Recent balls */}
        {recentBalls.length > 0 && (
          <div style={{ display: "flex", gap: ".35rem", marginBottom: ".75rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: ".65rem", color: "rgba(238,244,251,.5)", letterSpacing: ".05em", alignSelf: "center", marginRight: ".2rem", textTransform: "uppercase", fontWeight: 700 }}>
              This Over
            </span>
            {recentBalls.map((b) => (
              <span key={b.id} style={{
                width: 30, height: 30, borderRadius: 999,
                background: b.isWicket ? "#b01e1e"
                          : b.extraType ? "#f0b429"
                          : b.runs >= 6 ? "#14a44d"
                          : b.runs >= 4 ? "#0f8a3e"
                          : "rgba(255,255,255,.08)",
                color: "#fff",
                display: "grid", placeItems: "center",
                fontSize: ".7rem", fontWeight: 800,
                border: "1px solid rgba(255,255,255,.1)",
              }}>
                {b.isWicket ? "W"
                  : b.extraType === "WIDE" ? "Wd"
                  : b.extraType === "NO_BALL" ? "Nb"
                  : b.extraType === "BYE" ? "B"
                  : b.extraType === "LEG_BYE" ? "Lb"
                  : b.runs}
              </span>
            ))}
          </div>
        )}
        {/* Players + venue (compact) */}
        {!compact && (striker || bowler) && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: ".5rem",
            paddingTop: ".75rem",
            borderTop: "1px solid rgba(255,255,255,.06)",
            fontSize: ".78rem",
          }}>
            {striker && (
              <div>
                <div style={{ color: "rgba(238,244,251,.5)", fontSize: ".65rem", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: ".15rem" }}>
                  Batting
                </div>
                <div style={{ color: "#fff", fontWeight: 700 }}>
                  {striker.shortName} <span style={{ color: "#f0b429" }}>*</span>
                </div>
                {nonStriker && (
                  <div style={{ color: "rgba(238,244,251,.75)" }}>{nonStriker.shortName}</div>
                )}
              </div>
            )}
            {bowler && (
              <div>
                <div style={{ color: "rgba(238,244,251,.5)", fontSize: ".65rem", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: ".15rem" }}>
                  Bowling
                </div>
                <div style={{ color: "#fff", fontWeight: 700 }}>{bowler.shortName}</div>
              </div>
            )}
          </div>
        )}
        {/* Result (if completed) */}
        {match.result && (
          <div style={{
            marginTop: ".75rem",
            padding: ".6rem .8rem",
            background: "rgba(240,180,41,.1)",
            border: "1px solid rgba(240,180,41,.3)",
            borderRadius: ".5rem",
            fontSize: ".82rem",
            fontWeight: 700,
            color: "#f0b429",
            textAlign: "center",
          }}>
            🏆 {match.result}
          </div>
        )}
      </div>
      {/* Footer */}
      <div style={{
        padding: ".55rem 1.25rem",
        background: "rgba(0,0,0,.2)",
        borderTop: "1px solid rgba(255,255,255,.06)",
        display: "flex",
        justifyContent: "space-between",
        fontSize: ".68rem",
        color: "rgba(238,244,251,.5)",
        flexWrap: "wrap",
        gap: ".35rem",
      }}>
        <span>📍 {match.venue}</span>
        <span>{new Date(match.matchDate).toLocaleDateString()}</span>
      </div>
    </Link>
  );
}