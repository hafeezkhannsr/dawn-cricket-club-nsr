import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveNewsFeed from "@/components/news/LiveNewsFeed";
export const metadata = {
  title: "Live Cricket News",
  description: "Latest cricket news from public RSS sources — PCB, PSL, ICC, U15, U17, U19 and international cricket.",
};
export default function LiveNewsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <header style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900 }}>
              Live Cricket News
            </h1>
            <p style={{ margin: ".4rem 0 0", color: "rgba(238,244,251,.65)", fontSize: ".95rem" }}>
              Pakistan, PCB, PSL, ICC, U15, U17, U19 and international cricket — auto-updated every 15 minutes
            </p>
          </header>
          <LiveNewsFeed />
          <p style={{ marginTop: "2rem", fontSize: ".75rem", color: "rgba(238,244,251,.5)", textAlign: "center", lineHeight: 1.6 }}>
            All news items link to their original source. DAWN Cricket Club does not claim ownership of
            third-party content. RSS feeds are public and used under fair-use terms.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}