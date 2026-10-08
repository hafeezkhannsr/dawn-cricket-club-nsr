"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Match, Tournament } from "@/lib/data/tournament-types";
const TABS = [
  { key: "scorecard", label: "Scorecard" },
  { key: "ball-by-ball", label: "Ball by Ball" },
  { key: "squad", label: "Squad" },
  { key: "stats", label: "Stats" },
  { key: "mvp", label: "MVP" },
];
export default function MatchLayout({ match, tournament }: { match: Match; tournament: Tournament }) {
  const pathname = usePathname();
  const active = pathname.split("/").pop() || "scorecard";
  return (
    <>
      {/* Top band with breadcrumb + share */}
      <div style={{
        background: "rgba(0,0,0,.2)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}>
        <div className="container" style={{ paddingTop: "1rem", paddingBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link>
            {" · "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link>
            {" · "}
            <Link href={`/match-central/tournaments/${tournament.id}/overview`} style={{ color: "inherit" }}>
              {tournament.shortName}
            </Link>
            {" · "}
            <span style={{ color: "#f0b429" }}>{match.matchNumber}</span>
          </nav>
          <div style={{ display: "flex", gap: ".4rem" }}>
            {["FB", "X", "in", "WA"].map((s) => (
              <span key={s} style={{
                padding: ".3rem .6rem",
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: ".35rem",
                fontSize: ".68rem",
                color: "rgba(238,244,251,.75)",
                fontWeight: 700,
                cursor: "pointer",
              }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
      {/* Tabs bar */}
      <div style={{
        background: "rgba(0,0,0,.25)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        position: "sticky", top: 68, zIndex: 40,
        overflowX: "auto",
      }}>
        <div className="container" style={{ display: "flex" }}>
          {TABS.map((t) => {
            const isActive = active === t.key || (t.key === "scorecard" && active === match.id);
            return (
              <Link
                key={t.key}
                href={`/match-central/matches/${match.id}/${t.key}`}
                style={{
                  padding: "1rem 1.15rem",
                  fontSize: ".88rem",
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? "#86efac" : "rgba(238,244,251,.7)",
                  borderBottom: isActive ? "3px solid #14a44d" : "3px solid transparent",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}