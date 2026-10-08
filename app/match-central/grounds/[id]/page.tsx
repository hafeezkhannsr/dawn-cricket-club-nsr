import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getGround, getNext7Days } from "@/lib/data/mock-grounds";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const g = getGround(id);
  return { title: g ? g.name : "Ground" };
}
export default async function GroundDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ground = getGround(id);
  if (!ground) notFound();
  const days = getNext7Days();
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <Link href="/match-central/grounds" style={{ color: "inherit" }}>Grounds</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>{ground.name}</span>
          </nav>
          {/* Header */}
          <div style={{ padding: "1.5rem", background: `linear-gradient(135deg, ${ground.color}15, transparent)`, border: `1px solid ${ground.color}55`, borderRadius: ".9rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ width: 80, height: 80, borderRadius: "1rem", background: `${ground.color}22`, border: `2px solid ${ground.color}`, display: "grid", placeItems: "center", fontSize: "2.2rem", flexShrink: 0 }}>{ground.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                {ground.isHome && (
                  <span style={{ display: "inline-block", padding: ".2rem .55rem", background: "rgba(240,180,41,.2)", color: "#f0b429", borderRadius: ".3rem", fontSize: ".62rem", fontWeight: 800, marginBottom: ".4rem" }}>★ HOME GROUND</span>
                )}
                <h1 style={{ margin: 0, fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 900 }}>{ground.name}</h1>
                <div style={{ fontSize: ".82rem", color: "rgba(238,244,251,.75)", marginTop: ".4rem" }}>📍 {ground.address}</div>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: ".5rem", fontSize: ".78rem", color: "rgba(238,244,251,.65)" }}>
                  <span>⭐ {ground.rating} rating</span>
                  <span>🏏 {ground.matches} matches</span>
                  <span>👥 Capacity {ground.capacity}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: ".5rem", flexDirection: "column" }}>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(ground.address)}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: ".78rem" }}>
                  📍 Open in Maps
                </a>
              </div>
            </div>
          </div>
          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: ".75rem", marginBottom: "1.5rem" }}>
            <StatCard label="Pitch Type" value={ground.pitch} color={ground.color} />
            <StatCard label="Capacity" value={ground.capacity.toString()} color="#86efac" />
            <StatCard label="Hourly Rate" value={"PKR " + ground.hourlyRate.toLocaleString()} color="#f0b429" />
            <StatCard label="Total Matches" value={ground.matches.toString()} color="#93c5fd" />
          </div>
          {/* Facilities */}
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", padding: "1.25rem", marginBottom: "1.5rem" }}>
            <h2 style={{ margin: "0 0 .85rem", fontSize: "1.05rem", fontWeight: 900 }}>✨ Facilities</h2>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
              {ground.facilities.map((f) => (
                <span key={f} style={{ fontSize: ".78rem", padding: ".4rem .75rem", background: `${ground.color}22`, color: ground.color, borderRadius: ".5rem", fontWeight: 700, border: `1px solid ${ground.color}44` }}>✓ {f}</span>
              ))}
            </div>
          </div>
          {/* Available Slots */}
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", overflow: "hidden", marginBottom: "1.5rem" }}>
            <div style={{ padding: "1rem 1.25rem", background: `${ground.color}15`, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
              <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 900 }}>📅 Next 7 Days Availability</h2>
            </div>
            <div style={{ overflowX: "auto", padding: "1rem" }}>
              <div style={{ display: "flex", gap: "1rem", minWidth: "min-content" }}>
                {days.map((day) => {
                  const daySlots = ground.slots[day] || [];
                  const dateObj = new Date(day);
                  const isToday = day === new Date().toISOString().slice(0, 10);
                  return (
                    <div key={day} style={{ minWidth: 200, flex: "0 0 auto" }}>
                      <div style={{ textAlign: "center", marginBottom: ".6rem" }}>
                        <div style={{ fontSize: ".68rem", color: isToday ? "#f0b429" : "rgba(238,244,251,.5)", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em" }}>
                          {isToday ? "TODAY" : dateObj.toLocaleDateString("en", { weekday: "short" })}
                        </div>
                        <div style={{ fontSize: ".9rem", color: "#fff", fontWeight: 700 }}>
                          {dateObj.toLocaleDateString("en", { day: "numeric", month: "short" })}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
                        {daySlots.map((slot) => (
                          <Link
                            key={slot.id}
                            href={slot.available ? `/match-central/grounds/${ground.id}/book?slot=${slot.id}&date=${day}` : "#"}
                            style={{
                              display: "block",
                              padding: ".55rem .7rem",
                              background: slot.available ? "rgba(20,164,77,.12)" : "rgba(220,38,38,.08)",
                              border: slot.available ? "1px solid rgba(20,164,77,.4)" : "1px solid rgba(220,38,38,.3)",
                              borderRadius: ".5rem",
                              fontSize: ".72rem",
                              color: slot.available ? "#86efac" : "rgba(238,244,251,.4)",
                              fontWeight: 700,
                              textDecoration: "none",
                              cursor: slot.available ? "pointer" : "not-allowed",
                              textAlign: "center",
                            }}
                          >
                            {slot.start} - {slot.end}
                            <div style={{ fontSize: ".62rem", color: slot.available ? "#86efac" : "#fca5a5", marginTop: ".15rem", fontWeight: 800 }}>
                              {slot.available ? "✓ Available" : "✕ Booked"}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <Link href="/match-central/grounds" className="btn btn-outline">← All Grounds</Link>
            <Link href="/match-central/grounds/bookings" className="btn btn-outline">📋 My Bookings</Link>
            <Link href={`/match-central/grounds/${ground.id}/book`} className="btn btn-gold">Book Now →</Link>
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