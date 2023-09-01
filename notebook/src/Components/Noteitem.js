import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3" style={{width:'auto',height:'auto'}}>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title" style={{textDecoration:'underline'}}>{note.title}</h5><h5 className="card-title">{`-${note.tag} `}</h5>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <i className="far fa-trash-alt mx-2" onClick={() => { deleteNote(note._id); props.showalert("Deleted Successfully", "success") }}></i>
                    <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem