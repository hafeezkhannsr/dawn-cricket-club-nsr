import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about DAWN Cricket Club registration, fees, matches and player verification.",
};
const FAQS = [
  {
    q: "How do I register as a player?",
    a: "Click 'Register' in the top menu, complete the 9-step form (program, personal, contact, identity, address, cricket, education, guardian, payment), then submit. You'll receive a registration number and QR code instantly.",
  },
  {
    q: "What are the registration fees?",
    a: "DAWN Player Registration: PKR 3,000. DAWN Membership: PKR 5,000. DSL Registration: PKR 100 per edition. The system calculates the correct fee automatically based on your selections.",
  },
  {
    q: "How do I pay?",
    a: "Submit your registration first. After admin review and approval, you'll receive bank or wallet details on your registered mobile. Accepted: Bank Transfer, JazzCash, EasyPaisa, or Cash (in-person with receipt).",
  },
  {
    q: "Which DSL edition can I register for?",
    a: "Only the currently open edition. Right now, Edition 7 (year 2027) is open. Later editions unlock automatically in their respective years (Edition 8 opens in 2028, etc.).",
  },
  {
    q: "What age categories are available?",
    a: "U13, U15, U17, U19, Emerging Player, Senior Player, and Veteran. Age is calculated automatically from your date of birth.",
  },
  {
    q: "How do I check my registration status?",
    a: "Click 'Status' in the menu, or visit /register?status=check. Enter your registration number to see the current status.",
  },
  {
    q: "How do I verify a player?",
    a: "Scan the QR code on their digital card, or visit /verify and enter their registration number. Only non-sensitive information is shown publicly.",
  },
  {
    q: "Is my personal data safe?",
    a: "Yes. CNIC / B-Form, mobile number, address, and uploaded documents are always private. Only consenting players appear in the public directory, and only with minimal information.",
  },
  {
    q: "Where can I see live match scores?",
    a: "Visit the Scorer Console at /scorer to see active matches. Scores update live every 5 seconds on the public scoreboard.",
  },
  {
    q: "What if my application is rejected?",
    a: "You'll receive an email with the reason. You can correct the issue and re-apply, or contact the club for help.",
  },
];
export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>
              Frequently Asked Questions
            </h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              Quick answers about registration, fees, matches and verification
            </p>
          </header>
          <div style={{ display: "grid", gap: ".6rem" }}>
            {FAQS.map((f, i) => (
              <details
                key={i}
                style={{
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: ".75rem",
                  overflow: "hidden",
                }}
              >
                <summary style={{
                  padding: "1rem 1.1rem",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: ".95rem",
                  color: "#fff",
                  listStyle: "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".75rem",
                }}>
                  <span>{f.q}</span>
                  <span style={{ color: "#f0b429", fontSize: "1.2rem", flexShrink: 0 }}>+</span>
                </summary>
                <div style={{
                  padding: "0 1.1rem 1.1rem",
                  fontSize: ".88rem",
                  color: "rgba(238,244,251,.8)",
                  lineHeight: 1.75,
                }}>{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}