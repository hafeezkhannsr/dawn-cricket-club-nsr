import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = { title: "Notices — Admin" };
export default function AdminNoticesPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <header style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}>
              Notices
            </h1>
            <p style={{ margin: ".35rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".9rem" }}>
              Announcements and official club notices
            </p>
          </header>
          <div style={{
            padding: "2rem",
            background: "rgba(255,255,255,.03)",
            border: "1px dashed rgba(255,255,255,.15)",
            borderRadius: ".9rem",
            textAlign: "center",
            color: "rgba(238,244,251,.6)",
          }}>
            <div style={{ fontSize: "2rem", marginBottom: ".75rem", opacity: .6 }}>📢</div>
            <div style={{ fontWeight: 700, marginBottom: ".5rem", color: "#fff" }}>
              Coming soon
            </div>
            <p style={{ maxWidth: 480, margin: "0 auto", lineHeight: 1.7, fontSize: ".88rem" }}>
              Notices and announcements will be manageable from here. Until then, use the
              News Hub to publish updates.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}