const Notification = require("../models/Notification");

// Create an admin notification. Never throws — notifications must not break
// the main request flow.
const push = async ({ type = "system", title, body = "", link = "" }) => {
  try {
    await Notification.create({ type, title, body, link });
  } catch (e) {
    /* ignore */
  }
};

module.exports = { push };