import { Calendar, Car, CreditCard, Sparkles, Star, Users } from "lucide-react";
import React, { useState } from "react";
import LineChart from "./LineChart";
import PeiChart from "./PeiChart";
import useAuth from "../../hooks/useAuth";
import AiFeature from "./ai-features/AiFeature";

const Overview = () => {
  const {user} = useAuth();
  const [showAiModal, setShowAiModal] = useState(false);
  
  const sellerAllInfo = [
    {
      label: "Total Cars",
      count: 2,
      icon: Car,
      description: "Total number of cars in your inventory",
    },
    {
      label: "Active Booking",
      count: 10,
      icon: Calendar,
      description: "Total number of active bookings",
    },
    {
      label: "Total Revenue",
      count: 150000,
      icon: CreditCard,
      description: "Total revenue generated",
    },
    {
      label: "Total Customers",
      count: 100,
      icon: Users,
      description: "Total number of customers",
    },
  ];
  return (
    <div className="w-full flex flex-col gap-4 p-2 sm:p-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sellerAllInfo?.map((section, inx) => {
          return (
            <div
              key={inx}
              className="flex items-center justify-between gap-2 bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-lg border border-gray-200 p-5 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-600 group-hover:text-black transition-colors">
                  {section.label}
                </h3>
                <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {section.count.toLocaleString("en-BD")}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1">
                  {section.description}
                </p>
              </div>
              <section.icon
                size={32}
                className={`rounded-full p-2 shadow-lg border-2 border-white text-white group-hover:scale-110 transition-transform
                  ${section.label === "Total Cars" && "bg-blue-500"}
                  ${section.label === "Active Booking" && "bg-green-500"}
                  ${section.label === "Total Revenue" && "bg-yellow-500"}
                  ${section.label === "Total Customers" && "bg-red-500"}
                `}
              />
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-700">AI Features</h2>
            <button
              onClick={() => setShowAiModal(true)}
              className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-full shadow transition-colors duration-200"
            >
              See All Features
            </button>
          </div>
          {/* Line Chart */}
          <LineChart />
        </div>

        {/* Right Side Section */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {/* User Review Card */}
          <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg border border-gray-200 p-5 rounded-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-600">User Review</h2>
                <button className="mt-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-600 text-xs font-semibold rounded-full shadow transition-colors duration-200">See all</button>
              </div>
              <Star
                size={32}
                className="bg-blue-500 text-white p-2 rounded-full shadow-lg border-2 border-white"
              />
            </div>
            <div className="w-full h-px bg-gradient-to-r from-blue-400/30 via-gray-300/30 to-transparent mb-3"></div>
            <p className="font-semibold text-base text-gray-800">
              Total review in this month: <span className="text-blue-500 font-bold">120</span>
            </p>
          </div>

          {/* Pie Chart */}
          <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg border border-gray-200 p-5 rounded-2xl">
            <PeiChart />
          </div>
        </div>
      </div>

      {/* AI Features Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Sparkles className='w-6 h-6 text-blue-500'/> Available AI Features</h2>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold px-2 rounded-full transition-colors duration-200"
                aria-label="Close AI Features Modal"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <AiFeature planDetails={user?.planDetails} showAll={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
