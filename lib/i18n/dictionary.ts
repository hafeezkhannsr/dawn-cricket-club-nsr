export type Lang = "en" | "ur";
export const DEFAULT_LANG: Lang = "en";
export const DICT: Record<string, { en: string; ur: string }> = {
  // Navbar
  "nav.home": { en: "Home", ur: "ہوم" },
  "nav.players": { en: "Players", ur: "کھلاڑی" },
  "nav.register": { en: "Register", ur: "رجسٹر" },
  "nav.status": { en: "Status", ur: "حالت" },
  "nav.verify": { en: "Verify", ur: "تصدیق" },
  "nav.news": { en: "News", ur: "خبریں" },
  "nav.stats": { en: "Stats", ur: "اعدادوشمار" },
  "nav.rules": { en: "Rules", ur: "قوانین" },
  "nav.about": { en: "About", ur: "تعارف" },
  "nav.faq": { en: "FAQ", ur: "سوالات" },
  "nav.contact": { en: "Contact", ur: "رابطہ" },
  "nav.login": { en: "Login", ur: "لاگ ان" },
  "nav.admin": { en: "Admin", ur: "ایڈمن" },
  // Home hero
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
  "common.filters": { en: "Filters", ur: "فلٹرز" },
  "common.all": { en: "All", ur: "تمام" },
  "common.view": { en: "View", ur: "دیکھیں" },
  "common.refresh": { en: "Refresh", ur: "تازہ کریں" },
  // Footer
  "footer.rights": { en: "All rights reserved.", ur: "جملہ حقوق محفوظ ہیں۔" },
  "footer.tagline": { en: "Building Future Champions", ur: "مستقبل کے چیمپئنز کی تعمیر" },
};
export function t(key: string, lang: Lang): string {
  const entry = DICT[key];
  if (!entry) return key;
  return entry[lang] || entry.en;
}