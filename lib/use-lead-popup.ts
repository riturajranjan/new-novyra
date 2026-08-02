"use client";

import { useEffect, useState } from "react";
import { isAnyModalOpen } from "@/lib/modal-registry";

const SUBMITTED_KEY = "novyra_enquiry_submitted";
const DISMISSED_AT_KEY = "novyra_enquiry_dismissed_at";
const SESSION_KEY = "novyra:lead-popup:shown-this-session";

const SHOW_DELAY_MS = 3000;
const DISMISS_COOLDOWN_MS = 24 * 60 * 60 * 1000;

/** Drives the lead popup's show/hide lifecycle:
 * - never again once an enquiry has been submitted (`novyra_enquiry_submitted`)
 * - not shown for 24h after being dismissed unanswered — a dismissal
 *   *timestamp* is stored, and the 24h window is computed at read time
 *   (`novyra_enquiry_dismissed_at`), rather than storing a precomputed
 *   future unlock time
 * - not shown while another modal (the mobile nav drawer) is already open
 * - at most once per browser session otherwise
 * - appears 3s after mount if none of the above suppress it
 *
 * Storage access is wrapped in try/catch since private-browsing modes can
 * throw on read/write — in that case the popup just behaves as if it has
 * no memory (shows once per page load), which is a safe fallback rather
 * than a crash. Nothing here runs during SSR since it's all inside effects
 * and event handlers, so there's no hydration mismatch risk. */
export function useLeadPopupTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(SUBMITTED_KEY) === "true") return;
      const dismissedAt = Number(localStorage.getItem(DISMISSED_AT_KEY) ?? 0);
      if (dismissedAt > 0 && Date.now() - dismissedAt < DISMISS_COOLDOWN_MS) return;
      if (sessionStorage.getItem(SESSION_KEY) === "true") return;
    } catch {
      // Storage unavailable — fall through and show on this load anyway.
    }

    const timer = setTimeout(() => {
      if (isAnyModalOpen()) return;
      setOpen(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // Nothing to do — worst case it can show again next load.
      }
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
    } catch {
      // Best-effort — if storage is unavailable there's no cooldown to persist.
    }
  }

  function markSubmitted() {
    try {
      localStorage.setItem(SUBMITTED_KEY, "true");
    } catch {
      // Best-effort — see above.
    }
  }

  return { open, dismiss, markSubmitted };
}
