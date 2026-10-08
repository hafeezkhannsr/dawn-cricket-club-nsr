import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/news/CategoryTabs";
import SocialRow from "@/components/news/SocialRow";
import { NEWS_CATEGORIES } from "@/lib/data/news-categories";
import Link from "next/link";
export const metadata = {
  title: "Cricket News",
  description: "Latest cricket news from DAWN, Pakistan, PCB, ICC, PSL and international sources.",
};
export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <header style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>
              Cricket News Hub
            </h1>
            <p style={{ margin: ".4rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              Curated categories from DAWN, PCB, ICC, PSL and international cricket
            </p>
          </header>
          <CategoryTabs />
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}>
            {NEWS_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/news/${c.slug}`}
                style={{
                  padding: "1.1rem",
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: ".7rem",
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex", flexDirection: "column", gap: ".4rem",
                  transition: "all .15s ease",
                }}
              >
                <div style={{
                  fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase",
                  fontWeight: 800, color: c.accent,
                }}>{c.name}</div>
                <div style={{ fontSize: ".82rem", color: "rgba(238,244,251,.7)", lineHeight: 1.5 }}>
                  {c.description}
                </div>
                {c.externalUrl && (
                  <div style={{ marginTop: "auto", fontSize: ".72rem", color: "rgba(238,244,251,.5)" }}>
                    External link ↗
                  </div>
                )}
              </Link>
            ))}
          </div>
          <div style={{
            padding: "1.5rem",
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: ".8rem",
            textAlign: "center",
          }}>
            <div style={{ fontSize: ".72rem", letterSpacing: ".12em", color: "#f0b429", fontWeight: 700, marginBottom: ".7rem" }}>
              FOLLOW US
            </div>
            <SocialRow />
            <p style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)", marginTop: "1rem", lineHeight: 1.5 }}>
              External news is sourced from official publications with attribution.
              DAWN does not claim ownership of third-party content.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}