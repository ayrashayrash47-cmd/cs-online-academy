"use client";

import { Users, Wallet, Award, CalendarClock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "./Reveal";

const icons = [Users, Wallet, Award, CalendarClock];

export function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold text-charcoal sm:text-3xl">
            {t.why.heading}
          </h2>
          <p className="mt-3 text-charcoal/70">{t.why.subheading}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.why.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-charcoal/10 bg-cream p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-charcoal text-gold transition-colors group-hover:bg-orange">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-charcoal/70">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
