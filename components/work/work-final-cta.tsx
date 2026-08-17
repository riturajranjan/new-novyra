"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RippleLink } from "@/components/ui/ripple-link";
import { buttonVariants } from "@/components/ui/button";
import { WorkFinalCtaBackground } from "@/components/work/work-final-cta-background";
import { conceptBuilds } from "@/content/case-studies";
import { companyInfo } from "@/content/footer";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Section 06 — a compact closing strip, not another giant gradient
 * block. Dark surface, restrained illumination, an incomplete
 * product-window drawing itself in behind the copy — "the next project
 * is waiting to be built." Index label counts from the real total
 * number of concepts on the page rather than a hardcoded "10." */
export function WorkFinalCta() {
  const t = useTranslations("work.cta");
  const whatsappHref = companyInfo.whatsapp;
  const nextIndex = String(conceptBuilds.length + 1).padStart(2, "0");

  return (
    <section className="relative isolate overflow-hidden py-14 md:py-18">
      <WorkFinalCtaBackground />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={fadeInUp}
          className="relative isolate flex flex-col items-center gap-6 overflow-hidden rounded-[24px] border p-6 text-center sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:text-left"
          style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(8,13,28,0.6)" }}
        >
          <div className="flex flex-col items-center gap-2 lg:items-start">
            <span className="text-caption font-mono font-medium tracking-[0.2em] text-white/30 uppercase">
              {nextIndex} / {t("indexLabel")}
            </span>
            <h3 className="text-title-lg text-foreground font-semibold text-balance">
              {t("headingLine1")}
              <br />
              {t("headingLine2")}
            </h3>
            <p className="text-body-sm text-foreground-secondary max-w-md text-pretty">{t("description")}</p>
          </div>

          <div className="flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
            <RippleLink href="/contact" className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group relative w-full overflow-hidden sm:w-auto")}>
              {t("primaryCta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </RippleLink>
            <RippleLink href={whatsappHref} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}>
              <MessageCircle className="h-4 w-4" aria-hidden />
              {t("secondaryCta")}
            </RippleLink>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
