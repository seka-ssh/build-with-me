require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});
const Admin = require("../models/Admin");
const logger = require("../utils/logger");

// Creates (or updates) the admin login from environment variables on startup.
// Great for first-run and for resetting credentials.
const ensureAdmin = async () => {
  const email = (process.env.ADMIN_EMAIL || "").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";
  if (!email || !password) {
    logger.warn("ADMIN_EMAIL / ADMIN_PASSWORD not set. Skipping admin seed.");
    return;
  }
  let admin = await Admin.findOne({ email });
  if (!admin) {
    await Admin.create({
      name: process.env.ADMIN_NAME || "Admin",
      email,
      password,
    });
    logger.info(`Admin created for ${email}`);
  }
};

module.exports = ensureAdmin;