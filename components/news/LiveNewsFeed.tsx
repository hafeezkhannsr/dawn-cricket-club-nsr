"use client";
import { useEffect, useState } from "react";
type RssItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  sourceLabel: string;
  category: string;
};
const CATEGORIES = [
  { key: "", label: "All" },
  { key: "international", label: "International" },
  { key: "icc", label: "ICC" },
];
export default function LiveNewsFeed() {
  const [items, setItems] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [q, setQ] = useState("");
  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const params = new URLSearchParams({ limit: "40" });
      if (filter) params.set("category", filter);
      const res = await fetch(`/api/v1/news?${params}`, { cache: "no-store" });
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
  useEffect(() => { load(); }, [filter]);
  const filtered = q.trim()
    ? items.filter((i) =>
        i.title.toLowerCase().includes(q.toLowerCase()) ||
        i.description.toLowerCase().includes(q.toLowerCase())
      )
    : items;
  return (
    <div>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: "1rem", flexWrap: "wrap", gap: ".75rem",
      }}>
        <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              style={{
                padding: ".45rem .9rem",
                borderRadius: ".5rem",
                border: filter === c.key ? "1px solid #f0b429" : "1px solid rgba(255,255,255,.1)",
                background: filter === c.key ? "rgba(240,180,41,.15)" : "rgba(255,255,255,.03)",
                color: filter === c.key ? "#f0b429" : "rgba(238,244,251,.75)",
                fontSize: ".82rem", fontWeight: filter === c.key ? 700 : 500,
                cursor: "pointer",
              }}
            >{c.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: ".5rem", alignItems: "center", flexWrap: "wrap" }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search news…"
            style={{
              padding: ".5rem .8rem",
              background: "#0a1f3d",
              border: "1px solid rgba(255,255,255,.14)",
              borderRadius: ".5rem",
              color: "#eef4fb",
              fontSize: ".85rem",
              outline: "none",
              width: 200,
            }}
          />
          <button className="btn btn-outline" onClick={load} disabled={loading} style={{ padding: ".5rem .9rem" }}>
            {loading ? "…" : "↻ Refresh"}
          </button>
        </div>
      </div>
      <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)", marginBottom: "1rem" }}>
        {fetchedAt && `Last updated: ${new Date(fetchedAt).toLocaleString()}`}
        {!loading && ` · ${filtered.length} items`}
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
        }}>{err}</div>
      )}
      {!loading && !err && filtered.length === 0 && (
        <div style={{ padding: "3rem 1rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>
          No news matches your search.
        </div>
      )}
      {!loading && !err && filtered.length > 0 && (
        <div style={{ display: "grid", gap: ".75rem" }}>
          {filtered.map((it) => (
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
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: ".5rem", alignItems: "center", flexWrap: "wrap" }}>
                <span style={{
                  fontSize: ".62rem", letterSpacing: ".06em", textTransform: "uppercase",
                  padding: ".2rem .5rem", borderRadius: ".3rem",
                  background: "rgba(240,180,41,.15)", color: "#f0b429",
                  fontWeight: 800,
                }}>{it.sourceLabel}</span>
                <span style={{ fontSize: ".7rem", color: "rgba(238,244,251,.5)" }}>
                  {it.pubDate && !isNaN(Date.parse(it.pubDate)) && new Date(it.pubDate).toLocaleString()}
                </span>
              </div>
              <div style={{ fontSize: ".95rem", fontWeight: 700, color: "#fff", lineHeight: 1.35 }}>{it.title}</div>
              {it.description && (
                <div style={{ fontSize: ".8rem", color: "rgba(238,244,251,.65)", lineHeight: 1.55 }}>{it.description}</div>
              )}
              <div style={{ fontSize: ".72rem", color: "#f0b429", marginTop: ".25rem", fontWeight: 600 }}>
                Read on {it.sourceLabel} ↗
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}