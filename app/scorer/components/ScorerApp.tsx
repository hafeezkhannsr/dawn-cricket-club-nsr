"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import MatchCreator from "./MatchCreator";
import type { CricketMatch } from "@/lib/cricket/types";
import { oversDisplay } from "@/lib/cricket/types";
export default function ScorerApp() {
  const [items, setItems] = useState<CricketMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/matches", { cache: "no-store" });
      const j = await res.json();
      if (j.ok) setItems(j.items);
    } catch {}
    setLoading(false);
  }
  useEffect(() => { load(); }, []);
  return (
    <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
      <div className="container">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}>Scorer Console</h1>
            <p style={{ margin: ".35rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
              Create matches and score them ball-by-ball
            </p>
          </div>
          <button className="btn btn-gold" onClick={() => setShowCreate((s) => !s)}>
            {showCreate ? "✕ Cancel" : "+ New Match"}
          </button>
        </header>
        {showCreate && (
          <MatchCreator
            onCreated={() => { setShowCreate(false); load(); }}
            onCancel={() => setShowCreate(false)}
          />
        )}
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>Loading…</div>
        ) : items.length === 0 ? (
          <div style={{
            padding: "3rem 1.5rem", textAlign: "center",
            background: "rgba(255,255,255,.02)",
            border: "1px dashed rgba(255,255,255,.12)",
            borderRadius: ".9rem", color: "rgba(238,244,251,.6)",
          }}>
            No matches yet. Click <b style={{ color: "#f0b429" }}>+ New Match</b> to start.
          </div>
        ) : (
          <div style={{ display: "grid", gap: ".75rem" }}>
            {items.map((m) => {
              const inn = m.innings[m.currentInnings];
              const battingTeam = m.teamA.id === inn.battingTeamId ? m.teamA : m.teamB;
              const statusColor = m.status === "LIVE" ? "#14a44d" : m.status === "COMPLETED" ? "#f0b429" : "rgba(238,244,251,.5)";
              return (
                <div key={m.id} style={{
                  padding: "1rem 1.25rem",
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: ".75rem",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  gap: "1rem", flexWrap: "wrap",
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginBottom: ".35rem", flexWrap: "wrap" }}>
                      <span style={{
                        fontSize: ".68rem", fontWeight: 800, letterSpacing: ".06em",
                        padding: ".2rem .55rem", borderRadius: ".35rem",
                        background: statusColor + "22", color: statusColor,
                        border: `1px solid ${statusColor}66`,
                      }}>{m.status.replace(/_/g, " ")}</span>
                      <span style={{ fontFamily: "monospace", color: "#f0b429", fontSize: ".78rem" }}>{m.matchNumber}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: "#fff" }}>
                      {m.teamA.name} vs {m.teamB.name}
                    </div>
                    <div style={{ fontSize: ".8rem", color: "rgba(238,244,251,.6)", marginTop: ".2rem" }}>
                      {battingTeam.shortName}: {inn.runs}/{inn.wickets} ({oversDisplay(inn.balls)}/{m.oversPerInnings}) · {m.venue}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: ".5rem" }}>
                    <Link href={`/scorer/${m.id}`} className="btn btn-gold" style={{ padding: ".5rem .9rem", fontSize: ".8rem" }}>
                      Score
                    </Link>
                    <Link href={`/scoreboard/${m.id}`} className="btn btn-outline" style={{ padding: ".5rem .9rem", fontSize: ".8rem" }}>
                      View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}