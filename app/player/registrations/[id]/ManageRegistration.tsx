"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  updatedAt: string;
  statusHistory: { at: string; to: string; note?: string }[];
};
export default function ManageRegistration({ regId }: { regId: string }) {
  const router = useRouter();
  const [reg, setReg] = useState<Reg | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editFields, setEditFields] = useState<Record<string, string>>({});
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/my-registrations/${regId}`, { cache: "no-store" });
      const j = await res.json();
      if (j.ok) setReg(j.item);
    } catch {}
    setLoading(false);
  }, [regId]);
  useEffect(() => { load(); }, [load]);
  function startEdit() {
    if (!reg) return;
    const d = reg.data;
    setEditFields({
      fullNameEn: String(d.fullNameEn || ""),
      fatherName: String(d.fatherName || ""),
      primaryMobile: String(d.primaryMobile || ""),
      email: String(d.email || ""),
      residenceCity: String(d.residenceCity || ""),
      postalAddress: String(d.postalAddress || ""),
      playingRole: String(d.playingRole || ""),
      battingStyle: String(d.battingStyle || ""),
      bowlingStyle: String(d.bowlingStyle || ""),
      availability: String(d.availability || ""),
      previousClub: String(d.previousClub || ""),
    });
    setEditMode(true);
    setMsg(null);
  }
  async function saveEdit() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/v1/my-registrations/${regId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patch: editFields }),
      });
      const j = await res.json();
      if (j.ok) {
        setMsg({ kind: "ok", text: "Changes saved successfully." });
        setEditMode(false);
        await load();
      } else {
        setMsg({ kind: "err", text: j.error || "Save failed" });
      }
    } catch {
      setMsg({ kind: "err", text: "Network error" });
    }
    setBusy(false);
  }
  async function doDelete() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/v1/my-registrations/${regId}`, { method: "DELETE" });
      const j = await res.json();
      if (j.ok) {
        setMsg({
          kind: "ok",
          text: `Deleted. Removed ${j.removedFiles ?? 0} file(s).${
            j.sheetsNotified ? " Google Sheet updated." : ""
          }`,
        });
        setTimeout(() => router.push("/player/registrations"), 1200);
      } else {
        setMsg({ kind: "err", text: j.error || "Delete failed" });
      }
    } catch {
      setMsg({ kind: "err", text: "Network error" });
    }
    setBusy(false);
    setConfirmDelete(false);
  }
  if (loading) {
    return <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "3rem 1rem", textAlign: "center" }}>Loading…</main>;
  }
  if (!reg) {
    return (
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "3rem 1rem", textAlign: "center" }}>
        <p style={{ color: "#ff8b8b" }}>Registration not found</p>
        <Link href="/player/registrations" className="btn btn-gold">← Back</Link>
      </main>
    );
  }
  const canEdit = ["DRAFT", "NEEDS_CORRECTION", "SUBMITTED", "UNDER_REVIEW"].includes(reg.status);
  const d = reg.data as Record<string, unknown>;
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: ".65rem .8rem",
    background: "#0a1f3d",
    border: "1px solid rgba(255,255,255,.15)",
    borderRadius: ".55rem",
    color: "#eef4fb",
    fontSize: ".88rem",
    fontFamily: "inherit",
    outline: "none",
  };
  return (
    <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
          <Link href="/player/registrations" style={{ color: "rgba(238,244,251,.7)", fontSize: ".85rem" }}>← Back to my registrations</Link>
        </div>
        <div style={{
          padding: "1.5rem",
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: ".9rem",
          marginBottom: "1rem",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: ".25rem" }}>
                {reg.program} · {reg.registrationType}
              </div>
              <div style={{ fontFamily: "monospace", color: "#f0b429", fontSize: "1.1rem", fontWeight: 800 }}>
                {reg.registrationNumber}
              </div>
              <div style={{ marginTop: ".5rem", color: "#fff", fontSize: "1.15rem", fontWeight: 700 }}>
                {String(d.fullNameEn || "—")}
              </div>
            </div>
            <span style={{
              padding: ".35rem .8rem", borderRadius: 999,
              background: reg.status === "APPROVED" ? "rgba(20,164,77,.18)"
                        : reg.status === "REJECTED" ? "rgba(176,30,30,.2)"
                        : reg.status === "NEEDS_CORRECTION" ? "rgba(251,146,60,.18)"
                        : "rgba(240,180,41,.18)",
              color: reg.status === "APPROVED" ? "#86efac"
                   : reg.status === "REJECTED" ? "#ff8b8b"
                   : reg.status === "NEEDS_CORRECTION" ? "#fdba74"
                   : "#f0b429",
              fontSize: ".72rem", fontWeight: 800, letterSpacing: ".05em",
            }}>{reg.status.replace(/_/g, " ")}</span>
          </div>
        </div>
        {msg && (
          <div style={{
            padding: ".75rem 1rem", marginBottom: "1rem",
            background: msg.kind === "ok" ? "rgba(20,164,77,.12)" : "rgba(255,80,80,.12)",
            border: msg.kind === "ok" ? "1px solid rgba(20,164,77,.4)" : "1px solid rgba(255,80,80,.4)",
            borderRadius: ".55rem",
            color: msg.kind === "ok" ? "#86efac" : "#ff8b8b",
            fontSize: ".85rem",
          }}>{msg.text}</div>
        )}
        {/* Details */}
        <div style={{
          padding: "1.25rem",
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: ".9rem",
          marginBottom: "1rem",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: ".5rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800 }}>Details</h2>
            {canEdit && !editMode && (
              <button className="btn btn-gold" onClick={startEdit} style={{ padding: ".45rem .9rem", fontSize: ".8rem" }}>
                ✎ Edit
              </button>
            )}
            {editMode && (
              <div style={{ display: "flex", gap: ".4rem" }}>
                <button className="btn btn-outline" onClick={() => setEditMode(false)} disabled={busy} style={{ padding: ".45rem .9rem", fontSize: ".8rem" }}>Cancel</button>
                <button className="btn btn-primary" onClick={saveEdit} disabled={busy} style={{ padding: ".45rem .9rem", fontSize: ".8rem", opacity: busy ? .7 : 1 }}>
                  {busy ? "Saving…" : "Save changes"}
                </button>
              </div>
            )}
          </div>
          {!editMode ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".55rem", fontSize: ".85rem" }}>
              <Row k="Father" v={String(d.fatherName || "—")} />
              <Row k="DOB" v={String(d.dateOfBirth || "—")} />
              <Row k="Mobile" v={String(d.primaryMobile || "—")} />
              <Row k="Email" v={String(d.email || "—")} />
              <Row k="City" v={String(d.residenceCity || "—")} />
              <Row k="Role" v={String(d.playingRole || "—")} />
              <Row k="Batting" v={String(d.battingStyle || "—")} />
              <Row k="Bowling" v={String(d.bowlingStyle || "—")} />
              <Row k="Fee" v={`PKR ${reg.feeAmount.toLocaleString()}`} />
              <Row k="Payment" v={reg.paymentStatus.replace(/_/g, " ")} />
              <Row k="Submitted" v={new Date(reg.createdAt).toLocaleString()} />
              <Row k="Updated" v={new Date(reg.updatedAt).toLocaleString()} />
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
              {Object.keys(editFields).map((k) => (
                <div key={k}>
                  <label style={{ display: "block", fontSize: ".78rem", color: "rgba(238,244,251,.75)", marginBottom: ".25rem", textTransform: "capitalize" }}>
                    {k.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <input
                    style={inputStyle}
                    value={editFields[k]}
                    onChange={(e) => setEditFields({ ...editFields, [k]: e.target.value })}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Status timeline */}
        {reg.statusHistory.length > 0 && (
          <div style={{
            padding: "1.25rem",
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: ".9rem",
            marginBottom: "1rem",
          }}>
            <h2 style={{ margin: "0 0 .75rem", fontSize: "1rem", fontWeight: 800 }}>History</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
              {reg.statusHistory.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: ".75rem", alignItems: "flex-start", fontSize: ".82rem", color: "rgba(238,244,251,.75)", paddingBottom: ".35rem", borderBottom: i === reg.statusHistory.length - 1 ? "none" : "1px solid rgba(255,255,255,.05)" }}>
                  <span style={{ color: "#f0b429", fontWeight: 700, whiteSpace: "nowrap" }}>{new Date(h.at).toLocaleString()}</span>
                  <span>{h.to.replace(/_/g, " ")}{h.note ? ` — ${h.note}` : ""}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Danger zone */}
        <div style={{
          padding: "1.25rem",
          background: "rgba(176,30,30,.08)",
          border: "1px solid rgba(176,30,30,.4)",
          borderRadius: ".9rem",
        }}>
          <h2 style={{ margin: "0 0 .35rem", fontSize: "1rem", fontWeight: 800, color: "#ff8b8b" }}>Danger zone</h2>
          <p style={{ margin: "0 0 1rem", fontSize: ".85rem", color: "rgba(238,244,251,.75)", lineHeight: 1.6 }}>
            Deleting this registration removes it from the club database, deletes any uploaded
            documents, and (if configured) removes the corresponding row from Google Sheets.
            <b style={{ color: "#ff8b8b" }}> This action cannot be undone.</b>
          </p>
          {!confirmDelete ? (
            <button
              className="btn"
              style={{ background: "rgba(176,30,30,.25)", border: "1px solid rgba(176,30,30,.6)", color: "#ff8b8b" }}
              onClick={() => setConfirmDelete(true)}
            >
              🗑 Delete this registration
            </button>
          ) : (
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ color: "#ff8b8b", fontSize: ".85rem", fontWeight: 700 }}>
                Are you sure? This is permanent.
              </span>
              <button
                className="btn"
                style={{ background: "#b01e1e", color: "#fff" }}
                onClick={doDelete}
                disabled={busy}
              >
                {busy ? "Deleting…" : "Yes, delete permanently"}
              </button>
              <button className="btn btn-outline" onClick={() => setConfirmDelete(false)} disabled={busy}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
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