"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [me, setMe] = useState<{ email: string; name: string; role: string } | null>(null);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/v1/auth/me");
      const j = await res.json();
      if (j.ok) setMe(j.user);
    })();
  }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const url = mode === "login" ? "/api/v1/auth/login" : "/api/v1/auth/signup";
      const body = mode === "login" ? { email, password } : { email, password, name };
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = await res.json();
      if (!j.ok) { setErr(j.error || "Failed"); setBusy(false); return; }
      router.push(j.user.role === "PLAYER" ? "/player" : "/admin");
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Error");
    }
    setBusy(false);
  }
  async function logout() {
    await fetch("/api/v1/auth/logout", { method: "POST" });
    setMe(null);
    router.push("/");
  }
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: ".75rem .9rem",
    background: "#0a1f3d", border: "1px solid rgba(255,255,255,.15)",
    borderRadius: ".6rem", color: "#eef4fb", fontSize: ".92rem",
    fontFamily: "inherit", outline: "none", colorScheme: "dark",
  };
  const label: React.CSSProperties = {
    display: "block", fontSize: ".8rem", color: "rgba(238,244,251,.85)",
    marginBottom: ".35rem", fontWeight: 600,
  };
  if (me) {
    return (
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "3rem 1rem", display: "grid", placeItems: "center" }}>
        <div style={{
          maxWidth: 460, width: "100%",
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(20,164,77,.4)",
          borderRadius: "1rem",
          padding: "2rem",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>✓</div>
          <h1 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 800 }}>You are logged in</h1>
          <p style={{ margin: ".5rem 0 1.5rem", color: "rgba(238,244,251,.7)", fontSize: ".9rem" }}>
            {me.name} · {me.email}<br />
            <span style={{ color: "#f0b429", fontWeight: 700 }}>{me.role}</span>
          </p>
          <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {me.role !== "PLAYER" && <Link href="/admin" className="btn btn-gold">Admin</Link>}
            <Link href="/player" className="btn btn-outline">Player Area</Link>
            <button onClick={logout} className="btn btn-outline">Logout</button>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "3rem 1rem", display: "grid", placeItems: "center" }}>
      <form onSubmit={submit} style={{
        maxWidth: 420, width: "100%",
        background: "rgba(255,255,255,.03)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: "1rem",
        padding: "2rem",
      }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 900, marginBottom: ".35rem" }}>
          {mode === "login" ? "Login" : "Create Account"}
        </h1>
        <p style={{ margin: "0 0 1.5rem", color: "rgba(238,244,251,.6)", fontSize: ".85rem" }}>
          {mode === "login" ? "Sign in to access your account" : "New player or admin account"}
        </p>
        {mode === "signup" && (
          <div style={{ marginBottom: ".9rem" }}>
            <label style={label}>Full name</label>
            <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} required placeholder="Muhammad Ahsan" />
          </div>
        )}
        <div style={{ marginBottom: ".9rem" }}>
          <label style={label}>Email</label>
          <input type="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="player@example.com" />
        </div>
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={label}>Password</label>
          <input type="password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="At least 6 characters" />
        </div>
        {err && (
          <div style={{
            padding: ".65rem .9rem", marginBottom: "1rem",
            background: "rgba(255,80,80,.12)",
            border: "1px solid rgba(255,80,80,.4)",
            borderRadius: ".5rem",
            color: "#ff8b8b",
            fontSize: ".82rem",
          }}>{err}</div>
        )}
        <button className="btn btn-gold" disabled={busy} style={{ width: "100%", justifyContent: "center", opacity: busy ? .7 : 1 }}>
          {busy ? "…" : mode === "login" ? "Sign in" : "Create account"}
        </button>
        <div style={{ marginTop: "1.25rem", textAlign: "center", fontSize: ".82rem", color: "rgba(238,244,251,.65)" }}>
          {mode === "login" ? (
            <>No account? <Link href="/signup" style={{ color: "#f0b429", fontWeight: 700 }}>Sign up</Link></>
          ) : (
            <>Have an account? <Link href="/login" style={{ color: "#f0b429", fontWeight: 700 }}>Login</Link></>
          )}
        </div>
      </form>
    </main>
  );
}