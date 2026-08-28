/* Live SMTP test — verifies Gmail credentials and sends a test email.
   Uses SMTP_PORT (default 587); if SMTP_PORT=465 it enables implicit TLS. */
require("dotenv").config();
const nodemailer = require("nodemailer");

const port = Number(process.env.SMTP_PORT || 587);

const t = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  connectionTimeout: 8000,
  greetingTimeout: 8000,
  socketTimeout: 10000,
});

(async () => {
  try {
    await t.verify();
    console.log("SMTP_VERIFY_OK — Gmail accepted the credentials");
    const info = await t.sendMail({
      from: `"SEKA Portfolio" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: "Test email from your portfolio — email delivery is LIVE",
      text: "If you received this, dashboard email replies and contact notifications are working. — SEKA Portfolio",
      html:
        '<h2 style="color:#B45309">Email delivery is live &#127881;</h2>' +
        "<p>If you received this, <b>Send Reply</b> in your admin dashboard and contact-form notifications now really deliver email.</p>" +
        "<p>— SEKA Portfolio</p>",
    });
    console.log("TEST_EMAIL_SENT_OK — id:", info.messageId);
  } catch (e) {
    console.log("SMTP_FAILED:", e.message);
    process.exitCode = 1;
  }
})();