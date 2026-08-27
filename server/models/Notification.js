const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    type: { type: String, enum: ["message", "hire", "system"], default: "system" },
    title: { type: String, required: true },
    body: { type: String, default: "" },
    link: { type: String, default: "" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Notification", schema);