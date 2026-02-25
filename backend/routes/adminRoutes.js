import express from "express";
import {isAuthenticated } from "../middlewares/authMiddleware.js";
import { adminDeleteClaim, approveItem, deleteUser, getAllClaims, getAllUsers, getPendingItems, rejectItem } from "../controllers/adminController.js";
import { isAdmin } from "../middlewares/authorizeRole.js";


const router = express.Router();

router.get("/users", isAuthenticated, isAdmin, getAllUsers);
router.delete("/users/:id", isAuthenticated, isAdmin, deleteUser);
router.get("/items/pending", isAuthenticated, isAdmin, getPendingItems);
router.patch("/items/:id/approve", isAuthenticated, isAdmin, approveItem);
router.delete("/items/:id/reject", isAuthenticated, isAdmin, rejectItem);
router.get("/claims",               isAuthenticated, isAdmin, getAllClaims);       
router.delete("/claims/:id",        isAuthenticated, isAdmin, adminDeleteClaim);  

export default router;
