const Project = require("../models/Project");
const getAllProjects = async (req, res, next) => {
  try {
    const data = await Project.find({}).sort({ order: 1 });
    res.json({ success: true, count: data.length, data });
  } catch (e) {
    next(e);
  }
};
const getFeaturedProjects = async (req, res, next) => {
  try {
    const data = await Project.find({ isFeatured: true }).sort({ order: 1 });
    res.json({ success: true, count: data.length, data });
  } catch (e) {
    next(e);
  }
};
const getProjectsByStatus = async (req, res, next) => {
  try {
    const status = req.params.status;
    if (!["Finished", "In-Progress", "Pending"].includes(status))
      return res
        .status(400)
        .json({ success: false, message: "Invalid project status." });
    const data = await Project.find({ status }).sort({ order: 1 });
    return res.json({ success: true, count: data.length, data });
  } catch (e) {
    return next(e);
  }
};
const getProjectBySlug = async (req, res, next) => {
  try {
    const data = await Project.findOne({ slug: req.params.slug });
    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    return res.json({ success: true, data });
  } catch (e) {
    return next(e);
  }
};
module.exports = {
  getAllProjects,
  getFeaturedProjects,
  getProjectsByStatus,
  getProjectBySlug,
};
