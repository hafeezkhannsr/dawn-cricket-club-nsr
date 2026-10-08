"use client";
import { useEffect, useState } from "react";
type Props = { url?: string; title?: string };
export default function ShareButtons({ url, title = "DAWN Cricket Club" }: Props) {
  const [shareUrl, setShareUrl] = useState(url || "");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [url]);
  const links = [
    { key: "fb", label: "FB", bg: "rgba(24,119,242,.15)", border: "rgba(24,119,242,.5)", color: "#93c5fd", href: "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl) },
    { key: "x", label: "X", bg: "rgba(255,255,255,.05)", border: "rgba(255,255,255,.2)", color: "#fff", href: "https://x.com/intent/tweet?text=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(shareUrl) },
    { key: "in", label: "in", bg: "rgba(10,102,194,.15)", border: "rgba(10,102,194,.5)", color: "#93c5fd", href: "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(shareUrl) },
    { key: "wa", label: "WA", bg: "rgba(37,211,102,.15)", border: "rgba(37,211,102,.5)", color: "#86efac", href: "https://wa.me/?text=" + encodeURIComponent(title + " " + shareUrl) },
  ];
  async function copy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }
  return (
    <div style={{ display: "flex", gap: ".35rem", alignItems: "center", flexWrap: "wrap" }}>
      <span style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)", marginRight: ".2rem" }}>Share:</span>
      {links.map((l) => (
        <a
          key={l.key}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={"Share on " + l.label}
          style={{
            padding: ".3rem .6rem",
            background: l.bg,
            border: "1px solid " + l.border,
            borderRadius: ".35rem",
            fontSize: ".68rem",
            color: l.color,
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          {l.label}
        </a>
      ))}
      <button
        onClick={copy}
        style={{
          padding: ".3rem .6rem",
          background: copied ? "rgba(20,164,77,.15)" : "rgba(255,255,255,.05)",
          border: copied ? "1px solid rgba(20,164,77,.5)" : "1px solid rgba(255,255,255,.1)",
          borderRadius: ".35rem",
          fontSize: ".68rem",
          color: copied ? "#86efac" : "rgba(238,244,251,.75)",
          fontWeight: 800,
          cursor: "pointer",
        }}
      >
        {copied ? "✓ Copied" : "Copy"}
      </button>
    </div>
  );
}