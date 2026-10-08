"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DEFAULT_LANG, t as translate, type Lang } from "@/lib/i18n/dictionary";
type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};
const LangContext = createContext<Ctx>({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (k) => k,
});
const STORAGE_KEY = "dawn.lang";
export default function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ur") setLangState(saved);
    } catch {}
  }, []);
  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    }
  }, [lang]);
  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const t = useCallback((key: string) => translate(key, lang), [lang]);
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}
export function useLang() {
  return useContext(LangContext);
}