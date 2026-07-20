import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import PictureForm from "../../components/PictureForm";
import Swal from "sweetalert2";
import { CardSkeleton } from "../../components/SkeletonLoader";

const EventGalleryPage = () => {
  const [activeTab, setActiveTab] = useState("list"); // "list" or "create"
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit modal state
  const [editingImage, setEditingImage] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const fetchGallery = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/picture/`);
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (err) {
      console.error("Error fetching gallery images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/picture/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (response.ok) {
            Swal.fire("Deleted!", "Gallery item has been deleted.", "success");
            setImages(prev => prev.filter(img => img._id !== id));
          } else {
            Swal.fire("Error!", "Failed to delete item.", "error");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Server connection error.", "error");
        }
      }
    });
  };

  const openEditModal = (img) => {
    setEditingImage(img);
    setEditName(img.name || "");
    setEditDescription(img.description || "");
    setEditFile(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setEditLoading(true);

    const formData = new FormData();
    formData.append("name", editName);
    formData.append("description", editDescription);
    if (editFile) {
      formData.append("picture", editFile);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/picture/${editingImage._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        Swal.fire("Updated!", "Gallery item details updated!", "success");
        setEditingImage(null);
        fetchGallery();
      } else {
        Swal.fire("Error!", "Failed to update gallery image details.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Server connection error.", "error");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <DashboardLayout role="admin">
      {/* Tab Controls */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-4 mb-6">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all uppercase tracking-wider ${
            activeTab === "list"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
          }`}
        >
          📋 View Gallery
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all uppercase tracking-wider ${
            activeTab === "create"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
          }`}
        >
          ➕ Upload Picture
        </button>
      </div>

      <div>
        {activeTab === "create" ? (
          <div className="max-w-xl mx-auto">
            <PictureForm
              onSuccess={() => {
                setActiveTab("list");
                fetchGallery();
              }}
            />
          </div>
        ) : (
          <div className="w-full">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <CardSkeleton count={6} type="gallery" />
              </div>
            ) : images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((img) => (
                  <div
                    key={img._id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-500 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-950">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${img.picture}`}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">{img.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                          {img.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                        <button
                          onClick={() => openEditModal(img)}
                          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(img._id)}
                          className="text-xs font-bold text-rose-600 dark:text-rose-450 hover:underline"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-center italic py-10">No gallery pictures uploaded yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal Overlay */}
      {editingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditingImage(null)}
          />
          {/* Modal Container */}
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl z-10 transition-all duration-300 animate-scaleIn">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-4">Edit Gallery Memory 🖼️</h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Event Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows="3"
                  required
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-semibold resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Replace Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditFile(e.target.files[0])}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-950/40 file:text-indigo-700 dark:file:text-indigo-400 hover:file:bg-indigo-100 cursor-pointer"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingImage(null)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs uppercase tracking-wider transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-md hover:shadow-indigo-500/20"
                >
                  {editLoading ? "Updating..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EventGalleryPage;
