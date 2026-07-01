"use client";

import { Quote } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-charcoal/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-charcoal/50">
            {t.testimonials.sampleBadge}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-charcoal sm:text-3xl">
            {t.testimonials.heading}
          </h2>
          <p className="mt-3 text-charcoal/70">{t.testimonials.subheading}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.testimonials.items.map((item) => (
            <div
              key={item.name}
              className="flex flex-col rounded-2xl border border-charcoal/10 bg-cream p-6 shadow-sm"
            >
              <Quote className="h-6 w-6 text-gold" />
              <p className="mt-3 flex-1 text-sm text-charcoal/80">{item.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-charcoal to-charcoal-2 text-sm font-bold text-gold">
                  {item.name.charAt(0)}
                </span>
                <div>
                  <div className="text-sm font-bold text-charcoal">{item.name}</div>
                  <div className="text-xs text-charcoal/50">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
