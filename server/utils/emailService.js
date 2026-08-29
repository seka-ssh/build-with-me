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

// Optional EmailJS fallback — no domain required, works from any host
// (EmailJS's servers do the actual sending).
const emailjsConfigured = () =>
  Boolean(
    process.env.EMAILJS_SERVICE_ID &&
      process.env.EMAILJS_TEMPLATE_ID &&
      process.env.EMAILJS_PUBLIC_KEY,
  );

const sendViaEmailJs = async ({ to, subject, body, name, replyTo }) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const payload = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      // Server-side (REST) calls require the private key (accessToken) unless
      // the account explicitly allows token-less API access.
      ...(process.env.EMAILJS_PRIVATE_KEY
        ? { accessToken: process.env.EMAILJS_PRIVATE_KEY }
        : {}),
      template_params: {
        to_email: to,
        // Superset of common variable names so the template renders correctly
        // no matter which placeholder spelling it references.
        to_name: name || "SEKA Shalom",
        name: name || "SEKA Shalom",
        from_name: name || "SEKA Shalom",
        subject,
        title: subject,
        message: body,
        body,
        content: body,
        text: body,
        reply_to: replyTo || process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
        replyTo: replyTo || process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      },
    };
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`EmailJS HTTP ${res.status}: ${txt.slice(0, 200)}`);
    }
    const text = await res.text();
    return { delivered: true, messageId: text || "emailjs-ok" };
  } finally {
    clearTimeout(timer);
  }
};

const sendContactEmail = async (contact) => {
  let smtpError = "";
  if (!configured() && !emailjsConfigured() && !resendConfigured()) {
    logger.warn("No mail provider configured. Contact saved only.");
    return {
      delivered: false,
      error:
        "Email delivery is not configured. Add SMTP_*, EMAILJS_* or RESEND_API_KEY to the server environment.",
    };
  }
  const text = `${contact.name} (${contact.email}) wrote:\n\n${contact.message}`;
  const html = `<h2>New portfolio contact</h2><p><b>Name:</b> ${contact.name}</p><p><b>Email:</b> ${contact.email}</p><p><b>Subject:</b> ${contact.subject}</p><p>${(contact.message || "").replace(/\n/g, "<br>")}</p>`;

  // Order: EmailJS first (fast, works from ANY host — Gmail SMTP times out on
  // cloud IPs like Render; trying SMTP first burns ~28s of timeouts and
  // exceeds the client's 20s request timeout), then SMTP, then Resend.
  if (emailjsConfigured()) {
    try {
      return await sendViaEmailJs({
        to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
        subject: `Portfolio Contact: ${contact.subject}`,
        body: `${contact.name} (${contact.email}) wrote:\n\n${contact.message}`,
        name: contact.name,
        replyTo: contact.email,
      });
    } catch (e) {
      smtpError = e.message || String(e);
      logger.warn(`EmailJS send failed (${smtpError}); trying SMTP…`);
    }
  }
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
      smtpError = e.message || String(e);
      logger.warn(`Resend fallback also failed: ${e.message}`);
    }
  }
  return {
    delivered: false,
    error: `Email could not be sent. ${smtpError ? `Last provider error: ${smtpError}` : "No mail provider configured."}`,
  };
};

// Admin: reply to any sender from the dashboard
const sendReply = async ({ to, subject, body, fromName }) => {
  let smtpError = "";
  if (!configured() && !emailjsConfigured() && !resendConfigured()) {
    logger.warn("No mail provider configured. Reply not sent.");
    return {
      delivered: false,
      error:
        "Email delivery is not configured. Add SMTP_*, EMAILJS_* or RESEND_API_KEY to the server environment.",
    };
  }
  const text = body;
  const html = (body || "").replace(/\n/g, "<br>");

  // Replies target arbitrary visitor addresses. The EmailJS free plan only
  // delivers to the account owner's email (without a verified domain there
  // are no external recipients), so when a real relay (non-Gmail SMTP, e.g.
  // Brevo/SendGrid) is configured it MUST be preferred for replies —
  // otherwise EmailJS reports success while the visitor receives nothing.
  const relayConfigured =
    configured() && !smtpHosts.includes("smtp.gmail.com");
  if (relayConfigured) {
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
      logger.warn(`Relay reply send failed (${smtpError}); trying EmailJS…`);
    }
  }

  // EmailJS first — see the ordering note in sendContactEmail.
  if (emailjsConfigured()) {
    try {
      return await sendViaEmailJs({
        to,
        subject,
        body,
        name: fromName || process.env.ADMIN_NAME || "SEKA",
      });
    } catch (e) {
      smtpError = e.message || String(e);
      logger.warn(`EmailJS reply send failed (${smtpError}); trying SMTP…`);
    }
  }
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
      smtpError = e.message || String(e);
      logger.warn(`Resend fallback for reply also failed: ${e.message}`);
    }
  }
  return {
    delivered: false,
    error: `Email could not be sent. ${smtpError ? `Last provider error: ${smtpError}` : "No mail provider configured."}`,
  };
};

module.exports = { sendContactEmail, sendReply, testSmtpConnection };
