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
  });
const sendContactEmail = async (contact) => {
  if (!configured()) {
    logger.warn("SMTP not configured. Contact saved only.");
    return { delivered: false };
  }
  try {
    const tx = transporter();
    const info = await tx.sendMail({
      from: `SEKA Shalom <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      replyTo: contact.email,
      subject: `Portfolio Contact: ${contact.subject}`,
      text: `${contact.name} (${contact.email}) wrote:\n\n${contact.message}`,
      html: `<h2>New portfolio contact</h2><p><b>Name:</b> ${contact.name}</p><p><b>Email:</b> ${contact.email}</p><p><b>Subject:</b> ${contact.subject}</p><p>${contact.message.replace(/\n/g, "<br>")}</p>`,
    });
    return { delivered: true, messageId: info.messageId };
  } catch (e) {
    logger.warn(`Email delivery failed: ${e.message}`);
    return { delivered: false };
  }
};
// Admin: reply to any sender from the dashboard
const sendReply = async ({ to, subject, body, fromName }) => {
  if (!configured()) {
    logger.warn("SMTP not configured. Reply not sent.");
    return { delivered: false };
  }
  try {
    const info = await transporter().sendMail({
      from: `${fromName || process.env.ADMIN_NAME || "SEKA Shalom"} <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: body,
      html: body.replace(/\n/g, "<br>"),
    });
    return { delivered: true, messageId: info.messageId };
  } catch (e) {
    logger.warn(`Reply delivery failed: ${e.message}`);
    return { delivered: false };
  }
};
module.exports = { sendContactEmail, sendReply };
