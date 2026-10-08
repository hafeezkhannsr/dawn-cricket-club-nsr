import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export const metadata = { title: "DAWN Academy" };
export default function AcademyPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>DAWN Academy</h1>
          <p style={{ color: "rgba(238,244,251,.7)", fontSize: "1rem", marginTop: ".5rem" }}>
            Talent development for young cricketers — coming soon.
          </p>
          <div style={{
            padding: "3rem 1.5rem",
            textAlign: "center",
            background: "rgba(255,255,255,.03)",
            border: "1px dashed rgba(255,255,255,.15)",
            borderRadius: ".9rem",
            marginTop: "1.5rem",
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: ".75rem", opacity: .6 }}>🏏</div>
            <div style={{ fontWeight: 700, color: "#fff", marginBottom: ".5rem" }}>
              Academy page under development
            </div>
            <p style={{ color: "rgba(238,244,251,.6)", fontSize: ".88rem", maxWidth: 480, margin: "0 auto 1.5rem" }}>
              We're building a full academy section: coaching schedules, age-group programs,
              talent hunts and equipment guidelines.
            </p>
            <Link href="/register" className="btn btn-gold">Register your interest →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}