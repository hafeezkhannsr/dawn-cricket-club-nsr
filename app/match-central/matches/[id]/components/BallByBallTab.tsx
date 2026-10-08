import type { Match, Tournament } from "@/lib/data/tournament-types";
type Ball = {
  over: number;
  ball: number;
  runs: number;
  extra?: "wd" | "nb" | "b" | "lb";
  wicket?: boolean;
  commentary: string;
};
const MOCK_BALLS: Ball[] = [
  { over: 0, ball: 1, runs: 0, commentary: "Adnan Irshad to Asad Khan, no run, defended back to bowler" },
  { over: 0, ball: 2, runs: 1, commentary: "Adnan Irshad to Asad Khan, 1 run, worked to mid-wicket" },
  { over: 0, ball: 3, runs: 4, commentary: "Adnan Irshad to Naseer Ahmad, FOUR! Beautiful cover drive" },
  { over: 0, ball: 4, runs: 0, commentary: "Adnan Irshad to Naseer Ahmad, no run, dot ball" },
  { over: 0, ball: 5, runs: 6, commentary: "Adnan Irshad to Naseer Ahmad, SIX! Straight down the ground" },
  { over: 0, ball: 6, runs: 0, commentary: "Adnan Irshad to Naseer Ahmad, no run" },
  { over: 1, ball: 1, runs: 1, extra: "wd", commentary: "WIDE! Down the leg side" },
  { over: 1, ball: 1, runs: 2, commentary: "Fida Ullah to Asad Khan, 2 runs" },
  { over: 1, ball: 2, runs: 0, commentary: "Fida Ullah to Asad Khan, no run" },
  { over: 1, ball: 3, runs: 0, wicket: true, commentary: "WICKET! Asad Khan b Fida Ullah, clean bowled!" },
];
export default function BallByBallTab({ match, tournament }: { match: Match; tournament: Tournament }) {
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
        <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 900 }}>
          Ball by Ball Commentary
        </h2>
        <p style={{ margin: ".3rem 0 0", fontSize: ".78rem", color: "rgba(238,244,251,.6)" }}>
          {match.teamA.shortName} vs {match.teamB.shortName} · 1st Innings
        </p>
      </div>
      <div style={{ padding: "1rem" }}>
        {MOCK_BALLS.map((b, i) => (
          <div key={i} style={{
            display: "flex",
            gap: "1rem",
            padding: ".85rem",
            marginBottom: ".5rem",
            background: b.wicket
              ? "rgba(220,38,38,.1)"
              : b.runs >= 4
              ? "rgba(20,164,77,.08)"
              : "rgba(255,255,255,.02)",
            border: b.wicket
              ? "1px solid rgba(220,38,38,.3)"
              : b.runs >= 4
              ? "1px solid rgba(20,164,77,.25)"
              : "1px solid rgba(255,255,255,.05)",
            borderRadius: ".6rem",
            alignItems: "center",
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 999,
              background: b.wicket ? "#dc2626" : b.runs >= 6 ? "#14a44d" : b.runs >= 4 ? "#0f8a3e" : "rgba(255,255,255,.08)",
              display: "grid", placeItems: "center",
              fontSize: ".85rem", fontWeight: 900, color: "#fff",
              flexShrink: 0,
            }}>
              {b.wicket ? "W" : b.extra === "wd" ? "Wd" : b.extra === "nb" ? "Nb" : b.runs}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: ".68rem", color: "#f0b429", fontWeight: 700, marginBottom: ".2rem" }}>
                {b.over}.{b.ball}
              </div>
              <div style={{ fontSize: ".85rem", color: "rgba(238,244,251,.85)", lineHeight: 1.5 }}>
                {b.commentary}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}