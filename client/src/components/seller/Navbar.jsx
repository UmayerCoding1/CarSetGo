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
import React, { useState } from "react";
import useAuth from "./../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import { motion } from "motion/react";

const Navbar = () => {
  const [isOpeUserMenu, setIsOpeUserMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { user } = useAuth();
  const isSellerBadge = "free";

  const handleLogout = async () => {};

  const handleDropdownClick = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };
  return (
    <div className="w-full h-16 bg-white shadow-lg border-b border-gray-200 flex items-center justify-between px-4">
      <div>
        <Link
          to="/"
          className="flex items-center gap-2 bg-black  text-white p-2 rounded-lg font-medium"
        >
          <Home size={20} /> Back to app
        </Link>
      </div>

      <div>
        {/* desktop */}
        <div className="flex items-center gap-4">
          <div>
            <div className="relative flex items-center justify-center w-10 h-10 bg-gray-200 rounded-lg cursor-pointer">
              <MessageCircle size={20} />
              <span className="absolute top-0 right-0 w-4 h-4 text-xs text-white flex items-center justify-center bg-red-500 rounded-full">
                2
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-1">
            <div
              onClick={() => setIsOpeUserMenu(!isOpeUserMenu)}
              className="relative cursor-pointer"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="user"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <User size={20} />
              )}
              <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
            </div>

            {isOpeUserMenu && (
              <div className="w-full lg:w-[300px] bg-white absolute left-0 lg:left-auto lg:right-2 top-[48px]  shadow-mg border border-gray-300">
                <div className=" shadow-primary rounded-lg bg-white right-0 p-2">
                  <div className="border-b border-gray-400">
                    <div className="flex  gap-3">
                      <img
                        className="w-10  h-10 rounded-full "
                        src={user?.avatar}
                        alt="avatar"
                        loading="lazy"
                      />
                      <div>
                        <h2 className="font-medium text-lg">
                          {user?.fullname}
                        </h2>
                        <p className="text-sm text-gray-600">{user?.email}</p>

                        <div className="flex items-center gap-2 my-3 ">
                          <label className="flex items-center justify-center gap-2 shadow border border-gray-300 px-2 py-1 rounded-lg text-sm cursor-pointer w-40">
                            <Plus size={15} />
                            <p>Update avatar</p>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              // onChange={handleUpdateAvatar}
                            />
                          </label>

                          <div
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 shadow border border-gray-300 px-2 py-1 rounded-lg text-sm cursor-pointer w-40"
                          >
                            <LogOut size={15} />
                            <p>Sign out</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" flex items-center gap-3 shadow my-3 p-3 border border-gray-300 rounded-lg cursor-pointer">
                    <Info size={18} />
                    <p className="font-medium text-sm">About Us</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg font-medium">{user?.fullname}</h2>
              <p
                className={`${
                  isSellerBadge === "free" ? "text-red-500" : "text-green-500"
                } text-xs `}
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

            {isOpenSidebar && <div className="absolute top-0   left-0 w-full h-full bg-white shadow-lg border-b border-gray-200">
                <div className="flex items-center justify-end p-4">
                    <X size={20} onClick={() => setIsOpenSidebar(false)} />
                </div>
              <ul className="w-full space-y-3">
                {/* Dashboard Link */}
                <motion.li whileTap={{ scale: 0.9 }} className="w-full">
                  <NavLink
                    to="/seller-dashboard"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-50 text-gray-700"
                      }`
                    }
                  >
                    <LayoutDashboard size={22} />
                    <span className="text-base font-medium">Dashboard</span>
                  </NavLink>
                </motion.li>

                {/* Car Management Section */}
                <li className="w-full relative">
                  <div className="w-full">
                    <button
                      onClick={() => handleDropdownClick("car")}
                      className="flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200 hover:bg-gray-100 text-gray-700 cursor-pointer"
                    >
                      <Car size={22} />
                      <span className="text-base font-medium flex-1 text-left">
                        Car Management
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === "car" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {activeDropdown === "car" && (
                      <div className="flex flex-col gap-2 mt-2 pl-12">
                        <NavLink
                          to="/seller-dashboard/view-cars"
                          className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-blue-50 text-blue-600"
                                : "hover:bg-gray-100 text-gray-700"
                            }`
                          }
                        >
                          <Car size={18} />
                          <span className="text-sm font-medium">
                            View all cars
                          </span>
                        </NavLink>
                        <NavLink
                          to="/seller-dashboard/add-car"
                          className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-blue-50 text-blue-600"
                                : "hover:bg-gray-100 text-gray-700"
                            }`
                          }
                        >
                          <PlusCircle size={18} />
                          <span className="text-sm font-medium">Add Car</span>
                        </NavLink>
                      </div>
                    )}
                  </div>
                </li>

                {/* Booking Management Section */}
                <li className="w-full relative">
                  <div className="w-full">
                    <button
                      onClick={() => handleDropdownClick("booking")}
                      className="flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200 hover:bg-gray-100 text-gray-700 cursor-pointer"
                    >
                      <ClipboardList size={22} />
                      <span className="text-base font-medium flex-1 text-left">
                        Booking Management
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === "booking" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {activeDropdown === "booking" && (
                      <div className="flex flex-col gap-2 mt-2 pl-12">
                        <NavLink
                          to="/seller-dashboard/all-bookings"
                          className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-blue-50 text-blue-600"
                                : "hover:bg-gray-100 text-gray-700"
                            }`
                          }
                        >
                          <Calendar size={18} />
                          <span className="text-sm font-medium">
                            All bookings
                          </span>
                        </NavLink>
                      </div>
                    )}
                  </div>
                </li>

                {/* Buyer Requests Section */}
                <li className="w-full relative">
                  <div className="w-full">
                    <button
                      onClick={() => handleDropdownClick("buyer")}
                      className="flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200 hover:bg-gray-100 text-gray-700 cursor-pointer"
                    >
                      <Handshake size={22} />
                      <span className="text-base font-medium flex-1 text-left">
                        Buyer Requests
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === "buyer" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {activeDropdown === "buyer" && (
                      <div className="flex flex-col gap-2 mt-2 pl-12">
                        <NavLink
                          to="/seller-dashboard/dealership-requests"
                          className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-blue-50 text-blue-600"
                                : "hover:bg-gray-100 text-gray-700"
                            }`
                          }
                        >
                          <Handshake size={18} />
                          <span className="text-sm font-medium">
                            Dealership requests
                          </span>
                        </NavLink>
                        <NavLink
                          to="/seller-dashboard/schedile-mecting"
                          className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-blue-50 text-blue-600"
                                : "hover:bg-gray-100 text-gray-700"
                            }`
                          }
                        >
                          <CalendarClock size={18} />
                          <span className="text-sm font-medium">
                            Schedule meeting
                          </span>
                        </NavLink>
                      </div>
                    )}
                  </div>
                </li>

                {/* Payment Section */}
                <li className="w-full relative">
                  <div className="w-full">
                    <button
                      onClick={() => handleDropdownClick("payment")}
                      className="flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200 hover:bg-gray-100 text-gray-700 cursor-pointer"
                    >
                      <CreditCard size={22} />
                      <span className="text-base font-medium flex-1 text-left">
                        Payment
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === "payment" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {activeDropdown === "payment" && (
                      <div className="flex flex-col gap-2 mt-2 pl-12">
                        <NavLink
                          to="/seller-dashboard/received-payments"
                          className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-blue-50 text-blue-600"
                                : "hover:bg-gray-100 text-gray-700"
                            }`
                          }
                        >
                          <CreditCard size={18} />
                          <span className="text-sm font-medium">
                            Received payments
                          </span>
                        </NavLink>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
