import express from "express";
import announcementUpload from "../middleware/announcementUpload.js";
import { createAnnouncement, getApprovedAnnouncements, getApprovedOrPendingAnnouncements } from "../controllers/announcementController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create announcement
router.post(
    "/create",
    verifyToken,
    announcementUpload.single("attachment"),
    createAnnouncement
);

// Fetch approved announcements
router.get("/approved", getApprovedAnnouncements);

// Fetch approved OR pending announcements
router.get("/", verifyToken, getApprovedOrPendingAnnouncements);

export default router;
