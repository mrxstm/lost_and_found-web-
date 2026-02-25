import express from "express";
import { getPlatformStats } from "../controllers/statController.js";

const router = express.Router();

router.get("/", getPlatformStats);  // public, no auth needed for landing page

export default router;