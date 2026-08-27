const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
// Uploads only go to Cloudinary when enabled AND fully configured.
// With CLOUDINARY_ENABLED=false (or a bad cloud name) files are stored on the
// local disk under /uploads and still work everywhere on the site.
const hasCloud =
  process.env.CLOUDINARY_ENABLED === "true" &&
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
if (hasCloud) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB max
});

// Save a buffer to the local /uploads folder as a reliable fallback.
const saveLocal = (file, folder) => {
  const base = path.join(__dirname, "..", "uploads", folder || "misc");
  fs.mkdirSync(base, { recursive: true });
  const ext = path.extname(file.originalname) || "";
  const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  const abs = path.join(base, name);
  fs.writeFileSync(abs, file.buffer);
  const rel = `/${folder || "misc"}/${name}`;
  return { url: `/uploads${rel}`, publicId: null };
};

const uploadToCloudinary = (file, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folder || "seka-portfolio", resource_type: "auto" },
      (err, result) => {
        if (err) return reject(err);
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );
    stream.end(file.buffer);
  });

// High-level upload: try Cloudinary, fall back to local disk on any failure.
const uploadFile = async (file, folder) => {
  if (hasCloud) {
    try {
      return await uploadToCloudinary(file, folder);
    } catch (e) {
      // fall through to local
    }
  }
  return saveLocal(file, folder);
};

module.exports = { upload, uploadToCloudinary, saveLocal, uploadFile, cloudinary };