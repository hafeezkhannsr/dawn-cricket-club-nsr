import { NextResponse } from 'next/server';
export async function GET() { return NextResponse.json({ ok: true, status: 'healthy', uptime: process.uptime() }); }
