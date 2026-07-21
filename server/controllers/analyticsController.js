const crypto = require("crypto");
const Analytics = require("../models/Analytics");
const hashIp = (v) =>
  crypto
    .createHash("sha256")
    .update(String(v || "unknown"))
    .digest("hex");
const trackView = async (req, res, next) => {
  try {
    const route = req.body.route || "/";
    const sessionId = req.body.sessionId || crypto.randomUUID();
    const projectSlug = req.body.projectSlug || null;
    const event = await Analytics.create({
      route,
      sessionId,
      projectSlug,
      eventType: projectSlug ? "project_view" : "page_view",
      ipHash: hashIp(req.ip),
      userAgent: req.get("user-agent") || "",
      metadata: {
        referrer: req.get("referer") || "",
        language: req.get("accept-language") || "",
      },
    });
    return res.status(201).json({ success: true, data: { id: event._id } });
  } catch (e) {
    return next(e);
  }
};
const getViews = async (req, res, next) => {
  try {
    const [totalViews, sessions, projectViews, topRoutes] = await Promise.all([
      Analytics.countDocuments({}),
      Analytics.distinct("sessionId"),
      Analytics.countDocuments({ eventType: "project_view" }),
      Analytics.aggregate([
        { $group: { _id: "$route", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ]),
    ]);
    return res.json({
      success: true,
      data: {
        totalViews,
        uniqueSessions: sessions.length,
        projectViews,
        topRoutes: topRoutes.map((x) => ({ route: x._id, count: x.count })),
      },
    });
  } catch (e) {
    return next(e);
  }
};
module.exports = { trackView, getViews };
