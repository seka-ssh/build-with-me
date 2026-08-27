const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true },
    projectType: { type: String, default: "", trim: true },
    project: { type: String, default: "", trim: true },
    description: { type: String, required: true, trim: true, maxlength: 4000 },
    budget: { type: String, default: "", trim: true },
    attachmentUrl: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "Completed", "Archived"],
      default: "New",
    },
    read: { type: Boolean, default: false },
    ipAddress: { type: String, default: "" },
  },
  { timestamps: true },
);
module.exports = mongoose.model("HireRequest", schema);