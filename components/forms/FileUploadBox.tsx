"use client";
import { useRef, useState } from "react";
export type UploadedFile = {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
};
type Props = {
  label: string;
  labelUr?: string;
  value?: UploadedFile | null;
  onChange: (f: UploadedFile | null) => void;
  accept?: string;
  maxSizeMB?: number;
  hint?: string;
  required?: boolean;
  error?: string;
};
const DEFAULT_ACCEPT = "image/jpeg,image/png,image/webp,application/pdf";
export default function FileUploadBox({
  label,
  labelUr,
  value,
  onChange,
  accept = DEFAULT_ACCEPT,
  maxSizeMB = 3,
  hint,
  required,
  error,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [localErr, setLocalErr] = useState<string | null>(null);
  async function handleFile(file: File) {
    setLocalErr(null);
    // size check
    if (file.size > maxSizeMB * 1024 * 1024) {
      setLocalErr(`File too large. Maximum ${maxSizeMB} MB allowed.`);
      return;
    }
    // mime check (basic — server-side validation still required)
    const ok = ["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type);
    if (!ok) {
      setLocalErr("Only JPG, PNG, WebP or PDF files are allowed.");
      return;
    }
    setBusy(true);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("Read failed"));
        reader.readAsDataURL(file);
      });
      onChange({ name: file.name, size: file.size, type: file.type, dataUrl });
    } catch {
      setLocalErr("Could not read the file. Please try again.");
    }
    setBusy(false);
  }
  const isImage = value?.type.startsWith("image/");
  const showErr = error || localErr;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
      <label style={{
        fontSize: ".82rem", fontWeight: 600, color: "rgba(238,244,251,.92)",
        display: "flex", alignItems: "baseline", gap: ".5rem", flexWrap: "wrap",
      }}>
        <span>{label}{required && <span style={{ color: "#f0b429", marginLeft: 4 }}>*</span>}</span>
        {labelUr && <span style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)" }} dir="rtl">{labelUr}</span>}
      </label>
      {!value ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          style={{
            width: "100%",
            padding: "1.1rem .9rem",
            background: "rgba(255,255,255,.02)",
            border: "1.5px dashed rgba(240,180,41,.4)",
            borderRadius: ".7rem",
            color: "rgba(238,244,251,.85)",
            fontSize: ".85rem",
            fontFamily: "inherit",
            cursor: busy ? "wait" : "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: ".4rem",
            transition: "all .15s ease",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
            stroke="#f0b429" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span style={{ fontWeight: 600, color: "#f0b429" }}>
            {busy ? "Reading…" : "Click to upload"}
          </span>
          <span style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)" }}>
            JPG, PNG, WebP or PDF · max {maxSizeMB} MB
          </span>
        </button>
      ) : (
        <div style={{
          display: "flex", gap: ".75rem", alignItems: "center",
          padding: ".75rem",
          background: "rgba(20,164,77,.08)",
          border: "1px solid rgba(20,164,77,.35)",
          borderRadius: ".7rem",
        }}>
          {isImage ? (
            <img
              src={value.dataUrl}
              alt={value.name}
              style={{
                width: 64, height: 64, objectFit: "cover",
                borderRadius: ".5rem", border: "1px solid rgba(255,255,255,.15)",
                flexShrink: 0,
              }}
            />
          ) : (
            <div style={{
              width: 64, height: 64, borderRadius: ".5rem",
              background: "rgba(240,180,41,.12)",
              border: "1px solid rgba(240,180,41,.35)",
              display: "grid", placeItems: "center",
              color: "#f0b429", fontWeight: 800, fontSize: ".72rem",
              flexShrink: 0,
            }}>PDF</div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: ".85rem", fontWeight: 600, color: "#fff",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{value.name}</div>
            <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", marginTop: ".15rem" }}>
              {(value.size / 1024).toFixed(0)} KB
              <span style={{ color: "#86efac", marginLeft: ".5rem" }}>✓ Ready</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove file"
            style={{
              background: "transparent",
              border: "1px solid rgba(255,80,80,.4)",
              color: "#ff8b8b",
              borderRadius: ".5rem",
              width: 32, height: 32, cursor: "pointer",
              display: "grid", placeItems: "center",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
      {hint && !showErr && (
        <span style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)", lineHeight: 1.4 }}>{hint}</span>
      )}
      {showErr && (
        <span role="alert" style={{ fontSize: ".74rem", color: "#ff8b8b", lineHeight: 1.4 }}>
          {showErr}
        </span>
      )}
    </div>
  );
}