import type { Match, Tournament } from "@/lib/data/tournament-types";
export default function StatsTab({ match, tournament }: { match: Match; tournament: Tournament }) {
  const stats = [
    { label: "Total Runs", a: "53", b: "82" },
    { label: "Wickets", a: "1", b: "2" },
    { label: "Overs", a: "11.0", b: "15.2" },
    { label: "Run Rate", a: "4.82", b: "5.35" },
    { label: "Fours", a: "5", b: "9" },
    { label: "Sixes", a: "1", b: "2" },
    { label: "Extras", a: "17", b: "10" },
    { label: "Wides", a: "12", b: "8" },
    { label: "No Balls", a: "1", b: "0" },
  ];
  return (
    <div style={{
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: ".9rem",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "1rem 1.25rem",
        background: "rgba(20,164,77,.08)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}>
        <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 900 }}>Match Statistics</h2>
      </div>
      <div style={{ padding: "1.25rem" }}>
        {stats.map((s) => (
          <div key={s.label} style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1fr",
            gap: "1rem",
            alignItems: "center",
            padding: ".85rem 0",
            borderBottom: "1px solid rgba(255,255,255,.05)",
          }}>
            <div style={{ textAlign: "right", fontSize: "1.05rem", fontWeight: 900, color: "#fff" }}>{s.a}</div>
            <div style={{
              textAlign: "center",
              fontSize: ".8rem",
              color: "rgba(238,244,251,.6)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".04em",
            }}>{s.label}</div>
            <div style={{ textAlign: "left", fontSize: "1.05rem", fontWeight: 900, color: "#fff" }}>{s.b}</div>
          </div>
        ))}
      </div>
    </div>
  );
}