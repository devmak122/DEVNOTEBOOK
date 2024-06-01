import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote, editNote } = context;
    const { note } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [editedNote, setEditedNote] = useState({ ...note });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        editNote(note._id, editedNote.title, editedNote.description, editedNote.tag);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
    };

    return (
        <div className='col-md-3 mt-5'>
            <div className="card">
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="title"
                                    value={editedNote.title}
                                    onChange={handleChange}
                                />
                            ) : (
                                note.title
                            )}
                        </h5>
                        <i className="fa-solid fa-trash mx-2" onClick={() => deleteNote(note._id)}></i>
                        {isEditing ? (
                            <i className="fa-solid fa-save mx-2" onClick={handleSaveClick}></i>
                        ) : (
                            <i className="fa-regular fa-pen-to-square mx-2" onClick={handleEditClick}></i>
                        )}
                    </div>
                    <p className="card-text">
                        {isEditing ? (
                            <textarea
                                name="description"
                                value={editedNote.description}
                                onChange={handleChange}
                            />
                        ) : (
                            note.description
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
