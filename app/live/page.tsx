import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveScoresClient from "./LiveScoresClient";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Live Scores",
  description: "Real-time cricket scores from DAWN Cricket Club matches and PCB tournaments.",
};
export default function LivePage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <header style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".5rem" }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "#dc2626", animation: "livePulse 1.6s ease-in-out infinite" }} />
              <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>Live Scores</h1>
            </div>
            <p style={{ margin: 0, color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              Real-time scores · auto-refreshes every 10 seconds
            </p>
          </header>
          <LiveScoresClient />
        </div>
      </main>
      <Footer />
    </>
  );
}