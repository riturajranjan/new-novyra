import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CalendarCheck,
  ClipboardList,
  FileCode2,
  GraduationCap,
  HeartPulse,
  Landmark,
  LifeBuoy,
  MessagesSquare,
  Receipt,
  ShieldCheck,
  Store,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import type { AccentColor } from "@/content/hero-screens";

/** "Our Promise" replaces a conventional testimonials section. Novyra is a
 * new studio with no completed client engagements yet, so there are no real
 * quotes, ratings, or review-platform badges to show honestly. Every claim
 * here is a forward-looking operating commitment (how we work) rather than a
 * backward-looking track record (who we've worked with, what they said). */

export interface TrustBarItem {
  id: string;
  icon: LucideIcon;
}

/** Structural data only — label/detail text lives in
 * messages/{locale}/promise.json under `trustBar.<id>`. */
export const trustBarItems: TrustBarItem[] = [
  { id: "scope-first", icon: ClipboardList },
  { id: "direct-access", icon: MessagesSquare },
  { id: "fixed-price-clarity", icon: Wallet },
  { id: "weekly-demos", icon: CalendarCheck },
  { id: "full-code-ownership", icon: FileCode2 },
  { id: "post-launch-support", icon: LifeBuoy },
];

/** All text for the featured "how we work" card (eyebrow/title/description/
 * bullets/metric) lives in messages/{locale}/promise.json under
 * `featuredCommitment` — there's no per-locale structural data to keep
 * here, so this content module intentionally has no export for it. */

export interface CommitmentCard {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
  /** Out of 6 grid columns — controls the bento asymmetry. */
  span: number;
}

/** Structural data only — title/description text lives in
 * messages/{locale}/promise.json under `commitmentCards.<id>`. */
export const commitmentCards: CommitmentCard[] = [
  { id: "direct-communication", icon: MessagesSquare, accent: "blue", span: 3 },
  { id: "fixed-pricing", icon: Receipt, accent: "emerald", span: 3 },
  { id: "weekly-demos", icon: CalendarCheck, accent: "purple", span: 2 },
  { id: "code-ownership", icon: FileCode2, accent: "cyan", span: 2 },
  { id: "post-launch-support", icon: LifeBuoy, accent: "amber", span: 2 },
  { id: "auditable-stack", icon: ShieldCheck, accent: "pink", span: 6 },
];

export interface FocusArea {
  id: string;
  icon: LucideIcon;
}

/** Industries the team designs and builds for — a statement of focus and
 * capability, not a roster of past clients. Structural data only — label
 * text lives in messages/{locale}/promise.json under `focusAreas.<id>`. */
export const focusAreas: FocusArea[] = [
  { id: "healthcare", icon: HeartPulse },
  { id: "education", icon: GraduationCap },
  { id: "real-estate", icon: Building2 },
  { id: "hospitality", icon: UtensilsCrossed },
  { id: "retail", icon: Store },
  { id: "finance", icon: Landmark },
];
