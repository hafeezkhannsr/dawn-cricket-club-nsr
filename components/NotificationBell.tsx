"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
};
export default function NotificationBell() {
  const [items, setItems] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  async function load() {
    try {
      const res = await fetch("/api/v1/notifications", { cache: "no-store" });
      const j = await res.json();
      if (j.ok) { setItems(j.items); setUnread(j.unread); }
    } catch {}
  }
  useEffect(() => {
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  async function markAllRead() {
    await fetch("/api/v1/notifications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "mark-all-read" }) });
    await load();
  }
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        title="Notifications"
        style={{
          position: "relative",
          width: 40, height: 40, borderRadius: ".6rem",
          background: "rgba(255,255,255,.06)",
          border: "1px solid rgba(255,255,255,.14)",
          color: "#eef4fb", cursor: "pointer",
          display: "grid", placeItems: "center",
        }}
      >
        🔔
        {unread > 0 && (
          <span style={{
            position: "absolute", top: -4, right: -4,
            minWidth: 18, height: 18, padding: "0 .25rem",
            borderRadius: 999, background: "#dc2626", color: "#fff",
            fontSize: ".6rem", fontWeight: 800,
            display: "grid", placeItems: "center",
            border: "2px solid #030a18",
          }}>{unread > 9 ? "9+" : unread}</span>
        )}
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + .5rem)", right: 0,
          width: 360, maxHeight: 480, overflowY: "auto",
          background: "#061428", border: "1px solid rgba(240,180,41,.4)",
          borderRadius: ".85rem", boxShadow: "0 20px 50px -12px rgba(0,0,0,.7)",
          zIndex: 100,
        }}>
          <div style={{ padding: ".85rem 1rem", borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#061428", zIndex: 2 }}>
            <span style={{ fontSize: ".85rem", fontWeight: 800, color: "#fff" }}>Notifications</span>
            {unread > 0 && (
              <button onClick={markAllRead} style={{ fontSize: ".7rem", color: "#f0b429", background: "transparent", border: "none", cursor: "pointer", fontWeight: 700 }}>
                Mark all read
              </button>
            )}
          </div>
          {items.length === 0 ? (
            <div style={{ padding: "2rem 1rem", textAlign: "center", color: "rgba(238,244,251,.5)", fontSize: ".82rem" }}>
              No notifications yet
            </div>
          ) : (
            items.slice(0, 10).map((n) => (
              <Link
                key={n.id}
                href={n.link || "#"}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: ".75rem 1rem",
                  borderBottom: "1px solid rgba(255,255,255,.05)",
                  background: n.read ? "transparent" : "rgba(240,180,41,.06)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", gap: ".5rem", alignItems: "flex-start" }}>
                  {!n.read && <span style={{ width: 8, height: 8, borderRadius: 999, background: "#f0b429", marginTop: ".35rem", flexShrink: 0 }} />}
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: ".85rem", fontWeight: 700, color: "#fff", marginBottom: ".2rem" }}>{n.title}</div>
                    <div style={{ fontSize: ".75rem", color: "rgba(238,244,251,.65)", lineHeight: 1.4 }}>{n.message}</div>
                    <div style={{ fontSize: ".65rem", color: "rgba(238,244,251,.4)", marginTop: ".3rem" }}>
                      {new Date(n.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}