"use client";
import type { CricketMatch, Innings, Player } from "@/lib/cricket/types";
import { oversDisplay } from "@/lib/cricket/types";
import {
  buildBatting,
  buildBowling,
  formatDismissal,
  calculateManOfMatch,
} from "@/lib/cricket/scorecard";
export default function ScorecardPanel({ match }: { match: CricketMatch }) {
  const motm = calculateManOfMatch(match);
  return (
    <div style={{ marginTop: "1.5rem" }}>
      {motm && (
        <div style={{
          padding: "1.1rem 1.25rem",
          background: "linear-gradient(135deg, rgba(240,180,41,.18), rgba(20,164,77,.08))",
          border: "1px solid rgba(240,180,41,.45)",
          borderRadius: ".8rem",
          marginBottom: "1.25rem",
          display: "flex", alignItems: "center", gap: "1rem",
          flexWrap: "wrap",
        }}>
          <div style={{ fontSize: "2rem" }}>🏅</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: ".68rem", color: "#f0b429", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" }}>
              Man of the Match
            </div>
            <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#fff", marginTop: ".15rem" }}>{motm.name}</div>
            <div style={{ fontSize: ".82rem", color: "rgba(238,244,251,.75)" }}>{motm.team} · {motm.summary}</div>
          </div>
          <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)", textAlign: "right" }}>
            Impact score<br />
            <b style={{ color: "#f0b429", fontSize: "1.1rem" }}>{motm.points}</b>
          </div>
        </div>
      )}
      {match.innings.map((inn, idx) => {
        const battingTeam = match.teamA.id === inn.battingTeamId ? match.teamA : match.teamB;
        const bowlingTeam = match.teamA.id === inn.bowlingTeamId ? match.teamA : match.teamB;
        return (
          <InningsScorecard
            key={idx}
            match={match}
            inn={inn}
            battingTeam={battingTeam}
            bowlingTeam={bowlingTeam}
          />
        );
      })}
    </div>
  );
}
function InningsScorecard({
  match, inn, battingTeam, bowlingTeam,
}: {
  match: CricketMatch;
  inn: Innings;
  battingTeam: { name: string; players: Player[] };
  bowlingTeam: { name: string; players: Player[] };
}) {
  const batting = buildBatting(match, inn, battingTeam.players, bowlingTeam.players);
  const bowling = buildBowling(match, inn, bowlingTeam.players);
  const extras = inn.extras.wides + inn.extras.noBalls + inn.extras.byes + inn.extras.legByes;
  return (
    <section style={{
      background: "rgba(255,255,255,.02)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: ".8rem",
      marginBottom: "1.25rem",
      overflow: "hidden",
    }}>
      <header style={{
        padding: ".9rem 1.1rem",
        background: "rgba(240,180,41,.08)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", flexWrap: "wrap",
      }}>
        <div style={{ fontWeight: 800, fontSize: "1rem" }}>
          {battingTeam.name} — Innings {inn.index + 1}
        </div>
        <div style={{ fontSize: ".9rem", color: "#f0b429", fontWeight: 800 }}>
          {inn.runs}/{inn.wickets} <span style={{ color: "rgba(238,244,251,.6)", fontWeight: 500 }}>({oversDisplay(inn.balls)} ov)</span>
        </div>
      </header>
      {/* Batting table */}
      <div style={{ padding: ".75rem 1.1rem 0", fontSize: ".75rem", color: "rgba(238,244,251,.5)", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>
        Batting
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".84rem", minWidth: 520 }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,.02)" }}>
              <th style={thLeft}>Batter</th>
              <th style={thRight}>R</th>
              <th style={thRight}>B</th>
              <th style={thRight}>4s</th>
              <th style={thRight}>6s</th>
              <th style={thRight}>SR</th>
            </tr>
          </thead>
          <tbody>
            {batting.map((b) => (
              <tr key={b.playerId} style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
                <td style={{ padding: ".55rem .9rem" }}>
                  <div style={{ color: "#fff", fontWeight: 600 }}>
                    {b.name}
                    {b.isStriker && <span style={{ color: "#f0b429", marginLeft: 4 }}>*</span>}
                  </div>
                  <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)", marginTop: ".15rem" }}>
                    {formatDismissal(b)}
                  </div>
                </td>
                <td style={tdRight}><b style={{ color: "#fff" }}>{b.runs}</b></td>
                <td style={tdRight}>{b.balls}</td>
                <td style={tdRight}>{b.fours}</td>
                <td style={tdRight}>{b.sixes}</td>
                <td style={tdRight}>{b.strikeRate.toFixed(1)}</td>
              </tr>
            ))}
            {batting.length === 0 && (
              <tr><td colSpan={6} style={{ padding: "1rem", textAlign: "center", color: "rgba(238,244,251,.4)" }}>No batting data yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={{
        padding: ".7rem 1.1rem",
        borderTop: "1px solid rgba(255,255,255,.06)",
        fontSize: ".82rem", color: "rgba(238,244,251,.75)",
        display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: ".5rem",
      }}>
        <span>Extras: <b style={{ color: "#fff" }}>{extras}</b> <span style={{ color: "rgba(238,244,251,.5)" }}>
          (w {inn.extras.wides}, nb {inn.extras.noBalls}, b {inn.extras.byes}, lb {inn.extras.legByes})
        </span></span>
        <span>Total: <b style={{ color: "#f0b429" }}>{inn.runs}/{inn.wickets}</b> ({oversDisplay(inn.balls)} ov)</span>
      </div>
      {/* Bowling table */}
      <div style={{ padding: ".75rem 1.1rem 0", fontSize: ".75rem", color: "rgba(238,244,251,.5)", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>
        Bowling
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".84rem", minWidth: 520 }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,.02)" }}>
              <th style={thLeft}>Bowler</th>
              <th style={thRight}>O</th>
              <th style={thRight}>R</th>
              <th style={thRight}>W</th>
              <th style={thRight}>Econ</th>
              <th style={thRight}>Wd</th>
              <th style={thRight}>Nb</th>
            </tr>
          </thead>
          <tbody>
            {bowling.map((b) => (
              <tr key={b.playerId} style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
                <td style={{ padding: ".55rem .9rem", color: "#fff", fontWeight: 600 }}>{b.name}</td>
                <td style={tdRight}>{b.overs}</td>
                <td style={tdRight}>{b.runs}</td>
                <td style={tdRight}><b style={{ color: b.wickets >= 3 ? "#86efac" : "#fff" }}>{b.wickets}</b></td>
                <td style={tdRight}>{b.economy.toFixed(2)}</td>
                <td style={tdRight}>{b.wides}</td>
                <td style={tdRight}>{b.noBalls}</td>
              </tr>
            ))}
            {bowling.length === 0 && (
              <tr><td colSpan={7} style={{ padding: "1rem", textAlign: "center", color: "rgba(238,244,251,.4)" }}>No bowling data yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={{ height: ".75rem" }} />
    </section>
  );
}
const thLeft: React.CSSProperties = {
  textAlign: "left", padding: ".55rem .9rem",
  fontWeight: 600, color: "rgba(238,244,251,.65)",
  fontSize: ".72rem", letterSpacing: ".04em", textTransform: "uppercase",
};
const thRight: React.CSSProperties = { ...thLeft, textAlign: "right" };
const tdRight: React.CSSProperties = {
  padding: ".55rem .9rem", textAlign: "right",
  color: "rgba(238,244,251,.85)",
};