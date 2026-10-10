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
    wicketType?: string;
    isExtra: boolean;
    extraType?: "wide" | "no-ball" | "bye" | "leg-bye";
    isBoundary?: boolean;
    commentary?: string;
    timestamp: string;
}
export interface Innings {
    matchId: string;
    inningsNumber: number;
    battingTeam: string;
    bowlingTeam: string;
    runs: number;
    wickets: number;
    overs: number;
    balls: number;
    extras: { wides: number; noBalls: number; byes: number; legByes: number };
    batting: BattingStats[];
    bowling: BowlingStats[];
    fallOfWickets: { wicket: number; runs: number; overs: string; batsman: string }[];
}
export interface BattingStats {
    playerId: string;
    playerName: string;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    strikeRate: number;
    isOut: boolean;
    howOut?: string;
}
export interface BowlingStats {
    playerId: string;
    playerName: string;
    overs: number;
    maidens: number;
    runs: number;
    wickets: number;
    economy: number;
    wides: number;
    noBalls: number;
}
