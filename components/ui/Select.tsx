"use client";
import { useEffect, useMemo, useRef, useState } from "react";
export type Option = { value: string; label: string; disabled?: boolean };
type Props = {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  id?: string;
  disabled?: boolean;
  "aria-label"?: string;
};
export default function Select({
  value,
  onChange,
  options,
  placeholder = "-- Select --",
  id,
  disabled,
  "aria-label": ariaLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const idx = options.findIndex((o) => o.value === value && !o.disabled);
    if (idx >= 0) setHighlighted(idx);
    else {
      const firstEnabled = options.findIndex((o) => !o.disabled);
      setHighlighted(firstEnabled);
    }
    requestAnimationFrame(() => {
      const el = listRef.current?.querySelector<HTMLLIElement>("li[data-hl='true']");
      el?.scrollIntoView({ block: "nearest" });
    });
  }, [open, options, value]);
  const selected = useMemo(() => options.find((o) => o.value === value), [options, value]);
  function nextEnabled(from: number, dir: 1 | -1): number {
    let i = from + dir;
    while (i >= 0 && i < options.length) {
      if (!options[i].disabled) return i;
      i += dir;
    }
    return from;
  }
  function commit(idx: number) {
    const opt = options[idx];
    if (!opt || opt.disabled) return;
    onChange(opt.value);
    setOpen(false);
    buttonRef.current?.focus();
  }
  function onButtonKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (open) {
      if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted((h) => nextEnabled(h, 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setHighlighted((h) => nextEnabled(h, -1)); }
      else if (e.key === "Home") { e.preventDefault(); setHighlighted(options.findIndex((o) => !o.disabled)); }
      else if (e.key === "End") {
        e.preventDefault();
        for (let i = options.length - 1; i >= 0; i--) if (!options[i].disabled) { setHighlighted(i); break; }
      }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); commit(highlighted); }
      else if (e.key === "Tab") { setOpen(false); }
    }
  }
  return (
    <div ref={rootRef} style={{ position: "relative", width: "100%" }}>
      <button
        ref={buttonRef}
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onButtonKeyDown}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: ".5rem",
          padding: ".7rem .85rem",
          background: "#0a1f3d",
          border: open ? "1px solid #f0b429" : "1px solid rgba(255,255,255,.18)",
          borderRadius: ".6rem",
          color: "#eef4fb",
          fontSize: ".92rem",
          fontFamily: "inherit",
          cursor: disabled ? "not-allowed" : "pointer",
          textAlign: "left",
          outline: "none",
          boxShadow: open ? "0 0 0 3px rgba(240,180,41,.15)" : "none",
          transition: "border-color .15s, box-shadow .15s",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <span
          style={{
            color: selected ? "#eef4fb" : "rgba(238,244,251,.4)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            minWidth: 0,
          }}
        >
          {selected ? selected.label : placeholder}
        </span>
        <svg
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="#f0b429" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .18s ease", flexShrink: 0 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby={id}
          style={{
            position: "absolute",
            top: "calc(100% + .35rem)",
            left: 0,
            right: 0,
            zIndex: 200,
            maxHeight: 320,
            overflowY: "auto",
            background: "#0a1f3d",
            border: "1px solid rgba(240,180,41,.4)",
            borderRadius: ".6rem",
            padding: ".35rem",
            margin: 0,
            listStyle: "none",
            boxShadow: "0 20px 50px -12px rgba(0,0,0,.7), 0 0 0 1px rgba(240,180,41,.08)",
            animation: "dropdownIn .14s ease-out",
          }}
        >
          {options.map((opt, i) => {
            const isSel = opt.value === value;
            const isHigh = i === highlighted && !opt.disabled;
            const isDisabled = opt.disabled === true;
            return (
              <li
                key={opt.value || `opt-${i}`}
                role="option"
                aria-selected={isSel}
                aria-disabled={isDisabled || undefined}
                data-hl={isHigh}
                onMouseEnter={() => { if (!isDisabled) setHighlighted(i); }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (isDisabled) return;
                  commit(i);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: ".5rem",
                  padding: ".6rem .7rem",
                  borderRadius: ".45rem",
                  fontSize: ".9rem",
                  transition: "background .1s ease",
                  userSelect: "none",
                  background: isSel
                    ? "rgba(240,180,41,.16)"
                    : isHigh
                    ? "rgba(255,255,255,.08)"
                    : "transparent",
                  color: isDisabled
                    ? "rgba(238,244,251,.28)"
                    : isSel
                    ? "#f0b429"
                    : "#eef4fb",
                  fontWeight: isSel ? 700 : 500,
                  cursor: isDisabled ? "not-allowed" : "pointer",
                  opacity: isDisabled ? 0.7 : 1,
                }}
              >
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {opt.label}
                </span>
                {isSel && !isDisabled && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#f0b429" strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                    style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {isDisabled && (
                  <span style={{ fontSize: ".75rem", flexShrink: 0, color: "rgba(238,244,251,.35)" }}>🔒</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}