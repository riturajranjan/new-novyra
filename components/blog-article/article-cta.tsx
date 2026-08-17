import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { RippleLink } from "@/components/ui/ripple-link";
import { ArticleCtaBackground } from "@/components/blog-article/article-cta-background";
import { cn } from "@/lib/utils";

/** A compact end-of-article conversion strip — not article content (it
 * sits outside the `<article>` landmark), one bordered panel with a
 * small abstract geometric visual instead of a giant gradient block. */
export async function ArticleCTA() {
  const t = await getTranslations("blogArticle.cta");

  return (
    <section className="relative isolate overflow-hidden py-14 md:py-18">
      <ArticleCtaBackground />

      <Container>
        <div
          className="relative isolate flex flex-col items-center gap-8 overflow-hidden rounded-[24px] border p-6 text-center sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:text-left"
          style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(8,13,28,0.6)" }}
        >
          <div className="flex flex-col items-center gap-3 lg:items-start">
            <h2 className="text-title-lg text-foreground max-w-md font-semibold text-balance">{t("heading")}</h2>
            <p className="text-body-sm text-foreground-secondary max-w-md text-pretty">{t("description")}</p>

            <div className="mt-2 flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
              <RippleLink href="/contact" className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "group relative w-full overflow-hidden sm:w-auto")}>
                {t("primaryCta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5" aria-hidden />
              </RippleLink>
              <Link href="/work" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}>
                {t("secondaryCta")}
              </Link>
            </div>
          </div>

          <GeometricVisual />
        </div>
      </Container>
    </section>
  );
}

/** A small abstract 3D-perspective geometric composition — three
 * overlapping, differently-tilted translucent panels with thin
 * connecting edges, standing in for "structured, engineered product
 * work" rather than a literal illustration. Pure CSS, no image. */
function GeometricVisual() {
  return (
    <div aria-hidden className="relative hidden h-40 w-40 shrink-0 lg:block">
      <span
        className="absolute top-2 left-6 h-24 w-24 rounded-2xl border"
        style={{ borderColor: "color-mix(in oklab, var(--color-brand-blue) 45%, transparent)", backgroundColor: "color-mix(in oklab, var(--color-brand-blue) 10%, transparent)", transform: "perspective(600px) rotateX(50deg) rotateZ(-8deg)" }}
      />
      <span
        className="absolute top-10 left-2 h-24 w-24 rounded-2xl border"
        style={{ borderColor: "color-mix(in oklab, var(--color-brand-purple) 45%, transparent)", backgroundColor: "color-mix(in oklab, var(--color-brand-purple) 12%, transparent)", transform: "perspective(600px) rotateX(50deg) rotateZ(6deg)" }}
      />
      <span
        className="absolute top-16 left-10 h-20 w-20 rounded-2xl border"
        style={{ borderColor: "color-mix(in oklab, var(--color-brand-pink) 40%, transparent)", backgroundColor: "color-mix(in oklab, var(--color-brand-pink) 10%, transparent)", transform: "perspective(600px) rotateX(50deg) rotateZ(-14deg)" }}
      />
      <span
        className="absolute top-16 left-16 h-2 w-2 rounded-full"
        style={{ backgroundColor: "var(--color-brand-blue)", boxShadow: "0 0 12px 2px var(--color-brand-blue)" }}
      />
    </div>
  );
}
