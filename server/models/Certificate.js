const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    issuer: { type: String, default: "", trim: true, maxlength: 120 },
    fileUrl: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: "", trim: true },
    dateEarned: { type: Date, default: null },
    credentialId: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Certificate", schema);