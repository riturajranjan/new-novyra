"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { contactDetails } from "@/content/contact-cta";
import { easePremium } from "@/lib/motion";

/** Premium glass panel listing the direct ways to reach Novyra. */
export function ContactInfoPanel() {
  const t = useTranslations("contact.contactDetails");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.5, ease: easePremium }}
      className="glass-strong shadow-card relative overflow-hidden rounded-hero p-5 md:p-10"
    >
      <div aria-hidden className="bg-brand-cyan/10 pointer-events-none absolute -inset-20 -z-10 rounded-full blur-3xl" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contactDetails.map((detail) => {
          const Icon = detail.icon;
          return (
            <div key={detail.id} className="flex items-start gap-3">
              <span className="bg-brand-blue/12 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
                <Icon className="text-brand-blue h-5 w-5" aria-hidden />
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="text-caption text-foreground-secondary font-semibold tracking-wide uppercase">{t(`${detail.id}.label`)}</p>
                <p className="text-body-sm text-foreground font-medium">{t(`${detail.id}.value`)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
