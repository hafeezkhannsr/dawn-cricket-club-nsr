import type { PointTableRow } from "@/lib/data/tournament-types";
export default function PointTable({
  rows,
  region,
  group,
}: {
  rows: PointTableRow[];
  region?: string;
  group?: string;
}) {
  return (
    <div style={{
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: ".9rem",
      overflow: "hidden",
      marginBottom: "1.25rem",
    }}>
      <div style={{
        padding: "1rem 1.25rem",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: ".5rem",
        flexWrap: "wrap",
      }}>
        <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 900 }}>Point Table</h2>
        <div style={{ display: "flex", gap: ".5rem" }}>
          <Select label={region || "Nowshera"} />
          <Select label={group || "POOL A"} />
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 780 }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,.03)" }}>
              {["Rank", "Team", "Mat", "Won", "Lost", "Draw", "N/R", "PTS", "PCT", "Series Form", "RR"].map((h) => (
                <th key={h} style={{
                  padding: ".7rem .9rem",
                  textAlign: h === "Team" ? "left" : h === "Series Form" ? "center" : "right",
                  fontSize: ".68rem",
                  color: "rgba(238,244,251,.6)",
                  fontWeight: 700,
                  letterSpacing: ".04em",
                  textTransform: "uppercase",
                  borderBottom: "1px solid rgba(255,255,255,.08)",
                  whiteSpace: "nowrap",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.teamId} style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                <td style={{ padding: ".7rem .9rem", textAlign: "right", color: "#f0b429", fontWeight: 800, fontSize: ".9rem" }}>{r.rank}</td>
                <td style={{ padding: ".7rem .9rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 999,
                      background: "rgba(255,255,255,.08)",
                      display: "grid", placeItems: "center",
                      fontSize: ".75rem",
                    }}>🏏</div>
                    <span style={{ color: "#fff", fontWeight: 700 }}>{r.teamName}</span>
                  </div>
                </td>
                <td style={tdR}>{r.matches}</td>
                <td style={tdR}>{r.won}</td>
                <td style={tdR}>{r.lost}</td>
                <td style={tdR}>{r.draw}</td>
                <td style={tdR}>{r.nr}</td>
                <td style={{ ...tdR, color: "#fff", fontWeight: 800 }}>{r.points}</td>
                <td style={tdR}>{r.pct}</td>
                <td style={{ padding: ".7rem .9rem", textAlign: "center" }}>
                  <div style={{ display: "flex", gap: ".2rem", justifyContent: "center" }}>
                    {r.seriesForm.map((f, i) => (
                      <span key={i} style={{
                        width: 20, height: 20, borderRadius: 999,
                        display: "grid", placeItems: "center",
                        fontSize: ".65rem", fontWeight: 800, color: "#fff",
                        background: f === "WIN" ? "#14a44d" : f === "LOSS" ? "#dc2626" : f === "NR" ? "#94a3b8" : "#f0b429",
                      }}>
                        {f === "WIN" ? "W" : f === "LOSS" ? "L" : f === "NR" ? "NR" : "D"}
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ ...tdR, color: r.runRate >= 0 ? "#86efac" : "#fca5a5" }}>
                  {r.runRate >= 0 ? "+" : ""}{r.runRate.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const tdR: React.CSSProperties = {
  padding: ".7rem .9rem",
  textAlign: "right",
  color: "rgba(238,244,251,.85)",
  whiteSpace: "nowrap",
};
function Select({ label }: { label: string }) {
  return (
    <span style={{
      padding: ".35rem .7rem",
      background: "rgba(255,255,255,.05)",
      border: "1px solid rgba(255,255,255,.12)",
      borderRadius: ".5rem",
      fontSize: ".78rem",
      color: "rgba(238,244,251,.85)",
      display: "inline-flex",
      alignItems: "center",
      gap: ".4rem",
    }}>
      {label} <span style={{ fontSize: ".6rem", opacity: .6 }}>▼</span>
    </span>
  );
}