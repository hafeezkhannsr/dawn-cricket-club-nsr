import OverlayView from "./OverlayView";
export const dynamic = "force-dynamic";
export const metadata = { title: "Scoreboard Overlay" };
export default async function OverlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OverlayView matchId={id} />;
}