// Contact form submissions — sends an email to admin@junoonwellness.com via SMTP.
// Requires SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS env vars.
// See .env.example for setup instructions.

import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const TO_ADDRESS = "admin@junoonwellness.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let name: unknown, email: unknown, subject: unknown, message: unknown;
  try {
    ({ name, email, subject, message } = await req.json());
  } catch {
    return Response.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (typeof name !== "string" || name.trim().length < 1) {
    return Response.json({ ok: false, error: "Name is required" }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "A valid email address is required" }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length < 5) {
    return Response.json({ ok: false, error: "Message must be at least 5 characters" }, { status: 400 });
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

  const subjectLine =
    typeof subject === "string" && subject.trim().length > 0
      ? `[Junoon Contact] ${subject.trim()}`
      : `[Junoon Contact] Message from ${(name as string).trim()}`;

  try {
    await transporter.sendMail({
      from: `"Junoon Contact Form" <${SMTP_USER}>`,
      replyTo: `"${(name as string).trim()}" <${email}>`,
      to: TO_ADDRESS,
      subject: subjectLine,
      text: [
        `Name:    ${(name as string).trim()}`,
        `Email:   ${email}`,
        `Subject: ${typeof subject === "string" ? subject.trim() : "(none)"}`,
        ``,
        (message as string).trim(),
      ].join("\n"),
      html: `
        <p><strong>Name:</strong> ${escapeHtml((name as string).trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email as string)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(typeof subject === "string" ? subject.trim() : "—")}</p>
        <hr style="border:none;border-top:1px solid #ede8df;margin:16px 0" />
        <p style="white-space:pre-wrap">${escapeHtml((message as string).trim())}</p>
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
