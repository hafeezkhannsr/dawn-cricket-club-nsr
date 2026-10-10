import { readSheet } from "@/lib/sheets";
const CLUBS_SHEET = "Clubs";
export async function getAllClubs() {
    return await readSheet(CLUBS_SHEET);
}
export async function getClubById(id: string) {
    const clubs = await getAllClubs();
    return clubs.find((c: any) => c.ID === id);
}
export async function getUserClubs(userId: string) {
    const clubs = await getAllClubs();
    return clubs.filter((c: any) => c.OwnerId === userId);
}
