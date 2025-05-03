import React from "react";
import { asset } from "../../assets/asser"; // Adjust the import path if necessary
import SearchInput from "./SearchInput";
const Banner = () => {
  return (
    <div
      className="w-full h-[450px]  md:h-[400px] lg:h-[480px] bg-cover bg-center relative "
      style={{ backgroundImage: `url(${asset.bannerBg})` }}
    >
      <div className="absolute w-full h-full top-0 left-0 bg-[#0000008c] flex flex-col items-center   p-1">
        <div className="flex flex-col items-center justify-center mt-16">
          <h2 className="text-white text-3xl md:text-6xl lg:text-9xl font-bannerText">
            Find Your Dream Cars
          </h2>
          <h2 className="text-white text-4xl md:text-7xl lg:text-9xl font-bannerText flex items-center">
            With
            <span>
              <img
                className="lg:w-[450px]"
                src={asset.logo}
                alt="logo"
                loading="lazy"
              />
            </span>
            AI
          </h2>
        </div>
        <div className="w-full flex items-center justify-center">
        <SearchInput />
        </div>
      </div>
      
    </div>
  );
};

export default Banner;
