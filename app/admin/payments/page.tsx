import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export const metadata = { title: "Payments — Admin" };
export default function AdminPaymentsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <header style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}>
              Payments
            </h1>
            <p style={{ margin: ".35rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
              Verify registration and membership payments
            </p>
          </header>
          <div style={{
            padding: "2rem",
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(240,180,41,.35)",
            borderRadius: ".9rem",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "2rem", marginBottom: ".75rem" }}>💳</div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: ".5rem" }}>
              Payment verification
            </div>
            <p style={{ color: "rgba(238,244,251,.7)", maxWidth: 520, margin: "0 auto 1.5rem", lineHeight: 1.7 }}>
              Payment status is managed per registration. Open the dashboard, click "View" on any
              registration, and change the payment status from the detail modal.
            </p>
            <Link href="/admin" className="btn btn-gold">Open Dashboard →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}