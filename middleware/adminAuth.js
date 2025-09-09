import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const adminAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(403).json({ message: "No token, unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    if (user.role !== "admin")
      return res.status(403).json({ message: "Admins only" });
    req.user = user;
    next();
  });
};

export default adminAuth;
