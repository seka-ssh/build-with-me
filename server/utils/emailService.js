const nodemailer = require("nodemailer");
const logger = require("./logger");

const configured = () =>
  Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
  );

// Master switch: set EMAIL_ENABLED=false on the host to skip email sending
// entirely — no SMTP attempts, no timeout errors. Messages/replies still
// save and notifications still fire. Turn it back on (or remove the var)
// anytime to re-enable sending.
const emailEnabled = () => process.env.EMAIL_ENABLED !== "false";

// Gmail via nodemailer — account email + App Password only.
// `family: 4` forces IPv4: Node ≥17 prefers IPv6 (AAAA) first, and Render's
// IPv6 route to Gmail blackholes — that was causing the ETIMEDOUTs.
const port = Number(process.env.SMTP_PORT || 465);
const transporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465, // 465 = implicit TLS; 587 = STARTTLS
    family: 4, // force IPv4 — fixes the Render routing problem
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
  });

const sendViaGmail = async (mailOptions) => {
  const info = await transporter().sendMail(mailOptions);
  logger.info(`Email sent via Gmail SMTP (${info.messageId})`);
  return { delivered: true, messageId: info.messageId };
};

// Diagnostic helper: verify connection + AUTH against Gmail.
const testSmtpConnection = async () => {
  if (!configured()) {
    return { configured: false, message: "SMTP not configured on server env." };
  }
  try {
    await transporter().verify();
    return {
      configured: true,
      results: [
        {
          service: "gmail",
          user: process.env.SMTP_USER,
          ok: true,
          message: "connection + AUTH OK",
        },
      ],
    };
  } catch (e) {
    return {
      configured: true,
      results: [
        {
          service: "gmail",
          user: process.env.SMTP_USER,
          ok: false,
          error: (e.message || String(e)).slice(0, 300),
        },
      ],
    };
  }
};





// Contact: notify the owner that a visitor wrote (Gmail + App Password).
const sendContactEmail = async (contact) => {
  if (!emailEnabled()) return { delivered: false, skipped: true, error: "" };
  if (!configured()) {
    return {
      delivered: false,
      error:
        "Email delivery is not configured. Add SMTP_HOST, SMTP_USER and SMTP_PASS to the server environment.",
    };
  }
  const text = `${contact.name} (${contact.email}) wrote:\n\n${contact.message}`;
  const html = `<h2>New portfolio contact</h2><p><b>Name:</b> ${contact.name}</p><p><b>Email:</b> ${contact.email}</p><p><b>Subject:</b> ${contact.subject}</p><p>${(contact.message || "").replace(/\n/g, "<br>")}</p>`;
  try {
    return await sendViaGmail({
      from: `SEKA Shalom <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      replyTo: contact.email,
      subject: `Portfolio Contact: ${contact.subject}`,
      text,
      html,
    });
  } catch (e) {
    const msg = (e.message || String(e)).slice(0, 300);
    logger.warn(`Gmail delivery failed: ${msg}`);
    return {
      delivered: false,
      error: `Email could not be sent. Gmail said: ${msg}`,
    };
  }
};

// Admin: reply to a sender from the dashboard (Gmail + App Password).
const sendReply = async ({ to, subject, body, fromName }) => {
  if (!emailEnabled()) return { delivered: false, skipped: true, error: "" };
  if (!configured()) {
    logger.warn("No mail provider configured. Reply not sent.");
    return {
      delivered: false,
      error:
        "Email delivery is not configured. Add SMTP_HOST, SMTP_USER and SMTP_PASS to the server environment.",
    };
  }
  const text = body;
  const html = (body || "").replace(/\n/g, "<br>");
  try {
    return await sendViaGmail({
      from: `${fromName || process.env.ADMIN_NAME || "SEKA Shalom"} <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });
  } catch (e) {
    const msg = (e.message || String(e)).slice(0, 300);
    logger.warn(`Gmail reply delivery failed: ${msg}`);
    return {
      delivered: false,
      error: `Email could not be sent. Gmail said: ${msg}`,
    };
  }
};

module.exports = { sendContactEmail, sendReply, testSmtpConnection };
