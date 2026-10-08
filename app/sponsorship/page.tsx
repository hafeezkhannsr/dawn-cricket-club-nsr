import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export const metadata = {
  title: "Sponsorship Opportunities",
  description: "Partner with DAWN Cricket Club — sponsorship packages for local and international brands.",
};
const TIERS = [
  {
    name: "Bronze Partner",
    price: "PKR 25,000",
    period: "/ year",
    color: "#cd7f32",
    benefits: [
      "Logo on club website footer",
      "Mention on Facebook page (monthly)",
      "2 VIP match passes",
      "Certificate of partnership",
    ],
  },
  {
    name: "Silver Partner",
    price: "PKR 75,000",
    period: "/ year",
    color: "#94a3b8",
    benefits: [
      "All Bronze benefits",
      "Logo on team jerseys (sleeve)",
      "Banner at Abbas Cricket Ground",
      "5 VIP match passes",
      "Social media posts (weekly)",
      "Mention in news articles",
    ],
    popular: true,
  },
  {
    name: "Gold Partner",
    price: "PKR 200,000",
    period: "/ year",
    color: "#f0b429",
    benefits: [
      "All Silver benefits",
      "Logo on team jerseys (chest)",
      "Main banner at entrance",
      "10 VIP match passes",
      "Co-branded tournament (1 per year)",
      "Featured sponsor page",
      "Direct access to player stats",
    ],
  },
  {
    name: "Platinum Partner",
    price: "PKR 500,000+",
    period: "/ year",
    color: "#c4b5fd",
    benefits: [
      "All Gold benefits",
      "Tournament naming rights",
      "Jersey front logo (primary)",
      "Unlimited VIP passes",
      "Exclusive sponsor for 1 tournament",
      "Meet with club management",
      "Custom partnership arrangement",
      "Youth academy branding",
    ],
  },
];
export default function SponsorshipPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", paddingBottom: "4rem" }}>
        <section style={{ padding: "3rem 0 2.5rem", background: "linear-gradient(135deg, rgba(240,180,41,.15), rgba(20,164,77,.08))", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <div className="container">
            <div style={{ fontSize: ".7rem", letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 800, color: "#f0b429", marginBottom: ".75rem" }}>
              Partner with Champions
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)", fontWeight: 900, lineHeight: 1.15 }}>
              Sponsorship <span style={{ color: "#f0b429" }}>Opportunities</span>
            </h1>
            <p style={{ margin: "1rem 0 0", color: "rgba(238,244,251,.75)", fontSize: "1.05rem", maxWidth: 780, lineHeight: 1.65 }}>
              Reach thousands of cricket fans in Nowshera and across Khyber Pakhtunkhwa. Partner with
              DAWN Cricket Club to support youth cricket while growing your brand.
            </p>
            <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
              <Link href="/contact" className="btn btn-gold btn-lg">💼 Discuss Partnership</Link>
              <a href="mailto:sponsors@dawncricketclub.pk" className="btn btn-outline btn-lg">✉️ Email Sponsors Team</a>
            </div>
          </div>
        </section>
        <section className="container" style={{ paddingTop: "2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
            {TIERS.map((t) => (
              <div key={t.name} style={{
                padding: "1.5rem",
                background: t.popular ? "linear-gradient(135deg, " + t.color + "15, transparent)" : "rgba(255,255,255,.03)",
                border: t.popular ? "2px solid " + t.color : "1px solid " + t.color + "44",
                borderRadius: "1rem",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}>
                {t.popular && (
                  <span style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", padding: ".25rem .75rem", background: t.color, color: "#061428", borderRadius: "999px", fontSize: ".65rem", fontWeight: 900, letterSpacing: ".05em" }}>
                    ★ MOST POPULAR
                  </span>
                )}
                <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 900, color: t.color }}>{t.name}</h2>
                <div style={{ marginTop: ".75rem", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.75rem", fontWeight: 900, color: "#fff" }}>{t.price}</span>
                  <span style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginLeft: ".35rem" }}>{t.period}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", flex: 1 }}>
                  {t.benefits.map((b, i) => (
                    <li key={i} style={{ fontSize: ".85rem", color: "rgba(238,244,251,.85)", lineHeight: 1.9, display: "flex", gap: ".5rem", alignItems: "flex-start" }}>
                      <span style={{ color: t.color, flexShrink: 0, fontWeight: 800 }}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn" style={{ background: t.color, color: "#061428", justifyContent: "center", fontWeight: 800 }}>
                  Get Started →
                </Link>
              </div>
            ))}
          </div>
          {/* Why sponsor */}
          <div style={{ padding: "2rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: "1rem", marginBottom: "2rem" }}>
            <h2 style={{ margin: "0 0 1.5rem", fontSize: "1.35rem", fontWeight: 900, textAlign: "center" }}>Why Sponsor DAWN Cricket Club?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
              <Benefit icon="👥" title="500+ Players" desc="Reach over 500 registered players and their families." />
              <Benefit icon="📱" title="10K+ Monthly Views" desc="Our website gets 10,000+ monthly visitors from KPK." />
              <Benefit icon="🎯" title="Youth Focus" desc="Support Pakistan's next generation of cricket talent." />
              <Benefit icon="📸" title="Social Media Reach" desc="Featured across Facebook, Instagram, YouTube, X." />
              <Benefit icon="🏆" title="Professional Events" desc="Brand visibility at all club tournaments." />
              <Benefit icon="🎁" title="Tax Benefits" desc="Registered as sports NGO — donations may be tax-deductible." />
            </div>
          </div>
          {/* CTA */}
          <div style={{ padding: "2.5rem", background: "linear-gradient(135deg, rgba(240,180,41,.15), rgba(20,164,77,.08))", border: "1px solid rgba(240,180,41,.4)", borderRadius: "1rem", textAlign: "center" }}>
            <h2 style={{ margin: "0 0 .75rem", fontSize: "1.5rem", fontWeight: 900 }}>Ready to partner with us?</h2>
            <p style={{ margin: "0 0 1.5rem", color: "rgba(238,244,251,.75)", fontSize: ".95rem", maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
              Custom sponsorship packages available. Let's discuss how we can grow together.
            </p>
            <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-gold btn-lg">📞 Contact Us</Link>
              <a href="mailto:sponsors@dawncricketclub.pk" className="btn btn-outline btn-lg">✉️ sponsors@dawncricketclub.pk</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
function Benefit({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>{icon}</div>
      <div style={{ fontSize: ".95rem", fontWeight: 800, color: "#fff", marginBottom: ".35rem" }}>{title}</div>
      <div style={{ fontSize: ".82rem", color: "rgba(238,244,251,.65)", lineHeight: 1.5 }}>{desc}</div>
    </div>
  );
}