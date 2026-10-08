import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/news/CategoryTabs";
import { getCategory, NEWS_CATEGORIES } from "../../../lib/data/news-categories";
import { notFound } from "next/navigation";
import Link from "next/link";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return { title: "News" };
  return { title: `${c.name} News`, description: c.description };
}
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.5)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link>
            {" · "}
            <Link href="/news" style={{ color: "inherit" }}>News</Link>
            {" · "}
            <span style={{ color: c.accent }}>{c.name}</span>
          </nav>
          <header style={{
            padding: "1.5rem",
            background: `linear-gradient(135deg, ${c.accent}22, transparent)`,
            border: `1px solid ${c.accent}55`,
            borderRadius: ".8rem",
            marginBottom: "1.5rem",
          }}>
            <div style={{
              fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase",
              fontWeight: 800, color: c.accent, marginBottom: ".4rem",
            }}>Category</div>
            <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3.5vw, 2rem)", fontWeight: 900 }}>
              {c.name}
            </h1>
            <p style={{ margin: ".4rem 0 0", color: "rgba(238,244,251,.7)" }}>{c.description}</p>
            {c.externalUrl && (
              <a
                href={c.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ marginTop: "1rem", display: "inline-flex" }}
              >
                Visit official source ↗
              </a>
            )}
          </header>
          <CategoryTabs />
          <div style={{
            padding: "3rem 1.5rem", textAlign: "center",
            background: "rgba(255,255,255,.02)",
            border: "1px dashed rgba(255,255,255,.12)",
            borderRadius: ".8rem",
            color: "rgba(238,244,251,.6)",
            fontSize: ".9rem", lineHeight: 1.7,
          }}>
            <div style={{ fontSize: "2rem", marginBottom: ".5rem", opacity: .5 }}>📰</div>
            <div style={{ fontWeight: 600, color: "#fff", marginBottom: ".5rem" }}>
              Live feed coming soon
            </div>
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
              This category is ready to receive articles from admin (manual)
              and from licensed public/official feeds (automatic).
            </div>
          </div>
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <p style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)" }}>
              All external news will be attributed to its original source.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}