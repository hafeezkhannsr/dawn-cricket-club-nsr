import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getNotice, getCategoryMeta, NOTICES } from "@/lib/data/mock-notices";
import ShareButtons from "@/components/ShareButtons";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = getNotice(id);
  return { title: n ? n.title : "Notice" };
}
export default async function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const notice = getNotice(id);
  if (!notice) notFound();
  const meta = getCategoryMeta(notice.category);
  const related = NOTICES.filter((n) => n.id !== notice.id && n.category === notice.category).slice(0, 3);
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/notices" style={{ color: "inherit" }}>Notices</Link> ·{" "}
            <span style={{ color: meta.color }}>{meta.label}</span>
          </nav>
          <article style={{ padding: "1.5rem", background: notice.category === "URGENT" ? "linear-gradient(135deg, rgba(220,38,38,.1), transparent)" : "rgba(255,255,255,.03)", border: notice.category === "URGENT" ? "1px solid rgba(220,38,38,.4)" : `1px solid ${meta.color}44`, borderRadius: ".9rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", gap: ".5rem", alignItems: "center", flexWrap: "wrap", marginBottom: "1rem" }}>
              <span style={{ fontSize: ".68rem", fontWeight: 800, padding: ".25rem .65rem", background: `${meta.color}22`, color: meta.color, borderRadius: ".4rem", border: `1px solid ${meta.color}55`, textTransform: "uppercase", letterSpacing: ".05em" }}>
                {meta.label} · {meta.labelUr}
              </span>
              {notice.priority === "HIGH" && (
                <span style={{ fontSize: ".62rem", fontWeight: 800, padding: ".2rem .5rem", background: "rgba(220,38,38,.2)", color: "#fca5a5", borderRadius: ".3rem", textTransform: "uppercase" }}>
                  HIGH PRIORITY
                </span>
              )}
            </div>
            <h1 style={{ margin: "0 0 .65rem", fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 900, lineHeight: 1.25 }}>
              {notice.title}
            </h1>
            <div style={{ fontSize: "clamp(.9rem, 2vw, 1.05rem)", color: "rgba(238,244,251,.75)", marginBottom: "1rem", direction: "rtl", textAlign: "right" }}>
              {notice.titleUr}
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: ".78rem", color: "rgba(238,244,251,.6)", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,.06)", marginBottom: "1.5rem" }}>
              <span>✍️ {notice.author}</span>
              <span>📅 Published {new Date(notice.publishedAt).toLocaleDateString()}</span>
              {notice.expiresAt && <span>⏳ Expires {new Date(notice.expiresAt).toLocaleDateString()}</span>}
            </div>
            <p style={{ margin: "0 0 1.5rem", fontSize: ".95rem", color: "rgba(238,244,251,.85)", lineHeight: 1.75, fontStyle: "italic", borderLeft: `3px solid ${meta.color}`, paddingLeft: "1rem" }}>
              {notice.summary}
            </p>
            <div style={{ fontSize: ".92rem", color: "rgba(238,244,251,.85)", lineHeight: 1.85 }}>
              {notice.body.map((line, i) => {
                if (!line) return <div key={i} style={{ height: ".75rem" }} />;
                if (line.startsWith("•")) {
                  return <div key={i} style={{ paddingLeft: "1rem", marginBottom: ".25rem" }}>{line}</div>;
                }
                if (/^\d+\./.test(line)) {
                  return <div key={i} style={{ paddingLeft: "1rem", marginBottom: ".25rem" }}>{line}</div>;
                }
                return <p key={i} style={{ margin: "0 0 .75rem" }}>{line}</p>;
              })}
            </div>
            {notice.attachmentUrl && (
              <a href={notice.attachmentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
                🔗 {notice.attachmentLabel || "View attachment"} ↗
              </a>
            )}
          </article>
          <div style={{ marginBottom: "2rem" }}>
            <ShareButtons title={notice.title} />
          </div>
          {related.length > 0 && (
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 900, marginBottom: "1rem", color: "#f0b429" }}>
                Related Notices
              </h2>
              <div style={{ display: "grid", gap: ".65rem" }}>
                {related.map((r) => (
                  <Link key={r.id} href={`/notices/${r.id}`} style={{ display: "block", padding: "1rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".7rem", textDecoration: "none", color: "inherit" }}>
                    <div style={{ fontSize: ".9rem", fontWeight: 700, color: "#fff", marginBottom: ".25rem" }}>{r.title}</div>
                    <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)" }}>{new Date(r.publishedAt).toLocaleDateString()}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div style={{ marginTop: "2rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <Link href="/notices" className="btn btn-outline">← All Notices</Link>
            <Link href="/" className="btn btn-outline">Home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}