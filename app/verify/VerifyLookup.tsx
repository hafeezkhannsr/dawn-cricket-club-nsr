"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function VerifyLookup() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function search(e: React.FormEvent) {
    e.preventDefault();
    const val = q.trim();
    if (!val) return;
    setErr(null);
    setBusy(true);
    try {
      // Search by registration number — uses existing search API (returns approved players)
      const res = await fetch(`/api/v1/search?q=${encodeURIComponent(val)}`, { cache: "no-store" });
      const j = await res.json();
      if (j.ok && j.results && j.results.length > 0) {
        const first = j.results.find((r: { type: string }) => r.type === "Player");
        if (first) {
          router.push(first.href);
          return;
        }
      }
      setErr("No verified player found for this registration number.");
    } catch {
      setErr("Network error. Please try again.");
    }
    setBusy(false);
  }
  return (
    <form onSubmit={search} style={{
      padding: "1.5rem",
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: ".9rem",
    }}>
      <label style={{ display: "block", fontSize: ".85rem", color: "rgba(238,244,251,.85)", marginBottom: ".5rem", fontWeight: 600 }}>
        Registration number
      </label>
      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. DAWN-2026-1234"
          style={{
            flex: 1, minWidth: 200,
            padding: ".75rem .9rem",
            background: "#0a1f3d",
            border: "1px solid rgba(255,255,255,.15)",
            borderRadius: ".6rem",
            color: "#eef4fb",
            fontSize: ".92rem",
            fontFamily: "inherit", outline: "none",
          }}
        />
        <button type="submit" disabled={busy} className="btn btn-gold" style={{ opacity: busy ? .7 : 1 }}>
          {busy ? "…" : "Verify"}
        </button>
      </div>
      {err && (
        <div style={{
          marginTop: "1rem", padding: ".7rem 1rem",
          background: "rgba(240,180,41,.1)",
          border: "1px solid rgba(240,180,41,.4)",
          borderRadius: ".55rem",
          color: "#f0b429",
          fontSize: ".85rem",
        }}>{err}</div>
      )}
      <div style={{
        marginTop: "1.25rem",
        padding: ".9rem 1rem",
        background: "rgba(240,180,41,.06)",
        border: "1px solid rgba(240,180,41,.25)",
        borderRadius: ".6rem",
        fontSize: ".78rem",
        color: "rgba(238,244,251,.75)",
        lineHeight: 1.6,
      }}>
        <b style={{ color: "#f0b429" }}>Tip:</b> Scanning a player card QR opens the verification page directly.
        Only non-sensitive information is shown publicly. CNIC, address and contact details are always protected.
      </div>
    </form>
  );
}