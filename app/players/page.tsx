import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayerDirectory from "./PlayerDirectory";
export const metadata = {
  title: "Players",
  description: "Public directory of verified DAWN Cricket Club players",
};
export default function PlayersPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <header style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>
              Player Directory
            </h1>
            <p style={{ margin: ".4rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              Verified, consenting players only. Personal data is always protected.
            </p>
          </header>
          <PlayerDirectory />
        </div>
      </main>
      <Footer />
    </>
  );
}