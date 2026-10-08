import { SOCIAL_LINKS } from "@/lib/data/social-links";
export default function SocialRow({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: ".5rem",
      justifyContent: "center",
    }}>
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.key}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          title={s.label}
          style={{
            display: "inline-flex", alignItems: "center", gap: ".5rem",
            padding: compact ? ".5rem .7rem" : ".6rem .9rem",
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: ".55rem",
            color: "rgba(238,244,251,.85)",
            fontSize: ".78rem",
            textDecoration: "none",
            transition: "all .15s ease",
          }}
        >
          <svg width={compact ? 14 : 16} height={compact ? 14 : 16} viewBox="0 0 24 24"
            fill={s.color} aria-hidden="true">
            <path d={s.icon} />
          </svg>
          {!compact && <span>{s.label}</span>}
        </a>
      ))}
    </div>
  );
}