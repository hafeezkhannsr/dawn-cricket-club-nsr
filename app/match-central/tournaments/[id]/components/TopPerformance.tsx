import type { LeaderboardEntry } from "@/lib/data/tournament-types";
export default function TopPerformance({
  batsmen,
  bowlers,
}: {
  batsmen: LeaderboardEntry[];
  bowlers: LeaderboardEntry[];
}) {
  return (
    <div style={{
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: ".9rem",
      padding: "1.25rem",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 900 }}>Top Performance</h2>
        <select style={{
          padding: ".35rem .7rem",
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.12)",
          borderRadius: ".5rem",
          fontSize: ".78rem",
          color: "#eef4fb",
          colorScheme: "dark",
        }}>
          <option>Batsman</option>
          <option>Bowler</option>
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: ".75rem" }}>
        {batsmen.map((b, i) => (
          <div key={b.playerId} style={{
            padding: ".9rem",
            background: "rgba(240,180,41,.06)",
            border: "1px solid rgba(240,180,41,.25)",
            borderRadius: ".7rem",
            display: "flex", gap: ".7rem", alignItems: "center",
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 999,
              background: i === 0 ? "#f0b429" : i === 1 ? "#94a3b8" : "#cd7f32",
              display: "grid", placeItems: "center",
              fontSize: "1rem", fontWeight: 900, color: "#061428",
              flexShrink: 0,
            }}>{b.rank}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: ".88rem", fontWeight: 800, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {b.playerName}
              </div>
              <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)", marginTop: ".15rem" }}>
                {b.teamName}
              </div>
              <div style={{ fontSize: ".78rem", color: "#f0b429", fontWeight: 700, marginTop: ".2rem" }}>
                {b.runs} runs · SR {b.strikeRate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}