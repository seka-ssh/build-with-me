const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    role: { type: String, default: "", trim: true, maxlength: 80 },
    company: { type: String, default: "", trim: true, maxlength: 80 },
    photoUrl: { type: String, default: "", trim: true },
    message: { type: String, required: true, trim: true, maxlength: 800 },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Testimonial", schema);