// Run rate calculator
export function calculateRunRate(runs: number, balls: number): number {
    if (balls === 0) return 0;
    return (runs / balls) * 6;
}
// Required run rate
export function calculateRequiredRunRate(
    target: number,
    currentRuns: number,
    ballsLeft: number
): number {
    if (ballsLeft === 0) return 0;
    return ((target - currentRuns) / ballsLeft) * 6;
}
// Overs format
export function formatOvers(balls: number): string {
    return `${Math.floor(balls / 6)}.${balls % 6}`;
}
// Overs to balls
export function oversToBalls(overs: number): number {
    return Math.floor(overs) * 6 + Math.round((overs % 1) * 10);
}
// Economy rate
export function calculateEconomy(runs: number, balls: number): number {
    if (balls === 0) return 0;
    return (runs / balls) * 6;
}
// Strike rate
export function calculateStrikeRate(runs: number, balls: number): number {
    if (balls === 0) return 0;
    return (runs / balls) * 100;
}
// Batting average
export function calculateBattingAverage(
    runs: number,
    innings: number,
    notOuts: number
): number {
    const dismissals = innings - notOuts;
    if (dismissals === 0) return runs;
    return runs / dismissals;
}
// Bowling average
export function calculateBowlingAverage(
    runs: number,
    wickets: number
): number {
    if (wickets === 0) return 0;
    return runs / wickets;
}
