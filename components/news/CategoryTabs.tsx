"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NEWS_CATEGORIES = [
  { slug: "dawn", name: "DAWN Cricket Club", accent: "#14a44d" },
  { slug: "dkk", name: "Dheri Katti Khel", accent: "#f0b429" },
  { slug: "nowshera", name: "Nowshera", accent: "#f0b429" },
  { slug: "kp", name: "Khyber Pakhtunkhwa", accent: "#f0b429" },
  { slug: "pakistan", name: "Pakistan Cricket", accent: "#0f8a3e" },
  { slug: "pcb", name: "PCB Official", accent: "#0f8a3e" },
  { slug: "psl", name: "PSL", accent: "#b01e1e" },
  { slug: "icc", name: "ICC", accent: "#1f4e8c" },
  { slug: "domestic", name: "Domestic Cricket", accent: "#f0b429" },
  { slug: "international", name: "International", accent: "#1f4e8c" },
  { slug: "women", name: "Women's Cricket", accent: "#e83e8c" },
  { slug: "youth", name: "Youth Cricket", accent: "#f0b429" },
  { slug: "school", name: "School Cricket", accent: "#14a44d" },
  { slug: "academy", name: "Academy", accent: "#14a44d" },
  { slug: "tournaments", name: "Tournaments", accent: "#f0b429" },
  { slug: "talent-hunt", name: "PCB Talent Hunt", accent: "#0f8a3e" }
];
export default function CategoryTabs() {
  const pathname = usePathname();
  return (
    <div style={{ display: "flex", gap: ".4rem", overflowX: "auto", paddingBottom: ".6rem", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,.08)", scrollbarWidth: "thin" }}>
      <Link href="/news" style={{ flex: "0 0 auto", padding: ".55rem 1rem", borderRadius: ".55rem", background: pathname === "/news" ? "rgba(240,180,41,.15)" : "rgba(255,255,255,.03)", border: pathname === "/news" ? "1px solid #f0b429" : "1px solid rgba(255,255,255,.1)", color: pathname === "/news" ? "#f0b429" : "rgba(238,244,251,.75)", fontSize: ".82rem", fontWeight: pathname === "/news" ? 700 : 500, whiteSpace: "nowrap", textDecoration: "none" }}>All</Link>
      {NEWS_CATEGORIES.map((c) => {
        const active = pathname === `/news/${c.slug}`;
        return (
          <Link key={c.slug} href={`/news/${c.slug}`} style={{ flex: "0 0 auto", padding: ".55rem 1rem", borderRadius: ".55rem", background: active ? `${c.accent}22` : "rgba(255,255,255,.03)", border: active ? `1px solid ${c.accent}` : "1px solid rgba(255,255,255,.1)", color: active ? c.accent : "rgba(238,244,251,.75)", fontSize: ".82rem", fontWeight: active ? 700 : 500, whiteSpace: "nowrap", textDecoration: "none" }}>{c.name}</Link>
        );
      })}
    </div>
  );
}