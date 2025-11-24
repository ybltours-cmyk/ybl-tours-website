// src/routes/authRoutes.js
import { Router } from "express";

import {
  registerUser,
  loginUser,
  verifyEmailController,
  resendVerificationController,
  refreshTokenController,
  logoutController
} from "../controllers/authcontroller.js";

const router = Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Email Verification
router.get("/verify-email/:token", verifyEmailController);
router.post("/resend-verification", resendVerificationController);

// Token Refresh
router.post("/refresh", refreshTokenController);

// Logout
router.post("/logout", logoutController);

export default router;
