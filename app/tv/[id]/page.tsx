import TvView from "./TvView";
export const dynamic = "force-dynamic";
export const metadata = { title: "TV Display" };
export default async function TvPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TvView matchId={id} />;
}