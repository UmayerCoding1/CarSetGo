import { CarFront, Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
const UserNav = () => {
  return (
    <div className="flex items-center gap-4">
      <div>
        <Link
          to={"/my-booking"}
          className="flex items-center gap-2 bg-black text-white px-2 md:px-5 lg:px-5 py-2 rounded-lg select-none cursor-pointer"
        >
          <CarFront strokeWidth={1.5} size={20} />
          <span  className="text-sm font-medium hidden md:block lg:block">My Booking</span>
        </Link>
      </div>
      <div>
        <Link
          to={"/save-cars"}
          className="flex items-center gap-2 border px-2 md:px-5 lg:px-5 py-2 rounded-lg select-none cursor-pointer"
        >
          <Heart strokeWidth={1.5} size={20} />
          <span className="text-sm font-medium hidden md:block lg:block">Save Cars</span>
        </Link>
      </div>
    </div>
  );
};

export default UserNav;
