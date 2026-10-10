export interface Match {
    id: string;
    teamA: string;
    teamB: string;
    teamALogo?: string;
    teamBLogo?: string;
    format: "T20" | "ODI" | "Test" | "T10" | "Custom";
    overs: number;
    venue: string;
    date: string;
    time?: string;
    status: "upcoming" | "live" | "completed" | "cancelled";
    tossWinner?: string;
    tossDecision?: "bat" | "bowl";
    createdBy: string;
    clubId?: string;
    tournamentId?: string;
    result?: {
        winner: string;
        margin: string;
        description: string;
    };
    createdAt: string;
}
