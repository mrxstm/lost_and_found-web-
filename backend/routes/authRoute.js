import express from "express"
import { forgotPassword, login, logout, register, resetPassword } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get('/me', isAuthenticated, (req,res)=> {
    res.status(200).json({
        user: req.user
    });
});
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/forgot-password', forgotPassword)     
router.post('/reset-password', resetPassword)       

export default router;