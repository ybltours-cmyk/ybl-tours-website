import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import { getAllUsers, updateUserRole, deleteUser } from "../controllers/adminUserController.js";
import { getAllBookingsAdmin, updateBookingStatus } from "../controllers/adminBookingController.js";
import { markFeatured, unmarkFeatured } from "../controllers/adminTourController.js";
import { getDashboardStats, getMonthlyRevenue } from "../controllers/adminDashboardController.js";

const router = express.Router();

// User management
router.get("/users", protect, admin, getAllUsers);
router.put("/users/role/:id", protect, admin, updateUserRole);
router.delete("/users/:id", protect, admin, deleteUser);

// Booking management
router.get("/bookings", protect, admin, getAllBookingsAdmin);
router.put("/bookings/:id", protect, admin, updateBookingStatus);

// Tour management
router.put("/tours/feature/:id", protect, admin, markFeatured);
router.put("/tours/unfeature/:id", protect, admin, unmarkFeatured);

// Dashboard analytics
router.get("/dashboard/stats", protect, admin, getDashboardStats);
router.get("/dashboard/monthly-revenue", protect, admin, getMonthlyRevenue);

export default router;


