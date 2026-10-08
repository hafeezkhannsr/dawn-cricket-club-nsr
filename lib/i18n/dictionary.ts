export type Lang = "en" | "ur";
export const DEFAULT_LANG: Lang = "en";
export const DICT: Record<string, { en: string; ur: string }> = {
  // Navigation
  "nav.home": { en: "Home", ur: "ہوم" },
  "nav.players": { en: "Players", ur: "کھلاڑی" },
  "nav.register": { en: "Register", ur: "رجسٹر" },
  "nav.verify": { en: "Verify", ur: "تصدیق" },
  "nav.news": { en: "News", ur: "خبریں" },
  "nav.notices": { en: "Notices", ur: "نوٹس" },
  "nav.stats": { en: "Stats", ur: "اعدادوشمار" },
  "nav.rules": { en: "Rules", ur: "قوانین" },
  "nav.about": { en: "About", ur: "تعارف" },
  "nav.contact": { en: "Contact", ur: "رابطہ" },
  "nav.admin": { en: "Admin", ur: "ایڈمن" },
  "nav.login": { en: "Login", ur: "لاگ ان" },
  "nav.academy": { en: "Academy", ur: "اکیڈمی" },
  "nav.matchCentral": { en: "Match Central", ur: "میچ سینٹرل" },
  "nav.pcbTalent": { en: "PCB Talent Hunt", ur: "پی سی بی ٹیلنٹ ہنٹ" },
  // Hero
  "home.eyebrow": { en: "Discipline · Skills · Teamwork", ur: "نظم و ضبط · مہارت · ٹیم ورک" },
  "home.tagline": { en: "Building Future Champions", ur: "مستقبل کے چیمپئنز کی تعمیر" },
  "home.desc": {
    en: "DAWN Cricket Club (DKK) is committed to promoting cricket, developing talent and providing a professional platform for young players in Nowshera and beyond.",
    ur: "ڈان کرکٹ کلب (ڈی کے کے) کرکٹ کے فروغ، ٹیلنٹ کی ترقی اور نوشہرہ اور اس سے آگے کے نوجوان کھلاڑیوں کو پروفیشنل پلیٹ فارم فراہم کرنے کے لیے پرعزم ہے۔",
  },
  "home.cta.register": { en: "Register Now", ur: "ابھی رجسٹر کریں" },
  "home.cta.status": { en: "Check Status", ur: "حالت دیکھیں" },
  "home.location": { en: "Hakeemabad, Nowshera", ur: "حکیم آباد، نوشہرہ" },
  "home.location.sub": { en: "Khyber Pakhtunkhwa, Pakistan", ur: "خیبر پختونخوا، پاکستان" },
  // Common
  "common.loading": { en: "Loading…", ur: "لوڈ ہو رہا ہے…" },
  "common.submit": { en: "Submit", ur: "جمع کریں" },
  "common.cancel": { en: "Cancel", ur: "منسوخ" },
  "common.next": { en: "Next", ur: "اگلا" },
  "common.back": { en: "Back", ur: "واپس" },
  "common.search": { en: "Search", ur: "تلاش" },
  "common.viewAll": { en: "View all", ur: "سب دیکھیں" },
  "common.readMore": { en: "Read more", ur: "مزید پڑھیں" },
  "common.live": { en: "LIVE", ur: "لائیو" },
  "common.upcoming": { en: "Upcoming", ur: "آنے والے" },
  "common.completed": { en: "Completed", ur: "مکمل" },
  "common.all": { en: "All", ur: "تمام" },
  // Sections
  "section.liveMatchCenter": { en: "Live Match Center", ur: "لائیو میچ سینٹر" },
  "section.explore": { en: "Explore", ur: "دریافت کریں" },
  "section.liveRightNow": { en: "Live Right Now", ur: "ابھی لائیو" },
  "section.realTimeUpdates": { en: "Real-time Updates", ur: "حقیقی وقت کی تازہ کاری" },
  "section.noMatchesYet": { en: "No matches yet", ur: "ابھی کوئی میچ نہیں" },
  "section.createFirstMatch": { en: "Create your first match in the Scorer Console", ur: "اسکورر کنسول میں اپنا پہلا میچ بنائیں" },
  "section.openScorerConsole": { en: "Open Scorer Console", ur: "اسکورر کنسول کھولیں" },
  "section.noLiveMatches": { en: "No live matches right now", ur: "ابھی کوئی لائیو میچ نہیں" },
  // Buttons
  "btn.register": { en: "Register", ur: "رجسٹر" },
  "btn.follow": { en: "Follow", ur: "فالو" },
  "btn.following": { en: "Following", ur: "فالو کر رہے" },
  "btn.bookNow": { en: "Book Now", ur: "ابھی بک کریں" },
  // Footer
  "footer.rights": { en: "All rights reserved.", ur: "جملہ حقوق محفوظ ہیں۔" },
  "footer.tagline": { en: "Building Future Champions", ur: "مستقبل کے چیمپئنز کی تعمیر" },
  "footer.matchCentral": { en: "Match Central", ur: "میچ سینٹرل" },
  "footer.club": { en: "Club", ur: "کلب" },
  "footer.register": { en: "Register", ur: "رجسٹر" },
  "footer.resources": { en: "Resources", ur: "ذرائع" },
};
export function t(key: string, lang: Lang): string {
  const entry = DICT[key];
  if (!entry) return key;
  return entry[lang] || entry.en;
}