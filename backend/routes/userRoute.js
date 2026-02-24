import express from "express"
import { deleteUserById, editProfile, getAllUser, getMe, getUserProfileStat, updateUserById } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { uploadProfileImage } from "../middlewares/multerConfig.js";


const router = express.Router();

router.get("/", getAllUser)
router.get("/me", isAuthenticated, getMe)
router.delete("/:id", deleteUserById)
router.patch("/:id", updateUserById)
router.get("/profile/stats", isAuthenticated, getUserProfileStat);
router.put("/edit-profile", isAuthenticated, uploadProfileImage.single("profile_pic"), editProfile);



export default router;