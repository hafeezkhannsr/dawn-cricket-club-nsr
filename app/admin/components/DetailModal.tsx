"use client";
import { useCallback, useEffect, useState } from "react";
import Select from "@/components/ui/Select";
import type { StoredRegistration } from "@/lib/server/registration-store";
const PAYMENT_OPTIONS = [
  { value: "UNPAID", label: "Unpaid" },
  { value: "PROOF_SUBMITTED", label: "Proof Submitted" },
  { value: "PENDING_VERIFICATION", label: "Pending Verification" },
  { value: "VERIFIED", label: "Verified" },
  { value: "REJECTED", label: "Rejected" },
  { value: "REFUNDED", label: "Refunded" },
];
export default function DetailModal({
  id, onClose, onChanged,
}: { id: string; onClose: () => void; onChanged: () => void }) {
  const [item, setItem] = useState<StoredRegistration | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/registrations/${id}`, { cache: "no-store" });
      const json = await res.json();
      if (json.ok) setItem(json.item);
    } catch {}
    setLoading(false);
  }, [id]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  async function act(action: string, extra?: Record<string, unknown>) {
    setBusy(true);
    try {
      const res = await fetch(`/api/v1/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, note, ...extra }),
      });
      if (res.ok) { await load(); onChanged(); }
    } catch {}
    setBusy(false);
  }
  async function setPayment(paymentStatus: string) {
    setBusy(true);
    try {
      await fetch(`/api/v1/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "payment", paymentStatus }),
      });
      await load(); onChanged();
    } catch {}
    setBusy(false);
  }
  return (
    <div
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(0,0,0,.7)", backdropFilter: "blur(6px)",
        display: "grid", placeItems: "center",
        padding: "1rem",
      }}
    >
      <div style={{
        background: "#061428",
        border: "1px solid rgba(255,255,255,.1)",
        borderRadius: ".9rem",
        width: "100%", maxWidth: 720, maxHeight: "92vh",
        overflowY: "auto",
        boxShadow: "0 30px 80px -20px rgba(0,0,0,.8)",
      }}>
        {loading || !item ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>Loading…</div>
        ) : (
          <>
            <header style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              padding: "1.25rem 1.25rem 1rem",
              borderBottom: "1px solid rgba(255,255,255,.08)",
              position: "sticky", top: 0, background: "#061428", zIndex: 5,
            }}>
              <div>
                <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)", marginBottom: ".15rem" }}>Registration</div>
                <div style={{ fontFamily: "monospace", color: "#f0b429", fontSize: "1.05rem", fontWeight: 700 }}>
                  {item.registrationNumber}
                </div>
                <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.6)", marginTop: ".25rem" }}>
                  {item.program} · {item.registrationType} · {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>
              <button onClick={onClose} aria-label="Close" style={{
                background: "transparent", border: "1px solid rgba(255,255,255,.15)",
                color: "#eef4fb", borderRadius: ".55rem", width: 32, height: 32, cursor: "pointer",
              }}>✕</button>
            </header>
            <div style={{ padding: "1.25rem" }}>
              {/* Status + Payment */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem", marginBottom: "1.25rem" }}>
                <div style={{ padding: ".75rem .9rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".6rem" }}>
                  <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", marginBottom: ".25rem" }}>Status</div>
                  <div style={{ fontWeight: 700, color: "#f0b429" }}>{item.status.replace(/_/g, " ")}</div>
                </div>
                <div style={{ padding: ".75rem .9rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".6rem" }}>
                  <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)", marginBottom: ".25rem" }}>Payment</div>
                  <div style={{ fontWeight: 700, color: item.paymentStatus === "VERIFIED" ? "#86efac" : "#fdba74" }}>
                    {item.paymentStatus.replace(/_/g, " ")}
                  </div>
                </div>
              </div>
              {/* Data grid */}
              <Section title="Applicant">
                <KV k="Name (EN)" v={String(item.data.fullNameEn || "—")} />
                <KV k="Name (UR)" v={String(item.data.fullNameUr || "—")} />
                <KV k="Father" v={String(item.data.fatherName || "—")} />
                <KV k="DOB" v={String(item.data.dateOfBirth || "—")} />
                <KV k="Gender" v={String(item.data.gender || "—")} />
                <KV k="Mobile" v={String(item.data.primaryMobile || "—")} />
                <KV k="Email" v={String(item.data.email || "—")} />
                <KV k="City" v={String(item.data.residenceCity || "—")} />
              </Section>
              <Section title="Identity">
                <KV k="Type" v={String(item.data.identityType || "—")} />
                <KV k="Number" v={String(item.data.identityNumber || "—")} />
              </Section>
              <Section title="Cricket">
                <KV k="Role" v={String(item.data.playingRole || "—")} />
                <KV k="Batting" v={String(item.data.battingStyle || "—")} />
                <KV k="Bowling" v={String(item.data.bowlingStyle || "—")} />
                <KV k="Ball Type" v={String(item.data.ballType || "—")} />
                <KV k="Experience" v={String(item.data.experienceYears ?? "—")} />
              </Section>
              <Section title="Address">
                <KV k="Province" v={String(item.data.province || "—")} />
                <KV k="District" v={String(item.data.district || "—")} />
                <KV k="Tehsil" v={String(item.data.tehsil || "—")} />
                <KV k="Village" v={String(item.data.village || "—")} />
                <KV k="Postal" v={String(item.data.postalAddress || "—")} full />
              </Section>
              <Section title="Uploaded Documents">
                <DocRow label="CNIC Front" file={item.data.cnicFront as any} />
                <DocRow label="CNIC Back" file={item.data.cnicBack as any} />
                <DocRow label="B-Form" file={item.data.bFormFile as any} />
                <DocRow label="Smart Card Front" file={item.data.smartFront as any} />
                <DocRow label="Smart Card Back" file={item.data.smartBack as any} />
                <DocRow label="Portrait Photo" file={item.data.portrait as any} />
              </Section>
              <Section title="Guardian">
                <KV k="Name" v={String(item.data.guardianName || "—")} />
                <KV k="Relation" v={String(item.data.guardianRelation || "—")} />
                <KV k="Mobile" v={String(item.data.guardianMobile || "—")} />
              </Section>
              <Section title="Payment">
                <KV k="Fee" v={`PKR ${item.feeAmount.toLocaleString()}`} />
                <KV k="Method" v={String(item.data.paymentMethod || "—")} />
                <KV k="Date" v={String(item.data.paymentDate || "—")} />
                <KV k="Reference" v={String(item.data.transactionReference || "—")} />
              </Section>
              {/* Note */}
              <div style={{ marginTop: "1.25rem" }}>
                <label style={{ display: "block", fontSize: ".8rem", color: "rgba(238,244,251,.75)", marginBottom: ".35rem" }}>
                  Review note (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Reason for approval / rejection / correction…"
                  style={{
                    width: "100%", minHeight: 70, padding: ".7rem .85rem",
                    background: "#0a1f3d", border: "1px solid rgba(255,255,255,.18)",
                    borderRadius: ".6rem", color: "#eef4fb", fontSize: ".88rem",
                    fontFamily: "inherit", resize: "vertical", outline: "none",
                  }}
                />
              </div>
              {/* Payment status dropdown */}
              <div style={{ marginTop: "1rem" }}>
                <label style={{ display: "block", fontSize: ".8rem", color: "rgba(238,244,251,.75)", marginBottom: ".35rem" }}>
                  Payment verification
                </label>
                <Select
                  value={item.paymentStatus}
                  onChange={(v) => setPayment(v)}
                  options={PAYMENT_OPTIONS}
                />
              </div>
              {/* Actions */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: ".5rem",
                marginTop: "1.25rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid rgba(255,255,255,.08)",
              }}>
                <button disabled={busy} onClick={() => act("under_review")} className="btn btn-outline" style={{ width: "100%" }}>
                  Mark Under Review
                </button>
                <button disabled={busy} onClick={() => act("needs_correction")} className="btn btn-outline" style={{ width: "100%" }}>
                  Request Correction
                </button>
                <button disabled={busy} onClick={() => act("approve")} className="btn btn-primary" style={{ width: "100%" }}>
                  ✓ Approve
                </button>
                <button disabled={busy} onClick={() => act("reject")} className="btn" style={{ width: "100%", background: "#b01e1e", color: "#fff" }}>
                  ✕ Reject
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <div style={{
        fontSize: ".72rem", color: "#f0b429", fontWeight: 700,
        letterSpacing: ".06em", textTransform: "uppercase",
        marginBottom: ".55rem",
      }}>{title}</div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: ".4rem",
        background: "rgba(255,255,255,.02)",
        border: "1px solid rgba(255,255,255,.06)",
        borderRadius: ".55rem",
        padding: ".75rem .9rem",
      }}>
        {children}
      </div>
    </div>
  );
}
function KV({ k, v, full }: { k: string; v: string; full?: boolean }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", gap: "1rem",
      fontSize: ".83rem", lineHeight: 1.5,
      gridColumn: full ? "1 / -1" : "auto",
      flexWrap: full ? "wrap" : "nowrap",
    }}>
      <span style={{ color: "rgba(238,244,251,.55)", flexShrink: 0 }}>{k}</span>
      <span style={{ color: "#eef4fb", textAlign: "right", wordBreak: "break-word" }}>{v}</span>
    </div>
  );
}function DocRow({ label, file }: { label: string; file: { name: string; size: number; type: string; dataUrl: string } | null | undefined }) {
  if (!file || !file.dataUrl) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".83rem", padding: ".35rem 0", opacity: .5 }}>
        <span style={{ color: "rgba(238,244,251,.55)" }}>{label}</span>
        <span style={{ color: "rgba(238,244,251,.4)" }}>— not uploaded</span>
      </div>
    );
  }
  const isImage = file.type.startsWith("image/");
  return (
    <div style={{ display: "flex", gap: ".7rem", alignItems: "center", padding: ".5rem 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
      {isImage ? (
        <img src={file.dataUrl} alt={label} style={{
          width: 44, height: 44, objectFit: "cover",
          borderRadius: ".4rem", border: "1px solid rgba(255,255,255,.15)", flexShrink: 0,
        }} />
      ) : (
        <div style={{
          width: 44, height: 44, borderRadius: ".4rem",
          background: "rgba(240,180,41,.12)", border: "1px solid rgba(240,180,41,.35)",
          display: "grid", placeItems: "center",
          color: "#f0b429", fontWeight: 800, fontSize: ".6rem", flexShrink: 0,
        }}>PDF</div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: ".82rem", color: "#fff", fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: ".7rem", color: "rgba(238,244,251,.5)", marginTop: ".15rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {file.name} · {(file.size / 1024).toFixed(0)} KB
        </div>
      </div>
      <a
        href={file.dataUrl}
        download={file.name}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline"
        style={{ padding: ".3rem .6rem", fontSize: ".72rem", flexShrink: 0 }}
      >
        ↓
      </a>
    </div>
  );
}