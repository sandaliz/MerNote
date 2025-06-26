import express from "express";
import { createNote, getAllNotes, updateNote, deleteNote, getNoteById } from "../controllers/notesController.js";

const router = express.Router();

// Middleware to parse JSON request bodies
router.get("/", getAllNotes);

router.get("/:id", getNoteById);

// // This endpoint is used to create a new note
router.post("/", createNote);

// // This endpoint is used to get a note by its ID
router.put("/:id", updateNote);

// // This endpoint is used to delete a note by its ID
router.delete("/:id", deleteNote)

export default router;