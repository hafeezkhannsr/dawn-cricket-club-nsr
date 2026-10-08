"use client";
import { useEffect, useState } from "react";
export default function OfflineIndicator() {
  const [online, setOnline] = useState(true);
  const [showOnlineAgain, setShowOnlineAgain] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setOnline(navigator.onLine);
    function handleOnline() {
      setOnline(true);
      setShowOnlineAgain(true);
      setTimeout(() => setShowOnlineAgain(false), 3000);
    }
    function handleOffline() {
      setOnline(false);
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  if (online && !showOnlineAgain) return null;
  return (
    <div style={{
      position: "fixed",
      top: ".75rem",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 300,
      padding: ".55rem 1rem",
      background: online ? "rgba(20,164,77,.95)" : "rgba(220,38,38,.95)",
      color: "#fff",
      borderRadius: "999px",
      fontSize: ".78rem",
      fontWeight: 700,
      boxShadow: "0 10px 30px -8px rgba(0,0,0,.5)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      gap: ".5rem",
      animation: "slideDown .3s ease-out",
    }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: "#fff", animation: online ? "none" : "livePulse 1.5s infinite" }} />
      {online ? "✓ Back online" : "⚡ Offline mode active"}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translate(-50%, -12px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}