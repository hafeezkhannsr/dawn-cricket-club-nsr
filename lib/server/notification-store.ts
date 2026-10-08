import { kvPut, kvGet, kvList, kvDelete } from "./db";
export type NotificationType = "REGISTRATION" | "PAYMENT" | "MATCH" | "TICKET" | "GENERAL";
export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
  recipientEmail?: string;
};
const KIND = "notification";
export async function listNotifications(): Promise<Notification[]> {
  const items = await kvList<Notification>(KIND);
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 100);
}
export async function createNotification(data: Omit<Notification, "id" | "createdAt" | "read">): Promise<Notification> {
  const n: Notification = {
    ...data,
    id: "n-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
    read: false,
    createdAt: new Date().toISOString(),
  };
  await kvPut(KIND, n.id, n);
  return n;
}
export async function markRead(id: string): Promise<void> {
  const n = await kvGet<Notification>(KIND, id);
  if (n) {
    n.read = true;
    await kvPut(KIND, id, n);
  }
}
export async function markAllRead(): Promise<void> {
  const items = await kvList<Notification>(KIND);
  for (const n of items) {
    if (!n.read) {
      n.read = true;
      await kvPut(KIND, n.id, n);
    }
  }
}
export async function deleteNotification(id: string): Promise<void> {
  await kvDelete(KIND, id);
}