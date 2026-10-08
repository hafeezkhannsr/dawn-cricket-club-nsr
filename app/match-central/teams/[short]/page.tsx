import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export const dynamic = "force-dynamic";
const TEAMS: Record<string, {
  name: string;
  short: string;
  city: string;
  coach: string;
  captain: string;
  founded: string;
  colors: string;
  players: { num: number; name: string; role: string; age: number; batting: string; bowling: string }[];
}> = {
  ghsn: {
    name: "Government High School Nowshera",
    short: "GHSN",
    city: "Nowshera",
    coach: "Muhammad Ilyas",
    captain: "Adnan Irshad",
    founded: "2015",
    colors: "#14a44d",
    players: [
      { num: 1, name: "Adnan Irshad", role: "Batter (C)", age: 15, batting: "Right-hand", bowling: "-" },
      { num: 2, name: "Hamza Ahmad", role: "Batter", age: 14, batting: "Right-hand", bowling: "Right-arm medium" },
      { num: 3, name: "Rohail Murtaza", role: "Wicket-keeper", age: 15, batting: "Left-hand", bowling: "-" },
      { num: 4, name: "Bilal Khan", role: "All-rounder", age: 15, batting: "Right-hand", bowling: "Right-arm off-spin" },
      { num: 5, name: "Asad Khan", role: "Bowler", age: 14, batting: "Right-hand", bowling: "Right-arm fast" },
      { num: 6, name: "Fida Ullah", role: "Bowler", age: 15, batting: "Left-hand", bowling: "Left-arm orthodox" },
      { num: 7, name: "M. Hassan", role: "Bowler", age: 14, batting: "Right-hand", bowling: "Right-arm medium" },
      { num: 8, name: "Tariq Mehmood", role: "Bowler", age: 15, batting: "Right-hand", bowling: "Right-arm fast" },
      { num: 9, name: "Asif Ali", role: "All-rounder", age: 14, batting: "Left-hand", bowling: "Left-arm medium" },
      { num: 10, name: "N. Shah", role: "Bowler", age: 15, batting: "Right-hand", bowling: "Right-arm off-spin" },
      { num: 11, name: "Wajdan Tariq", role: "Bowler", age: 14, batting: "Right-hand", bowling: "Right-arm fast" },
    ],
  },
  assc: {
    name: "Allied School Sohan Campus",
    short: "ASSC",
    city: "Rawalpindi",
    coach: "Khalid Mahmood",
    captain: "Asad Khan",
    founded: "2018",
    colors: "#f0b429",
    players: [
      { num: 1, name: "Asad Khan", role: "All-rounder (C)", age: 15, batting: "Right-hand", bowling: "Right-arm fast" },
      { num: 2, name: "Imran Shah", role: "Batter", age: 14, batting: "Right-hand", bowling: "-" },
      { num: 3, name: "Zeeshan Ali", role: "Batter", age: 15, batting: "Left-hand", bowling: "-" },
      { num: 4, name: "Faisal Iqbal", role: "Wicket-keeper", age: 14, batting: "Right-hand", bowling: "-" },
      { num: 5, name: "Bilal Ahmad", role: "All-rounder", age: 15, batting: "Right-hand", bowling: "Right-arm off-spin" },
      { num: 6, name: "Kamran Akmal", role: "Bowler", age: 14, batting: "Right-hand", bowling: "Right-arm medium" },
      { num: 7, name: "Naveed Khan", role: "Bowler", age: 15, batting: "Left-hand", bowling: "Left-arm fast" },
      { num: 8, name: "Shoaib Malik", role: "Bowler", age: 14, batting: "Right-hand", bowling: "Right-arm off-spin" },
      { num: 9, name: "Umar Gul", role: "Bowler", age: 15, batting: "Right-hand", bowling: "Right-arm fast" },
      { num: 10, name: "Junaid Khan", role: "Bowler", age: 14, batting: "Left-hand", bowling: "Left-arm medium" },
      { num: 11, name: "Wahab Riaz", role: "Bowler", age: 15, batting: "Right-hand", bowling: "Left-arm fast" },
    ],
  },
  rgs: {
    name: "Roots Garden School",
    short: "RGS",
    city: "Islamabad",
    coach: "Saeed Anwar",
    captain: "Fida Ullah",
    founded: "2017",
    colors: "#93c5fd",
    players: [
      { num: 1, name: "Fida Ullah", role: "Bowler (C)", age: 15, batting: "Right-hand", bowling: "Right-arm off-spin" },
      { num: 2, name: "Sami Aslam", role: "Batter", age: 14, batting: "Left-hand", bowling: "-" },
      { num: 3, name: "Ahmed Shehzad", role: "Batter", age: 15, batting: "Right-hand", bowling: "-" },
      { num: 4, name: "Rizwan Ali", role: "Wicket-keeper", age: 14, batting: "Right-hand", bowling: "-" },
      { num: 5, name: "Haris Sohail", role: "All-rounder", age: 15, batting: "Left-hand", bowling: "Left-arm orthodox" },
      { num: 6, name: "Yasir Shah", role: "Bowler", age: 14, batting: "Right-hand", bowling: "Right-arm leg-spin" },
      { num: 7, name: "Hasan Ali", role: "Bowler", age: 15, batting: "Right-hand", bowling: "Right-arm fast" },
      { num: 8, name: "Mohammad Amir", role: "Bowler", age: 14, batting: "Left-hand", bowling: "Left-arm fast" },
      { num: 9, name: "Shadab Khan", role: "Bowler", age: 15, batting: "Right-hand", bowling: "Right-arm leg-spin" },
      { num: 10, name: "Shaheen Afridi", role: "Bowler", age: 14, batting: "Left-hand", bowling: "Left-arm fast" },
      { num: 11, name: "Naseem Shah", role: "Bowler", age: 15, batting: "Right-hand", bowling: "Right-arm fast" },
    ],
  },
  gzqn: {
    name: "Govt Zakhi Qabristan Nowshera",
    short: "GZQN",
    city: "Nowshera",
    coach: "Abdul Rehman",
    captain: "Naseer Ahmad",
    founded: "2016",
    colors: "#c4b5fd",
    players: [
      { num: 1, name: "Naseer Ahmad", role: "Batter (C)", age: 15, batting: "Right-hand", bowling: "-" },
      { num: 2, name: "Maaz Khan", role: "All-rounder", age: 14, batting: "Right-hand", bowling: "Right-arm medium" },
      { num: 3, name: "Irfan Khan", role: "Batter", age: 15, batting: "Left-hand", bowling: "-" },
      { num: 4, name: "Salman Ali", role: "Wicket-keeper", age: 14, batting: "Right-hand", bowling: "-" },
      { num: 5, name: "Noman Akram", role: "All-rounder", age: 15, batting: "Right-hand", bowling: "Right-arm off-spin" },
      { num: 6, name: "Rashid Khan", role: "Bowler", age: 14, batting: "Right-hand", bowling: "Right-arm leg-spin" },
      { num: 7, name: "Imad Wasim", role: "Bowler", age: 15, batting: "Left-hand", bowling: "Left-arm orthodox" },
      { num: 8, name: "Faheem Ashraf", role: "Bowler", age: 14, batting: "Left-hand", bowling: "Left-arm medium" },
      { num: 9, name: "Mohammad Nawaz", role: "Bowler", age: 15, batting: "Left-hand", bowling: "Left-arm orthodox" },
      { num: 10, name: "Iftikhar Ahmed", role: "Bowler", age: 14, batting: "Right-hand", bowling: "Right-arm off-spin" },
      { num: 11, name: "Khushdil Shah", role: "Bowler", age: 15, batting: "Left-hand", bowling: "Left-arm orthodox" },
    ],
  },
  pms: {
    name: "Peshawar Model School",
    short: "PMS",
    city: "Peshawar",
    coach: "Rashid Latif",
    captain: "Wajdan Tariq",
    founded: "2019",
    colors: "#fca5a5",
    players: [
      { num: 1, name: "Wajdan Tariq", role: "Bowler (C)", age: 15, batting: "Right-hand", bowling: "Right-arm fast" },
      { num: 2, name: "Kamran Ghulam", role: "Batter", age: 14, batting: "Right-hand", bowling: "-" },
      { num: 3, name: "Sahibzada Farhan", role: "Batter", age: 15, batting: "Right-hand", bowling: "-" },
      { num: 4, name: "Mohammad Rizwan", role: "Wicket-keeper", age: 14, batting: "Right-hand", bowling: "-" },
      { num: 5, name: "Iftikhar Ahmed", role: "All-rounder", age: 15, batting: "Right-hand", bowling: "Right-arm off-spin" },
      { num: 6, name: "Usman Shinwari", role: "Bowler", age: 14, batting: "Right-hand", bowling: "Left-arm fast" },
      { num: 7, name: "Sameen Gul", role: "Bowler", age: 15, batting: "Right-hand", bowling: "Right-arm fast" },
      { num: 8, name: "Akif Javed", role: "Bowler", age: 14, batting: "Left-hand", bowling: "Left-arm fast" },
      { num: 9, name: "Arshad Iqbal", role: "Bowler", age: 15, batting: "Right-hand", bowling: "Right-arm medium" },
      { num: 10, name: "Zahid Mahmood", role: "Bowler", age: 14, batting: "Right-hand", bowling: "Right-arm leg-spin" },
      { num: 11, name: "Mohammad Hasnain", role: "Bowler", age: 15, batting: "Right-hand", bowling: "Right-arm fast" },
    ],
  },
  bhm: {
    name: "Beaconhouse Mardan",
    short: "BHM",
    city: "Mardan",
    coach: "Inzamam-ul-Haq",
    captain: "N. Shah",
    founded: "2014",
    colors: "#fdba74",
    players: [
      { num: 1, name: "N. Shah", role: "Bowler (C)", age: 15, batting: "Right-hand", bowling: "Right-arm off-spin" },
      { num: 2, name: "Fakhar Zaman", role: "Batter", age: 14, batting: "Left-hand", bowling: "-" },
      { num: 3, name: "Babar Azam", role: "Batter", age: 15, batting: "Right-hand", bowling: "-" },
      { num: 4, name: "Sarfraz Ahmed", role: "Wicket-keeper", age: 14, batting: "Right-hand", bowling: "-" },
      { num: 5, name: "Shadab Khan", role: "All-rounder", age: 15, batting: "Right-hand", bowling: "Right-arm leg-spin" },
      { num: 6, name: "Hasan Ali", role: "Bowler", age: 14, batting: "Right-hand", bowling: "Right-arm fast" },
      { num: 7, name: "Mohammad Amir", role: "Bowler", age: 15, batting: "Left-hand", bowling: "Left-arm fast" },
      { num: 8, name: "Wahab Riaz", role: "Bowler", age: 14, batting: "Right-hand", bowling: "Left-arm fast" },
      { num: 9, name: "Junaid Khan", role: "Bowler", age: 15, batting: "Right-hand", bowling: "Left-arm fast" },
      { num: 10, name: "Sohail Tanvir", role: "Bowler", age: 14, batting: "Left-hand", bowling: "Left-arm medium" },
      { num: 11, name: "Umar Gul", role: "Bowler", age: 15, batting: "Right-hand", bowling: "Right-arm fast" },
    ],
  },
};
export async function generateMetadata({ params }: { params: Promise<{ short: string }> }) {
  const { short } = await params;
  const t = TEAMS[short.toLowerCase()];
  return { title: t ? t.name : "Team" };
}
export default async function TeamDetailPage({ params }: { params: Promise<{ short: string }> }) {
  const { short } = await params;
  const t = TEAMS[short.toLowerCase()];
  if (!t) notFound();
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <Link href="/match-central/teams" style={{ color: "inherit" }}>Teams</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>{t.short}</span>
          </nav>
          {/* Header card */}
          <div style={{ padding: "1.5rem", background: `linear-gradient(135deg, ${t.colors}15, transparent)`, border: `1px solid ${t.colors}55`, borderRadius: ".9rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ width: 72, height: 72, borderRadius: 999, background: `linear-gradient(135deg, ${t.colors}, ${t.colors}aa)`, border: `2px solid ${t.colors}`, display: "grid", placeItems: "center", fontSize: "1.8rem", fontWeight: 900, color: "#fff", flexShrink: 0 }}>{t.short.charAt(0)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{ margin: 0, fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 900 }}>{t.name}</h1>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: ".4rem", fontSize: ".82rem", color: "rgba(238,244,251,.7)" }}>
                  <span>📍 {t.city}</span>
                  <span>📅 Est. {t.founded}</span>
                  <span>👨‍🏫 Coach: {t.coach}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: ".75rem", marginBottom: "1.5rem" }}>
            <StatCard label="Squad Size" value={t.players.length.toString()} color="#f0b429" />
            <StatCard label="Captain" value={t.captain.split(" ")[0]} color="#86efac" />
            <StatCard label="Matches" value="3" color="#93c5fd" />
            <StatCard label="Wins" value="2" color="#86efac" />
          </div>
          {/* Squad table */}
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", overflow: "hidden" }}>
            <div style={{ padding: "1rem 1.25rem", background: `${t.colors}15`, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
              <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 900 }}>🏏 Playing Squad</h2>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 720 }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,.02)" }}>
                    <th style={thL}>#</th>
                    <th style={thL}>Player</th>
                    <th style={thL}>Role</th>
                    <th style={thR}>Age</th>
                    <th style={thL}>Batting</th>
                    <th style={thL}>Bowling</th>
                  </tr>
                </thead>
                <tbody>
                  {t.players.map((p) => (
                    <tr key={p.num} style={{ borderTop: "1px solid rgba(255,255,255,.04)" }}>
                      <td style={{ padding: ".7rem 1.25rem", color: "#f0b429", fontWeight: 800 }}>{p.num}</td>
                      <td style={{ padding: ".7rem 1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
                          <div style={{ width: 32, height: 32, borderRadius: 999, background: `${t.colors}22`, border: `1px solid ${t.colors}66`, display: "grid", placeItems: "center", fontSize: ".8rem" }}>🏏</div>
                          <span style={{ color: "#fff", fontWeight: 700 }}>{p.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: ".7rem 1.25rem", color: "rgba(238,244,251,.75)" }}>{p.role}</td>
                      <td style={{ padding: ".7rem 1.25rem", textAlign: "right", color: "rgba(238,244,251,.75)" }}>{p.age}</td>
                      <td style={{ padding: ".7rem 1.25rem", color: "rgba(238,244,251,.7)", fontSize: ".78rem" }}>{p.batting}</td>
                      <td style={{ padding: ".7rem 1.25rem", color: "rgba(238,244,251,.7)", fontSize: ".78rem" }}>{p.bowling}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <Link href="/match-central/teams" className="btn btn-outline">← All Teams</Link>
            <Link href="/match-central/matches" className="btn btn-gold">View Matches →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ padding: "1rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".75rem" }}>
      <div style={{ fontSize: ".65rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase", letterSpacing: ".05em" }}>{label}</div>
      <div style={{ fontSize: "1.2rem", fontWeight: 900, color, marginTop: ".25rem" }}>{value}</div>
    </div>
  );
}
const thL: React.CSSProperties = { padding: ".7rem 1.25rem", textAlign: "left", fontSize: ".68rem", color: "rgba(238,244,251,.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", whiteSpace: "nowrap" };
const thR: React.CSSProperties = { ...thL, textAlign: "right" };