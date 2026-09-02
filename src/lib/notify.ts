import { Resend } from "resend";

// Internal team notifications (e.g. "someone requested a Custom plan") -
// not customer-facing emails. Silently no-ops until RESEND_API_KEY and
// NOTIFY_EMAIL_TO are configured, so the request flow never breaks on a
// missing email setup.
export async function sendTeamNotification(subject: string, bodyLines: string[]): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  const from = process.env.NOTIFY_EMAIL_FROM || "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.log(`[notify] Skipped (email not configured yet): ${subject}`);
    return;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      subject,
      text: bodyLines.join("\n"),
    });
  } catch (err) {
    // Never let a notification failure break the actual request flow.
    console.error("[notify] Failed to send team notification:", err);
  }
}
