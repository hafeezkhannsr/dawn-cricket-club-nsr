import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayerDashboardClient from "./PlayerDashboardClient";
export const metadata = { title: "Player Dashboard" };
export default function PlayerDashboardPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <PlayerDashboardClient />
        </div>
      </main>
      <Footer />
    </>
  );
}