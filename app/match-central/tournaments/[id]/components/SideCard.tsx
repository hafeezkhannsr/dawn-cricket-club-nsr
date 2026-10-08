import type { Tournament } from "@/lib/data/tournament-types";
export default function SideCard({ tournament }: { tournament: Tournament }) {
  return (
    <aside style={{
      padding: "1.25rem",
      background: "rgba(255,255,255,.03)",
      border: "1px solid rgba(255,255,255,.08)",
      borderRadius: ".9rem",
      height: "fit-content",
    }}>
      <div style={{
        width: "100%",
        aspectRatio: "1",
        borderRadius: ".7rem",
        background: "linear-gradient(135deg, #0f3d2e, #14a44d22)",
        border: "1px solid rgba(20,164,77,.3)",
        display: "grid", placeItems: "center",
        marginBottom: "1rem",
        fontSize: "4rem",
      }}>🏏</div>
      <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 800, textAlign: "center", color: "#fff" }}>
        {tournament.name}
      </h3>
      <p style={{ margin: ".4rem 0 1rem", textAlign: "center", fontSize: ".75rem", color: "rgba(238,244,251,.55)" }}>
        📅 {new Date(tournament.startDate).toLocaleDateString()} — {new Date(tournament.endDate).toLocaleDateString()}
      </p>
      <div style={{
        padding: ".75rem",
        background: "rgba(255,255,255,.03)",
        border: "1px solid rgba(255,255,255,.06)",
        borderRadius: ".6rem",
        fontSize: ".82rem",
        marginBottom: "1rem",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".4rem" }}>
          <span style={{ color: "rgba(238,244,251,.6)" }}>Followers:</span>
          <b style={{ color: "#fff" }}>{tournament.followers.toLocaleString()}</b>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "rgba(238,244,251,.6)" }}>Visit Count:</span>
          <b style={{ color: "#fff" }}>{(tournament.visits / 1000).toFixed(1)}K</b>
        </div>
      </div>
      <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
        FOLLOW
      </button>
    </aside>
  );
}