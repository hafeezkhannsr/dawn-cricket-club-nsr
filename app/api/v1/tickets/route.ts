import { NextRequest, NextResponse } from "next/server";
import { listTickets, createTicket, getTicketPrices } from "@/lib/server/ticket-store";
export const dynamic = "force-dynamic";
export async function GET() {
  const items = await listTickets();
  return NextResponse.json({ ok: true, items, prices: getTicketPrices() });
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { matchId, matchName, matchDate, venue, category, quantity, buyerName, buyerMobile, buyerEmail } = body;
    if (!matchId || !matchName) return NextResponse.json({ ok: false, error: "Match info required" }, { status: 400 });
    if (!category || !["GENERAL", "VIP", "PREMIUM"].includes(category)) return NextResponse.json({ ok: false, error: "Invalid category" }, { status: 400 });
    const qty = Number(quantity) || 1;
    if (qty < 1 || qty > 10) return NextResponse.json({ ok: false, error: "Quantity must be 1-10" }, { status: 400 });
    if (!buyerName || buyerName.length < 2) return NextResponse.json({ ok: false, error: "Buyer name required" }, { status: 400 });
    if (!buyerMobile) return NextResponse.json({ ok: false, error: "Mobile required" }, { status: 400 });
    const t = await createTicket({
      matchId, matchName, matchDate: matchDate || "", venue: venue || "",
      category, quantity: qty, buyerName, buyerMobile, buyerEmail: buyerEmail || "",
    });
    return NextResponse.json({ ok: true, ticket: t });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}