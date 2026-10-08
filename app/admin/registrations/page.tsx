import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export const metadata = { title: "Registrations — Admin" };
export default function AdminRegistrationsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <header style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}>
              Registrations
            </h1>
            <p style={{ margin: ".35rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
              Full registration management lives in the main dashboard
            </p>
          </header>
          <div style={{
            padding: "2rem",
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(240,180,41,.35)",
            borderRadius: ".9rem",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "2rem", marginBottom: ".75rem" }}>📋</div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: ".5rem" }}>
              Registration management
            </div>
            <p style={{ color: "rgba(238,244,251,.7)", maxWidth: 520, margin: "0 auto 1.5rem", lineHeight: 1.7 }}>
              All registration tools (list, filters, search, detail modal, approve/reject, exports)
              are available on the main admin dashboard.
            </p>
            <Link href="/admin" className="btn btn-gold">Open Admin Dashboard →</Link>
          </div>
          <div style={{
            marginTop: "1.5rem",
            padding: "1rem 1.25rem",
            background: "rgba(255,255,255,.02)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: ".7rem",
            fontSize: ".82rem",
            color: "rgba(238,244,251,.7)",
            lineHeight: 1.7,
          }}>
            <b style={{ color: "#f0b429" }}>Quick stats:</b> The dashboard shows total, submitted, under review,
            needs correction, approved, rejected, payment verified and payment pending counts in real-time.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}