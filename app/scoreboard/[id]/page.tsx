import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScoreboardView from "./components/ScoreboardView";
export const dynamic = "force-dynamic";
export const metadata = { title: "Match Scoreboard" };
export default async function ScoreboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <ScoreboardView matchId={id} />
      <Footer />
    </>
  );
}