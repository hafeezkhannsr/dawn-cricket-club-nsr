"use client";
type Props = { label?: string; color?: "red" | "green" | "gold" };
export default function LiveBadge({ label = "LIVE", color = "red" }: Props) {
  const colors = {
    red: { bg: "rgba(220,38,38,.15)", border: "rgba(220,38,38,.5)", text: "#fca5a5", dot: "#dc2626" },
    green: { bg: "rgba(20,164,77,.15)", border: "rgba(20,164,77,.5)", text: "#86efac", dot: "#14a44d" },
    gold: { bg: "rgba(240,180,41,.15)", border: "rgba(240,180,41,.5)", text: "#f0b429", dot: "#f0b429" },
  };
  const c = colors[color];
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: ".35rem",
      padding: ".22rem .55rem",
      borderRadius: ".35rem",
      background: c.bg,
      border: `1px solid ${c.border}`,
      color: c.text,
      fontSize: ".68rem",
      fontWeight: 800,
      letterSpacing: ".06em",
      textTransform: "uppercase",
    }}>
      <span style={{
        display: "inline-block",
        width: 6, height: 6,
        borderRadius: 999,
        background: c.dot,
        animation: "livePulse 1.6s ease-in-out infinite",
      }} />
      <span style={{ animation: "liveBlink 1.8s ease-in-out infinite" }}>{label}</span>
    </span>
  );
}