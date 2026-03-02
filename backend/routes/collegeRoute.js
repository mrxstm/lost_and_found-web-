import express from "express";
import { getAllColleges } from "../controllers/collegeController.js";

const router = express.Router();

router.get("/", getAllColleges); 

export default router;