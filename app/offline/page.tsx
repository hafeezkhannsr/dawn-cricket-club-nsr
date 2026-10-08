import Link from "next/link";
export const metadata = { title: "Offline - DAWN Cricket Club" };
export default function OfflinePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", display: "grid", placeItems: "center", padding: "2rem" }}>
      <div style={{ maxWidth: 480, textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📡</div>
        <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, margin: "0 0 .75rem" }}>You are offline</h1>
        <p style={{ color: "rgba(238,244,251,.7)", fontSize: ".95rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          DAWN Cricket Club needs an internet connection for this page. Cached pages still work.
          Please check your connection and try again.
        </p>
        <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-gold">Retry Home</Link>
          <Link href="/match-central/matches" className="btn btn-outline">Cached Matches</Link>
        </div>
        <div style={{ marginTop: "2rem", fontSize: ".78rem", color: "rgba(238,244,251,.5)" }}>
          Tip: Install DAWN CC as an app for offline access to frequently viewed pages.
        </div>
      </div>
    </main>
  );
}