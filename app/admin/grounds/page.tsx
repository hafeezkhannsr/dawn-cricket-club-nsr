import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { GROUNDS } from "@/lib/data/mock-grounds";
export const metadata = { title: "Grounds — Admin" };
export default function AdminGroundsPage() {
  const totalSlots = GROUNDS.reduce((s, g) => s + Object.values(g.slots).reduce((a, day) => a + day.length, 0), 0);
  const availableSlots = GROUNDS.reduce((s, g) => s + Object.values(g.slots).reduce((a, day) => a + day.filter((slot) => slot.available).length, 0), 0);
  const bookings = totalSlots - availableSlots;
  return (
    <AdminShell title="Grounds & Bookings" subtitle="Manage venues and review bookings">
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: ".75rem", marginBottom: "1.75rem" }}>
        <Stat label="Grounds" value={GROUNDS.length.toString()} color="#f0b429" icon="🏟️" />
        <Stat label="Total Slots (7d)" value={totalSlots.toString()} color="#93c5fd" icon="📅" />
        <Stat label="Available" value={availableSlots.toString()} color="#86efac" icon="✓" />
        <Stat label="Booked" value={bookings.toString()} color="#fca5a5" icon="🔒" />
      </div>
      {/* Grounds list */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem" }}>
        {GROUNDS.map((g) => {
          const total = Object.values(g.slots).reduce((s, d) => s + d.length, 0);
          const avail = Object.values(g.slots).reduce((s, d) => s + d.filter((x) => x.available).length, 0);
          const booked = total - avail;
          const fill = Math.round((booked / total) * 100);
          return (
            <div key={g.id} style={{ padding: "1.25rem", background: "rgba(255,255,255,.03)", border: `1px solid ${g.color}44`, borderRadius: ".9rem" }}>
              <div style={{ display: "flex", gap: ".75rem", alignItems: "center", marginBottom: "1rem" }}>
                <div style={{ width: 48, height: 48, borderRadius: ".7rem", background: g.color + "22", border: `1px solid ${g.color}66`, display: "grid", placeItems: "center", fontSize: "1.5rem", flexShrink: 0 }}>{g.icon}</div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", gap: ".4rem", alignItems: "center", marginBottom: ".15rem" }}>
                    <span style={{ fontSize: ".95rem", fontWeight: 800, color: "#fff" }}>{g.name}</span>
                    {g.isHome && <span style={{ fontSize: ".58rem", padding: ".1rem .4rem", background: "rgba(240,180,41,.2)", color: "#f0b429", borderRadius: ".25rem", fontWeight: 800 }}>★ HOME</span>}
                  </div>
                  <div style={{ fontSize: ".72rem", color: "rgba(238,244,251,.55)" }}>📍 {g.city}</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: ".4rem", marginBottom: ".85rem", fontSize: ".72rem" }}>
                <Mini k="Rate" v={"PKR " + (g.hourlyRate / 1000) + "K"} />
                <Mini k="Capacity" v={g.capacity.toString()} />
                <Mini k="Rating" v={g.rating.toFixed(1)} />
              </div>
              <div style={{ marginBottom: ".4rem", fontSize: ".72rem", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(238,244,251,.6)" }}>7-day bookings</span>
                <span style={{ color: g.color, fontWeight: 800 }}>{booked} / {total} ({fill}%)</span>
              </div>
              <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,.06)", borderRadius: 999, overflow: "hidden", marginBottom: "1rem" }}>
                <div style={{ height: "100%", width: fill + "%", background: g.color, borderRadius: 999 }} />
              </div>
              <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
                <Link href={`/match-central/grounds/${g.id}`} className="btn btn-outline" style={{ padding: ".35rem .7rem", fontSize: ".72rem" }}>View Public</Link>
                <Link href={`/match-central/grounds/${g.id}/book`} className="btn btn-gold" style={{ padding: ".35rem .7rem", fontSize: ".72rem" }}>Test Booking</Link>
              </div>
            </div>
          );
        })}
      </div>
    </AdminShell>
  );
}
function Stat({ label, value, color, icon }: { label: string; value: string; color: string; icon: string }) {
  return (
    <div style={{ padding: "1rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".25rem" }}>
        <span style={{ fontSize: ".68rem", color: "rgba(238,244,251,.55)", textTransform: "uppercase", fontWeight: 700 }}>{label}</span>
        <span>{icon}</span>
      </div>
      <div style={{ fontSize: "1.55rem", fontWeight: 900, color }}>{value}</div>
    </div>
  );
}
function Mini({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ padding: ".5rem", background: "rgba(255,255,255,.03)", borderRadius: ".5rem", textAlign: "center" }}>
      <div style={{ fontSize: ".58rem", color: "rgba(238,244,251,.5)", textTransform: "uppercase" }}>{k}</div>
      <div style={{ fontSize: ".78rem", color: "#fff", fontWeight: 800, marginTop: ".1rem" }}>{v}</div>
    </div>
  );
}