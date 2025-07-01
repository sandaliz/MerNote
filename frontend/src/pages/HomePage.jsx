import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import { Link } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");
                setNotes(Array.isArray(res.data) ? res.data : res.data.notes || []);
                setIsRateLimited(false);
            } catch (error) {
                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    // Filter notes by search query (case-insensitive, search in title or content)
    const filteredNotes = notes.filter(note => {
        const q = searchQuery.toLowerCase();
        return (
            note.title?.toLowerCase().includes(q) ||
            note.content?.toLowerCase().includes(q)
        );
    });

    return (
        <div className="min-h-screen">
            {/* Pass search state down to Navbar */}
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Add Note Button under navbar */}
            {!loading && !isRateLimited && filteredNotes.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 mt-6 flex justify-end">
                    <Link to="/create" className="btn btn-primary flex items-center gap-2">
                        <PlusIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">New Note</span>
                    </Link>
                </div>
            )}

            {!loading && isRateLimited && <RateLimitedUI />}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && (
                    <div className="flex justify-center items-center flex-col py-10 gap-2">
                        <span className="loading loading-spinner loading-md text-primary"></span>
                        <p>Loading notes...</p>
                    </div>
                )}

                {!loading && filteredNotes.length === 0 && !isRateLimited && (
                    <NotesNotFound />
                )}

                {!loading && filteredNotes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNotes.map((note) => {
                            try {
                                return <NoteCard key={note._id} note={note} setNotes={setNotes} />;
                            } catch (e) {
                                console.error("Error rendering note", note, e);
                                return <div>Error rendering this note</div>;
                            }
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
export default HomePage;
