const { uploadFile } = require("../middleware/upload");
const uploadFileController = async (req, res, next) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "No file uploaded." });
    const folder = req.body.folder || "seka-portfolio";
    const { url, publicId } = await uploadFile(req.file, folder);
    return res.status(201).json({ success: true, url, publicId });
  } catch (e) {
    return next(e);
  }
};
module.exports = { uploadFile: uploadFileController };