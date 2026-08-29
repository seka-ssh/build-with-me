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

// Public diagnostic: can this server open a TCP socket to the configured SMTP
// endpoints? No auth, no credentials — just raw connectivity from this host.
// On Render: if results show "connection timeout" for ALL host:port combos,
// Google is dropping the SMTP connection from Render's IP (known limitation).
app.get("/api/email-probe", (req, res) => {
  const net = require("net");
  const primaryHost = (process.env.SMTP_HOST || "smtp.gmail.com")
    .trim()
    .toLowerCase();
  const hosts = [
    ...new Set(
      primaryHost === "smtp.gmail.com"
        ? [primaryHost, "smtp.googlemail.com"]
        : [primaryHost],
    ),
  ];
  const primaryPort = Number(process.env.SMTP_PORT || 587);
  const ports = [
    ...new Set(primaryPort === 465 ? [465, 587] : [587, 465]),
  ];
  const results = [];
  let done = 0;
  const total = hosts.length * ports.length;
  const finish = () => {
    if (++done === total) res.json({ success: true, results });
  };
  if (total === 0) return res.json({ success: true, results: [] });
  for (const host of hosts) {
    for (const port of ports) {
      const entry = { host, port, family: 4, open: false, error: "" };
      const s = net.connect({ host, port, family: 4, timeout: 5000 });
      s.on("connect", () => {
        entry.open = true;
        s.destroy();
        finish();
      });
      s.on("timeout", () => {
        entry.error = "connection timeout";
        s.destroy();
        finish();
      });
      s.on("error", (e) => {
        entry.error = e.code || e.message;
        s.destroy();
        finish();
      });
      results.push(entry);
    }
  }
});

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
