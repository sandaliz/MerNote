import { ArrowLeftIcon } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from '../lib/axios';
import { colorConfig, getBorderClass } from '../lib/colorConfig';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("Sunshine");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required!");
      return
    }
    setLoading(true);
    try {
      await axios.post("/notes", {
        title,
        content,
        color
      })
      toast.success("Note created successfully!");
      navigate("/")
    } catch (error) {
      console.log("Error creating note!", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast!", {
          duration: 4000,
          icon: "💀",
        })
      } else if (error.response?.status === 401) {
        toast.error("You need to log in to create notes!");
      } else {
        toast.error(error.response?.data?.message || "Failed to create note! Please try again later!");
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className='size-5' />
            Back to Notes
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create new note </h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label htmlFor='title' className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input 
                    id='title'
                    name='title'
                    type="text"
                    placeholder='Note Title'
                    className='input input-bordered'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className='form-control mb-4'>
                  <label htmlFor='content' className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <input 
                    id='content'
                    name='content'
                    type="text"
                    placeholder='Note Content'
                    className='input input-bordered'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                
                {/* Color Preview */}
                <div className='mb-6'>
                  <div className={`card bg-base-100 border-t-4 border-solid ${getBorderClass(color)}`}>
                    <div className='card-body'>
                      <h3 className='card-title text-lg'>{title || 'Note Preview'}</h3>
                      <p className='text-base-content/70'>{content || 'Your note content will appear here...'}</p>
                    </div>
                  </div>
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Pick a color for your mood</span>
                  </label>
                  <div className='flex gap-3 flex-wrap'>
                    {colorConfig.map((c) => (
                      <button
                        key={c.name}
                        type='button'
                        onClick={() => setColor(c.name)}
                        className={`btn btn-sm btn-${c.daisyUI} gap-1 ${color === c.name ? 'ring-2 ring-offset-2 ring-current' : 'opacity-70'}`}
                      >
                        <span>{c.emoji}</span>
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className='card-actions justify-end' >
                  <button type="submit" className='btn btn-primary' disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage