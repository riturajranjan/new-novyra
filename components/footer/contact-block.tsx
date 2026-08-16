"use client";

import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { companyInfo } from "@/content/footer";
import { easePremium } from "@/lib/motion";

interface ContactBlockProps {
  icon?: LucideIcon;
}

const linkClassName =
  "text-body-sm text-foreground-secondary hover:text-foreground focus-visible:ring-brand-blue flex items-center gap-2 rounded-sm transition-colors duration-fast focus-visible:ring-2 focus-visible:outline-none";

/** "Let's Connect" — the footer's real, findable contact channels. No card
 * shell, plain rows with icons, matching the editorial nav grid's
 * borderless treatment. */
export function ContactBlock({ icon: HeadingIcon }: ContactBlockProps) {
  const t = useTranslations("footer.contactBlock");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, delay: 0.1, ease: easePremium }}
      className="flex flex-col gap-3"
    >
      <h4 className="text-foreground-secondary flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.1em] uppercase sm:text-[13px]">
        {HeadingIcon ? <HeadingIcon className="text-brand-blue h-3.5 w-3.5 shrink-0" aria-hidden /> : null}
        {t("heading")}
      </h4>
      <div className="flex flex-col gap-2">
        <a href={`mailto:${companyInfo.email}`} className={linkClassName}>
          <Mail className="text-brand-blue h-3.5 w-3.5 shrink-0" aria-hidden />
          {companyInfo.email}
        </a>
        <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className={linkClassName}>
          <Phone className="text-brand-blue h-3.5 w-3.5 shrink-0" aria-hidden />
          {companyInfo.phone}
        </a>
        <a href={companyInfo.whatsapp} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          <MessageCircle className="text-brand-blue h-3.5 w-3.5 shrink-0" aria-hidden />
          {t("whatsapp")}
        </a>
        <div className="text-body-sm text-foreground-secondary flex items-center gap-2">
          <MapPin className="text-brand-blue h-3.5 w-3.5 shrink-0" aria-hidden />
          {companyInfo.location}
        </div>
      </div>

      <div className="border-border-subtle flex flex-col gap-1.5 border-t pt-3">
        <span className="text-caption flex items-center gap-2 font-medium text-emerald-400">
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {t("available")}
        </span>
        <p className="text-caption text-foreground-secondary/70">{t("basedIn")}</p>
      </div>
    </motion.div>
  );
}
