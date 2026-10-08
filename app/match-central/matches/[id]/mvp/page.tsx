import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_TOURNAMENTS } from "@/lib/data/mock-tournaments";
import MatchLayout from "../MatchLayout";
import MatchSummary from "../components/MatchSummary";
import MvpTab from "../components/MvpTab";
export const dynamic = "force-dynamic";
function findMatch(id: string) {
  for (const t of MOCK_TOURNAMENTS) {
    const m = t.matches.find((x) => x.id === id);
    if (m) return { match: m, tournament: t };
  }
  return null;
}
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = findMatch(id);
  if (!found) notFound();
  const { match, tournament } = found;
  return (
    <>
      <Navbar />
      <MatchLayout match={match} tournament={tournament} />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "1.5rem 0 4rem" }}>
        <div className="container">
          <MatchSummary match={match} tournament={tournament} />
          <MvpTab match={match} tournament={tournament} />
        </div>
      </main>
      <Footer />
    </>
  );
}