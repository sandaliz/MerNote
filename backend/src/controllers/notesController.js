// controllers/notesController.js

// Get all notes for logged-in user only
export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        if (!note) return res.status(404).json({ message: "Note not found!" });
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content, user: req.user._id });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, content },
            { new: true }
        );
        if (!updatedNote) return res.status(404).json({ message: "Note not found!" });
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });
        if (!deletedNote) return res.status(404).json({ message: "Note not found!" });
        res.status(200).send({ message: "Note deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}
