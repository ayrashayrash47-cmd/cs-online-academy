import type { Metadata } from "next";
import { Inter, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { siteConfig } from "@/config/site";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const urduFont = Noto_Nastaliq_Urdu({
  variable: "--font-urdu",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const title = `${siteConfig.name} — Ace Your Matric Exams Online`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seoDescription,
  keywords: [...siteConfig.seoKeywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.poweredBy }],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "osyTpwAhJtoNQ0u4sVjLjNuevBGWtaQcVZdCXwpvGWA",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    title,
    description: siteConfig.seoDescription,
    locale: "en_PK",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.poweredBy}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.seoDescription,
    images: ["/og-image.png"],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${urduFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: siteConfig.name,
              url: siteConfig.siteUrl,
              logo: `${siteConfig.siteUrl}/apple-icon.png`,
              description: siteConfig.seoDescription,
              parentOrganization: siteConfig.poweredBy,
              telephone: siteConfig.contact.displayPhone,
              email: siteConfig.contact.email,
              areaServed: "PK",
              address: {
                "@type": "PostalAddress",
                addressCountry: "PK",
              },
              offers: siteConfig.pricing.map((tier) => ({
                "@type": "Offer",
                name: tier.id === "math" ? "Math Only Plan" : "All Subjects Bundle",
                price: tier.priceRs,
                priceCurrency: "PKR",
                availability: "https://schema.org/InStock",
                url: `${siteConfig.siteUrl}/#pricing`,
              })),
            }),
          }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
