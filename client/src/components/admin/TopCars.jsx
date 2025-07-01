import React from 'react';

const TopCars = ({topCarsData}) => {
    return (
        <div className="bg-gradient-to-tr from-yellow-100 to-yellow-50 rounded-xl shadow p-4 border border-yellow-200 flex flex-col gap-2 animate-fadeInUp">
            <div className="flex items-center gap-2 mb-2 animate-fadeInLeft">
              <span className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center animate-bounce-slow">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M2 16V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" stroke="#f59e42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="16" width="20" height="6" rx="2" fill="#fde68a" stroke="#f59e42" strokeWidth="2"/><path d="M7 16v-2a5 5 0 0 1 10 0v2" stroke="#f59e42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span className="font-semibold text-yellow-900 animate-fadeInRight">Top Car This Month</span>
            </div>
            <div className="flex flex-col gap-2 text-xs text-yellow-900">
              <div className="flex items-center gap-2 animate-fadeInUp" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
                <img src="https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&w=40&h=40&fit=crop" alt="Tesla Model S" className="w-8 h-8 rounded-full object-cover border-2 border-yellow-300 animate-bounce-slow" />
                <div>
                  <div className="font-bold animate-fadeInLeft">Tesla Model S</div>
                  <div className="text-yellow-700 animate-fadeInRight">Bookings: <span className="font-semibold">32</span></div>
                </div>
              </div>
              <div className="flex items-center gap-2 animate-fadeInUp" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
                <img src="https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&w=40&h=40&fit=crop" alt="Toyota Corolla" className="w-8 h-8 rounded-full object-cover border-2 border-yellow-300 animate-bounce-slow" />
                <div>
                  <div className="font-bold animate-fadeInLeft">Toyota Corolla</div>
                  <div className="text-yellow-700 animate-fadeInRight">Bookings: <span className="font-semibold">27</span></div>
                </div>
              </div>
              <div className="flex items-center gap-2 animate-fadeInUp" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
                <img src="https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&w=40&h=40&fit=crop" alt="BMW X5" className="w-8 h-8 rounded-full object-cover border-2 border-yellow-300 animate-bounce-slow" />
                <div>
                  <div className="font-bold animate-fadeInLeft">BMW X5</div>
                  <div className="text-yellow-700 animate-fadeInRight">Bookings: <span className="font-semibold">21</span></div>
                </div>
              </div>
            </div>
          </div>
    );
};

export default TopCars;