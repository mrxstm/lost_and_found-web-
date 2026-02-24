import express from "express";
import {isAuthenticated } from "../middlewares/authMiddleware.js";
import { getAllUsers } from "../controllers/adminController.js";
import { isAdmin } from "../middlewares/authorizeRole.js";


const router = express.Router();

router.get("/users", isAuthenticated, isAdmin, getAllUsers);

export default router;
