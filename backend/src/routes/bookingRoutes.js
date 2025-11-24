import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking
} from "../controllers/bookingController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getMyBookings);
router.put("/cancel/:id", protect, cancelBooking);

// Admin routes
router.get("/", protect, getAllBookings);

export default router;
