import { z } from "zod";
import { serviceOptionIds, budgetOptionIds } from "@/content/lead-popup";

/** Accepts +, digits, spaces, dashes, dots, and parens — loose enough for
 * both Indian (+91 98765 43210) and general international formats, with
 * the actual digit-count bound enforced separately below. */
const PHONE_SHAPE = /^\+?[0-9\s\-().]{7,20}$/;

/** Every string the schema can attach to a field, translated by the
 * caller (the client via `useTranslations`, the server via
 * `getTranslations({ locale })`) — one message set, one place both sides
 * read from, so client and server never disagree about what "invalid"
 * means. */
export interface EnquiryMessages {
  nameError: string;
  emailError: string;
  phoneError: string;
  serviceError: string;
  budgetError: string;
  messageMinError: string;
  messageMaxError: string;
}

/** The real field values a visitor enters. Built as a function (not a
 * static export) because the error strings are locale-dependent — the
 * shape of the data never changes, only the messages attached to it. */
export function buildEnquiryFieldsSchema(messages: EnquiryMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.nameError),
    email: z.string().trim().min(1, messages.emailError).email(messages.emailError),
    phone: z
      .string()
      .trim()
      .regex(PHONE_SHAPE, messages.phoneError)
      .refine((v) => {
        const digits = v.replace(/\D/g, "");
        return digits.length >= 7 && digits.length <= 15;
      }, messages.phoneError),
    company: z.string().trim().max(200).optional(),
    service: z.enum(serviceOptionIds, messages.serviceError),
    budget: z.enum(budgetOptionIds, messages.budgetError),
    message: z.string().trim().min(10, messages.messageMinError).max(1000, messages.messageMaxError),
    // Optional — most useful for a Website Redesign / Free Audit enquiry.
    // No dedicated DB column exists for this yet, so the API route folds
    // it into the stored `message` text rather than requiring a schema
    // migration for one optional field.
    existingWebsiteUrl: z.string().trim().max(300).optional(),
  });
}

export type EnquiryFieldValues = z.infer<ReturnType<typeof buildEnquiryFieldsSchema>>;

/** Anti-spam / request metadata sent alongside the real fields — validated
 * the same way on the server regardless of what the client claims, since
 * none of it is user-visible copy that needs translated error messages. */
export const enquiryMetaSchema = z.object({
  // Honeypot: a field real visitors never see or fill (it's positioned
  // off-screen in the form). Any bot that fills every input it finds trips
  // this, and the server quietly no-ops instead of tipping it off.
  honeypot: z.string().max(0).optional().default(""),
  // Date.now() captured when the form mounted — submissions faster than a
  // human could plausibly read+fill the form are treated as bots too.
  formRenderedAt: z.number().int().positive(),
  pageUrl: z.string().trim().min(1).max(2048),
  locale: z.enum(["en", "hi"]),
  // "consultation-popup" (the lead popup) and "contact-page" (the
  // dedicated Contact page form) are the two real submission sources today
  // — this was previously a single literal locked to "consultation-popup",
  // which meant every Contact page submission failed this validation and
  // was silently rejected with a 400 before ever reaching the database.
  source: z.enum(["consultation-popup", "contact-page"]),
});

export type EnquiryMeta = z.infer<typeof enquiryMetaSchema>;

export const MIN_SUBMIT_MS = 2500;
