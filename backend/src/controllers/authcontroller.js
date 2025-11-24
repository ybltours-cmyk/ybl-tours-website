// src/controllers/authController.js
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils.js";


// ===========================
// REGISTER USER + SEND EMAIL
// ===========================

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = Date.now() + 1000 * 60 * 60; // 1 hour

    const user = await User.create({
      name,
      email,
      password: hashed,
      verificationToken,
      verificationTokenExpires
    });

    // Verification link
    const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    await sendEmail(
      email,
      "Verify your Travel App account",
      `
        <h1>Email Verification</h1>
        <p>Click to verify your email:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
      `
    );

    res.json({ message: "User registered. Check your email to verify account." });
  } catch (err) {
    res.status(500).json(err);
  }
};


// ===========================
// VERIFY EMAIL
// ===========================

export const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    res.json({ message: "Email verified successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
};


// ===========================
// RESEND VERIFICATION EMAIL
// ===========================

export const resendVerificationController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");
    if (user.emailVerified) return res.json({ message: "Email already verified" });

    // New verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = Date.now() + 1000 * 60 * 60;

    await user.save();

    const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    await sendEmail(
      email,
      "Resend Verification - Travel App",
      `
        <h1>Verify Your Email</h1>
        <p>Click below:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
      `
    );

    res.json({ message: "Verification email resent." });
  } catch (err) {
    res.status(500).json(err);
  }
};


// ===========================
// LOGIN USER
// ===========================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");

    // Must be verified
    if (!user.emailVerified)
      return res.status(401).json("Please verify your email before logging in.");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json("Incorrect password");

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token to DB (rotating)
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken
    });
  } catch (err) {
    res.status(500).json(err);
  }
};


// ===========================
// REFRESH TOKEN (ROTATION)
// ===========================

export const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token required" });

    const user = await User.findOne({ refreshToken });
    if (!user)
      return res.status(403).json({ message: "Invalid refresh token" });

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Token expired or invalid" });

      // Generate new tokens
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      // Update DB token
      user.refreshToken = newRefreshToken;
      await user.save();

      res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      });
    });

  } catch (err) {
    res.status(500).json(err);
  }
};


// ===========================
// LOGOUT USER
// ===========================

export const logoutController = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(400).json("Refresh token required");

    const user = await User.findOne({ refreshToken });
    if (!user) return res.json({ message: "Logged out" });

    user.refreshToken = null;
    await user.save();

    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json(err);
  }
};
