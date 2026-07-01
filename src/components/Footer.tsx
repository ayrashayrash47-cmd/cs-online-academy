"use client";

import { GraduationCap, Phone, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { siteConfig, whatsappLink } from "@/config/site";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold">
                <GraduationCap className="h-4 w-4 text-gold" />
              </span>
              <span className="font-bold">{siteConfig.name}</span>
            </div>
            <p className="mt-3 text-sm text-white/60">{t.footer.tagline}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-gold-light">
              {t.footer.contactHeading}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                <span className="force-ltr">{siteConfig.contact.displayPhone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" />
                <span className="force-ltr">{siteConfig.contact.email}</span>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gold hover:underline"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-gold-light">
              {t.footer.linksHeading}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>
                <a href="#subjects" className="hover:text-gold">
                  {t.nav.subjects}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-gold">
                  {t.nav.pricing}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold">
                  {t.nav.faq}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <span>
            © {year} {siteConfig.name}. {t.footer.rights}
          </span>
          <span>
            {t.footer.poweredBy} <span className="text-gold-light">{siteConfig.poweredBy}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
