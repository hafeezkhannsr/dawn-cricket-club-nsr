import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/news/CategoryTabs";
import SocialRow from "@/components/news/SocialRow";
const NEWS_CATEGORIES = [
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
export const metadata = { title: "Cricket News", description: "Latest cricket news" };
export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <header style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>Cricket News Hub</h1>
            <p style={{ margin: ".4rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>Curated categories from DAWN, PCB, ICC, PSL and international cricket</p>
          </header>
          <CategoryTabs />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            {NEWS_CATEGORIES.map((c) => (
              <a key={c.slug} href={c.externalUrl || `/news/${c.slug}`} target={c.externalUrl ? "_blank" : undefined} rel="noopener noreferrer"
                style={{ padding: "1.1rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".7rem", textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: ".4rem" }}>
                <div style={{ fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 800, color: c.accent }}>{c.name}</div>
                <div style={{ fontSize: ".82rem", color: "rgba(238,244,251,.7)", lineHeight: 1.5 }}>{c.description}</div>
                {c.externalUrl && <div style={{ marginTop: "auto", fontSize: ".72rem", color: "rgba(238,244,251,.5)" }}>External link ↗</div>}
              </a>
            ))}
          </div>
          <div style={{ padding: "1.5rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".8rem", textAlign: "center" }}>
            <div style={{ fontSize: ".72rem", letterSpacing: ".12em", color: "#f0b429", fontWeight: 700, marginBottom: ".7rem" }}>FOLLOW US</div>
            <SocialRow />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}