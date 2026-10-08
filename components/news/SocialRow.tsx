const SOCIAL_LINKS = [
  { key: "facebook-dawn", label: "DAWN Cricket Club", url: "https://www.facebook.com/", color: "#1877F2", icon: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.79-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" },
  { key: "facebook-dsl", label: "DSL Official", url: "https://www.facebook.com/", color: "#1877F2", icon: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.79-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" },
  { key: "youtube", label: "YouTube", url: "https://www.youtube.com/", color: "#FF0000", icon: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 0 0-2.1 2.1C0 8 0 12 0 12s0 4 .6 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 16 24 12 24 12s0-4-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" },
  { key: "whatsapp", label: "WhatsApp", url: "https://wa.me/923000000000", color: "#25D366", icon: "M12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.3 1.3 4.8L2 22l5.3-1.4c1.4.7 3 1.1 4.7 1.1 5.5 0 10-4.5 10-10S17.5 2 12 2z" },
  { key: "x", label: "X Twitter", url: "https://x.com/", color: "#eef4fb", icon: "M18.9 2H22l-7.3 8.3L23 22h-6.8l-5.3-6.9L4.9 22H2l7.8-8.9L1.5 2h6.9l4.8 6.3L18.9 2z" },
  { key: "instagram", label: "Instagram", url: "https://www.instagram.com/", color: "#E1306C", icon: "M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.9c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.9s0-3.6.1-4.9c.1-3.2 1.7-4.8 4.9-4.9 1.3-.1 1.7-.1 4.9-.1z" },
  { key: "pcb", label: "PCB Official", url: "https://www.pcb.com.pk/", color: "#0f8a3e", icon: "M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z" },
  { key: "icc", label: "ICC Official", url: "https://www.icc-cricket.com/", color: "#1f4e8c", icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14z" }
];
export default function SocialRow({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", justifyContent: "center" }}>
      {SOCIAL_LINKS.map((s) => (
        <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}
          style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: compact ? ".5rem .7rem" : ".6rem .9rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.12)", borderRadius: ".55rem", color: "rgba(238,244,251,.85)", fontSize: ".78rem", textDecoration: "none" }}>
          <svg width={compact ? 14 : 16} height={compact ? 14 : 16} viewBox="0 0 24 24" fill={s.color} aria-hidden="true"><path d={s.icon} /></svg>
          {!compact && <span>{s.label}</span>}
        </a>
      ))}
    </div>
  );
}