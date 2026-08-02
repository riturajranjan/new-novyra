import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { OurPromise } from "@/components/sections/our-promise";
import { CoreServices } from "@/components/sections/core-services";
import { OurProcess } from "@/components/sections/our-process";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { SolutionAdvisor } from "@/components/sections/solution-advisor";
import { WhyChooseNovyra } from "@/components/sections/why-choose-novyra";
import { CaseStudies } from "@/components/sections/case-studies";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { ContactCta } from "@/components/sections/contact-cta";

interface PageProps {
  params: Promise<{ locale: string }>;
}

/** Homepage flow: hero → the honest operating promise → how a project
 * moves (process) → the interactive service explorer, with the solution
 * advisor right after it for anyone still unsure which service they need
 * → capabilities/technology → concept work → pricing → FAQ → contact.
 * Previously ordered services-first with the promise section buried after
 * case studies; this reads as one edited narrative instead — credibility
 * before the pitch, decision-support right where someone would want it. */
export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative w-full max-w-full min-w-0 flex-1 overflow-x-clip">
      <Hero />
      <OurPromise />
      <CoreServices />
      <OurProcess />
      <ServicesShowcase />
      <SolutionAdvisor />
      <WhyChooseNovyra />
      <CaseStudies />
      <Pricing />
      <Faq />
      <ContactCta />
    </main>
  );
}
