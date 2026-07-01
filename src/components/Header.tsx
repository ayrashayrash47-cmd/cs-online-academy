"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { siteConfig } from "@/config/site";

export function Header() {
  const { t, locale, toggleLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#subjects", label: t.nav.subjects },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#how-it-works", label: t.nav.howItWorks },
    { href: "#faq", label: t.nav.faq },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? "bg-charcoal/95 shadow-lg backdrop-blur" : "bg-charcoal"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold bg-charcoal-2">
            <GraduationCap className="h-5 w-5 text-gold" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold text-white sm:text-lg">
              {siteConfig.name}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wide text-gold-light">
              {siteConfig.poweredBy}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleLocale}
            className="force-ltr rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/90 transition-colors hover:border-gold hover:text-gold"
            aria-label="Toggle language"
          >
            {locale === "en" ? "اردو" : "English"}
          </button>
          <a
            href="#pricing"
            className="hidden rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-dark sm:inline-block"
          >
            {t.nav.enrollNow}
          </a>
          <button
            className="text-white md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-white/10 bg-charcoal px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium text-white/85 hover:bg-white/5 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            className="mt-1 rounded-full bg-orange px-4 py-2 text-center text-sm font-semibold text-white"
          >
            {t.nav.enrollNow}
          </a>
        </nav>
      )}
    </header>
  );
}
