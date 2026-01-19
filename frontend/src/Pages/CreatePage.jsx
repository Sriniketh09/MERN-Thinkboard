import { useState } from "react"
import {Link, useNavigate} from 'react-router-dom'
import { ArrowLeftIcon } from "lucide-react";
import {toast} from "react-hot-toast";
import axios from "axios";

const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(title, content)
        if (!title.trim() || !content.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);

        try {
            await axios.post("http://localhost:3000/api/notes", {
                title: title,
                content: content
            });
            toast.success("Note created successfully");
            navigate("/");
        } catch (e) {
            toast.error("Failed to create note. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="max-w-2xl mx-auto px-4 py-8">
                <Link to={'/'} className="btn btn-ghost mb-6" >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    Back to Notes
                </Link>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">Create New Note</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                    <input type="text" placeholder="Enter note title" className="input input-bordered"
                                    value={title} onChange={(e) => setTitle(e.target.value)} />
                                </label>
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Content</span>
                                    <textarea placeholder="write your Note..." className="textarea textarea-bordered h-32"
                                    value={content} onChange={(e) => setContent(e.target.value)} />
                                </label>
                            </div>
                            <div className="card-actions justify-end">
                                <button type="submit" className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading}>
                                    Create Note
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage
