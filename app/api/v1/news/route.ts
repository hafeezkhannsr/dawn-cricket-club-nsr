import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
type Feed = { slug: string; label: string; url: string; category: string };
/**
 * Public RSS feeds — cricket news from multiple sources.
 * All items are attributed and linked back to the original source.
 */
const FEEDS: Feed[] = [
  { slug: "espncricinfo", label: "ESPNcricinfo", url: "https://www.espncricinfo.com/rss/content/story/feeds/0.xml", category: "international" },
  { slug: "cricbuzz",     label: "Cricbuzz",     url: "https://www.cricbuzz.com/rssfeeds/cricket-news.xml", category: "international" },
  { slug: "icc",          label: "ICC",          url: "https://www.icc-cricket.com/rss", category: "icc" },
  { slug: "bbc-cricket",  label: "BBC Cricket",  url: "https://feeds.bbci.co.uk/sport/cricket/rss.xml", category: "international" },
  { slug: "espn-cricket", label: "ESPN Cricket", url: "https://www.espn.com/espn/rss/cricket/news", category: "international" },
  { slug: "skysports",    label: "Sky Sports",   url: "https://www.skysports.com/rss/12040", category: "international" },
];
function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .trim();
}
function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
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
  sourceLabel: string;
  category: string;
};
async function fetchFeed(feed: Feed): Promise<RssItem[]> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(feed.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; DAWN-Cricket-Bot/1.0)",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
      },
      signal: controller.signal,
      next: { revalidate: 900 }, // 15 min cache
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const xml = await res.text();
    const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
    return itemBlocks.slice(0, 15).map((it) => ({
      title: pick(it, "title"),
      link: pickRaw(it, "link"),
      description: pick(it, "description").slice(0, 260),
      pubDate: pick(it, "pubDate"),
      source: feed.slug,
      sourceLabel: feed.label,
      category: feed.category,
    })).filter((x) => x.title && x.link);
  } catch {
    return [];
  }
}
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit")) || 24));
  const category = searchParams.get("category") || "";
  let feeds = FEEDS;
  if (category) feeds = feeds.filter((f) => f.category === category);
  const results = await Promise.all(feeds.map(fetchFeed));
  const all = results.flat();
  all.sort((a, b) => Date.parse(b.pubDate || "0") - Date.parse(a.pubDate || "0"));
  return NextResponse.json({
    ok: true,
    items: all.slice(0, limit),
    total: all.length,
    fetchedAt: new Date().toISOString(),
  });
}