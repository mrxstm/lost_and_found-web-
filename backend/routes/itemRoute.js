import express from "express"
import { addItemReport, getAllItem, getItemById, getItemByStatus, searchItems, getRecentLostItems, deleteItem, updateItem } from "../controllers/itemController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { uploadItemImages } from "../middlewares/multerConfig.js";

const router = express.Router();

router.get("/recent-lost-items", getRecentLostItems);
router.get("/", isAuthenticated, getAllItem);
router.get("/status/:status", isAuthenticated, getItemByStatus);
router.get("/search", isAuthenticated, searchItems);
router.get("/:id", isAuthenticated, getItemById);


router.post("/add", isAuthenticated,  uploadItemImages.array("image_files", 4), addItemReport);
router.put("/:id", isAuthenticated, uploadItemImages.array("image_files", 4), updateItem); 
router.delete("/:id", isAuthenticated, deleteItem);   


export default router;