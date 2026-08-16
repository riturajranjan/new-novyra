"use client";

import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { PricingTeaserBackground } from "@/components/pricing/pricing-teaser-background";
import { companyInfo } from "@/content/footer";
import { pricingPlans, type PricingPlan } from "@/content/pricing";
import { accentStroke, accentTint } from "@/lib/accent";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const websitePlans = pricingPlans.filter((p) => p.id !== "enterprise");
const enterprisePlan = pricingPlans.find((p) => p.id === "enterprise")!;
const enterpriseTags = ["SaaS", "ERP", "CRM", "AI", "Platforms"];

/** The homepage's only pricing surface — an asymmetric editorial layout
 * (statement + trust points on the left, a layered plan composition on the
 * right) rather than four equal boxes. Full detail, the compare table, and
 * the Pricing FAQ stay on /pricing; this only needs to answer "roughly what
 * does this cost" and route people to the real page. */
export function PricingTeaser() {
  const t = useTranslations("pricing");
  const whatsappHref = companyInfo.whatsapp;

  return (
    <section className="relative isolate overflow-hidden py-14 md:py-16 lg:py-20">
      <PricingTeaserBackground />
      <Container size="wide" className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "150px" }}
          variants={fadeInUp}
          className="flex flex-col gap-5 lg:col-span-4 lg:justify-center"
        >
          <span className="text-gradient-brand text-sm font-semibold uppercase tracking-[0.14em]">{t("homeTeaser.eyebrow")}</span>
          <h2 className="text-headline sm:text-display-lg text-foreground text-balance font-semibold">{t("homeTeaser.heading")}</h2>
          <p className="text-body text-foreground-secondary max-w-sm text-pretty">{t("homeTeaser.description")}</p>

          <ul className="flex flex-col gap-2.5 pt-1">
            {(["transparent", "scoped", "noBundles"] as const).map((id) => (
              <li key={id} className="text-body-sm text-foreground-secondary flex items-center gap-2.5">
                <Check className="text-brand-emerald h-4 w-4 shrink-0" aria-hidden />
                {t(`homeTeaser.trustItems.${id}`)}
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <RippleLink href="/pricing" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group w-fit")}>
              {t("homeTeaser.viewFullCta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
            </RippleLink>
          </div>
        </motion.div>

        <div className="flex flex-col gap-5 lg:col-span-8">
          <div className="grid grid-cols-1 items-end gap-5 sm:grid-cols-3">
            {websitePlans.map((plan, i) => (
              <TeaserPlanCard key={plan.id} plan={plan} index={i} t={t} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "150px" }}
            transition={{ duration: 0.4 }}
            className="border-border-subtle bg-surface/60 relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border p-6 text-center sm:flex-row sm:justify-between sm:p-7 sm:text-left"
          >
            <div
              aria-hidden
              className="bg-gradient-brand pointer-events-none absolute -inset-16 -z-10 rounded-full opacity-10 blur-3xl"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-body-lg text-foreground font-semibold">{t("customProject.heading")}</h3>
              <p className="text-caption text-foreground-secondary">{enterpriseTags.join(" · ")}</p>
              <p className="text-title text-foreground pt-1 font-semibold">{enterprisePlan.price.project}</p>
            </div>
            <RippleLink
              href={whatsappHref}
              target={whatsappHref.startsWith("http") ? "_blank" : undefined}
              rel={whatsappHref.startsWith("http") ? "noopener noreferrer" : undefined}
              className={cn(buttonVariants({ variant: "gradient", size: "md" }), "group w-full sm:w-auto")}
            >
              {t("customProject.primaryCta")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
            </RippleLink>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function TeaserPlanCard({ plan, index, t }: { plan: PricingPlan; index: number; t: ReturnType<typeof useTranslations> }) {
  const featured = plan.featured;
  const stroke = accentStroke[plan.accent];
  const topFeatures = plan.features.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={cn(
        "relative isolate flex flex-col gap-4 overflow-hidden rounded-2xl p-6 sm:p-7",
        featured ? "sm:-translate-y-3" : "border-border-subtle bg-surface/60 border backdrop-blur-md",
      )}
      style={
        featured
          ? {
              backgroundImage:
                "radial-gradient(120% 100% at 0% 0%, rgba(255,255,255,0.06), transparent 55%), linear-gradient(160deg, #0a0b14 0%, #13111f 55%, #0a0912 100%)",
              boxShadow: `0 20px 60px -20px ${accentTint(plan.accent, 45)}, inset 0 1px 0 rgba(255,255,255,0.08)`,
              border: `1px solid ${accentTint(plan.accent, 45)}`,
            }
          : undefined
      }
    >
      {featured ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 -z-10 h-32 w-32 rounded-full blur-3xl"
          style={{ backgroundColor: accentTint(plan.accent, 40) }}
        />
      ) : null}

      {featured ? (
        <span className="bg-gradient-brand flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white">
          <Sparkles className="h-3 w-3" aria-hidden />
          {t("homeTeaser.mostPopular")}
        </span>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <h3
          className={cn(
            "text-[13px] font-bold tracking-[0.08em] uppercase",
            featured ? "text-white" : "text-foreground",
          )}
        >
          {t(`plans.${plan.id}.name`)}
        </h3>
        <p className={cn("text-[14px] leading-[1.5]", featured ? "text-white/55" : "text-foreground-secondary")}>
          {t(`plans.${plan.id}.tagline`)}
        </p>
      </div>

      <p className={cn("flex items-baseline font-semibold", featured ? "text-white" : "text-foreground")}>
        <span style={{ fontSize: "28px", lineHeight: 1.1 }}>{plan.price.project}</span>
        <span className={cn("text-[15px] font-normal", featured ? "text-white/50" : "text-foreground-secondary")}>
          {plan.priceSuffix.project}
        </span>
      </p>

      <ul className="flex flex-col gap-2.5">
        {topFeatures.map((feature) => (
          <li
            key={feature}
            className={cn("flex items-center gap-2 text-[14px]", featured ? "text-white/75" : "text-foreground-secondary")}
          >
            <Check className="h-3.5 w-3.5 shrink-0" style={{ color: stroke }} aria-hidden />
            <span className="truncate">{t(`plans.${plan.id}.features.${feature}`)}</span>
          </li>
        ))}
      </ul>

      <RippleLink
        href={plan.ctaHref}
        className={cn(
          buttonVariants({ variant: featured ? "gradient" : "outline", size: "lg" }),
          "group mt-auto w-full",
        )}
      >
        {t(`plans.${plan.id}.cta`)}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
      </RippleLink>
    </motion.div>
  );
}
