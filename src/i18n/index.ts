import en from "./en";
import ur from "./ur";
import type { Dictionary } from "./en";

export const locales = ["en", "ur"] as const;
export type Locale = (typeof locales)[number];

export const dictionaries: Record<Locale, Dictionary> = { en, ur };

export const localeDir: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ur: "rtl",
};

export type { Dictionary };
