"use client";

import type { MouseEvent, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { ProcessBackground } from "@/components/process/process-background";
import { ProcessTimeline } from "@/components/process/process-timeline";
import { cn } from "@/lib/utils";

const trustPointIds = [
  "transparent-process",
  "regular-updates",
  "post-launch-support",
];

/** Small magnetic wrapper for the CTA buttons — nudges toward the pointer
 * within a subtle range and springs back on leave. Mouse-driven only;
 * touch devices never fire `mousemove`, so it's a no-op there. */
function MagneticButton({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="w-full">
      {children}
    </motion.div>
  );
}

/** "Our Process" — a premium glassmorphism project timeline, deliberately
 * distinct from the Our Services tabs and the orbital Business Solution
 * Advisor. No fabricated stats or client claims — six honest workflow
 * steps and their real deliverables. Header, timeline, and CTA all sit in
 * normal document flow — nothing here is absolutely positioned. */
export function OurProcess() {
  const t = useTranslations("process");

  return (
    <section id="process" className="relative isolate scroll-mt-24 overflow-hidden py-14 md:py-16 lg:py-20">
      <ProcessBackground />

      <Container size="wide">
        <div className="relative mx-auto mb-10 flex max-w-[820px] flex-col items-center gap-5 text-center md:mb-18">
          <div
            aria-hidden
            className="bg-gradient-brand pointer-events-none absolute top-1/2 left-1/2 -z-10 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.14] blur-[100px]"
          />
          <SectionHeading
            eyebrow={t("sectionHeading.eyebrow")}
            title={
              <>
                {t("sectionHeading.titleLine1")}
                <br className="hidden sm:block" />{" "}
                <span className="text-gradient-brand">
                  {t("sectionHeading.titleHighlight")}
                </span>
              </>
            }
            description={t("sectionHeading.description")}
          />
          <div className="flex flex-wrap items-center justify-center gap-2">
            {trustPointIds.map((id) => (
              <span
                key={id}
                className="glass text-caption text-foreground-secondary rounded-full px-3.5 py-1.5">
                {t(`trustPoints.${id}`)}
              </span>
            ))}
          </div>
        </div>

        <ProcessTimeline />

        {/* <div className="relative mx-auto mt-10 w-full max-w-[760px] md:mt-18">
          <div
            aria-hidden
            className="bg-gradient-brand pointer-events-none absolute -inset-16 -z-10 rounded-[48px] opacity-25 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-2xl p-px">
            <div aria-hidden className="bg-gradient-brand absolute inset-0 -z-10 opacity-60" />
            
            <div className="glass-strong relative flex flex-col items-center gap-6 rounded-[31px] p-8 text-center sm:p-10">
              <span aria-hidden className="text-foreground-secondary/40 flex items-center gap-2">
                <span className="via-foreground-secondary/40 h-px w-16 bg-gradient-to-r from-transparent to-transparent" />
                <ArrowRight className="h-3 w-3" />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-title-lg text-foreground font-semibold">{t("cta.heading")}</h3>
                <p className="text-body-sm text-foreground-secondary max-w-md">{t("cta.description")}</p>
              </div>
              <div className="mx-auto grid w-full max-w-[480px] grid-cols-1 gap-3 sm:grid-cols-2">
                <MagneticButton>
                  <RippleLink
                    href="/contact"
                    className={cn(
                      buttonVariants({ variant: "gradient", size: "lg" }),
                      "group min-h-[50px] w-full px-5 whitespace-nowrap",
                    )}
                  >
                    {t("cta.startProject")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
                  </RippleLink>
                </MagneticButton>
                <MagneticButton>
                  <RippleLink
                    href="/contact"
                    className={cn(
                      buttonVariants({ variant: "glass", size: "lg" }),
                      "min-h-[50px] w-full px-5 whitespace-nowrap",
                    )}
                  >
                    {t("cta.scheduleCall")}
                  </RippleLink>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div> */}
      </Container>
    </section>
  );
}
