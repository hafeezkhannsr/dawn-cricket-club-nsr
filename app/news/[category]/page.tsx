import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/news/CategoryTabs";
import { notFound } from "next/navigation";
import Link from "next/link";
const CATS = [
  { slug: "dawn", name: "DAWN Cricket Club", description: "Official news from DAWN Cricket Club", accent: "#14a44d" },
  { slug: "dkk", name: "Dheri Katti Khel", description: "Local cricket news", accent: "#f0b429" },
  { slug: "nowshera", name: "Nowshera", description: "Cricket news from Nowshera", accent: "#f0b429" },
  { slug: "kp", name: "Khyber Pakhtunkhwa", description: "KP provincial cricket", accent: "#f0b429" },
  { slug: "pakistan", name: "Pakistan Cricket", description: "National team and domestic", accent: "#0f8a3e" },
  { slug: "pcb", name: "PCB Official", description: "PCB announcements", accent: "#0f8a3e", externalUrl: "https://www.pcb.com.pk/" },
  { slug: "psl", name: "PSL", description: "Pakistan Super League", accent: "#b01e1e", externalUrl: "https://www.psl-t20.com/" },
  { slug: "icc", name: "ICC", description: "International Cricket Council", accent: "#1f4e8c", externalUrl: "https://www.icc-cricket.com/" },
  { slug: "domestic", name: "Domestic Cricket", description: "Pakistan domestic circuit", accent: "#f0b429" },
  { slug: "international", name: "International", description: "World cricket updates", accent: "#1f4e8c" },
  { slug: "women", name: "Women's Cricket", description: "Women's cricket news", accent: "#e83e8c" },
  { slug: "youth", name: "Youth Cricket", description: "U13 to U19 talent", accent: "#f0b429" },
  { slug: "school", name: "School Cricket", description: "School-level cricket", accent: "#14a44d" },
  { slug: "academy", name: "Academy", description: "Academy programs", accent: "#14a44d" },
  { slug: "tournaments", name: "Tournaments", description: "Local tournaments", accent: "#f0b429" },
  { slug: "talent-hunt", name: "PCB Talent Hunt", description: "PCB Talent Hunt program", accent: "#0f8a3e", externalUrl: "https://www.pcb.com.pk/" }
];
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = CATS.find((x) => x.slug === category);
  return { title: c ? `${c.name} News` : "News" };
}
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = CATS.find((x) => x.slug === category);
  if (!c) notFound();
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.5)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> · <Link href="/news" style={{ color: "inherit" }}>News</Link> · <span style={{ color: c.accent }}>{c.name}</span>
          </nav>
          <header style={{ padding: "1.5rem", background: `linear-gradient(135deg, ${c.accent}22, transparent)`, border: `1px solid ${c.accent}55`, borderRadius: ".8rem", marginBottom: "1.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", fontWeight: 900 }}>{c.name}</h1>
            <p style={{ margin: ".4rem 0 0", color: "rgba(238,244,251,.7)" }}>{c.description}</p>
            {c.externalUrl && <a href={c.externalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ marginTop: "1rem", display: "inline-flex" }}>Visit official source ↗</a>}
          </header>
          <CategoryTabs />
          <div style={{ padding: "3rem 1.5rem", textAlign: "center", background: "rgba(255,255,255,.02)", border: "1px dashed rgba(255,255,255,.12)", borderRadius: ".8rem", color: "rgba(238,244,251,.6)", fontSize: ".9rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: ".5rem", opacity: .5 }}>📰</div>
            <div style={{ fontWeight: 600, color: "#fff" }}>Live feed coming soon</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}