export type ExtraType = 'wide'|'no-ball'|'bye'|'leg-bye';
export function processExtra(type: ExtraType, runs=0) { const base: any = { wide:1,'no-ball':1, bye:0,'leg-bye':0 }; return { runs: base[type]+runs, countsAsBall: type==='bye'||type==='leg-bye', extraType: type }; }
