export type WicketType = 'bowled'|'caught'|'lbw'|'run-out'|'stumped'|'hit-wicket';
export const isValidWicket = (t: string): t is WicketType => ['bowled','caught','lbw','run-out','stumped','hit-wicket'].includes(t);
export const creditsBowler = (t: WicketType) => t !== 'run-out';
