"use client";
import { useEffect, useState } from "react";
type PlayerStat = {
  playerId: string;
  name: string;
  team: string;
  matches: number;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  highest: number;
  fifties: number;
  hundreds: number;
  wickets: number;
  overs: number;
  runsConceded: number;
  best: string;
  strikeRate: number;
  average: number;
  economy: number;
};
type Data = {
  club: { totalPlayers: number; totalMatches: number; liveMatches: number };
  topBatters: PlayerStat[];
  topBowlers: PlayerStat[];
  topSixes: PlayerStat[];
};
export default function StatsDashboard() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"batting" | "bowling" | "sixes">("batting");
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/v1/statistics", { cache: "no-store" });
        const j = await res.json();
        if (j.ok) setData(j);
      } catch {}
      setLoading(false);
    })();
  }, []);
  if (loading) return <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>Loading stats…</div>;
  if (!data) return <div style={{ padding: "3rem", textAlign: "center", color: "#ff8b8b" }}>Could not load statistics.</div>;
  return (
    <>
      {/* Club counters */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: ".75rem",
        marginBottom: "1.5rem",
      }}>
        <CounterCard label="Registered Players" value={data.club.totalPlayers} color="#86efac" />
        <CounterCard label="Matches Played" value={data.club.totalMatches} color="#f0b429" />
        <CounterCard label="Live Right Now" value={data.club.liveMatches} color="#93c5fd" />
      </div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: ".4rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {([
          { k: "batting", label: "🏏 Top Run Scorers" },
          { k: "bowling", label: "🎯 Top Wicket Takers" },
          { k: "sixes",   label: "💥 Most Sixes" },
        ] as const).map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className="btn"
            style={{
              background: tab === t.k ? "#f0b429" : "rgba(255,255,255,.05)",
              color: tab === t.k ? "#061428" : "#eef4fb",
              border: tab === t.k ? "none" : "1px solid rgba(255,255,255,.12)",
              fontWeight: tab === t.k ? 800 : 500,
            }}
          >{t.label}</button>
        ))}
      </div>
      {/* Table */}
      <div style={{
        background: "rgba(255,255,255,.02)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: ".9rem",
        overflow: "hidden",
      }}>
        {tab === "batting" && (
          <Table
            headers={["#", "Player", "Team", "M", "Runs", "Balls", "4s", "6s", "HS", "50s", "100s", "SR"]}
            rows={data.topBatters.map((p, i) => [
              String(i + 1), p.name, p.team, String(p.matches), String(p.runs),
              String(p.balls), String(p.fours), String(p.sixes), String(p.highest),
              String(p.fifties), String(p.hundreds), p.strikeRate.toFixed(1),
            ])}
            empty="No batting data yet."
          />
        )}
        {tab === "bowling" && (
          <Table
            headers={["#", "Player", "Team", "M", "Wkts", "Overs", "Runs", "Best", "Econ", "Avg"]}
            rows={data.topBowlers.map((p, i) => [
              String(i + 1), p.name, p.team, String(p.matches), String(p.wickets),
              `${Math.floor(p.overs / 6)}.${p.overs % 6}`, String(p.runsConceded),
              p.best, p.economy.toFixed(2), p.average.toFixed(1),
            ])}
            empty="No bowling data yet."
          />
        )}
        {tab === "sixes" && (
          <Table
            headers={["#", "Player", "Team", "6s", "4s", "Runs", "SR"]}
            rows={data.topSixes.map((p, i) => [
              String(i + 1), p.name, p.team, String(p.sixes), String(p.fours),
              String(p.runs), p.strikeRate.toFixed(1),
            ])}
            empty="No six data yet."
          />
        )}
      </div>
    </>
  );
}
function CounterCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{
      padding: "1.1rem",
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: ".75rem",
    }}>
      <div style={{ fontSize: ".7rem", color: "rgba(238,244,251,.55)", letterSpacing: ".04em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: "1.7rem", fontWeight: 900, color, marginTop: ".25rem" }}>{value}</div>
    </div>
  );
}
function Table({ headers, rows, empty }: { headers: string[]; rows: string[][]; empty: string }) {
  if (rows.length === 0) {
    return <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.55)" }}>{empty}</div>;
  }
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 640 }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,.03)" }}>
            {headers.map((h) => (
              <th key={h} style={{
                textAlign: h === "Player" || h === "Team" || h === "Best" ? "left" : "right",
                padding: ".7rem .9rem",
                fontSize: ".7rem", letterSpacing: ".05em", textTransform: "uppercase",
                color: "rgba(238,244,251,.7)", fontWeight: 700,
                borderBottom: "1px solid rgba(255,255,255,.08)",
                whiteSpace: "nowrap",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: ".65rem .9rem",
                  textAlign: ci === 1 || ci === 2 ? "left" : "right",
                  color: ci === 1 ? "#fff" : "rgba(238,244,251,.85)",
                  fontWeight: ci === 1 ? 600 : 400,
                  whiteSpace: "nowrap",
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}