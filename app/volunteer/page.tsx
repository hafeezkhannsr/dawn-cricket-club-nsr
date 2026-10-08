import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VolunteerForm from "./VolunteerForm";
export const metadata = {
  title: "Volunteer with DAWN",
  description: "Join the DAWN Cricket Club volunteer team — help grow cricket in Nowshera.",
};
export default function VolunteerPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <header style={{ marginBottom: "2rem" }}>
            <div style={{ fontSize: ".7rem", letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 800, color: "#f0b429", marginBottom: ".5rem" }}>
              Give Back
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>
              Volunteer with DAWN
            </h1>
            <p style={{ margin: ".75rem 0 0", color: "rgba(238,244,251,.7)", fontSize: ".95rem", lineHeight: 1.6 }}>
              We're looking for passionate volunteers to help with match scoring, coaching, social media,
              event management, and more. No experience required — just enthusiasm!
            </p>
          </header>
          <VolunteerForm />
        </div>
      </main>
      <Footer />
    </>
  );
}