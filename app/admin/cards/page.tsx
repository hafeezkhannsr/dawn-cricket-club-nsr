import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export const metadata = { title: "Player Cards — Admin" };
export default function AdminCardsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <header style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}>
              Player Cards
            </h1>
            <p style={{ margin: ".35rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
              Digital player IDs with QR verification
            </p>
          </header>
          <div style={{
            padding: "2rem",
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(240,180,41,.35)",
            borderRadius: ".9rem",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "2rem", marginBottom: ".75rem" }}>🆔</div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: ".5rem" }}>
              Digital player cards
            </div>
            <p style={{ color: "rgba(238,244,251,.7)", maxWidth: 520, margin: "0 auto 1.5rem", lineHeight: 1.7 }}>
              Approved players automatically receive a digital card with a QR code.
              Scan the QR on any player card to open their verification page.
            </p>
            <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/admin" className="btn btn-gold">Open Dashboard →</Link>
              <Link href="/players" className="btn btn-outline">View Public Directory</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}