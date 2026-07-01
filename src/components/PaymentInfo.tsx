"use client";

import { Smartphone, Landmark, Info } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { siteConfig } from "@/config/site";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-charcoal/10 py-2 last:border-0">
      <span className="text-sm text-charcoal/60">{label}</span>
      <span className="force-ltr text-sm font-semibold text-charcoal">{value}</span>
    </div>
  );
}

export function PaymentInfo() {
  const { t } = useLanguage();
  const { easypaisa, bank } = siteConfig.payment;

  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold text-charcoal sm:text-3xl">
            {t.payment.heading}
          </h2>
          <p className="mt-3 text-charcoal/70">{t.payment.subheading}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-gold bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Smartphone className="h-5 w-5" />
              </span>
              <h3 className="font-bold text-charcoal">{t.payment.easypaisaTitle}</h3>
            </div>
            <div className="mt-4">
              <Row label={t.payment.numberLabel} value={easypaisa.number} />
              <Row label={t.payment.nameLabel} value={easypaisa.accountName} />
            </div>
          </div>

          <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/10 text-charcoal">
                <Landmark className="h-5 w-5" />
              </span>
              <h3 className="font-bold text-charcoal">{t.payment.bankTitle}</h3>
            </div>
            <div className="mt-4">
              <Row label={t.payment.bankNameLabel} value={bank.bankName} />
              <Row label={t.payment.accountNumberLabel} value={bank.accountNumber} />
              <Row label={t.payment.ibanLabel} value={bank.iban} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-xl bg-orange/10 p-4 text-sm text-charcoal/80">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
          <p>{t.payment.note}</p>
        </div>
      </div>
    </section>
  );
}
