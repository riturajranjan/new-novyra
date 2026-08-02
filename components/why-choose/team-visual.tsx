"use client";

import { motion, useReducedMotion } from "framer-motion";
import { accentStroke } from "@/lib/accent";
import { teamRoles } from "@/content/why-choose";

const codeLines = [78, 55, 92, 40, 68, 50];

/** An abstract "team at work" composition — a code editor, a floating
 * design canvas, and role-initial avatars — deliberately not a stock
 * photo. Matches the site's existing convention of geometric skeleton
 * mockups rather than staged photography. */
export function TeamVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="bg-gradient-mesh border-border-subtle relative aspect-[16/10] w-full overflow-hidden rounded-xl border lg:aspect-auto lg:h-[300px]">
      <div className="border-border-subtle bg-surface/70 absolute inset-5 overflow-hidden rounded-2xl border backdrop-blur-md">
        <div className="border-border-subtle flex items-center gap-1.5 border-b px-4 py-2.5">
          <span className="bg-foreground/15 h-2 w-2 rounded-full" />
          <span className="bg-foreground/15 h-2 w-2 rounded-full" />
          <span className="bg-foreground/15 h-2 w-2 rounded-full" />
          <span className="bg-foreground/5 text-foreground-secondary ml-2 h-5 flex-1 truncate rounded-full px-3 text-[10px] leading-5">
            novyra/product
          </span>
        </div>
        <div className="flex flex-col gap-2.5 p-5">
          {codeLines.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="bg-foreground/10 h-2 rounded-full"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>

      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="glass-strong shadow-card absolute right-6 bottom-8 flex h-28 w-40 flex-col gap-2 rounded-xl p-3.5"
      >
        <span className="bg-brand-purple h-2 w-2 rounded-full" />
        <span className="bg-foreground/10 h-1.5 w-3/4 rounded-full" />
        <span className="bg-gradient-brand mt-1 h-14 flex-1 rounded-lg opacity-40" />
      </motion.div>

      <div className="absolute top-6 left-6 flex -space-x-3">
        {teamRoles.map((role, i) => (
          <motion.span
            key={role.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "150px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass-strong shadow-card border-background flex h-11 w-11 items-center justify-center rounded-full border-2"
          >
            <span className="text-caption font-semibold" style={{ color: accentStroke[role.accent] }}>
              {role.initials}
            </span>
          </motion.span>
        ))}
      </div>
    </div>
  );
}
