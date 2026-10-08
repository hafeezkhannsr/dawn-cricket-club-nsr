import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "Contact DAWN Cricket Club",
  description: "Get in touch with DAWN Cricket Club — Nowshera, KP, Pakistan.",
};
const CONTACTS = [
  {
    icon: "📍",
    label: "Location",
    value: "Hakeemabad, Dheri Katti Khel,\nNowshera, Khyber Pakhtunkhwa, Pakistan",
    href: "https://maps.google.com/?q=Hakeemabad+Nowshera+KP+Pakistan",
  },
  {
    icon: "📱",
    label: "WhatsApp",
    value: "+92 300 000 0000",
    href: "https://wa.me/923000000000",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "info@dawncricketclub.pk",
    href: "mailto:info@dawncricketclub.pk",
  },
  {
    icon: "📘",
    label: "Facebook",
    value: "DAWN Cricket Club Official",
    href: "https://www.facebook.com/",
  },
];
export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>
              Contact Us
            </h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              Reach out for registrations, matches, trials, sponsorship or general questions.
            </p>
          </header>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            {CONTACTS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  padding: "1.25rem",
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: ".85rem",
                  textDecoration: "none", color: "inherit",
                  display: "flex", gap: "1rem", alignItems: "flex-start",
                  transition: "all .15s ease",
                }}
              >
                <span style={{ fontSize: "1.6rem", flexShrink: 0 }}>{c.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: ".7rem", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 800, color: "#f0b429", marginBottom: ".35rem" }}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: ".9rem", color: "#fff", lineHeight: 1.55, whiteSpace: "pre-line" }}>
                    {c.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div style={{
            padding: "1.5rem",
            background: "rgba(240,180,41,.08)",
            border: "1px solid rgba(240,180,41,.3)",
            borderRadius: ".9rem",
            fontSize: ".9rem",
            color: "rgba(238,244,251,.9)",
            lineHeight: 1.7,
          }}>
            <b style={{ color: "#f0b429" }}>Registration questions?</b> Use the chat bot at the bottom-right,
            or open the <a href="/register" style={{ color: "#f0b429", textDecoration: "underline" }}>registration page</a> directly.
            For urgent matters, WhatsApp is usually fastest.
          </div>
          <div style={{ marginTop: "2rem", textAlign: "center", opacity: .7, fontSize: ".82rem" }}>
            Office hours: Monday to Saturday, 4:00 PM – 8:00 PM (PKT)
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}