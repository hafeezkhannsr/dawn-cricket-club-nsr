"use client";
import { useState } from "react";
import type { LeaderboardEntry } from "@/lib/data/tournament-types";
const TABS = ["BATSMAN", "BOWLER", "FIELDERS", "TEAMS"] as const;
type Tab = typeof TABS[number];
export default function Leaderboard({
  data,
  region,
  group,
}: {
  data: { batsmen: LeaderboardEntry[]; bowlers: LeaderboardEntry[]; fielders: LeaderboardEntry[]; teams: LeaderboardEntry[] };
  region?: string;
  group?: string;
}) {
  const [tab, setTab] = useState<Tab>("BATSMAN");
  const rows = tab === "BATSMAN" ? data.batsmen : tab === "BOWLER" ? data.bowlers : tab === "FIELDERS" ? data.fielders : data.teams;
  return (
    <div style={{
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: ".9rem",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "1rem 1.25rem",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        display: "flex",
        gap: ".5rem",
        flexWrap: "wrap",
      }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: ".4rem .9rem",
              borderRadius: ".4rem",
              border: tab === t ? "1px solid #f0b429" : "1px solid transparent",
              background: tab === t ? "rgba(240,180,41,.15)" : "transparent",
              color: tab === t ? "#f0b429" : "rgba(238,244,251,.65)",
              fontSize: ".75rem",
              fontWeight: 800,
              letterSpacing: ".04em",
              cursor: "pointer",
            }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ padding: ".75rem 1.25rem", display: "flex", gap: ".5rem", flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <span style={selectStyle}>{region} ▼</span>
        <span style={selectStyle}>{group} ▼</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        {tab === "BATSMAN" && <BatsmanTable rows={rows} />}
        {tab === "BOWLER" && <BowlerTable rows={rows} />}
        {tab === "FIELDERS" && <FielderTable rows={rows} />}
        {tab === "TEAMS" && <EmptyTable label="Teams leaderboard coming soon" />}
      </div>
    </div>
  );
}
const selectStyle: React.CSSProperties = {
  padding: ".35rem .7rem",
  background: "rgba(255,255,255,.05)",
  border: "1px solid rgba(255,255,255,.12)",
  borderRadius: ".5rem",
  fontSize: ".78rem",
  color: "rgba(238,244,251,.85)",
};
function rankBadge(rank: number) {
  const colors = ["#f0b429", "#94a3b8", "#cd7f32"];
  const color = colors[rank - 1];
  return (
    <div style={{
      width: 30, height: 30, borderRadius: 999,
      background: color || "rgba(255,255,255,.08)",
      display: "grid", placeItems: "center",
      fontSize: ".75rem", fontWeight: 900,
      color: color ? "#061428" : "rgba(238,244,251,.6)",
    }}>{rank}</div>
  );
}
function BatsmanTable({ rows }: { rows: LeaderboardEntry[] }) {
  if (!rows.length) return <EmptyTable label="No batting data yet" />;
  return (
    <table style={tableStyle}>
      <thead>
        <tr style={theadRow}>
          {["Rank", "Player", "Team", "Mat", "Inn", "Runs", "HS", "SR"].map((h) => (
            <th key={h} style={th(h === "Player" || h === "Team")}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.playerId} style={tr}>
            <td style={tdCenter}>{rankBadge(r.rank)}</td>
            <td style={tdL}>
              <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                <div style={{ width: 32, height: 32, borderRadius: 999, background: "rgba(255,255,255,.08)", display: "grid", placeItems: "center", fontSize: ".85rem" }}>🏏</div>
                <span style={{ color: "#fff", fontWeight: 700 }}>{r.playerName}</span>
              </div>
            </td>
            <td style={tdL}><span style={{ fontSize: ".8rem", color: "rgba(238,244,251,.7)" }}>{r.teamName}</span></td>
            <td style={tdR}>{r.matches}</td>
            <td style={tdR}>{r.innings}</td>
            <td style={{ ...tdR, color: "#fff", fontWeight: 800 }}>{r.runs}</td>
            <td style={tdR}>{r.highScore}</td>
            <td style={{ ...tdR, color: "#86efac" }}>{r.strikeRate?.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
function BowlerTable({ rows }: { rows: LeaderboardEntry[] }) {
  if (!rows.length) return <EmptyTable label="No bowling data yet" />;
  return (
    <table style={tableStyle}>
      <thead>
        <tr style={theadRow}>
          {["Rank", "Player", "Team", "Mat", "Inn", "Wkts", "Best", "Econ"].map((h) => (
            <th key={h} style={th(h === "Player" || h === "Team")}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.playerId} style={tr}>
            <td style={tdCenter}>{rankBadge(r.rank)}</td>
            <td style={tdL}>
              <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                <div style={{ width: 32, height: 32, borderRadius: 999, background: "rgba(255,255,255,.08)", display: "grid", placeItems: "center", fontSize: ".85rem" }}>🎯</div>
                <span style={{ color: "#fff", fontWeight: 700 }}>{r.playerName}</span>
              </div>
            </td>
            <td style={tdL}><span style={{ fontSize: ".8rem", color: "rgba(238,244,251,.7)" }}>{r.teamName}</span></td>
            <td style={tdR}>{r.matches}</td>
            <td style={tdR}>{r.innings}</td>
            <td style={{ ...tdR, color: "#fff", fontWeight: 800 }}>{r.wickets}</td>
            <td style={tdR}>{r.best}</td>
            <td style={{ ...tdR, color: "#86efac" }}>{r.economy?.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
function FielderTable({ rows }: { rows: LeaderboardEntry[] }) {
  if (!rows.length) return <EmptyTable label="No fielding data yet" />;
  return (
    <table style={tableStyle}>
      <thead>
        <tr style={theadRow}>
          {["Rank", "Player", "Team", "Mat", "Catches", "Stumpings"].map((h) => (
            <th key={h} style={th(h === "Player" || h === "Team")}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.playerId} style={tr}>
            <td style={tdCenter}>{rankBadge(r.rank)}</td>
            <td style={tdL}><span style={{ color: "#fff", fontWeight: 700 }}>{r.playerName}</span></td>
            <td style={tdL}><span style={{ fontSize: ".8rem", color: "rgba(238,244,251,.7)" }}>{r.teamName}</span></td>
            <td style={tdR}>{r.matches}</td>
            <td style={tdR}>{r.catches}</td>
            <td style={tdR}>{r.stumpings}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
function EmptyTable({ label }: { label: string }) {
  return (
    <div style={{ padding: "3rem 1rem", textAlign: "center", color: "rgba(238,244,251,.6)", fontSize: ".9rem" }}>
      {label}
    </div>
  );
}
const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: ".85rem",
  minWidth: 720,
};
const theadRow: React.CSSProperties = {
  background: "rgba(255,255,255,.03)",
};
const th = (left: boolean): React.CSSProperties => ({
  padding: ".7rem .9rem",
  textAlign: left ? "left" : "right",
  fontSize: ".68rem",
  color: "rgba(238,244,251,.6)",
  fontWeight: 700,
  letterSpacing: ".04em",
  textTransform: "uppercase",
  borderBottom: "1px solid rgba(255,255,255,.08)",
  whiteSpace: "nowrap",
});
const tr: React.CSSProperties = {
  borderBottom: "1px solid rgba(255,255,255,.04)",
};
const tdL: React.CSSProperties = {
  padding: ".7rem .9rem",
  textAlign: "left",
};
const tdR: React.CSSProperties = {
  padding: ".7rem .9rem",
  textAlign: "right",
  color: "rgba(238,244,251,.85)",
  whiteSpace: "nowrap",
};
const tdCenter: React.CSSProperties = {
  padding: ".7rem .9rem",
  textAlign: "center",
};