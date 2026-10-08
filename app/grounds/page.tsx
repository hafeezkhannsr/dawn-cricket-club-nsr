import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export const metadata = { title: "Grounds & Venues" };
export default function GroundsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>Grounds & Venues</h1>
          <p style={{ color: "rgba(238,244,251,.7)", fontSize: "1rem", marginTop: ".5rem" }}>
            Where DAWN plays.
          </p>
          <div style={{
            padding: "1.5rem",
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: ".9rem",
            marginTop: "1.5rem",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: ".72rem", color: "#f0b429", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" }}>
                  Home Ground
                </div>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", marginTop: ".25rem" }}>
                  DAWN Ground, Hakeemabad
                </div>
                <div style={{ fontSize: ".85rem", color: "rgba(238,244,251,.6)", marginTop: ".15rem" }}>
                  Dheri Katti Khel · Nowshera · Khyber Pakhtunkhwa
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Hakeemabad+Nowshera+KP+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
              >
                📍 Open in Maps
              </a>
            </div>
          </div>
          <div style={{
            marginTop: "1.25rem",
            padding: "1.25rem",
            background: "rgba(240,180,41,.06)",
            border: "1px solid rgba(240,180,41,.25)",
            borderRadius: ".7rem",
            fontSize: ".88rem",
            color: "rgba(238,244,251,.85)",
            lineHeight: 1.7,
          }}>
            <b style={{ color: "#f0b429" }}>Coming soon:</b> Full venue directory with photographs,
            capacity, pitch type, and match history. Admins will be able to add venues without code changes.
          </div>
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link href="/scorer" className="btn btn-outline">View matches →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}