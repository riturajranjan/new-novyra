"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { legalLinks } from "@/content/footer";

/** The closing bar — copyright, legal links, theme switcher, and language
 * selector, separated from the rest of the footer by a glass divider. */
export function FooterBottom() {
  const t = useTranslations("footer.bottom");

  return (
    <div className="border-border-subtle flex flex-col items-center gap-4 border-t pt-5 sm:flex-row sm:justify-between">
      <p className="text-caption text-foreground-secondary text-center sm:text-left">{t("copyright")}</p>

      <nav aria-label={t("legalNavLabel")} className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
        {legalLinks.map((link, i) => (
          <span key={link.id} className="flex items-center gap-3">
            {i > 0 ? <span className="text-foreground-secondary/30" aria-hidden>|</span> : null}
            <Link
              href={link.href}
              className="text-caption text-foreground-secondary hover:text-foreground focus-visible:ring-brand-blue rounded-sm transition-colors duration-fast focus-visible:ring-2 focus-visible:outline-none"
            >
              {t(`legal.${link.id}`)}
            </Link>
          </span>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <span className="text-caption text-foreground-secondary/60 hidden font-medium tracking-wide sm:inline">{t("tagline")}</span>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
