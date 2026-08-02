"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { LinkedinGlyph, GithubGlyph } from "@/components/footer/social-icons";
import { ownershipCommitments, founderProfile, founderExpertise } from "@/content/about";
import { accentStroke, accentTint } from "@/lib/accent";
import { fadeInUp } from "@/lib/motion";

/** Founder section — a real name, role, and links, not a generic "our
 * team" statement. No stock employee photo either: an initials avatar
 * (RR) standing in until a real headshot is provided, sized so swapping
 * in an actual photo later is a one-line change, not a layout rework. */
export function FounderDirection() {
  const t = useTranslations("about.founder");
  const bio = t.raw("bio") as string[];

  return (
    <section className="relative isolate py-14 md:py-20">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={fadeInUp}
          className="relative mx-auto flex w-full max-w-100 flex-col items-center gap-4 lg:mx-0"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-brand-blue absolute top-[10%] left-[10%] h-40 w-40 rounded-full opacity-20 blur-[80px]" />
            <div className="bg-brand-purple absolute right-[10%] bottom-[10%] h-44 w-44 rounded-full opacity-20 blur-[90px]" />
          </div>
          <span
            className="text-display-lg flex h-32 w-32 shrink-0 items-center justify-center rounded-full font-semibold text-white sm:h-36 sm:w-36"
            style={{ backgroundImage: "linear-gradient(135deg, var(--color-brand-blue), var(--color-brand-purple) 55%, var(--color-brand-pink))" }}
          >
            {founderProfile.initials}
          </span>
          <div className="flex flex-col items-center gap-0.5 text-center">
            <span className="text-title-lg text-foreground font-semibold">{founderProfile.name}</span>
            <span className="text-body-sm text-foreground-secondary">{t("role")}</span>
            <span className="text-gradient-brand text-caption mt-1 font-semibold">{t("tagline")}</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={founderProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="glass hover:border-brand-blue/40 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-fast"
            >
              <LinkedinGlyph className="text-foreground-secondary h-4 w-4" aria-hidden />
            </a>
            <a
              href={founderProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="glass hover:border-brand-blue/40 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-fast"
            >
              <GithubGlyph className="text-foreground-secondary h-4 w-4" aria-hidden />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "120px" }}
          variants={fadeInUp}
          className="flex flex-col gap-5"
        >
          <span className="text-gradient-brand text-sm font-semibold tracking-[0.14em] uppercase">{t("eyebrow")}</span>
          <h2 className="text-headline sm:text-display-lg max-w-140 font-semibold tracking-[-0.03em] text-foreground text-balance">
            {t("title")}
          </h2>
          <div className="flex max-w-145 flex-col gap-4">
            {bio.map((paragraph, i) => (
              <p key={i} className="text-body-lg text-foreground-secondary text-pretty leading-[1.65]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {founderExpertise.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.id}
                  className="border-border-subtle text-caption text-foreground-secondary inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 font-medium"
                >
                  <Icon className="h-3 w-3" aria-hidden />
                  {t(`expertise.${item.id}`)}
                </span>
              );
            })}
          </div>

          <div className="mt-2 flex flex-wrap gap-3">
            {ownershipCommitments.map((commitment) => {
              const Icon = commitment.icon;
              return (
                <span
                  key={commitment.id}
                  className="glass text-caption text-foreground-secondary inline-flex items-center gap-2 rounded-pill px-3.5 py-2 font-medium"
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full"
                    style={{ background: accentTint(commitment.accent, 18) }}
                  >
                    <Icon className="h-3 w-3" style={{ color: accentStroke[commitment.accent] }} aria-hidden />
                  </span>
                  {t(`commitments.${commitment.id}`)}
                </span>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
