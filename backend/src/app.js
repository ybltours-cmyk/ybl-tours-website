import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import localUploadRoutes from "./routes/localUploadRoutes.js";

const app = express();

// Required to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve static files for local uploads
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// Test route
app.get("/", (req, res) => {
    res.send("YBL Tours API is running...");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/upload", uploadRoutes);           // Cloudinary uploads
app.use("/api/local-upload", localUploadRoutes); // Local uploads

export default app;
