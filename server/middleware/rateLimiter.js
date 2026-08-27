const rateLimit = require("express-rate-limit");
const generalLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 900000),
  max: Number(process.env.RATE_LIMIT_MAX || 500),
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === "/health" || req.method === "OPTIONS",
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again later.",
  },
});
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Contact form limit reached. Please try again after one hour.",
  },
});
module.exports = { generalLimiter, contactLimiter };
