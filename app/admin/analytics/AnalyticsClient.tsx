"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
type Stats = {
  registration: { total: number; submitted: number; approved: number; rejected: number; pending: number; paymentVerified: number };
  tournament: { total: number; live: number; totalMatches: number; liveMatches: number; completedMatches: number; upcomingMatches: number };
  player: { total: number; topScorer: { name: string; stats: { runs: number } }; topWicketTaker: { name: string; stats: { wickets: number } }; totalRuns: number; totalWickets: number };
  academy: { batches: number; students: number; coaches: number; totalCapacity: number; totalEnrolled: number };
  ground: { total: number; homeGround: string; totalMatches: number; avgRating: string };
  content: { notices: number; urgentNotices: number };
  trend: { date: string; registrations: number; pageViews: number }[];
};
export default function AnalyticsClient() {
  const [data, setData] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/stats", { cache: "no-store" });
      const j = await res.json();
      if (j.ok) setData(j);
    } catch {}
    setLoading(false);
  }
  useEffect(() => {
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, []);
  if (loading || !data) {
    return <div style={{ padding: "3rem", textAlign: "center", color: "rgba(238,244,251,.6)" }}>Loading analytics…</div>;
  }
  return (
    <div>
      {/* TOP KPI ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: ".75rem", marginBottom: "1.75rem" }}>
        <KPI label="Registrations" value={data.registration.total.toString()} delta={`${data.registration.pending} pending`} color="#f0b429" icon="📝" />
        <KPI label="Live Matches" value={data.tournament.liveMatches.toString()} delta={`${data.tournament.totalMatches} total`} color="#dc2626" icon="🔴" live={data.tournament.liveMatches > 0} />
        <KPI label="Players" value={data.player.total.toString()} delta={`${data.player.totalRuns} runs`} color="#86efac" icon="🏏" />
        <KPI label="Academy" value={data.academy.students.toString()} delta={`${data.academy.coaches} coaches`} color="#93c5fd" icon="🎓" />
        <KPI label="Grounds" value={data.ground.total.toString()} delta={`${data.ground.totalMatches} matches`} color="#c4b5fd" icon="🏟️" />
        <KPI label="Notices" value={data.content.notices.toString()} delta={data.content.urgentNotices > 0 ? `${data.content.urgentNotices} urgent` : "all normal"} color="#fdba74" icon="📢" urgent={data.content.urgentNotices > 0} />
      </div>
      {/* CHARTS ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginBottom: "1.5rem" }} className="analytics-charts">
        {/* Registrations Chart */}
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", padding: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: ".5rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 900 }}>📊 Registration Trend (30 days)</h2>
            <span style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)" }}>Auto-refresh 30s</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: 140, paddingBottom: ".5rem", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            {data.trend.map((t, i) => {
              const max = Math.max(...data.trend.map((x) => x.registrations));
              const h = (t.registrations / max) * 100;
              return (
                <div key={i} style={{ flex: 1, minWidth: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: ".25rem" }} title={t.date + ": " + t.registrations}>
                  <div style={{ width: "100%", height: h + "%", background: "linear-gradient(180deg, #f0b429, #cb6e17)", borderRadius: "2px 2px 0 0", minHeight: 4 }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".5rem", fontSize: ".68rem", color: "rgba(238,244,251,.5)" }}>
            <span>{data.trend[0]?.date}</span>
            <span>Today</span>
          </div>
        </div>
        {/* Page Views Chart */}
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: ".9rem", padding: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: ".5rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 900 }}>👁️ Page Views (30 days)</h2>
            <span style={{ fontSize: ".72rem", color: "rgba(238,244,251,.5)" }}>
              Total: {data.trend.reduce((s, t) => s + t.pageViews, 0).toLocaleString()}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: 140, paddingBottom: ".5rem", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            {data.trend.map((t, i) => {
              const max = Math.max(...data.trend.map((x) => x.pageViews));
              const h = (t.pageViews / max) * 100;
              return (
                <div key={i} style={{ flex: 1, minWidth: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: ".25rem" }} title={t.date + ": " + t.pageViews + " views"}>
                  <div style={{ width: "100%", height: h + "%", background: "linear-gradient(180deg, #14a44d, #0f8a3e)", borderRadius: "2px 2px 0 0", minHeight: 4 }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* DETAILED SECTIONS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }} className="analytics-details">
        <DetailCard title="Registration Breakdown" color="#f0b429" icon="📝">
          <Row k="Total" v={data.registration.total.toString()} />
          <Row k="Submitted" v={data.registration.submitted.toString()} />
          <Row k="Under Review" v={data.registration.pending.toString()} />
          <Row k="Approved" v={data.registration.approved.toString()} green />
          <Row k="Rejected" v={data.registration.rejected.toString()} red />
          <Row k="Payment Verified" v={data.registration.paymentVerified.toString()} green />
        </DetailCard>
        <DetailCard title="Tournament Activity" color="#93c5fd" icon="🏆">
          <Row k="Active Tournaments" v={data.tournament.total.toString()} />
          <Row k="Live Tournaments" v={data.tournament.live.toString()} red />
          <Row k="Total Matches" v={data.tournament.totalMatches.toString()} />
          <Row k="Live Now" v={data.tournament.liveMatches.toString()} red />
          <Row k="Completed" v={data.tournament.completedMatches.toString()} green />
          <Row k="Upcoming" v={data.tournament.upcomingMatches.toString()} />
        </DetailCard>
        <DetailCard title="Player Performance" color="#86efac" icon="🏏">
          <Row k="Total Players" v={data.player.total.toString()} />
          <Row k="Top Scorer" v={data.player.topScorer.name + " (" + data.player.topScorer.stats.runs + ")"} green />
          <Row k="Top Wicket-taker" v={data.player.topWicketTaker.name + " (" + data.player.topWicketTaker.stats.wickets + ")"} green />
          <Row k="Total Runs" v={data.player.totalRuns.toString()} />
          <Row k="Total Wickets" v={data.player.totalWickets.toString()} />
        </DetailCard>
        <DetailCard title="Academy Overview" color="#c4b5fd" icon="🎓">
          <Row k="Batches" v={data.academy.batches.toString()} />
          <Row k="Coaches" v={data.academy.coaches.toString()} />
          <Row k="Students" v={data.academy.students.toString()} />
          <Row k="Total Capacity" v={data.academy.totalCapacity.toString()} />
          <Row k="Enrolled" v={data.academy.totalEnrolled.toString() + " / " + data.academy.totalCapacity.toString()} green />
        </DetailCard>
        <DetailCard title="Grounds & Venues" color="#c4b5fd" icon="🏟️">
          <Row k="Total Grounds" v={data.ground.total.toString()} />
          <Row k="Home Ground" v={data.ground.homeGround} green />
          <Row k="Total Matches" v={data.ground.totalMatches.toString()} />
          <Row k="Avg Rating" v={data.ground.avgRating + " / 5.0"} />
        </DetailCard>
        <DetailCard title="Content & Notices" color="#fdba74" icon="📢">
          <Row k="Total Notices" v={data.content.notices.toString()} />
          <Row k="Urgent" v={data.content.urgentNotices.toString()} red={data.content.urgentNotices > 0} />
          <Row k="Categories" v="6 active" />
        </DetailCard>
      </div>
      {/* QUICK LINKS */}
      <div style={{ marginTop: "1.75rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
        <Link href="/admin" className="btn btn-outline">← Dashboard</Link>
        <Link href="/admin/registrations" className="btn btn-outline">Registrations</Link>
        <Link href="/admin/academy" className="btn btn-outline">Academy</Link>
        <Link href="/admin/grounds" className="btn btn-outline">Grounds</Link>
        <Link href="/admin/emails" className="btn btn-outline">Email Logs</Link>
      </div>
      <style>{`
        @media (min-width: 1000px) {
          .analytics-charts { grid-template-columns: 1fr 1fr !important; }
          .analytics-details { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
function KPI({ label, value, delta, color, icon, live, urgent }: { label: string; value: string; delta: string; color: string; icon: string; live?: boolean; urgent?: boolean }) {
  return (
    <div style={{ padding: "1rem", background: "rgba(255,255,255,.03)", border: `1px solid ${color}33`, borderRadius: ".8rem", position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: ".35rem" }}>
        <span style={{ fontSize: ".65rem", color: "rgba(238,244,251,.55)", textTransform: "uppercase", letterSpacing: ".04em", fontWeight: 700 }}>{label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
          {live && <span style={{ width: 6, height: 6, borderRadius: 999, background: "#dc2626", animation: "livePulse 1.6s ease-in-out infinite" }} />}
          <span>{icon}</span>
        </div>
      </div>
      <div style={{ fontSize: "1.6rem", fontWeight: 900, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: ".68rem", color: "rgba(238,244,251,.5)", marginTop: ".3rem" }}>{delta}</div>
      {urgent && <span style={{ position: "absolute", top: ".5rem", right: ".5rem", fontSize: ".55rem", padding: ".15rem .35rem", background: "rgba(220,38,38,.25)", color: "#fca5a5", borderRadius: ".25rem", fontWeight: 800 }}>!</span>}
    </div>
  );
}
function DetailCard({ title, color, icon, children }: { title: string; color: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${color}33`, borderRadius: ".9rem", overflow: "hidden" }}>
      <div style={{ padding: ".85rem 1.1rem", background: `${color}11`, borderBottom: `1px solid ${color}22`, display: "flex", alignItems: "center", gap: ".5rem" }}>
        <span>{icon}</span>
        <h3 style={{ margin: 0, fontSize: ".9rem", fontWeight: 800, color }}>{title}</h3>
      </div>
      <div style={{ padding: ".5rem 1rem .75rem" }}>
        {children}
      </div>
    </div>
  );
}
function Row({ k, v, green, red }: { k: string; v: string; green?: boolean; red?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: ".75rem", padding: ".5rem 0", borderBottom: "1px solid rgba(255,255,255,.04)", fontSize: ".82rem" }}>
      <span style={{ color: "rgba(238,244,251,.6)" }}>{k}</span>
      <span style={{ color: green ? "#86efac" : red ? "#fca5a5" : "#fff", fontWeight: 700, textAlign: "right", wordBreak: "break-word" }}>{v}</span>
    </div>
  );
}