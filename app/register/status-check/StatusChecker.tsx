"use client";
import { useState } from "react";
type Reg = {
  id: string;
  registrationNumber: string;
  program: string;
  registrationType: string;
  status: string;
  paymentStatus: string;
  feeAmount: number;
  currency: string;
  data: Record<string, unknown>;
  createdAt: string;
  statusHistory: { at: string; to: string; note?: string }[];
};
export default function StatusChecker() {
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [reg, setReg] = useState<Reg | null>(null);
  const [err, setErr] = useState<string | null>(null);
  async function check(e: React.FormEvent) {
    e.preventDefault();
    const val = q.trim();
    if (!val) return;
    setErr(null);
    setReg(null);
    setBusy(true);
    try {
      // Uses generic search endpoint — matches registration number
      const res = await fetch(`/api/v1/registrations?q=${encodeURIComponent(val)}`, { cache: "no-store" });
      const j = await res.json();
      if (j.ok && j.items) {
        const exact = j.items.find((r: Reg) =>
          r.registrationNumber.toLowerCase() === val.toLowerCase()
        );
        if (exact) setReg(exact);
        else if (j.items.length > 0) setReg(j.items[0]);
        else setErr("No registration found for this number.");
      } else {
        setErr("No registration found.");
      }
    } catch {
      setErr("Network error. Please try again.");
    }
    setBusy(false);
  }
  const inputStyle: React.CSSProperties = {
    flex: 1, minWidth: 200,
    padding: ".75rem .9rem",
    background: "#0a1f3d",
    border: "1px solid rgba(255,255,255,.15)",
    borderRadius: ".6rem",
    color: "#eef4fb",
    fontSize: ".92rem",
    fontFamily: "inherit",
    outline: "none",
  };
  return (
    <div>
      <form onSubmit={check} style={{
        padding: "1.5rem",
        background: "rgba(255,255,255,.03)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: ".9rem",
      }}>
        <label style={{ display: "block", fontSize: ".85rem", color: "rgba(238,244,251,.85)", marginBottom: ".5rem", fontWeight: 600 }}>
          Registration number
        </label>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. DAWN-2026-1234"
            style={inputStyle}
          />
          <button type="submit" disabled={busy} className="btn btn-gold" style={{ opacity: busy ? .7 : 1 }}>
            {busy ? "…" : "Check"}
          </button>
        </div>
        {err && (
          <div style={{
            marginTop: "1rem", padding: ".75rem 1rem",
            background: "rgba(240,180,41,.1)",
            border: "1px solid rgba(240,180,41,.4)",
            borderRadius: ".55rem",
            color: "#f0b429",
            fontSize: ".85rem",
          }}>{err}</div>
        )}
      </form>
      {reg && (
        <div style={{
          marginTop: "1.25rem",
          padding: "1.5rem",
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(20,164,77,.4)",
          borderRadius: ".9rem",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: ".75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <div>
              <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".2rem" }}>
                Registration
              </div>
              <div style={{ fontFamily: "monospace", color: "#f0b429", fontSize: "1.05rem", fontWeight: 700 }}>
                {reg.registrationNumber}
              </div>
            </div>
            <span style={{
              padding: ".3rem .7rem", borderRadius: 999,
              background: reg.status === "APPROVED" ? "rgba(20,164,77,.18)"
                        : reg.status === "REJECTED" ? "rgba(176,30,30,.2)"
                        : "rgba(240,180,41,.18)",
              color: reg.status === "APPROVED" ? "#86efac"
                   : reg.status === "REJECTED" ? "#ff8b8b"
                   : "#f0b429",
              fontSize: ".72rem", fontWeight: 800, letterSpacing: ".04em",
            }}>
              {reg.status.replace(/_/g, " ")}
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".6rem", fontSize: ".85rem" }}>
            <Row k="Applicant" v={String(reg.data.fullNameEn || "—")} />
            <Row k="Program" v={reg.program} />
            <Row k="Type" v={reg.registrationType} />
            <Row k="Fee" v={`PKR ${reg.feeAmount.toLocaleString()}`} />
            <Row k="Payment" v={reg.paymentStatus.replace(/_/g, " ")} />
            <Row k="Submitted" v={new Date(reg.createdAt).toLocaleDateString()} />
          </div>
          {reg.statusHistory.length > 0 && (
            <>
              <div style={{ marginTop: "1.25rem", fontSize: ".72rem", color: "rgba(238,244,251,.55)", letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 700, marginBottom: ".5rem" }}>
                Timeline
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
                {reg.statusHistory.map((h, i) => (
                  <div key={i} style={{
                    display: "flex", gap: ".75rem", alignItems: "flex-start",
                    fontSize: ".8rem", color: "rgba(238,244,251,.75)",
                    paddingBottom: ".35rem",
                    borderBottom: i === reg.statusHistory.length - 1 ? "none" : "1px solid rgba(255,255,255,.05)",
                  }}>
                    <span style={{ color: "#f0b429", fontWeight: 700, whiteSpace: "nowrap" }}>
                      {new Date(h.at).toLocaleDateString()}
                    </span>
                    <span>{h.to.replace(/_/g, " ")}{h.note ? ` — ${h.note}` : ""}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          <div style={{ marginTop: "1.25rem", fontSize: ".78rem", color: "rgba(238,244,251,.55)", lineHeight: 1.6 }}>
            If your status shows <b>Needs Correction</b>, please contact the club on WhatsApp to resolve.
            Approved players can view their card from <a href="/player" style={{ color: "#f0b429" }}>My Account</a>.
          </div>
        </div>
      )}
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: ".75rem", padding: ".35rem 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
      <span style={{ color: "rgba(238,244,251,.55)" }}>{k}</span>
      <span style={{ color: "#fff", textAlign: "right", fontWeight: 600, wordBreak: "break-word" }}>{v}</span>
    </div>
  );
}