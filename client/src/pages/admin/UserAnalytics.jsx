import { useQuery } from "@tanstack/react-query";
import {
  BarChart2,
  Car,
  ClipboardList,
  CreditCard,
  Star,
  Users,
  MessageCircle,
} from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { callGetApis } from "../../api/api";
import { useState } from "react";
import Loading from "../../components/ui/Loading";

const UserAnalytics = () => {
  const { id } = useParams();
  const [selectedUser,setSelectedUser] = useState(null);

 
  // Demo data (replace with real API data as needed)
  const sellerStats = {
    totalCars: 12,
    totalBookings: 87,
    totalRevenue: 42000,
    totalReviews: 14,
    totalReports: 2,
    totalCustomers: 38,
    totalMessages: 7,
    avgRating: 4.7,
    joinDate: "2023-02-15",
  };
  const reviews = [
    {
      id: 1,
      user: "Alice Johnson",
      comment: "Great seller!",
      rating: 5,
      date: "2025-06-01",
    },
    {
      id: 2,
      user: "Michael Smith",
      comment: "Smooth transaction.",
      rating: 4,
      date: "2025-06-03",
    },
  ];
  const reports = [
    { id: 1, user: "David Kim", reason: "Late delivery", date: "2025-06-10" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleUserAnalytics = async () => {
      if (id) {
        const response = await callGetApis(`/auth/user/${id}`);
        

        if(response.user){
          const res  = await callGetApis(`/analytics/user/${id}?role=${response?.user.role}`);
          console.log(response.user);
          
      
          if(res.success){
            setSelectedUser(res);
          }

        }
      }
    };

    handleUserAnalytics();
  }, [id]);

  if (!selectedUser) {
    return (
      <Loading />
    )
  }
  
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-gradient-to-br from-[#0f172a] via-[#164e63] to-[#06b6d4] px-0 sm:px-4 max-h-screen overflow-auto scrollbar-hide text-white">
      {/* Full-page gradient overlay for extra depth */}
      <div
        className="fixed inset-0 z-0 bg-gradient-to-br from-[#0f172a] via-[#164e63] to-[#06b6d4]"
        style={{ minHeight: "100vh" }}
      />
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col">
        <h2 className="text-3xl font-bold mb-8 mt-10 text-cyan-100 drop-shadow flex items-center gap-2">
          <BarChart2 className="w-8 h-8 text-cyan-300" /> Seller Analytics
        </h2>

        {/* Seller Profile Card */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="flex-1 bg-gradient-to-r from-cyan-900 to-cyan-700 rounded-2xl p-6 shadow-2xl border border-cyan-800 flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-700 flex items-center justify-center text-3xl font-bold text-white shadow-xl border-4 border-cyan-700">
              C
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-xl font-bold text-cyan-100">
                  {selectedUser?.user?.fullname}
                </span>
                <span className="text-sm bg-cyan-800 text-cyan-100 px-2 py-0.5 rounded-full font-medium">
                  {selectedUser?.user?.email}
                </span>
                <span className="text-xs bg-cyan-950 text-cyan-200 px-2 py-0.5 rounded-full font-medium">
                  Seller ID:{" "}
                  <span className="font-mono">{selectedUser?.user?._id}</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="text-xs text-cyan-300">
                  Joined:{" "}
                  <span className="font-semibold text-cyan-100">
                    {new Date(selectedUser?.user?.createdAt).toLocaleDateString()}
                  </span>
                </span>
                <span className="text-xs text-cyan-300">
                  Avg. Rating:{" "}
                  <span className="font-semibold text-yellow-300">
                    {sellerStats.avgRating}
                  </span>
                </span>
                
               
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {selectedUser?.user?.role === "seller" && (
              <div className="rounded-2xl bg-gradient-to-r from-cyan-900 to-cyan-700 p-6 flex flex-col items-center shadow-xl border border-cyan-800">
            <Car className="w-7 h-7 mb-2 text-cyan-300" />
            <span className="text-lg font-semibold text-cyan-200 mb-1">
              Total Cars
            </span>
            <span className="text-3xl font-extrabold text-cyan-100">
              {selectedUser?.analytics?.totalCars}
            </span>
          </div>
          )}
        
          <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-6 flex flex-col items-center shadow-xl border border-blue-800">
            <ClipboardList className="w-7 h-7 mb-2 text-cyan-300" />
            <span className="text-lg font-semibold text-cyan-200 mb-1">
              Total Bookings
            </span>
            <span className="text-3xl font-extrabold text-cyan-100">
             {selectedUser?.analytics?.totalBookings}
            </span>
          </div>
          {selectedUser?.user?.role === "seller" && (
             <div className="rounded-2xl bg-gradient-to-r from-emerald-900 to-emerald-700 p-6 flex flex-col items-center shadow-xl border border-emerald-800">
            <CreditCard className="w-7 h-7 mb-2 text-emerald-300" />
            <span className="text-lg font-semibold text-emerald-200 mb-1">
              Total Revenue
            </span>
            <span className="text-3xl font-extrabold text-emerald-100">
              ${selectedUser?.analytics?.totalPayments.toLocaleString()}
            </span>
          </div>
          )}
         
          <div className="rounded-2xl bg-gradient-to-r from-yellow-900 to-yellow-700 p-6 flex flex-col items-center shadow-xl border border-yellow-800">
            <Star className="w-7 h-7 mb-2 text-yellow-300" />
            <span className="text-lg font-semibold text-yellow-200 mb-1">
              Total Reviews
            </span>
            <span className="text-3xl font-extrabold text-yellow-100">
              {selectedUser?.analytics?.totalReviews}
            </span>
          </div>
        </div>

        {/* Reviews & Reports Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Reviews */}
          <div className="bg-gradient-to-r from-cyan-900 to-cyan-700 rounded-2xl p-6 shadow-xl border border-cyan-800 max-h-[400px] overflow-x-auto scrollbar-hide">
            <h3 className="text-xl font-bold text-cyan-100 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-300" /> Reviews
            </h3>
            { selectedUser?.reviews.length === 0 ? (
              <div className="text-cyan-200">No reviews yet.</div>
            ) : (
              <ul className="space-y-4">
                {selectedUser?.reviews.map((r) => (
                  <li
                    key={r.id}
                    className="bg-cyan-950/60 rounded-xl p-4 flex flex-col gap-1 border border-cyan-900"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-cyan-200">{r.user}</span>
                      <span className="text-xs text-cyan-400">{r.date}</span>
                      <span className="ml-auto text-yellow-300 font-bold">
                        {"★".repeat(r.rating)}
                      </span>
                    </div>
                    <div className="text-cyan-100 text-sm">{r.comment}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Reports */}
          <div className="bg-gradient-to-r from-pink-900 to-rose-700 rounded-2xl p-6 shadow-xl border border-rose-800">
            <h3 className="text-xl font-bold text-pink-100 mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-pink-200" /> Reports
            </h3>
            {selectedUser?.reports.length === 0 ? (
              <div className="text-pink-100">No reports.</div>
            ) : (
              <ul className="space-y-4">
                {selectedUser?.reports.map((r) => (
                  <li
                    key={r.id}
                    className="bg-rose-950/60 rounded-xl p-4 flex flex-col gap-1 border border-rose-900"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-pink-100">{r.user}</span>
                      <span className="text-xs text-pink-200">{r.date}</span>
                    </div>
                    <div className="text-pink-100 text-sm">
                      Reason: {r.reason}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mb-20"> </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
