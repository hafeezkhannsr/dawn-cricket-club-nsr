"use client";
import { useRef, useState } from "react";
type Preview = {
  headers: string[];
  rowCount: number;
  preview: Record<string, string>[];
  note: string;
};
export default function ImportAdmin() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function handleFile(f: File) {
    setErr(null);
    setFile(f);
    setPreview(null);
    if (f.size > 5 * 1024 * 1024) {
      setErr("File too large (max 5 MB)");
      return;
    }
    setBusy(true);
    try {
      const csv = await f.text();
      const res = await fetch("/api/v1/import/csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv }),
      });
      const j = await res.json();
      if (!j.ok) { setErr(j.error || "Failed"); setBusy(false); return; }
      setPreview(j);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to read file");
    }
    setBusy(false);
  }
  function downloadTemplate() {
    const headers = [
      "RegistrationNumber", "Program", "RegistrationType", "PlayerCategory", "Edition",
      "Status", "PaymentStatus", "FeeAmount", "FullName", "FatherName", "DateOfBirth",
      "Gender", "Nationality", "PrimaryMobile", "Email", "ResidenceCity", "Village",
      "PlayingRole", "BattingStyle", "BowlingStyle", "BallType",
    ];
    const sample = [
      "DAWN-2027-0001", "DAWN", "PLAYER", "Local Player", "",
      "APPROVED", "VERIFIED", "3000", "Muhammad Ahsan", "Muhammad Ilyas", "2010-05-15",
      "Male", "Pakistani", "0300-1234567", "ahsan@example.com", "Nowshera", "Dheri Katti Khel",
      "Batter", "Right-hand", "Right-arm medium", "Hard Ball",
    ];
    const csv = "\uFEFF" + [headers, sample].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dawn-import-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div>
      {/* Upload area */}
      <div style={{
        padding: "2rem 1.5rem",
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
        <div style={{ fontWeight: 800, marginBottom: ".5rem", color: "#fff", fontSize: "1rem" }}>
          {file ? file.name : "Choose a CSV file"}
        </div>
        <p style={{ fontSize: ".82rem", color: "rgba(238,244,251,.6)", marginBottom: "1.25rem", maxWidth: 520, margin: "0 auto 1.25rem" }}>
          UTF-8 encoded, comma-separated. First row must be headers. Max 5 MB.
        </p>
        <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn-gold" onClick={() => inputRef.current?.click()} disabled={busy}>
            {busy ? "Reading…" : file ? "Choose different file" : "Choose file"}
          </button>
          <button className="btn btn-outline" onClick={downloadTemplate}>📥 Download template</button>
        </div>
      </div>
      {err && (
        <div style={{ padding: ".75rem 1rem", marginBottom: "1rem", background: "rgba(255,80,80,.12)", border: "1px solid rgba(255,80,80,.4)", borderRadius: ".55rem", color: "#ff8b8b", fontSize: ".85rem" }}>
          {err}
        </div>
      )}
      {preview && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: ".6rem", marginBottom: "1.5rem" }}>
            <Stat label="Columns" value={preview.headers.length.toString()} color="#f0b429" />
            <Stat label="Rows" value={preview.rowCount.toString()} color="#86efac" />
            <Stat label="Preview" value={preview.preview.length + " rows"} color="#93c5fd" />
          </div>
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", overflow: "hidden", marginBottom: "1.5rem" }}>
            <div style={{ padding: "1rem 1.25rem", background: "rgba(240,180,41,.08)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
              <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 900 }}>📋 Preview (first 20 rows)</h2>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".78rem", minWidth: 800 }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,.02)" }}>
                    {preview.headers.map((h) => (
                      <th key={h} style={{ padding: ".55rem .7rem", textAlign: "left", color: "rgba(238,244,251,.7)", fontWeight: 700, fontSize: ".68rem", textTransform: "uppercase", letterSpacing: ".04em", whiteSpace: "nowrap", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.preview.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                      {preview.headers.map((h) => (
                        <td key={h} style={{ padding: ".5rem .7rem", color: "rgba(238,244,251,.8)", whiteSpace: "nowrap" }}>
                          {row[h] || "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ padding: "1rem 1.25rem", background: "rgba(240,180,41,.08)", border: "1px solid rgba(240,180,41,.3)", borderRadius: ".7rem", fontSize: ".82rem", color: "rgba(238,244,251,.85)", lineHeight: 1.7 }}>
            <b style={{ color: "#f0b429" }}>ℹ️ Note:</b> {preview.note}
          </div>
        </>
      )}
    </div>
  );
}
function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ padding: ".85rem 1rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".7rem" }}>
      <div style={{ fontSize: ".65rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase", fontWeight: 700, letterSpacing: ".04em" }}>{label}</div>
      <div style={{ fontSize: "1.4rem", fontWeight: 900, color, marginTop: ".25rem" }}>{value}</div>
    </div>
  );
}