const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    route: { type: String, required: true, trim: true, index: true },
    projectSlug: { type: String, default: null, trim: true, index: true },
    sessionId: { type: String, required: true, trim: true, index: true },
    eventType: {
      type: String,
      enum: ["page_view", "project_view"],
      default: "page_view",
    },
    ipHash: { type: String, required: true, trim: true },
    userAgent: { type: String, default: "" },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Analytics", schema);
