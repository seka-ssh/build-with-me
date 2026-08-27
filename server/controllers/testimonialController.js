const Testimonial = require("../models/Testimonial");

const getAll = async (req, res, next) => {
  try {
    const data = await Testimonial.find({}).sort({ order: 1, createdAt: -1 });
    return res.json({ success: true, count: data.length, data });
  } catch (e) {
    return next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, role, company, photoUrl, message, rating, isFeatured, order } =
      req.body;
    if (!name || !message)
      return res
        .status(400)
        .json({ success: false, message: "Name and message are required." });
    const data = await Testimonial.create({
      name,
      role: role || "",
      company: company || "",
      photoUrl: photoUrl || "",
      message,
      rating: Number(rating || 5),
      isFeatured: Boolean(isFeatured),
      order: Number(order || 0),
    });
    return res.status(201).json({ success: true, data });
  } catch (e) {
    return next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const t = await Testimonial.findById(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: "Testimonial not found." });
    const allowed = [
      "name",
      "role",
      "company",
      "photoUrl",
      "message",
      "rating",
      "isFeatured",
      "order",
    ];
    allowed.forEach((k) => {
      if (req.body[k] !== undefined) t[k] = req.body[k];
    });
    await t.save();
    return res.json({ success: true, data: t });
  } catch (e) {
    return next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const t = await Testimonial.findByIdAndDelete(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: "Testimonial not found." });
    return res.json({ success: true, message: "Testimonial deleted." });
  } catch (e) {
    return next(e);
  }
};

module.exports = { getAll, create, update, remove };