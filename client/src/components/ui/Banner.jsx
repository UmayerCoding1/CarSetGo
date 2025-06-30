import React from "react";
import { asset } from "../../assets/asser"; // Adjust the import path if necessary
import SearchInput from "./SearchInput";
const Banner = () => {
  return (
    <div
      className="w-full h-[450px] md:h-[400px] lg:h-[480px] bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url(${asset.bannerBg})` }}
    >
      {/* Gradient overlay for better readability */}
      <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-0"></div>
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-2 py-4">
        <div className="flex flex-col items-center justify-center gap-2 mt-10 md:mt-16">
          <h2 className="text-white text-3xl md:text-6xl lg:text-7xl font-bannerText drop-shadow-lg animate-fade-in-up text-center">
            Find Your Dream Cars
          </h2>
          <div className="flex items-center gap-2 text-white text-2xl md:text-5xl lg:text-6xl font-bannerText animate-fade-in-up delay-100 text-center">
            <span>With</span>
            <span className="inline-block animate-bounce-slow">
              <img
                className="w-32 md:w-56 lg:w-[300px] drop-shadow-xl"
                src={asset.logo}
                alt="logo"
                loading="lazy"
              />
            </span>
            <span className="ml-2">AI</span>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-8">
          <SearchInput />
        </div>
        {/* Subtitle/description */}
        <div className="mt-4 animate-fade-in-up delay-150">
          <p className="text-white text-center text-base md:text-lg lg:text-xl max-w-2xl mx-auto opacity-90">
            Discover, compare, and book your next car with confidence. AI-powered search, verified dealers, and 24/7 support for a seamless experience.
          </p>
        </div>
        {/* Feature badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 animate-fade-in-up delay-200">
          <span className="bg-white/80 text-black font-semibold px-4 py-2 rounded-full shadow text-sm flex items-center gap-2">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 01.894.553l2.382 4.828 5.327.774a1 1 0 01.554 1.706l-3.853 3.755.91 5.307a1 1 0 01-1.451 1.054L10 16.347l-4.763 2.5A1 1 0 013.786 17.92l.91-5.307L.843 8.858a1 1 0 01.554-1.706l5.327-.774L9.106 2.553A1 1 0 0110 2z" /></svg>
            AI Powered
          </span>
          <span className="bg-white/80 text-black font-semibold px-4 py-2 rounded-full shadow text-sm flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Verified Dealers
          </span>
          <span className="bg-white/80 text-black font-semibold px-4 py-2 rounded-full shadow text-sm flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
            24/7 Support
          </span>
        </div>
       
      </div>
      
    </div>
  );
};

export default Banner;
