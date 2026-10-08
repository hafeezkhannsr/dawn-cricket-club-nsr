"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { CricketMatch, Player } from "@/lib/cricket/types";
import { oversDisplay, runRate, requiredRunRate } from "@/lib/cricket/types";
type ExtraType = "WIDE" | "NO_BALL" | "BYE" | "LEG_BYE" | null;
type WicketType = "BOWLED" | "CAUGHT" | "LBW" | "RUN_OUT" | "STUMPED" | "HIT_WICKET" | "RETIRED";
export default function LiveScorer({ matchId }: { matchId: string }) {
  const [match, setMatch] = useState<CricketMatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [showWicketModal, setShowWicketModal] = useState(false);
  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/v1/matches/${matchId}`, { cache: "no-store" });
      const j = await res.json();
      if (j.ok) setMatch(j.match);
      else setErr(j.error || "Failed to load");
    } catch {
      setErr("Network error");
    }
    setLoading(false);
  }, [matchId]);
  useEffect(() => { load(); }, [load]);
  async function sendBall(payload: Record<string, unknown>) {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`/api/v1/matches/${matchId}/ball`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json();
      if (j.ok) setMatch(j.match);
      else setErr(j.error || "Failed");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
    }
    setBusy(false);
    setShowWicketModal(false);
  }
  async function setPlayers(payload: Record<string, string>) {
    setBusy(true);
    try {
      const res = await fetch(`/api/v1/matches/${matchId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "set-players", ...payload }),
      });
      const j = await res.json();
      if (j.ok) setMatch(j.match);
      else setErr(j.error || "Failed");
    } catch {}
    setBusy(false);
  }
  async function startSecond() {
    setBusy(true);
    try {
      const res = await fetch(`/api/v1/matches/${matchId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start-second-innings" }),
      });
      const j = await res.json();
      if (j.ok) setMatch(j.match);
      else setErr(j.error || "Failed");
    } catch {}
    setBusy(false);
  }
  if (loading) {
    return (
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "3rem 1rem" }}>
        <div className="container" style={{ textAlign: "center", color: "rgba(238,244,251,.6)" }}>Loading…</div>
      </main>
    );
  }
  if (!match) {
    return (
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "3rem 1rem" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ color: "#ff8b8b" }}>{err || "Match not found"}</p>
          <Link href="/scorer" className="btn btn-gold">← Back to Scorer</Link>
        </div>
      </main>
    );
  }
  const inn = match.innings[match.currentInnings];
  const battingTeam = match.teamA.id === inn.battingTeamId ? match.teamA : match.teamB;
  const bowlingTeam = match.teamA.id === inn.bowlingTeamId ? match.teamA : match.teamB;
  const striker = battingTeam.players.find((p) => p.id === inn.currentStrikerId);
  const nonStriker = battingTeam.players.find((p) => p.id === inn.currentNonStrikerId);
  const bowler = bowlingTeam.players.find((p) => p.id === inn.currentBowlerId);
  const ballsRemaining = match.oversPerInnings * 6 - inn.balls;
  const target = match.currentInnings === 1 ? match.innings[0].runs + 1 : null;
  // Recent balls (last 6 legal + extras from this over)
  const currentOverBalls = match.balls
    .filter((b) => b.inningsIndex === match.currentInnings && b.overNumber === Math.floor((inn.balls - (inn.balls % 6 === 0 && inn.balls > 0 ? 6 : inn.balls % 6)) / 6))
    .slice(-12);
  return (
    <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", paddingBottom: "2rem" }}>
      {/* Header */}
      <div className="container" style={{ paddingTop: "1.5rem", paddingBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginBottom: ".35rem" }}>
              <span style={{
                padding: ".22rem .6rem", borderRadius: ".35rem",
                background: match.status === "LIVE" ? "rgba(20,164,77,.18)" : "rgba(240,180,41,.18)",
                color: match.status === "LIVE" ? "#86efac" : "#f0b429",
                fontSize: ".68rem", fontWeight: 800, letterSpacing: ".06em",
                border: `1px solid ${match.status === "LIVE" ? "#14a44d" : "#f0b429"}66`,
              }}>
                {match.status === "LIVE" && <span style={{ marginRight: 4, display: "inline-block", width: 6, height: 6, background: "#14a44d", borderRadius: 999 }} />}
                {match.status.replace(/_/g, " ")}
              </span>
              <span style={{ fontFamily: "monospace", color: "#f0b429", fontSize: ".78rem" }}>{match.matchNumber}</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 900 }}>
              {match.teamA.name} vs {match.teamB.name}
            </h1>
            <div style={{ fontSize: ".82rem", color: "rgba(238,244,251,.6)", marginTop: ".2rem" }}>{match.venue}</div>
          </div>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <Link href={`/scoreboard/${match.id}`} className="btn btn-outline">👁 View Scoreboard</Link>
            <Link href="/scorer" className="btn btn-outline">← All matches</Link>
          </div>
        </div>
      </div>
      {err && (
        <div className="container" style={{ marginBottom: "1rem" }}>
          <div style={{ padding: ".7rem 1rem", background: "rgba(255,80,80,.12)", border: "1px solid rgba(255,80,80,.4)", borderRadius: ".55rem", color: "#ff8b8b", fontSize: ".85rem" }}>
            {err}
          </div>
        </div>
      )}
      {match.result && (
        <div className="container" style={{ marginBottom: "1rem" }}>
          <div style={{ padding: ".85rem 1rem", background: "rgba(240,180,41,.12)", border: "1px solid rgba(240,180,41,.4)", borderRadius: ".55rem", color: "#f0b429", fontSize: ".95rem", fontWeight: 700, textAlign: "center" }}>
            🏆 {match.result}
          </div>
        </div>
      )}
      {/* Score summary */}
      <div className="container" style={{ marginBottom: "1.25rem" }}>
        <div style={{
          padding: "1.25rem",
          background: "linear-gradient(135deg, rgba(240,180,41,.15), rgba(20,164,77,.08))",
          border: "1px solid rgba(240,180,41,.35)",
          borderRadius: ".9rem",
        }}>
          <div style={{ fontSize: ".72rem", color: "#f0b429", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: ".35rem" }}>
            {battingTeam.name} — Innings {match.currentInnings + 1}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: ".6rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "2.6rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{inn.runs}</span>
            <span style={{ fontSize: "1.4rem", color: "rgba(238,244,251,.7)" }}>/ {inn.wickets}</span>
            <span style={{ fontSize: "1rem", color: "rgba(238,244,251,.7)", marginLeft: ".4rem" }}>
              ({oversDisplay(inn.balls)}/{match.oversPerInnings} ov)
            </span>
          </div>
          <div style={{ fontSize: ".82rem", color: "rgba(238,244,251,.65)", marginTop: ".5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <span>CRR: <b style={{ color: "#fff" }}>{runRate(inn.runs, inn.balls)}</b></span>
            {target !== null && (
              <>
                <span>Target: <b style={{ color: "#fff" }}>{target}</b></span>
                <span>Need: <b style={{ color: "#f0b429" }}>{Math.max(0, target - inn.runs)}</b> off <b style={{ color: "#f0b429" }}>{ballsRemaining}</b></span>
                <span>RRR: <b style={{ color: "#f0b429" }}>{requiredRunRate(target, inn.runs, ballsRemaining)}</b></span>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Player selection */}
      <div className="container" style={{ marginBottom: "1.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: ".75rem" }}>
          <PlayerPicker
            label="Striker"
            players={battingTeam.players}
            selectedId={inn.currentStrikerId}
            onSelect={(id) => setPlayers({ strikerId: id })}
            disabled={busy}
            accent="#f0b429"
          />
          <PlayerPicker
            label="Non-Striker"
            players={battingTeam.players.filter((p) => p.id !== inn.currentStrikerId)}
            selectedId={inn.currentNonStrikerId}
            onSelect={(id) => setPlayers({ nonStrikerId: id })}
            disabled={busy}
            accent="#f0b429"
          />
          <PlayerPicker
            label="Bowler"
            players={bowlingTeam.players}
            selectedId={inn.currentBowlerId}
            onSelect={(id) => setPlayers({ bowlerId: id })}
            disabled={busy}
            accent="#14a44d"
          />
        </div>
      </div>
      {/* This over */}
      <div className="container" style={{ marginBottom: "1.25rem" }}>
        <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: ".5rem" }}>
          This over
        </div>
        <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
          {match.balls.filter((b) => b.inningsIndex === match.currentInnings).slice(-6).map((b) => (
            <div key={b.id} style={{
              width: 38, height: 38, borderRadius: 999,
              background: b.isWicket ? "#b01e1e" : b.extraType ? "#f0b429" : b.runs >= 4 ? "#14a44d" : "rgba(255,255,255,.08)",
              color: b.isWicket || b.extraType ? "#fff" : b.runs >= 4 ? "#fff" : "#eef4fb",
              display: "grid", placeItems: "center",
              fontWeight: 800, fontSize: ".82rem",
              border: "1px solid rgba(255,255,255,.1)",
            }}>
              {b.isWicket ? "W" : b.extraType === "WIDE" ? "Wd" : b.extraType === "NO_BALL" ? "Nb" : b.extraType === "BYE" ? "B" : b.extraType === "LEG_BYE" ? "Lb" : b.runs}
            </div>
          ))}
          {match.balls.filter((b) => b.inningsIndex === match.currentInnings).length === 0 && (
            <span style={{ fontSize: ".82rem", color: "rgba(238,244,251,.4)" }}>No balls yet</span>
          )}
        </div>
      </div>
      {/* Scoring buttons */}
      {inn.isComplete && match.currentInnings === 0 && (
        <div className="container" style={{ marginBottom: "1.25rem", textAlign: "center" }}>
          <button className="btn btn-gold" onClick={startSecond} disabled={busy}>
            ▶ Start Second Innings
          </button>
        </div>
      )}
      {match.status === "LIVE" && !inn.isComplete && (
        <div className="container">
          <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: ".6rem" }}>
            Record ball
          </div>
          {/* Runs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: ".5rem", marginBottom: ".75rem" }}>
            {[0, 1, 2, 3, 4, 6].map((r) => (
              <button
                key={r}
                disabled={busy}
                onClick={() => sendBall({ runs: r })}
                className="btn"
                style={{
                  padding: "1.1rem .5rem",
                  background: r >= 4 ? "rgba(20,164,77,.15)" : "rgba(255,255,255,.06)",
                  border: r >= 4 ? "1px solid rgba(20,164,77,.5)" : "1px solid rgba(255,255,255,.14)",
                  color: r >= 4 ? "#86efac" : "#eef4fb",
                  fontSize: "1.3rem", fontWeight: 800,
                  opacity: busy ? .6 : 1,
                }}
              >
                {r}
              </button>
            ))}
          </div>
          {/* Extras + Wicket + Undo */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: ".5rem" }}>
            <button disabled={busy} onClick={() => sendBall({ runs: 0, extraType: "WIDE" })} className="btn" style={{ padding: ".9rem .5rem", background: "rgba(240,180,41,.12)", border: "1px solid rgba(240,180,41,.4)", color: "#f0b429", fontWeight: 700 }}>Wide</button>
            <button disabled={busy} onClick={() => sendBall({ runs: 0, extraType: "NO_BALL" })} className="btn" style={{ padding: ".9rem .5rem", background: "rgba(240,180,41,.12)", border: "1px solid rgba(240,180,41,.4)", color: "#f0b429", fontWeight: 700 }}>No Ball</button>
            <button disabled={busy} onClick={() => sendBall({ runs: 0, extraType: "BYE" })} className="btn" style={{ padding: ".9rem .5rem", background: "rgba(240,180,41,.12)", border: "1px solid rgba(240,180,41,.4)", color: "#f0b429", fontWeight: 700 }}>Bye</button>
            <button disabled={busy} onClick={() => sendBall({ runs: 0, extraType: "LEG_BYE" })} className="btn" style={{ padding: ".9rem .5rem", background: "rgba(240,180,41,.12)", border: "1px solid rgba(240,180,41,.4)", color: "#f0b429", fontWeight: 700 }}>Leg Bye</button>
            <button disabled={busy} onClick={() => setShowWicketModal(true)} className="btn" style={{ padding: ".9rem .5rem", background: "rgba(176,30,30,.2)", border: "1px solid rgba(176,30,30,.6)", color: "#ff8b8b", fontWeight: 800 }}>Wicket</button>
            <button disabled={busy} onClick={() => sendBall({ action: "undo" })} className="btn btn-outline" style={{ padding: ".9rem .5rem" }}>↶ Undo</button>
          </div>
        </div>
      )}
      {showWicketModal && (
        <WicketModal
          onCancel={() => setShowWicketModal(false)}
          onConfirm={(payload) => sendBall(payload)}
          striker={striker}
          nonStriker={nonStriker}
          bowlingTeam={bowlingTeam.players}
        />
      )}
    </main>
  );
}
function PlayerPicker({
  label, players, selectedId, onSelect, disabled, accent,
}: {
  label: string;
  players: Player[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  disabled: boolean;
  accent: string;
}) {
  return (
    <div style={{
      padding: ".85rem",
      background: "rgba(255,255,255,.03)",
      border: `1px solid ${selectedId ? accent + "66" : "rgba(255,255,255,.1)"}`,
      borderRadius: ".7rem",
    }}>
      <div style={{ fontSize: ".7rem", color: "rgba(238,244,251,.6)", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: ".5rem" }}>
        {label}
      </div>
      <select
        value={selectedId ?? ""}
        onChange={(e) => onSelect(e.target.value)}
        disabled={disabled}
        style={{
          width: "100%", padding: ".6rem .75rem",
          background: "#0a1f3d", border: "1px solid rgba(255,255,255,.15)",
          borderRadius: ".5rem", color: "#eef4fb", fontSize: ".88rem",
          fontFamily: "inherit", outline: "none", colorScheme: "dark",
        }}
      >
        <option value="">-- Select --</option>
        {players.map((p) => (
          <option key={p.id} value={p.id} style={{ background: "#0a1f3d", color: "#eef4fb" }}>{p.name}</option>
        ))}
      </select>
    </div>
  );
}
function WicketModal({
  onCancel, onConfirm, striker, nonStriker, bowlingTeam,
}: {
  onCancel: () => void;
  onConfirm: (payload: Record<string, unknown>) => void;
  striker?: Player;
  nonStriker?: Player;
  bowlingTeam: Player[];
}) {
  const [wicketType, setWicketType] = useState<WicketType>("BOWLED");
  const [dismissedId, setDismissedId] = useState<string>(striker?.id ?? "");
  const [fielderId, setFielderId] = useState<string>("");
  const [runs, setRuns] = useState(0);
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 300,
      background: "rgba(0,0,0,.75)", backdropFilter: "blur(6px)",
      display: "grid", placeItems: "center", padding: "1rem",
    }} onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div style={{
        background: "#061428", border: "1px solid rgba(176,30,30,.5)",
        borderRadius: ".9rem", padding: "1.5rem",
        width: "100%", maxWidth: 480,
      }}>
        <h3 style={{ margin: "0 0 1.25rem", fontSize: "1.15rem", color: "#ff8b8b" }}>Record Wicket</h3>
        <div style={{ marginBottom: ".9rem" }}>
          <label style={{ display: "block", fontSize: ".78rem", color: "rgba(238,244,251,.75)", marginBottom: ".35rem" }}>Wicket type</label>
          <select value={wicketType} onChange={(e) => setWicketType(e.target.value as WicketType)}
            style={{ width: "100%", padding: ".6rem .75rem", background: "#0a1f3d", border: "1px solid rgba(255,255,255,.15)", borderRadius: ".5rem", color: "#eef4fb", fontFamily: "inherit", colorScheme: "dark" }}>
            {["BOWLED","CAUGHT","LBW","RUN_OUT","STUMPED","HIT_WICKET","RETIRED"].map((w) => <option key={w} value={w}>{w.replace(/_/g, " ")}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: ".9rem" }}>
          <label style={{ display: "block", fontSize: ".78rem", color: "rgba(238,244,251,.75)", marginBottom: ".35rem" }}>Dismissed batter</label>
          <select value={dismissedId} onChange={(e) => setDismissedId(e.target.value)}
            style={{ width: "100%", padding: ".6rem .75rem", background: "#0a1f3d", border: "1px solid rgba(255,255,255,.15)", borderRadius: ".5rem", color: "#eef4fb", fontFamily: "inherit", colorScheme: "dark" }}>
            {striker && <option value={striker.id}>{striker.name} (striker)</option>}
            {nonStriker && <option value={nonStriker.id}>{nonStriker.name} (non-striker)</option>}
          </select>
        </div>
        <div style={{ marginBottom: ".9rem" }}>
          <label style={{ display: "block", fontSize: ".78rem", color: "rgba(238,244,251,.75)", marginBottom: ".35rem" }}>Runs completed before wicket</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: ".4rem" }}>
            {[0,1,2,3].map((r) => (
              <button key={r} type="button" onClick={() => setRuns(r)} className="btn"
                style={{ background: runs === r ? "#f0b429" : "rgba(255,255,255,.06)", color: runs === r ? "#061428" : "#eef4fb" }}>{r}</button>
            ))}
          </div>
        </div>
        {(wicketType === "CAUGHT" || wicketType === "RUN_OUT" || wicketType === "STUMPED") && (
          <div style={{ marginBottom: ".9rem" }}>
            <label style={{ display: "block", fontSize: ".78rem", color: "rgba(238,244,251,.75)", marginBottom: ".35rem" }}>Fielder / keeper (optional)</label>
            <select value={fielderId} onChange={(e) => setFielderId(e.target.value)}
              style={{ width: "100%", padding: ".6rem .75rem", background: "#0a1f3d", border: "1px solid rgba(255,255,255,.15)", borderRadius: ".5rem", color: "#eef4fb", fontFamily: "inherit", colorScheme: "dark" }}>
              <option value="">-- Select --</option>
              {bowlingTeam.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        )}
        <div style={{ display: "flex", gap: ".5rem", justifyContent: "flex-end", marginTop: "1rem" }}>
          <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
          <button className="btn" style={{ background: "#b01e1e", color: "#fff" }}
            onClick={() => onConfirm({
              runs,
              isWicket: true,
              wicketType,
              dismissedPlayerId: dismissedId || null,
              fielderId: fielderId || null,
            })}>
            Record Wicket
          </button>
        </div>
      </div>
    </div>
  );
}