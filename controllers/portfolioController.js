import Portfolio from "../models/Portfolio.js";
import cloudinary from "../config/cloudinary.js";

export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    // Find portfolio entry
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }

    // Delete from Cloudinary
    if (portfolio.publicId) {
      await cloudinary.uploader.destroy(portfolio.publicId);
    }

    // Delete from MongoDB
    await Portfolio.findByIdAndDelete(id);

    res.json({ message: "Portfolio item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting portfolio", error: err.message });
  }
};
