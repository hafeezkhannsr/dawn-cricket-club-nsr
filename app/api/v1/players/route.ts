import { NextResponse } from 'next/server';
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
export async function GET() {
    try {
        if (!SHEET_ID) {
            return NextResponse.json({ ok: false, message: 'Sheet not configured' }, { status: 500 });
        }
        const url = https://sheets.googleapis.com/v4/spreadsheets/\/values/Players?key=\;
        const res = await fetch(url);
        const data = await res.json();
        return NextResponse.json({ ok: true, players: data.values || [] });
    } catch (error) {
        return NextResponse.json({ ok: false, message: 'Failed to fetch players' }, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const body = await request.json();
        return NextResponse.json({ ok: true, message: 'Player registered', data: body });
    } catch (error) {
        return NextResponse.json({ ok: false, message: 'Registration failed' }, { status: 500 });
    }
}
