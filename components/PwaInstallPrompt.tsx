"use client";
import { useEffect, useState } from "react";
type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BIPEvent | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Don't show if already dismissed
    if (window.localStorage.getItem("dawn.pwa.dismissed") === "1") return;
    // Don't show if already in standalone mode
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BIPEvent);
      setTimeout(() => setShow(true), 5000);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  async function install() {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setShow(false);
      setDeferredPrompt(null);
    } catch {}
  }
  function dismiss() {
    setShow(false);
    try { window.localStorage.setItem("dawn.pwa.dismissed", "1"); } catch {}
  }
  if (!show) return null;
  return (
    <div style={{
      position: "fixed",
      bottom: "5.5rem",
      right: "1rem",
      zIndex: 200,
      maxWidth: 340,
      padding: "1rem 1.1rem",
      background: "linear-gradient(135deg, #061428, #0a1f3d)",
      border: "1px solid rgba(240,180,41,.5)",
      borderRadius: ".9rem",
      boxShadow: "0 20px 50px -12px rgba(0,0,0,.7), 0 0 30px -10px rgba(240,180,41,.4)",
      animation: "slideInRight .4s ease-out",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: ".75rem" }}>
        <div style={{ width: 44, height: 44, borderRadius: ".6rem", background: "linear-gradient(135deg, #f0b429, #cb6e17)", display: "grid", placeItems: "center", fontSize: "1.4rem", flexShrink: 0 }}>📱</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: ".88rem", fontWeight: 800, color: "#fff", marginBottom: ".25rem" }}>Install DAWN CC</div>
          <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.65)", lineHeight: 1.5, marginBottom: ".65rem" }}>
            Add to home screen for fast, offline-ready access to matches and registration.
          </div>
          <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
            <button onClick={install} className="btn btn-gold" style={{ padding: ".4rem .8rem", fontSize: ".75rem" }}>Install</button>
            <button onClick={dismiss} className="btn btn-outline" style={{ padding: ".4rem .8rem", fontSize: ".75rem" }}>Not now</button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}