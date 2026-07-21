const Contact = require("../models/Contact");
const { sendContactEmail } = require("../utils/emailService");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message)
      return res
        .status(400)
        .json({
          success: false,
          message: "Name, email, subject, and message are required.",
        });
    if (!emailPattern.test(email))
      return res
        .status(400)
        .json({
          success: false,
          message: "A valid email address is required.",
        });
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip || "",
      userAgent: req.get("user-agent") || "",
    });
    const result = await sendContactEmail(contact);
    contact.emailDelivered = result.delivered;
    await contact.save();
    return res
      .status(201)
      .json({
        success: true,
        message:
          "Your message has been received. I'll respond within 24 hours.",
        data: { id: contact._id, emailDelivered: contact.emailDelivered },
      });
  } catch (e) {
    return next(e);
  }
};
module.exports = { createContact };
