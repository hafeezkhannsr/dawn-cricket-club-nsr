import { NextRequest, NextResponse } from "next/server";
import { getFile } from "@/lib/server/file-store";
export const dynamic = "force-dynamic";
export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const f = await getFile(id);
  if (!f) return NextResponse.json({ ok: false }, { status: 404 });
  const parts = f.dataUrl.split(",");
  const base64 = parts[1] ?? "";
  const meta = parts[0] || "";
  const m = meta.match(/data:([^;]+);base64/);
  const mime = m ? m[1] : f.type;
  const buf = Buffer.from(base64, "base64");
  return new NextResponse(buf, {
    headers: {
      "Content-Type": mime,
      "Content-Disposition": 'inline; filename="' + f.name + '"',
      "Cache-Control": "private, max-age=3600",
    },
  });
}