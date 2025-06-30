import {
  Car,
  Handshake,
  Home,
  Info,
  LogOut,
  Menu,
  MessageCircle,
  Plus,
  User,
  PlusCircle,
  Calendar,
  CalendarClock,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import useAuth from "./../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import { motion } from "motion/react";

const Navbar = () => {
  const [isOpeUserMenu, setIsOpeUserMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
 const [activeSellerPath, setActiveSellerPath] = useState('');
  const { user } = useAuth();
  const isSellerBadge = "free";

  const handleLogout = async () => {};

 

   const handleDropdownClick = (dropdownName) => {
      setActiveSellerPath(dropdownName);
      sessionStorage.setItem('currentSellerPath', dropdownName);
      setIsOpenSidebar(false)
    };
  
    useEffect(() => {
      const currentPath = sessionStorage.getItem('currentSellerPath');
      if (currentPath) {
        setActiveSellerPath(currentPath);
         
      }
    }, []);
  return (
    <div className="w-full h-16 bg-gradient-to-r from-white via-gray-50 to-gray-100 shadow-xl border-b border-gray-200 flex items-center justify-between px-4">
      <div>
        <Link
          to="/"
          className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white p-2 rounded-xl font-semibold shadow transition-colors duration-200"
        >
          <Home size={20} /> <span className="hidden lg:block">Back to app</span>
        </Link>
      </div>

      <div>
        {/* desktop */}
        <div className="flex items-center gap-4">
          {user?.isPlanActive && (
            <div className="flex items-center gap-2">
              <span className="font-card text-xs font-semibold bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 px-3 py-1 rounded-full shadow border border-yellow-300 uppercase tracking-wide">
                {user?.plan} plan
              </span>
            </div>
          )}
          <div>
            <div className="relative flex items-center justify-center w-10 h-10 bg-gray-200 rounded-xl cursor-pointer shadow hover:shadow-lg transition-shadow">
              <MessageCircle size={20} className="text-gray-700 group-hover:text-blue-500 transition-colors" />
              <span className="absolute -top-1 -right-1 w-5 h-5 text-xs text-white flex items-center justify-center bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 rounded-full font-bold shadow border-2 border-white animate-bounce">
                2
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-1 shadow border border-gray-200">
            <div
              onClick={() => setIsOpeUserMenu(!isOpeUserMenu)}
              className="relative cursor-pointer hover:scale-105 transition-transform"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="user"
                  className="w-8 h-8 rounded-full border-2 border-blue-400 shadow"
                />
              ) : (
                <User size={20} />
              )}
              <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            {isOpeUserMenu && (
              <div className="w-full lg:w-[320px] bg-white absolute left-0 lg:left-auto lg:right-2 top-[56px] shadow-2xl border border-gray-200 rounded-2xl z-50 animate-fade-in-up">
                <div className="rounded-2xl bg-white p-4">
                  <div className="border-b border-gray-200 pb-3 mb-3 flex gap-3 items-center">
                    <img
                      className="w-12 h-12 rounded-full border-2 border-blue-400 shadow"
                      src={user?.avatar}
                      alt="avatar"
                      loading="lazy"
                    />
                    <div>
                      <h2 className="font-semibold text-lg text-gray-800">{user?.fullname}</h2>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-gray-200 transition-colors">
                      <Plus size={15} />
                      <span>Update avatar</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        // onChange={handleUpdateAvatar}
                      />
                    </label>
                    <div
                      onClick={handleLogout}
                      className="flex items-center gap-2 bg-red-100 border border-red-200 px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-red-200 transition-colors"
                    >
                      <LogOut size={15} />
                      <span>Sign out</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3 mt-4 cursor-pointer hover:bg-gray-100 transition-colors">
                    <Info size={18} />
                    <span className="font-medium text-sm">About Us</span>
                  </div>
                </div>
              </div>
            )}

            <div className="ml-2">
              <h2 className="text-lg font-semibold text-gray-800">{user?.fullname}</h2>
              <p
                className={`text-xs font-semibold ${
                  isSellerBadge === "free" ? "text-red-500" : "text-green-500"
                }`}
              >
                {isSellerBadge === "free" ? "Not verified" : "Verified"}
              </p>
            </div>
          </div>

          {/* mobile */}
          <div className="lg:hidden">
            <div className="relative">
              <Menu size={20} onClick={() => setIsOpenSidebar(!isOpenSidebar)} />
            </div>

            {isOpenSidebar && <div className="fixed inset-0 z-50 bg-black/40 flex">
                <div className="w-80 max-w-full h-full bg-gradient-to-b from-white via-gray-50 to-gray-100 shadow-2xl border-r border-gray-200 flex flex-col">
                  <div className="flex items-center justify-end p-4">
                    <X size={24} className="cursor-pointer hover:text-red-500 transition-colors" onClick={() => setIsOpenSidebar(false)} />
                  </div>
                  <ul className="w-full space-y-3 px-4">
                          {/* Dashboard Link */}
                          <motion.li whileTap={{ scale: 0.9 }} className="w-full">
                            <NavLink
                              onClick={() => handleDropdownClick("seller-dashboard")}
                              to="/seller-dashboard"
                              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                                activeSellerPath === "seller-dashboard"
                                  ? "bg-blue-100 text-blue-500"
                                  : "hover:bg-gray-100 text-gray-700"
                              }`}
                            >
                              <LayoutDashboard size={22} />
                              <span
                                className={` text-base font-medium`}
                              >
                                Dashboard
                              </span>
                            </NavLink>
                          </motion.li>
              
                          {/* Car Management */}
                          <motion.li
                            whileTap={{ scale: 0.9 }}
                            className={`w-full relative rounded-lg ${
                              activeSellerPath === "car"
                                ? "bg-blue-100 text-blue-500"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <NavLink to="car-lists" className="w-full">
                              <button
                                onClick={() => handleDropdownClick("car")}
                                className="flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200 cursor-pointer"
                              >
                                <Car size={22} />
                                <span
                                  className={` text-base font-medium flex-1 text-left`}
                                >
                                  Car Lists
                                </span>
                              </button>
                            </NavLink>
                          </motion.li>
              
                          {/* Booking Management */}
                          <motion.li whileTap={{ scale: 0.9 }} className={`w-full relative rounded-lg ${activeSellerPath === "booking" ? "bg-blue-100 text-blue-500" : "hover:bg-gray-100 text-gray-700"}`}>
                            <NavLink to="all-bookings" className="w-full">
                              <button
                                onClick={() => handleDropdownClick("booking")}
                                className="flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200  cursor-pointer"
                              >
                                <ClipboardList size={22} />
                                <span
                                  className={` text-base font-medium flex-1 text-left`}
                                >
                                  Booking Management
                                </span>
                              </button>
                            </NavLink>
                          </motion.li>
              
                          {/* Buyer Requests */}
                          <motion.li  whileTap={{ scale: 0.9 }} className={`w-full relative rounded-lg ${activeSellerPath === "buyer" ? "bg-blue-100 text-blue-500" : "hover:bg-gray-100 text-gray-700"}`}>
                            <NavLink to={'dealership-requests'}
                              onClick={() => handleDropdownClick("buyer")}
                              className="flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200  cursor-pointer"
                            >
                              <Handshake size={22} />
                              <span
                                className={` text-base font-medium flex-1 text-left`}
                              >
                                Buyer Requests
                              </span>
                            </NavLink>
                          </motion.li>
              
                          {/* Payment */}
                          <motion.li whileTap={{ scale: 0.9 }} className={`w-full relative rounded-lg ${activeSellerPath === "payment" ? "bg-blue-100 text-blue-500" : "hover:bg-gray-100 text-gray-700"}`}>
                            <NavLink to={'received-payments'}
                              onClick={() => handleDropdownClick("payment")}
                              className="flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200 cursor-pointer"
                            >
                              <CreditCard size={22} />
                              <span
                                className={` text-base font-medium flex-1 text-left`}
                              >
                                Payment
                              </span>
                            </NavLink>
                          </motion.li>
                        </ul>
                </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
