const logger = require("../utils/logger");
const notFound = (req, res, next) => {
  const e = new Error(`Route not found: ${req.originalUrl}`);
  e.statusCode = 404;
  next(e);
};
const errorHandler = (err, req, res, next) => {
  const code = err.statusCode || 500;
  logger.error(`${req.method} ${req.originalUrl} ${code} - ${err.message}`);
  res
    .status(code)
    .json({
      success: false,
      message: err.message || "Internal server error",
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
  void next;
};
module.exports = { notFound, errorHandler };
