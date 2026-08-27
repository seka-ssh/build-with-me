const Project = require("../models/Project");
const slugify = require("slugify");

const create = async (req, res, next) => {
  try {
    const {
      title,
      tagline,
      description,
      category,
      projectType,
      status,
      completionPercentage,
      startDate,
      completionDate,
      techStack,
      features,
      challenges,
      outcomes,
      liveUrl,
      githubUrl,
      thumbnailUrl,
      screenshots,
      isFeatured,
      order,
      financialMetrics,
    } = req.body;
    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Project title is required." });
    const slug = slugify(String(title).split("—")[0].split("-")[0].trim(), {
      lower: true,
      strict: true,
    });
    const data = await Project.create({
      title,
      slug,
      tagline: tagline || "",
      description: description || "",
      category: category || "FinTech",
      projectType: projectType || "",
      status: status || "Pending",
      completionPercentage: Number(completionPercentage || 0),
      startDate: startDate || new Date(),
      completionDate: completionDate || null,
      techStack: Array.isArray(techStack) ? techStack : [],
      features: Array.isArray(features) ? features : [],
      challenges: challenges || "",
      outcomes: outcomes || "",
      liveUrl: liveUrl || null,
      githubUrl: githubUrl || null,
      thumbnailUrl: thumbnailUrl || "",
      screenshots: Array.isArray(screenshots) ? screenshots : [],
      isFeatured: Boolean(isFeatured),
      order: Number(order || 0),
      financialMetrics: {
        transactionsHandled: financialMetrics?.transactionsHandled || "—",
        uptime: financialMetrics?.uptime || "—",
        performanceGain: financialMetrics?.performanceGain || "—",
        usersServed: financialMetrics?.usersServed || "—",
      },
    });
    return res.status(201).json({ success: true, data });
  } catch (e) {
    return next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ success: false, message: "Project not found." });
    const allowed = [
      "title",
      "tagline",
      "description",
      "category",
      "projectType",
      "status",
      "completionPercentage",
      "startDate",
      "completionDate",
      "techStack",
      "features",
      "challenges",
      "outcomes",
      "liveUrl",
      "githubUrl",
      "thumbnailUrl",
      "screenshots",
      "isFeatured",
      "order",
    ];
    allowed.forEach((k) => {
      if (req.body[k] !== undefined) p[k] = req.body[k];
    });
    if (req.body.financialMetrics) {
      p.financialMetrics = { ...p.financialMetrics, ...req.body.financialMetrics };
    }
    if (req.body.title) {
      p.slug = slugify(String(req.body.title).split("—")[0].split("-")[0].trim(), {
        lower: true,
        strict: true,
      });
    }
    await p.save();
    return res.json({ success: true, data: p });
  } catch (e) {
    return next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const p = await Project.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ success: false, message: "Project not found." });
    return res.json({ success: true, message: "Project deleted." });
  } catch (e) {
    return next(e);
  }
};

module.exports = { create, update, remove };