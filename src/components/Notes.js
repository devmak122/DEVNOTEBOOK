import React, { useContext, useEffect } from 'react';
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
            <AddNotes />
            <div className='row my-3 mt-5'>
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes;
