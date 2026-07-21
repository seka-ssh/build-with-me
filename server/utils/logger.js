const path = require("path");
const winston = require("winston");
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(
      ({ timestamp, level, message, stack }) =>
        `${timestamp} [${level.toUpperCase()}] ${stack || message}`,
    ),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(__dirname, "..", "combined.log"),
    }),
  ],
});
module.exports = logger;
