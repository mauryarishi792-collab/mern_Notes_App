import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI.jsx'
import axois from 'axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard.jsx'
import api from '../lib/axios.js'
import NotesNotFound from '../components/NotesNotFound.jsx'

const HomePage = () => {
  const [IsRateLimited,setIsRateLimited] =useState(false);
  const[notes,setNotes] = useState([]);
  const[loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchNotes = async ()=>{
      try {
        const res = await api.get("/notes")

        // const res = await fetch("http://localhost:5001/api/notes")
        // const data = await res.json();

        console.log(res.data)
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log("Error fetching notes");
        if(error.response?.status === 429){
          setIsRateLimited(true)
        }else{
          toast.error("Failed t o load notes")
        }
      } finally{
        setLoading(false)
      }
    };
    fetchNotes();
  },[]);

  return (
    <div className="min-h-screen">
      <Navbar/>
      {IsRateLimited && <RateLimitedUI />}

      <div className="max-w-7xo mx-auto p-4 mt-6">
        {loading && <div className='text-center text-primary py-10'>Loading notes....</div>}

        {notes.length === 0 && !IsRateLimited && <NotesNotFound />}

        {notes.length > 0 && !IsRateLimited &&(
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
              notes.map(note => {
                return <NoteCard key = {note._id} note = {note} setNotes = {setNotes} />
              })
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage