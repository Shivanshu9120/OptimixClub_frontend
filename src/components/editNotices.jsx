import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import DashboardLayout from "./DashboardLayout";

const EditNotice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [noticeData, setNoticeData] = useState({
    title: "",
    description: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/notices/${id}`);
        const notice = response.data;

        setNoticeData({
          title: notice.title,
          description: notice.description,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        Swal.fire('Error!', 'Failed to fetch notice details. Please try again', 'error');
        navigate("/admin-dashboard/notices");
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
        `${import.meta.env.VITE_API_BASE_URL}/api/notices/${id}`,
        noticeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      Swal.fire('Updated!', 'Notice updated successfully!', 'success');
      navigate("/admin-dashboard/notices");
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Failed to update the notice. Please try again', 'error');
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="admin">
        <div className="flex items-center justify-center py-20">
          <h2 className="text-xl font-bold text-slate-500 dark:text-slate-400 animate-pulse">
            Loading notice details...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">✏️ Edit Notice</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Modify notice title and description settings.</p>
      </div>

      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-lg rounded-2xl p-6 transition-colors duration-300">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-350 mb-1">
              Notice Name
            </label>
            <input
              type="text"
              name="title"
              value={noticeData.title}
              onChange={handleChange}
              required
              className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-355 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={noticeData.description}
              onChange={handleChange}
              rows="5"
              required
              className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            ></textarea>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/admin-dashboard/notices")}
              className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition shadow-md hover:shadow-indigo-500/25"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditNotice;
