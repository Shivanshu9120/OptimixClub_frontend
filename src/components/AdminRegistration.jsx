import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminRegistration = () => {
    const [registrations, setRegistrations] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("https://optimixclub-backend.onrender.com/api/registration/registrations", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setRegistrations(res.data));
    }, [token]);

    const handleStatusUpdate = async (id, status) => {
        await axios.put(`https://optimixclub-backend.onrender.com/api/registration/approve/${id}`, 
            { status }, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setRegistrations(prev => prev.map(reg => reg._id === id ? { ...reg, status } : reg));
    };

    const handleDelete = async (id) => {
        await axios.delete(`https://optimixclub-backend.onrender.com/api/registration/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire(
                          'Deleted!',
                          'Registration deleted',
                          'success'
                        );
        setRegistrations(prev => prev.filter(reg => reg._id !== id));
    };

    return (
        <div className="w-full h-screen overflow-y-auto bg-gray-100">
            <h2 className="text-2xl font-bold text-center py-4 bg-white shadow">Pending Registrations</h2>
            <div className="flex flex-col gap-2 p-2">
                {registrations.map(reg => (
                    <div 
                        key={reg._id} 
                        className="w-full bg-white shadow-md p-4 border rounded-lg 
                                   flex flex-col sm:flex-row sm:items-center sm:justify-between"
                    >
                        {/* User Image & Info */}
                        <div className="flex items-center gap-4">
                            <img 
                                src={`https://optimixclub-backend.onrender.com/uploads/${reg.user.photo}`} 
                                alt="User" 
                                className="w-12 h-12 rounded-full border"
                            />
                            <div>
                                <p className="text-lg font-semibold">{reg.user.name} - {reg.event.name}</p>
                                <p className="text-gray-700">{reg.branch} - {reg.year} ({reg.status})</p>
                            </div>
                        </div>

                        {/* Action Buttons (Responsive) */}
                        <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 sm:gap-4">
                            {(reg.status === "pending" || reg.status === "rejected") && (
                                <>
                                    <button 
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        onClick={() => handleStatusUpdate(reg._id, "approved")}
                                    >
                                        Approve
                                    </button>
                                </>
                            )}
                            {reg.status === "approved"  && 

                                    <button 
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        onClick={() => handleStatusUpdate(reg._id, "rejected")}
                                    >
                                        Reject
                                    </button>
                            }
                                    <button 
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={() => handleDelete(reg._id)}
                                    >
                                        Delete
                                    </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminRegistration;
