import { NextResponse } from 'next/server';
export async function GET() { return NextResponse.json({ ok: true, stats: { players: 0, teams: 0, matches: 0 } }); }
