import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSearch from "@/components/search/GlobalSearch";
export const metadata = { title: "Search" };
export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "3rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 900, marginBottom: ".5rem" }}>
            Search
          </h1>
          <p style={{ margin: "0 0 1.5rem", color: "rgba(238,244,251,.65)" }}>
            Find players, teams, matches, tournaments, news and pages
          </p>
          <GlobalSearch autoFocus />
        </div>
      </main>
      <Footer />
    </>
  );
}