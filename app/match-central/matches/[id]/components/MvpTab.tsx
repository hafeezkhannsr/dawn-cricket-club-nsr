import type { Match, Tournament } from "@/lib/data/tournament-types";
export default function MvpTab({ match, tournament }: { match: Match; tournament: Tournament }) {
  const mvps = [
    { name: "Naseer Ahmad", team: "GZQN", points: 85.5, runs: 35, wickets: 0, icon: "🏆" },
    { name: "Asad Khan", team: "ASSC", points: 72.3, runs: 8, wickets: 3, icon: "🎯" },
    { name: "Hamza Ahmad", team: "GHSN", points: 58.7, runs: 28, wickets: 0, icon: "🏏" },
    { name: "Fida Ullah", team: "RGS", points: 52.1, runs: 0, wickets: 2, icon: "⚡" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
      {mvps.map((m, i) => (
        <div key={m.name} style={{
          padding: "1.5rem",
          background: i === 0
            ? "linear-gradient(135deg, rgba(240,180,41,.15), rgba(240,180,41,.05))"
            : "rgba(255,255,255,.03)",
          border: i === 0 ? "1px solid rgba(240,180,41,.5)" : "1px solid rgba(255,255,255,.08)",
          borderRadius: ".9rem",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>{m.icon}</div>
          <div style={{
            fontSize: ".68rem", color: "#f0b429", fontWeight: 800,
            textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".4rem",
          }}>#{i + 1} MVP</div>
          <div style={{ fontSize: "1.05rem", fontWeight: 900, color: "#fff", marginBottom: ".3rem" }}>
            {m.name}
          </div>
          <div style={{ fontSize: ".75rem", color: "rgba(238,244,251,.6)", marginBottom: ".75rem" }}>
            {m.team}
          </div>
          <div style={{
            padding: ".6rem",
            background: "rgba(0,0,0,.25)",
            borderRadius: ".5rem",
            display: "flex",
            justifyContent: "space-around",
            fontSize: ".75rem",
          }}>
            <div>
              <div style={{ color: "rgba(238,244,251,.5)", fontSize: ".65rem" }}>PTS</div>
              <div style={{ color: "#f0b429", fontWeight: 900 }}>{m.points}</div>
            </div>
            <div>
              <div style={{ color: "rgba(238,244,251,.5)", fontSize: ".65rem" }}>Runs</div>
              <div style={{ color: "#fff", fontWeight: 700 }}>{m.runs}</div>
            </div>
            <div>
              <div style={{ color: "rgba(238,244,251,.5)", fontSize: ".65rem" }}>Wkts</div>
              <div style={{ color: "#fff", fontWeight: 700 }}>{m.wickets}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}