// Contact form submissions — sends an email to admin@junoonwellness.com via SMTP.
// Requires SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS env vars.
// See .env.example for setup instructions.

import nodemailer from "nodemailer";
import { createRateLimiter, getClientIp } from "@/lib/rateLimit";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const TO_ADDRESS = "admin@junoonwellness.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Every POST here sends a real email to admin@junoonwellness.com through
// Junoon's own SMTP account. Without a limiter a script could push unlimited
// mail through it, and the cost of a burned sending reputation lands on the
// newsletter too. Deliberately tighter than the waitlist's 5/min: a person
// sends one contact message, not five.
const isRateLimited = createRateLimiter({ windowMs: 60_000, max: 3 });

// Field caps. The waitlist route bounds every field it accepts; this one
// bounded none, so a single POST could carry an arbitrarily large body into
// an email. Names and subjects are truncated (a too-long value is still
// usable); the message is rejected outright, because silently cutting off
// what someone wrote is worse than telling them.
const MAX_NAME = 120;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;

// Strips CR/LF and control characters from anything that ends up in an email
// HEADER. Nodemailer guards its own headers, but `name` is interpolated into
// the reply-to address and there is no reason to hand it unvalidated input.
function headerSafe(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\r\n\u0000-\u001f\u007f]/g, " ").replace(/"/g, "'").trim();
}

export async function POST(req: Request) {
  if (isRateLimited(getClientIp(req))) {
    return Response.json(
      { ok: false, error: "Too many messages. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let name: unknown, email: unknown, subject: unknown, message: unknown;
  try {
    ({ name, email, subject, message } = await req.json());
  } catch {
    return Response.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (typeof name !== "string" || name.trim().length < 1) {
    return Response.json({ ok: false, error: "Name is required" }, { status: 400 });
  }
  // 254 is RFC 5321's practical max. Checked BEFORE the regex so a
  // pathologically long value never reaches it.
  if (typeof email !== "string" || email.length > 254 || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "A valid email address is required" }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length < 5) {
    return Response.json({ ok: false, error: "Message must be at least 5 characters" }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE) {
    return Response.json(
      { ok: false, error: `Message is too long. Please keep it under ${MAX_MESSAGE} characters.` },
      { status: 400 }
    );
  }

  const safeName = headerSafe(name.trim()).slice(0, MAX_NAME);
  const safeSubject =
    typeof subject === "string" ? headerSafe(subject.trim()).slice(0, MAX_SUBJECT) : "";
  const safeMessage = message.trim();

  if (safeName.length < 1) {
    return Response.json({ ok: false, error: "Name is required" }, { status: 400 });
  }

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact: missing SMTP_HOST, SMTP_USER, or SMTP_PASS env vars");
    return Response.json(
      { ok: false, error: "Contact form is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const subjectLine = safeSubject
    ? `[Junoon Contact] ${safeSubject}`
    : `[Junoon Contact] Message from ${safeName}`;

  try {
    await transporter.sendMail({
      from: `"Junoon Contact Form" <${SMTP_USER}>`,
      replyTo: `"${safeName}" <${email}>`,
      to: TO_ADDRESS,
      subject: subjectLine,
      text: [
        `Name:    ${safeName}`,
        `Email:   ${email}`,
        `Subject: ${safeSubject || "(none)"}`,
        ``,
        safeMessage,
      ].join("\n"),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email as string)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(safeSubject || "—")}</p>
        <hr style="border:none;border-top:1px solid #ede8df;margin:16px 0" />
        <p style="white-space:pre-wrap">${escapeHtml(safeMessage)}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact: failed to send email:", err);
    return Response.json(
      { ok: false, error: "Failed to send message. Please try again." },
      { status: 502 }
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
