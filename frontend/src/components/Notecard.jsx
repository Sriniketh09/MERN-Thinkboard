import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Notecard = ({ note, setNotes }) => {
    const handleDelete = async (e,id) => {
        e.preventDefault();
        console.log("Delete note with id:", id);

        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try{
            await axios.delete(`http://localhost:3000/api/notes/${id}`);
            toast.success("Note deleted successfully");
            setNotes( prev => prev.filter(note => note._id !== id))
        } catch (e){
            toast.error("Failed to delete note. Please try again.");
        }
    }

    return (
        <Link to={`/note/${note._id}`}
        className="card bg-base-100 hover:shadow-lg transition-all duration-200 
        border-t-4 border-solid border-[#00FF9D]">
            <div className='card-body'>
                <h2 className='card-title text-base-content'>{note.title}</h2>
                <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-sm text-base-content/60'>
                        {note.createdAt.substring(0,10)}
                    </span>
                    <div className='flex items-center gap-1'>
                        <PenSquareIcon className="size-4" />
                        <button className='btn btn-ghost btn-xs text-error' onClick={(e)=>handleDelete(e, note._id)}>
                            <Trash2Icon className='size-4' />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Notecard
