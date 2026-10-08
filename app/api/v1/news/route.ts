import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
type Feed = { slug: string; url: string };
/**
 * Public RSS feeds only. We fetch, parse minimal <item> data,
 * and always retain attribution + original link.
 * Feeds can change without notice; failures fall back gracefully.
 */
const FEEDS: Feed[] = [
  { slug: "espncricinfo", url: "https://www.espncricinfo.com/rss/content/story/feeds/0.xml" },
  { slug: "cricbuzz",     url: "https://www.cricbuzz.com/rssfeeds/cricket-news.xml" },
];
function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .trim();
}
function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, "").trim();
}
function pick(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = xml.match(re);
  return m ? decodeEntities(stripTags(m[1])) : "";
}
function pickRaw(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = xml.match(re);
  return m ? decodeEntities(m[1]).trim() : "";
}
export type RssItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
};
async function fetchFeed(feed: Feed): Promise<RssItem[]> {
  try {
    const res = await fetch(feed.url, {
      headers: { "User-Agent": "DAWN-Cricket-NewsBot/1.0" },
      next: { revalidate: 900 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
    return itemBlocks.slice(0, 12).map((it) => ({
      title: pick(it, "title"),
      link: pickRaw(it, "link"),
      description: pick(it, "description").slice(0, 240),
      pubDate: pick(it, "pubDate"),
      source: feed.slug,
    })).filter((x) => x.title && x.link);
  } catch {
    return [];
  }
}
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(30, Math.max(1, Number(searchParams.get("limit")) || 15));
  const all = (await Promise.all(FEEDS.map(fetchFeed))).flat();
  all.sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate));
  return NextResponse.json({
    ok: true,
    items: all.slice(0, limit),
    fetchedAt: new Date().toISOString(),
  });
}