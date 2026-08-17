"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, MessageCircle, Radio } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RippleLink } from "@/components/ui/ripple-link";
import { buttonVariants } from "@/components/ui/button";
import { companyInfo } from "@/content/footer";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Section 04 — a compact horizontal strip, not another 600px gradient
 * block. Dark surface + restrained blue→violet→pink illumination (not a
 * solid bright rectangle), with one thin line entering from the Process
 * section above — "Signal Completion," closing the Idea → Contact →
 * Conversation → Next Step story the page has been telling. */
export function ContactFinalCta() {
  const t = useTranslations("contact.cta");
  const reduceMotion = useReducedMotion();
  const whatsappHref = companyInfo.whatsapp;

  return (
    <section className="relative isolate overflow-hidden py-12 md:py-16" style={{ backgroundColor: "#050710" }}>
      <svg aria-hidden viewBox="0 0 400 40" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-10 w-full opacity-40">
        <motion.line
          x1={0}
          y1={0}
          x2={400}
          y2={20}
          stroke="var(--color-brand-blue)"
          strokeWidth={1}
          initial={reduceMotion ? undefined : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "100px" }}
          variants={fadeInUp}
          className="relative isolate flex flex-col items-center gap-6 overflow-hidden rounded-[22px] border p-6 text-center sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:text-left"
          style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(8,13,28,0.72)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "radial-gradient(40% 70% at 12% 20%, color-mix(in oklab, var(--color-brand-blue) 16%, transparent), transparent 70%), radial-gradient(45% 70% at 88% 80%, color-mix(in oklab, var(--color-brand-pink) 12%, transparent), transparent 70%)",
            }}
          />

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4 lg:items-center">
            <span className="bg-brand-blue/12 flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
              <Radio className="text-brand-blue h-5 w-5" aria-hidden />
            </span>
            <div className="flex flex-col items-center gap-1 lg:items-start">
              <h3 className="text-title-lg text-foreground font-semibold text-balance">{t("heading")}</h3>
              <p className="text-body-sm text-foreground-secondary max-w-md text-pretty">{t("description")}</p>
            </div>
          </div>

          <div className="flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
            <RippleLink
              href="#project-form"
              className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group relative w-full overflow-hidden sm:w-auto")}
            >
              {t("primaryCta")}
              <ArrowUp className="h-4 w-4 transition-transform duration-fast group-hover:-translate-y-0.5" aria-hidden />
            </RippleLink>
            <RippleLink
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              {t("secondaryCta")}
            </RippleLink>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
