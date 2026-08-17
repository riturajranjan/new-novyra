"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RippleLink } from "@/components/ui/ripple-link";
import { IndustryVisual } from "@/components/industries/industry-visual";
import { IndustriesSpotlightsBackground } from "@/components/industries/industries-spotlights-background";
import { industries } from "@/content/industries";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

const spotlightIds = ["education", "healthcare", "retail-ecommerce"] as const;

/** One spotlight row — visual and text swap sides on every other row, and
 * each carries its own quiet accent-tinted ambient wash (blue/violet for
 * Education, cyan for Healthcare, green for Retail) so the three rows
 * read as distinct moments rather than one template repeated three
 * times. Its own component (not inlined in a `.map()`) so it can call
 * `useTranslations` for its own industry namespace at its own top level. */
function SpotlightRow({ id, index }: { id: string; index: number }) {
  const t = useTranslations(`industries.items.${id}`);
  const tSpotlights = useTranslations("industries.spotlights");
  const industry = industries.find((i) => i.id === id)!;
  const stroke = accentStroke[industry.accent];
  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: easePremium }}
      className="relative border-t border-white/8 py-8 first:border-t-0 first:pt-0 md:py-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage: reversed
            ? `radial-gradient(50% 70% at 85% 50%, ${accentTint(industry.accent, 10)}, transparent 70%)`
            : `radial-gradient(50% 70% at 15% 50%, ${accentTint(industry.accent, 10)}, transparent 70%)`,
        }}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 -z-10 leading-none font-bold text-white select-none",
          reversed ? "left-0" : "right-0",
        )}
        style={{ fontSize: "clamp(120px, 14vw, 220px)", opacity: 0.025, transform: "translateY(-50%)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-12 lg:min-h-115">
        <div className={cn("h-64 overflow-hidden rounded-2xl sm:h-80 lg:h-full", reversed && "md:order-2")}>
          <IndustryVisual industry={industry} />
        </div>

        <div className={cn("flex flex-col gap-4", reversed && "md:order-1")}>
          <span className="text-caption font-mono font-medium tracking-[0.2em] uppercase" style={{ color: stroke }}>
            {String(index + 1).padStart(2, "0")} / {t("title")}
          </span>
          <h3
            className="text-foreground max-w-md font-semibold text-balance"
            style={{ fontSize: "clamp(28px, 2.6vw, 40px)", lineHeight: 1.12, letterSpacing: "-0.02em" }}
          >
            {t("headline")}
          </h3>
          <p className="text-body-sm text-foreground-secondary max-w-md">{t("description")}</p>
          <p className="text-caption text-foreground-secondary/70">{(t.raw("capabilities") as string[]).join(" · ")}</p>

          <RippleLink
            href="#industry-explorer"
            className="group text-body-sm mt-1 flex w-fit items-center gap-1.5 font-semibold text-white/80 transition-colors duration-base hover:text-white"
          >
            {tSpotlights("exploreCta", { industry: t("title") })}
            <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
          </RippleLink>
        </div>
      </div>
    </motion.div>
  );
}

/** Section 04 — three real industries in editorial depth (Education,
 * Healthcare, Retail & eCommerce), alternating orientation, not six
 * massive sections. CTAs point back to the interactive Explorer above —
 * no dedicated per-industry pages exist yet, so nothing here links to a
 * page that doesn't exist. */
export function IndustrySpotlights() {
  const t = useTranslations("industries.spotlights");

  return (
    <section className="relative isolate overflow-hidden py-14 md:py-16 lg:py-20">
      <IndustriesSpotlightsBackground />

      <Container className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-mono font-semibold tracking-[0.2em] text-white/25 uppercase">{t("featuredLabel")}</span>
          <span className="text-caption inline-flex w-fit items-center gap-2 font-mono font-medium tracking-[0.2em] text-white/40 uppercase">
            <span className="h-px w-6 bg-white/25" aria-hidden />
            {t("eyebrow")}
          </span>
          <h2
            className="max-w-xl font-bold text-balance text-white"
            style={{ fontSize: "clamp(32px, 3.4vw, 50px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            {t("heading")}
          </h2>
        </div>

        <div className="flex flex-col">
          {spotlightIds.map((id, i) => (
            <SpotlightRow key={id} id={id} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
