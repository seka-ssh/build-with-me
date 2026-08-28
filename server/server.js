require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const publicRoutes = require("./routes/publicRoutes");
const { generalLimiter } = require("./middleware/rateLimiter");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const ensureAdmin = require("./scripts/ensureAdmin");
const logger = require("./utils/logger");
const app = express();
const PORT = Number(process.env.PORT || 5000);
const origins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((x) => x.trim());
app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: origins, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(generalLimiter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/health", (req, res) =>
  res.json({
    success: true,
    service: "seka-portfolio-api",
    status: "healthy",
    timestamp: new Date().toISOString(),
  }),
);

// Root route — returns 200 so Render's health probe (HEAD /) and any
// root-level check never hit the 404 handler.
app.get("/", (req, res) =>
  res.json({
    success: true,
    service: "seka-portfolio-api",
    status: "healthy",
    message: "API is running. Use /health or /api/* for endpoints.",
  }),
);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);
app.use(notFound);
app.use(errorHandler);
// The API runs as its OWN service — separate from the static client.
// Host it on Render, Railway, Fly.io, a VPS, etc. `START` command is
// `npm start` (server/package.json → `node server.js`); the platform injects PORT.
(async () => {
  try {
    await connectDB();
    await ensureAdmin();
    app.listen(PORT, () =>
      logger.info(`SEKA Shalom API running on port ${PORT}`),
    );
  } catch (e) {
    logger.error(`Server startup failed: ${e.message}`);
    process.exit(1);
  }
})();

module.exports = { app, PORT };
