"use client";

import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { companyInfo } from "@/content/footer";
import { easePremium } from "@/lib/motion";

/** "Start a conversation" — the footer's real, findable contact channels.
 * No card shell, plain rows with icons, matching the editorial nav grid's
 * borderless treatment. */
export function ContactBlock() {
  const t = useTranslations("footer.contactBlock");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, delay: 0.1, ease: easePremium }}
      className="flex flex-col gap-3"
    >
      <h4 className="text-caption text-foreground-secondary font-semibold tracking-wide uppercase">{t("heading")}</h4>
      <div className="flex flex-col gap-2">
        <a
          href={`mailto:${companyInfo.email}`}
          className="text-body-sm text-foreground-secondary hover:text-foreground flex items-center gap-2 transition-colors duration-fast"
        >
          <Mail className="text-brand-blue h-3.5 w-3.5 shrink-0" aria-hidden />
          {companyInfo.email}
        </a>
        <a
          href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
          className="text-body-sm text-foreground-secondary hover:text-foreground flex items-center gap-2 transition-colors duration-fast"
        >
          <Phone className="text-brand-blue h-3.5 w-3.5 shrink-0" aria-hidden />
          {companyInfo.phone}
        </a>
        <a
          href={companyInfo.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="text-body-sm text-foreground-secondary hover:text-foreground flex items-center gap-2 transition-colors duration-fast"
        >
          <MessageCircle className="text-brand-blue h-3.5 w-3.5 shrink-0" aria-hidden />
          {t("whatsapp")}
        </a>
        <div className="text-body-sm text-foreground-secondary flex items-center gap-2">
          <MapPin className="text-brand-blue h-3.5 w-3.5 shrink-0" aria-hidden />
          {companyInfo.location}
        </div>
      </div>
    </motion.div>
  );
}
