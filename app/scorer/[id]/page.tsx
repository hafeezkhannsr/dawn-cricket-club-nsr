import Navbar from "@/components/Navbar";
import LiveScorer from "./components/LiveScorer";
export const dynamic = "force-dynamic";
export const metadata = { title: "Live Scoring" };
export default async function ScorerMatchPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <LiveScorer matchId={id} />
    </>
  );
}