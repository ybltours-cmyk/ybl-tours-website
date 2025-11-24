// src/server.js
import express from "express";
import dotenv from "dotenv";
import tourRoutes from "./routes/tourRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);



// Example route
app.get("/", (req, res) => {
  res.send("Travel backend is running!");
});

// Define PORT
const PORT = process.env.PORT || 5000;

// Start server and handle port errors
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`Port ${PORT} in use, trying ${PORT + 1}...`);
    app.listen(PORT + 1, () =>
      console.log(`Server running on port ${PORT + 1}`)
    );
  } else {
    console.error(err);
  }
});
