const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { login, getMe, changePassword } = require("../controllers/adminController");
const projectAdmin = require("../controllers/projectAdminController");
const testimonial = require("../controllers/testimonialController");
const certificate = require("../controllers/certificateController");
const message = require("../controllers/messageController");
const site = require("../controllers/siteController");
const { uploadFile } = require("../controllers/uploadController");
const { upload } = require("../middleware/upload");

const router = express.Router();

// Public
router.post("/login", login);

// Protected
router.use(protect);
router.get("/me", getMe);
router.post("/change-password", changePassword);
router.post("/upload", upload.single("file"), uploadFile);

router.route("/projects").post(projectAdmin.create);
router.route("/projects/:id").put(projectAdmin.update).delete(projectAdmin.remove);

router.route("/testimonials").post(testimonial.create);
router
  .route("/testimonials/:id")
  .put(testimonial.update)
  .delete(testimonial.remove);

router.route("/certificates").post(certificate.create);
router
  .route("/certificates/:id")
  .put(certificate.update)
  .delete(certificate.remove);

router.get("/messages", message.getAll);
router.get("/messages/:id", message.getOne);
router.patch("/messages/:id/read", message.markRead);
router.post("/messages/:id/reply", message.reply);
router.delete("/messages/:id", message.remove);

const skill = require("../controllers/skillController");
router.route("/skills").post(skill.create);
router.route("/skills/:id").put(skill.update).delete(skill.remove);

const hire = require("../controllers/hireController");
router.get("/hire", hire.getAll);
router.get("/hire/:id", hire.getOne);
router.patch("/hire/:id/read", hire.markRead);
router.patch("/hire/:id/status", hire.setStatus);
router.post("/hire/:id/reply", hire.reply);
router.delete("/hire/:id", hire.remove);

router.get("/settings", site.get);
router.put("/settings", site.update);

// Admin notifications (new message / hire request alerts)
const notification = require("../controllers/notificationController");
router.get("/notifications", notification.list);
router.patch("/notifications/read-all", notification.markAllRead);
router.patch("/notifications/:id/read", notification.markRead);
router.delete("/notifications/:id", notification.remove);

module.exports = router;