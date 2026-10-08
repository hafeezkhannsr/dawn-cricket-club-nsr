"use client";
import { useEffect, useState } from "react";
export default function VisitCounter({ id, base = 0 }: { id: string; base?: number }) {
  const [count, setCount] = useState(base);
  useEffect(() => {
    try {
      const key = "dawn.visits." + id;
      const saved = Number(window.localStorage.getItem(key) || "0");
      const next = base + saved + 1;
      window.localStorage.setItem(key, String(saved + 1));
      setCount(next);
    } catch {}
  }, [id, base]);
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: ".35rem",
      padding: ".35rem .75rem",
      background: "rgba(255,255,255,.05)",
      border: "1px solid rgba(255,255,255,.1)",
      borderRadius: ".5rem",
      fontSize: ".75rem",
      color: "rgba(238,244,251,.75)",
    }}>
      👁️ <b style={{ color: "#fff" }}>{count.toLocaleString()}</b> Visits
    </span>
  );
}