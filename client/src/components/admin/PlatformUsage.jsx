import React from "react";
import { Smartphone, Globe } from "lucide-react";

const webPercent = 68;
const mobilePercent = 32;

const PlatformUsage = () => {
  return (
    <div className="w-full h-[200px] bg-gradient-to-tr from-cyan-100 to-cyan-50 rounded-xl shadow p-4 border border-cyan-200 flex flex-col gap-2 animate-fadeInUp">
      <div className="flex items-center gap-2 mb-2 animate-fadeInLeft">
        <Globe size={18} className="text-cyan-700 animate-pulse" />
        <span className="font-semibold text-cyan-900 animate-fadeInRight">Platform Usage</span>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 h-full">
        <div className="flex items-end gap-6 h-24 w-full justify-center">
          {/* Web Bar */}
          <div className="flex flex-col items-center w-16 animate-fadeInUp" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
            <div
              className="bg-blue-500 rounded-t-lg shadow-md flex items-end justify-center transition-all animate-growBar relative overflow-hidden"
              style={{ height: `${webPercent * 0.9}px`, minHeight: 10, width: 28, animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              {/* Water animation */}
              <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0 animate-waterWave" style={{background: 'repeating-linear-gradient(135deg,rgba(255,255,255,0.18) 0 8px,rgba(255,255,255,0.08) 8px 16px)', opacity: 0.7}}></div>
              <span className="text-white text-xs font-bold pb-1 animate-fadeInUp z-10 relative" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>{webPercent}%</span>
            </div>
            <span className="flex items-center gap-1 mt-1 text-blue-700 font-semibold text-xs animate-fadeInRight" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
              <Globe size={13} /> Web
            </span>
          </div>
          {/* Mobile Bar */}
          <div className="flex flex-col items-center w-16 animate-fadeInUp" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
            <div
              className="bg-green-500 rounded-t-lg shadow-md flex items-end justify-center transition-all animate-growBar relative overflow-hidden"
              style={{ height: `${mobilePercent * 0.9}px`, minHeight: 10, width: 28, animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              {/* Water animation */}
              <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0 animate-waterWave" style={{background: 'repeating-linear-gradient(135deg,rgba(255,255,255,0.18) 0 8px,rgba(255,255,255,0.08) 8px 16px)', opacity: 0.7}}></div>
              <span className="text-white text-xs font-bold pb-1 animate-fadeInUp z-10 relative" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>{mobilePercent}%</span>
            </div>

            <span className="flex items-center gap-1 mt-1 text-green-700 font-semibold text-xs animate-fadeInRight" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
              <Smartphone size={13} /> Mobile
            </span>
          </div>
        </div>
      </div>
    </div>

  );
};

export default PlatformUsage;
