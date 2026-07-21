const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    subject: {
      type: String,
      required: true,
      enum: ["General", "Project Inquiry", "Partnership", "Speaking"],
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 3000,
    },
    source: { type: String, default: "portfolio" },
    ipAddress: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    emailDelivered: { type: Boolean, default: false },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Contact", schema);
