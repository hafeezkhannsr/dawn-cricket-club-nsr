import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { NOTICES, NOTICE_CATEGORIES, getCategoryMeta } from "@/lib/data/mock-notices";
export const metadata = {
  title: "Notices & Announcements",
  description: "Latest notices and announcements from DAWN Cricket Club, PCB trials, academy and matches.",
};
export default function NoticesPage() {
  // Sort: pinned first, then by date desc
  const sorted = [...NOTICES].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.publishedAt.localeCompare(a.publishedAt);
  });
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>
              Notices & Announcements
            </h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              {NOTICES.length} notices · Club, trials, matches, academy, registration
            </p>
          </header>
          {/* Category pills */}
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1.75rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <span style={{ padding: ".4rem .85rem", background: "rgba(240,180,41,.15)", border: "1px solid #f0b429", borderRadius: "999px", fontSize: ".78rem", fontWeight: 800, color: "#f0b429" }}>
              All ({NOTICES.length})
            </span>
            {NOTICE_CATEGORIES.map((c) => {
              const count = NOTICES.filter((n) => n.category === c.key).length;
              if (count === 0) return null;
              return (
                <span key={c.key} style={{ padding: ".4rem .85rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "999px", fontSize: ".78rem", fontWeight: 600, color: "rgba(238,244,251,.75)", display: "inline-flex", alignItems: "center", gap: ".4rem" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: c.color }} />
                  {c.label} ({count})
                </span>
              );
            })}
          </div>
          <div style={{ display: "grid", gap: "1rem" }}>
            {sorted.map((n) => {
              const meta = getCategoryMeta(n.category);
              return (
                <Link key={n.id} href={`/notices/${n.id}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                  <div style={{
                    padding: "1.35rem",
                    background: n.category === "URGENT" ? "linear-gradient(135deg, rgba(220,38,38,.12), rgba(240,180,41,.05))" : "rgba(255,255,255,.03)",
                    border: n.category === "URGENT" ? "1px solid rgba(220,38,38,.4)" : `1px solid ${meta.color}33`,
                    borderRadius: ".9rem",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap", marginBottom: ".75rem" }}>
                      <div style={{ display: "flex", gap: ".5rem", alignItems: "center", flexWrap: "wrap" }}>
                        <span style={{ fontSize: ".68rem", fontWeight: 800, padding: ".25rem .6rem", background: `${meta.color}22`, color: meta.color, borderRadius: ".4rem", border: `1px solid ${meta.color}55`, textTransform: "uppercase", letterSpacing: ".05em" }}>
                          {n.priority === "HIGH" && "● "}{meta.label}
                        </span>
                        {n.priority === "HIGH" && (
                          <span style={{ fontSize: ".62rem", fontWeight: 800, padding: ".2rem .5rem", background: "rgba(220,38,38,.2)", color: "#fca5a5", borderRadius: ".3rem", textTransform: "uppercase", letterSpacing: ".05em" }}>
                            HIGH PRIORITY
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)" }}>
                        {new Date(n.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 style={{ margin: "0 0 .5rem", fontSize: "clamp(1.05rem, 2.5vw, 1.25rem)", fontWeight: 900, color: "#fff", lineHeight: 1.3 }}>
                      {n.title}
                    </h2>
                    <p style={{ margin: "0 0 .85rem", fontSize: ".85rem", color: "rgba(238,244,251,.7)", lineHeight: 1.6 }}>
                      {n.summary}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: ".5rem" }}>
                      <span style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)" }}>
                        By {n.author}
                        {n.expiresAt && ` · Expires ${new Date(n.expiresAt).toLocaleDateString()}`}
                      </span>
                      <span style={{ fontSize: ".75rem", color: meta.color, fontWeight: 800 }}>
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div style={{ marginTop: "2rem", padding: "1.25rem", background: "rgba(240,180,41,.06)", border: "1px solid rgba(240,180,41,.25)", borderRadius: ".7rem", fontSize: ".82rem", color: "rgba(238,244,251,.75)", lineHeight: 1.7 }}>
            <b style={{ color: "#f0b429" }}>Note:</b> PCB trial notices are aggregated from official public sources. DAWN Cricket Club is an independent club and does not claim affiliation with PCB.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}