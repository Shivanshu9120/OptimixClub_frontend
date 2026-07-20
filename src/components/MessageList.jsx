import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ListSkeleton } from "./SkeletonLoader";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/messages`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        if (data.length > 0) {
          setSelectedMessage(data[0]); // Select first message by default
        } else {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to retrieve this message later!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/delete/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (response.ok) {
            Swal.fire("Deleted!", "Message deleted successfully.", "success");
            const updated = messages.filter((m) => m._id !== id);
            setMessages(updated);
            if (selectedMessage && selectedMessage._id === id) {
              setSelectedMessage(updated.length > 0 ? updated[0] : null);
            }
          } else {
            Swal.fire("Error!", "Failed to delete the message.", "error");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Server connection error.", "error");
        }
      }
    });
  };

  return (
    <div className="w-full flex justify-center py-2">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg rounded-3xl overflow-hidden h-[70vh] flex flex-col md:flex-row transition-colors duration-300">
        
        {/* Left Side: Inbox List (35%) */}
        <div className="w-full md:w-2/5 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/20">
          <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/40 flex justify-between items-center shrink-0">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-250 uppercase tracking-wider">
              📩 Inbox List
            </h3>
            <span className="bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full text-[10px] font-black">
              {messages.length} Total
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80 no-scrollbar">
            {loading ? (
              <ListSkeleton count={4} hasAvatar={true} />
            ) : messages.length > 0 ? (
              messages.map((m) => {
                const isSelected = selectedMessage && selectedMessage._id === m._id;
                return (
                  <div
                    key={m._id}
                    onClick={() => setSelectedMessage(m)}
                    className={`p-4 cursor-pointer flex gap-3 transition duration-150 items-start ${
                      isSelected
                        ? "bg-indigo-50/50 dark:bg-indigo-950/30 border-l-4 border-indigo-600"
                        : "hover:bg-slate-50 dark:hover:bg-slate-950/30 border-l-4 border-transparent"
                    }`}
                  >
                    {/* User profile photo */}
                    <img
                      src={
                        m.user?.photo && m.user?.photo !== "null" && m.user?.photo !== "undefined"
                          ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${m.user.photo}`
                          : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt={m.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-250 dark:border-slate-800 mt-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 truncate">
                          {m.name}
                        </h4>
                        <span className="text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
                          {m.createdAt ? new Date(m.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : ""}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-1 leading-relaxed">
                        {m.message}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-center text-xs italic py-10">No messages received yet.</p>
            )}
          </div>
        </div>

        {/* Right Side: Message Detail Panel (65%) */}
        <div className="w-full md:w-3/5 flex flex-col h-full bg-white dark:bg-slate-900">
          {selectedMessage ? (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/20 dark:bg-slate-950/10 shrink-0">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      selectedMessage.user?.photo && selectedMessage.user?.photo !== "null" && selectedMessage.user?.photo !== "undefined"
                        ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${selectedMessage.user.photo}`
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={selectedMessage.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                  />
                  <div>
                    <h4 className="text-sm font-black text-slate-850 dark:text-slate-100 leading-tight">
                      {selectedMessage.name}
                    </h4>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="p-2 text-rose-600 dark:text-rose-450 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition duration-150"
                  title="Delete message"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* Message content scroll pane */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider">
                    Date Sent
                  </span>
                  <span className="text-xs text-slate-650 dark:text-slate-300 font-bold">
                    {selectedMessage.createdAt 
                      ? new Date(selectedMessage.createdAt).toLocaleString(undefined, { 
                          month: "long", 
                          day: "numeric", 
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })
                      : "Recently"
                    }
                  </span>
                </div>

                <div className="bg-slate-50/50 dark:bg-slate-950/30 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-wrap min-h-[160px]">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <span className="text-4xl mb-3">📩</span>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">No message selected</h4>
              <p className="text-xs text-slate-450 dark:text-slate-500 mt-1 max-w-[240px]">
                Click on a sender from the list on the left to read their detailed message query.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Messages;
