"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
const NAV_SECTIONS = [
  {
    title: "Main",
    items: [
      { href: "/admin", label: "Dashboard", icon: "📊" },
      { href: "/admin/registrations", label: "Registrations", icon: "📝" },
      { href: "/admin/analytics", label: "Analytics", icon: "📊" },
      { href: "/admin/users", label: "Users & Roles", icon: "👥" },
    ],
  },
  {
    title: "Cricket",
    items: [
      { href: "/admin/matches", label: "Matches", icon: "🏏" },
      { href: "/admin/academy", label: "Academy", icon: "🎓" },
      { href: "/admin/grounds", label: "Grounds & Bookings", icon: "🏟️" },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/emails", label: "Email Logs", icon: "✉️" },
      { href: "/admin/notices", label: "Notices", icon: "📢" },
      { href: "/admin/import", label: "Bulk Import", icon: "📥" },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/admin/settings", label: "Settings", icon: "⚙️" },
    ],
  },
];
export default function AdminShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", display: "flex", flexDirection: "column" }}>
      {/* TOP BAR */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(3,10,24,.95)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 1rem", height: 60, gap: ".75rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
            style={{
              background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)",
              borderRadius: ".5rem", width: 36, height: 36, cursor: "pointer",
              color: "#fff", fontSize: "1rem", display: "grid", placeItems: "center",
            }}>
            ☰
          </button>
          <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: ".55rem", textDecoration: "none", color: "inherit" }}>
            <Logo size={28} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span style={{ fontWeight: 800, fontSize: ".82rem" }}>DAWN ADMIN</span>
              <span style={{ fontSize: ".62rem", color: "rgba(238,244,251,.5)" }}>Control Center</span>
            </div>
          </Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
          <Link href="/" className="btn btn-outline" style={{ fontSize: ".75rem", padding: ".4rem .75rem" }}>
            <span className="hide-xs">← Site</span>
          </Link>
          <form action="/api/v1/auth/logout" method="POST">
            <button type="submit" className="btn btn-primary" style={{ fontSize: ".75rem", padding: ".4rem .75rem" }}>Logout</button>
          </form>
        </div>
      </header>
      <div style={{ display: "flex", flex: 1, position: "relative" }}>
        {/* SIDEBAR */}
        <aside style={{
          width: 240,
          flexShrink: 0,
          background: "rgba(0,0,0,.25)",
          borderRight: "1px solid rgba(255,255,255,.06)",
          padding: "1rem .75rem",
          position: "sticky",
          top: 60,
          height: "calc(100vh - 60px)",
          overflowY: "auto",
          ...(sidebarOpen ? {} : { display: "none" }),
        }} className="admin-sidebar-desktop">
          {NAV_SECTIONS.map((sec) => (
            <div key={sec.title} style={{ marginBottom: "1.25rem" }}>
              <div style={{
                fontSize: ".62rem", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase",
                color: "rgba(238,244,251,.4)", padding: "0 .65rem .5rem",
              }}>
                {sec.title}
              </div>
              {sec.items.map((it) => {
                const active = pathname === it.href || (it.href !== "/admin" && pathname.startsWith(it.href));
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setSidebarOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", gap: ".6rem",
                      padding: ".55rem .7rem",
                      borderRadius: ".5rem",
                      marginBottom: ".15rem",
                      fontSize: ".82rem",
                      fontWeight: active ? 700 : 500,
                      color: active ? "#f0b429" : "rgba(238,244,251,.75)",
                      background: active ? "rgba(240,180,41,.12)" : "transparent",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ fontSize: "1rem" }}>{it.icon}</span>
                    <span>{it.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </aside>
        {/* MOBILE SIDEBAR OVERLAY */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed", inset: 0, top: 60,
              background: "rgba(0,0,0,.6)",
              zIndex: 40,
            }}
            className="admin-sidebar-overlay"
          />
        )}
        {/* MAIN CONTENT */}
        <main style={{ flex: 1, minWidth: 0, padding: "1.5rem 1.25rem 3rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.4rem, 3.5vw, 1.9rem)", fontWeight: 900 }}>{title}</h1>
            {subtitle && <p style={{ margin: ".4rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>{subtitle}</p>}
          </div>
          {children}
        </main>
      </div>
      <style>{`
        @media (max-width: 1023px) {
          .admin-sidebar-desktop {
            position: fixed !important;
            top: 60px !important;
            left: 0;
            width: 260px !important;
            height: calc(100vh - 60px) !important;
            background: #061428 !important;
            z-index: 45;
            box-shadow: 4px 0 24px rgba(0,0,0,.5);
          }
        }
        @media (min-width: 1024px) {
          .admin-sidebar-desktop { display: block !important; }
          .admin-sidebar-overlay { display: none !important; }
        }
      `}</style>
    </div>
  );
}