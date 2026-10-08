import { NextRequest, NextResponse } from "next/server";
import { listAll } from "@/lib/server/registration-store";
export const dynamic = "force-dynamic";
const STATIC_PAGES = [
  { type: "Page", title: "Home", href: "/" },
  { type: "Page", title: "Player Registration", href: "/register" },
  { type: "Page", title: "DSL Registration", href: "/dsl-register" },
  { type: "Page", title: "Registration Status", href: "/register/status-check" },
  { type: "Page", title: "Player Verification", href: "/verify" },
  { type: "Page", title: "News Hub", href: "/news" },
  { type: "Page", title: "Fixtures", href: "/fixtures" },
  { type: "Page", title: "Results", href: "/results" },
  { type: "Page", title: "Live Scores", href: "/live" },
  { type: "Page", title: "Notices", href: "/notices" },
  { type: "Page", title: "Rules", href: "/rules" },
  { type: "Page", title: "Admin Dashboard", href: "/admin" },
  { type: "Page", title: "About DAWN", href: "/about" },
  { type: "Page", title: "Contact", href: "/contact" },
];
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  if (q.length < 2) return NextResponse.json({ ok: true, results: [] });
  const out: Array<{ type: string; title: string; subtitle?: string; href: string }> = [];
  const regs = (await listAll()).filter((r) => r.status === "APPROVED" && r.program === "DAWN");
  for (const r of regs) {
    const d = r.data as Record<string, unknown>;
    if (d.publicPhotoConsent !== true) continue;
    const name = String(d.fullNameEn || "");
    if (!name.toLowerCase().includes(q)) continue;
    out.push({ type: "Player", title: name, subtitle: r.registrationNumber + " · " + String(d.playingRole || "Player"), href: "/verify/" + r.id });
  }
  const newsCats = [
    { slug: "dawn", name: "DAWN Cricket Club", description: "Official news" },
    { slug: "pcb", name: "PCB Official", description: "PCB announcements" },
    { slug: "psl", name: "PSL", description: "Pakistan Super League" },
    { slug: "icc", name: "ICC", description: "International Cricket Council" },
  ];
  for (const c of newsCats) { if (c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) out.push({ type: "News", title: c.name, subtitle: c.description, href: "/news/" + c.slug }); }
  for (const p of STATIC_PAGES) { if (p.title.toLowerCase().includes(q)) out.push(p); }
  return NextResponse.json({ ok: true, results: out.slice(0, 20) });
}