import type { Transition, Variants } from "framer-motion";

export const easePremium: Transition["ease"] = [0.16, 1, 0.3, 1];

/** GSAP's `power3.out` has no native Framer Motion equivalent — this is
 * the standard cubic-bezier approximation (~easeOutQuart) used for
 * content-swap transitions that need that specific, slightly snappier
 * decelerate feel. */
export const easePowerOut: Transition["ease"] = [0.165, 0.84, 0.44, 1];

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easePremium },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easePremium } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easePremium },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};
