import { useTranslations } from "next-intl";
import { processSteps } from "@/content/process-steps";
import { accentStroke, accentTint } from "@/lib/accent";

/** The hero's centerpiece — what Novyra's own delivery workflow looks like,
 * not a stock product-dashboard render: the same six stages every engagement
 * moves through, imported directly from content/process-steps.ts so this
 * preview can't drift out of sync with the homepage's process section.
 *
 * Server-rendered. The card and its six rows paint immediately — the outer
 * card's single entrance is owned by the hero's CSS timeline, so the rows no
 * longer each run their own mount animation (previously six independent
 * Framer entrances). The only motion here is the ambient traveling pulse on
 * the rail, a CSS keyframe (`animate-hero-pulse`) disabled under
 * prefers-reduced-motion via the global rule. */
export function HeroWorkflowVisual() {
  const t = useTranslations("hero.workflow");

  return (
    <div className="relative mx-auto flex w-full max-w-105 items-center justify-center py-6 md:max-w-115 lg:mx-0 lg:ml-auto lg:max-w-125">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-brand-blue absolute top-[8%] left-[4%] h-56 w-56 rounded-full opacity-[0.2] blur-[90px]" />
        <div className="bg-brand-purple absolute top-[2%] right-[6%] h-64 w-64 rounded-full opacity-[0.2] blur-[100px]" />
        <div className="bg-brand-emerald absolute bottom-[6%] left-1/3 h-52 w-52 rounded-full opacity-[0.14] blur-[90px]" />
      </div>

      <div className="glass-strong shadow-card-hover relative w-full overflow-hidden rounded-[28px] p-6 sm:p-8">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/8 to-transparent" />

        <p className="text-caption text-foreground-secondary mb-6 font-semibold tracking-[0.14em] uppercase">{t("label")}</p>

        <div className="relative flex flex-col">
          <span
            aria-hidden
            className="absolute top-5 bottom-5 left-[19px] w-px"
            style={{ background: "linear-gradient(to bottom, var(--color-brand-blue), var(--color-brand-cyan), var(--color-brand-purple), var(--color-brand-pink), var(--color-brand-amber), var(--color-brand-emerald))" }}
          />
          <span
            aria-hidden
            className="animate-hero-pulse absolute left-[15px] top-[4%] h-8 w-8 rounded-full blur-md"
            style={{ background: "var(--color-brand-blue)", opacity: 0.5 }}
          />

          {processSteps.map((stage) => {
            const Icon = stage.icon;
            const stroke = accentStroke[stage.accent];
            return (
              <div
                key={stage.id}
                className="relative flex items-center gap-4 py-3"
              >
                <span
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2"
                  style={{ borderColor: stroke, backgroundColor: accentTint(stage.accent, 16) }}
                >
                  <Icon className="h-4.5 w-4.5" style={{ color: stroke }} aria-hidden />
                </span>
                <div className="flex flex-col">
                  <span className="text-body-sm text-foreground font-semibold">{t(`stages.${stage.id}.label`)}</span>
                  <span className="text-caption text-foreground-secondary">{t(`stages.${stage.id}.detail`)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
