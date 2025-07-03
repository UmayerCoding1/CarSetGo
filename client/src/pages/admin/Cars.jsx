import React from 'react';
import Table from '../../components/ui/table/Table';
import {motion, AnimatePresence } from 'motion/react';
import CarListTavleRow from '../../components/seller/CarListTavleRow';
import useCars from '../../hooks/useCars';
import ImageSlider from '../../components/admin/ImageSlider';

const Cars = () => {
    const [page, setPage] = React.useState(1);
    const carsPerPage = 6;
    const {cars, totalPages} = useCars(page, carsPerPage, '', '', '', '', '');
    console.log(cars);
    
    return (
        <div className='max-h-screen overflow-auto scrollbar-hide p-10 bg-black '>
            {/* Modern Card Grid for Cars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {cars?.map((car, idx) => (
                <motion.div
                  key={car._id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0ea5e9] rounded-3xl shadow-2xl border border-blue-900 p-6 flex flex-col relative overflow-hidden group hover:shadow-cyan-400/30 hover:scale-[1.03] transition-all duration-300"
                >
                  {/* Car Image & Details */}
                  <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <div className="flex-1 min-w-[160px]">
                    <h2 className="text-2xl font-bold text-cyan-400 mb-1 tracking-tight flex items-center gap-2">
                        {car?.make}
                        <span className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm ml-2">{car?.bodyType || 'N/A'}</span>
                      </h2>
                      <div className="text-xs text-cyan-300 mb-1">Asking Price</div>
                      <div className="text-2xl font-extrabold text-white mb-2">${car.price?.toLocaleString() || '93,899.00'}</div>
                      <p className="text-cyan-400 font-semibold text-xs hover:underline cursor-pointer transition">View Details</p>
                    </div>
                    <div className="flex-1 flex justify-center items-center">
                      <ImageSlider images={car.images || []} height={200} width={300}/>
                    </div>
                  </div>
                  {/* Stats */}
                   <div className='flex gap-2'>
                    <div className="grid grid-cols-2 gap-2 mb-2 flex-1">
                      <div className="bg-gradient-to-r from-cyan-900 to-cyan-700 rounded-xl px-2 py-1 flex flex-col items-center text-[10px] text-cyan-100 font-semibold shadow-sm">
                        <span className="mb-0.5">Bookings</span>
                        <span className="text-base font-bold text-cyan-300">{car.totalBookings ?? 0}</span>
                      </div>
                      <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 rounded-xl px-2 py-1 flex flex-col items-center text-[10px] text-emerald-100 font-semibold shadow-sm">
                        <span className="mb-0.5">Total Sell</span>
                        <span className="text-base font-bold text-emerald-300">${car.totalSell?.toLocaleString() ?? '0'}</span>
                      </div>
                      <div className="bg-gradient-to-r from-yellow-900 to-yellow-700 rounded-xl px-2 py-1 flex flex-col items-center text-[10px] text-yellow-100 font-semibold shadow-sm">
                        <span className="mb-0.5">Reviews</span>
                        <span className="text-base font-bold text-yellow-300">{car.totalReviews ?? 0}</span>
                      </div>
                      <div className="bg-gradient-to-r from-pink-900 to-rose-700 rounded-xl px-2 py-1 flex flex-col items-center text-[10px] text-pink-100 font-semibold shadow-sm">
                        <span className="mb-0.5">Reports</span>
                        <span className="text-base font-bold text-pink-300">{car.totalReports ?? 0}</span>
                      </div>
                    </div>
                  {/* Seller Information Section */}
                  <div className="bg-gradient-to-r from-[#1e293b] to-[#0ea5e9] border border-blue-900 rounded-2xl p-2 mb-2 flex flex-col sm:flex-row items-center gap-2 shadow-sm flex-1">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-blue-900 flex items-center justify-center text-lg font-bold text-white shadow">
                      {car.seller?.avatar ? (
                        <img src={car.seller.avatar} alt="Seller Avatar" className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        car.seller?.name?.[0]?.toUpperCase() || 'S'
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                        <span className="text-xs font-semibold text-cyan-200 truncate">{car.seller?.name || 'Unknown Seller'}</span>
                        <span className="text-[10px] bg-cyan-900 text-cyan-100 px-1.5 py-0.5 rounded-full font-medium">{car.seller?.email || 'N/A'}</span>
                        <span className="text-[10px] bg-emerald-900 text-emerald-100 px-1.5 py-0.5 rounded-full font-medium">{car.seller?.phone || 'N/A'}</span>
                      </div>
                      <div className="text-[10px] text-cyan-400 mt-0.5">Seller since: <span className="text-cyan-200 font-semibold">{car.seller?.since || 'N/A'}</span></div>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="text-[10px] text-cyan-300 font-semibold">Total Cars: <span className="text-cyan-100">{car.seller?.totalCars ?? 0}</span></span>
                      <span className="text-[10px] text-cyan-300 font-semibold">Rating: <span className="text-yellow-300">{car.seller?.rating ?? 'N/A'}</span></span>
                    </div>
                  </div>
                   </div>
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mt-2 justify-end">
                    <button
                      className="bg-gradient-to-r from-rose-600 to-pink-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow hover:from-rose-700 hover:to-pink-600 transition border border-rose-700"
                      onClick={() => alert(`Blacklisted car: ${car.model}`)}
                    >
                      Blacklist
                    </button>
                    <button
                      className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow hover:from-cyan-700 hover:to-blue-800 transition border border-cyan-700"
                      onClick={() => alert(`Analytics for car: ${car.model}`)}
                    >
                      Analytics
                    </button>
                  </div>

                  {/* New: Car Description Section */}
                  {car.description && (
                    <div className="mt-3 bg-gradient-to-r from-[#0ea5e9] to-[#1e293b] border border-cyan-700 rounded-xl p-3 text-xs text-cyan-100 shadow-sm ">
                      <span className="font-semibold text-cyan-200">Description: </span>
                      {car.description}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded bg-white border border-gray-200 text-blue-700 font-semibold hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              {Array.from({ length: totalPages || 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded font-semibold border ${page === i + 1 ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-blue-700 border-gray-200 hover:bg-blue-50'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages || 1, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded bg-white border border-gray-200 text-blue-700 font-semibold hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>

            <div className='mb-14'>
                
            </div>
        </div>
    );
};

export default Cars;