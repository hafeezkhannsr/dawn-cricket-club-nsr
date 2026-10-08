import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScorerApp from "./components/ScorerApp";
export const metadata = { title: "Scorer Console" };
export default function ScorerPage() {
  return (
    <>
      <Navbar />
      <ScorerApp />
      <Footer />
    </>
  );
}