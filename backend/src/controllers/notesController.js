import Note from "../models/Note.js"

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createAt:-1}) //will give u every single note // newest first with createAt
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllNotes Controller", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

export async function getNoteById(req, res){
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found!" });
        res.json(note);
    } catch (error) {
        console.error("Error in getNoteById Controller", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body
        const note = new Note({ title, content })

        const savedNode = await note.save()
        res.status(201).json(savedNode);
    } catch (error) {
        console.error("Error in createNote Controller", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            {
                new: true,
            }); //id is the same as notesroutes method's path
        if (!updatedNote) return res.status(404).json({ message: "Note not found!" });

        res.status(200).json(updatedNote);

    } catch (error) {
        console.error("Error in updateNote Controller", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function deleteNote(req, res) {
    try {
        const { title, content } = req.body
        const deletedNote = await Note.findByIdAndDelete(
            req.params.id,
            { title, content },
            {
                new: true,
            }); //id is the same as notesroutes method's path
        if (!deletedNote) return res.status(404).json({ message: "Note not found!" });

        res.status(200).send({ message: "Note deleted successfully!" });

    } catch (error) {
        console.error("Error in deletedNote Controller", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }

}
