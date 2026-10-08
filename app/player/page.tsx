import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayerDashboard from "./PlayerDashboard";
export const metadata = { title: "My Account" };
export default function PlayerPage() {
  return (
    <>
      <Navbar />
      <PlayerDashboard />
      <Footer />
    </>
  );
}