"use server";
import { sendEmail } from "../services/email-service";
import type { ContactFormData } from "../types";
export async function submitContactForm(data: ContactFormData) {
  await sendEmail(data);
}
