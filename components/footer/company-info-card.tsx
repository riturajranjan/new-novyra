"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { companyInfo } from "@/content/footer";
import { easePremium } from "@/lib/motion";
import Image from "next/image";

/** The brand identity card — same text-logo treatment as the navbar, a
 * two-line description, and real contact details, kept to a single column
 * so it sits evenly alongside Company / Services / Resources. */
export function CompanyInfoCard() {
  const t = useTranslations("footer.companyInfo");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, ease: easePremium }}
      className="border-border-subtle bg-surface/60 flex flex-col gap-3 rounded-xl border p-5 backdrop-blur-xl">
      <span className="text-title-lg text-foreground font-semibold">
        {/* Novyra<span className="text-gradient-brand">.</span> */}
        <Image
          src="/logo.png"
          alt="Novyra Technologies Logo"
          width={120}
          height={40}
          className="h-auto w-auto"
        />
      </span>

      <p className="text-body-sm text-foreground-secondary">
        {t("description")}
      </p>

      <div className="border-border-subtle flex flex-col gap-1.5 border-t pt-3">
        <a
          href={`mailto:${companyInfo.email}`}
          className="text-body-sm text-foreground-secondary hover:text-foreground flex items-center gap-2 transition-colors duration-fast">
          <Mail className="text-brand-blue h-3.5 w-3.5 shrink-0" aria-hidden />
          {companyInfo.email}
        </a>
        <a
          href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
          className="text-body-sm text-foreground-secondary hover:text-foreground flex items-center gap-2 transition-colors duration-fast">
          <Phone className="text-brand-blue h-3.5 w-3.5 shrink-0" aria-hidden />
          {companyInfo.phone}
        </a>
        <div className="text-body-sm text-foreground-secondary flex items-center gap-2">
          <MapPin
            className="text-brand-blue h-3.5 w-3.5 shrink-0"
            aria-hidden
          />
          {t("location")}
        </div>
      </div>
    </motion.div>
  );
}
