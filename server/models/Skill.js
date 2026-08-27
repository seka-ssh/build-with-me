const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    group: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: ["Expert", "Advanced", "Intermediate", "Beginner"],
      default: "Advanced",
    },
    description: { type: String, default: "", trim: true },
    icon: { type: String, default: "Code2", trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Skill", schema);