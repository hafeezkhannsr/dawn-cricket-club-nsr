import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import Footer from "@/components/Footer";
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureStrip />
      </main>
      <Footer />
    </>
  );
}