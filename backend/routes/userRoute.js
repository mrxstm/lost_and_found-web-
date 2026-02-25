import express from "express"
import { deleteUserById, editProfile, getAllUser, getMe, getUserProfileStat, updateUserById, deleteAccount } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { uploadProfileImage } from "../middlewares/multerConfig.js";


const router = express.Router();

router.get("/", getAllUser)
router.get("/me", isAuthenticated, getMe)
router.get("/profile/stats", isAuthenticated, getUserProfileStat);
router.put("/edit-profile", isAuthenticated, uploadProfileImage.single("profile_pic"), editProfile);

router.delete("/delete-account", isAuthenticated, deleteAccount);
router.patch("/:id", updateUserById)


export default router;