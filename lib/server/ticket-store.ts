import { kvPut, kvGet, kvList, kvDelete } from "./db";
export type Ticket = {
  id: string;
  ticketNumber: string;
  matchId: string;
  matchName: string;
  matchDate: string;
  venue: string;
  category: "GENERAL" | "VIP" | "PREMIUM";
  quantity: number;
  pricePerTicket: number;
  totalPrice: number;
  buyerName: string;
  buyerMobile: string;
  buyerEmail: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "USED";
  qrCode: string;
  createdAt: string;
};
const KIND = "ticket";
const PRICES: Record<Ticket["category"], number> = {
  GENERAL: 200,
  VIP: 500,
  PREMIUM: 1000,
};
export async function listTickets(): Promise<Ticket[]> {
  const items = await kvList<Ticket>(KIND);
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export async function getTicket(id: string): Promise<Ticket | undefined> {
  return (await kvGet<Ticket>(KIND, id)) ?? undefined;
}
export async function createTicket(input: {
  matchId: string;
  matchName: string;
  matchDate: string;
  venue: string;
  category: Ticket["category"];
  quantity: number;
  buyerName: string;
  buyerMobile: string;
  buyerEmail: string;
}): Promise<Ticket> {
  const price = PRICES[input.category];
  const t: Ticket = {
    id: "t-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
    ticketNumber: "DKK-TKT-" + new Date().getFullYear() + "-" + Math.floor(10000 + Math.random() * 90000),
    matchId: input.matchId,
    matchName: input.matchName,
    matchDate: input.matchDate,
    venue: input.venue,
    category: input.category,
    quantity: input.quantity,
    pricePerTicket: price,
    totalPrice: price * input.quantity,
    buyerName: input.buyerName,
    buyerMobile: input.buyerMobile,
    buyerEmail: input.buyerEmail,
    status: "PENDING",
    qrCode: "",
    createdAt: new Date().toISOString(),
  };
  t.qrCode = "/my-tickets/" + t.id;
  await kvPut(KIND, t.id, t);
  return t;
}
export async function updateTicketStatus(id: string, status: Ticket["status"]): Promise<Ticket | undefined> {
  const t = await getTicket(id);
  if (!t) return undefined;
  t.status = status;
  await kvPut(KIND, id, t);
  return t;
}
export async function deleteTicket(id: string): Promise<boolean> {
  const t = await getTicket(id);
  if (!t) return false;
  await kvDelete(KIND, id);
  return true;
}
export function getTicketPrices() {
  return PRICES;
}