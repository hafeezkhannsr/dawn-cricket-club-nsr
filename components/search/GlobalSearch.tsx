"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
type Result = {
  type: "Player" | "Team" | "Match" | "Tournament" | "News" | "Page";
  title: string;
  subtitle?: string;
  href: string;
};
export default function GlobalSearch({
  placeholder = "Search players, teams, matches, news...",
  autoFocus = false,
}: { placeholder?: string; autoFocus?: boolean }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!q.trim()) { setResults([]); return; }
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/search?q=${encodeURIComponent(q)}`);
        const j = await res.json();
        if (j.ok) setResults(j.results || []);
      } catch {}
      setLoading(false);
    }, 250);
    return () => clearTimeout(t);
  }, [q]);
  // Close on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!inputRef.current) return;
      const wrapper = inputRef.current.parentElement;
      if (wrapper && !wrapper.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: ".5rem",
        padding: ".7rem .9rem",
        background: "#0a1f3d",
        border: open ? "1px solid #f0b429" : "1px solid rgba(255,255,255,.14)",
        borderRadius: ".7rem",
        boxShadow: open ? "0 0 0 3px rgba(240,180,41,.15)" : "none",
        transition: "border-color .15s, box-shadow .15s",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="#f0b429" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <line x1="20" y1="20" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            color: "#eef4fb", fontSize: ".92rem", fontFamily: "inherit",
          }}
        />
        {q && (
          <button
            onClick={() => { setQ(""); setResults([]); }}
            aria-label="Clear"
            style={{
              background: "transparent", border: "none", color: "rgba(238,244,251,.5)",
              cursor: "pointer", fontSize: "1rem", padding: 0,
            }}
          >✕</button>
        )}
      </div>
      {open && q.trim() && (
        <div style={{
          position: "absolute", top: "calc(100% + .4rem)", left: 0, right: 0,
          zIndex: 200,
          background: "#0a1f3d",
          border: "1px solid rgba(240,180,41,.4)",
          borderRadius: ".7rem",
          padding: ".35rem",
          maxHeight: 400,
          overflowY: "auto",
          boxShadow: "0 20px 50px -12px rgba(0,0,0,.7)",
        }}>
          {loading && (
            <div style={{ padding: ".9rem", fontSize: ".82rem", color: "rgba(238,244,251,.5)", textAlign: "center" }}>
              Searching…
            </div>
          )}
          {!loading && results.length === 0 && (
            <div style={{ padding: ".9rem", fontSize: ".82rem", color: "rgba(238,244,251,.5)", textAlign: "center" }}>
              No results for "{q}"
            </div>
          )}
          {!loading && results.map((r, i) => (
            <Link
              key={i}
              href={r.href}
              onClick={() => setOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: ".75rem",
                padding: ".65rem .75rem",
                borderRadius: ".5rem",
                textDecoration: "none", color: "inherit",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{
                fontSize: ".62rem", fontWeight: 800, letterSpacing: ".06em",
                padding: ".2rem .5rem", borderRadius: ".35rem",
                background: "rgba(240,180,41,.15)", color: "#f0b429",
                textTransform: "uppercase", flexShrink: 0,
              }}>{r.type}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: ".88rem", fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</div>
                {r.subtitle && (
                  <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.subtitle}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}