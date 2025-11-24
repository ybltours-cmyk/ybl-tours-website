import express from "express";
import protect from "../middleware/authMiddleware.js";

import { createStripePayment, createRazorpayOrder } from "../controllers/paymentController.js";
import { confirmPayment } from "../controllers/paymentConfirmController.js";

const router = express.Router();

// Stripe
router.post("/stripe/create-intent", protect, createStripePayment);

// Razorpay
router.post("/razorpay/create-order", protect, createRazorpayOrder);

// Confirmation (for both)
router.post("/confirm", protect, confirmPayment);

export default router;
