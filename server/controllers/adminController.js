const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const signToken = (a) =>
  jwt.sign({ id: a._id, role: a.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    const admin = await Admin.findOne({ email: String(email).toLowerCase() });
    if (!admin || !(await admin.matchPassword(password)))
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    return res.json({ success: true, token: signToken(admin), data: admin.toSafe() });
  } catch (e) {
    return next(e);
  }
};

const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin not found." });
    return res.json({ success: true, data: admin.toSafe() });
  } catch (e) {
    return next(e);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.user.id);
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found." });
    if (!(await admin.matchPassword(currentPassword)))
      return res.status(400).json({ success: false, message: "Current password is incorrect." });
    if (!newPassword || String(newPassword).length < 6)
      return res.status(400).json({ success: false, message: "New password must be at least 6 characters." });
    admin.password = newPassword;
    await admin.save();
    return res.json({ success: true, message: "Password updated successfully." });
  } catch (e) {
    return next(e);
  }
};

module.exports = { login, getMe, changePassword };