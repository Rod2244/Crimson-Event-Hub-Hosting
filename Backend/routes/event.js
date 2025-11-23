import express from "express";
import { createEvent, getAllEvents, deleteEvent, getEventById } from "../controllers/eventController.js";
import upload from "../config/multerEvents.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /events — create new event
router.post(
  "/", 
  verifyToken,
  upload.fields([
    { name: "event_image", maxCount: 1 },
    { name: "attachment", maxCount: 1 }
  ]),
  createEvent
);

// GET /events — list events (user-specific)
router.get("/", verifyToken, getAllEvents);

// DELETE /events/:id
router.delete("/:id", verifyToken, deleteEvent);

// GET /events/:id
router.get("/:id", verifyToken, getEventById);

export default router;
