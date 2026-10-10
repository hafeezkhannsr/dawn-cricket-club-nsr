export interface Match {
    id: string;
    teamA: string;
    teamB: string;
    format: string;
    overs: number;
    venue: string;
    date: string;
    status: "upcoming" | "live" | "completed" | "cancelled";
    createdBy: string;
    result?: string;
    createdAt: string;
}
