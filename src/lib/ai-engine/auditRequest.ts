import { z } from "zod";

export const seoAuditTargetSchema = z
  .string()
  .min(3)
  .max(80)
  .regex(/^(homepage|faqs|experience|project:[a-z0-9-]+)$/i);

export const seoAuditRequestSchema = z.object({
  target: seoAuditTargetSchema.optional(),
  title: z.string().min(3).max(180).optional(),
  description: z.string().min(12).max(500).optional(),
  body: z.string().min(40).max(20000).optional(),
});
