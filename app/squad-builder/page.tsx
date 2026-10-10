"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
interface Player {
    ID: string;
    Name: string;
    Role: string;
    TeamID: string;
}
interface SelectedPlayer {
    id: string;
    name: string;
    role: string;
    isCaptain: boolean;
    isWicketKeeper: boolean;
}
function SquadBuilderContent() {
    const searchParams = useSearchParams();
    const matchId = searchParams.get("matchId") || "";
    const teamName = searchParams.get("team") || "";
    const [players, setPlayers] = useState<Player[]>([]);
    const [selected, setSelected] = useState<SelectedPlayer[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    useEffect(() => {
        fetch("/api/v1/players")
            .then((r) => r.json())
            .then((data) => {
                if (data.ok) setPlayers(data.players || []);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);
    const togglePlayer = (player: Player) => {
        const exists = selected.find((p) => p.id === player.ID);
        if (exists) {
            setSelected(selected.filter((p) => p.id !== player.ID));
        } else {
            if (selected.length >= 11) {
                setMessage({ type: "error", text: "Playing XI already full (11 players)" });
                return;
            }
            setSelected([
                ...selected,
                {
                    id: player.ID,
                    name: player.Name,
                    role: player.Role || "Player",
                    isCaptain: false,
                    isWicketKeeper: false,
                },
            ]);
        }
    };
    const toggleCaptain = (playerId: string) => {
        setSelected(
            selected.map((p) => ({
                ...p,
                isCaptain: p.id === playerId ? !p.isCaptain : false,
            }))
        );
    };
    const toggleWicketKeeper = (playerId: string) => {
        setSelected(
            selected.map((p) => ({
                ...p,
                isWicketKeeper: p.id === playerId ? !p.isWicketKeeper : false,
            }))
        );
    };
    const saveSquad = async () => {
        if (selected.length !== 11) {
            setMessage({ type: "error", text: "Please select exactly 11 players" });
            return;
        }
        setSaving(true);
        try {
            const res = await fetch("/api/v1/matches/squad-save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    matchId,
                    teamName,
                    players: selected,
                }),
            });
            const data = await res.json();
            if (data.ok) {
                setMessage({ type: "success", text: "Squad saved successfully!" });
                setTimeout(() => {
                    window.location.href = "/my-matches";
                }, 1500);
            } else {
                setMessage({ type: "error", text: data.message || "Failed" });
            }
        } catch {
            setMessage({ type: "error", text: "Network error" });
        } finally {
            setSaving(false);
        }
    };
    return (
        <div style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <a href="/my-matches" style={{ color: "#f0b429", textDecoration: "none", fontSize: ".9rem" }}>
                    ← Back to My Matches
                </a>
                <h1 style={{ fontSize: "2rem", margin: "1rem 0 0.5rem 0" }}>Squad Builder</h1>
                <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>
                    {teamName} ka Playing XI select karein (11 players)
                </p>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
                    <div style={{ padding: ".5rem 1rem", background: selected.length === 11 ? "rgba(34,197,94,.15)" : "rgba(240,180,41,.15)", border: `1px solid ${selected.length === 11 ? "rgba(34,197,94,.3)" : "rgba(240,180,41,.3)"}`, borderRadius: ".5rem", fontWeight: 700, color: selected.length === 11 ? "#4ade80" : "#f0b429" }}>
                        Selected: {selected.length} / 11
                    </div>
                </div>
                {message.text && (
                    <div style={{ padding: "1rem", marginBottom: "1rem", borderRadius: ".5rem", background: message.type === "success" ? "rgba(34,197,94,.15)" : "rgba(220,38,38,.15)", border: `1px solid ${message.type === "success" ? "rgba(34,197,94,.3)" : "rgba(220,38,38,.3)"}`, color: message.type === "success" ? "#4ade80" : "#f87171" }}>
                        {message.text}
                    </div>
                )}
                {loading ? (
                    <p style={{ textAlign: "center", color: "#94a3b8" }}>Loading players...</p>
                ) : players.length === 0 ? (
                    <div style={{ padding: "3rem", textAlign: "center", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "1rem" }}>
                        <p style={{ color: "#94a3b8" }}>Abhi tak koi player nahi hai.</p>
                        <p style={{ color: "#64748b", fontSize: ".9rem" }}>Pehle Players sheet mein players add karein.</p>
                    </div>
                ) : (
                    <>
                        <div style={{ display: "grid", gap: ".75rem", marginBottom: "2rem" }}>
                            {players.map((player) => {
                                const sel = selected.find((p) => p.id === player.ID);
                                return (
                                    <div
                                        key={player.ID}
                                        style={{
                                            padding: "1rem",
                                            background: sel ? "rgba(240,180,41,.08)" : "rgba(255,255,255,.03)",
                                            border: sel ? "1px solid rgba(240,180,41,.4)" : "1px solid rgba(255,255,255,.08)",
                                            borderRadius: ".5rem",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                            gap: "1rem",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                            <input
                                                type="checkbox"
                                                checked={!!sel}
                                                onChange={() => togglePlayer(player)}
                                                style={{ width: 20, height: 20, cursor: "pointer" }}
                                            />
                                            <div>
                                                <div style={{ fontWeight: 600 }}>
                                                    {player.Name}
                                                    {sel?.isCaptain && <span style={{ color: "#f0b429", marginLeft: ".5rem", fontSize: ".8rem" }}>(C)</span>}
                                                    {sel?.isWicketKeeper && <span style={{ color: "#22c55e", marginLeft: ".5rem", fontSize: ".8rem" }}>(WK)</span>}
                                                </div>
                                                <div style={{ color: "#94a3b8", fontSize: ".85rem" }}>{player.Role || "Player"}</div>
                                            </div>
                                        </div>
                                        {sel && (
                                            <div style={{ display: "flex", gap: ".5rem" }}>
                                                <button
                                                    onClick={() => toggleCaptain(player.ID)}
                                                    style={{
                                                        padding: ".35rem .75rem",
                                                        background: sel.isCaptain ? "#f0b429" : "rgba(255,255,255,.1)",
                                                        color: sel.isCaptain ? "#030a18" : "#fff",
                                                        border: "none",
                                                        borderRadius: ".35rem",
                                                        fontSize: ".75rem",
                                                        fontWeight: 700,
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    C
                                                </button>
                                                <button
                                                    onClick={() => toggleWicketKeeper(player.ID)}
                                                    style={{
                                                        padding: ".35rem .75rem",
                                                        background: sel.isWicketKeeper ? "#22c55e" : "rgba(255,255,255,.1)",
                                                        color: sel.isWicketKeeper ? "#030a18" : "#fff",
                                                        border: "none",
                                                        borderRadius: ".35rem",
                                                        fontSize: ".75rem",
                                                        fontWeight: 700,
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    WK
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <button
                            onClick={saveSquad}
                            disabled={saving || selected.length !== 11}
                            style={{
                                width: "100%",
                                padding: "1rem",
                                background: selected.length === 11 ? "#f0b429" : "#666",
                                color: "#030a18",
                                border: "none",
                                borderRadius: ".5rem",
                                fontSize: "1rem",
                                fontWeight: 700,
                                cursor: selected.length === 11 && !saving ? "pointer" : "not-allowed",
                            }}
                        >
                            {saving ? "Saving..." : "Save Squad"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
export default function SquadBuilderPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem" }}>Loading...</div>}>
            <SquadBuilderContent />
        </Suspense>
    );
}
