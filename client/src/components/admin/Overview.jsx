import React from "react";
import {
  BarChart2,
  Users,
  Car,
  CreditCard,
  MessageCircle,
  Star,
  ClipboardList,
} from "lucide-react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import BarChart from "./BarChart";
import PeiChart from "./PeiChart";
import FavaritUserAndSeller from "./FavaritUserAndSeller";
import TopCars from "./TopCars";
import TopSellers from "./TopSellers";
import TotalBookingSection from "./TotalBookingSection";
import PlatformUsage from "./PlatformUsage";
import LowPerformingSellers from "./LowPerformingSellers";
import '../../../public/css/admin/overview.css'
import { useQuery } from "@tanstack/react-query";
import { callGetApis } from "../../api/api";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const stats = [
  {
    label: "Total Users",
    value: 1240,
    icon: Users,
    color: "bg-blue-100 text-blue-700",
  },
  {
    label: "Total Cars",
    value: 320,
    icon: Car,
    color: "bg-green-100 text-green-700",
  },
  {
    label: "Payments",
    value: "$54,200",
    icon: CreditCard,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    label: "Messages",
    value: 87,
    icon: MessageCircle,
    color: "bg-purple-100 text-purple-700",
  },
  {
    label: "Reviews",
    value: 210,
    icon: Star,
    color: "bg-pink-100 text-pink-700",
  },
  {
    label: "Reports",
    value: 12,
    icon: ClipboardList,
    color: "bg-red-100 text-red-700",
  },
];

// Example data for charts
const revenueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Total Revenue",
      data: [8000, 12000, 9000, 15000, 11000, 14000],
      backgroundColor: "rgba(59, 130, 246, 0.7)",
      borderRadius: 8,
    },
  ],
};

const userPieData = {
  labels: ["Normal User", "Seller"],
  datasets: [
    {
      label: "User Type",
      data: [900, 340],
      backgroundColor: ["rgba(59, 130, 246, 0.7)", "rgba(16, 185, 129, 0.7)"],
      borderWidth: 1,
    },
  ],
};


const demoSellers = [
  {
    _id: "1",
    name: "John Doe",
    reviewCount: 2,
    reviewScore: 2.5,
    bookingCount: 0,
    lastActivity: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    _id: "2",
    name: "Jane Smith",
    reviewCount: 5,
    reviewScore: 2.2,
    bookingCount: 1,
    lastActivity: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    _id: "3",
    name: "Alex Lee",
    reviewCount: 0,
    reviewScore: undefined,
    bookingCount: 0,
    lastActivity: null,
  },
  {
    _id: "4",
    name: "Maria Garcia",
    reviewCount: 1,
    reviewScore: 1.8,
    bookingCount: 0,
    lastActivity: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    _id: "5",
    name: "Liam Wong",
    reviewCount: 3,
    reviewScore: 2.0,
    bookingCount: 2,
    lastActivity: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
];
const AdminOverview = () => {
  const {data: adminAnalytics} = useQuery({
    queryKey: ['adminAnalytics'],
    queryFn: async () => {
     const response = await callGetApis('/analytics/admin');
     return response
    }
  });
  return (
    <div className="w-full min-h-[80vh] max-h-screen p-4 md:p-8 bg-gray-50 overflow-x-hidden overflow-y-auto scrollbar-hide">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-blue-900 flex items-center gap-2">
        <BarChart2 className="w-7 h-7 text-blue-700" /> Admin Dashboard Overview
      </h1>

      <div className="flex gap-2">
        <div className="lg:w-[250px] flex flex-col gap-6">
          <FavaritUserAndSeller userData={''}/>
          <TopCars topCarsData={''}/>
          <TopSellers sellersData={''}/>
          <TotalBookingSection />
         
        </div>


        <div className="flex-1">
          <div className="mb-8 flex gap-2 w-full h-[200px]">
             <PlatformUsage />
             <LowPerformingSellers sellers={demoSellers} />

          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className={`rounded-xl shadow-md p-6 flex items-center gap-4 bg-white hover:shadow-xl transition-shadow duration-200 border border-gray-100`}
              >
                <div
                  className={`rounded-full p-3 ${color} flex items-center justify-center`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {value}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Revenue Bar Chart */}
            <BarChart revenueData={revenueData} />
            {/* User Type Pie Chart */}
            <PeiChart userPieData={userPieData} />
          </div>
        </div>
      </div>

      <div className="h-20">

      </div>
    </div>
  );
};

export default AdminOverview;
