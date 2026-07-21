const mongoose = require("mongoose");
const logger = require("../utils/logger");
const connectDB = async () => {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required.");
  mongoose.set("strictQuery", true);
  const c = await mongoose.connect(process.env.MONGODB_URI, {
    autoIndex: process.env.NODE_ENV !== "production",
  });
  logger.info(`MongoDB connected: ${c.connection.host}/${c.connection.name}`);
  return c;
};
module.exports = connectDB;
