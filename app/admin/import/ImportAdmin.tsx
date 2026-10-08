"use client";
import { useRef, useState } from "react";
export default function ImportAdmin() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  function parseCsv(text: string): string[][] {
    const rows: string[][] = [];
    let cur: string[] = [];
    let field = "";
    let inQ = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQ) {
        if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
        else if (c === '"') inQ = false;
        else field += c;
      } else {
        if (c === '"') inQ = true;
        else if (c === ",") { cur.push(field); field = ""; }
        else if (c === "\n") { cur.push(field); rows.push(cur); cur = []; field = ""; }
        else if (c === "\r") { /* skip */ }
        else field += c;
      }
    }
    if (field.length > 0 || cur.length > 0) { cur.push(field); rows.push(cur); }
    return rows.filter((r) => r.some((v) => v.trim() !== ""));
  }
  async function handleFile(f: File) {
    setMsg(null);
    setFile(f);
    const text = await f.text();
    const rows = parseCsv(text.replace(/^\uFEFF/, ""));
    if (rows.length === 0) { setMsg("Empty file"); return; }
    setHeaders(rows[0]);
    setPreview(rows.slice(1, 6));
  }
  return (
    <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
      <div className="container">
        <header style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}>Bulk Import (CSV)</h1>
          <p style={{ margin: ".35rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
            Import player records from a CSV file. Preview shows the first 5 rows.
          </p>
        </header>
        <div style={{
          padding: "1.5rem",
          background: "rgba(255,255,255,.03)",
          border: "1.5px dashed rgba(240,180,41,.4)",
          borderRadius: ".9rem",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}>
          <input
            ref={inputRef}
            type="file"
            accept=".csv,text/csv"
            style={{ display: "none" }}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
          <div style={{ fontSize: "2.5rem", marginBottom: ".5rem" }}>📊</div>
          <div style={{ fontWeight: 700, marginBottom: ".5rem" }}>
            {file ? file.name : "Choose a CSV file"}
          </div>
          <p style={{ fontSize: ".82rem", color: "rgba(238,244,251,.6)", marginBottom: "1rem" }}>
            UTF-8 encoded, comma separated. First row must be headers.
          </p>
          <button className="btn btn-gold" onClick={() => inputRef.current?.click()}>
            {file ? "Choose different file" : "Choose file"}
          </button>
        </div>
        {msg && (
          <div style={{
            padding: ".75rem 1rem", marginBottom: "1rem",
            background: "rgba(255,80,80,.12)",
            border: "1px solid rgba(255,80,80,.4)",
            borderRadius: ".55rem",
            color: "#ff8b8b", fontSize: ".85rem",
          }}>{msg}</div>
        )}
        {preview.length > 0 && (
          <>
            <div style={{ marginBottom: ".5rem", fontSize: ".82rem", color: "rgba(238,244,251,.7)" }}>
              Preview ({preview.length} of rows shown)
            </div>
            <div style={{
              background: "rgba(255,255,255,.02)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: ".9rem",
              overflow: "auto",
              marginBottom: "1rem",
            }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".78rem" }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,.03)" }}>
                    {headers.map((h, i) => (
                      <th key={i} style={{
                        textAlign: "left", padding: ".55rem .7rem",
                        color: "rgba(238,244,251,.7)", fontWeight: 700,
                        fontSize: ".7rem", letterSpacing: ".04em", textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid rgba(255,255,255,.08)",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{ padding: ".5rem .7rem", color: "rgba(238,244,251,.8)", whiteSpace: "nowrap" }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{
              padding: "1rem 1.25rem",
              background: "rgba(240,180,41,.08)",
              border: "1px solid rgba(240,180,41,.28)",
              borderRadius: ".7rem",
              fontSize: ".82rem",
              color: "rgba(238,244,251,.85)",
              lineHeight: 1.65,
            }}>
              <b style={{ color: "#f0b429" }}>Next step:</b> Connect a real database (Neon PostgreSQL recommended)
              to enable actual import. Right now this page previews your CSV so you can verify format.
              <br /><br />
              For full import, deploy the app first (GitHub → Vercel) and connect PostgreSQL in the same step.
            </div>
          </>
        )}
      </div>
    </main>
  );
}