import React, { useState, useEffect, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNotes = () => {
    const context = useContext(noteContext);
    const { addNote, currentNote, editNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" });

    useEffect(() => {
        if (currentNote) {
            setNote(currentNote);
        } else {
            setNote({ title: "", description: "", tag: "" });
        }
    }, [currentNote]);

    const handleClick = (e) => {
        e.preventDefault();
        if (currentNote) {
            editNote(currentNote._id, note.title, note.description, note.tag);
        } else {
            addNote(note.title, note.description, note.tag);
        }
        setNote({ title: "", description: "", tag: "" });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container my-3">
            <h1 className="text-center mt-3">{currentNote ? "Edit Note" : "Add a Note"}</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={note.title}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className="form-control"
                        value={note.description}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input
                        type="text"
                        id="tag"
                        name="tag"
                        className="form-control"
                        value={note.tag}
                        onChange={onChange}
                    />
                </div>
                <button type="submit" className="btn btn-success mt-3" onClick={handleClick}>
                    {currentNote ? "Update Note" : "Add Note"}
                </button>
            </form>
        </div>
    );
};

export default AddNotes;
