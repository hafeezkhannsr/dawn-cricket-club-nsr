import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = { title: "Privacy Policy" };
export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, marginBottom: ".5rem" }}>Privacy Policy</h1>
          <p style={{ color: "rgba(238,244,251,.55)", fontSize: ".82rem", marginBottom: "2rem" }}>
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <Section title="What we collect">
            During registration: full name, father's name, date of birth, gender, CNIC/B-Form,
            mobile number, email (optional), address, cricket profile, guardian details, and
            supporting documents (ID, portrait, payment proof).
          </Section>
          <Section title="Why we collect it">
            To verify identity, register players officially, manage membership, generate digital
            player cards, and communicate about matches and tournaments.
          </Section>
          <Section title="Who can see it">
            Only authorized administrators can view full registration data. Public pages show only
            minimal information (name, playing role, age category) and only with your explicit
            consent.
          </Section>
          <Section title="What we never do">
            We never sell your data. We never share CNIC, B-Form, mobile, address or documents with
            third parties without a legal requirement.
          </Section>
          <Section title="Document security">
            Uploaded documents are stored privately. Access is limited and audit-logged. Sensitive
            files are never exposed on public pages or QR verification.
          </Section>
          <Section title="Your rights">
            You may request correction or deletion of your data by contacting the club. Approved
            players may withdraw public consent at any time.
          </Section>
          <Section title="Contact">
            For any privacy concern, contact us via the Contact page or email
            info@dawncricketclub.pk.
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{
      padding: "1.1rem 1.25rem",
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: ".75rem",
      marginBottom: ".75rem",
    }}>
      <h2 style={{ margin: "0 0 .5rem", fontSize: "1rem", fontWeight: 800, color: "#f0b429" }}>{title}</h2>
      <p style={{ margin: 0, fontSize: ".9rem", color: "rgba(238,244,251,.85)", lineHeight: 1.75 }}>{children}</p>
    </section>
  );
}