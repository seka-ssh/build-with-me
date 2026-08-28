const nodemailer = require("nodemailer");
const logger = require("./logger");

const configured = () =>
  Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );

const transporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    // Fail fast instead of hanging — the API has a 20s axios timeout.
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });

// Optional Resend fallback so email still works if SMTP is flaky.
const resendConfigured = () => Boolean(process.env.RESEND_API_KEY);
const sendViaResend = async ({ to, subject, html, text, replyTo, fromName }) => {
  const url = "https://api.resend.com/emails";
  const from = `${fromName || process.env.ADMIN_NAME || "SEKA Shalom"} <${process.env.RESEND_FROM || "onboarding@resend.dev"}>`;
  const body = {
    from,
    to,
    subject,
    ...(html ? { html } : {}),
    ...(text ? { text } : {}),
    ...(replyTo ? { reply_to: replyTo } : {}),
  };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Resend HTTP ${res.status}: ${txt.slice(0, 200)}`);
    }
    const j = await res.json();
    return { delivered: true, messageId: j?.id };
  } finally {
    clearTimeout(timer);
  }
};

const sendContactEmail = async (contact) => {
  let smtpError = "";
  if (!configured() && !resendConfigured()) {
    logger.warn("SMTP not configured. Contact saved only.");
    return {
      delivered: false,
      error:
        "Email delivery is not configured. Add SMTP_* or RESEND_API_KEY to the server environment.",
    };
  }
  const text = `${contact.name} (${contact.email}) wrote:\n\n${contact.message}`;
  const html = `<h2>New portfolio contact</h2><p><b>Name:</b> ${contact.name}</p><p><b>Email:</b> ${contact.email}</p><p><b>Subject:</b> ${contact.subject}</p><p>${(contact.message || "").replace(/\n/g, "<br>")}</p>`;

  // Try SMTP first (if configured), then Resend fallback.
  if (configured()) {
    try {
      const tx = transporter();
      const info = await tx.sendMail({
        from: `SEKA Shalom <${process.env.SMTP_USER}>`,
        to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
        replyTo: contact.email,
        subject: `Portfolio Contact: ${contact.subject}`,
        text,
        html,
      });
      return { delivered: true, messageId: info.messageId };
    } catch (e) {
      smtpError = e.message || String(e);
      logger.warn(`SMTP delivery failed (${smtpError}); trying Resend fallback…`);
    }
  }
  if (resendConfigured()) {
    try {
      return await sendViaResend({
        to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
        replyTo: contact.email,
        subject: `Portfolio Contact: ${contact.subject}`,
        text,
        html,
      });
    } catch (e) {
      logger.warn(`Resend fallback also failed: ${e.message}`);
    }
  }
  return {
    delivered: false,
    error: `Email could not be sent. ${smtpError ? `SMTP said: ${smtpError}` : "No mail provider configured."}`,
  };
};

// Admin: reply to any sender from the dashboard
const sendReply = async ({ to, subject, body, fromName }) => {
  let smtpError = "";
  if (!configured() && !resendConfigured()) {
    logger.warn("SMTP not configured. Reply not sent.");
    return {
      delivered: false,
      error:
        "Email delivery is not configured. Add SMTP_* or RESEND_API_KEY to the server environment.",
    };
  }
  const text = body;
  const html = (body || "").replace(/\n/g, "<br>");

  if (configured()) {
    try {
      const info = await transporter().sendMail({
        from: `${fromName || process.env.ADMIN_NAME || "SEKA Shalom"} <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
      });
      return { delivered: true, messageId: info.messageId };
    } catch (e) {
      smtpError = e.message || String(e);
      logger.warn(`SMTP reply delivery failed (${smtpError}); trying Resend fallback…`);
    }
  }
  if (resendConfigured()) {
    try {
      return await sendViaResend({
        to,
        subject,
        text,
        html,
        fromName,
      });
    } catch (e) {
      logger.warn(`Resend fallback for reply also failed: ${e.message}`);
    }
  }
  return {
    delivered: false,
    error: `Email could not be sent. ${smtpError ? `SMTP said: ${smtpError}` : "No mail provider configured."}`,
  };
};

module.exports = { sendContactEmail, sendReply };
