const mongoose = require("mongoose");
const slugify = require("slugify");
const fm = new mongoose.Schema(
  {
    transactionsHandled: { type: String, default: "—", trim: true },
    uptime: { type: String, default: "—", trim: true },
    performanceGain: { type: String, default: "—", trim: true },
    usersServed: { type: String, default: "—", trim: true },
  },
  { _id: false },
);
const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, sparse: true, trim: true, index: true },
    tagline: { type: String, default: "", trim: true, maxlength: 200 },
    description: { type: String, default: "", trim: true },
    category: {
      type: String,
      default: "FinTech",
      enum: [
        "FinTech",
        "Banking",
        "Management",
        "Analytics",
        "Infrastructure",
        "E-Commerce",
        "Web App",
        "Mobile",
        "Other",
      ],
    },
    projectType: { type: String, default: "", trim: true },
    status: {
      type: String,
      default: "Pending",
      enum: ["Finished", "In-Progress", "Pending"],
    },
    completionPercentage: { type: Number, default: 0, min: 0, max: 100 },
    startDate: { type: Date, default: Date.now },
    completionDate: { type: Date, default: null },
    techStack: [{ type: String, trim: true }],
    features: [{ type: String, trim: true }],
    challenges: { type: String, default: "", trim: true },
    outcomes: { type: String, default: "", trim: true },
    liveUrl: { type: String, default: null, trim: true },
    githubUrl: { type: String, default: null, trim: true },
    thumbnailUrl: { type: String, default: "", trim: true },
    screenshots: [{ type: String, trim: true }],
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0, index: true },
    financialMetrics: {
      type: fm,
      default: () => ({}),
    },
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
