"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import StepContent from "./StepContent";
import { STEPS, loadDraft, saveDraft, clearDraft } from "@/lib/registration-utils";
import { STEP_SCHEMAS } from "@/lib/registration-model";
type Data = Record<string, any>;
export default function RegistrationWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Data>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<{ id: string; registrationNumber: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [draftLoaded, setDraftLoaded] = useState(false);
  useEffect(() => {
    const d = loadDraft<Data>();
    if (d && typeof d === "object") {
      setData(d);
      if (typeof d.__step === "number") setStep(Math.min(9, Math.max(1, d.__step)));
    }
    setDraftLoaded(true);
  }, []);
  useEffect(() => {
    if (!draftLoaded) return;
    saveDraft({ ...data, __step: step });
  }, [data, step, draftLoaded]);
  function update(k: string, v: any) {
    setData((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => {
      if (!prev[k]) return prev;
      const n = { ...prev }; delete n[k]; return n;
    });
  }
  function validateStep(): boolean {
    const schema = STEP_SCHEMAS[step - 1];
    const partial = { ...data };
    delete partial.__step;
    const r = schema.safeParse(partial);
    if (r.success) { setErrors({}); return true; }
    const errs: Record<string, string> = {};
    for (const issue of r.error.issues) {
      const key = issue.path.join(".") || "_";
      if (!errs[key]) errs[key] = issue.message;
    }
    setErrors(errs);
    return false;
  }
  function next() {
    if (!validateStep()) return;
    setStep((s) => Math.min(9, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function back() {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function goTo(n: number) {
    if (n <= step) { setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); }
  }
  async function submit() {
    if (!validateStep()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = { ...data };
      delete payload.__step;
      const res = await fetch("/api/v1/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setSubmitError(json?.error || "Submission failed. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted({ id: json.id, registrationNumber: json.registrationNumber });
      clearDraft();
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Network error");
    }
    setSubmitting(false);
  }
  function resetAll() {
    clearDraft(); setData({}); setStep(1); setErrors({}); setSubmitted(null);
  }
  const progress = useMemo(() => ((step - 1) / 8) * 100, [step]);
  if (submitted) return <SuccessScreen reg={submitted} onReset={resetAll} />;
  return (
    <div style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb" }}>
      <header style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(3,10,24,.9)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: "1rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: ".6rem", color: "#fff" }}>
            <Logo size={34} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span style={{ fontWeight: 800, fontSize: ".88rem" }}>DAWN CRICKET CLUB</span>
              <span style={{ fontSize: ".68rem", color: "rgba(238,244,251,.6)" }}>Registration</span>
            </div>
          </Link>
          <Link href="/" style={{ fontSize: ".82rem", color: "rgba(238,244,251,.75)" }}>← Back to home</Link>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,.06)" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #14a44d, #f0b429)", transition: "width .35s ease" }} />
        </div>
      </header>
      <div className="container" style={{ paddingTop: "1.5rem", paddingBottom: "1rem" }}>
        <div style={{ display: "flex", gap: ".4rem", overflowX: "auto", paddingBottom: ".4rem" }}>
          {STEPS.map((s) => {
            const active = s.id === step;
            const done = s.id < step;
            return (
              <button
                key={s.id}
                onClick={() => goTo(s.id)}
                disabled={s.id > step}
                style={{
                  flex: "0 0 auto",
                  padding: ".5rem .75rem",
                  borderRadius: ".55rem",
                  border: active ? "1px solid #f0b429" : "1px solid rgba(255,255,255,.1)",
                  background: active ? "rgba(240,180,41,.12)" : done ? "rgba(20,164,77,.1)" : "rgba(255,255,255,.03)",
                  color: active ? "#f0b429" : done ? "#14a44d" : "rgba(238,244,251,.55)",
                  fontSize: ".78rem",
                  fontWeight: active ? 700 : 500,
                  cursor: s.id <= step ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", gap: ".4rem",
                }}
              >
                <span style={{
                  width: 18, height: 18, borderRadius: 999,
                  background: active ? "#f0b429" : done ? "#14a44d" : "rgba(255,255,255,.12)",
                  color: "#061428",
                  display: "grid", placeItems: "center",
                  fontSize: ".68rem", fontWeight: 800,
                }}>
                  {done ? "✓" : s.id}
                </span>
                <span>{s.short}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="container" style={{ paddingBottom: "7rem" }}>
        <div style={{
          background: "rgba(255,255,255,.02)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: ".9rem",
          padding: "1.25rem",
          maxWidth: 820,
          margin: "0 auto",
        }}>
          <h1 style={{ fontSize: "1.35rem", fontWeight: 800, margin: 0, marginBottom: ".25rem" }}>
            Step {step} of 9 — {STEPS[step - 1].en}
          </h1>
          <p style={{ fontSize: ".88rem", color: "rgba(238,244,251,.65)", margin: 0, marginBottom: "1.5rem" }}>
            {STEPS[step - 1].ur} — all fields marked <span style={{ color: "#f0b429" }}>*</span> are required
          </p>
          {submitError && (
            <div role="alert" style={{
              padding: ".75rem 1rem", marginBottom: "1rem",
              background: "rgba(255,80,80,.12)",
              border: "1px solid rgba(255,80,80,.4)",
              borderRadius: ".55rem",
              fontSize: ".85rem",
              color: "#ff8b8b",
            }}>
              {submitError}
            </div>
          )}
          <StepContent step={step} data={data} update={update} errors={errors} />
        </div>
      </div>
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40,
        background: "rgba(3,10,24,.94)",
        backdropFilter: "blur(14px)",
        borderTop: "1px solid rgba(255,255,255,.08)",
        padding: ".85rem 0",
      }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".75rem" }}>
          <button type="button" onClick={back} disabled={step === 1}
            className="btn btn-outline"
            style={{ opacity: step === 1 ? .4 : 1, cursor: step === 1 ? "not-allowed" : "pointer" }}>
            ← Back
          </button>
          <span style={{ fontSize: ".78rem", color: "rgba(238,244,251,.55)" }}>{step} / 9</span>
          {step < 9 ? (
            <button type="button" onClick={next} className="btn btn-primary">Next →</button>
          ) : (
            <button type="button" onClick={submit} disabled={submitting} className="btn btn-gold" style={{ opacity: submitting ? .7 : 1 }}>
              {submitting ? "Submitting…" : "Submit Registration"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
function SuccessScreen({ reg, onReset }: { reg: { id: string; registrationNumber: string }; onReset: () => void }) {
  const verifyUrl = typeof window !== "undefined" ? `${window.location.origin}/verify/${reg.id}` : `/verify/${reg.id}`;
  return (
    <div style={{
      minHeight: "100vh",
      display: "grid", placeItems: "center",
      padding: "2rem 1rem",
      background: "#030a18", color: "#eef4fb",
    }}>
      <div style={{
        maxWidth: 560, width: "100%",
        background: "rgba(255,255,255,.03)",
        border: "1px solid rgba(20,164,77,.4)",
        borderRadius: "1rem",
        padding: "2rem",
        textAlign: "center",
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 999,
          background: "rgba(20,164,77,.18)",
          border: "2px solid #14a44d",
          display: "grid", placeItems: "center",
          margin: "0 auto 1rem",
          fontSize: "1.75rem",
        }}>✓</div>
        <h1 style={{ fontSize: "1.35rem", margin: 0, marginBottom: ".5rem" }}>Application Submitted</h1>
        <p style={{ fontSize: ".88rem", color: "rgba(238,244,251,.7)", marginBottom: "1.25rem" }}>
          Your application has been received and is now under review. You will be contacted on your mobile number.
        </p>
        <div style={{
          background: "rgba(240,180,41,.08)",
          border: "1px solid rgba(240,180,41,.3)",
          borderRadius: ".6rem",
          padding: "1rem",
          marginBottom: "1.25rem",
        }}>
          <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)", marginBottom: ".25rem" }}>Registration Number</div>
          <strong style={{ fontSize: "1.15rem", color: "#f0b429", letterSpacing: ".05em" }}>{reg.registrationNumber}</strong>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.6)", marginBottom: ".5rem" }}>Scan to verify</div>
          <img
            src={`/api/v1/qr?data=${encodeURIComponent(verifyUrl)}&size=180`}
            alt="Verification QR"
            width={180}
            height={180}
            style={{ background: "#fff", padding: 8, borderRadius: 8 }}
          />
        </div>
        <div style={{ display: "flex", gap: ".6rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href={`/verify/${reg.id}`} className="btn btn-gold">View Verification</Link>
          <button onClick={onReset} className="btn btn-outline">Register another</button>
          <Link href="/" className="btn btn-primary">Home</Link>
        </div>
      </div>
    </div>
  );
}