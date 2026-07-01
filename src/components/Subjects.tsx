"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { siteConfig } from "@/config/site";
import { SubjectIcon } from "./SubjectIcon";

export function Subjects() {
  const { t } = useLanguage();

  return (
    <section id="subjects" className="bg-charcoal py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">{t.subjects.heading}</h2>
          <p className="mt-3 text-white/70">{t.subjects.subheading}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {siteConfig.subjects.map((subject) => (
            <div
              key={subject.id}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-charcoal-2 p-5 text-center transition-colors hover:border-gold/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-orange text-charcoal">
                <SubjectIcon name={subject.icon} className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold">
                {t.subjects.items[subject.id]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
