"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold text-charcoal sm:text-3xl">
            {t.howItWorks.heading}
          </h2>
          <p className="mt-3 text-charcoal/70">{t.howItWorks.subheading}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.howItWorks.steps.map((step, i) => (
            <div key={step.title} className="relative rounded-2xl border border-charcoal/10 bg-cream p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold to-orange text-sm font-bold text-charcoal">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-bold text-charcoal">{step.title}</h3>
              <p className="mt-2 text-sm text-charcoal/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
