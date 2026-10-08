"use client";
import type { ReactNode } from "react";
type Props = {
  label: string;
  labelUr?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};
export default function FormField({ label, labelUr, required, hint, error, children }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
      <label style={{
        fontSize: ".82rem", fontWeight: 600, color: "rgba(238,244,251,.92)",
        display: "flex", alignItems: "baseline", gap: ".5rem", flexWrap: "wrap",
      }}>
        <span>{label}{required && <span style={{ color: "#f0b429", marginLeft: 4 }}>*</span>}</span>
        {labelUr && <span style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)" }} dir="rtl">{labelUr}</span>}
      </label>
      {children}
      {hint && !error && (
        <span style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)", lineHeight: 1.4 }}>{hint}</span>
      )}
      {error && (
        <span role="alert" style={{ fontSize: ".74rem", color: "#ff8b8b", lineHeight: 1.4 }}>
          {error}
        </span>
      )}
    </div>
  );
}
export const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: ".7rem .85rem",
  background: "rgba(255,255,255,.04)",
  border: "1px solid rgba(255,255,255,.14)",
  borderRadius: ".6rem",
  color: "#eef4fb",
  fontSize: ".92rem",
  outline: "none",
  transition: "border-color .15s, background .15s",
  fontFamily: "inherit",
};
export const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23f0b429' stroke-width='2.5'><polyline points='6 9 12 15 18 9'/></svg>\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right .8rem center",
  paddingRight: "2.2rem",
};