const HireRequest = require("../models/HireRequest");
const { sendReply } = require("../utils/emailService");
const { push } = require("../utils/notify");

// Public: submit a hire / project request (optionally with attachment)
const create = async (req, res, next) => {
  try {
    const { name, email, projectType, project, description, budget, attachmentUrl } =
      req.body;
    if (!name || !email || !description)
      return res.status(400).json({
        success: false,
        message: "Name, email, and description are required.",
      });
    const data = await HireRequest.create({
      name,
      email,
      projectType: projectType || "",
      project: project || "",
      description,
      budget: budget || "",
      attachmentUrl: attachmentUrl || "",
      ipAddress: req.ip || "",
    });
    await push({
      type: "hire",
      title: "New hire request",
      body: `${name} (${email}) — ${projectType || "project"}: ${String(project || description).slice(0, 80)}`,
      link: "hire",
    });
    return res.status(201).json({
      success: true,
      message: "Your project request has been received. I'll get back to you soon.",
      data: { id: data._id },
    });
  } catch (e) {
    return next(e);
  }
};

// Admin
const getAll = async (req, res, next) => {
  try {
    const data = await HireRequest.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, count: data.length, data });
  } catch (e) {
    return next(e);
  }
};

const getOne = async (req, res, next) => {
  try {
    const d = await HireRequest.findById(req.params.id);
    if (!d) return res.status(404).json({ success: false, message: "Request not found." });
    return res.json({ success: true, data: d });
  } catch (e) {
    return next(e);
  }
};

const markRead = async (req, res, next) => {
  try {
    const d = await HireRequest.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true },
    );
    if (!d) return res.status(404).json({ success: false, message: "Request not found." });
    return res.json({ success: true, data: d });
  } catch (e) {
    return next(e);
  }
};

const setStatus = async (req, res, next) => {
  try {
    const d = await HireRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    if (!d) return res.status(404).json({ success: false, message: "Request not found." });
    return res.json({ success: true, data: d });
  } catch (e) {
    return next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const d = await HireRequest.findByIdAndDelete(req.params.id);
    if (!d) return res.status(404).json({ success: false, message: "Request not found." });
    return res.json({ success: true, message: "Request deleted." });
  } catch (e) {
    return next(e);
  }
};

// Admin: reply to a hire request by email from the dashboard
const reply = async (req, res, next) => {
  try {
    const d = await HireRequest.findById(req.params.id);
    if (!d) return res.status(404).json({ success: false, message: "Request not found." });
    const { body } = req.body;
    if (!body || !body.trim())
      return res.status(400).json({ success: false, message: "Reply body is required." });
    const result = await sendReply({
      to: d.email,
      subject: `Re: Your project request${d.project ? ` — ${d.project}` : ""}`,
      body,
    });
    return res.json({
      success: true,
      message: result.delivered
        ? "Reply sent by email."
        : result.error || "Saved, but email could not be delivered.",
      delivered: result.delivered,
    });
  } catch (e) {
    return next(e);
  }
};

module.exports = { create, getAll, getOne, markRead, setStatus, remove, reply };