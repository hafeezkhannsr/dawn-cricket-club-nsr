import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getGround, getNext7Days } from "@/lib/data/mock-grounds";
import BookingForm from "./BookingForm";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const g = getGround(id);
  return { title: g ? "Book " + g.name : "Book Ground" };
}
export default async function BookGroundPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ slot?: string; date?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const ground = getGround(id);
  if (!ground) notFound();
  const days = getNext7Days();
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#030a18", color: "#eef4fb", padding: "2rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <nav style={{ fontSize: ".82rem", color: "rgba(238,244,251,.55)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link> ·{" "}
            <Link href="/match-central" style={{ color: "inherit" }}>Match Central</Link> ·{" "}
            <Link href="/match-central/grounds" style={{ color: "inherit" }}>Grounds</Link> ·{" "}
            <Link href={`/match-central/grounds/${ground.id}`} style={{ color: "inherit" }}>{ground.name}</Link> ·{" "}
            <span style={{ color: "#f0b429" }}>Book</span>
          </nav>
          <h1 style={{ margin: "0 0 1.5rem", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900 }}>
            📅 Book {ground.name}
          </h1>
          <BookingForm
            groundId={ground.id}
            groundName={ground.name}
            hourlyRate={ground.hourlyRate}
            days={days}
            slots={ground.slots}
            defaultSlot={sp.slot}
            defaultDate={sp.date}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}