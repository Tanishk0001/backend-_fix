import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import adminAuth from "../middleware/adminAuth.js";

dotenv.config();
const router = express.Router();

// Hardcoded admin credentials (can move to DB later)
const ADMIN_EMAIL = "admin@portfolio.com";
const ADMIN_PASS = "admin123";

// Admin login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Admin verify
router.get("/verify", adminAuth, (req, res) => {
  res.status(200).json({ success: true });
});

export default router;
