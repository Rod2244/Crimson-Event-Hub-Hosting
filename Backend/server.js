import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import { googleSignup  } from "./auth/googleAuth.js"

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173", // allow requests from your React app
  credentials: true, // if you plan to send cookies (optional)
}));
app.use(express.json()); // parse JSON bodies

// ✅ Static folder for uploads
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.post("/auth/google/signup", googleSignup );

// ✅ Start server
const PORT = process.env.PORT || 5100; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
