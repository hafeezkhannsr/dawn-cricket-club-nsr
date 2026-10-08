"use client";
import { useState } from "react";
export default function ExportPanel() {
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ kind: "ok" | "err" | "info"; text: string } | null>(null);
  function download(url: string, name: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  async function pushToSheets() {
    setBusy("sheets");
    setMsg(null);
    try {
      const res = await fetch("/api/v1/export/sheets-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onlyNew: false }),
      });
      const j = await res.json();
      if (j.ok) {
        setMsg({ kind: "ok", text: `Pushed ${j.appended} row(s) to Google Sheets.` });
      } else {
        setMsg({ kind: "err", text: j.error || "Push failed" });
      }
    } catch (e) {
      setMsg({ kind: "err", text: e instanceof Error ? e.message : "Network error" });
    }
    setBusy(null);
  }
  return (
    <div style={{
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: ".9rem",
      padding: "1.25rem",
      marginBottom: "1.5rem",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: ".75rem", marginBottom: "1rem" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800 }}>Export & Sync</h2>
          <p style={{ margin: ".25rem 0 0", fontSize: ".82rem", color: "rgba(238,244,251,.6)" }}>
            Download data or push directly to Google Sheets
          </p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: ".6rem" }}>
        <button
          onClick={() => download("/api/v1/export/registrations?format=csv", "dawn-registrations.csv")}
          className="btn btn-outline"
          style={{ width: "100%", justifyContent: "center" }}
        >
          📊 Download CSV (Excel/Sheets)
        </button>
        <button
          onClick={() => download("/api/v1/export/registrations?format=tsv", "dawn-registrations.tsv")}
          className="btn btn-outline"
          style={{ width: "100%", justifyContent: "center" }}
        >
          📋 Download TSV (copy-paste)
        </button>
        <button
          onClick={() => download("/api/v1/export/registrations?format=json", "dawn-registrations.json")}
          className="btn btn-outline"
          style={{ width: "100%", justifyContent: "center" }}
        >
          🧾 Download JSON (backup)
        </button>
        <button
          onClick={() => download("/api/v1/export/sheets-setup", "dawn-sheets-sync.gs")}
          className="btn btn-outline"
          style={{ width: "100%", justifyContent: "center" }}
        >
          ⚙️ Download Apps Script
        </button>
        <button
          onClick={pushToSheets}
          disabled={busy === "sheets"}
          className="btn btn-gold"
          style={{ width: "100%", justifyContent: "center", opacity: busy === "sheets" ? .7 : 1 }}
        >
          {busy === "sheets" ? "Pushing…" : "🚀 Push to Google Sheets"}
        </button>
      </div>
      {msg && (
        <div style={{
          marginTop: "1rem",
          padding: ".75rem 1rem",
          borderRadius: ".55rem",
          background:
            msg.kind === "ok" ? "rgba(20,164,77,.12)" :
            msg.kind === "err" ? "rgba(255,80,80,.12)" :
            "rgba(240,180,41,.12)",
          border:
            msg.kind === "ok" ? "1px solid rgba(20,164,77,.4)" :
            msg.kind === "err" ? "1px solid rgba(255,80,80,.4)" :
            "1px solid rgba(240,180,41,.4)",
          color:
            msg.kind === "ok" ? "#86efac" :
            msg.kind === "err" ? "#ff8b8b" :
            "#f0b429",
          fontSize: ".85rem",
        }}>
          {msg.text}
        </div>
      )}
      <details style={{ marginTop: "1rem", fontSize: ".82rem", color: "rgba(238,244,251,.7)" }}>
        <summary style={{ cursor: "pointer", fontWeight: 600, color: "#f0b429" }}>
          📖 How to connect Google Sheets (one-time setup)
        </summary>
        <ol style={{ marginTop: ".75rem", paddingLeft: "1.25rem", lineHeight: 1.8 }}>
          <li>Download the Apps Script above (⚙️ button)</li>
          <li>Open your Google Sheet → <b>Extensions</b> → <b>Apps Script</b></li>
          <li>Delete existing code, paste the downloaded script</li>
          <li>Change <code>SHARED_SECRET</code> to a long random string</li>
          <li>Click <b>Deploy</b> → <b>New deployment</b> → type <b>Web app</b></li>
          <li><b>Execute as:</b> Me · <b>Who has access:</b> Anyone</li>
          <li>Copy the <b>Web app URL</b></li>
          <li>Create <code>.env.local</code> in project root with:
            <pre style={{
              marginTop: ".5rem",
              padding: ".65rem .85rem",
              background: "rgba(0,0,0,.35)",
              borderRadius: ".5rem",
              fontSize: ".72rem",
              overflowX: "auto",
              color: "#86efac",
            }}>
{`GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXX/exec
GOOGLE_SHEETS_SECRET=your_long_random_string_here`}
            </pre>
          </li>
          <li>Restart dev server</li>
          <li>Click "🚀 Push to Google Sheets"</li>
        </ol>
      </details>
    </div>
  );
}