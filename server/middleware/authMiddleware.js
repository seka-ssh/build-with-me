const jwt = require("jsonwebtoken");
const protect = (req, res, next) => {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided." });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};
module.exports = { protect };
