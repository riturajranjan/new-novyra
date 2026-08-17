"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { conceptBuilds } from "@/content/case-studies";
import { accentTint } from "@/lib/accent";
import { cn } from "@/lib/utils";

/** The three real, image-backed concepts that read best stacked as
 * product windows — Care OS, Campus OS, Cloud Console — matching the
 * "01/CARE 02/CAMPUS 03/CLOUD" index labels. Chosen for real assets, not
 * hand-picked favorites: all three already have a real image under
 * public/work/ and a real Novyra product name. */
const STACK_IDS = ["hospital-platform", "school-erp", "ai-saas-dashboard"] as const;
const STACK_LABELS = ["CARE", "CAMPUS", "CLOUD"];

const LAYOUT = [
  { top: "8%", left: "6%", width: "76%", z: 1, rotate: -3, scale: 0.94, opacity: 0.55 },
  { top: "16%", left: "22%", width: "76%", z: 2, rotate: 2, scale: 0.97, opacity: 0.75 },
  { top: "24%", left: "12%", width: "80%", z: 3, rotate: 0, scale: 1, opacity: 1 },
];

/** The Work hero's signature visual — a cinematic Product Stack: three
 * real project interfaces arranged in shallow perspective (front window
 * dominant, two partially visible behind), thin connective lines and
 * index labels standing in for "a curated archive," not a browser
 * mockup or an illustration. */
export function WorkProductStack() {
  const t = useTranslations("caseStudies");
  const reduceMotion = useReducedMotion();
  const builds = STACK_IDS.map((id) => conceptBuilds.find((b) => b.id === id)!);

  return (
    <div className="relative mx-auto aspect-[6/5] w-full max-w-125">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-brand-blue absolute top-[2%] right-[4%] h-40 w-40 rounded-full opacity-[0.14] blur-[90px]" />
        <div className="bg-brand-purple absolute bottom-[6%] left-[2%] h-44 w-44 rounded-full opacity-[0.12] blur-[95px]" />
      </div>

      {builds.map((build, i) => {
        const layout = LAYOUT[i];
        const isFront = i === builds.length - 1;
        return (
          <motion.div
            key={build.id}
            className={cn("absolute overflow-hidden rounded-xl border shadow-2xl", i === 0 && "hidden sm:block")}
            style={{
              top: layout.top,
              left: layout.left,
              width: layout.width,
              aspectRatio: "16/10",
              zIndex: layout.z,
              opacity: layout.opacity,
              borderColor: isFront ? accentTint(build.accent, 40) : "rgba(255,255,255,0.1)",
              transform: `rotate(${layout.rotate}deg) scale(${layout.scale})`,
              boxShadow: isFront ? `0 30px 70px -24px ${accentTint(build.accent, 45)}` : "0 20px 50px -20px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={
              reduceMotion
                ? { opacity: layout.opacity, y: 0 }
                : { opacity: layout.opacity, y: [0, -4, 0] }
            }
            transition={
              reduceMotion
                ? { duration: 0.4, delay: 0.3 + i * 0.1 }
                : { opacity: { duration: 0.4, delay: 0.3 + i * 0.1 }, y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 } }
            }
          >
            <div className="bg-background relative h-full w-full" style={{ backgroundColor: "#0a0e1c" }}>
              {build.image ? (
                <Image src={build.image} alt="" fill sizes="500px" className="object-cover" priority={isFront} />
              ) : (
                <div className="h-full w-full" style={{ backgroundImage: `linear-gradient(155deg, ${accentTint(build.accent, 28)}, #0a0e1c 70%)` }} />
              )}
              <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.15), transparent 30%, rgba(0,0,0,0.35))" }} />
              {isFront ? (
                <div className="absolute top-2.5 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-semibold tracking-[0.12em] text-white/70 uppercase">
                    {String(i + 1).padStart(2, "0")} / {STACK_LABELS[i]}
                  </span>
                </div>
              ) : null}
            </div>
          </motion.div>
        );
      })}

      {/* Thin connective line + a persistent index label under the stack */}
      <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2">
        <span className="h-px w-8" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} aria-hidden />
        <span className="text-caption font-mono text-white/30 uppercase">{t("stack.label")}</span>
        <span className="h-px w-8" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} aria-hidden />
      </div>
    </div>
  );
}
