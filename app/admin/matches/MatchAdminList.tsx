"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { CricketMatch } from "@/lib/cricket/types";
import { oversDisplay } from "@/lib/cricket/types";
export default function MatchAdminList() {
  const [items, setItems] = useState<CricketMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/matches", { cache: "no-store" });
      const j = await res.json();
      if (j.ok) setItems(j.items);
    } catch {}
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);
  async function del(id: string, name: string) {
    if (!confirm(`Delete match "${name}"? This cannot be undone.`)) return;
    setBusy(id);
    try {
      await fetch(`/api/v1/matches/${id}`, { method: "DELETE" });
      await load();
    } catch {}
    setBusy(null);
  }
  return (
    <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
      <div className="container">
        <header style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}>Match Management</h1>
          <p style={{ margin: ".35rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
            View, score, or delete matches. Overlay & TV views included.
          </p>
        </header>
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>Loading…</div>
        ) : items.length === 0 ? (
          <div style={{ padding: "3rem 1.5rem", textAlign: "center", background: "rgba(255,255,255,.02)", border: "1px dashed rgba(255,255,255,.12)", borderRadius: ".9rem", color: "rgba(238,244,251,.6)" }}>
            No matches yet. <Link href="/scorer" style={{ color: "#f0b429" }}>Create one in the Scorer Console</Link>.
          </div>
        ) : (
          <div style={{ overflowX: "auto", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".8rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 800 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,.03)" }}>
                  {["Match #","Teams","Status","Score","Venue","Date","Actions"].map((h) => (
                    <th key={h} style={{
                      textAlign: "left", padding: ".7rem .9rem",
                      fontWeight: 700, color: "rgba(238,244,251,.7)",
                      fontSize: ".72rem", letterSpacing: ".04em", textTransform: "uppercase",
                      borderBottom: "1px solid rgba(255,255,255,.08)",
                      whiteSpace: "nowrap",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((m) => {
                  const inn = m.innings[m.currentInnings];
                  const batting = m.teamA.id === inn.battingTeamId ? m.teamA : m.teamB;
                  const sc = m.status === "LIVE" ? "#86efac" : m.status === "COMPLETED" ? "#f0b429" : "rgba(238,244,251,.6)";
                  return (
                    <tr key={m.id} style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
                      <td style={{ padding: ".7rem .9rem", fontFamily: "monospace", color: "#f0b429" }}>{m.matchNumber}</td>
                      <td style={{ padding: ".7rem .9rem", color: "#fff", fontWeight: 600 }}>
                        {m.teamA.shortName} vs {m.teamB.shortName}
                      </td>
                      <td style={{ padding: ".7rem .9rem" }}>
                        <span style={{ fontSize: ".72rem", fontWeight: 800, padding: ".2rem .55rem", borderRadius: ".35rem", background: sc + "22", color: sc, border: `1px solid ${sc}66` }}>
                          {m.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td style={{ padding: ".7rem .9rem", color: "rgba(238,244,251,.85)" }}>
                        {batting.shortName} {inn.runs}/{inn.wickets} ({oversDisplay(inn.balls)})
                      </td>
                      <td style={{ padding: ".7rem .9rem", color: "rgba(238,244,251,.6)", fontSize: ".78rem" }}>{m.venue}</td>
                      <td style={{ padding: ".7rem .9rem", color: "rgba(238,244,251,.6)", fontSize: ".78rem" }}>{m.matchDate}</td>
                      <td style={{ padding: ".7rem .9rem" }}>
                        <div style={{ display: "flex", gap: ".3rem", flexWrap: "wrap" }}>
                          <Link href={`/scorer/${m.id}`} className="btn btn-gold" style={{ padding: ".35rem .6rem", fontSize: ".72rem" }}>Score</Link>
                          <Link href={`/scoreboard/${m.id}`} className="btn btn-outline" style={{ padding: ".35rem .6rem", fontSize: ".72rem" }}>Board</Link>
                          <Link href={`/overlay/${m.id}`} className="btn btn-outline" style={{ padding: ".35rem .6rem", fontSize: ".72rem" }}>Overlay</Link>
                          <Link href={`/tv/${m.id}`} className="btn btn-outline" style={{ padding: ".35rem .6rem", fontSize: ".72rem" }}>TV</Link>
                          <button
                            onClick={() => del(m.id, `${m.teamA.name} vs ${m.teamB.name}`)}
                            disabled={busy === m.id}
                            className="btn"
                            style={{ padding: ".35rem .6rem", fontSize: ".72rem", background: "rgba(176,30,30,.2)", border: "1px solid rgba(176,30,30,.6)", color: "#ff8b8b", opacity: busy === m.id ? .5 : 1 }}
                          >
                            {busy === m.id ? "…" : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {/* Facebook embeds */}
        <section style={{ marginTop: "2.5rem" }}>
          <h2 style={{ margin: "0 0 1rem", fontSize: "1.35rem", fontWeight: 900 }}>Facebook Feeds</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem" }}>
            <FacebookEmbedSlot pageUrl="https://www.facebook.com/DAWNCricketClub" title="DAWN Cricket Club" subtitle="Official club page" />
            <FacebookEmbedSlot pageUrl="https://www.facebook.com/DSLOfficial" title="DSL — Dawn Super League" subtitle="League page" color="#cb6e17" />
          </div>
        </section>
      </div>
    </main>
  );
}
import dynamic from "next/dynamic";
const FacebookEmbedSlot = dynamic(() => import("@/components/facebook/FacebookEmbed"), { ssr: false });