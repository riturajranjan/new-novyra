import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";

interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalPageProps {
  /** "privacy" or "terms" — keyed under the `legal` message namespace. */
  page: "privacy" | "terms";
  locale: string;
}

/** Plain, editorial layout for the two real legal pages — no glass cards or
 * motion. Legal content should read as a document, not a product surface;
 * keeping this visually calm is deliberate contrast against the rest of the
 * site's interactive sections, not an oversight. */
export async function LegalPage({ page, locale }: LegalPageProps) {
  const t = await getTranslations({ locale, namespace: `legal.${page}` });
  const sections = t.raw("sections") as LegalSection[];

  return (
    <main className="relative w-full max-w-full min-w-0 flex-1 overflow-x-clip py-28 md:py-36">
      <Container>
        <article className="mx-auto flex max-w-[680px] flex-col gap-8">
          <header className="flex flex-col gap-2">
            <h1 className="text-headline sm:text-display-lg text-foreground font-semibold">{t("heading")}</h1>
            <p className="text-caption text-foreground-secondary">{t("updated")}</p>
            <p className="text-body text-foreground-secondary mt-3 leading-[1.7]">{t("intro")}</p>
          </header>

          <div className="border-border-subtle flex flex-col gap-8 border-t pt-8">
            {sections.map((section, i) => (
              <section key={i} className="flex flex-col gap-3">
                <h2 className="text-title text-foreground font-semibold">{section.heading}</h2>
                {section.paragraphs.map((paragraph, j) => (
                  <p key={j} className="text-body-sm text-foreground-secondary leading-[1.7]">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </Container>
    </main>
  );
}
