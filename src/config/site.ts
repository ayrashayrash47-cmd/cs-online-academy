/**
 * Central config for CS Online Academy.
 *
 * Edit this file to change the site name, pricing, subjects, payment
 * details, or contact info WITHOUT touching any component code.
 *
 * User-facing copy (headings, sentences, testimonials, FAQ) lives in
 * src/i18n/en.ts and src/i18n/ur.ts instead, since that needs to exist
 * in two languages.
 */

export const siteConfig = {
  /** Change this in one place to rename the whole site. */
  name: "CS Online Academy",
  shortName: "CS Academy",
  poweredBy: "CS School System",

  // Used for SEO (canonical URL, sitemap, Open Graph). Update this the day
  // you point a custom domain at the site — nothing else needs to change.
  siteUrl: "https://cs-online-academy-production.up.railway.app",

  seoDescription:
    "Live online tutoring for Grade 9 & 10 Matric/SSC students in Pakistan. Affordable plans from Rs. 1,000/month, EasyPaisa payments, flexible scheduling with experienced teachers.",
  seoKeywords: [
    "online tuition Pakistan",
    "matric online classes",
    "SSC online tuition",
    "grade 9 online classes",
    "grade 10 online classes",
    "online math tuition Pakistan",
    "CS School System",
    "EasyPaisa tuition fee",
  ],

  contact: {
    displayPhone: "+92-340-6839806",
    // wa.me links need the number with country code, no spaces, no leading 0.
    whatsappNumber: "923406839806",
    email: "info@csonlineacademy.com", // TODO: replace with the real inbox before launch
  },

  social: {
    facebook: "", // TODO: add page URL
    instagram: "", // TODO: add profile URL
  },

  payment: {
    easypaisa: {
      number: "0340-6839806",
      accountName: "Arish Masih",
    },
    bank: {
      // TODO(owner): fill these in before promoting bank transfer as an option.
      bankName: "[BANK_NAME]",
      accountNumber: "[BANK_ACCOUNT_NUMBER]",
      iban: "[IBAN]",
    },
  },

  /** Subject catalog — id must match the keys used in i18n subjects.items */
  subjects: [
    { id: "mathematics", icon: "calculator" },
    { id: "physics", icon: "atom" },
    { id: "chemistry", icon: "flask" },
    { id: "biology", icon: "dna" },
    { id: "computerScience", icon: "cpu" },
    { id: "english", icon: "bookOpen" },
    { id: "urdu", icon: "languages" },
    { id: "pakistanStudies", icon: "landmark" },
  ] as const,

  /**
   * Pricing tiers. `id` must match keys used in i18n pricing.plans.
   * Amounts are in PKR. Update here and every page reflects it.
   */
  pricing: [
    {
      id: "math",
      priceRs: 1000,
      period: "month",
      highlight: false,
      subjectIds: ["mathematics"],
    },
    {
      id: "all",
      priceRs: 3000,
      period: "month",
      highlight: true,
      subjectIds: [
        "mathematics",
        "physics",
        "chemistry",
        "biology",
        "computerScience",
        "english",
        "urdu",
        "pakistanStudies",
      ],
    },
  ] as const,

  grades: ["9", "10"] as const,

  paymentMethods: ["easypaisa", "bank"] as const,

  enrollmentStatuses: ["pending", "verified", "rejected"] as const,

  upload: {
    maxSizeBytes: 5 * 1024 * 1024, // 5MB
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/heic"],
    // Files are stored alongside the database (see src/lib/paths.ts) and
    // served through the protected /api/uploads/[filename] route.
  },
} as const;

export type PlanId = (typeof siteConfig.pricing)[number]["id"];
export type SubjectId = (typeof siteConfig.subjects)[number]["id"];
export type Grade = (typeof siteConfig.grades)[number];
export type PaymentMethod = (typeof siteConfig.paymentMethods)[number];
export type EnrollmentStatus = (typeof siteConfig.enrollmentStatuses)[number];

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
