import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "Associations" };

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2.5rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.5)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> -·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·
            <span style={{ color: "#f0b429" }}>Associations</span>
          </nav>

          <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>
            Associations
          </h1>
          <p style={{ margin: ".5rem 0 2rem", color: "rgba(238,244,251,.7)" }}>
            District and provincial cricket boards across Pakistan.
          </p>

          <div style={{ padding: "3rem 1.5rem", background: "rgba(255,255,255,.03)", border: "1px dashed rgba(240,180,41,.3)", borderRadius: ".9rem", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: ".75rem", opacity: .6 }}>🗗</div>
            <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#fff", marginBottom: ".5rem" }}>
              Associations Directory
            </div>
            <p style={{ maxWidth: 520, margin: "0 auto 1.5rem", lineHeight: 1.65, fontSize: ".9rem" }}>
              District and provincial cricket boards. Admins can manage associations from the dashboard.
            </p>
            <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/admin" className="btn btn-gold">Admin Dashboard</Link>
              <Link href="/match-central" className="btn btn-outline">← Match Central</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>

  );
}
