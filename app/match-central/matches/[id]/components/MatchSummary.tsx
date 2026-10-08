import type { Match, Tournament } from "@/lib/data/tournament-types";
export default function MatchSummary({ match, tournament }: { match: Match; tournament: Tournament }) {
  const isLive = match.status === "LIVE";
  const isCompleted = match.status === "COMPLETED";
  return (
    <div style={{
      padding: "1.5rem",
      background: isLive
        ? "linear-gradient(135deg, rgba(220,38,38,.08), rgba(20,164,77,.05))"
        : "rgba(255,255,255,.03)",
      border: isLive ? "1px solid rgba(220,38,38,.4)" : "1px solid rgba(255,255,255,.08)",
      borderRadius: ".9rem",
      marginBottom: "1.25rem",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: ".8rem", color: "rgba(238,244,251,.6)", marginBottom: ".5rem" }}>
          {tournament.name}
        </div>
        <h1 style={{ margin: 0, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontWeight: 900 }}>
          {match.group} · {match.matchNumber}
        </h1>
        <div style={{ display: "flex", justifyContent: "center", gap: ".5rem", marginTop: ".5rem", flexWrap: "wrap" }}>
          <span style={{
            padding: ".25rem .65rem",
            background: "rgba(240,180,41,.15)",
            border: "1px solid rgba(240,180,41,.4)",
            borderRadius: ".4rem",
            color: "#f0b429",
            fontSize: ".72rem",
            fontWeight: 800,
          }}>{match.format}</span>
          {isLive && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: ".35rem",
              padding: ".25rem .65rem",
              background: "rgba(220,38,38,.2)",
              border: "1px solid rgba(220,38,38,.5)",
              borderRadius: ".4rem",
              color: "#fca5a5",
              fontSize: ".72rem",
              fontWeight: 800,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "#dc2626", animation: "livePulse 1.6s ease-in-out infinite" }} />
              LIVE
            </span>
          )}
          {isCompleted && (
            <span style={{
              padding: ".25rem .65rem",
              background: "rgba(20,164,77,.2)",
              border: "1px solid rgba(20,164,77,.5)",
              borderRadius: ".4rem",
              color: "#86efac",
              fontSize: ".72rem",
              fontWeight: 800,
            }}>RESULT</span>
          )}
        </div>
        <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.55)", marginTop: ".65rem" }}>
          📅 {new Date(match.date).toLocaleDateString()} {match.time} · 📍 {match.venue}
        </div>
      </div>
      {/* Score card */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: "1rem",
        alignItems: "center",
        padding: "1.25rem",
        background: "rgba(255,255,255,.03)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: ".8rem",
        marginBottom: "1rem",
      }}>
        <TeamScore
          name={match.teamA.name}
          short={match.teamA.shortName}
          score={match.teamAScore}
          overs={match.teamAOvers}
          isWinner={match.winnerId === match.teamA.id}
        />
        <div style={{
          padding: ".4rem .8rem",
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: 999,
          fontSize: ".75rem",
          color: "rgba(238,244,251,.6)",
          fontWeight: 700,
        }}>VS</div>
        <TeamScore
          name={match.teamB.name}
          short={match.teamB.shortName}
          score={match.teamBScore}
          overs={match.teamBOvers}
          isWinner={match.winnerId === match.teamB.id}
        />
      </div>
      {/* Result / Toss */}
      {match.result && (
        <div style={{
          padding: ".75rem 1rem",
          background: "rgba(20,164,77,.12)",
          border: "1px solid rgba(20,164,77,.35)",
          borderRadius: ".6rem",
          fontSize: ".85rem",
          fontWeight: 700,
          color: "#86efac",
          textAlign: "center",
          marginBottom: ".5rem",
        }}>
          {match.result}
        </div>
      )}
      {match.toss && (
        <div style={{
          padding: ".5rem .85rem",
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(255,255,255,.06)",
          borderRadius: ".5rem",
          fontSize: ".78rem",
          color: "rgba(238,244,251,.7)",
          textAlign: "center",
        }}>
          🪙 {match.toss}
        </div>
      )}
    </div>
  );
}
function TeamScore({
  name,
  short,
  score,
  overs,
  isWinner,
}: {
  name: string;
  short: string;
  score?: string;
  overs?: string;
  isWinner: boolean;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: ".5rem" }}>
        <div style={{
          width: 48, height: 48, borderRadius: 999,
          background: isWinner ? "linear-gradient(135deg, #14a44d, #0f8a3e)" : "rgba(255,255,255,.08)",
          display: "grid", placeItems: "center",
          fontSize: "1.4rem",
          border: isWinner ? "2px solid #86efac" : "1px solid rgba(255,255,255,.1)",
        }}>🏏</div>
      </div>
      <div style={{ fontSize: ".82rem", fontWeight: 700, color: "#fff", marginBottom: ".25rem" }}>
        {short}
      </div>
      <div style={{ fontSize: ".68rem", color: "rgba(238,244,251,.5)" }}>
        {name.length > 25 ? name.substring(0, 25) + "…" : name}
      </div>
      {score && (
        <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#fff", marginTop: ".4rem", lineHeight: 1 }}>
          {score}
        </div>
      )}
      {overs && (
        <div style={{ fontSize: ".75rem", color: "rgba(238,244,251,.6)", marginTop: ".2rem" }}>
          ({overs} Overs)
        </div>
      )}
    </div>
  );
}