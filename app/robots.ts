import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = "https://dawn-cricket-club-nsr.vercel.app";
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/", "/player", "/login", "/signup"] }],
    sitemap: base + "/sitemap.xml",
    host: base,
  };
}