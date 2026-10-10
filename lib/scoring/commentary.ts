export function generateBallCommentary(ball: any): string {
    if (ball.isWicket) {
        return `OUT! ${ball.batsman || "Batsman"} ${ball.wicketType || "dismissed"}`;
    }
    if (ball.isExtra) {
        if (ball.extraType === "wide") return "Wide ball";
        if (ball.extraType === "no-ball") return "No ball";
        if (ball.extraType === "bye") return `${ball.runs} bye(s)`;
        if (ball.extraType === "leg-bye") return `${ball.runs} leg bye(s)`;
    }
    if (ball.runs === 6) return "SIX! Massive hit!";
    if (ball.runs === 4) return "FOUR! Beautiful shot!";
    if (ball.runs === 0) return "Dot ball.";
    return `${ball.runs} run${ball.runs > 1 ? "s" : ""}`;
}
export function generateOverCommentary(balls: any[]): string {
    const runs = balls.reduce((sum, b) => sum + (b.runs || 0), 0);
    const wickets = balls.filter((b) => b.isWicket).length;
    if (wickets > 0) {
        return `Over complete: ${runs} runs, ${wickets} wicket(s)`;
    }
    return `Over complete: ${runs} runs`;
}
