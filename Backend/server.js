import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config"; // Ensure this is at the top to load environment variables
import compression from "compression";
import cookieParser from "cookie-parser";

// Import Route Handlers
// Assuming these files are in a './routes' subdirectory
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import eventRoutes from "./routes/event.js"; // Using the eventRoutes.js you provided earlier
import adminRoutes from "./routes/admin.js";
import announcementRoutes from "./routes/announcement.js";
import pendingRouter from "./routes/pending.js";
import dashboardCountRoutes from "./routes/dashboardCounts.js";
import rejectedRouter from "./routes/rejected.js";
import notificationRouter from "./routes/notification.js";
import { googleSignup } from "./auth/googleAuth.js" // Assuming this file/function is available

const app = express();

// --- Middleware ---

// ✅ CORS Configuration
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from your React app
    credentials: true,
}));

app.use(cookieParser());
app.use(compression());

// ✅ Body Parsers
app.use(express.json()); // To parse application/json requests
app.use(express.urlencoded({ extended: true })); // To parse form data (optional, but good practice)

// Multer error handler
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message === "File type not allowed") {
        return res.status(400).json({ message: err.message });
    }
    next(err);
});


// ✅ Static folder for serving uploads
// Note: path.resolve() works well for creating absolute paths.
app.use("/uploads/profiles", express.static(path.join(path.resolve(), "uploads/profiles")));
app.use("/uploads/events", express.static(path.join(path.resolve(), "uploads/events")));
app.use("/uploads/announcements", express.static(path.join(path.resolve(), "uploads/announcements")));

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
// Use the router path /api/events defined in the eventRoutes.js file
app.use("/api/events", eventRoutes); 
app.use("/api/announcements", announcementRoutes);
app.use("/api/pending", pendingRouter);
app.use("/api/rejected", rejectedRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api", dashboardCountRoutes);
app.post("/auth/google/signup", googleSignup);

// ✅ Start server
const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the server at http://localhost:${PORT}`);
});