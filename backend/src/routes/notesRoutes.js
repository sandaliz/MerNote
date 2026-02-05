// routes/notesRoutes.js
import express from "express";
import {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
} from "../controllers/notesController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth); // 🔒 all routes below require login

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
