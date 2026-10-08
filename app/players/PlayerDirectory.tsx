"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
type DirPlayer = {
  id: string;
  registrationNumber: string;
  name: string;
  ageCategory: string;
  playingRole: string;
  battingStyle: string;
  bowlingStyle: string;
  ballType: string;
  playerCategory: string;
  city: string;
  village: string;
};
const ROLES = ["Batter", "Bowler", "All-rounder", "Wicket-keeper"];
const AGES = ["U13", "U15", "U17", "U19", "Emerging", "Senior", "Veteran"];
export default function PlayerDirectory() {
  const [items, setItems] = useState<DirPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [role, setRole] = useState("");
  const [cat, setCat] = useState("");
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (role) params.set("role", role);
      if (cat) params.set("category", cat);
      const res = await fetch(`/api/v1/players?${params}`, { cache: "no-store" });
      const j = await res.json();
      if (j.ok) setItems(j.items);
    } catch {}
    setLoading(false);
  }, [q, role, cat]);
  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);
  return (
    <>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: ".6rem",
        marginBottom: "1.25rem",
      }}>
        <div className="dir-filters">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, father name, city or registration #"
            style={{
              padding: ".7rem .9rem",
              background: "#0a1f3d",
              border: "1px solid rgba(255,255,255,.14)",
              borderRadius: ".6rem",
              color: "#eef4fb",
              fontSize: ".92rem",
              fontFamily: "inherit",
              outline: "none",
              width: "100%",
            }}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              padding: ".7rem .9rem",
              background: "#0a1f3d",
              border: "1px solid rgba(255,255,255,.14)",
              borderRadius: ".6rem",
              color: "#eef4fb",
              fontSize: ".92rem",
              fontFamily: "inherit",
              outline: "none",
              colorScheme: "dark",
              cursor: "pointer",
            }}
          >
            <option value="">All roles</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            style={{
              padding: ".7rem .9rem",
              background: "#0a1f3d",
              border: "1px solid rgba(255,255,255,.14)",
              borderRadius: ".6rem",
              color: "#eef4fb",
              fontSize: ".92rem",
              fontFamily: "inherit",
              outline: "none",
              colorScheme: "dark",
              cursor: "pointer",
            }}
          >
            <option value="">All categories</option>
            {AGES.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>
      {loading ? (
        <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>Loading players…</div>
      ) : items.length === 0 ? (
        <div style={{
          padding: "3rem 1.5rem", textAlign: "center",
          background: "rgba(255,255,255,.02)",
          border: "1px dashed rgba(255,255,255,.12)",
          borderRadius: ".9rem",
          color: "rgba(238,244,251,.6)",
        }}>
          {q || role || cat
            ? "No players match your filters."
            : "No approved players with public consent yet."}
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1rem",
        }}>
          {items.map((p) => (
            <Link
              key={p.id}
              href={`/verify/${p.id}`}
              style={{
                display: "flex", flexDirection: "column", gap: ".5rem",
                padding: "1.1rem",
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: ".75rem",
                textDecoration: "none", color: "inherit",
                transition: "all .15s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 999,
                  background: "linear-gradient(135deg, #f0b429, #cb6e17)",
                  color: "#061428", fontWeight: 900,
                  display: "grid", placeItems: "center",
                  fontSize: "1rem", flexShrink: 0,
                }}>
                  {p.name.split(" ").map((x) => x[0]).slice(0, 2).join("").toUpperCase()}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 800, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", fontFamily: "monospace" }}>
                    {p.registrationNumber}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: ".35rem", flexWrap: "wrap" }}>
                {p.playingRole && <Badge>{p.playingRole}</Badge>}
                {p.ageCategory && <Badge gold>{p.ageCategory}</Badge>}
                {p.ballType && <Badge>{p.ballType}</Badge>}
              </div>
              <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.6)", marginTop: "auto" }}>
                {p.village || p.city || "—"} · {p.battingStyle}
              </div>
              <div style={{ fontSize: ".72rem", color: "#f0b429", fontWeight: 700, marginTop: ".25rem" }}>
                View profile →
              </div>
            </Link>
          ))}
        </div>
      )}
      <style>{`
        .dir-filters {
          display: grid;
          grid-template-columns: 1fr;
          gap: .6rem;
        }
        @media (min-width: 640px) {
          .dir-filters { grid-template-columns: 2fr 1fr 1fr; }
        }
      `}</style>
    </>
  );
}
function Badge({ children, gold }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <span style={{
      fontSize: ".68rem", fontWeight: 700,
      padding: ".2rem .5rem", borderRadius: ".35rem",
      background: gold ? "rgba(240,180,41,.15)" : "rgba(255,255,255,.06)",
      color: gold ? "#f0b429" : "rgba(238,244,251,.85)",
      border: gold ? "1px solid rgba(240,180,41,.3)" : "1px solid rgba(255,255,255,.1)",
    }}>{children}</span>
  );
}