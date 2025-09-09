import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import adminRoutes from "./routes/admin.js";
import adminAuth from "./middleware/adminAuth.js";
import contactRoutes from "./routes/contact.js";
import portfolioRoutes from "./routes/portfolio.js";

dotenv.config();
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());


// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes); // login route
// app.use("/api/portfolio", portfolioRoutes);
app.use("/api/portfolio", portfolioRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
