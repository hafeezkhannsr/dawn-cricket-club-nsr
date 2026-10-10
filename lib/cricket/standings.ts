export interface Standing { team: string; played: number; won: number; lost: number; tied: number; points: number; nrr: number; }
export const calcPoints = (w: number, t: number, nr=0) => w*2+t*1+nr*1;
export const calcNRR = (rf: number, of: number, ra: number, oa: number) => (of>0?rf/of:0)-(oa>0?ra/oa:0);
