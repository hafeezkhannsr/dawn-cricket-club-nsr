export interface Tournament {
    id: string;
    name: string;
    logo?: string;
    type: "league" | "knockout" | "mixed";
    format: "T20" | "ODI" | "Test" | "T10";
    startDate: string;
    endDate: string;
    venue: string;
    teams: string[];
    matches: string[];
    pointsTable?: PointsTableEntry[];
    status: "upcoming" | "live" | "completed";
    winner?: string;
    createdBy: string;
    createdAt: string;
}
export interface PointsTableEntry {
    team: string;
    played: number;
    won: number;
    lost: number;
    tied: number;
    noResult: number;
    points: number;
    nrr: number;
}
