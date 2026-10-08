import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import Footer from "@/components/Footer";
import Link from "next/link";
import LiveMatchWidget from "@/components/LiveMatchWidget";
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Live Match Section */}
        <section className="container" style={{ paddingTop: "2.5rem" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1rem",
          }}>
            <div className="live-section-grid">
              <div style={{
                padding: "1.5rem",
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: ".9rem",
              }}>
                <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 900, marginBottom: "1rem" }}>
                  🏏 Live Matches
                </h2>
                <LiveMatchWidget />
              </div>
              <div style={{
                padding: "1.5rem",
                background: "linear-gradient(135deg, rgba(240,180,41,.1), rgba(20,164,77,.05))",
                border: "1px solid rgba(240,180,41,.35)",
                borderRadius: ".9rem",
              }}>
                <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 900, marginBottom: "1rem" }}>
                  🎯 Explore
                </h2>
                <div style={{ display: "grid", gap: ".5rem" }}>
                  <Link href="/pcb-talent-hunt" className="btn btn-gold" style={{ justifyContent: "flex-start", textAlign: "left" }}>
                    🏆 PCB Talent Hunt
                  </Link>
                  <Link href="/match-central" className="btn btn-outline" style={{ justifyContent: "flex-start", textAlign: "left" }}>
                    🏟️ Match Central
                  </Link>
                  <Link href="/news/live" className="btn btn-outline" style={{ justifyContent: "flex-start", textAlign: "left" }}>
                    📰 Live News
                  </Link>
                  <Link href="/statistics" className="btn btn-outline" style={{ justifyContent: "flex-start", textAlign: "left" }}>
                    📊 Statistics
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FeatureStrip />
      </main>
      <Footer />
      <style>{`
        .live-section-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 900px) {
          .live-section-grid { grid-template-columns: 1.5fr 1fr; }
        }
      `}</style>
    </>
  );
}