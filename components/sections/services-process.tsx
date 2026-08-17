"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ServiceProcessBackground } from "@/components/services/service-process-background";
import { ServiceProcessRail } from "@/components/services/service-process-rail";

/** Section 04 — "How We Build." The real six-step process
 * (content/process-steps.ts + messages/*.process.json, shared with the
 * homepage's Our Process), presented through this page's own interactive
 * rail rather than reusing OurProcess's card grid — same steps, a
 * genuinely different UI and a genuinely different background. */
export function ServicesProcess() {
  const t = useTranslations("services");

  return (
    <section id="process" className="relative isolate scroll-mt-24 overflow-hidden py-14 md:py-18 lg:py-24">
      <ServiceProcessBackground />

      <Container className="flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-4">
          <span className="text-caption inline-flex w-fit items-center gap-2 font-mono font-medium tracking-[0.2em] text-white/40 uppercase">
            <span className="h-px w-6 bg-white/25" aria-hidden />
            {t("process.eyebrow")}
          </span>
          <h2
            className="max-w-2xl font-bold text-balance text-white"
            style={{ fontSize: "clamp(34px, 4vw, 54px)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
          >
            {t("process.headingLine1")}
            <br />
            {t("process.headingLine2")}
          </h2>
          <p className="text-body text-white/55 max-w-lg">{t("process.description")}</p>
        </div>

        <ServiceProcessRail />
      </Container>
    </section>
  );
}
