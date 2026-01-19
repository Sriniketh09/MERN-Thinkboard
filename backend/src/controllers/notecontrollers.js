import Note from "../models/Note.js"

export async function  getAllNotes(req,res){
    try{
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json({message: 'Notes Fetched Successfully', notes});
    } catch(error){
        console.error("Error in Fetching Notes: ",error);
        res.status(500).send({message: 'Error in Fetching Notes'})  
    }
}

export async function getNoteById(req,res){
    try{
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({message:'Note Not Found'});
        res.status(200).json({message: 'Note Fetched Successfully', note});
    } catch(error){
        console.error("Error in Fetching Note: ",error);
        res.status(500).send({message: 'Error in Fetching Note'});
    } 
}

export async function createNote(req,res){
    try{
        const {title, content} = req.body;
        const newNote = new Note({title, content});
        
        await newNote.save();
        res.status(201).json({message: 'Note Created Successfully', note: newNote});
    } catch(error){
        console.error("Error in Creating Note: ",error);
        res.status(500).send({message: 'Error in Creating Note'})
    }
}

export async function updateNote(req,res){
    try{
        const {title, content} = req.body;
        const {id} = req.params;
        await Note.findByIdAndUpdate(id, {title, content});
        if (!id) return res.status(404).json({message: 'Note Not Found'});
        res.status(200).json({message: 'Note Updated Successfully'});   
    } catch(error){
        console.error("Error in Updating Note: ",error);
        res.status(500).send({message: 'Error in Updating Note'})
    }
}

export async function deleteNote(req,res){
    try{
        const {id} = req.params;
        await Note.findByIdAndDelete(id);
        if (!id) return res.status(404).json({message: 'Note Not Found'});
        res.status(200).json({message: 'Note Deleted Successfully'});   
    } catch(error){
        console.error("Error in Deleting Note: ",error);
        res.status(500).send({message: 'Error in Deleting Note'})
    }    
}