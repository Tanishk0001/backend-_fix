import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  try {
    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: "bhaavyasinha16@gmail.com",
      subject: `Portfolio Contact from ${name}`,
      text: `${message}\n\nFrom: ${name} (${email})`,
    });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Email failed", error: err.message });
  }
});

export default router;
