export interface Partnership { batsman1: string; batsman2: string; runs: number; balls: number; }
export const calcPartnership = (runs: number[], balls: number): Partnership => ({ batsman1:'', batsman2:'', runs: runs.reduce((a,b)=>a+b,0), balls });
