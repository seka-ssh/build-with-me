const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    title: { type: String, default: "" },
    bio: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    aboutTitle: { type: String, default: "" },
    aboutText: { type: String, default: "" },
    education: { type: String, default: "" },
    location: { type: String, default: "" },
    aboutImage: { type: String, default: "" },
    email: { type: String, default: "sekashalom74@gmail.com" },
    phonePrimary: { type: String, default: "0788212710" },
    phoneSecondary: { type: String, default: "0728212710" },
    github: { type: String, default: "https://github.com/seka-ssh" },
    linkedin: {
      type: String,
      default: "https://www.linkedin.com/in/seka-shalom-653047394",
    },
    instagram: { type: String, default: "https://www.instagram.com/cybedevs" },
    twitter: { type: String, default: "" },
    cvUrl: { type: String, default: "" },
    domain: { type: String, default: "" },
    // Stats
    projectsCount: { type: Number, default: 0 },
    yearsExperience: { type: Number, default: 0 },
    countriesServed: { type: Number, default: 0 },
    clientsServed: { type: Number, default: 0 },
    usersServed: { type: String, default: "" },
    transactions: { type: String, default: "" },
    uptime: { type: String, default: "" },
    availability: { type: String, default: "Available for work" },
    // Announcement banner shown to visitors at the top of the site
    announcementText: { type: String, default: "" },
    announcementLink: { type: String, default: "" },
    announcementActive: { type: Boolean, default: false },
  },
  { timestamps: true },
);
module.exports = mongoose.model("SiteSettings", schema);