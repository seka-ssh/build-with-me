const Contact = require("../models/Contact");
const { sendReply } = require("../utils/emailService");

const getAll = async (req, res, next) => {
  try {
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, count: messages.length, data: messages });
  } catch (e) {
    return next(e);
  }
};

const getOne = async (req, res, next) => {
  try {
    const m = await Contact.findById(req.params.id);
    if (!m) return res.status(404).json({ success: false, message: "Message not found." });
    return res.json({ success: true, data: m });
  } catch (e) {
    return next(e);
  }
};

const markRead = async (req, res, next) => {
  try {
    const m = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true },
    );
    if (!m) return res.status(404).json({ success: false, message: "Message not found." });
    return res.json({ success: true, data: m });
  } catch (e) {
    return next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const m = await Contact.findByIdAndDelete(req.params.id);
    if (!m) return res.status(404).json({ success: false, message: "Message not found." });
    return res.json({ success: true, message: "Message deleted." });
  } catch (e) {
    return next(e);
  }
};

// Admin: reply to a contact message by email, straight from the dashboard
const reply = async (req, res, next) => {
  try {
    const m = await Contact.findById(req.params.id);
    if (!m) return res.status(404).json({ success: false, message: "Message not found." });
    const { body } = req.body;
    if (!body || !body.trim())
      return res.status(400).json({ success: false, message: "Reply body is required." });
    const result = await sendReply({
      to: m.email,
      subject: `Re: ${m.subject || "Your message"}`,
      body,
    });
    return res.json({
      success: true,
      message: result.delivered
        ? "Reply sent by email."
        : result.skipped
        ? "Reply saved. Email delivery is turned off on the server."
        : result.error || "Saved, but email could not be delivered.",
      delivered: result.delivered,
      skipped: Boolean(result.skipped),
    });
  } catch (e) {
    return next(e);
  }
};

module.exports = { getAll, getOne, markRead, remove, reply };