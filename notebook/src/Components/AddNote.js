import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    document.title=`${props.title} | NoteKaro`
    
    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showalert("Note Added Successfully","success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2 align="center" style={{color:'#dc3545',fontSize:'50px',textDecoration:'underline'}}>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" style={{color:'white'}} className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" style={{color:'white'}} className="form-label">Description</label>
                    <textarea type="text" className="form-control" rows={6} id="description" name="description" value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" style={{color:'white'}} className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" required value={note.tag} onChange={onChange} />
                </div>
               
                <button type="submit" disabled={note.title.length<5 || note.description.length<5 || note.tag.length<2} className="btn btn-danger container" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote