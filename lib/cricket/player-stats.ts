export const calcBatAvg = (r: number, i: number, no: number) => (i-no)===0?r:r/(i-no);
export const calcSR = (r: number, b: number) => b===0?0:(r/b)*100;
export const calcBowlAvg = (r: number, w: number) => w===0?0:r/w;
export const calcEcon = (r: number, b: number) => b===0?0:(r/b)*6;
