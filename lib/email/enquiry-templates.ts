import { escapeHtml } from "@/lib/sanitize";

const BRAND_BLUE = "#2563eb";
const BRAND_PURPLE = "#7c3aed";
const BRAND_PINK = "#db2777";

/** Only escapes the values substituted into `{placeholder}` slots — the
 * template string itself is our own reviewed copy (from messages/*.json),
 * not user input, so it isn't escaped a second time. */
function formatTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? escapeHtml(vars[key]) : match));
}

function wrapper(bodyHtml: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#0b0f19;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
      <div style="background:linear-gradient(145deg,#12162d,#1a1437);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;color:#e7e9f5;">
        <div style="font-size:20px;font-weight:700;margin-bottom:24px;">
          <span style="background:linear-gradient(135deg,${BRAND_BLUE},${BRAND_PURPLE} 55%,${BRAND_PINK});-webkit-background-clip:text;background-clip:text;color:transparent;">Novyra</span><span style="color:${BRAND_PURPLE};">.</span>
        </div>
        ${bodyHtml}
        <div style="margin-top:32px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:rgba(231,233,245,0.5);">
          Novyra Technologies &middot; novyratech.in
        </div>
      </div>
    </div>
  </body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 12px 6px 0;color:rgba(231,233,245,0.55);font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:#e7e9f5;font-size:14px;">${escapeHtml(value)}</td>
  </tr>`;
}

interface TeamNotificationData {
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string;
  budget: string;
  message: string;
  pageUrl: string;
  locale: string;
  createdAt: Date;
}

/** The internal ops notification — always English regardless of the
 * visitor's locale, since it's read by the Novyra team, not the visitor. */
export function teamNotificationEmail(data: TeamNotificationData): { subject: string; html: string } {
  const subject = `New Consultation Enquiry — ${data.service}`;
  const body = `
    <h1 style="font-size:18px;margin:0 0 16px;">New consultation enquiry</h1>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Company", data.company || "—")}
      ${row("Service", data.service)}
      ${row("Budget", data.budget)}
      ${row("Source page", data.pageUrl)}
      ${row("Locale", data.locale)}
      ${row("Submitted", data.createdAt.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }))}
    </table>
    <div style="margin-top:16px;">
      <div style="color:rgba(231,233,245,0.55);font-size:13px;margin-bottom:4px;">Message</div>
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px 14px;font-size:14px;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
    </div>
  `;
  return { subject, html: wrapper(body) };
}

export interface ConfirmationCopy {
  subject: string;
  greeting: string;
  body: string;
  serviceLabel: string;
  phoneLabel: string;
  websiteLabel: string;
  whatsappLabel: string;
}

/** The visitor-facing confirmation — copy is passed in already resolved to
 * their submitted locale (see the `leadPopup.email.*` messages), so this
 * function itself never needs to know which language it's rendering. */
export function userConfirmationEmail(
  data: { name: string; service: string },
  copy: ConfirmationCopy,
): { subject: string; html: string } {
  const body = `
    <h1 style="font-size:18px;margin:0 0 12px;">${formatTemplate(copy.greeting, { name: data.name })}</h1>
    <p style="font-size:14px;line-height:1.6;color:rgba(231,233,245,0.8);margin:0 0 20px;">${escapeHtml(copy.body)}</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      ${row(copy.serviceLabel, data.service)}
      ${row(copy.phoneLabel, "+91 7903724407")}
      ${row(copy.websiteLabel, "novyratech.in")}
    </table>
    <a href="https://wa.me/917903724407" style="display:inline-block;background:linear-gradient(135deg,${BRAND_BLUE},${BRAND_PURPLE} 55%,${BRAND_PINK});color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-size:14px;font-weight:600;">${escapeHtml(copy.whatsappLabel)}</a>
  `;
  return { subject: copy.subject, html: wrapper(body) };
}
