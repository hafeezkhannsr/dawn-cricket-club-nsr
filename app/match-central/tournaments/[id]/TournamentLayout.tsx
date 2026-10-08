"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Tournament } from "@/lib/data/tournament-types";
const TABS = [
  { key: "overview", label: "Overview", href: "overview" },
  { key: "matches", label: "Matches", href: "matches" },
  { key: "squads", label: "Squads", href: "squads" },
  { key: "leaderboard", label: "Leaderboard", href: "leaderboard" },
  { key: "boundaries", label: "Boundaries", href: "boundaries" },
  { key: "awards", label: "Awards", href: "awards" },
];
export default function TournamentLayout({ tournament }: { tournament: Tournament }) {
  const pathname = usePathname();
  const activeTab = pathname.split("/").pop() || "overview";
  return (
    <>
      {/* Header green band */}
      <div style={{
        background: "linear-gradient(135deg, rgba(15,138,62,.15), rgba(20,164,77,.08))",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}>
        <div className="container" style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}>
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link>
            {" · "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link>
            {" · "}
            <Link href="/match-central/tournaments" style={{ color: "inherit" }}>Tournaments</Link>
            {" · "}
            <span style={{ color: "#86efac" }}>{tournament.shortName}</span>
          </nav>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flex: 1, minWidth: 0 }}>
              <div style={{
                width: 72, height: 72, borderRadius: "1rem",
                background: "linear-gradient(135deg, #14a44d, #0f8a3e)",
                display: "grid", placeItems: "center",
                fontSize: "2rem", flexShrink: 0,
              }}>🏏</div>
              <div style={{ minWidth: 0 }}>
                <h1 style={{ margin: 0, fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 900, lineHeight: 1.2 }}>
                  {tournament.name}
                </h1>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: ".5rem", fontSize: ".85rem", color: "rgba(238,244,251,.7)" }}>
                  <span>📅 {new Date(tournament.startDate).toLocaleDateString()} — {new Date(tournament.endDate).toLocaleDateString()}</span>
                  {tournament.status === "LIVE" && (
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: ".35rem",
                      padding: ".2rem .6rem", borderRadius: ".4rem",
                      background: "rgba(20,164,77,.2)", border: "1px solid rgba(20,164,77,.5)",
                      color: "#86efac", fontWeight: 700, fontSize: ".72rem",
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: 999, background: "#14a44d", animation: "livePulse 1.6s ease-in-out infinite" }} />
                      ONGOING
                    </span>
                  )}
                  {tournament.status === "UPCOMING" && (
                    <span style={{
                      padding: ".2rem .6rem", borderRadius: ".4rem",
                      background: "rgba(147,197,253,.15)", border: "1px solid rgba(147,197,253,.5)",
                      color: "#93c5fd", fontWeight: 700, fontSize: ".72rem",
                    }}>UPCOMING</span>
                  )}
                  {tournament.status === "REGISTRATION_OPEN" && (
                    <span style={{
                      padding: ".2rem .6rem", borderRadius: ".4rem",
                      background: "rgba(240,180,41,.2)", border: "1px solid rgba(240,180,41,.5)",
                      color: "#f0b429", fontWeight: 700, fontSize: ".72rem",
                    }}>REGISTRATION OPEN</span>
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{
                padding: ".35rem .75rem", borderRadius: ".5rem",
                background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
                fontSize: ".75rem", color: "rgba(238,244,251,.8)",
              }}>
                👥 <b style={{ color: "#fff" }}>{tournament.followers.toLocaleString()}</b> Followers
              </span>
              <button className="btn btn-primary" style={{ padding: ".45rem 1rem", fontSize: ".82rem" }}>
                FOLLOW
              </button>
            </div>
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
        <div className="container" style={{ display: "flex", gap: 0, paddingTop: 0, paddingBottom: 0 }}>
          {TABS.map((t) => {
            const isActive = activeTab === t.href || (activeTab === tournament.id && t.key === "overview");
            return (
              <Link
                key={t.key}
                href={`/match-central/tournaments/${tournament.id}/${t.href}`}
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