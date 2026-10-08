/* ============================================================
   Offline Scoring Queue
   When the scorer is offline, ball records are queued in
   localStorage and synced when connection returns.
   ============================================================ */
export type QueuedBall = {
  id: string;
  matchId: string;
  payload: Record<string, unknown>;
  queuedAt: string;
  attempts: number;
};
const QUEUE_KEY = "dawn.offline.queue";
const MAX_ATTEMPTS = 5;
export function getQueue(): QueuedBall[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
export function enqueue(matchId: string, payload: Record<string, unknown>): QueuedBall {
  const item: QueuedBall = {
    id: "q-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
    matchId,
    payload,
    queuedAt: new Date().toISOString(),
    attempts: 0,
  };
  const q = getQueue();
  q.push(item);
  try {
    window.localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
  } catch {}
  return item;
}
export function removeFromQueue(id: string): void {
  const q = getQueue().filter((x) => x.id !== id);
  try {
    window.localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
  } catch {}
}
export function clearQueue(): void {
  try {
    window.localStorage.removeItem(QUEUE_KEY);
  } catch {}
}
export async function syncQueue(): Promise<{ synced: number; failed: number; remaining: number }> {
  const q = getQueue();
  if (q.length === 0) return { synced: 0, failed: 0, remaining: 0 };
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return { synced: 0, failed: 0, remaining: q.length };
  }
  let synced = 0;
  let failed = 0;
  for (const item of q) {
    try {
      const res = await fetch(`/api/v1/matches/${item.matchId}/ball`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item.payload),
      });
      if (res.ok) {
        removeFromQueue(item.id);
        synced++;
      } else {
        const next = { ...item, attempts: item.attempts + 1 };
        if (next.attempts >= MAX_ATTEMPTS) {
          removeFromQueue(item.id);
          failed++;
        } else {
          const updated = getQueue().map((x) => (x.id === item.id ? next : x));
          try { window.localStorage.setItem(QUEUE_KEY, JSON.stringify(updated)); } catch {}
        }
      }
    } catch {
      // Network error — keep in queue
    }
  }
  return { synced, failed, remaining: getQueue().length };
}
export function isOnline(): boolean {
  if (typeof navigator === "undefined") return true;
  return navigator.onLine;
}