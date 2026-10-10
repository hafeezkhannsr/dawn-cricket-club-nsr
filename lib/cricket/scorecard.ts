export const buildScorecard = (i: any) => ({ totalRuns: i.runs, totalWickets: i.wickets, overs: i.overs, batting: i.batting||[], bowling: i.bowling||[], extras: i.extras||{}, fow: i.fow||[] });
