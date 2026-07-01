"use client";

import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle, UploadCloud } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { siteConfig, whatsappLink, type PlanId } from "@/config/site";

type Status = "idle" | "submitting" | "success" | "error";

export function EnrollForm({
  selectedPlan,
  onPlanChange,
}: {
  selectedPlan: PlanId | "";
  onPlanChange: (plan: PlanId | "") => void;
}) {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message =
          data.error === "INVALID_FILE_TYPE"
            ? t.enroll.errorFileType
            : data.error === "FILE_TOO_LARGE"
            ? t.enroll.errorFileSize
            : data.error === "MISSING_FIELDS"
            ? t.enroll.errorRequired
            : t.enroll.errorGeneric;
        setErrorMessage(message);
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
      setFileName("");
      onPlanChange("");
    } catch {
      setErrorMessage(t.enroll.errorGeneric);
      setStatus("error");
    }
  }

  function resetForm() {
    setStatus("idle");
    setErrorMessage("");
  }

  if (status === "success") {
    return (
      <section id="enroll" className="bg-charcoal py-16 text-white sm:py-20">
        <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
          <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
          <h2 className="mt-4 text-2xl font-extrabold">{t.enroll.successTitle}</h2>
          <p className="mt-3 text-white/75">{t.enroll.successMessage}</p>
          <button
            onClick={resetForm}
            className="mt-6 rounded-full bg-gradient-to-r from-gold to-orange px-6 py-3 text-sm font-semibold text-charcoal"
          >
            {t.enroll.submitAnother}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="enroll" className="bg-charcoal py-16 text-white sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">{t.enroll.heading}</h2>
          <p className="mt-3 text-white/70">{t.enroll.subheading}</p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-3xl border border-white/10 bg-charcoal-2 p-6 sm:p-8"
        >
          <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="min-w-0 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80">
                {t.enroll.fullName} *
              </label>
              <input
                name="fullName"
                required
                placeholder={t.enroll.fullNamePlaceholder}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-charcoal px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="min-w-0">
              <label className="block text-sm font-medium text-white/80">
                {t.enroll.grade} *
              </label>
              <select
                name="grade"
                required
                defaultValue=""
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-charcoal px-4 py-2.5 text-sm text-white focus:border-gold focus:outline-none"
              >
                <option value="" disabled>
                  {t.enroll.selectGrade}
                </option>
                {siteConfig.grades.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-0">
              <label className="block text-sm font-medium text-white/80">
                {t.enroll.whatsapp} *
              </label>
              <input
                name="whatsapp"
                required
                type="tel"
                placeholder={t.enroll.whatsappPlaceholder}
                className="force-ltr mt-1.5 w-full rounded-xl border border-white/15 bg-charcoal px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="min-w-0 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80">
                {t.enroll.email}
              </label>
              <input
                name="email"
                type="email"
                placeholder={t.enroll.emailPlaceholder}
                className="force-ltr mt-1.5 w-full rounded-xl border border-white/15 bg-charcoal px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="min-w-0">
              <label className="block text-sm font-medium text-white/80">
                {t.enroll.plan} *
              </label>
              <select
                name="plan"
                required
                value={selectedPlan}
                onChange={(e) => onPlanChange(e.target.value as PlanId)}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-charcoal px-4 py-2.5 text-sm text-white focus:border-gold focus:outline-none"
              >
                <option value="" disabled>
                  {t.enroll.selectPlan}
                </option>
                {siteConfig.pricing.map((p) => (
                  <option key={p.id} value={p.id}>
                    {t.pricing.plans[p.id].name}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-0">
              <label className="block text-sm font-medium text-white/80">
                {t.enroll.paymentMethod} *
              </label>
              <select
                name="paymentMethod"
                required
                defaultValue=""
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-charcoal px-4 py-2.5 text-sm text-white focus:border-gold focus:outline-none"
              >
                <option value="" disabled>
                  {t.enroll.selectPaymentMethod}
                </option>
                <option value="easypaisa">EasyPaisa</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            <div className="min-w-0 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80">
                {t.enroll.transactionId}
              </label>
              <input
                name="transactionId"
                placeholder={t.enroll.transactionIdPlaceholder}
                className="force-ltr mt-1.5 w-full rounded-xl border border-white/15 bg-charcoal px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="min-w-0 sm:col-span-2">
              <label className="block text-sm font-medium text-white/80">
                {t.enroll.screenshot} *
              </label>
              <label
                htmlFor="screenshot"
                className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/25 bg-charcoal px-4 py-3 text-sm text-white/60 hover:border-gold"
              >
                <UploadCloud className="h-5 w-5 text-gold" />
                <span className="truncate">{fileName || t.enroll.screenshotHint}</span>
              </label>
              <input
                id="screenshot"
                name="screenshot"
                type="file"
                required
                accept="image/jpeg,image/png,image/webp,image/heic"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
              />
            </div>
          </div>

          {status === "error" && (
            <p className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-full bg-gradient-to-r from-gold to-orange px-6 py-3 text-sm font-bold text-charcoal transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {status === "submitting" ? t.enroll.submitting : t.enroll.submit}
          </button>

          <div className="flex items-center justify-center gap-2 border-t border-white/10 pt-4 text-center text-xs text-white/50">
            <span>{t.enroll.whatsappBackup}</span>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-gold hover:underline"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              {t.enroll.whatsappBackupCta}
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
