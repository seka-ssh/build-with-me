const Certificate = require("../models/Certificate");
const mongoose = require("mongoose");
const { isValidObjectId } = mongoose;

const getAll = async (req, res, next) => {
  try {
    const data = await Certificate.find({}).sort({ order: 1, createdAt: -1 });
    return res.json({ success: true, count: data.length, data });
  } catch (e) {
    return next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { title, issuer, fileUrl, imageUrl, dateEarned, credentialId, order } =
      req.body;
    if (!title || !fileUrl)
      return res
        .status(400)
        .json({ success: false, message: "Title and file are required." });
    const data = await Certificate.create({
      title,
      issuer: issuer || "",
      fileUrl,
      imageUrl: imageUrl || "",
      dateEarned: dateEarned || null,
      credentialId: credentialId || "",
      order: Number(order || 0),
    });
    return res.status(201).json({ success: true, data });
  } catch (e) {
    return next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res
        .status(400)
        .json({ success: false, message: `Invalid certificate id: ${id}` });
    const allowed = [
      "title",
      "issuer",
      "fileUrl",
      "imageUrl",
      "dateEarned",
      "credentialId",
      "order",
    ];
    const updateDoc = {};
    allowed.forEach((k) => {
      if (req.body[k] !== undefined) updateDoc[k] = req.body[k];
    });
    const c = await Certificate.findByIdAndUpdate(id, updateDoc, {
      new: true,
      runValidators: true,
    });
    if (!c)
      return res
        .status(404)
        .json({ success: false, message: `Certificate not found (id: ${id}).` });
    return res.json({ success: true, data: c });
  } catch (e) {
    return next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res
        .status(400)
        .json({ success: false, message: `Invalid certificate id: ${id}` });
    const c = await Certificate.findByIdAndDelete(id);
    if (!c)
      return res
        .status(404)
        .json({ success: false, message: `Certificate not found (id: ${id}).` });
    return res.json({ success: true, message: "Certificate deleted." });
  } catch (e) {
    return next(e);
  }
};

module.exports = { getAll, create, update, remove };