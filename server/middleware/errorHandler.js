const logger = require("../utils/logger");
const notFound = (req, res, next) => {
  const e = new Error(`Route not found: ${req.originalUrl}`);
  e.statusCode = 404;
  next(e);
};
const errorHandler = (err, req, res, next) => {
  const code = err.statusCode || 500;
  const msg = err.message || "Internal server error";
  // Don't log HEAD/OPTIONS as errors (Render + uptime probes). Log 5xx as
  // error, ordinary 4xx/404 as warning — keeps the logs clean.
  if (req.method !== "HEAD" && req.method !== "OPTIONS") {
    if (code >= 500) logger.error(`${req.method} ${req.originalUrl} ${code} - ${msg}`);
    else logger.warn(`${req.method} ${req.originalUrl} ${code} - ${msg}`);
  }
  res
    .status(code)
    .json({
      success: false,
      message: msg,
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
  void next;
};
module.exports = { notFound, errorHandler };
