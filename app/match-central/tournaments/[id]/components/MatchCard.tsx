import Link from "next/link";
import type { Match } from "@/lib/data/tournament-types";
export default function MatchCard({ match }: { match: Match }) {
  const status = match.status;
  const isLive = status === "LIVE";
  const isCompleted = status === "COMPLETED";
  const isCancelled = status === "CANCELLED";
  return (
    <div style={{
      background: isLive
        ? "linear-gradient(135deg, rgba(220,38,38,.08), rgba(240,180,41,.05))"
        : "rgba(255,255,255,.03)",
      border: isLive ? "1px solid rgba(220,38,38,.4)" : "1px solid rgba(255,255,255,.08)",
      borderRadius: ".9rem",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        padding: ".75rem 1rem",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: ".5rem",
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", gap: ".4rem", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: ".8rem", fontWeight: 800, color: "#fff" }}>
            {match.group} ({match.matchNumber})
          </span>
        </div>
        <div style={{ display: "flex", gap: ".35rem", alignItems: "center" }}>
          <span style={{
            padding: ".2rem .5rem", borderRadius: ".3rem",
            background: "rgba(240,180,41,.15)", color: "#f0b429",
            fontSize: ".65rem", fontWeight: 800,
          }}>{match.format}</span>
          <span style={{
            padding: ".2rem .5rem", borderRadius: ".3rem",
            background: isLive ? "rgba(220,38,38,.2)" : isCompleted ? "rgba(20,164,77,.2)" : isCancelled ? "rgba(148,163,184,.2)" : "rgba(147,197,253,.15)",
            color: isLive ? "#fca5a5" : isCompleted ? "#86efac" : isCancelled ? "#cbd5e1" : "#93c5fd",
            fontSize: ".65rem", fontWeight: 800,
          }}>
            {isLive && <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 999, background: "#dc2626", marginRight: ".3rem", animation: "livePulse 1.6s ease-in-out infinite" }} />}
            {status === "LIVE" ? "Live" : status === "COMPLETED" ? "Completed" : status === "CANCELLED" ? "Cancelled" : "Upcoming"}
          </span>
        </div>
      </div>
      {/* Date */}
      <div style={{ padding: ".5rem 1rem", fontSize: ".72rem", color: "rgba(238,244,251,.55)" }}>
        {new Date(match.date).toLocaleDateString()} {match.time}
      </div>
      {/* Teams */}
      <div style={{ padding: ".75rem 1rem 1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".75rem", marginBottom: ".5rem" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: ".85rem", fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {match.teamA.shortName}
            </div>
            {match.teamAScore && (
              <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#fff", marginTop: ".15rem" }}>
                {match.teamAScore}
              </div>
            )}
            {match.teamAOvers && (
              <div style={{ fontSize: ".68rem", color: "rgba(238,244,251,.55)" }}>
                ({match.teamAOvers} Overs)
              </div>
            )}
          </div>
          <div style={{ fontSize: ".75rem", color: "rgba(238,244,251,.5)", fontWeight: 700 }}>
            VS
          </div>
          <div style={{ flex: 1, minWidth: 0, textAlign: "right" }}>
            <div style={{ fontSize: ".85rem", fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {match.teamB.shortName}
            </div>
            {match.teamBScore && (
              <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#fff", marginTop: ".15rem" }}>
                {match.teamBScore}
              </div>
            )}
            {match.teamBOvers && (
              <div style={{ fontSize: ".68rem", color: "rgba(238,244,251,.55)" }}>
                ({match.teamBOvers} Overs)
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Result banner */}
      {match.result && (
        <div style={{
          padding: ".65rem 1rem",
          background: "rgba(20,164,77,.1)",
          borderTop: "1px solid rgba(20,164,77,.25)",
          fontSize: ".78rem",
          color: "#86efac",
          fontWeight: 700,
        }}>
          {match.result}
        </div>
      )}
      {match.status === "CANCELLED" && (
        <div style={{
          padding: ".65rem 1rem",
          background: "rgba(148,163,184,.1)",
          borderTop: "1px solid rgba(148,163,184,.25)",
          fontSize: ".78rem",
          color: "#cbd5e1",
          fontWeight: 700,
        }}>
          Match cancelled
        </div>
      )}
      {/* Visit button */}
      <div style={{ padding: ".6rem 1rem", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <Link href={`/match-central/matches/${match.id}`} className="btn btn-outline" style={{ width: "100%", justifyContent: "center", padding: ".45rem", fontSize: ".78rem" }}>
          View Match Details →
        </Link>
      </div>
    </div>
  );
}