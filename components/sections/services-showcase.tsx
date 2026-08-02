"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { registerStickyBarHidden, registerStickyBarVisible } from "@/lib/sticky-bar-registry";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { ServicesBackground } from "@/components/services/services-background";
import { ServiceNav } from "@/components/services/service-nav";
import { ServicePreview } from "@/components/services/service-preview";
import { ServiceDetails } from "@/components/services/service-details";
import { ServiceCta } from "@/components/services/service-cta";
import { serviceCategories } from "@/content/service-categories";
import { easePremium } from "@/lib/motion";
import { useIsMounted } from "@/lib/use-is-mounted";
import { cn } from "@/lib/utils";

/** Interactive services showcase — one connected journey (choose a
 * service, see its live preview, read its benefits, act) rather than three
 * columns that happen to sit next to each other: the nav, preview, and
 * details all key off the same `activeCategory` and animate together.
 * Single shared markup for every breakpoint — below `lg` the 25/50/25
 * columns stack (nav full-width, preview, then details) rather than
 * splitting into a separate mobile layout to maintain. */
export function ServicesShowcase() {
  const t = useTranslations("services");
  const [activeId, setActiveId] = useState(serviceCategories[0].id);
  const activeCategory = serviceCategories.find((c) => c.id === activeId) ?? serviceCategories[0];

  // Mobile-only sticky action bar — shown while the preview panel is
  // roughly centered in the viewport, mirroring the same pattern used on
  // the pricing section's spotlight.
  const previewRef = useRef<HTMLDivElement>(null);
  const previewInView = useInView(previewRef, { margin: "-40% 0px -40% 0px" });
  const mounted = useIsMounted();

  // Tells the persistent mobile conversion dock (layout/mobile-conversion-
  // dock.tsx) to step aside while this section's own sticky bar occupies
  // the same fixed bottom-of-viewport position — otherwise the two would
  // render stacked on top of each other.
  useEffect(() => {
    if (!previewInView) return;
    registerStickyBarVisible();
    return () => registerStickyBarHidden();
  }, [previewInView]);

  return (
    <section id="services" className="relative isolate scroll-mt-24 overflow-hidden py-14 md:py-20">
      <ServicesBackground />

      <Container className="flex flex-col gap-8 md:gap-10">
        <SectionHeading
          eyebrow={t("showcase.eyebrow")}
          title={t("showcase.title")}
          description={t("showcase.description")}
        />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,25%)_minmax(0,50%)_minmax(0,25%)]">
          <ServiceNav categories={serviceCategories} activeId={activeId} onSelect={setActiveId} />

          <div ref={previewRef}>
            <ServicePreview category={activeCategory} />
          </div>

          <ServiceDetails category={activeCategory} />
        </div>

        <ServiceCta />
      </Container>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {previewInView ? (
                <motion.div
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 80, opacity: 0 }}
                  transition={{ duration: 0.3, ease: easePremium }}
                  className="glass-strong shadow-card-hover fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-3 rounded-2xl p-3 lg:hidden"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "color-mix(in oklab, var(--color-brand-blue) 16%, transparent)" }}
                    >
                      <activeCategory.icon className="text-brand-blue h-4.5 w-4.5" aria-hidden />
                    </span>
                    <span className="text-body-sm text-foreground truncate font-semibold">
                      {t(`categories.${activeCategory.id}.label`)}
                    </span>
                  </div>
                  <RippleLink
                    href="/#contact"
                    className={cn(buttonVariants({ variant: "gradient", size: "md" }), "shrink-0")}
                  >
                    {t("finalCta.primaryCta")}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </RippleLink>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </section>
  );
}
