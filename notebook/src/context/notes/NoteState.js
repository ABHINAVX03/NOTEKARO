import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const [loading, setLoading] = useState(true)

    // Get all Notes
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('authtoken')
            }
        });
        const json = await response.json()
        setNotes(json)
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // TODO: API Call
        // API Call 
        props.setProgress(10);
        setLoading(true) 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('authtoken')
            },
            body: JSON.stringify({ title, description, tag })
        });
        props.setProgress(50);
        const note = await response.json()
        props.setProgress(70);
        setNotes(notes.concat(note))
        props.setProgress(100);
        setLoading(false)
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        props.setProgress(10);
        setLoading(true) 
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('authtoken')
            }
        });
        props.setProgress(30);
        // const json = response.json();
        console.log(response);
        props.setProgress(50);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
        props.setProgress(100);
        setLoading(false)
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        props.setProgress(10);
        setLoading(true) 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('authtoken')
            },
            body: JSON.stringify({ title, description, tag })
        });
        props.setProgress(30);
        console.log(response);
        // const json = response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
        props.setProgress(50);
        // Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        props.setProgress(70)
        setNotes(newNotes)
        props.setProgress(100);
        setLoading(false)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {loading}{props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;