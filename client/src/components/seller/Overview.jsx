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
              className="flex items-center justify-between gap-2 shadow-md border border-gray-200 p-4 rounded-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-medium text-gray-500">
                  {section.label}
                </h3>
                <p className="text-xl sm:text-2xl font-bold">
                  {section.count.toLocaleString("en-BD")}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                  {section.description}
                </p>
              </div>
              <section.icon
                size={28}
                className={`rounded-full p-1.5 text-white
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
        <div className="lg:col-span-3 bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-700">AI Features</h2>
            <button
              onClick={() => setShowAiModal(true)}
              className="text-blue-500 hover:text-blue-600 text-sm font-medium cursor-pointer"
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
          <div className="bg-white shadow-md border border-gray-200 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base sm:text-lg font-medium text-gray-500">
                  User Review
                </h2>
                <p className="text-blue-500 text-sm cursor-pointer hover:text-blue-600">
                  See all
                </p>
              </div>
              <Star
                size={28}
                className="bg-blue-500 text-white p-1.5 rounded-full"
              />
            </div>
            <p className="font-medium text-sm sm:text-base">
              Total review in this month: {"120"}
            </p>
          </div>

          {/* Pie Chart */}
          <div className="bg-white shadow-md border border-gray-200 p-4 rounded-lg">
            <PeiChart />
          </div>
        </div>
      </div>

      {/* AI Features Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2  "> <Sparkles className='w-6 h-6 text-blue-500'/> Available AI Features</h2>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-gray-500 hover:text-gray-700"
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
