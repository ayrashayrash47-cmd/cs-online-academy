"use client";

import { Check, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { siteConfig, type PlanId } from "@/config/site";
import { Reveal } from "./Reveal";

export function Pricing({
  onSelectPlan,
}: {
  onSelectPlan: (plan: PlanId) => void;
}) {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold text-charcoal sm:text-3xl">
            {t.pricing.heading}
          </h2>
          <p className="mt-3 text-charcoal/70">{t.pricing.subheading}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:items-stretch">
          {siteConfig.pricing.map((tier, i) => {
            const plan = t.pricing.plans[tier.id];
            return (
              <Reveal key={tier.id} delay={i * 120}>
              <div
                className={`relative flex flex-col rounded-3xl border p-7 shadow-sm transition-transform hover:-translate-y-1 ${
                  tier.highlight
                    ? "border-gold bg-charcoal text-white shadow-xl shadow-gold/10"
                    : "border-charcoal/10 bg-white text-charcoal"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-gold to-orange px-4 py-1 text-xs font-bold text-charcoal shadow">
                    <Star className="h-3 w-3 fill-charcoal" />
                    {t.pricing.bestValue}
                  </span>
                )}

                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p
                  className={`mt-1 text-sm ${
                    tier.highlight ? "text-white/70" : "text-charcoal/60"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span
                    className={`text-3xl font-extrabold ${
                      tier.highlight ? "text-gold" : "text-charcoal"
                    }`}
                  >
                    Rs. {tier.priceRs.toLocaleString()}
                  </span>
                  <span
                    className={tier.highlight ? "text-white/60" : "text-charcoal/50"}
                  >
                    {t.pricing.perMonth}
                  </span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          tier.highlight ? "text-gold" : "text-orange"
                        }`}
                      />
                      <span className={tier.highlight ? "text-white/85" : "text-charcoal/80"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onSelectPlan(tier.id)}
                  className={`mt-7 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                    tier.highlight
                      ? "bg-gradient-to-r from-gold to-orange text-charcoal"
                      : "bg-charcoal text-white"
                  }`}
                >
                  {t.pricing.selectPlan}
                </button>
              </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
