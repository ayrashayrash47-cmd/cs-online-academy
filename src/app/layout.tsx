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

export const metadata: Metadata = {
  title: `${siteConfig.name} — Ace Your Matric Exams Online`,
  description:
    "Live online tutoring for Grade 9 & 10 students. Affordable monthly plans, flexible scheduling, experienced Matric teachers.",
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
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
