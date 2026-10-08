"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { searchQA, greeting, QUICK_QUESTIONS, type QA } from "@/lib/chatbot/knowledge";
type Lang = "en" | "ur";
type Msg = {
  id: string;
  role: "user" | "bot";
  text: string;
  action?: { label: string; href: string };
  time: string;
};
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: "greet",
        role: "bot",
        text: greeting(lang),
        time: new Date().toISOString(),
      }]);
    }
  }, [lang, messages.length]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);
  function reply(text: string) {
    const results = searchQA(text, lang);
    if (results.length === 0) {
      return {
        text: lang === "ur"
          ? "معاف کیجیے، مجھے اس کا جواب نہیں ملا۔ آپ رجسٹریشن، فیس، تصدیق، میچ یا رابطہ کے بارے میں پوچھ سکتے ہیں۔"
          : "Sorry, I couldn't find an answer. You can ask about registration, fees, verification, matches or contact.",
      };
    }
    const top = results[0].qa;
    return {
      text: top.answer[lang],
      action: top.action,
    };
  }
  function send(text?: string) {
    const value = (text ?? input).trim();
    if (!value) return;
    const now = new Date().toISOString();
    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", text: value, time: now };
    const r = reply(value);
    const botMsg: Msg = {
      id: `b-${Date.now()}`,
      role: "bot",
      text: r.text,
      action: r.action,
      time: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }
  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        style={{
          position: "fixed",
          right: "1.25rem",
          bottom: "1.25rem",
          zIndex: 250,
          width: 56, height: 56,
          borderRadius: 999,
          background: "linear-gradient(135deg, #f0b429, #cb6e17)",
          color: "#061428",
          border: "none",
          cursor: "pointer",
          display: "grid", placeItems: "center",
          boxShadow: "0 12px 40px -8px rgba(240,180,41,.55)",
        }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="#061428" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="#061428" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="DAWN Assistant"
          style={{
            position: "fixed",
            right: "1rem",
            bottom: "5rem",
            zIndex: 249,
            width: "min(380px, calc(100vw - 2rem))",
            height: "min(560px, calc(100vh - 7rem))",
            background: "#061428",
            border: "1px solid rgba(240,180,41,.4)",
            borderRadius: "1rem",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 30px 70px -20px rgba(0,0,0,.8)",
          }}
        >
          {/* Header */}
          <div style={{
            padding: ".9rem 1rem",
            background: "linear-gradient(90deg, rgba(240,180,41,.2), rgba(20,164,77,.08))",
            borderBottom: "1px solid rgba(255,255,255,.08)",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".5rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
              <div style={{
                width: 32, height: 32, borderRadius: 999,
                background: "linear-gradient(135deg, #f0b429, #cb6e17)",
                color: "#061428", fontWeight: 800,
                display: "grid", placeItems: "center", fontSize: ".85rem",
              }}>D</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: ".88rem", color: "#fff" }}>DAWN Assistant</div>
                <div style={{ fontSize: ".68rem", color: "rgba(238,244,251,.6)" }}>
                  {lang === "en" ? "Online · instant answers" : "آن لائن · فوری جوابات"}
                </div>
              </div>
            </div>
            <button
              onClick={() => setLang((l) => (l === "en" ? "ur" : "en"))}
              style={{
                padding: ".3rem .6rem",
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.14)",
                borderRadius: ".4rem",
                color: "#eef4fb",
                fontSize: ".72rem",
                cursor: "pointer",
              }}
            >
              {lang === "en" ? "اردو" : "EN"}
            </button>
          </div>
          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem",
              display: "flex", flexDirection: "column", gap: ".75rem",
              scrollbarWidth: "thin",
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                }}
              >
                <div style={{
                  padding: ".7rem .9rem",
                  borderRadius: ".8rem",
                  background: m.role === "user" ? "#14a44d" : "rgba(255,255,255,.05)",
                  border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,.08)",
                  color: m.role === "user" ? "#fff" : "#eef4fb",
                  fontSize: ".85rem",
                  lineHeight: 1.55,
                  direction: lang === "ur" && m.role === "bot" ? "rtl" : "ltr",
                  textAlign: lang === "ur" && m.role === "bot" ? "right" : "left",
                }}>
                  {m.text}
                </div>
                {m.action && (
                  <Link
                    href={m.action.href}
                    style={{
                      display: "inline-block",
                      marginTop: ".35rem",
                      padding: ".35rem .7rem",
                      background: "rgba(240,180,41,.15)",
                      border: "1px solid rgba(240,180,41,.4)",
                      borderRadius: ".45rem",
                      color: "#f0b429",
                      fontSize: ".75rem",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    {m.action.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
          {/* Quick questions */}
          {messages.length <= 1 && (
            <div style={{ padding: "0 .75rem .5rem", display: "flex", gap: ".35rem", flexWrap: "wrap" }}>
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => send(q[lang])}
                  style={{
                    padding: ".35rem .6rem",
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.12)",
                    borderRadius: ".45rem",
                    color: "rgba(238,244,251,.85)",
                    fontSize: ".72rem",
                    cursor: "pointer",
                  }}
                >
                  {q[lang]}
                </button>
              ))}
            </div>
          )}
          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            style={{
              padding: ".6rem .75rem",
              borderTop: "1px solid rgba(255,255,255,.08)",
              display: "flex", gap: ".5rem", alignItems: "center",
              background: "rgba(0,0,0,.15)",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === "ur" ? "سوال لکھیں…" : "Type your question…"}
              style={{
                flex: 1,
                padding: ".55rem .75rem",
                background: "#0a1f3d",
                border: "1px solid rgba(255,255,255,.14)",
                borderRadius: ".5rem",
                color: "#eef4fb",
                fontSize: ".85rem",
                outline: "none",
                fontFamily: "inherit",
                direction: lang === "ur" ? "rtl" : "ltr",
              }}
            />
            <button
              type="submit"
              className="btn btn-gold"
              style={{ padding: ".5rem .75rem", borderRadius: ".5rem" }}
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#061428" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}