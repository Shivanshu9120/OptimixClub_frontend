import React, { useState } from 'react'
import Swal from 'sweetalert2'

const NoticeForm = () => {
    const [notices, setNotices] = useState([]); // Stores fetched events
    const [newNotice, setNewNotice] = useState({ title: "", description: "" }); // Stores new notice input

    const noticeChange = (e) => {
        setNewNotice({ ...newNotice, [e.target.name]: e.target.value });
      };
    
    //   // Submit new notice
    const noticeSubmit = async (e) => {
      e.preventDefault();
    
      try {  
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notices`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newNotice),
        });
    
        const responseData = await response.json();
    
        if (!response.ok) {
          Swal.fire(
            'Error!',
            'Failed to create the notice.Please try again',
            'error'
          );
        }
    
        // Update the state to add the new notice without page reload
        setNotices([...notices, responseData]);
    
        // Reset the form
        setNewNotice({ title: "", description: "" });
    
        Swal.fire(
          'Notice Created!',
          'Your notice has been posted.',
          'success'
        );
      } catch (error) {
        console.error("Error creating notice: " + error.message);
        Swal.fire(
          'Error!',
          'Error creating event.Please try again',
          'error'
        );
      }
    };
    
  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100">Create Notices 📢</h2>
      <form onSubmit={noticeSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Notice Name"
          className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
          value={newNotice.title}
          onChange={noticeChange}
          required
        />
        <textarea
          name="description"
          placeholder="Notice Description"
          className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors h-24"
          value={newNotice.description}
          onChange={noticeChange}
          required
        />
        <button type="submit" className="w-full py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white font-bold text-sm rounded transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md">
          Add Notice
        </button>
      </form>
    </div>
  );
}

export default NoticeForm;
