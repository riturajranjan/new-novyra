"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RippleLink } from "@/components/ui/ripple-link";
import { buttonVariants } from "@/components/ui/button";
import { conceptBuilds, type ConceptBuild } from "@/content/case-studies";
import { accentStroke, accentTint } from "@/lib/accent";
import { easePremium, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface CaseStudyDetailProps {
  /** Looked up here (not received as a build object prop) — `icon` is a
   * component reference, which can't cross the Server → Client Component
   * boundary as serialized props. content/case-studies.ts is a plain data
   * module safe to import on either side. */
  slug: string;
}

function SectionHeading({ eyebrow, heading, stroke }: { eyebrow: string; heading: string; stroke: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-caption inline-flex w-fit items-center gap-2 font-mono font-medium tracking-[0.2em] uppercase" style={{ color: stroke }}>
        <span className="h-px w-6" style={{ backgroundColor: stroke, opacity: 0.4 }} aria-hidden />
        {eyebrow}
      </span>
      <h2 className="text-foreground font-semibold text-balance" style={{ fontSize: "clamp(24px, 2.4vw, 34px)", lineHeight: 1.16, letterSpacing: "-0.02em" }}>
        {heading}
      </h2>
    </div>
  );
}

function RelatedWorkCard({ build }: { build: ConceptBuild }) {
  const tBuild = useTranslations(`caseStudies.builds.${build.id}`);
  const stroke = accentStroke[build.accent];
  const Icon = build.icon;

  return (
    <RippleLink
      href={`/work/${build.id}`}
      className="group border-border-subtle relative flex flex-col overflow-hidden rounded-2xl border transition-colors duration-base hover:border-white/20"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden">
        {build.image ? (
          <Image src={build.image} alt="" fill loading="lazy" sizes="360px" className="object-cover object-top transition-transform duration-slow group-hover:scale-[1.03]" />
        ) : null}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <span className="text-caption flex items-center gap-1.5 font-semibold tracking-wide uppercase" style={{ color: stroke }}>
          <Icon className="h-3 w-3" aria-hidden />
          {tBuild("industryLabel")}
        </span>
        <span className="text-body-sm text-foreground font-semibold">{tBuild("title")}</span>
      </div>
    </RippleLink>
  );
}

/** The /work/[slug] case study template — Hero → Overview → Challenge →
 * Approach → Experience (a real screenshot gallery, when the build has one)
 * → Admission Journey (when the build has one) → Responsive Experience
 * (desktop/mobile screenshots) → Key Areas → Technology → Outcome →
 * Related Work → CTA. Only rendered for builds with a `demoUrl` (see
 * content/case-studies.ts `caseStudySlugs`) — every section pulls from
 * real, non-fabricated copy in messages/{locale}/caseStudies.json, and the
 * Outcome section deliberately states what the concept demonstrates rather
 * than inventing a business metric. The gallery and admission-journey
 * sections are optional per build (`galleryImages`/`hasAdmissionJourney`)
 * so this template stays generic rather than growing one-off branches. */
export function CaseStudyDetail({ slug }: CaseStudyDetailProps) {
  const build = conceptBuilds.find((b) => b.id === slug)!;
  const t = useTranslations("caseStudies");
  const tp = useTranslations("caseStudies.caseStudyPage");
  const tBuild = useTranslations(`caseStudies.builds.${build.id}`);
  const Icon = build.icon;
  const stroke = accentStroke[build.accent];
  const keyAreas = tBuild.raw("keyAreas") as string[];
  const admissionSteps = build.hasAdmissionJourney ? (tBuild.raw("admissionJourney.steps") as { title: string }[]) : [];
  const relatedBuilds = conceptBuilds
    .filter((b) => b.id !== build.id && b.category === build.category && b.demoUrl)
    .slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden pt-24 pb-10 md:pt-28 md:pb-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{ backgroundImage: `radial-gradient(60% 60% at 50% 0%, ${accentTint(build.accent, 12)}, transparent 70%)` }}
        />
        <Container className="flex flex-col gap-6">
          <RippleLink href="/work" className="group text-caption flex w-fit items-center gap-1.5 font-semibold text-white/50 transition-colors duration-base hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-fast group-hover:-translate-x-0.5" aria-hidden />
            {tp("backToWork")}
          </RippleLink>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-caption inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 font-semibold tracking-wide uppercase"
              style={{ borderColor: accentTint(build.accent, 35), color: stroke, backgroundColor: accentTint(build.accent, 12) }}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
              {tBuild("industryLabel")}
            </span>
            <span className="text-[10px] font-medium tracking-[0.14em] text-white/35 uppercase">{tp("liveDemoBadge")}</span>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-foreground max-w-3xl font-semibold text-balance" style={{ fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)", lineHeight: 1.06, letterSpacing: "-0.03em" }}>
              {tBuild("title")}
            </h1>
            <p className="text-body-lg max-w-2xl text-balance" style={{ color: stroke }}>
              {tBuild("tagline")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {build.demoUrl ? (
              <RippleLink href={build.demoUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "gradient", size: "md" }), "group w-fit")}>
                {tp("viewLiveDemo")}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </RippleLink>
            ) : null}
            <RippleLink href="/contact" className={cn(buttonVariants({ variant: "outline", size: "md" }), "w-fit")}>
              {t("card.startSimilarProject")}
            </RippleLink>
          </div>

          <p className="text-caption max-w-2xl text-white/35">{tp("liveDemoDisclosure")}</p>

          {build.image ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easePremium, delay: 0.1 }}
              className="relative mt-2 aspect-16/10 w-full overflow-hidden rounded-[24px] border md:rounded-[32px]"
              style={{ borderColor: accentTint(build.accent, 30), boxShadow: `0 40px 100px -40px ${accentTint(build.accent, 45)}` }}
            >
              <Image
                src={build.image}
                alt={`${tBuild("title")} — desktop homepage screenshot`}
                fill
                priority
                sizes="(min-width: 1024px) 1100px, 100vw"
                className="object-cover object-top"
              />
            </motion.div>
          ) : null}
        </Container>
      </section>

      <section className="relative isolate py-10 md:py-14">
        <Container className="flex flex-col gap-16 md:gap-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} variants={fadeInUp} className="flex flex-col gap-4">
            <SectionHeading eyebrow={tp("overview.eyebrow")} heading={tp("overview.heading")} stroke={stroke} />
            <p className="text-body text-foreground-secondary max-w-2xl text-pretty">{tBuild("description")}</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} variants={fadeInUp} className="flex flex-col gap-4">
              <SectionHeading eyebrow={tp("challenge.eyebrow")} heading={tp("challenge.heading")} stroke={stroke} />
              <p className="text-body-sm text-foreground-secondary text-pretty">{tBuild("challenge")}</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} variants={fadeInUp} className="flex flex-col gap-4">
              <SectionHeading eyebrow={tp("approach.eyebrow")} heading={tp("approach.heading")} stroke={stroke} />
              <p className="text-body-sm text-foreground-secondary text-pretty">{tBuild("approach")}</p>
            </motion.div>
          </div>

          {build.galleryImages && build.galleryImages.length > 0 ? (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} variants={fadeInUp} className="flex flex-col gap-6">
              <SectionHeading eyebrow={tp("experience.eyebrow")} heading={tp("experience.heading")} stroke={stroke} />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {build.galleryImages.map((shot) => (
                  <div key={shot.id} className="flex flex-col gap-2.5">
                    <span className="text-caption font-semibold tracking-wide text-white/40 uppercase">{tBuild(`gallery.${shot.id}.label`)}</span>
                    <div
                      className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border"
                      style={{ borderColor: accentTint(build.accent, 25), boxShadow: `0 20px 50px -28px ${accentTint(build.accent, 40)}` }}
                    >
                      <Image
                        src={shot.src}
                        alt={tBuild(`gallery.${shot.id}.alt`)}
                        fill
                        loading="lazy"
                        sizes="(min-width: 640px) 560px, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}

          {admissionSteps.length > 0 ? (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} variants={fadeInUp} className="flex flex-col gap-6">
              <SectionHeading eyebrow={tp("admissionJourney.eyebrow")} heading={tBuild("admissionJourney.heading")} stroke={stroke} />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0">
                {admissionSteps.map((step, i) => (
                  <div key={step.title} className="relative flex flex-1 items-center gap-3 sm:flex-col sm:items-start sm:gap-3 sm:px-4 sm:first:pl-0">
                    {i > 0 ? (
                      <span aria-hidden className="hidden h-px flex-1 self-center sm:absolute sm:top-[15px] sm:right-full sm:block sm:w-4" style={{ backgroundColor: accentTint(build.accent, 30) }} />
                    ) : null}
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold"
                      style={{ borderColor: accentTint(build.accent, 40), color: stroke, backgroundColor: accentTint(build.accent, 10) }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body-sm text-foreground font-semibold">{step.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} variants={fadeInUp} className="flex flex-col gap-6">
            <SectionHeading eyebrow={tp("responsiveExperience.eyebrow")} heading={tp("responsiveExperience.heading")} stroke={stroke} />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.6fr_1fr] md:items-start">
              {build.image ? (
                <div className="flex flex-col gap-2.5">
                  <span className="text-caption font-semibold tracking-wide text-white/40 uppercase">{tp("responsiveExperience.desktopLabel")}</span>
                  <div
                    className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border"
                    style={{ borderColor: accentTint(build.accent, 25), boxShadow: `0 24px 60px -30px ${accentTint(build.accent, 40)}` }}
                  >
                    <Image
                      src={build.image}
                      alt={`${tBuild("title")} — desktop interface`}
                      fill
                      loading="lazy"
                      sizes="(min-width: 768px) 700px, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              ) : null}
              {build.mobileImage ? (
                <div className="flex flex-col gap-2.5">
                  <span className="text-caption font-semibold tracking-wide text-white/40 uppercase">{tp("responsiveExperience.mobileLabel")}</span>
                  <div
                    className="relative mx-auto aspect-9/16 w-full max-w-64 overflow-hidden rounded-[22px] border-4"
                    style={{ borderColor: accentTint(build.accent, 30), boxShadow: `0 24px 60px -30px ${accentTint(build.accent, 40)}` }}
                  >
                    <Image
                      src={build.mobileImage}
                      alt={`Responsive ${tBuild("title").toLowerCase()} concept shown on a mobile screen`}
                      fill
                      loading="lazy"
                      sizes="260px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} variants={fadeInUp} className="flex flex-col gap-6">
            <SectionHeading eyebrow={tp("keyAreas.eyebrow")} heading={tp("keyAreas.heading")} stroke={stroke} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {keyAreas.map((area) => (
                <div key={area} className="border-border-subtle rounded-xl border px-3.5 py-3 text-center" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                  <span className="text-body-sm text-foreground font-medium">{area}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} variants={fadeInUp} className="flex flex-col gap-4">
              <SectionHeading eyebrow={tp("technology.eyebrow")} heading={tp("technology.heading")} stroke={stroke} />
              <div className="flex flex-wrap gap-2">
                {build.techStack.map((tech) => (
                  <span key={tech} className="border-border-subtle text-caption text-foreground-secondary rounded-full border px-3 py-1.5">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "100px" }}
              variants={fadeInUp}
              className="flex flex-col gap-4 rounded-2xl border p-6"
              style={{ borderColor: accentTint(build.accent, 20), backgroundColor: "rgba(255,255,255,0.02)" }}
            >
              <SectionHeading eyebrow={tp("outcome.eyebrow")} heading={tp("outcome.heading")} stroke={stroke} />
              <p className="text-body-sm text-foreground-secondary text-pretty">{tp("outcome.statement")}</p>
            </motion.div>
          </div>

          {relatedBuilds.length > 0 ? (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} variants={fadeInUp} className="flex flex-col gap-6">
              <SectionHeading eyebrow={tp("relatedWork.eyebrow")} heading={tp("relatedWork.heading")} stroke={stroke} />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {relatedBuilds.map((related) => (
                  <RelatedWorkCard key={related.id} build={related} />
                ))}
              </div>
            </motion.div>
          ) : null}
        </Container>
      </section>

      <section className="relative isolate overflow-hidden py-14 md:py-18">
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
              <h3 className="text-title-lg text-foreground font-semibold text-balance">{tp("cta.heading")}</h3>
              <p className="text-body-sm text-foreground-secondary max-w-md text-pretty">{tp("cta.description")}</p>
            </div>

            <div className="flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
              <RippleLink href="/contact" className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group relative w-full overflow-hidden sm:w-auto")}>
                {tp("cta.primary")}
                <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
              </RippleLink>
              <RippleLink href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}>
                {tp("cta.secondary")}
              </RippleLink>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
