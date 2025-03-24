import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditNotice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [noticeData, setNoticeData] = useState({
    title: "",
    description: ""
  });

  const [loading, setLoading] = useState(true);  // Track loading state

  useEffect(() => {
    // Fetch notice data
    const fetchNotice = async () => {
      try {
        const response = await axios.get(`https://optimixclub-backend.onrender.com/api/notices/${id}`);
        const notice = response.data;

        // ✅ Prefill the form with the event data
        setNoticeData({
          title: notice.title,
          description: notice.description,
        });
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error(err);
        Swal.fire(
                  'Error!',
                  'Failed to fetch notice details.Please try again',
                  'error'
                );
        navigate("/admin-dashboard");
      }
    };
    fetchNotice();
  }, [id, navigate]);

  const handleChange = (e) => {
    setNoticeData({ ...noticeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://optimixclub-backend.onrender.com/api/notices/${id}`,
        noticeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      Swal.fire(
                'Updated!',
                'Notice updated succesfully!',
                'success'
              );
      navigate("/admin-dashboard");
    } catch (err) {
      console.error(err);
      Swal.fire(
                'Error!',
                'Failed to update the notice.Please try again',
                'error'
              );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-700">
          Loading notice details...
        </h2>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-blue-900">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Edit Notices
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Notice Name
            </label>
            <input
              type="text"
              name="title"
              value={noticeData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              value={noticeData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Notice
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNotice;
