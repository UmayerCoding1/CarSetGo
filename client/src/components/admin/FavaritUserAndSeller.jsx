import { Star } from 'lucide-react';
import React from 'react';

const FavaritUserAndSeller = ({userData}) => {
    return (
        <div>
            <div className="flex items-center gap-2 text-xl font-medium mb-3 animate-fadeInUp">
              <span className="bg-gradient-to-tr from-orange-400 to-yellow-300 rounded-full p-1 flex items-center justify-center animate-bounce-slow">
                <Star size={18} className="text-white drop-shadow" />
              </span>
              <p className="bg-gradient-to-tr from-orange-100 to-yellow-50 px-2 py-1 rounded font-semibold text-orange-700 animate-fadeInLeft">Favarit User/Seller</p>
            </div>
            {/* Favorite User/Seller List */}
            <div className="bg-white rounded-xl shadow p-3 flex flex-col gap-2 border border-gray-100 animate-fadeInUp">
              <div className="font-semibold text-gray-700 mb-1 text-sm animate-fadeInLeft">Users</div>
              <ul className="mb-2">
                <li className="flex items-center gap-2 text-sm py-1 animate-fadeInUp" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
                  <span className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold animate-bounce-slow">A</span>
                  <span className="font-medium">Alice Johnson</span>
                  <button className="ml-auto px-2 py-1 rounded bg-orange-100 text-orange-600 hover:bg-orange-200 text-xs font-semibold flex items-center gap-1 animate-fadeInRight">
                    <Star size={13} className="text-orange-400" /> Fav
                  </button>
                </li>
                <li className="flex items-center gap-2 text-sm py-1 animate-fadeInUp" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
                  <span className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold animate-bounce-slow">M</span>
                  <span className="font-medium">Michael Smith</span>
                  <button className="ml-auto px-2 py-1 rounded bg-orange-100 text-orange-600 hover:bg-orange-200 text-xs font-semibold flex items-center gap-1 animate-fadeInRight">
                    <Star size={13} className="text-orange-400" /> Fav
                  </button>
                </li>
              </ul>
              <div className="font-semibold text-gray-700 mb-1 text-sm animate-fadeInLeft">Sellers</div>
              <ul>
                <li className="flex items-center gap-2 text-sm py-1 animate-fadeInUp" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
                  <span className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold animate-bounce-slow">S</span>
                  <span className="font-medium">Sarah Lee</span>
                </li>
                <li className="flex items-center gap-2 text-sm py-1 animate-fadeInUp" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
                  <span className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold animate-bounce-slow">D</span>
                  <span className="font-medium">David Kim</span>
                </li>
              </ul>
            </div>
          </div>
    );
};

export default FavaritUserAndSeller;