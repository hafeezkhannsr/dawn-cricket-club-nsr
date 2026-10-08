"use client";
import { useState } from "react";
type PlayerInput = { id: string; name: string };
function newPlayer(): PlayerInput {
  return { id: Math.random().toString(36).slice(2, 8), name: "" };
}
export default function MatchCreator({ onCreated, onCancel }: { onCreated: () => void; onCancel: () => void }) {
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [matchDate, setMatchDate] = useState(new Date().toISOString().slice(0, 10));
  const [overs, setOvers] = useState(20);
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [aPlayers, setAPlayers] = useState<PlayerInput[]>([newPlayer(), newPlayer()]);
  const [bPlayers, setBPlayers] = useState<PlayerInput[]>([newPlayer(), newPlayer()]);
  const [tossWinner, setTossWinner] = useState<"A" | "B">("A");
  const [tossDecision, setTossDecision] = useState<"BAT" | "BOWL">("BAT");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  function updatePlayer(side: "A" | "B", idx: number, name: string) {
    const fn = side === "A" ? setAPlayers : setBPlayers;
    fn((prev) => prev.map((p, i) => i === idx ? { ...p, name } : p));
  }
  function addPlayer(side: "A" | "B") {
    const fn = side === "A" ? setAPlayers : setBPlayers;
    fn((prev) => prev.length >= 11 ? prev : [...prev, newPlayer()]);
  }
  function removePlayer(side: "A" | "B", idx: number) {
    const fn = side === "A" ? setAPlayers : setBPlayers;
    fn((prev) => prev.length <= 2 ? prev : prev.filter((_, i) => i !== idx));
  }
  async function submit() {
    setErr(null);
    const cleanA = aPlayers.filter((p) => p.name.trim());
    const cleanB = bPlayers.filter((p) => p.name.trim());
    if (!title.trim()) { setErr("Match title required"); return; }
    if (!venue.trim()) { setErr("Venue required"); return; }
    if (!teamAName.trim() || !teamBName.trim()) { setErr("Both team names required"); return; }
    if (cleanA.length < 2 || cleanB.length < 2) { setErr("Each team needs at least 2 players"); return; }
    setBusy(true);
    try {
      const res = await fetch("/api/v1/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, venue, matchDate, oversPerInnings: overs,
          teamAName, teamAPlayers: cleanA,
          teamBName, teamBPlayers: cleanB,
          tossWinnerId: tossWinner, tossDecision,
        }),
      });
      const j = await res.json();
      if (!j.ok) { setErr(j.error || "Failed"); setBusy(false); return; }
      onCreated();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
    }
    setBusy(false);
  }
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: ".65rem .8rem",
    background: "#0a1f3d", border: "1px solid rgba(255,255,255,.15)",
    borderRadius: ".55rem", color: "#eef4fb", fontSize: ".88rem",
    fontFamily: "inherit", outline: "none",
  };
  const label: React.CSSProperties = { fontSize: ".78rem", fontWeight: 600, color: "rgba(238,244,251,.85)", marginBottom: ".3rem", display: "block" };
  return (
    <div style={{
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(240,180,41,.35)",
      borderRadius: ".9rem",
      padding: "1.25rem",
      marginBottom: "1.5rem",
    }}>
      <h2 style={{ margin: "0 0 1rem", fontSize: "1.1rem", fontWeight: 800 }}>Create Match</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem", marginBottom: ".75rem" }}>
        <div><label style={label}>Match title *</label><input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="DAWN vs Young Stars" /></div>
        <div><label style={label}>Venue *</label><input style={inputStyle} value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="DAWN Ground, Nowshera" /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem", marginBottom: "1rem" }}>
        <div><label style={label}>Match date</label><input type="date" style={inputStyle} value={matchDate} onChange={(e) => setMatchDate(e.target.value)} /></div>
        <div><label style={label}>Overs per innings</label><input type="number" min={1} max={50} style={inputStyle} value={overs} onChange={(e) => setOvers(Number(e.target.value))} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <TeamEditor side="A" name={teamAName} setName={setTeamAName} players={aPlayers} update={updatePlayer} add={addPlayer} remove={removePlayer} label={label} inputStyle={inputStyle} />
        <TeamEditor side="B" name={teamBName} setName={setTeamBName} players={bPlayers} update={updatePlayer} add={addPlayer} remove={removePlayer} label={label} inputStyle={inputStyle} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem", marginBottom: "1rem" }}>
        <div>
          <label style={label}>Toss winner</label>
          <div style={{ display: "flex", gap: ".4rem" }}>
            <button type="button" onClick={() => setTossWinner("A")} className="btn" style={{ flex: 1, background: tossWinner === "A" ? "#f0b429" : "rgba(255,255,255,.06)", color: tossWinner === "A" ? "#061428" : "#eef4fb" }}>{teamAName || "Team A"}</button>
            <button type="button" onClick={() => setTossWinner("B")} className="btn" style={{ flex: 1, background: tossWinner === "B" ? "#f0b429" : "rgba(255,255,255,.06)", color: tossWinner === "B" ? "#061428" : "#eef4fb" }}>{teamBName || "Team B"}</button>
          </div>
        </div>
        <div>
          <label style={label}>Decision</label>
          <div style={{ display: "flex", gap: ".4rem" }}>
            <button type="button" onClick={() => setTossDecision("BAT")} className="btn" style={{ flex: 1, background: tossDecision === "BAT" ? "#14a44d" : "rgba(255,255,255,.06)", color: "#fff" }}>Bat</button>
            <button type="button" onClick={() => setTossDecision("BOWL")} className="btn" style={{ flex: 1, background: tossDecision === "BOWL" ? "#14a44d" : "rgba(255,255,255,.06)", color: "#fff" }}>Bowl</button>
          </div>
        </div>
      </div>
      {err && (
        <div style={{ padding: ".7rem 1rem", marginBottom: "1rem", background: "rgba(255,80,80,.12)", border: "1px solid rgba(255,80,80,.4)", borderRadius: ".55rem", color: "#ff8b8b", fontSize: ".85rem" }}>
          {err}
        </div>
      )}
      <div style={{ display: "flex", gap: ".6rem", justifyContent: "flex-end" }}>
        <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
        <button className="btn btn-gold" onClick={submit} disabled={busy} style={{ opacity: busy ? .7 : 1 }}>
          {busy ? "Creating…" : "Create & Start"}
        </button>
      </div>
    </div>
  );
}
function TeamEditor(props: {
  side: "A" | "B";
  name: string;
  setName: (v: string) => void;
  players: { id: string; name: string }[];
  update: (side: "A" | "B", idx: number, name: string) => void;
  add: (side: "A" | "B") => void;
  remove: (side: "A" | "B", idx: number) => void;
  label: React.CSSProperties;
  inputStyle: React.CSSProperties;
}) {
  const { side, name, setName, players, update, add, remove, label, inputStyle } = props;
  return (
    <div style={{ padding: ".9rem", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".7rem" }}>
      <label style={label}>Team {side} name *</label>
      <input style={{ ...inputStyle, marginBottom: ".75rem" }} value={name} onChange={(e) => setName(e.target.value)} placeholder={side === "A" ? "DAWN Cricket Club" : "Young Stars CC"} />
      <label style={label}>Players ({players.length}/11)</label>
      <div style={{ display: "flex", flexDirection: "column", gap: ".35rem", maxHeight: 260, overflowY: "auto" }}>
        {players.map((p, i) => (
          <div key={p.id} style={{ display: "flex", gap: ".35rem" }}>
            <input style={{ ...inputStyle, padding: ".45rem .6rem", fontSize: ".82rem" }} value={p.name}
              onChange={(e) => update(side, i, e.target.value)} placeholder={`Player ${i + 1}`} />
            <button type="button" onClick={() => remove(side, i)} disabled={players.length <= 2}
              style={{ background: "rgba(255,80,80,.15)", border: "1px solid rgba(255,80,80,.4)", color: "#ff8b8b", borderRadius: ".4rem", width: 32, cursor: players.length <= 2 ? "not-allowed" : "pointer", opacity: players.length <= 2 ? .4 : 1 }}>✕</button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => add(side)} disabled={players.length >= 11}
        className="btn btn-outline" style={{ marginTop: ".5rem", width: "100%", fontSize: ".8rem", padding: ".45rem", opacity: players.length >= 11 ? .4 : 1 }}>
        + Add player
      </button>
    </div>
  );
}