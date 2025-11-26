import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import compression from "compression";
import cookieParser from "cookie-parser";
import multer from "multer";
import http from "http"; // <-- add this
import { Server as SocketIOServer } from "socket.io"; // <-- add this

// --- Routes ---
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import eventRoutes from "./routes/event.js";
import adminRoutes from "./routes/admin.js";
import announcementRoutes from "./routes/announcement.js";
import pendingRouter from "./routes/pending.js";
import dashboardCountRoutes from "./routes/dashboardCounts.js";
import rejectedRouter from "./routes/rejected.js";
import notificationRouter from "./routes/notification.js";
import archiveRouter from "./routes/archive.js";
import { googleSignup } from "./auth/googleAuth.js";

const app = express();

// --- Middleware ---
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message === "File type not allowed") {
        return res.status(400).json({ message: err.message });
    }
    next(err);
});

// --- Static folders ---
app.use("/uploads/profiles", express.static(path.join(path.resolve(), "uploads/profiles")));
app.use("/uploads/events", express.static(path.join(path.resolve(), "uploads/events")));
app.use("/uploads/announcements", express.static(path.join(path.resolve(), "uploads/announcements")));

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/pending", pendingRouter);
app.use("/api/rejected", rejectedRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/archived", archiveRouter);
app.use("/api", dashboardCountRoutes);
app.post("/auth/google/signup", googleSignup);

// --- Create HTTP server for Socket.IO ---
const server = http.createServer(app);

const io = new SocketIOServer(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// --- Socket.IO connection ---
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// Make io globally accessible (so controllers can emit)
app.set("io", io);

// --- Start server ---
const PORT = process.env.PORT || 5100;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the server at http://localhost:${PORT}`);
});
