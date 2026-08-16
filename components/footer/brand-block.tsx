"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SocialGrid } from "@/components/footer/social-grid";
import { easePremium } from "@/lib/motion";

/** The footer's brand column — logo, one-line description, social row.
 * No card shell, no contact details (those live in ContactBlock) — kept
 * purely as the identity anchor of the editorial nav grid. */
export function BrandBlock() {
  const t = useTranslations("footer.brand");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, ease: easePremium }}
      className="flex flex-col gap-4"
    >
      <Image src="/logo.png" alt="Novyra Technologies" width={120} height={40} className="h-auto w-auto" />
      <p className="text-body-sm text-foreground-secondary max-w-xs text-pretty">{t("description")}</p>
      <SocialGrid />
    </motion.div>
  );
}
