// Vercel serverless entry point for the Express API.
// All /api/* routes are already mounted in server.js, so we just re-export the
// configured Express app. Vercel's @vercel/node runs this as a single lambda,
// with the cold-start DB + admin boot handled inside server.js.
const { app } = require("../server.js");
module.exports = app;
