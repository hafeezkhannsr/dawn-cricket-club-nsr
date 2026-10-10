import { readSheet } from "@/lib/sheets";
const TOURNAMENTS_SHEET = "Tournaments";
export async function getAllTournaments() {
    return await readSheet(TOURNAMENTS_SHEET);
}
export async function getTournamentById(id: string) {
    const tournaments = await getAllTournaments();
    return tournaments.find((t: any) => t.ID === id);
}
export function calculatePointsTable(matches: any[]): any[] {
    const table: any = {};
    matches.forEach((match) => {
        if (match.Status !== "completed") return;
        const teamA = match.TeamA;
        const teamB = match.TeamB;
        if (!table[teamA]) table[teamA] = { team: teamA, played: 0, won: 0, lost: 0, tied: 0, points: 0 };
        if (!table[teamB]) table[teamB] = { team: teamB, played: 0, won: 0, lost: 0, tied: 0, points: 0 };
        table[teamA].played++;
        table[teamB].played++;
        if (match.Result && match.Result.includes(teamA)) {
            table[teamA].won++;
            table[teamA].points += 2;
            table[teamB].lost++;
        } else if (match.Result && match.Result.includes(teamB)) {
            table[teamB].won++;
            table[teamB].points += 2;
            table[teamA].lost++;
        } else {
            table[teamA].tied++;
            table[teamB].tied++;
            table[teamA].points += 1;
            table[teamB].points += 1;
        }
    });
    return Object.values(table).sort((a: any, b: any) => b.points - a.points);
}
