import type { Match, Tournament } from "@/lib/data/tournament-types";
const PLAYERS_A = [
  { num: 1, name: "Adnan Irshad", role: "Batter", captain: true },
  { num: 2, name: "Hamza Ahmad", role: "Batter" },
  { num: 3, name: "Rohail Murtaza", role: "Wicket-keeper" },
  { num: 4, name: "Bilal Khan", role: "All-rounder" },
  { num: 5, name: "Asad Khan", role: "Bowler" },
  { num: 6, name: "Fida Ullah", role: "Bowler" },
  { num: 7, name: "M. Hassan", role: "Bowler" },
  { num: 8, name: "Tariq Mehmood", role: "Bowler" },
  { num: 9, name: "Asif Ali", role: "All-rounder" },
  { num: 10, name: "N. Shah", role: "Bowler" },
  { num: 11, name: "Wajdan Tariq", role: "Bowler" },
];
const PLAYERS_B = [
  { num: 1, name: "Naseer Ahmad", role: "Batter", captain: true },
  { num: 2, name: "Bilal Khan", role: "Batter" },
  { num: 3, name: "Umair Shah", role: "Batter" },
  { num: 4, name: "Roohullah", role: "Wicket-keeper" },
  { num: 5, name: "Maaz Khan", role: "All-rounder" },
  { num: 6, name: "Asad Khan", role: "Bowler" },
  { num: 7, name: "Fida Ullah", role: "Bowler" },
  { num: 8, name: "N. Shah", role: "Bowler" },
  { num: 9, name: "Wajdan Tariq", role: "Bowler" },
  { num: 10, name: "M. Hassan", role: "Bowler" },
  { num: 11, name: "Tariq Mehmood", role: "Bowler" },
];
export default function SquadTab({ match, tournament }: { match: Match; tournament: Tournament }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }} className="squad-grid">
      <TeamSquad team={match.teamA.shortName} fullName={match.teamA.name} players={PLAYERS_A} />
      <TeamSquad team={match.teamB.shortName} fullName={match.teamB.name} players={PLAYERS_B} />
      <style>{`
        @media (min-width: 900px) {
          .squad-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
function TeamSquad({
  team,
  fullName,
  players,
}: {
  team: string;
  fullName: string;
  players: Array<{ num: number; name: string; role: string; captain?: boolean }>;
}) {
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
        <div style={{ fontSize: "1rem", fontWeight: 900, color: "#fff" }}>{team}</div>
        <div style={{ fontSize: ".75rem", color: "rgba(238,244,251,.55)", marginTop: ".2rem" }}>{fullName}</div>
      </div>
      <div style={{ padding: ".5rem" }}>
        {players.map((p) => (
          <div key={p.num} style={{
            display: "flex", alignItems: "center", gap: ".75rem",
            padding: ".65rem .85rem",
            borderRadius: ".5rem",
            marginBottom: ".25rem",
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 999,
              background: "rgba(255,255,255,.08)",
              display: "grid", placeItems: "center",
              fontSize: ".78rem", fontWeight: 800, color: "rgba(238,244,251,.75)",
              flexShrink: 0,
            }}>{p.num}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: ".88rem", fontWeight: 700, color: "#fff" }}>
                {p.name} {p.captain && <span style={{ fontSize: ".65rem", color: "#f0b429", marginLeft: ".3rem" }}>(C)</span>}
              </div>
              <div style={{ fontSize: ".7rem", color: "rgba(238,244,251,.55)" }}>{p.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}