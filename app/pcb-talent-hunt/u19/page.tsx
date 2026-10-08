import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export const metadata = { title: "PCB U19 Trials" };
export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2.5rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.5)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·
            <Link href="/pcb-talent-hunt" style={{ color: "inherit" }}> PCB Talent Hunt</Link> ·
            <span style={{ color: "#f0b429" }}> U19</span>
          </nav>
          <h1 style={{ margin: 0, fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)", fontWeight: 900 }}>
            PCB Under-19 Trials
          </h1>
          <p style={{ margin: ".5rem 0 2rem", color: "rgba(238,244,251,.7)", fontSize: "1rem" }}>
            U19 · 17-19 years · Trial date: February 2027
          </p>
          <div style={{ padding: "2rem", background: "linear-gradient(135deg, rgba(240,180,41,.08), rgba(20,164,77,.05))", border: "1px solid rgba(240,180,41,.3)", borderRadius: ".9rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#f0b429", marginBottom: ".75rem" }}>
              Trial Details
            </h2>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: 2, fontSize: ".9rem", color: "rgba(238,244,251,.85)" }}>
              <li>Age group: 17-19 years</li>
              <li>Trial date: February 2027</li>
              <li>Venue: Regional cricket grounds across KP</li>
              <li>Registration: Through district cricket association</li>
              <li>Documents: B-Form, birth certificate, school ID</li>
              <li>Selection: Top performers advance to regional camps</li>
            </ul>
          </div>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <a href="https://www.pcb.com.pk/" target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              Official PCB Site ↗
            </a>
            <Link href="/pcb-talent-hunt" className="btn btn-outline">← Back to Talent Hunt</Link>
            <Link href="/match-central" className="btn btn-outline">View Live Matches</Link>
          </div>
          <div style={{ marginTop: "2rem", padding: "1rem 1.25rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".7rem", fontSize: ".82rem", color: "rgba(238,244,251,.7)", lineHeight: 1.7 }}>
            <b style={{ color: "#f0b429" }}>Note:</b> DAWN Cricket Club is an independent club. Always verify trial details at the official PCB source.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}