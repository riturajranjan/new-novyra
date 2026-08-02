"use client";

import { useRef, type PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { FooterBackground } from "@/components/footer/footer-background";
import { FooterHero } from "@/components/footer/footer-hero";
import { CompanyInfoCard } from "@/components/footer/company-info-card";
import { FooterNavColumn } from "@/components/footer/footer-nav-column";
import { SocialGrid } from "@/components/footer/social-grid";
import { FooterBottom } from "@/components/footer/footer-bottom";
import { footerColumns } from "@/content/footer";

function Divider() {
  return (
    <div className="via-border-subtle relative h-px w-full overflow-hidden bg-gradient-to-r from-transparent to-transparent">
      <motion.span
        aria-hidden
        className="bg-gradient-brand absolute inset-y-0 left-0 w-1/3 opacity-70"
        initial={{ x: "-100%" }}
        whileInView={{ x: "300%" }}
        viewport={{ once: true, margin: "150px" }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
    </div>
  );
}

/** The site's closing scene — one compact floating glass container holding
 * every closing element, with a very subtle cursor-reactive spotlight over
 * the whole thing. Lives in the root layout (like the navbar) so it will
 * appear on every future page, not just this one. Deliberately tight on
 * padding/gaps throughout — this is the enterprise-compact pass, not the
 * original tall version. */
export function Footer() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(720px circle at ${mouseX}% ${mouseY}%, color-mix(in oklab, var(--color-brand-blue) 6%, transparent), transparent 70%)`;

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <footer className="relative isolate pt-12 pb-8 sm:py-10">
      <FooterBackground />

      <Container>
        <motion.div
          ref={ref}
          onPointerMove={handlePointerMove}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "150px" }}
          transition={{ duration: 0.5 }}
          className="glass-strong shadow-card relative flex flex-col gap-5 overflow-hidden rounded-2xl p-5 sm:p-6 lg:gap-7 lg:p-8"
        >
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: spotlight }} />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 rounded-t-[32px] bg-gradient-to-b from-white/8 to-transparent" />

          <FooterHero />

          <Divider />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <CompanyInfoCard />
            {footerColumns.map((column, i) => (
              <FooterNavColumn key={column.id} column={column} index={i} />
            ))}
          </div>

          <div className="flex justify-center lg:justify-end">
            <SocialGrid />
          </div>

          <FooterBottom />
        </motion.div>
      </Container>
    </footer>
  );
}
