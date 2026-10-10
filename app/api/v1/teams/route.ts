import { NextResponse } from 'next/server';
export async function GET() { return NextResponse.json({ ok: true, teams: [] }); }
export async function POST(request: Request) { const b = await request.json(); return NextResponse.json({ ok: true, data: b }); }
