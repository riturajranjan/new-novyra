"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Magnetic } from "@/components/ui/magnetic";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { footerCtas } from "@/content/footer";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** The footer's opening statement — the largest, most confident heading on
 * the page, with three magnetic/ripple CTAs underneath. */
export function FooterHero() {
  const t = useTranslations("footer");

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.6, ease: easePremium }}
      className="flex flex-col items-center gap-5 text-center"
    >
      <h2 className="text-display-lg sm:text-display-xl text-foreground font-semibold text-balance">
        {t("hero.heading")}
      </h2>
      <p className="text-body sm:text-body-lg text-foreground-secondary max-w-2xl text-pretty">{t("hero.description")}</p>

      <div className="flex w-full flex-col items-center gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
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
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </RippleLink>
            </Magnetic>
          );
        })}
      </div>
    </motion.div>
  );
}
