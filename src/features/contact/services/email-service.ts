import type { ContactFormData } from "../types";
export async function sendEmail(data: ContactFormData): Promise<void> {
  // TODO: integrate email provider (Resend, SendGrid, etc.)
  console.warn("sendEmail not yet integrated", data);
}
