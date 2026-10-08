"use client";
import { useEffect, useState } from "react";
type RssItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
};
export default function LiveNewsFeed() {
  const [items, setItems] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/v1/news?limit=15", { cache: "no-store" });
      const j = await res.json();
      if (j.ok) {
        setItems(j.items);
        setFetchedAt(j.fetchedAt);
        if (j.items.length === 0) setErr("No news available right now. Feeds may be temporarily unavailable.");
      } else {
        setErr(j.error || "Failed to load");
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Network error");
    }
    setLoading(false);
  }
  useEffect(() => { load(); }, []);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: ".5rem" }}>
        <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)" }}>
          {fetchedAt && `Updated ${new Date(fetchedAt).toLocaleTimeString()}`}
        </div>
        <button className="btn btn-outline" onClick={load} disabled={loading}>
          {loading ? "Loading…" : "↻ Refresh"}
        </button>
      </div>
      {loading && (
        <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>
          Loading news from public sources…
        </div>
      )}
      {!loading && err && (
        <div style={{
          padding: "1rem",
          background: "rgba(240,180,41,.08)",
          border: "1px solid rgba(240,180,41,.3)",
          borderRadius: ".6rem",
          color: "#f0b429",
          fontSize: ".85rem",
          textAlign: "center",
        }}>
          {err}
        </div>
      )}
      {!loading && !err && (
        <div style={{ display: "grid", gap: ".75rem" }}>
          {items.map((it) => (
            <a
              key={it.link}
              href={it.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "1rem 1.1rem",
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: ".7rem",
                textDecoration: "none",
                color: "inherit",
                display: "flex", flexDirection: "column", gap: ".4rem",
                transition: "all .15s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: ".5rem", alignItems: "center", flexWrap: "wrap" }}>
                <span style={{
                  fontSize: ".62rem", letterSpacing: ".06em", textTransform: "uppercase",
                  padding: ".2rem .5rem", borderRadius: ".3rem",
                  background: "rgba(240,180,41,.15)", color: "#f0b429",
                  fontWeight: 800,
                }}>{it.source}</span>
                <span style={{ fontSize: ".7rem", color: "rgba(238,244,251,.5)" }}>
                  {it.pubDate && new Date(it.pubDate).toLocaleString()}
                </span>
              </div>
              <div style={{ fontSize: ".95rem", fontWeight: 700, color: "#fff", lineHeight: 1.35 }}>
                {it.title}
              </div>
              {it.description && (
                <div style={{ fontSize: ".8rem", color: "rgba(238,244,251,.65)", lineHeight: 1.55 }}>
                  {it.description}
                </div>
              )}
              <div style={{ fontSize: ".72rem", color: "#f0b429", marginTop: ".25rem", fontWeight: 600 }}>
                Read on {it.source} ↗
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}