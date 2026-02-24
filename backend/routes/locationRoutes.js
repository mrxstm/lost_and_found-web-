import express from "express";
import { fetchLocations } from "../controllers/locationController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticated, fetchLocations);

export default router;