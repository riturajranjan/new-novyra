"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ContactWorkspaceBackground } from "@/components/contact-page/contact-workspace-background";
import { ContactProjectForm } from "@/components/contact-page/contact-project-form";
import { DirectContactPanel } from "@/components/contact-page/direct-contact-panel";
import { fadeInUp } from "@/lib/motion";

/** Section 02 — the page's main conversion area: one composition (not
 * a grid of disconnected cards) pairing the project form (≈63%) with a
 * direct-contact panel (≈37%). */
export function ContactWorkspace() {
  return (
    <section className="relative isolate overflow-hidden py-14 md:py-18 lg:py-24">
      <ContactWorkspaceBackground />

      <Container size="wide">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[63fr_37fr] lg:gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="border-border-subtle rounded-[22px] border p-6 sm:p-8"
            style={{ backgroundColor: "rgba(8,13,28,0.55)" }}
          >
            <ContactProjectForm />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            transition={{ delay: 0.08 }}
          >
            <DirectContactPanel />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
