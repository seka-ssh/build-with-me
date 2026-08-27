const Notification = require("../models/Notification");

const list = async (req, res, next) => {
  try {
    const [items, unread] = await Promise.all([
      Notification.find({}).sort({ createdAt: -1 }).limit(30),
      Notification.countDocuments({ read: false }),
    ]);
    return res.json({ success: true, unread, data: items });
  } catch (e) {
    return next(e);
  }
};

const markRead = async (req, res, next) => {
  try {
    const n = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true },
    );
    if (!n) return res.status(404).json({ success: false, message: "Notification not found." });
    return res.json({ success: true, data: n });
  } catch (e) {
    return next(e);
  }
};

const markAllRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ read: false }, { read: true });
    return res.json({ success: true, message: "All notifications marked as read." });
  } catch (e) {
    return next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const n = await Notification.findByIdAndDelete(req.params.id);
    if (!n) return res.status(404).json({ success: false, message: "Notification not found." });
    return res.json({ success: true, message: "Notification deleted." });
  } catch (e) {
    return next(e);
  }
};

module.exports = { list, markRead, markAllRead, remove };