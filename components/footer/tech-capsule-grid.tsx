"use client";

import { useTranslations } from "next-intl";
import { TechCapsule } from "@/components/footer/tech-capsule";
import { techCapsules } from "@/content/footer";

/** The full technology stack as a floating grid of glass capsules. */
export function TechCapsuleGrid() {
  const t = useTranslations("footer.techStack");

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-caption text-foreground-secondary text-center font-semibold tracking-wide uppercase">
        {t("heading")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {techCapsules.map((tech, i) => (
          <TechCapsule key={tech.name} name={tech.name} color={tech.color} index={i} />
        ))}
      </div>
    </div>
  );
}
