"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { serviceProcessSteps } from "@/content/service-categories";

/** Horizontal five-step delivery process below the service switcher — a
 * connecting gradient line threading through icon nodes, each with a title
 * and a one-line description. Below `lg` it becomes a horizontal
 * scroll-snap strip rather than wrapping, so the sequence never breaks
 * across rows. */
export function ServiceProcess() {
  const t = useTranslations("services");

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        eyebrow={t("process.eyebrow")}
        title={t("process.heading")}
        description={t("process.description")}
      />

      <ol className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] lg:snap-none lg:justify-between lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        {serviceProcessSteps.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === serviceProcessSteps.length - 1;
          return (
            <li
              key={step.id}
              className={cn(
                "group relative flex min-w-[170px] shrink-0 snap-start flex-col items-center gap-3 text-center lg:min-w-0 lg:flex-1",
              )}
            >
              {!isLast ? (
                <span
                  aria-hidden
                  className="bg-border-subtle absolute top-6 left-[calc(50%+28px)] z-0 hidden h-px w-[calc(100%-56px)] overflow-hidden lg:block"
                >
                  <motion.span
                    className="bg-gradient-brand absolute inset-y-0 left-0"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true, margin: "150px" }}
                    transition={{ duration: 0.6, delay: i * 0.12, ease: easePremium }}
                  />
                </span>
              ) : null}

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "150px" }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: easePremium }}
                className="border-border-subtle bg-surface/70 relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border backdrop-blur-md transition-shadow duration-base group-hover:shadow-glow-blue"
              >
                <span className="text-caption text-foreground-secondary absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <Icon className="text-brand-blue h-5 w-5" aria-hidden />
              </motion.div>

              <div className="flex flex-col gap-1">
                <p className="text-body-sm text-foreground font-semibold">{t(`process.steps.${step.id}.title`)}</p>
                <p className="text-caption text-foreground-secondary max-w-[160px]">
                  {t(`process.steps.${step.id}.description`)}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
