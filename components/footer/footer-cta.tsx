"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Magnetic } from "@/components/ui/magnetic";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { footerCtas } from "@/content/footer";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Footer layer 1 — a compact, asymmetric CTA (label + heading left, two
 * real actions right) rather than a centered hero block. A soft gradient
 * glow sits behind it; no full card shell. */
export function FooterCta() {
  const t = useTranslations("footer");

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.6, ease: easePremium }}
      className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center lg:gap-8"
    >
      <div
        aria-hidden
        className="bg-gradient-brand pointer-events-none absolute -inset-x-10 -top-16 -z-10 h-56 opacity-[0.12] blur-3xl"
      />
      <div className="flex flex-col gap-2">
        <span className="text-caption text-brand-blue font-semibold tracking-[0.14em] uppercase">{t("cta.label")}</span>
        <h2 className="text-title-lg sm:text-display-lg text-foreground max-w-lg text-balance font-semibold">{t("cta.heading")}</h2>
        <p className="text-caption text-foreground-secondary/70 font-medium">{t("cta.tagline")}</p>
      </div>

      <div className="flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
        {footerCtas.map((cta) => {
          const Icon = cta.icon;
          const external = cta.href.startsWith("http");
          const label = t(`ctas.${cta.id}`);
          return (
            <Magnetic key={cta.id} className="w-full sm:w-auto">
              <RippleLink
                href={cta.href}
                className={cn(buttonVariants({ variant: cta.variant, size: "lg" }), "group relative w-full overflow-hidden sm:w-auto")}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                {cta.variant === "gradient" ? (
                  <span
                    aria-hidden
                    className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                ) : null}
                {label}
                <Icon className="h-4 w-4" aria-hidden />
              </RippleLink>
            </Magnetic>
          );
        })}
      </div>
    </motion.div>
  );
}
