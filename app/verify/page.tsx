import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VerifyLookup from "./VerifyLookup";
export const metadata = { title: "Player ID Verification" };
export default function VerifyPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <header style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 900 }}>
              Player ID Verification
            </h1>
            <p style={{ margin: ".4rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
              Enter a registration number or scan the QR code on a player card to verify.
            </p>
          </header>
          <VerifyLookup />
        </div>
      </main>
      <Footer />
    </>
  );
}