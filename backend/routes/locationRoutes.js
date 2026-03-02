import express from "express";
import { fetchLocations, addLocation, updateLocation, deleteLocation } from "../controllers/locationController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authorizeRole.js";

const router = express.Router();

router.get("/", isAuthenticated, fetchLocations);                             
router.post("/", isAuthenticated, isAdmin, addLocation);                      
router.put("/:id", isAuthenticated, isAdmin, updateLocation);                 
router.delete("/:id", isAuthenticated, isAdmin, deleteLocation);             

export default router;