import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import Swal from "sweetalert2";
import { TableSkeleton } from "../../components/SkeletonLoader";
import { FaFilePdf, FaArrowLeft, FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";

const ApprovedAttendeesPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination & Filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const recordsPerPage = 50;

  // Selected cell for formula bar mockup
  const [selectedCell, setSelectedCell] = useState({ row: 1, col: "A" });
  const [selectedCellValue, setSelectedCellValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        // 1. Fetch Event Info
        const eventRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${eventId}`);
        if (!eventRes.ok) throw new Error("Failed to fetch event info");
        const eventData = await eventRes.json();
        setEvent(eventData);

        // 2. Fetch Registrations
        const regRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/registration/registrations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!regRes.ok) throw new Error("Failed to fetch registrations");
        const regData = await regRes.json();

        // Filter registrations where status is approved and matches eventId
        const approvedRegs = regData.filter(
          (reg) => reg.event && reg.event._id === eventId && reg.status === "approved"
        );

        setAttendees(approvedRegs);
        if (approvedRegs.length > 0) {
          setSelectedCellValue(approvedRegs[0].user?.name || "");
        }
      } catch (err) {
        console.error("Error loading approved attendees:", err);
        setError("Could not load registration data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  const handleCellClick = (row, col, value) => {
    setSelectedCell({ row, col });
    setSelectedCellValue(value || "");
  };

  const handleExportPDF = () => {
    window.print();
  };

  // Filter list based on search query
  const filteredAttendees = attendees.filter((attendee) => {
    const query = searchQuery.toLowerCase();
    const user = attendee.user || {};
    return (
      (user.name || "").toLowerCase().includes(query) ||
      (user.rollNo || "").toLowerCase().includes(query) ||
      (attendee.branch || "").toLowerCase().includes(query) ||
      (user.email || "").toLowerCase().includes(query)
    );
  });

  // Pagination calculation
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredAttendees.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredAttendees.length / recordsPerPage) || 1;

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <DashboardLayout role="admin">
      <div className="w-full max-w-6xl mx-auto space-y-6 print:p-0 print:m-0">
        
        {/* Header Section (Hidden in print) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin-dashboard/event-registrations")}
              className="p-2.5 rounded-xl bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-650 dark:text-slate-200 transition"
              title="Back to Event Registrations"
            >
              <FaArrowLeft size={14} />
            </button>
            <div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                {event ? `${event.name} - Approved Attendees` : "Approved Attendees Sheet"}
              </h2>
              <p className="text-xs text-slate-450 dark:text-slate-500 mt-0.5">
                Worksheet view of all students approved to participate in this event.
              </p>
            </div>
          </div>

          <button
            onClick={handleExportPDF}
            className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 hover:shadow-md hover:shadow-rose-500/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition duration-200 flex items-center gap-2"
          >
            <FaFilePdf size={14} /> Export to PDF
          </button>
        </div>

        {/* Printable Only Header */}
        <div className="hidden print:block mb-6 text-center border-b pb-4">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{event?.name || "Event Attendees"}</h1>
          <p className="text-sm text-slate-600 font-bold uppercase tracking-wider mt-1">
            Official Worksheet - Approved Attendees List
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Generated on: {new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })} | Total Records: {attendees.length}
          </p>
        </div>

        {loading ? (
          <TableSkeleton rows={6} cols={4} />
        ) : error ? (
          <div className="p-6 text-center bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-3xl">
            <p className="text-sm text-rose-600 dark:text-rose-455 font-bold">{error}</p>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* ── SEARCH & FORMULA BAR SECTION (Hidden in print) ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:hidden">
              {/* Formula Cell Selector & Input */}
              <div className="md:col-span-2 flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 shadow-sm">
                <span className="text-xs font-black text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 pr-3 select-none">
                  {selectedCell.col}{selectedCell.row}
                </span>
                <span className="text-xs font-bold text-slate-400 select-none font-serif italic">fx</span>
                <input
                  type="text"
                  value={selectedCellValue}
                  readOnly
                  className="flex-grow bg-transparent text-sm text-slate-800 dark:text-slate-100 outline-none select-all font-semibold px-2"
                />
              </div>

              {/* Sheet Search Filter */}
              <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 shadow-sm">
                <FaSearch className="text-slate-400 mr-2.5" size={12} />
                <input
                  type="text"
                  placeholder="Search worksheet..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent text-xs text-slate-800 dark:text-slate-100 outline-none flex-grow font-semibold"
                />
              </div>
            </div>

            {/* ── EXCEL SHEET DATA CONTAINER ── */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
              
              {/* Spreadsheet metadata ribbon (Hidden in print) */}
              <div className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 select-none print:hidden">
                <div className="flex items-center gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400">Sheet1</span>
                  <span>|</span>
                  <span>Rows: {filteredAttendees.length} of {attendees.length}</span>
                </div>
                <div>Excel-Sheet Mode</div>
              </div>

              {/* Data Grid Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs font-semibold">
                  
                  {/* Table Header: Column Index Line */}
                  <thead className="bg-slate-100 dark:bg-slate-950/80 border-b border-slate-250 dark:border-slate-800/80 select-none">
                    <tr className="divide-x divide-slate-200 dark:divide-slate-800">
                      {/* Grid index column for rows */}
                      <th className="w-12 bg-slate-150/60 dark:bg-slate-950 text-center text-[10px] text-slate-500 dark:text-slate-450 font-bold p-2.5">
                        
                      </th>
                      <th className="px-4 py-2.5 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                        A: Name
                      </th>
                      <th className="px-4 py-2.5 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                        B: Branch
                      </th>
                      <th className="px-4 py-2.5 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                        C: Academic Year
                      </th>
                      <th className="px-4 py-2.5 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                        D: Roll Number
                      </th>
                      <th className="px-4 py-2.5 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                        E: Contact Number
                      </th>
                      <th className="px-4 py-2.5 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                        F: Email Address
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                    {currentRecords.length > 0 ? (
                      currentRecords.map((reg, index) => {
                        const rowIndex = indexOfFirstRecord + index + 1;
                        const user = reg.user || {};
                        const userYear = reg.year || user.year || "N/A";
                        const branchName = reg.branch || user.branch || "N/A";

                        return (
                          <tr
                            key={reg._id}
                            className="divide-x divide-slate-200 dark:divide-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors"
                          >
                            {/* Row number left column */}
                            <td className="bg-slate-100/50 dark:bg-slate-950 text-center font-bold text-slate-450 text-[10px] p-2 select-none">
                              {rowIndex}
                            </td>

                            {/* Cell A: Name */}
                            <td
                              onClick={() => handleCellClick(rowIndex, "A", user.name)}
                              className={`px-4 py-3 text-slate-800 dark:text-slate-200 font-bold cursor-pointer select-all ${
                                selectedCell.row === rowIndex && selectedCell.col === "A"
                                  ? "outline outline-2 outline-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/10"
                                  : ""
                              }`}
                            >
                              {user.name || "N/A"}
                            </td>

                            {/* Cell B: Branch */}
                            <td
                              onClick={() => handleCellClick(rowIndex, "B", branchName)}
                              className={`px-4 py-3 text-slate-700 dark:text-slate-350 cursor-pointer ${
                                selectedCell.row === rowIndex && selectedCell.col === "B"
                                  ? "outline outline-2 outline-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/10"
                                  : ""
                              }`}
                            >
                              {branchName}
                            </td>

                            {/* Cell C: Academic Year */}
                            <td
                              onClick={() => handleCellClick(rowIndex, "C", `${userYear} Year`)}
                              className={`px-4 py-3 text-slate-700 dark:text-slate-350 cursor-pointer ${
                                selectedCell.row === rowIndex && selectedCell.col === "C"
                                  ? "outline outline-2 outline-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/10"
                                  : ""
                              }`}
                            >
                              {userYear ? `${userYear} Year` : "N/A"}
                            </td>

                            {/* Cell D: Roll Number */}
                            <td
                              onClick={() => handleCellClick(rowIndex, "D", user.rollNo)}
                              className={`px-4 py-3 text-slate-700 dark:text-slate-350 cursor-pointer font-mono ${
                                selectedCell.row === rowIndex && selectedCell.col === "D"
                                  ? "outline outline-2 outline-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/10"
                                  : ""
                              }`}
                            >
                              {user.rollNo || "N/A"}
                            </td>

                            {/* Cell E: Contact Number */}
                            <td
                              onClick={() => handleCellClick(rowIndex, "E", user.contact)}
                              className={`px-4 py-3 text-slate-700 dark:text-slate-350 cursor-pointer ${
                                selectedCell.row === rowIndex && selectedCell.col === "E"
                                  ? "outline outline-2 outline-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/10"
                                  : ""
                              }`}
                            >
                              {user.contact || "N/A"}
                            </td>

                            {/* Cell F: Email Address */}
                            <td
                              onClick={() => handleCellClick(rowIndex, "F", user.email)}
                              className={`px-4 py-3 text-slate-700 dark:text-slate-350 cursor-pointer ${
                                selectedCell.row === rowIndex && selectedCell.col === "F"
                                  ? "outline outline-2 outline-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/10"
                                  : ""
                              }`}
                            >
                              {user.email || "N/A"}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-slate-450 italic">
                          No approved attendees found matching filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── PAGINATION CONTROLS (Hidden in print) ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-3.5 rounded-2xl shadow-sm print:hidden select-none">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                  Showing <strong className="text-slate-700 dark:text-slate-200">{indexOfFirstRecord + 1}</strong> to{" "}
                  <strong className="text-slate-700 dark:text-slate-200">
                    {Math.min(indexOfLastRecord, filteredAttendees.length)}
                  </strong>{" "}
                  of <strong className="text-slate-700 dark:text-slate-200">{filteredAttendees.length}</strong> entries
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-950/40 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <FaChevronLeft size={11} />
                  </button>
                  <span className="text-xs text-slate-650 dark:text-slate-350 font-extrabold px-1">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-950/40 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <FaChevronRight size={11} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApprovedAttendeesPage;
