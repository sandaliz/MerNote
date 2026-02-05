import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth); // All routes require authentication

router.get("/", getProfile);
router.put("/", updateProfile);

export default router;
