
import React, { useState, useRef, useEffect } from "react";


const LowPerformingSellers = ({ sellers }) => {
  const [current, setCurrent] = useState(0);
  const sellersPerPage = 2;
  const total = sellers.length;
  const maxIndex = Math.max(0, total - sellersPerPage);
  const sliderRef = useRef(null);
  const touchStartX = useRef(null);

  if (!sellers || sellers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-4 text-gray-500 text-center">
        No low-performing sellers found.
      </div>
    );
  }

  const handlePrev = () => setCurrent((prev) => Math.max(0, prev - 1));
  const handleNext = () => setCurrent((prev) => Math.min(maxIndex, prev + 1));
  const visibleSellers = sellers.slice(current, current + sellersPerPage);

  // Touch/drag slider functionality
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (diff > 50) {
      handlePrev();
    } else if (diff < -50) {
      handleNext();
    }
    touchStartX.current = null;
  };

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="rounded-2xl shadow-lg border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-cyan-50 p-0 ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5 bg-white/90 border-b border-blue-100">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8 text-cyan-500 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-1.414 1.414M6.343 17.657l-1.415 1.415M5.636 5.636l1.414 1.414M17.657 17.657l1.415 1.415M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-blue-700">Low-Performing Sellers</h2>
            <p className="text-xs text-gray-500 mt-1">Sellers with poor reviews or zero bookings. Consider action or support.</p>
          </div>
        </div>
        <span className="bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full text-xs font-semibold shadow border border-cyan-200">{sellers.length} flagged</span>
      </div>
      <div className="relative">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          tabIndex={0}
          style={{ outline: "none" }}
        >
          {visibleSellers.map((seller, idx) => (
            <div
              key={seller._id}
              className="bg-white rounded-xl shadow border border-blue-100 flex flex-col md:flex-row items-center gap-4 p-4 hover:shadow-lg transition-all duration-500 animate-fadeInUp"
              style={{
                animationDelay: `${idx * 0.1 + 0.1}s`,
                animationFillMode: 'both',
              }}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-200 to-cyan-100 flex items-center justify-center text-blue-700 font-bold text-2xl shadow animate-bounce-slow">
                  {seller?.name?.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-lg text-gray-900 animate-fadeInLeft" style={{animationDelay: `${idx * 0.15 + 0.2}s`}}>{seller.name}</div>
                  <div className="text-xs text-gray-400 mt-1 animate-fadeInLeft" style={{animationDelay: `${idx * 0.18 + 0.25}s`}}>Last Active: {seller.lastActivity ? new Date(seller.lastActivity).toLocaleDateString() : "N/A"}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-w-[120px]">
                <div>
                  <span className="block text-xs text-gray-500">Reviews</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${seller.reviewScore !== undefined && seller.reviewScore < 3 ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-600 border-gray-200'} animate-fadeInRight`} style={{animationDelay: `${idx * 0.18 + 0.3}s`}}>
                    {seller.reviewCount} / {seller.reviewScore ?? "N/A"}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500">Bookings</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${seller.bookingCount === 0 ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-600 border-gray-200'} animate-fadeInRight`} style={{animationDelay: `${idx * 0.18 + 0.35}s`}}>
                    {seller.bookingCount}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs animate-fadeInUp" style={{animationDelay: `${idx * 0.2 + 0.4}s`}}>
                  {seller.bookingCount === 0
                    ? <span className="text-blue-600 font-semibold">No bookings. <span className="underline">Consider deactivation</span>.</span>
                    : seller.reviewScore !== undefined && seller.reviewScore < 3
                    ? <span className="text-cyan-600 font-semibold">Poor reviews. <span className="underline">Review performance</span>.</span>
                    : <span className="text-gray-400">-</span>}
                </div>
              </div>
            </div>
          ))}




        </div>
        {/* Slider Controls */}
        <div className="absolute left-0 right-0 flex justify-between items-center px-4 -mt-2" style={{top: '50%'}}>
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className={`rounded-full bg-white border border-blue-200 shadow p-2 text-blue-500 hover:bg-blue-100 transition disabled:opacity-40 disabled:cursor-not-allowed`}
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={handleNext}
            disabled={current >= maxIndex}
            className={`rounded-full bg-white border border-blue-200 shadow p-2 text-blue-500 hover:bg-blue-100 transition disabled:opacity-40 disabled:cursor-not-allowed`}
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LowPerformingSellers;
