import Navbar from "../components/Navbar.jsx";
import {useEffect, useState } from "react";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import Notecard from "../components/Notecard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";

const Homepage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/notes");
        console.log(res.data);
        setNotes(res.data.notes);
        setLoading(false);
        setRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes:", error);
        if (error.response && error.response.status === 429) {
          setRateLimited(true);
        } else {
          setRateLimited(false);
          toast.error("Failed to fetch Notes. Please try again.");
        }
      } finally {
          setLoading(false);
      }
    }
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI /> }
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading  && <div className="text-center text-primary py-10">
          <p>Loading notes...</p>
        </div>}

        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <div key={note["_id"]}>
                <Notecard note={note} setNotes={setNotes} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Homepage
