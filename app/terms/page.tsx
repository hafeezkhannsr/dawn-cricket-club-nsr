import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = { title: "Terms of Use" };
export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, marginBottom: ".5rem" }}>Terms of Use</h1>
          <p style={{ color: "rgba(238,244,251,.55)", fontSize: ".82rem", marginBottom: "2rem" }}>
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <Section title="1. Acceptance">
            By accessing or using the DAWN Cricket Club website, you agree to these Terms. If you do
            not agree, please do not use the service.
          </Section>
          <Section title="2. Registration">
            You agree to provide accurate information during registration. False or misleading
            information may result in rejection, suspension or cancellation without refund.
          </Section>
          <Section title="3. Fees and Payments">
            Fees are displayed before submission and locked at the time of application. Payments
            are verified manually. Approved refunds follow the club policy at the time of payment.
          </Section>
          <Section title="4. Player Conduct">
            All players must follow the club's Code of Conduct. Disciplinary actions may include
            warnings, suspension or removal.
          </Section>
          <Section title="5. Content and Attribution">
            External news content is displayed with attribution to its original source. DAWN does
            not claim ownership of third-party content.
          </Section>
          <Section title="6. Limitation of Liability">
            The service is provided "as is." DAWN Cricket Club is not liable for indirect losses
            arising from use of the platform.
          </Section>
          <Section title="7. Changes">
            We may update these Terms at any time. Continued use implies acceptance of the updated
            Terms.
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