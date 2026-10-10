export interface Ball {
    id: string;
    matchId: string;
    innings: number;
    over: number;
    ballNumber: number;
    batsman: string;
    bowler: string;
    runs: number;
    isWicket: boolean;
    isExtra: boolean;
    extraType?: string;
    commentary?: string;
    timestamp: string;
}
