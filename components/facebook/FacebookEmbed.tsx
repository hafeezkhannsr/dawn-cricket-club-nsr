"use client";
import { useState } from "react";
type Props = {
  pageUrl: string;
  title: string;
  subtitle?: string;
  color?: string;
  height?: number;
};
export default function FacebookEmbed({
  pageUrl,
  title,
  subtitle,
  color = "#1877F2",
  height = 500,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const embedSrc = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}&tabs=timeline&width=500&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`;
  return (
    <div style={{
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: ".9rem",
      overflow: "hidden",
    }}>
      <header style={{
        padding: "1rem 1.25rem",
        background: `linear-gradient(90deg, ${color}22, transparent)`,
        borderBottom: "1px solid rgba(255,255,255,.08)",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".75rem", flexWrap: "wrap",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".15rem" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={color} aria-hidden="true">
              <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.79-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
            </svg>
            <div style={{ fontWeight: 800, fontSize: ".95rem", color: "#fff" }}>{title}</div>
          </div>
          {subtitle && <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.6)" }}>{subtitle}</div>}
        </div>
        <a
          href={pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          style={{ fontSize: ".78rem", padding: ".4rem .75rem" }}
        >
          Follow on Facebook ↗
        </a>
      </header>
      <div style={{ position: "relative", minHeight: height }}>
        {!loaded && (
          <div style={{
            position: "absolute", inset: 0,
            display: "grid", placeItems: "center",
            color: "rgba(238,244,251,.5)", fontSize: ".85rem",
          }}>
            Loading Facebook feed…
          </div>
        )}
        <iframe
          src={embedSrc}
          title={title}
          width="100%"
          height={height}
          style={{ border: "none", overflow: "hidden", display: "block", background: "#fff" }}
          scrolling="no"
          frameBorder={0}
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}