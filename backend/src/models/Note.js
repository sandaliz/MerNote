import mongoose from "mongoose";

// 1- create schema
// 2- a model based off of that schema

// models/Note.js
const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 👈 link to user
}, { timestamps: true });


const Note = mongoose.model("Note", noteSchema)

export default Note