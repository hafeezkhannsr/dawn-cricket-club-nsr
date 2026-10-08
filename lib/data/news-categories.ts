export type NewsCategory = {
  slug: string;
  name: string;
  nameUr: string;
  description: string;
  accent: string;
  externalUrl?: string;
};

export const NEWS_CATEGORIES: NewsCategory[] = [
  { slug: "dawn", name: "DAWN Cricket Club", nameUr: "DAWN Cricket Club", description: "Official news from DAWN Cricket Club", accent: "#14a44d" },
  { slug: "dkk", name: "Dheri Katti Khel", nameUr: "Dheri Katti Khel", description: "Local cricket news", accent: "#f0b429" },
  { slug: "nowshera", name: "Nowshera", nameUr: "Nowshera", description: "Cricket news from Nowshera", accent: "#f0b429" },
  { slug: "kp", name: "Khyber Pakhtunkhwa", nameUr: "KP", description: "KP provincial cricket", accent: "#f0b429" },
  { slug: "pakistan", name: "Pakistan Cricket", nameUr: "Pakistan", description: "National team and domestic", accent: "#0f8a3e" },
  { slug: "pcb", name: "PCB Official", nameUr: "PCB", description: "PCB announcements", accent: "#0f8a3e", externalUrl: "https://www.pcb.com.pk/" },
  { slug: "psl", name: "PSL", nameUr: "PSL", description: "Pakistan Super League", accent: "#b01e1e", externalUrl: "https://www.psl-t20.com/" },
  { slug: "icc", name: "ICC", nameUr: "ICC", description: "International Cricket Council", accent: "#1f4e8c", externalUrl: "https://www.icc-cricket.com/" },
  { slug: "domestic", name: "Domestic Cricket", nameUr: "Domestic", description: "Pakistan domestic circuit", accent: "#f0b429" },
  { slug: "international", name: "International", nameUr: "International", description: "World cricket updates", accent: "#1f4e8c" },
  { slug: "women", name: "Women Cricket", nameUr: "Women", description: "Women cricket news", accent: "#e83e8c" },
  { slug: "youth", name: "Youth Cricket", nameUr: "Youth", description: "U13 to U19 talent", accent: "#f0b429" },
  { slug: "school", name: "School Cricket", nameUr: "School", description: "School-level cricket", accent: "#14a44d" },
  { slug: "academy", name: "Academy", nameUr: "Academy", description: "Academy programs", accent: "#14a44d" },
  { slug: "tournaments", name: "Tournaments", nameUr: "Tournaments", description: "Local tournaments", accent: "#f0b429" },
  { slug: "talent-hunt", name: "PCB Talent Hunt", nameUr: "Talent Hunt", description: "PCBTalent Hunt", accent: "#0f8a3e", externalUrl: "https://www.pcb.com.pk/" }
];

export function getCategory(slug: string): NewsCategory | undefined {
  return NEWS_CATEGORIES.find((c) => c.slug === slug);
}
