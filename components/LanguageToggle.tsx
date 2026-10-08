"use client";
import { useEffect, useState } from "react";
import { DEFAULT_LANG, type Lang } from "@/lib/i18n/dictionary";
const STORAGE_KEY = "dawn.lang";
export default function LanguageToggle() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ur") {
        setLang(saved);
        document.documentElement.dir = saved === "ur" ? "rtl" : "ltr";
        document.documentElement.lang = saved;
      }
    } catch {}
  }, []);
  function toggle() {
    const next: Lang = lang === "en" ? "ur" : "en";
    setLang(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.dir = next === "ur" ? "rtl" : "ltr";
      document.documentElement.lang = next;
    } catch {}
    // Reload to apply RTL properly
    setTimeout(() => window.location.reload(), 100);
  }
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${lang === "en" ? "Urdu" : "English"}`}
      title={`Switch to ${lang === "en" ? "Urdu" : "English"}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: ".35rem",
        padding: ".4rem .7rem",
        background: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.14)",
        borderRadius: ".5rem",
        color: "#eef4fb",
        fontSize: ".78rem",
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f0b429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
      </svg>
      {lang === "en" ? "EN" : "اردو"}
    </button>
  );
}