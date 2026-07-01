"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-extrabold text-charcoal sm:text-3xl">
          {t.faq.heading}
        </h2>

        <div className="mt-8 space-y-3">
          {t.faq.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-charcoal/10 bg-white"
              >
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
                  aria-expanded={open}
                >
                  <span className="text-sm font-semibold text-charcoal">{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-orange transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open && (
                  <div className="px-5 pb-4 text-sm text-charcoal/70">{item.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
