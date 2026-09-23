import { NextResponse } from "next/server";
import { getPortfolio } from "@/content/getPortfolio";
import {
  contactFormSchema,
  type ContactApiError,
  type ContactApiSuccess,
} from "@/lib/contact/schema";

export const runtime = "nodejs";

function errorResponse(payload: ContactApiError, status: number) {
  return NextResponse.json(payload, { status });
}

export async function POST(request: Request) {
  let rawBody: unknown;

  try {
    rawBody = await request.json();
  } catch {
    return errorResponse({ ok: false, error: "Request body must be valid JSON." }, 400);
  }

  const parsed = contactFormSchema.safeParse(rawBody);
  if (!parsed.success) {
    return errorResponse(
      {
        ok: false,
        error: "Please correct the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      422,
    );
  }

  const portfolio = await getPortfolio();
  const toEmail = process.env.CONTACT_TO_EMAIL ?? portfolio.personalInfo.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <noreply@example.com>";
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: parsed.data.email,
      subject: `[Portfolio] ${parsed.data.subject}`,
      text: [
        `Name: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        `Subject: ${parsed.data.subject}`,
        "",
        parsed.data.message,
      ].join("\n"),
    });

    if (error) {
      return errorResponse(
        { ok: false, error: "The message could not be delivered. Please try WhatsApp or email." },
        502,
      );
    }

    const success: ContactApiSuccess = { ok: true, delivered: true, channel: "email" };
    return NextResponse.json(success, { status: 200 });
  }

  const deferred: ContactApiSuccess = { ok: true, delivered: false, channel: "deferred" };
  return NextResponse.json(deferred, {
    status: 202,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
