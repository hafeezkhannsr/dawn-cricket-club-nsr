export const calcRunRate = (r: number, b: number) => b===0?0:(r/b)*6;
export const formatOvers = (b: number) => Math.floor(b/6)+'.'+(b%6);
export const calcRequiredRR = (t: number, r: number, bl: number) => bl===0?Infinity:((t-r)/bl)*6;
