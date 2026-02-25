import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {submitClaim,getClaimsOnMyItems,getMyClaims,approveClaim,rejectClaim,getContactDetails} from "../controllers/claimController.js";
import { uploadProofImage } from "../middlewares/multerConfig.js";

const router = express.Router();

router.post("/", isAuthenticated, uploadProofImage.single("proof_image"), submitClaim);
router.get("/on-my-items", isAuthenticated, getClaimsOnMyItems);
router.get("/my-claims", isAuthenticated, getMyClaims);
router.patch("/:id/approve", isAuthenticated, approveClaim);
router.patch("/:id/reject", isAuthenticated, rejectClaim);
router.get("/contact/:item_id", isAuthenticated, getContactDetails);

export default router;