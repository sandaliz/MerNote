import express from "express";
import { signup, login } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register new user
router.post("/signup", signup);

// Login existing user
router.post("/login", login);

export default router;
