import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";  // 👈 use configured cloudinary

// Cloudinary storage engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio_uploads",   // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Multer upload middleware
const upload = multer({ storage });

export default upload;
