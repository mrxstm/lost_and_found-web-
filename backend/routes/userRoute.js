import express from "express"
import { deleteUserById, getAllUser, getMe, getUserProfileStat, updateUserById } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/", getAllUser)
router.get("/me", isAuthenticated, getMe)
router.delete("/:id", deleteUserById)
router.patch("/:id", updateUserById)
router.get("/profile/stats", isAuthenticated, getUserProfileStat);


export default router;