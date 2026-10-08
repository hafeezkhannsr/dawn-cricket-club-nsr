import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "PCB Talent Hunt Program",
  description: "Official PCB Talent Hunt program — age-group trials, school cricket, and player pathways.",
};
const AGE_GROUPS = [
  {
    age: "U15",
    name: "Under-15 Trials",
    year: "2026-2027",
    status: "OPEN",
    details: "Age 13-15 years · District-level trials · Selected players advance to regional camps.",
    trialDate: "December 2026",
    venue: "Regional Cricket Grounds, KP",
    requirement: "Birth certificate / B-Form, school ID, guardian consent",
  },
  {
    age: "U17",
    name: "Under-17 Trials",
    year: "2026-2027",
    status: "OPEN",
    details: "Age 15-17 years · Regional trials · Pathway to Provincial U17 squad.",
    trialDate: "January 2027",
    venue: "Peshawar, Mardan, Abbottabad",
    requirement: "B-Form, previous cricket experience, medical fitness",
  },
  {
    age: "U19",
    name: "Under-19 Trials",
    year: "2026-2027",
    status: "OPEN",
    details: "Age 17-19 years · Provincial trials · Gateway to First-Class cricket.",
    trialDate: "February 2027",
    venue: "Peshawar, Nowshera, Pabbi",
    requirement: "CNIC / B-Form, cricket record, medical certificate",
  },
  {
    age: "U13",
    name: "Under-13 School Program",
    year: "2026-2027",
    status: "Coming Soon",
    details: "Age 10-13 years · School-level cricket · Basic skill development.",
    trialDate: "March 2027",
    venue: "School grounds across KP",
    requirement: "School enrollment proof, parental consent",
  },
];
const PCB_PROGRAMS = [
  { name: "Talent Hunt Program", desc: "Nationwide search for young talent through structured trials across all districts of Pakistan.", link: "https://www.pcb.com.pk/", status: "Active" },
  { name: "School Cricket Program", desc: "Cricket development in schools — equipment, coaching, and inter-school tournaments.", link: "https://www.pcb.com.pk/", status: "Active" },
  { name: "Pathway & Development", desc: "Structured pathway from U13 to U19 to First-Class, with professional coaching at each stage.", link: "https://www.pcb.com.pk/", status: "Active" },
  { name: "Regional Academies", desc: "Regional-level academies across all provinces with world-class facilities.", link: "https://www.pcb.com.pk/", status: "Active" },
];
export default function PcbTalentHuntPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <header style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".75rem", flexWrap: "wrap" }}>
              <span style={{
                fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase",
                fontWeight: 800, padding: ".3rem .7rem", borderRadius: ".4rem",
                background: "rgba(15,138,62,.18)", color: "#86efac",
                border: "1px solid rgba(15,138,62,.5)",
              }}>Official PCB Program</span>
              <span style={{ fontSize: ".82rem", color: "rgba(238,244,251,.6)" }}>
                Updated {new Date().toLocaleDateString()}
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(1.7rem, 4vw, 2.6rem)", fontWeight: 900 }}>
              PCB Talent Hunt & School Program
            </h1>
            <p style={{ margin: ".5rem 0 0", color: "rgba(238,244,251,.7)", fontSize: "1rem", maxWidth: 720, lineHeight: 1.6 }}>
              Complete information on Pakistan Cricket Board's national talent search — age-group
              trials (U13, U15, U17, U19), school cricket initiatives, and the official pathway
              to professional cricket.
            </p>
          </header>
          {/* Active Trials - Highlighted */}
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 900, marginBottom: "1rem", color: "#f0b429" }}>
              🔥 Active Trials (2026-2027)
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              {AGE_GROUPS.map((g) => (
                <div key={g.age} style={{
                  padding: "1.25rem",
                  background: g.status === "OPEN" ? "rgba(20,164,77,.08)" : "rgba(255,255,255,.03)",
                  border: g.status === "OPEN" ? "1px solid rgba(20,164,77,.4)" : "1px solid rgba(255,255,255,.08)",
                  borderRadius: ".9rem",
                  position: "relative",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: ".6rem" }}>
                    <span style={{ fontSize: "1.5rem", fontWeight: 900, color: "#f0b429" }}>{g.age}</span>
                    <span style={{
                      fontSize: ".65rem", fontWeight: 800, letterSpacing: ".06em",
                      padding: ".2rem .5rem", borderRadius: ".35rem",
                      background: g.status === "OPEN" ? "rgba(20,164,77,.25)" : "rgba(240,180,41,.15)",
                      color: g.status === "OPEN" ? "#86efac" : "#f0b429",
                    }}>{g.status}</span>
                  </div>
                  <div style={{ fontSize: ".95rem", fontWeight: 700, color: "#fff", marginBottom: ".5rem" }}>{g.name}</div>
                  <div style={{ fontSize: ".8rem", color: "rgba(238,244,251,.7)", lineHeight: 1.6, marginBottom: ".75rem" }}>{g.details}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: ".3rem", fontSize: ".75rem", color: "rgba(238,244,251,.6)" }}>
                    <span>📅 {g.trialDate}</span>
                    <span>📍 {g.venue}</span>
                    <span>📋 {g.requirement}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* PCB Programs */}
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 900, marginBottom: "1rem" }}>PCB Programs</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              {PCB_PROGRAMS.map((p) => (
                <a key={p.name} href={p.link} target="_blank" rel="noopener noreferrer" style={{
                  padding: "1.25rem",
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: ".85rem",
                  textDecoration: "none", color: "inherit",
                  display: "flex", flexDirection: "column", gap: ".5rem",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".5rem" }}>
                    <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>{p.name}</div>
                    <span style={{
                      fontSize: ".65rem", padding: ".2rem .5rem", borderRadius: ".3rem",
                      background: "rgba(20,164,77,.2)", color: "#86efac", fontWeight: 700,
                    }}>{p.status}</span>
                  </div>
                  <div style={{ fontSize: ".82rem", color: "rgba(238,244,251,.7)", lineHeight: 1.55 }}>{p.desc}</div>
                  <div style={{ marginTop: "auto", fontSize: ".75rem", color: "#f0b429", fontWeight: 700 }}>
                    Visit official PCB page ↗
                  </div>
                </a>
              ))}
            </div>
          </section>
          {/* Registration Steps */}
          <section style={{
            padding: "1.5rem",
            background: "linear-gradient(135deg, rgba(240,180,41,.08), rgba(20,164,77,.05))",
            border: "1px solid rgba(240,180,41,.35)",
            borderRadius: ".9rem",
            marginBottom: "2rem",
          }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 900, marginBottom: "1rem", color: "#f0b429" }}>
              How to Register for PCB Trials
            </h2>
            <ol style={{ margin: 0, paddingLeft: "1.3rem", lineHeight: 2, fontSize: ".9rem", color: "rgba(238,244,251,.85)" }}>
              <li>Monitor <a href="https://www.pcb.com.pk/" target="_blank" rel="noopener noreferrer" style={{ color: "#f0b429" }}>pcb.com.pk</a> for official trial announcements</li>
              <li>Watch for district-level notices from your local cricket association</li>
              <li>Prepare required documents (B-Form / CNIC, birth certificate, school ID)</li>
              <li>Register through your school or district cricket association</li>
              <li>Attend scheduled trials with cricket kit and medical certificate</li>
              <li>Selected players proceed to regional camps and provincial squads</li>
            </ol>
          </section>
          {/* Info Banner */}
          <div style={{
            padding: "1rem 1.25rem",
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: ".7rem",
            fontSize: ".82rem",
            color: "rgba(238,244,251,.7)",
            lineHeight: 1.7,
          }}>
            <b style={{ color: "#f0b429" }}>Note:</b> DAWN Cricket Club is an independent club. We do not claim
            official affiliation with PCB unless such affiliation is separately documented. This page
            aggregates publicly available information from official PCB sources for player awareness.
            Always verify trial details at <a href="https://www.pcb.com.pk/" target="_blank" rel="noopener noreferrer" style={{ color: "#f0b429" }}>pcb.com.pk</a>.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}