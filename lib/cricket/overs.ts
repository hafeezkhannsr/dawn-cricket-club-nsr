export const ballsToOvers = (b: number) => Math.floor(b/6)+'.'+(b%6);
export const oversToBalls = (o: number) => Math.floor(o)*6+Math.round((o%1)*10);
export const isMaiden = (balls: any[]) => balls.every((b:any)=>b.runs===0&&!b.isExtra);
