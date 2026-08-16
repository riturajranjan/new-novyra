"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Magnetic } from "@/components/ui/magnetic";
import { RippleLink } from "@/components/ui/ripple-link";
import { OrbitalMark } from "@/components/footer/orbital-mark";
import { OrbitalField } from "@/components/visual-backgrounds/orbital-field";
import { footerCtas } from "@/content/footer";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PARTICLES = [
  { top: "18%", left: "8%" },
  { top: "72%", left: "14%" },
  { top: "24%", left: "92%" },
  { top: "80%", left: "88%" },
];

/** "Orbital Communication Field" — a very dark, understated backdrop: a
 * faint grid, three restrained glows, a handful of tiny particles, and one
 * large orbital ring system anchored toward the CTA buttons (partially
 * bleeding past the panel's own edge) so the composition quietly points at
 * "Start Your Project" instead of sitting there as pure decoration. */
function ProjectCtaBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,140,180,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(120,140,180,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="bg-brand-blue/14 absolute top-1/2 left-0 h-64 w-64 -translate-y-1/2 rounded-full blur-[110px]" />
      <div className="bg-brand-purple/12 absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
      <div className="bg-brand-blue/10 absolute top-1/2 right-0 h-64 w-64 -translate-y-1/2 rounded-full blur-[110px]" />

      <OrbitalField size={340} opacity={0.14} className="top-1/2 right-[-8%] -translate-y-1/2" />

      <svg aria-hidden viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute top-1/2 right-0 hidden h-[60%] w-[30%] -translate-y-1/2 opacity-[0.14] sm:block">
        <line x1="0" y1="30" x2="380" y2="100" stroke="var(--color-brand-blue)" strokeWidth="0.75" className="animate-tiny-pulse" />
        <line
          x1="0"
          y1="170"
          x2="380"
          y2="100"
          stroke="var(--color-brand-purple)"
          strokeWidth="0.75"
          className="animate-tiny-pulse"
          style={{ animationDelay: "1.4s" }}
        />
      </svg>

      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="animate-tiny-pulse absolute h-1 w-1 rounded-full"
          style={{
            top: p.top,
            left: p.left,
            backgroundColor: i % 2 === 0 ? "var(--color-brand-blue)" : "var(--color-brand-purple)",
            animationDelay: `${i * 1.1}s`,
          }}
        />
      ))}
    </div>
  );
}

/** The footer's opening panel — "Have a Project in Mind?" — a compact,
 * horizontal CTA (orbital mark, headline, two real actions) rather than a
 * centered hero block. This is the site's `id="contact"`-free secondary
 * CTA: the primary one (with its own dedicated `#contact` anchor) still
 * lives in `components/sections/contact-cta.tsx`, shared with /services
 * and left untouched — this panel is the footer's own, sitewide echo of
 * it, matching the approved reference composition. */
export function ProjectCta() {
  const t = useTranslations("footer");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.6, ease: easePremium }}
      className="relative isolate flex flex-col items-start gap-8 overflow-hidden rounded-3xl border p-6 sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
      style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "#050816" }}
    >
      <ProjectCtaBackground />

      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-7">
        <OrbitalMark />

        <div className="flex flex-col gap-3">
          <span className="text-brand-blue text-[12px] font-semibold tracking-[0.14em] uppercase sm:text-[13px]">
            {t("cta.label")}
          </span>
          <h2
            className="text-foreground max-w-lg text-balance font-semibold"
            style={{ fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1.05 }}
          >
            {t("cta.headingBefore")} <span className="text-gradient-brand">{t("cta.headingHighlight")}</span> {t("cta.headingAfter")}
          </h2>
          <p className="text-foreground-secondary max-w-md text-pretty" style={{ fontSize: "15px", lineHeight: 1.6 }}>
            {t("cta.tagline")}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-stretch gap-4 lg:w-auto lg:flex-row lg:items-center">
        <div className="bg-border-subtle hidden h-14 w-px shrink-0 lg:block" aria-hidden />

        <div className="flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
          {footerCtas.map((cta) => {
            const Icon = cta.icon;
            const external = cta.href.startsWith("http");
            const label = t(`ctas.${cta.id}`);
            const featured = cta.variant === "gradient";

            return (
              <Magnetic key={cta.id} className="w-full sm:w-auto">
                <RippleLink
                  href={cta.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "group focus-visible:ring-offset-background relative flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[11px] px-6 text-[15px] font-semibold whitespace-nowrap transition-[transform,border-color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:outline-none focus-visible:ring-offset-2 sm:w-auto",
                    featured
                      ? "bg-gradient-brand text-white shadow-glow-blue hover:-translate-y-0.5 hover:shadow-glow-purple"
                      : "border text-white hover:-translate-y-0.5 hover:bg-white/[0.06]",
                  )}
                  style={!featured ? { borderColor: "rgba(255,255,255,0.14)" } : undefined}
                >
                  {featured ? (
                    <span
                      aria-hidden
                      className="bg-gradient-shimmer pointer-events-none absolute inset-0 -translate-x-full overflow-hidden rounded-[11px] transition-transform duration-700 ease-out group-hover:translate-x-full"
                    />
                  ) : null}
                  {featured ? null : <Icon className="h-4 w-4 shrink-0" aria-hidden />}
                  {label}
                  {featured ? (
                    <Icon
                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  ) : null}
                </RippleLink>
              </Magnetic>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
