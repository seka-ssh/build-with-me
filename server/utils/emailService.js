const nodemailer = require("nodemailer");
const logger = require("./logger");

const configured = () =>
  Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );

// Candidate hosts: the configured one first, plus Gmail's alternate hostname,
// because routing/firewalling can differ between "smtp.gmail.com" and
// "smtp.googlemail.com".
const smtpHosts = (() => {
  const primary = (process.env.SMTP_HOST || "smtp.gmail.com")
    .trim()
    .toLowerCase();
  const list = [primary];
  if (primary === "smtp.gmail.com") list.push("smtp.googlemail.com");
  return [...new Set(list)];
})();

// Try the configured SMTP port first, then the other Gmail-friendly port.
// 465 (implicit TLS) often passes where 587 is blocked/blackholed by a host.
const smtpPorts = (() => {
  const primary = Number(process.env.SMTP_PORT || 587);
  const candidates = primary === 465 ? [465, 587] : [587, 465];
  return [...new Set(candidates)];
})();

const transporter = (host, port, isFallback = false) =>
  nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    // Fail fast instead of hanging — the API has a 20s axios timeout.
    connectionTimeout: isFallback ? 5000 : 9000,
    greetingTimeout: isFallback ? 5000 : 9000,
    socketTimeout: isFallback ? 7000 : 15000,
  });

// Try each (host, port) combination in order; returns the first success or
// throws with detailed per-attempt errors so we can diagnose from the logs.
const sendViaSmtp = async (mailOptions) => {
  let lastErr = null;
  const attempts = [];
  for (const host of smtpHosts) {
    for (let i = 0; i < smtpPorts.length; i++) {
      const port = smtpPorts[i];
      try {
        const tx = transporter(host, port, i > 0 || smtpHosts[0] !== host);
        const info = await tx.sendMail(mailOptions);
        logger.info(`Email sent via SMTP ${host}:${port} (${info.messageId})`);
        return { delivered: true, messageId: info.messageId, host, port };
      } catch (e) {
        lastErr = e;
        const msg = (e.message || String(e)).slice(0, 300);
        attempts.push(`SMTP ${host}:${port} -> ${msg}`);
        logger.warn(`SMTP ${host}:${port} failed (${msg}); trying next…`);
      }
    }
  }
  const err = new Error(`SMTP failed on all hosts/ports. ${attempts.join(" | ")}`);
  err.details = attempts;
  throw err;
};

// Diagnostic helper: report connection + AUTH status for every host:port combo.
// Used by the admin "test email" endpoint to isolate Render→Gmail reachability.
const testSmtpConnection = async () => {
  if (!configured()) {
    return { configured: false, message: "SMTP not configured on server env." };
  }
  const results = [];
  for (const host of smtpHosts) {
    for (const port of smtpPorts) {
      const entry = { host, port, ok: false, error: "" };
      try {
        // Use short fallback timeouts so the whole test returns quickly.
        const tx = transporter(host, port, true);
        await tx.verify();
        entry.ok = true;
        entry.message = "connection + AUTH OK";
      } catch (e) {
        entry.error = (e.message || String(e)).slice(0, 300);
      }
      results.push(entry);
    }
  }
  return { configured: true, results };
};

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

  // Try SMTP first (both ports), then Resend fallback.
  if (configured()) {
    try {
      return await sendViaSmtp({
        from: `SEKA Shalom <${process.env.SMTP_USER}>`,
        to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
        replyTo: contact.email,
        subject: `Portfolio Contact: ${contact.subject}`,
        text,
        html,
      });
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
      return await sendViaSmtp({
        from: `${fromName || process.env.ADMIN_NAME || "SEKA Shalom"} <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
      });
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

module.exports = { sendContactEmail, sendReply, testSmtpConnection };
