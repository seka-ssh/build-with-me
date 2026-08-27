const express = require("express");
const testimonial = require("../controllers/testimonialController");
const certificate = require("../controllers/certificateController");
const site = require("../controllers/siteController");
const skill = require("../controllers/skillController");
const hire = require("../controllers/hireController");

const router = express.Router();
const { uploadFile } = require("../controllers/uploadController");
const { upload } = require("../middleware/upload");

// Public upload (used by the Hire Me form attachment) — 5MB limit
router.post("/upload", upload.single("file"), uploadFile);

router.get("/testimonials", testimonial.getAll);
router.get("/certificates", certificate.getAll);
router.get("/settings", site.get);
router.get("/skills", skill.getAll);
router.post("/hire", hire.create);

module.exports = router;