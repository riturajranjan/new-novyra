import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  AppWindow,
  Braces,
  Briefcase,
  Building2,
  CircleCheckBig,
  Cloud,
  Code2,
  Compass,
  FileCode2,
  Gauge,
  Gem,
  GraduationCap,
  Handshake,
  HeartPulse,
  Layers,
  LifeBuoy,
  Megaphone,
  MessageCircle,
  MessagesSquare,
  Palette,
  PenTool,
  Route,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  ShoppingCart,
  Shuffle,
  Smartphone,
  Sparkles,
  Store,
  Target,
  Telescope,
  TrendingUp,
} from "lucide-react";
import type { AccentColor } from "@/content/hero-screens";

/** ---- Section 1: Hero — abstract "Product Ecosystem" visual ----
 * No fabricated dashboard/metrics — five honest capability nodes orbiting a
 * center Novyra mark, connected by thin glow lines. Structural data only;
 * label text lives in messages/{locale}/about.json under `hero.ecosystem.<id>`. */
export interface EcosystemNode {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
  /** Position as a percentage of the visual's bounding box. */
  top: string;
  left: string;
}

export const ecosystemNodes: EcosystemNode[] = [
  { id: "web-design", icon: Code2, accent: "blue", top: "6%", left: "50%" },
  { id: "saas", icon: Layers, accent: "purple", top: "32%", left: "92%" },
  { id: "ai", icon: Sparkles, accent: "pink", top: "78%", left: "80%" },
  { id: "marketing", icon: Megaphone, accent: "cyan", top: "82%", left: "18%" },
  { id: "web-apps", icon: AppWindow, accent: "emerald", top: "30%", left: "6%" },
];

export interface HeroTrustChip {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
}

/** Capability-based proof, never time/volume-based — no years-in-business,
 * client counts, or project counts. Complementary to the homepage hero's
 * trust set (see content/hero.ts) rather than repeating it verbatim. */
export const heroTrustChips: HeroTrustChip[] = [
  { id: "full-stack-engineering", icon: Server, accent: "blue" },
  { id: "scalable-solutions", icon: Layers, accent: "purple" },
  { id: "security-focused", icon: ShieldCheck, accent: "emerald" },
  { id: "pixel-perfect-ui", icon: Palette, accent: "pink" },
];

/** ---- Section 2: Company Introduction — four capability tiles ---- */
export interface CapabilityTile {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
}

export const capabilityTiles: CapabilityTile[] = [
  { id: "strategy", icon: Compass, accent: "blue" },
  { id: "product-design", icon: Palette, accent: "purple" },
  { id: "engineering", icon: Braces, accent: "cyan" },
  { id: "growth", icon: TrendingUp, accent: "pink" },
];

/** ---- Section 3: Mission & Vision ---- */
export const missionPanel = { icon: Target, accent: "blue" as AccentColor };
export const visionPanel = { icon: Telescope, accent: "purple" as AccentColor };

/** Chip label text lives in messages/{locale}/about.json under
 * `missionVision.mission.chips` / `missionVision.vision.chips` (arrays). */

/** ---- Section 4: What We Build — asymmetric bento (spans out of 6 cols) ----
 * Mirrors the honest, no-inflated-claims approach already established in
 * content/why-choose.ts's featureCards. */
export interface BentoItem {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
  span: number;
  href: string;
}

export const whatWeBuildItems: BentoItem[] = [
  { id: "web-design", icon: Code2, accent: "blue", span: 3, href: "/#services" },
  { id: "digital-marketing", icon: Megaphone, accent: "pink", span: 3, href: "/#services" },
  { id: "web-applications", icon: AppWindow, accent: "cyan", span: 2, href: "/#services" },
  { id: "graphic-design", icon: Palette, accent: "purple", span: 2, href: "/#services" },
  { id: "saas-development", icon: Layers, accent: "emerald", span: 2, href: "/#services" },
  { id: "ai-solutions", icon: Sparkles, accent: "amber", span: 6, href: "/#services" },
];

/** ---- Section 5: Core Principles ---- */
export interface PrincipleModule {
  id: string;
  number: string;
  icon: LucideIcon;
  accent: AccentColor;
}

export const principleModules: PrincipleModule[] = [
  { id: "clarity", number: "01", icon: Compass, accent: "blue" },
  { id: "quality", number: "02", icon: Gem, accent: "purple" },
  { id: "business-value", number: "03", icon: TrendingUp, accent: "cyan" },
  { id: "built-to-scale", number: "04", icon: Layers, accent: "emerald" },
  { id: "partnership", number: "05", icon: Handshake, accent: "pink" },
];

/** ---- Section 6: How Novyra Works — a compact 5-step strip, deliberately
 * distinct from the homepage's 6-step OurProcess timeline (see
 * content/process-steps.ts) so the two sections don't read as duplicates. ---- */
export interface WorkStep {
  id: string;
  number: string;
  icon: LucideIcon;
  accent: AccentColor;
}

export const howWeWorkSteps: WorkStep[] = [
  { id: "discover", number: "01", icon: Search, accent: "blue" },
  { id: "define", number: "02", icon: Route, accent: "cyan" },
  { id: "design", number: "03", icon: PenTool, accent: "purple" },
  { id: "develop", number: "04", icon: Code2, accent: "pink" },
  { id: "launch", number: "05", icon: Rocket, accent: "emerald" },
];

