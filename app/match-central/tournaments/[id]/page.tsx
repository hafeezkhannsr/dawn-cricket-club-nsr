import { notFound } from "next/navigation";
import { getTournament } from "@/lib/data/mock-tournaments";
import TournamentLayout from "./TournamentLayout";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = getTournament(id);
  return { title: t ? t.name : "Tournament" };
}
export default async function TournamentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = getTournament(id);
  if (!t) notFound();
  return <TournamentLayout tournament={t} />;
}