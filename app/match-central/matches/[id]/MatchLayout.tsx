"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Match, Tournament } from "@/lib/data/tournament-types";
const TABS = [
  { key: "scorecard", label: "Scorecard", href: "scorecard" },
  { key: "ball-by-ball", label: "Ball by Ball", href: "ball-by-ball" },
  { key: "squad", label: "Squad", href: "squad" },
  { key: "stats", label: "Stats", href: "stats" },
  { key: "mvp", label: "MVP", href: "mvp" },
];
export default function MatchLayout({ match, tournament }: { match: Match; tournament: Tournament }) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const active = parts[parts.length - 1] === match.id ? "scorecard" : parts[parts.length - 1];
  return (
    <>
      <div style={{ background: "rgba(0,0,0,.2)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div className="container" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <Link href={"/match-central/tournaments/" + tournament.id + "/overview"} style={{ color: "inherit" }}>{tournament.shortName}</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>{match.matchNumber}</span>
          </nav>
        </div>
      </div>
      <div style={{ background: "rgba(0,0,0,.25)", borderBottom: "1px solid rgba(255,255,255,.08)", position: "sticky", top: 68, zIndex: 40, overflowX: "auto" }}>
        <div className="container" style={{ display: "flex" }}>
          {TABS.map((t) => {
            const isActive = active === t.key;
            return (
              <Link key={t.key} href={"/match-central/matches/" + match.id + "/" + t.href} style={{ padding: "1rem 1.15rem", fontSize: ".88rem", fontWeight: isActive ? 800 : 600, color: isActive ? "#86efac" : "rgba(238,244,251,.7)", borderBottom: isActive ? "3px solid #14a44d" : "3px solid transparent", textDecoration: "none", whiteSpace: "nowrap" }}>{t.label}</Link>
            );
          })}
        </div>
      </div>
    </>
  );
}