import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "Cricket Rules & Regulations",
  description: "PCB official rules, MCC laws of cricket and DAWN club rules.",
};
type RuleDoc = {
  title: string;
  titleUr: string;
  desc: string;
  source: string;
  url: string;
  tag: string;
};
const DOCS: RuleDoc[] = [
  {
    title: "MCC Laws of Cricket (Latest)",
    titleUr: "ایم سی سی کرکٹ کے قوانین",
    desc: "The official laws of cricket maintained by Marylebone Cricket Club",
    source: "MCC",
    url: "https://www.lords.org/mcc/the-laws-of-cricket",
    tag: "Official",
  },
  {
    title: "PCB Domestic Cricket Rules",
    titleUr: "پی سی بی ڈومیسٹک کرکٹ قوانین",
    desc: "Official rules for Pakistan domestic cricket circuit",
    source: "PCB",
    url: "https://www.pcb.com.pk/",
    tag: "Official",
  },
  {
    title: "ICC Playing Conditions",
    titleUr: "آئی سی سی پلیئنگ کنڈیشنز",
    desc: "Standard playing conditions for international matches",
    source: "ICC",
    url: "https://www.icc-cricket.com/about/cricket/rules-and-regulations",
    tag: "Official",
  },
  {
    title: "DAWN Cricket Club — Code of Conduct",
    titleUr: "ڈان کرکٹ کلب ضابطہ اخلاق",
    desc: "Internal rules, discipline and conduct for all DAWN players and staff",
    source: "DAWN",
    url: "#",
    tag: "Club",
  },
  {
    title: "DSL League Rules",
    titleUr: "ڈی ایس ایل لیگ قوانین",
    desc: "Season format, points system, eligibility and prize rules",
    source: "DSL",
    url: "#",
    tag: "Club",
  },
];
export default function RulesPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <header style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>
              Cricket Rules & Regulations
            </h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem", maxWidth: 720 }}>
              Official MCC, ICC, PCB and DAWN club rules. All external documents link to their
              original source with proper attribution.
            </p>
          </header>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}>
            {DOCS.map((d) => (
              <a
                key={d.title}
                href={d.url}
                target={d.url === "#" ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={{
                  padding: "1.25rem",
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: ".8rem",
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex", flexDirection: "column", gap: ".55rem",
                  transition: "all .15s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".5rem" }}>
                  <span style={{
                    fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase",
                    fontWeight: 800, padding: ".2rem .5rem", borderRadius: ".35rem",
                    background: d.tag === "Official" ? "rgba(15,138,62,.18)" : "rgba(240,180,41,.18)",
                    color: d.tag === "Official" ? "#86efac" : "#f0b429",
                  }}>{d.tag}</span>
                  <span style={{ fontSize: ".68rem", color: "rgba(238,244,251,.5)" }}>{d.source}</span>
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", lineHeight: 1.35 }}>
                  {d.title}
                </div>
                <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.6)", lineHeight: 1.5 }}>
                  {d.desc}
                </div>
                <div style={{
                  marginTop: "auto", paddingTop: ".5rem",
                  fontSize: ".72rem", color: "#f0b429", fontWeight: 600,
                }}>
                  {d.url === "#" ? "PDF coming soon" : "Open document ↗"}
                </div>
              </a>
            ))}
          </div>
          <div style={{
            marginTop: "2rem",
            padding: "1rem 1.25rem",
            background: "rgba(240,180,41,.08)",
            border: "1px solid rgba(240,180,41,.28)",
            borderRadius: ".7rem",
            fontSize: ".82rem",
            color: "rgba(238,244,251,.85)",
            lineHeight: 1.6,
          }}>
            DAWN is an independent club and does not claim official affiliation with
            PCB, ICC or MCC unless such affiliation is separately documented. All
            rules shown are for reference and educational purposes.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}