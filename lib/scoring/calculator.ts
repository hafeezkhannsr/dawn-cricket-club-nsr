export function calculateRunRate(runs: number, balls: number): number {
    if (balls === 0) return 0;
    return (runs / balls) * 6;
}
export function formatOvers(balls: number): string {
    return Math.floor(balls / 6) + "." + (balls % 6);
}
export function calculateStrikeRate(runs: number, balls: number): number {
    if (balls === 0) return 0;
    return (runs / balls) * 100;
}
