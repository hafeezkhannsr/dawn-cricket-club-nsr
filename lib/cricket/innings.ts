export interface Innings { runs: number; wickets: number; balls: number; batting: any[]; bowling: any[]; extras: any; }
export const emptyInnings = (): Innings => ({ runs:0, wickets:0, balls:0, batting:[], bowling:[], extras:{wides:0,noBalls:0,byes:0,legByes:0} });
