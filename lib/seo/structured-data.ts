const BASE = "https://dawn-cricket-club-nsr.vercel.app";
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "DAWN Cricket Club",
    alternateName: "DKK",
    url: BASE,
    logo: BASE + "/icon-512.svg",
    description: "Digital cricket ecosystem for DAWN Cricket Club, Dheri Katti Khel, Nowshera, Khyber Pakhtunkhwa, Pakistan.",
    sport: "Cricket",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hakeemabad, Dheri Katti Khel",
      addressLocality: "Nowshera",
      addressRegion: "Khyber Pakhtunkhwa",
      addressCountry: "PK",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+92-300-000-0000",
        contactType: "customer service",
        availableLanguage: ["en", "ur", "ps"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/",
      "https://www.youtube.com/",
      "https://x.com/",
    ],
  };
}
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DAWN Cricket Club",
    url: BASE,
    potentialAction: {
      "@type": "SearchAction",
      target: BASE + "/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: BASE + it.url,
    })),
  };
}
export function sportsEventSchema(input: {
  name: string;
  startDate: string;
  location: string;
  teams: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: input.name,
    startDate: input.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: input.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nowshera",
        addressRegion: "Khyber Pakhtunkhwa",
        addressCountry: "PK",
      },
    },
    competitor: input.teams.map((t) => ({ "@type": "SportsTeam", name: t })),
    sport: "Cricket",
  };
}
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}