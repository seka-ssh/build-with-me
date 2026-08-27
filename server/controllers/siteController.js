const SiteSettings = require("../models/SiteSettings");

const get = async (req, res, next) => {
  try {
    let s = await SiteSettings.findOne({ key: "site" });
    if (!s) {
      s = await SiteSettings.create({ key: "site" });
    }
    const data = {
      name: s.name,
      title: s.title,
      bio: s.bio,
      profileImage: s.profileImage,
      aboutTitle: s.aboutTitle,
      aboutText: s.aboutText,
      education: s.education,
      location: s.location,
      aboutImage: s.aboutImage,
      email: s.email,
      phonePrimary: s.phonePrimary,
      phoneSecondary: s.phoneSecondary,
      github: s.github,
      linkedin: s.linkedin,
      instagram: s.instagram,
      twitter: s.twitter,
      cvUrl: s.cvUrl,
      domain: s.domain,
      projectsCount: s.projectsCount,
      yearsExperience: s.yearsExperience,
      countriesServed: s.countriesServed,
      clientsServed: s.clientsServed,
      usersServed: s.usersServed,
      transactions: s.transactions,
      uptime: s.uptime,
      availability: s.availability,
      announcementText: s.announcementText,
      announcementLink: s.announcementLink,
      announcementActive: s.announcementActive,
    };
    return res.json({ success: true, data });
  } catch (e) {
    return next(e);
  }
};

const update = async (req, res, next) => {
  try {
    let s = await SiteSettings.findOne({ key: "site" });
    if (!s) s = new SiteSettings({ key: "site" });
    const allowed = [
      "name",
      "title",
      "bio",
      "profileImage",
      "aboutTitle",
      "aboutText",
      "education",
      "location",
      "aboutImage",
      "email",
      "phonePrimary",
      "phoneSecondary",
      "github",
      "linkedin",
      "instagram",
      "twitter",
      "cvUrl",
      "domain",
      "projectsCount",
      "yearsExperience",
      "countriesServed",
      "clientsServed",
      "usersServed",
      "transactions",
      "uptime",
      "availability",
      "announcementText",
      "announcementLink",
    ];
    if (req.body.announcementActive !== undefined)
      s.announcementActive = Boolean(req.body.announcementActive);
    allowed.forEach((k) => {
      if (req.body[k] !== undefined) s[k] = req.body[k];
    });
    ["projectsCount", "yearsExperience", "countriesServed", "clientsServed"].forEach(
      (k) => {
        if (req.body[k] !== undefined) s[k] = Number(req.body[k]) || 0;
      },
    );
    await s.save();
    return res.json({ success: true, data: s });
  } catch (e) {
    return next(e);
  }
};

module.exports = { get, update };