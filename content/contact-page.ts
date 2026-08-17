import type { LucideIcon } from "lucide-react";
import { Lightbulb, PenTool, Code2, Rocket, Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import type { AccentColor } from "@/content/hero-screens";
import type { ServiceOptionId } from "@/content/lead-popup";

/** The hero's signature visual — Idea → Novyra → Digital Product — four
 * floating nodes orbiting the central mark. Structural only; labels live
 * in messages/{locale}/contact.json under `hero.visual.nodes.<id>`. */
export interface ConnectionNode {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
  top: string;
  left: string;
}

export const connectionNodes: ConnectionNode[] = [
  { id: "idea", icon: Lightbulb, accent: "amber", top: "10%", left: "20%" },
  { id: "design", icon: PenTool, accent: "pink", top: "8%", left: "72%" },
  { id: "build", icon: Code2, accent: "blue", top: "78%", left: "78%" },
  { id: "launch", icon: Rocket, accent: "purple", top: "80%", left: "16%" },
];

/** The exact eight ids the new Contact page's "Project Type" field
 * shows, in the order the approved copy specifies — a curated subset/
 * superset of the shared `serviceOptionIds` (content/lead-popup.ts),
 * reusing its translated labels (messages/*.leadPopup.json under
 * `form.service.options.*`) rather than duplicating them. */
export const projectTypeOptionIds: ServiceOptionId[] = [
  "businessWebsite",
  "webApplication",
  "saasDevelopment",
  "aiAutomation",
  "uiUxDesign",
  "digitalMarketing",
  "existingProductImprovement",
  "other",
];

export interface ContactChannel {
  id: string;
  icon: LucideIcon;
  accent: AccentColor;
}

/** Real contact channels only — structural data, values come straight
 * from content/footer.ts's `companyInfo` at render time. */
export const contactChannels: ContactChannel[] = [
  { id: "email", icon: Mail, accent: "blue" },
  { id: "phone", icon: Phone, accent: "purple" },
  { id: "whatsapp", icon: MessageCircle, accent: "cyan" },
  { id: "location", icon: MapPin, accent: "amber" },
];

export interface ProcessStep {
  id: string;
  number: string;
}

export const processSteps: ProcessStep[] = [
  { id: "tellUs", number: "01" },
  { id: "understand", number: "02" },
  { id: "recommend", number: "03" },
  { id: "plan", number: "04" },
];
