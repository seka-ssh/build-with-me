const Skill = require("../models/Skill");

const getAll = async (req, res, next) => {
  try {
    const data = await Skill.find({}).sort({ group: 1, order: 1 });
    return res.json({ success: true, count: data.length, data });
  } catch (e) {
    return next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { group, name, level, description, icon, order } = req.body;
    if (!group || !name)
      return res
        .status(400)
        .json({ success: false, message: "Group and skill name are required." });
    const data = await Skill.create({
      group,
      name,
      level: level || "Advanced",
      description: description || "",
      icon: icon || "Code2",
      order: Number(order || 0),
    });
    return res.status(201).json({ success: true, data });
  } catch (e) {
    return next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const s = await Skill.findById(req.params.id);
    if (!s) return res.status(404).json({ success: false, message: "Skill not found." });
    ["group", "name", "level", "description", "icon", "order"].forEach((k) => {
      if (req.body[k] !== undefined) s[k] = req.body[k];
    });
    await s.save();
    return res.json({ success: true, data: s });
  } catch (e) {
    return next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const s = await Skill.findByIdAndDelete(req.params.id);
    if (!s) return res.status(404).json({ success: false, message: "Skill not found." });
    return res.json({ success: true, message: "Skill deleted." });
  } catch (e) {
    return next(e);
  }
};

module.exports = { getAll, create, update, remove };