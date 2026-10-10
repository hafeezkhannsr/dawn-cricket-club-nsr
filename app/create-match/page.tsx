"use client";
import { useState, useEffect } from "react";
interface Team {
    ID: string;
    TeamName: string;
}
export default function CreateMatchPage() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [formData, setFormData] = useState({
        teamA: "",
        teamB: "",
        format: "T20",
        overs: 20,
        venue: "",
        date: new Date().toISOString().split("T")[0],
        time: "10:00",
    });
    useEffect(() => {
        fetch("/api/v1/teams")
            .then((r) => r.json())
            .then((data) => {
                if (data.ok) setTeams(data.teams || []);
            })
            .catch(() => {});
    }, []);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });
        try {
            const res = await fetch("/api/v1/matches/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.ok) {
                setMessage({ type: "success", text: "Match created successfully!" });
                setTimeout(() => {
                    window.location.href = "/my-matches";
                }, 1500);
            } else {
                setMessage({ type: "error", text: data.message || "Failed" });
            }
        } catch (err) {
            setMessage({ type: "error", text: "Network error" });
        } finally {
            setLoading(false);
        }
    };
    const inputStyle = {
        width: "100%",
        padding: "0.75rem",
        background: "rgba(255,255,255,.05)",
        border: "1px solid rgba(255,255,255,.15)",
        borderRadius: ".5rem",
        color: "#fff",
        fontSize: "1rem",
        outline: "none",
    };
    const labelStyle = {
        display: "block",
        marginBottom: ".5rem",
        fontSize: ".9rem",
        color: "#94a3b8",
        fontWeight: 500,
    };
    return (
        <div style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem" }}>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
                <a href="/dashboard" style={{ color: "#f0b429", textDecoration: "none", fontSize: ".9rem" }}>
                    ← Back to Dashboard
                </a>
                <h1 style={{ fontSize: "2rem", margin: "1rem 0 0.5rem 0" }}>Create Match</h1>
                <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
                    Naya cricket match banayein
                </p>
                {message.text && (
                    <div
                        style={{
                            padding: "1rem",
                            marginBottom: "1rem",
                            borderRadius: ".5rem",
                            background: message.type === "success" ? "rgba(34,197,94,.15)" : "rgba(220,38,38,.15)",
                            border: message.type === "success" ? "1px solid rgba(34,197,94,.3)" : "1px solid rgba(220,38,38,.3)",
                            color: message.type === "success" ? "#4ade80" : "#f87171",
                        }}
                    >
                        {message.text}
                    </div>
                )}
                <form
                    onSubmit={handleSubmit}
                    style={{
                        background: "rgba(255,255,255,.03)",
                        border: "1px solid rgba(255,255,255,.08)",
                        borderRadius: "1rem",
                        padding: "2rem",
                    }}
                >
                    {/* Teams */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                        <div>
                            <label style={labelStyle}>Team A *</label>
                            <select
                                style={inputStyle}
                                value={formData.teamA}
                                onChange={(e) => setFormData({ ...formData, teamA: e.target.value })}
                                required
                            >
                                <option value="">-- Select --</option>
                                {teams.map((t) => (
                                    <option key={t.ID} value={t.TeamName} style={{ background: "#0a1628" }}>
                                        {t.TeamName}
                                    </option>
                                ))}
                                <option value="Team A" style={{ background: "#0a1628" }}>Team A (Demo)</option>
                                <option value="Team B" style={{ background: "#0a1628" }}>Team B (Demo)</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Team B *</label>
                            <select
                                style={inputStyle}
                                value={formData.teamB}
                                onChange={(e) => setFormData({ ...formData, teamB: e.target.value })}
                                required
                            >
                                <option value="">-- Select --</option>
                                {teams.map((t) => (
                                    <option key={t.ID} value={t.TeamName} style={{ background: "#0a1628" }}>
                                        {t.TeamName}
                                    </option>
                                ))}
                                <option value="Team A" style={{ background: "#0a1628" }}>Team A (Demo)</option>
                                <option value="Team B" style={{ background: "#0a1628" }}>Team B (Demo)</option>
                            </select>
                        </div>
                    </div>
                    {/* Format & Overs */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                        <div>
                            <label style={labelStyle}>Format</label>
                            <select
                                style={inputStyle}
                                value={formData.format}
                                onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                            >
                                <option value="T20" style={{ background: "#0a1628" }}>T20</option>
                                <option value="ODI" style={{ background: "#0a1628" }}>ODI</option>
                                <option value="Test" style={{ background: "#0a1628" }}>Test</option>
                                <option value="T10" style={{ background: "#0a1628" }}>T10</option>
                                <option value="Custom" style={{ background: "#0a1628" }}>Custom</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Overs</label>
                            <input
                                type="number"
                                style={inputStyle}
                                value={formData.overs}
                                onChange={(e) => setFormData({ ...formData, overs: parseInt(e.target.value) || 20 })}
                                min={1}
                                max={200}
                            />
                        </div>
                    </div>
                    {/* Venue */}
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label style={labelStyle}>Venue *</label>
                        <input
                            type="text"
                            style={inputStyle}
                            value={formData.venue}
                            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                            placeholder="e.g., Nowshera Cricket Ground"
                            required
                        />
                    </div>
                    {/* Date & Time */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                        <div>
                            <label style={labelStyle}>Date *</label>
                            <input
                                type="date"
                                style={inputStyle}
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Time</label>
                            <input
                                type="time"
                                style={inputStyle}
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            />
                        </div>
                    </div>
                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "1rem",
                            background: loading ? "#666" : "#f0b429",
                            color: "#030a18",
                            border: "none",
                            borderRadius: ".5rem",
                            fontSize: "1rem",
                            fontWeight: 700,
                            cursor: loading ? "not-allowed" : "pointer",
                        }}
                    >
                        {loading ? "Creating..." : "Create Match"}
                    </button>
                </form>
            </div>
        </div>
    );
}
