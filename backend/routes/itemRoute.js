import express from "express"
import { addItemReport, deleteItemById, getAllItem, getItemById, getItemByStatus, updateItemById } from "../controllers/itemController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerConfig.js";

const router = express.Router();

router.get("/", isAuthenticated, getAllItem);
router.get("/status/:status", isAuthenticated, getItemByStatus);
router.get("/:id", isAuthenticated, getItemById);

router.post("/add", isAuthenticated,  upload.array("image_files", 4), addItemReport);
router.patch("/:id", isAuthenticated, updateItemById);
router.delete("/:id", isAuthenticated, deleteItemById);

export default router;