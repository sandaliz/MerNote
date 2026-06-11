import express from "express";
import { signup, login } from "../controllers/authController.js";
import { forgotPassword, resetPassword } from "../controllers/resetPasswordController.js";

const router = express.Router();

// Register new user
router.post("/signup", signup);

// Login existing user
router.post("/login", login);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.post("/reset-password/:token", resetPassword);

export default router;
