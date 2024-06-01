import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialNotes = [];

    const [notes, setNotes] = useState(initialNotes);

    // Fetch all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NmZhM2U5MDNlYzYyMjUwNWI5OGViIn0sImlhdCI6MTcxNzIyOTQzMywiZXhwIjoxNzE3MjMzMDMzfQ.CXreuXOsu5hPV6onE_xVVjt1Jt6nbQ1SoWMFQymG6xo"
            }
        });
        const json = await response.json();
        setNotes(json);
    };

    // Add a note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NmZhM2U5MDNlYzYyMjUwNWI5OGViIn0sImlhdCI6MTcxNzIyOTQzMywiZXhwIjoxNzE3MjMzMDMzfQ.CXreuXOsu5hPV6onE_xVVjt1Jt6nbQ1SoWMFQymG6xo"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    };

    // Delete a note
    const deleteNote = async (id) => {
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NmZhM2U5MDNlYzYyMjUwNWI5OGViIn0sImlhdCI6MTcxNzIyOTQzMywiZXhwIjoxNzE3MjMzMDMzfQ.CXreuXOsu5hPV6onE_xVVjt1Jt6nbQ1SoWMFQymG6xo"
            }
        });
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
    };

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NmZhM2U5MDNlYzYyMjUwNWI5OGViIn0sImlhdCI6MTcxNzIyOTQzMywiZXhwIjoxNzE3MjMzMDMzfQ.CXreuXOsu5hPV6onE_xVVjt1Jt6nbQ1SoWMFQymG6xo"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        
        const newNotes = notes.map(note =>
            note._id === id ? { ...note, title, description, tag } : note
        );
        setNotes(newNotes);
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
