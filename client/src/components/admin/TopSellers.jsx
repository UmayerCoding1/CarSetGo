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
    <div className="bg-gradient-to-tr from-green-100 to-green-50 rounded-xl shadow p-4 border border-green-200 flex flex-col gap-2 animate-fadeInUp">
      <div className="flex items-center gap-2 mb-2 animate-fadeInLeft">
        <span className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center animate-pulse">
          <Star size={13} className="text-white" />
        </span>
        <span className="font-semibold text-green-900 animate-fadeInRight">Top Sellers</span>
      </div>
      <div className="flex flex-col gap-2 text-xs text-green-900">
        {topSellers.map((seller, idx) => (
          <div key={idx} className={`flex items-center gap-2 animate-zoomIn`} style={{animationDelay: `${idx * 0.15 + 0.1}s`, animationFillMode: 'both'}}>
            <img src={seller.avatar} alt={seller.name} className="w-8 h-8 rounded-full object-cover border-2 border-green-300 animate-bounce-slow" />
            <div>
              <div className="font-bold animate-fadeInLeft" style={{animationDelay: `${idx * 0.18 + 0.2}s`}}>{seller.name}</div>
              <div className="text-green-700 animate-fadeInRight" style={{animationDelay: `${idx * 0.18 + 0.25}s`}}>
                Sales: <span className="font-semibold">{seller.sales}</span> &bull; <span className="inline-flex items-center"><Star size={12} className="text-yellow-400 mr-1 animate-pulse" /> {seller.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
// To enable the animations, add the following CSS to your global stylesheet (e.g., index.css or tailwind.css):
// .animate-fadeInUp { animation: fadeInUp 0.6s both; }
// .animate-fadeInLeft { animation: fadeInLeft 0.6s both; }
// .animate-fadeInRight { animation: fadeInRight 0.6s both; }
// .animate-bounce-slow { animation: bounce 2s infinite; }
// .animate-zoomIn { animation: zoomIn 0.5s both; }
// @keyframes fadeInUp { from { opacity:0; transform: translateY(30px);} to { opacity:1; transform: none;} }
// @keyframes fadeInLeft { from { opacity:0; transform: translateX(-30px);} to { opacity:1; transform: none;} }
// @keyframes fadeInRight { from { opacity:0; transform: translateX(30px);} to { opacity:1; transform: none;} }
// @keyframes zoomIn { from { opacity:0; transform: scale(0.7);} to { opacity:1; transform: scale(1);} }
  );
};

export default TopSellers;
