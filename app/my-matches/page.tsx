"use client";
import { useState, useEffect } from "react";
interface Match {
    ID: string;
    TeamA: string;
    TeamB: string;
    Format: string;
    Overs: string;
    Venue: string;
    Date: string;
    Time: string;
    Status: string;
    Result: string;
}
export default function MyMatchesPage() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("/api/v1/matches/my-matches")
            .then((r) => r.json())
            .then((data) => {
                if (data.ok) setMatches(data.matches || []);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);
    const statusColor = (status: string) => {
        if (status === "live") return "#ef4444";
        if (status === "completed") return "#22c55e";
        if (status === "cancelled") return "#6b7280";
        return "#f0b429";
    };
    return (
        <div style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <div>
                        <a href="/dashboard" style={{ color: "#f0b429", textDecoration: "none", fontSize: ".9rem" }}>
                            ← Back to Dashboard
                        </a>
                        <h1 style={{ fontSize: "2rem", margin: "1rem 0 0 0" }}>My Matches</h1>
                        <p style={{ color: "#94a3b8", margin: "0.25rem 0 0 0" }}>
                            Aapke banaye hue matches
                        </p>
                    </div>
                    <a
                        href="/create-match"
                        style={{
                            padding: "0.75rem 1.5rem",
                            background: "#f0b429",
                            color: "#030a18",
                            textDecoration: "none",
                            borderRadius: ".5rem",
                            fontWeight: 700,
                        }}
                    >
                        + New Match
                    </a>
                </div>
                {loading ? (
                    <p style={{ textAlign: "center", color: "#94a3b8" }}>Loading...</p>
                ) : matches.length === 0 ? (
                    <div
                        style={{
                            padding: "3rem",
                            textAlign: "center",
                            background: "rgba(255,255,255,.03)",
                            border: "1px solid rgba(255,255,255,.08)",
                            borderRadius: "1rem",
                        }}
                    >
                        <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>
                            Abhi tak koi match nahi banaya
                        </p>
                        <a
                            href="/create-match"
                            style={{
                                color: "#f0b429",
                                textDecoration: "none",
                                fontWeight: 600,
                            }}
                        >
                            Pehla match banayein →
                        </a>
                    </div>
                ) : (
                    <div style={{ display: "grid", gap: "1rem" }}>
                        {matches.map((m) => (
                            <div
                                key={m.ID}
                                style={{
                                    padding: "1.5rem",
                                    background: "rgba(255,255,255,.03)",
                                    border: "1px solid rgba(255,255,255,.08)",
                                    borderRadius: ".75rem",
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: "1.25rem" }}>
                                            {m.TeamA} <span style={{ color: "#f0b429" }}>vs</span> {m.TeamB}
                                        </h3>
                                        <p style={{ color: "#94a3b8", margin: ".5rem 0 0 0", fontSize: ".9rem" }}>
                                            {m.Format} • {m.Overs} overs • {m.Venue}
                                        </p>
                                        <p style={{ color: "#64748b", margin: ".25rem 0 0 0", fontSize: ".85rem" }}>
                                            {m.Date} {m.Time && `• ${m.Time}`}
                                        </p>
                                    </div>
                                    <span
                                        style={{
                                            padding: ".35rem .75rem",
                                            borderRadius: "999px",
                                            background: statusColor(m.Status) + "22",
                                            color: statusColor(m.Status),
                                            fontSize: ".75rem",
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        {m.Status || "upcoming"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
