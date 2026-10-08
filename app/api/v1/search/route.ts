import { NextRequest, NextResponse } from "next/server";
import { listAll } from "@/lib/server/registration-store";
import { NEWS_CATEGORIES } from "../../../../lib/data/news-categories";
export const dynamic = "force-dynamic";
type Result = {
  type: "Player" | "Team" | "Match" | "Tournament" | "News" | "Page";
  title: string;
  subtitle?: string;
  href: string;
};
const STATIC_PAGES: Result[] = [
  { type: "Page", title: "Home", href: "/" },
  { type: "Page", title: "Player Registration", href: "/register" },
  { type: "Page", title: "DSL Registration", href: "/dsl-register" },
  { type: "Page", title: "Registration Status", href: "/register?status=check" },
  { type: "Page", title: "Player Verification", href: "/verify" },
  { type: "Page", title: "News Hub", href: "/news" },
  { type: "Page", title: "Rules & Regulations", href: "/rules" },
  { type: "Page", title: "Admin Dashboard", href: "/admin" },
  { type: "Page", title: "About DAWN", href: "/about" },
  { type: "Page", title: "Contact", href: "/contact" },
];
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  if (q.length < 2) return NextResponse.json({ ok: true, results: [] });
  const out: Result[] = [];
  // 1) Approved players from registration store (public info only)
  const regs = listAll().filter((r) => r.status === "APPROVED" && r.program === "DAWN");
  for (const r of regs) {
    const d = r.data as Record<string, unknown>;
    const publicConsent = d.publicPhotoConsent === true;
    if (!publicConsent) continue;
    const name = String(d.fullNameEn || "");
    if (!name.toLowerCase().includes(q)) continue;
    out.push({
      type: "Player",
      title: name,
      subtitle: `${r.registrationNumber} · ${String(d.playingRole || "Player")}`,
      href: `/verify/${r.id}`,
    });
  }
  // 2) News categories
  for (const c of NEWS_CATEGORIES) {
    if (c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) {
      out.push({
        type: "News",
        title: c.name,
        subtitle: c.description,
        href: `/news/${c.slug}`,
      });
    }
  }
  // 3) Static pages
  for (const p of STATIC_PAGES) {
    if (p.title.toLowerCase().includes(q)) out.push(p);
  }
  return NextResponse.json({ ok: true, results: out.slice(0, 20) });
}