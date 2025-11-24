import express from "express";
import { getAllDestinations, createDestination } from "../controllers/destinationcontroller.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllDestinations);
router.post("/", auth, createDestination);

export default router;
