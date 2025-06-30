import React from "react";
import { Star } from "lucide-react";

const topSellers = [
  {
    name: "Sarah Lee",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    sales: 19,
    rating: 4.9,
  },
  {
    name: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    sales: 15,
    rating: 4.8,
  },
  {
    name: "Priya Singh",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    sales: 13,
    rating: 4.7,
  },
];

const TopSellers = ({ sellersData }) => {
  // If you want to use sellersData prop, replace topSellers with sellersData
  return (
    <div className="bg-gradient-to-tr from-green-100 to-green-50 rounded-xl shadow p-4 border border-green-200 flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center">
          <Star size={13} className="text-white" />
        </span>
        <span className="font-semibold text-green-900">Top Sellers</span>
      </div>
      <div className="flex flex-col gap-2 text-xs text-green-900">
        {topSellers.map((seller, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <img src={seller.avatar} alt={seller.name} className="w-8 h-8 rounded-full object-cover border-2 border-green-300" />
            <div>
              <div className="font-bold">{seller.name}</div>
              <div className="text-green-700">Sales: <span className="font-semibold">{seller.sales}</span> &bull; <span className="inline-flex items-center"><Star size={12} className="text-yellow-400 mr-1" /> {seller.rating}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellers;
