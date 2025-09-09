import express from "express";
import Portfolio from "../models/Portfolio.js";
import cloudinary from "../config/cloudinary.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/upload.js";
import { deletePortfolio } from "../controllers/portfolioController.js";
// import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

// ✅ Add new portfolio item (Admin only)
router.post("/", adminAuth, upload.single("image"), async (req, res) => {
  try {
    const newPortfolio = new Portfolio({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.file.secure_url || req.file.path,
    });
    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all portfolio items (Public)
router.get("/", async (req, res) => {
  try {
    const items = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete portfolio item (Admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the item
    const item = await Portfolio.findById(id);
    if (!item) return res.status(404).json({ message: "Portfolio item not found" });

    // Optional: Delete from Cloudinary if you stored the image there
    // await cloudinary.uploader.destroy(item.public_id);

    await Portfolio.findByIdAndDelete(id);
    res.status(200).json({ message: "Portfolio item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
