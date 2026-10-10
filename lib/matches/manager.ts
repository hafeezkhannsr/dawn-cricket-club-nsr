import { readSheet } from "@/lib/sheets";
const MATCHES_SHEET = "Matches";
export async function getAllMatches() {
    return await readSheet(MATCHES_SHEET);
}
export async function getLiveMatches() {
    const matches = await getAllMatches();
    return matches.filter((m: any) => m.Status === "live");
}
export async function getUpcomingMatches() {
    const matches = await getAllMatches();
    return matches.filter((m: any) => m.Status === "upcoming");
}
export async function getCompletedMatches() {
    const matches = await getAllMatches();
    return matches.filter((m: any) => m.Status === "completed");
}
export async function getUserMatches(userId: string) {
    const matches = await getAllMatches();
    return matches.filter((m: any) => m.CreatedBy === userId);
}
