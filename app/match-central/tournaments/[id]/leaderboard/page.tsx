import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTournament } from "@/lib/data/mock-tournaments";
import TournamentLayout from "../TournamentLayout";
import SideCard from "../components/SideCard";
import Leaderboard from "../components/Leaderboard";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function LeaderboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = getTournament(id);
  if (!t) notFound();
  return (
    <>
      <Navbar />
      <TournamentLayout tournament={t} />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="tournament-grid">
            <SideCard tournament={t} />
            <div>
              <Leaderboard data={t.leaderboard} region={t.region} group={t.group} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media (min-width: 900px) {
          .tournament-grid { grid-template-columns: 320px 1fr !important; }
        }
      `}</style>
    </>
  );
}