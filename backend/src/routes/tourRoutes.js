import express from "express";
import {
  createTour,
  getTours,
  getTourById,
  updateTour,
  deleteTour
} from "../controllers/tourController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getTours);
router.get("/:id", getTourById);

// Admin routes
router.post("/", protect, createTour);
router.put("/:id", protect, updateTour);
router.delete("/:id", protect, deleteTour);

export default router;
