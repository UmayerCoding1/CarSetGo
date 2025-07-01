import React, { useState } from "react";
import { ClipboardList, XCircle, Calendar } from "lucide-react";

const bookingsData = [
  { id: 1, status: "completed", date: "2025-07-01" },
  { id: 2, status: "cancelled", date: "2025-07-01" },
  { id: 3, status: "completed", date: "2025-06-15" },
  { id: 4, status: "cancelled", date: "2025-07-01" },
  { id: 5, status: "pending", date: "2025-07-01" },
  { id: 6, status: "completed", date: "2025-07-01" },
];

const getMonth = (dateStr) => new Date(dateStr).getMonth();
const getYear = (dateStr) => new Date(dateStr).getFullYear();

const TotalBookingSection = ({ bookings = bookingsData }) => {
  const [filter, setFilter] = useState("all");
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const filtered = bookings.filter((b) => {
    if (filter === "all") return true;
    if (filter === "cancelledThisMonth") {
      return (
        b.status === "cancelled" &&
        getMonth(b.date) === currentMonth &&
        getYear(b.date) === currentYear
      );
    }
    return b.status === filter;
  });

  const total = bookings.length;
  const cancelledThisMonth = bookings.filter(
    (b) =>
      b.status === "cancelled" &&
      getMonth(b.date) === currentMonth &&
      getYear(b.date) === currentYear
  ).length;

  return (
    <div className="bg-gradient-to-tr from-purple-100 to-purple-50 rounded-xl shadow p-4 border border-purple-200 flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-2">
        <ClipboardList size={18} className="text-purple-700" />
        <span className="font-semibold text-purple-900">Total Bookings</span>
        <span className="ml-auto text-xs text-purple-700 font-bold">{total}</span>
      </div>
      <div className="flex gap-2 mb-2">
        <button
          className={`px-2 py-1 rounded text-xs font-semibold border transition-all ${
            filter === "all"
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-white text-purple-700 border-purple-200 hover:bg-purple-100"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-2 py-1 rounded text-xs font-semibold border transition-all flex items-center gap-1 ${
            filter === "cancelledThisMonth"
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-red-600 border-red-200 hover:bg-red-100"
          }`}
          onClick={() => setFilter("cancelledThisMonth")}
        >
          <XCircle size={13} /> Cancelled This Month
        </button>
      </div>
      <div className="text-xs text-purple-900 mb-1">
        Showing <span className="font-bold">{filtered.length}</span> bookings
        {filter === "cancelledThisMonth" && (
          <span> (Cancelled this month: <span className="font-bold text-red-600">{cancelledThisMonth}</span>)</span>
        )}
      </div>
      <ul className="flex flex-col gap-1 max-h-32 overflow-y-auto pr-1">
        {filtered.map((b) => (
          <li key={b.id} className="flex items-center gap-2 text-xs py-1 border-b border-purple-50 last:border-b-0">
            <Calendar size={13} className="text-purple-400" />
            <span className="font-semibold">{b.status}</span>
            <span className="text-gray-500">{b.date}</span>
          </li>
        ))}
        {filtered.length === 0 && <li className="text-xs text-gray-400">No bookings found.</li>}
      </ul>
    </div>
  );
};

export default TotalBookingSection;
