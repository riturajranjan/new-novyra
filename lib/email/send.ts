import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

/** Never throws — a failed or skipped email must not affect the API
 * route's response. The database write already happened by the time this
 * runs, so it's the authoritative "success" signal, not this. */
export async function sendEmail({ to, subject, html }: SendEmailInput): Promise<{ sent: boolean }> {
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY not set — skipping email to ${to} ("${subject}").`);
    return { sent: false };
  }

  const from = process.env.ENQUIRY_FROM_EMAIL || "Novyra Technologies <onboarding@resend.dev>";

  try {
    const result = await resend.emails.send({ from, to, subject, html });
    if (result.error) {
      console.error("[email] Resend rejected the send:", result.error.message);
      return { sent: false };
    }
    return { sent: true };
  } catch (error) {
    console.error("[email] Resend send failed:", error instanceof Error ? error.message : error);
    return { sent: false };
  }
}
