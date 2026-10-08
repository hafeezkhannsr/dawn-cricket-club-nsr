export type QA = {
  id: string;
  keywords: string[];
  question: { en: string; ur: string };
  answer: { en: string; ur: string };
  action?: { label: string; href: string };
  category: "registration" | "match" | "verify" | "pay" | "club" | "general";
};
export const QA_BANK: QA[] = [
  {
    id: "reg-how",
    keywords: ["register", "registration", "how to register", "signup", "sign up", "رجسٹر", "رجسٹریشن"],
    question: { en: "How do I register a player?", ur: "کھلاڑی کی رجسٹریشن کیسے کروں؟" },
    answer: {
      en: "Click 'Register' in the top menu, complete the 9-step form (program, personal, contact, identity, address, cricket, education, guardian, payment), then submit. You'll receive a registration number and QR code.",
      ur: "اوپر مینو میں 'Register' پر کلک کریں، 9 مراحل کا فارم مکمل کریں (پروگرام، ذاتی، رابطہ، شناخت، پتہ، کرکٹ، تعلیم، سرپرست، ادائیگی)، پھر جمع کریں۔ آپ کو رجسٹریشن نمبر اور QR کوڈ مل جائے گا۔",
    },
    action: { label: "Open Registration", href: "/register" },
    category: "registration",
  },
  {
    id: "reg-status",
    keywords: ["status", "check", "where is my", "application", "سٹیٹس", "حالت"],
    question: { en: "How can I check my registration status?", ur: "رجسٹریشن کی حالت کیسے دیکھوں؟" },
    answer: {
      en: "Go to 'Status' in the top menu. Enter your registration number or mobile number to see the current status of your application.",
      ur: "'Status' صفحے پر جائیں۔ اپنا رجسٹریشن نمبر یا موبائل نمبر درج کریں اور درخواست کی موجودہ حالت دیکھیں۔",
    },
    action: { label: "Check Status", href: "/register?status=check" },
    category: "registration",
  },
  {
    id: "fee-dawn",
    keywords: ["fee", "fees", "amount", "price", "cost", "فیس", "رقم", "قیمت"],
    question: { en: "What is the registration fee?", ur: "رجسٹریشن فیس کتنی ہے؟" },
    answer: {
      en: "DAWN Player Registration: PKR 3,000. DAWN Membership: PKR 5,000. DSL Registration: PKR 100 per edition.",
      ur: "ڈان پلیئر رجسٹریشن: 3,000 روپے۔ ڈان ممبرشپ: 5,000 روپے۔ ڈی ایس ایل رجسٹریشن: 100 روپے فی ایڈیشن۔",
    },
    category: "pay",
  },
  {
    id: "payment-methods",
    keywords: ["payment", "pay", "jazzcash", "easypaisa", "bank", "transfer", "ادائیگی", "بینک"],
    question: { en: "How do I pay the fee?", ur: "فیس کیسے ادا کروں؟" },
    answer: {
      en: "Submit your registration first. After admin review, you'll receive bank/wallet details on your registered mobile. Accepted methods: Bank Transfer, JazzCash, EasyPaisa, or Cash (in-person).",
      ur: "پہلے رجسٹریشن جمع کریں۔ ایڈمن کی منظوری کے بعد آپ کو بینک/والٹ کی تفصیلات رجسٹرڈ موبائل پر ملیں گی۔ قابل قبول طریقے: بینک ٹرانسفر، جاز کیش، ایزی پیسہ، یا نقد (ذاتی طور پر)۔",
    },
    category: "pay",
  },
  {
    id: "verify",
    keywords: ["verify", "verification", "qr", "player card", "تصدیق", "کیو آر"],
    question: { en: "How do I verify a player?", ur: "کھلاڑی کی تصدیق کیسے کروں؟" },
    answer: {
      en: "Scan the QR code on the player's digital card, or visit the Verify page and enter their registration number. You'll see their verified public profile.",
      ur: "کھلاڑی کے ڈیجیٹل کارڈ پر QR کوڈ اسکین کریں، یا تصدیق کے صفحے پر جا کر رجسٹریشن نمبر درج کریں۔ آپ کو ان کی تصدیق شدہ عوامی پروفائل نظر آئے گی۔",
    },
    action: { label: "Verify Player", href: "/verify" },
    category: "verify",
  },
  {
    id: "age-cat",
    keywords: ["age", "category", "u13", "u15", "u17", "u19", "under", "عمر", "کیٹیگری"],
    question: { en: "What age categories are available?", ur: "عمر کی کٹیگریز کون سی ہیں؟" },
    answer: {
      en: "U13, U15, U17, U19, Emerging Player, Senior Player and Veteran. Age is calculated from your date of birth — the system will suggest the right category automatically.",
      ur: "انڈر 13، انڈر 15، انڈر 17، انڈر 19، ابھرتے ہوئے کھلاڑی، سینئر پلیئر اور ویٹرن۔ عمر آپ کی تاریخ پیدائش سے حساب ہوتی ہے — سسٹم خود بخود صحیح کٹیگری تجویز کرے گا۔",
    },
    category: "registration",
  },
  {
    id: "ball-type",
    keywords: ["hard ball", "tennis ball", "ball type", "بال", "ہارڈ بال"],
    question: { en: "Hard Ball vs Tennis Ball?", ur: "ہارڈ بال اور ٹینس بال میں فرق؟" },
    answer: {
      en: "Hard Ball (leather, professional standard) is used in formal matches. Tennis Ball (tape / soft) is used in local and friendly matches.",
      ur: "ہارڈ بال (چمڑے والی، پروفیشنل) باقاعدہ میچوں میں استعمال ہوتی ہے۔ ٹینس بال (ٹیپ / نرم) مقامی اور دوستانہ میچوں میں استعمال ہوتی ہے۔",
    },
    category: "registration",
  },
  {
    id: "dsl-edition",
    keywords: ["dsl", "edition", "سال", "ایڈیشن"],
    question: { en: "Which DSL edition can I register for?", ur: "میں کون سے ڈی ایس ایل ایڈیشن کے لیے رجسٹر کر سکتا ہوں؟" },
    answer: {
      en: "Only the current open edition accepts new registrations. Right now, Edition 7 (2027) is open. Later editions unlock automatically in their year (Edition 8 in 2028, etc.).",
      ur: "صرف موجودہ کھلا ایڈیشن نئی رجسٹریشن قبول کرتا ہے۔ اس وقت ایڈیشن 7 (2027) کھلا ہے۔ آگے کے ایڈیشن اپنے سال میں خود بخود کھل جائیں گے (ایڈیشن 8 سن 2028 میں وغیرہ)۔",
    },
    category: "registration",
  },
  {
    id: "match-live",
    keywords: ["live", "match", "score", "scoreboard", "میچ", "اسکور"],
    question: { en: "Where can I see live match scores?", ur: "لائیو میچ اسکور کہاں دیکھ سکتا ہوں؟" },
    answer: {
      en: "Open the Scoreboard page from the top menu, or ask the scorer for the direct link. Matches update live every 5 seconds.",
      ur: "اوپر مینو سے اسکور بورڈ کا صفحہ کھولیں، یا اسکورر سے براہِ راست لنک لیں۔ میچ ہر 5 سیکنڈ بعد لائیو اپ ڈیٹ ہوتے ہیں۔",
    },
    action: { label: "Scorer Console", href: "/scorer" },
    category: "match",
  },
  {
    id: "club-about",
    keywords: ["about", "club", "dawn", "dkk", "کلب", "ڈان"],
    question: { en: "About DAWN Cricket Club?", ur: "ڈان کرکٹ کلب کے بارے میں؟" },
    answer: {
      en: "DAWN Cricket Club (DKK) is based in Dheri Katti Khel, Nowshera, Khyber Pakhtunkhwa, Pakistan. We promote cricket, develop young talent, and provide a professional platform for players across the region.",
      ur: "ڈان کرکٹ کلب (ڈی کے کے) کا مرکز ڈھیری کٹی خیل، نوشہرہ، خیبر پختونخوا، پاکستان ہے۔ ہم کرکٹ کو فروغ دیتے ہیں، نوجوان ٹیلنٹ کو ترقی دیتے ہیں، اور خطے کے کھلاڑیوں کو پروفیشنل پلیٹ فارم فراہم کرتے ہیں۔",
    },
    action: { label: "About DAWN", href: "/about" },
    category: "club",
  },
  {
    id: "contact",
    keywords: ["contact", "phone", "email", "whatsapp", "رابطہ", "فون"],
    question: { en: "How can I contact DAWN?", ur: "ڈان سے رابطہ کیسے کروں؟" },
    answer: {
      en: "Visit our Contact page or message us on WhatsApp. You can also follow us on Facebook for updates.",
      ur: "ہمارے رابطہ کے صفحے پر جائیں یا واٹس ایپ پر پیغام بھیجیں۔ آپ اپ ڈیٹس کے لیے فیس بک پر بھی فالو کر سکتے ہیں۔",
    },
    action: { label: "Contact", href: "/contact" },
    category: "general",
  },
  {
    id: "news",
    keywords: ["news", "update", "pcb", "icc", "psl", "خبریں", "اپ ڈیٹ"],
    question: { en: "Where do I find cricket news?", ur: "کرکٹ کی خبریں کہاں ملیں گی؟" },
    answer: {
      en: "Visit the News Hub for DAWN, PCB, ICC, PSL and international cricket categories. Live feeds aggregate from public sources with attribution.",
      ur: "نیوز ہب پر ڈان، پی سی بی، آئی سی سی، پی ایس ایل اور بین الاقوامی کرکٹ کی کیٹیگریز دیکھیں۔ لائیو فیڈز عوامی ذرائع سے attribution کے ساتھ شامل کی جاتی ہیں۔",
    },
    action: { label: "News Hub", href: "/news" },
    category: "general",
  },
  {
    id: "rules",
    keywords: ["rules", "law", "regulation", "قوانین", "ضابطہ"],
    question: { en: "Where are the cricket rules?", ur: "کرکٹ کے قوانین کہاں ہیں؟" },
    answer: {
      en: "Visit the Rules page for MCC Laws, ICC playing conditions, PCB domestic rules and DAWN club rules — all linked to their original sources.",
      ur: "قوانین کے صفحے پر جائیں جہاں ایم سی سی قوانین، آئی سی سی پلیئنگ کنڈیشنز، پی سی بی ڈومیسٹک رولز اور ڈان کلب رولز موجود ہیں — سب اصلی ذرائع سے منسلک ہیں۔",
    },
    action: { label: "Rules", href: "/rules" },
    category: "general",
  },
];
export type MatchResult = { qa: QA; score: number };
export function searchQA(query: string, lang: "en" | "ur" = "en"): MatchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const results: MatchResult[] = [];
  for (const qa of QA_BANK) {
    let score = 0;
    for (const kw of qa.keywords) {
      const k = kw.toLowerCase();
      if (q.includes(k)) score += 10;
      for (const tok of tokens) {
        if (tok.length < 3) continue;
        if (k.includes(tok) || tok.includes(k)) score += 3;
      }
    }
    if (score > 0) results.push({ qa, score });
  }
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 3);
}
export function greeting(lang: "en" | "ur" = "en"): string {
  return lang === "ur"
    ? "السلام علیکم! میں ڈان اسسٹنٹ ہوں۔ رجسٹریشن، میچ، تصدیق یا کلب کے بارے میں کچھ بھی پوچھیں۔"
    : "Assalam-o-Alaikum! I'm the DAWN Assistant. Ask me anything about registration, matches, verification or the club.";
}
export const QUICK_QUESTIONS = [
  { en: "How do I register?", ur: "رجسٹریشن کیسے کروں؟" },
  { en: "What is the fee?", ur: "فیس کتنی ہے؟" },
  { en: "How to verify a player?", ur: "تصدیق کیسے کروں؟" },
  { en: "Which DSL edition is open?", ur: "کون سا ایڈیشن کھلا ہے؟" },
  { en: "Live match scores?", ur: "لائیو اسکور؟" },
  { en: "Contact DAWN", ur: "ڈان سے رابطہ" },
];