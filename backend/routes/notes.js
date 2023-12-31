const express = require('express')
const Note = require('../models/Note')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body,validationResult } = require('express-validator');


//ROUTE:1 Fetch all User notes uing get request 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE:2 add a new note using post request
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const saveNote = await note.save()
            res.json(saveNote)
        }
        catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }
})

//ROUTE 3: updating a existing notes - login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
        try {
            const { title, description, tag } = req.body
            //Create a new notes object
            const newNote={}
            if(title){newNote.title=title}
            if(description){newNote.description=description}
            if(tag){
                newNote.tag=tag
            }
            //Find the note to be update and update it
            let note=await Note.findById(req.params.id)
            if(!note){
                res.status(401).send("Not Found")
            }
            if(note.user.toString()!=req.user.id){
                return res.status(401).send("Not Allowed")
            }

            note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
            res.json({note})
        }
        catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }
})

//ROUTE 4: deleteing a existing notes - login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        //Find the note to be deleted and delete it
        let note=await Note.findById(req.params.id)
        if(!note){
            res.status(401).send("Not Found")
        }
        //Allow deletion only user owns this note
        if(note.user.toString()!=req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note=await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted",note:note})
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router