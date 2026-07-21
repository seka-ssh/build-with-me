const mongoose = require("mongoose");
const slugify = require("slugify");
const fm = new mongoose.Schema(
  {
    transactionsHandled: { type: String, required: true, trim: true },
    uptime: { type: String, required: true, trim: true },
    performanceGain: { type: String, required: true, trim: true },
    usersServed: { type: String, required: true, trim: true },
  },
  { _id: false },
);
const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true, index: true },
    tagline: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        "FinTech",
        "Banking",
        "Management",
        "Analytics",
        "Infrastructure",
        "E-Commerce",
      ],
    },
    status: {
      type: String,
      required: true,
      enum: ["Finished", "In-Progress", "Pending"],
    },
    completionPercentage: { type: Number, required: true, min: 0, max: 100 },
    startDate: { type: Date, required: true },
    completionDate: { type: Date, default: null },
    techStack: [{ type: String, required: true, trim: true }],
    features: [{ type: String, required: true, trim: true }],
    challenges: { type: String, required: true, trim: true },
    outcomes: { type: String, required: true, trim: true },
    liveUrl: { type: String, default: null, trim: true },
    githubUrl: { type: String, default: null, trim: true },
    thumbnailUrl: { type: String, required: true, trim: true },
    screenshots: [{ type: String, trim: true }],
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, required: true, index: true },
    financialMetrics: { type: fm, required: true },
  },
  { timestamps: true },
);
schema.pre("validate", function (next) {
  if (!this.slug && this.title)
    this.slug = slugify(this.title.split("—")[0], {
      lower: true,
      strict: true,
    });
  next();
});
module.exports = mongoose.model("Project", schema);
