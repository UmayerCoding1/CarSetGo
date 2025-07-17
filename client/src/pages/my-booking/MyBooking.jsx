import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../hooks/useAuth";
import BookingList from "../../components/ui/BookingList";

import MyBookingSkeleton from "../../components/Skeleton/MyBooking";
import { callGetApis } from "../../api/api";
const MyBooking = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();

  const statusOptions = [
    { value: "all", label: "All Bookings" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", statusFilter],
    queryFn: async () => {
      const response = await callGetApis(
        `/get-bookings/${user._id}?status=${statusFilter}`
      );
      return response.bookings;
    },
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedStatus = statusOptions.find(
    (option) => option.value === statusFilter
  );

  if (!bookings && !isLoading) {
    return <div className="text-center py-10">No bookings found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative h-[300px] w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop')",
            filter: "brightness(0.7)",
          }}
        />

        {/* Content Overlay */}
        <div className="relative h-full w-full bg-black/40 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">My Bookings</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            Manage and track your car rental bookings
          </p>

          {/* Custom Status Filter Dropdown */}
          <div className="relative w-full max-w-xs" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span>{selectedStatus?.label || "Select Status"}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setStatusFilter(option.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors cursor-pointer ${
                      statusFilter === option.value
                        ? "bg-gray-50 text-blue-600"
                        : "text-gray-800"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container  mx-auto px-4 py-8">
        {isLoading ? (
          <MyBookingSkeleton />
        ) : (
          <>
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => (
                <BookingList
                  key={booking._id}
                  carinfo={booking.carId}
                  sellerinfo={booking.sellerId}
                  bookinginfo={booking}
                  refetch={refetch}
                />
              ))
            ) : (
              <div className="flex justify-center items-center h-[200px]">
                <p className="text-3xl animate-bounce">No Bookings Found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
