import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(120),
  email: z.string().trim().email("A valid email address is required.").max(180),
  subject: z.string().trim().min(2, "Subject is required.").max(180),
  message: z.string().trim().min(12, "Message must be at least 12 characters.").max(4000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export interface ContactApiSuccess {
  ok: true;
  delivered: boolean;
  channel: "email" | "deferred";
}

export interface ContactApiError {
  ok: false;
  error: string;
  fieldErrors?: Record<string, string[]>;
}
