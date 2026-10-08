import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
export const metadata = { title: "Contact DAWN Cricket Club", description: "Get in touch with DAWN Cricket Club." };
const CONTACTS = [
  { icon: "📍", label: "Location", value: "Hakeemabad, Dheri Katti Khel, Nowshera, KPK", href: "https://maps.google.com/?q=Hakeemabad+Nowshera+KP" },
  { icon: "📱", label: "WhatsApp", value: "+92 300 000 0000", href: "https://wa.me/923000000000" },
  { icon: "✉️", label: "Email", value: "info@dawncricketclub.pk", href: "mailto:info@dawncricketclub.pk" },
  { icon: "📘", label: "Facebook", value: "DAWN Cricket Club", href: "https://www.facebook.com/" },
];
export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <h1 style={{ margin: "0 0 .5rem", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>Contact Us</h1>
          <p style={{ margin: "0 0 2rem", color: "rgba(238,244,251,.65)" }}>Reach out for registrations, matches, trials, or any query.</p>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
            <div>
              {CONTACTS.map((c) => (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ display: "flex", gap: ".9rem", padding: "1rem 1.15rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".8rem", textDecoration: "none", color: "inherit", marginBottom: ".75rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>{c.icon}</span>
                  <div><div style={{ fontSize: ".68rem", color: "#f0b429", fontWeight: 800, textTransform: "uppercase", marginBottom: ".3rem" }}>{c.label}</div><div style={{ fontSize: ".85rem", color: "#fff" }}>{c.value}</div></div>
                </a>
              ))}
              <div style={{ padding: "1rem", background: "rgba(240,180,41,.08)", border: "1px solid rgba(240,180,41,.3)", borderRadius: ".8rem", fontSize: ".82rem", color: "rgba(238,244,251,.85)", lineHeight: 1.7 }}>
                <b style={{ color: "#f0b429" }}>Quick help:</b> Chat bot at bottom-right, or WhatsApp for urgent matters.
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@media (min-width: 900px) { .contact-grid { grid-template-columns: 1fr 1.4fr !important; } }`}</style>
    </>
  );
}