/** ---- Section 7: Why Choose Novyra — six honest, capability-based reasons ---- */
export interface WhyChooseReason {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
}

export const whyChooseReasons: WhyChooseReason[] = [
  { id: "custom-ui", icon: Palette, accent: "purple" },
  { id: "modern-stack", icon: Server, accent: "blue" },
  { id: "responsive", icon: Smartphone, accent: "cyan" },
  { id: "performance-seo", icon: Gauge, accent: "emerald" },
  { id: "communication", icon: MessagesSquare, accent: "pink" },
  { id: "post-launch-support", icon: LifeBuoy, accent: "amber" },
];

/** ---- Section 8: Industries We Support — "Industry Constellation" ----
 * Positions are hand-placed (an asymmetric constellation, not a perfect
 * regular octagon) to match the approved layout; `color` is a standalone
 * hex per industry rather than the shared `AccentColor` token set, since
 * the brief calls for two shades (indigo, violet) the sitewide accent
 * system doesn't have — kept local here rather than expanding the global
 * theme for a single section. */
export interface IndustryItem {
  id: string;
  icon: LucideIcon;
  color: string;
  top: string;
  left: string;
}

export const industryItems: IndustryItem[] = [
  { id: "healthcare", icon: HeartPulse, color: "#F43F5E", top: "4%", left: "50%" },
  { id: "education", icon: GraduationCap, color: "#3B82F6", top: "20%", left: "80%" },
  { id: "startups", icon: Rocket, color: "#8B5CF6", top: "50%", left: "94%" },
  { id: "local-businesses", icon: Store, color: "#F59E0B", top: "80%", left: "74%" },
  { id: "professional-services", icon: Briefcase, color: "#06B6D4", top: "94%", left: "50%" },
  { id: "ecommerce", icon: ShoppingCart, color: "#10B981", top: "80%", left: "26%" },
  { id: "saas", icon: Layers, color: "#6366F1", top: "50%", left: "6%" },
  { id: "growing-enterprises", icon: Building2, color: "#D946EF", top: "20%", left: "20%" },
];

/** ---- Section 9: Technology Philosophy ----
 * Frontend/backend/cloud entries are real proper nouns (never translated,
 * per the project's convention — see content/why-choose.ts techCategories).
 * The AI category lists practical capabilities rather than product names,
 * kept here as short labels for the same visual treatment. */
export interface TechEntry {
  name: string;
  color: string;
}

export interface TechPhilosophyCategory {
  id: string;
  icon: LucideIcon;
  items: TechEntry[];
}

export const techPhilosophyCategories: TechPhilosophyCategory[] = [
  {
    id: "frontend",
    icon: Braces,
    items: [
      { name: "React", color: "#22D3EE" },
      { name: "Next.js", color: "#94A3B8" },
      { name: "TypeScript", color: "#3B82F6" },
      { name: "Tailwind CSS", color: "#38BDF8" },
      { name: "Framer Motion", color: "#A78BFA" },
    ],
  },
  {
    id: "backend",
    icon: Server,
    items: [
      { name: "Node.js", color: "#22C55E" },
      { name: "REST API", color: "#6366F1" },
      { name: "GraphQL", color: "#EC4899" },
      { name: "PostgreSQL", color: "#3B82F6" },
      { name: "MongoDB", color: "#22C55E" },
      { name: "Redis", color: "#EF4444" },
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    items: [
      { name: "AWS", color: "#F97316" },
      { name: "Docker", color: "#2563EB" },
      { name: "Vercel", color: "#94A3B8" },
    ],
  },
  {
    id: "ai",
    icon: Sparkles,
    items: [
      { name: "OpenAI-compatible integrations", color: "#A78BFA" },
      { name: "Automation workflows", color: "#EC4899" },
      { name: "AI assistants", color: "#22D3EE" },
    ],
  },
];

/** ---- Section 10: Founder / Team Direction — honest, no fabricated headcount ---- */
export interface OwnershipCommitment {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
}

export const ownershipCommitments: OwnershipCommitment[] = [
  { id: "direct-communication", icon: MessageCircle, accent: "blue" },
  { id: "focused-delivery", icon: CircleCheckBig, accent: "cyan" },
  { id: "flexible-expertise", icon: Shuffle, accent: "purple" },
];

/** Real founder details — name, role, and links are proper nouns/personal
 * identity, so (like companyInfo in content/footer.ts) they live here
 * un-translated rather than in messages/{locale}. Only the bio paragraph
 * and expertise chip labels are translated, via about.json `founder.*`. */
export const founderProfile = {
  name: "Ritu Raj Ranjan",
  initials: "RR",
  linkedin: "https://linkedin.com/in/rranjan01",
  github: "https://github.com/riturajranjan",
};

export interface ExpertiseItem {
  id: string;
  icon: LucideIcon;
}

/** A representative subset of the full skill list — label text lives in
 * messages/{locale}/about.json under `founder.expertise.<id>`. */
export const founderExpertise: ExpertiseItem[] = [
  { id: "react-nextjs", icon: Code2 },
  { id: "typescript-node", icon: FileCode2 },
  { id: "saas-architecture", icon: Layers },
  { id: "ai-integrations", icon: Sparkles },
  { id: "performance", icon: Gauge },
  { id: "accessibility", icon: Accessibility },
];

/** ---- Section 11: Final CTA ---- */
export const ctaTags = ["website", "saas", "ai", "erp", "marketing"];

export const whatsappHref = "https://wa.me/917903724407";
