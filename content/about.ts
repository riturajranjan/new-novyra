import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  AppWindow,
  Braces,
  CircleCheckBig,
  Cloud,
  Code2,
  Compass,
  FileCode2,
  Gauge,
  Gem,
  Handshake,
  Layers,
  Megaphone,
  MessageCircle,
  Palette,
  Server,
  ShieldCheck,
  Shuffle,
  Sparkles,
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

/** ---- Section 7: Compact Capabilities Strip — one restrained row instead
 * of the old six-tile bento. Label text lives in messages/{locale}/about.json
 * under `capabilities.services.items.<id>`. */
export interface CapabilityStripItem {
  id: string;
  icon: LucideIcon;
}

export const capabilityStripItems: CapabilityStripItem[] = [
  { id: "web-experiences", icon: Code2 },
  { id: "web-applications", icon: AppWindow },
  { id: "saas", icon: Layers },
  { id: "product-design", icon: Palette },
  { id: "digital-growth", icon: TrendingUp },
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

/** ---- Section 9: Technology Philosophy ----
 * Frontend/backend/cloud entries are real proper nouns (never translated,
 * per the project's convention). The AI category lists practical
 * capabilities rather than product names, kept here as short labels for the
 * same visual treatment. */
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
