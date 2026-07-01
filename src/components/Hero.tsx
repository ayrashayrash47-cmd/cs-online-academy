"use client";

import { GraduationCap, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { whatsappLink } from "@/config/site";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-charcoal via-charcoal to-charcoal-2 text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-orange/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="text-center lg:text-start">
          <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-gold-light">
            {t.hero.eyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {t.hero.headline}
          </h1>
          <p className="mt-4 text-base text-white/75 sm:text-lg">
            {t.hero.subheadline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#pricing"
              className="rounded-full bg-gradient-to-r from-orange to-orange-dark px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-orange/20 transition-transform hover:scale-[1.02]"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" />
              {t.hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {[
              [t.hero.stat1Value, t.hero.stat1Label],
              [t.hero.stat2Value, t.hero.stat2Label],
              [t.hero.stat3Value, t.hero.stat3Label],
            ].map(([value, label]) => (
              <div key={label} className="text-center lg:text-start">
                <div className="text-lg font-bold text-gold sm:text-2xl">{value}</div>
                <div className="text-[11px] text-white/60 sm:text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto flex justify-center">
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-4 border-gold/60 bg-gradient-to-br from-charcoal-2 to-charcoal shadow-2xl sm:h-80 sm:w-80">
            <div className="flex h-48 w-48 items-center justify-center rounded-full border-2 border-dashed border-gold/40 sm:h-60 sm:w-60">
              <GraduationCap className="h-24 w-24 text-gold sm:h-28 sm:w-28" strokeWidth={1.5} />
            </div>
            <span className="absolute -bottom-3 rounded-full bg-orange px-4 py-1 text-xs font-semibold text-white shadow-md">
              Matric / SSC
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
