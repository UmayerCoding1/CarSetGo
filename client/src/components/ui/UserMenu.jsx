import {
  Car,
  CarFront,
  Command,
  Handshake,
  Headphones,
  Heart,
  Info,
  LogOut,
  MessageCircle,
  ShieldCheck,
  User,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
const UserMenu = ({
  onUseRef,
  user,
  onLogout,
  setIsOpenUserMenage,
  setIsOpenRequestForSeller,
}) => {
  return (
    <div
      ref={onUseRef}
      className="absolute w-[250px] top-[52px] shadow-2xl border border-gray-200 rounded-2xl bg-white -right-2 lg:right-0 p-4 z-50 animate-fade-in-up"
    >
      {user && (
        <>
          <div className="border-b border-gray-200 pb-3 mb-3 flex gap-3 items-center">
            <img
              className="w-12 h-12 rounded-full border-2 border-blue-400 shadow"
              src={user?.avatar}
              alt="avatar"
              loading="lazy"
            />
            <div>
              <h2 className="font-semibold text-lg text-gray-800">
                {user?.fullname}
              </h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div
              onClick={() => setIsOpenUserMenage(false)}
              className="flex justify-between items-center hover:bg-blue-50 border border-gray-50 cursor-pointer hover:border-blue-100 px-3 py-2 rounded-lg"
            >
              <div className="flex items-center gap-1 font-medium ">
                <User size={15} />
                <span>Profile</span>
              </div>

              <div className="flex items-center gap-1 font-medium text-gray-500">
                <Command size={10} />
                <span className="text-sm">+</span>
                <span className="text-sm">P</span>
              </div>
            </div>

            <hr className="w-full border border-gray-200 my-1" />
          </div>

          <Link
            to={`/my-cars/${user?._id}`}
            onClick={() => setIsOpenUserMenage(false)}
            className="flex justify-between items-center hover:bg-blue-50 border border-gray-50 cursor-pointer hover:border-blue-100 px-3 py-2 rounded-lg"
          >
            <div className="flex items-center gap-1 font-medium ">
              <Car size={15} />
              <span>My Car</span>
            </div>

            <div className="flex items-center gap-1 font-medium text-gray-500">
              <Command size={10} />
              <span className="text-sm">+</span>
              <span className="text-sm">M</span>
            </div>
          </Link>

          <Link
            to={"/saved-cars"}
            onClick={() => setIsOpenUserMenage(false)}
            className="flex justify-between items-center hover:bg-blue-50 border border-gray-50 cursor-pointer hover:border-blue-100 px-3 py-2 rounded-lg"
          >
            <div className="flex items-center gap-1 font-medium ">
              <Heart size={15} />
              <span>Save Car</span>
            </div>
          </Link>

          <Link
            to={"/my-booking"}
            onClick={() => setIsOpenUserMenage(false)}
            className="flex justify-between items-center hover:bg-blue-50 border border-gray-50 cursor-pointer hover:border-blue-100 px-3 py-2 rounded-lg"
          >
            <div className="flex items-center gap-1 font-medium ">
              <CarFront size={15} />
              <span>My Booking</span>
            </div>

            <div className="flex items-center gap-1 font-medium text-gray-500">
              <Command size={10} />
              <span className="text-sm">+</span>
              <span className="text-sm">B</span>
            </div>
          </Link>

          {user?.role === "user" && (
            <>
              <div
                onClick={() => {
                  document.body.style.overflow = "hidden";
                  setIsOpenRequestForSeller(true);
                  setIsOpenUserMenage(false);
                }}
                className="flex items-center gap-1 font-medium hover:bg-blue-50 border border-gray-50 cursor-pointer hover:border-blue-100 px-3 py-2 rounded-lg"
              >
                <Handshake size={15} />
                <span>Request for seller</span>
              </div>
            </>
          )}
        </>
      )}

      <hr className="w-full border border-gray-200 my-1" />

      <div>
        <Link
          to={"/about"}
          onClick={() => setIsOpenUserMenage(false)}
          className="flex items-center gap-3 my-2 p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors font-medium text-sm"
        >
          <Info size={18} />
          <span>About Us</span>
        </Link>

        <Link
          to={"/policy"}
          onClick={() => setIsOpenUserMenage(false)}
          className="flex items-center gap-3 my-2 p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors font-medium text-sm"
        >
          <ShieldCheck size={18} />
          <span>Privacy Policy</span>
        </Link>

        <Link
          to={"/support"}
          onClick={() => setIsOpenUserMenage(false)}
          className="flex items-center gap-3 my-2 p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors font-medium text-sm"
        >
          <Headphones size={18} />
          <span>Support Center</span>
        </Link>
      </div>
    </div>
  );
};

export default UserMenu;
