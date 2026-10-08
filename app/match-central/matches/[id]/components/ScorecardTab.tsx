import type { Match, Tournament } from "@/lib/data/tournament-types";
type BattingRow = {
  name: string;
  dismissal: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  sr: number;
  notOut?: boolean;
};
type BowlingRow = {
  name: string;
  overs: string;
  maidens: number;
  runs: number;
  wickets: number;
  econ: number;
  wides: number;
  noBalls: number;
};
const MOCK_BATTING_A: BattingRow[] = [
  { name: "Adnan Irshad", dismissal: "c Fida Ullah b Asad Khan", runs: 22, balls: 46, fours: 2, sixes: 0, sr: 47.83 },
  { name: "Hamza Ahmad", dismissal: "not out", runs: 28, balls: 44, fours: 3, sixes: 0, sr: 63.64, notOut: true },
  { name: "Rohail Murtaza", dismissal: "not out", runs: 3, balls: 12, fours: 0, sixes: 0, sr: 25.00, notOut: true },
];
const MOCK_BOWLING_A: BowlingRow[] = [
  { name: "Asad Khan", overs: "6.0", maidens: 1, runs: 26, wickets: 1, econ: 4.33, wides: 2, noBalls: 0 },
  { name: "Fida Ullah", overs: "5.0", maidens: 2, runs: 10, wickets: 0, econ: 2.00, wides: 0, noBalls: 0 },
  { name: "N. Shah", overs: "4.0", maidens: 0, runs: 20, wickets: 0, econ: 5.00, wides: 1, noBalls: 0 },
  { name: "Wajdan Tariq", overs: "3.0", maidens: 1, runs: 17, wickets: 0, econ: 5.67, wides: 0, noBalls: 0 },
];
const MOCK_BATTING_B: BattingRow[] = [
  { name: "Nasir Ahmad", dismissal: "b M. Hassan", runs: 35, balls: 28, fours: 4, sixes: 1, sr: 125.0 },
  { name: "Bilal Khan", dismissal: "not out", runs: 28, balls: 24, fours: 3, sixes: 0, sr: 116.67, notOut: true },
  { name: "Umair Shah", dismissal: "not out", runs: 19, balls: 12, fours: 2, sixes: 1, sr: 158.33, notOut: true },
];
const MOCK_BOWLING_B: BowlingRow[] = [
  { name: "M. Hassan", overs: "4.0", maidens: 0, runs: 32, wickets: 1, econ: 8.00, wides: 2, noBalls: 1 },
  { name: "Tariq Mehmood", overs: "4.0", maidens: 0, runs: 28, wickets: 0, econ: 7.00, wides: 1, noBalls: 0 },
  { name: "Asif Ali", overs: "3.2", maidens: 0, runs: 22, wickets: 0, econ: 6.60, wides: 0, noBalls: 0 },
];
export default function ScorecardTab({ match, tournament }: { match: Match; tournament: Tournament }) {
  const hasScores = match.teamAScore && match.teamBScore;
  return (
    <div>
      {/* Innings 1 — Team A */}
      <div style={{
        background: "rgba(255,255,255,.03)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: ".9rem",
        marginBottom: "1rem",
        overflow: "hidden",
      }}>
        <InningsHeader team={match.teamA.shortName} score={match.teamAScore} overs={match.teamAOvers} innings={1} />
        <BattingTable rows={MOCK_BATTING_A} title="Batting" />
        <ExtrasRow extras={{ b: 2, lb: 2, nb: 1, wd: 12 }} total={17} />
        <TotalRow total={match.teamAScore || "53/1"} overs={match.teamAOvers || "11.0"} />
        <FallOfWickets text="1-50 (ADNAN IRSHAD, 10.1 Ov)" />
        <BowlingTable rows={MOCK_BOWLING_A} />
      </div>
      {/* Innings 2 — Team B */}
      {hasScores && (
        <div style={{
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: ".9rem",
          overflow: "hidden",
        }}>
          <InningsHeader team={match.teamB.shortName} score={match.teamBScore} overs={match.teamBOvers} innings={2} />
          <BattingTable rows={MOCK_BATTING_B} title="Batting" />
          <ExtrasRow extras={{ b: 1, lb: 1, nb: 0, wd: 8 }} total={10} />
          <TotalRow total={match.teamBScore || "82/2"} overs={match.teamBOvers || "15.2"} />
          <FallOfWickets text="1-35 (NASIR AHMAD, 5.4 Ov)" />
          <BowlingTable rows={MOCK_BOWLING_B} />
        </div>
      )}
      {!hasScores && (
        <div style={{
          padding: "3rem 1.5rem",
          background: "rgba(255,255,255,.03)",
          border: "1px dashed rgba(255,255,255,.15)",
          borderRadius: ".9rem",
          textAlign: "center",
          color: "rgba(238,244,251,.6)",
        }}>
          <div style={{ fontSize: "2.5rem", marginBottom: ".5rem", opacity: .5 }}>🏏</div>
          <div style={{ fontWeight: 700, color: "#fff", marginBottom: ".5rem" }}>Match not started yet</div>
          <p style={{ fontSize: ".85rem", maxWidth: 480, margin: "0 auto" }}>
            Scorecard will be available once the match begins.
          </p>
        </div>
      )}
    </div>
  );
}
function InningsHeader({ team, score, overs, innings }: { team: string; score?: string; overs?: string; innings: number }) {
  const ordinals = ["", "1st", "2nd"];
  return (
    <div style={{
      padding: "1rem 1.25rem",
      background: "rgba(20,164,77,.1)",
      borderBottom: "1px solid rgba(255,255,255,.06)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
      flexWrap: "wrap",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: ".5rem" }}>
        <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "#fff" }}>{team}</span>
        <span style={{ fontSize: ".8rem", color: "#86efac", fontWeight: 700 }}>
          ({ordinals[innings]} Innings)
        </span>
      </div>
      {score && (
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#fff" }}>
            {score}
          </span>
          {overs && (
            <span style={{ fontSize: ".78rem", color: "rgba(238,244,251,.6)", marginLeft: ".4rem" }}>
              ({overs} Ov)
            </span>
          )}
        </div>
      )}
    </div>
  );
}
function BattingTable({ rows, title }: { rows: BattingRow[]; title: string }) {
  return (
    <>
      <div style={{ padding: ".6rem 1.25rem", background: "rgba(255,255,255,.02)", fontSize: ".7rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase", letterSpacing: ".05em", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,.05)" }}>
        {title}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".82rem", minWidth: 580 }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,.02)" }}>
              <th style={thL}>Batter</th>
              <th style={thR}>R</th>
              <th style={thR}>B</th>
              <th style={thR}>4s</th>
              <th style={thR}>6s</th>
              <th style={thR}>SR</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                <td style={{ padding: ".7rem 1.25rem" }}>
                  <div style={{ color: "#fff", fontWeight: 700 }}>
                    {r.name} {r.notOut && <span style={{ color: "#86efac", fontSize: ".72rem" }}>NOT OUT</span>}
                  </div>
                  <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", marginTop: ".15rem" }}>
                    {r.dismissal}
                  </div>
                </td>
                <td style={{ ...tdR, color: "#fff", fontWeight: 800 }}>{r.runs}</td>
                <td style={tdR}>{r.balls}</td>
                <td style={tdR}>{r.fours}</td>
                <td style={tdR}>{r.sixes}</td>
                <td style={tdR}>{r.sr.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
function ExtrasRow({ extras, total }: { extras: { b: number; lb: number; nb: number; wd: number }; total: number }) {
  return (
    <div style={{
      padding: ".75rem 1.25rem",
      background: "rgba(255,255,255,.02)",
      borderTop: "1px solid rgba(255,255,255,.06)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: ".82rem",
      flexWrap: "wrap",
      gap: ".5rem",
    }}>
      <span style={{ color: "rgba(238,244,251,.7)" }}>
        <b style={{ color: "#fff" }}>Extras</b> — {total} ({extras.b}b, {extras.lb}lb, {extras.nb}nb, {extras.wd}wd)
      </span>
    </div>
  );
}
function TotalRow({ total, overs }: { total: string; overs: string }) {
  return (
    <div style={{
      padding: ".85rem 1.25rem",
      background: "rgba(240,180,41,.08)",
      borderTop: "1px solid rgba(240,180,41,.25)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: 800,
    }}>
      <span style={{ color: "#f0b429" }}>Total</span>
      <span style={{ color: "#f0b429", fontSize: "1.05rem" }}>{total} ({overs} Ov)</span>
    </div>
  );
}
function FallOfWickets({ text }: { text: string }) {
  return (
    <div style={{
      padding: ".6rem 1.25rem",
      background: "rgba(255,255,255,.02)",
      borderTop: "1px solid rgba(255,255,255,.06)",
      fontSize: ".78rem",
      color: "rgba(238,244,251,.7)",
    }}>
      <b style={{ color: "#fff" }}>Fall of wickets:</b> {text}
    </div>
  );
}
function BowlingTable({ rows }: { rows: BowlingRow[] }) {
  return (
    <>
      <div style={{ padding: ".6rem 1.25rem", background: "rgba(255,255,255,.02)", fontSize: ".7rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase", letterSpacing: ".05em", fontWeight: 700, borderTop: "1px solid rgba(255,255,255,.06)", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
        Bowling
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".82rem", minWidth: 620 }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,.02)" }}>
              <th style={thL}>Bowler</th>
              <th style={thR}>O</th>
              <th style={thR}>M</th>
              <th style={thR}>R</th>
              <th style={thR}>W</th>
              <th style={thR}>Econ</th>
              <th style={thR}>Wd</th>
              <th style={thR}>Nb</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                <td style={{ padding: ".7rem 1.25rem", color: "#fff", fontWeight: 700 }}>{r.name}</td>
                <td style={tdR}>{r.overs}</td>
                <td style={tdR}>{r.maidens}</td>
                <td style={tdR}>{r.runs}</td>
                <td style={{ ...tdR, color: r.wickets >= 2 ? "#86efac" : "#fff", fontWeight: 800 }}>{r.wickets}</td>
                <td style={tdR}>{r.econ.toFixed(2)}</td>
                <td style={tdR}>{r.wides}</td>
                <td style={tdR}>{r.noBalls}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
const thL: React.CSSProperties = {
  padding: ".7rem 1.25rem",
  textAlign: "left",
  fontSize: ".68rem",
  color: "rgba(238,244,251,.6)",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: ".04em",
  whiteSpace: "nowrap",
};
const thR: React.CSSProperties = { ...thL, textAlign: "right", padding: ".7rem 1rem" };
const tdR: React.CSSProperties = {
  padding: ".7rem 1rem",
  textAlign: "right",
  color: "rgba(238,244,251,.85)",
  whiteSpace: "nowrap",
};