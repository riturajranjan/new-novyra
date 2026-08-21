import { NextRequest, NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { stripTags } from "@/lib/sanitize";
import { buildEnquiryFieldsSchema, enquiryMetaSchema, MIN_SUBMIT_MS, type EnquiryMessages } from "@/lib/validation/enquiry";
import { sendEmail } from "@/lib/email/send";
import { teamNotificationEmail, userConfirmationEmail } from "@/lib/email/enquiry-templates";
import { serviceOptionIds, budgetOptionIds } from "@/content/lead-popup";

/** Recent identical submissions (same email or phone) within this window
 * are treated as accidental resubmits, not new leads — we still answer
 * with success (nothing looked wrong from the visitor's side) but skip
 * the duplicate DB row and duplicate emails. */
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;

function clientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

const requestSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  company: z.string().optional(),
  service: z.string(),
  budget: z.string(),
  message: z.string(),
  existingWebsiteUrl: z.string().optional(),
  honeypot: z.string().optional().default(""),
  formRenderedAt: z.number().optional().default(0),
  pageUrl: z.string(),
  locale: z.string(),
  source: z.string().optional().default("consultation-popup"),
});

export async function POST(request: NextRequest) {
  const ip = clientIp(request);

  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsedRequest = requestSchema.safeParse(raw);
  if (!parsedRequest.success) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  const body = parsedRequest.data;

  // Honeypot: real visitors never fill this. Reply with a generic success
  // so a bot doesn't learn it was caught, but do nothing further.
  if (body.honeypot) {
    return NextResponse.json({ ok: true });
  }

  // Faster than a human could plausibly read and fill the form — same
  // bot-signal treatment as the honeypot above.
  if (body.formRenderedAt > 0 && Date.now() - body.formRenderedAt < MIN_SUBMIT_MS) {
    return NextResponse.json({ ok: true });
  }

  const metaResult = enquiryMetaSchema.safeParse({
    honeypot: body.honeypot,
    formRenderedAt: body.formRenderedAt || Date.now(),
    pageUrl: body.pageUrl,
    locale: body.locale,
    source: body.source,
  });
  if (!metaResult.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const meta = metaResult.data;

  // Never trust client-side validation alone — re-validate every field
  // server-side with the same shared schema the form uses, just with
  // server-rendered translated messages.
  const t = await getTranslations({ locale: meta.locale, namespace: "leadPopup.form" });
  const messages: EnquiryMessages = {
    nameError: t("name.error"),
    emailError: t("email.error"),
    phoneError: t("phone.error"),
    serviceError: t("service.error"),
    budgetError: t("budget.error"),
    messageMinError: t("message.minError"),
    messageMaxError: t("message.maxError"),
  };
  const fieldsSchema = buildEnquiryFieldsSchema(messages);
  const parsedFields = fieldsSchema.safeParse({
    name: body.name,
    email: body.email,
    phone: body.phone,
    company: body.company,
    service: body.service,
    budget: body.budget,
    message: body.message,
    existingWebsiteUrl: body.existingWebsiteUrl,
  });

  if (!parsedFields.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsedFields.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ error: "Please check the highlighted fields.", fieldErrors }, { status: 400 });
  }

  const fields = parsedFields.data;
  // No dedicated `existingWebsiteUrl` column exists — fold it into the
  // stored message text instead of requiring a schema migration for one
  // optional qualification field.
  const cleanMessage = stripTags(fields.message);
  const existingWebsiteUrl = fields.existingWebsiteUrl ? stripTags(fields.existingWebsiteUrl) : "";
  const sanitized = {
    name: stripTags(fields.name),
    email: stripTags(fields.email),
    phone: stripTags(fields.phone),
    company: fields.company ? stripTags(fields.company) : null,
    service: fields.service,
    budget: fields.budget,
    message: existingWebsiteUrl ? `${cleanMessage}\n\nExisting website: ${existingWebsiteUrl}` : cleanMessage,
  };

  const existing = await prisma.enquiry.findFirst({
    where: {
      OR: [{ email: sanitized.email }, { phone: sanitized.phone }],
      createdAt: { gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
    },
    orderBy: { createdAt: "desc" },
  });

  if (existing) {
    return NextResponse.json({ ok: true });
  }

  let enquiry;
  try {
    enquiry = await prisma.enquiry.create({
      data: {
        ...sanitized,
        pageUrl: meta.pageUrl,
        locale: meta.locale,
        source: meta.source,
      },
    });
  } catch (error) {
    console.error("[enquiries] Failed to save enquiry:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "We couldn't submit your enquiry. Please try again." }, { status: 500 });
  }

  const serviceLabel = await labelFor(meta.locale, "service", enquiry.service);
  const budgetLabel = await labelFor(meta.locale, "budget", enquiry.budget);

  const team = teamNotificationEmail({
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    company: enquiry.company,
    service: serviceLabel,
    budget: budgetLabel,
    message: enquiry.message,
    pageUrl: enquiry.pageUrl,
    locale: enquiry.locale,
    createdAt: enquiry.createdAt,
  });

  const tEmail = await getTranslations({ locale: meta.locale, namespace: "leadPopup.email" });
  const confirmation = userConfirmationEmail(
    { name: enquiry.name, service: serviceLabel },
    {
      subject: tEmail("confirmationSubject"),
      greeting: tEmail("confirmationGreeting"),
      body: tEmail("confirmationBody"),
      serviceLabel: tEmail("serviceLabel"),
      phoneLabel: tEmail("phoneLabel"),
      websiteLabel: tEmail("websiteLabel"),
      whatsappLabel: tEmail("whatsappLabel"),
    },
  );

  // Fire both emails but never let a delivery failure affect the
  // response — the enquiry is already saved, which is the real result.
  await Promise.allSettled([
    sendEmail({ to: process.env.ENQUIRY_NOTIFICATION_EMAIL || "hello@novyratech.in", subject: team.subject, html: team.html }),
    sendEmail({ to: enquiry.email, subject: confirmation.subject, html: confirmation.html }),
  ]);

  return NextResponse.json({ ok: true });
}

async function labelFor(locale: string, field: "service" | "budget", id: string): Promise<string> {
  const ids = field === "service" ? serviceOptionIds : budgetOptionIds;
  if (!ids.includes(id as never)) return id;
  const t = await getTranslations({ locale, namespace: `leadPopup.form.${field}.options` });
  return t(id);
}
