import {
  Calendar,
  CalendarClock,
  Car,
  ClipboardList,
  CreditCard,
  Handshake,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
} from "lucide-react";
import React, { useState } from "react";
import { asset } from "../../assets/asser";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownClick = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div
      className={`${
        isOpen ? "w-full lg:w-72" : "w-20"
      } transition-all duration-300 bg-white shadow-lg border-r border-gray-200 p-4 hidden lg:flex flex-col ${
        isOpen ? "items-start" : "items-center"
      } gap-4 h-screen overflow-y-auto z-50 relative `}
    >
      {/* Mobile Menu Button */}
      <div className="lg:hidden w-full flex justify-end mb-4">
        <Menu
          size={24}
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer hover:text-blue-600 transition-colors"
        />
      </div>

      {/* Logo Section */}
      <div
        className={`flex items-center ${
          isOpen ? "justify-between" : "justify-center"
        } p-2 w-full`}
      >
        <img
          src={asset.logo}
          alt="logo"
          className={`${isOpen ? "w-40" : "hidden"}`}
        />
        <Menu
          size={24}
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer hover:text-blue-600 transition-colors hidden lg:block"
        />
      </div>

      <div className="w-full flex flex-col gap-4 justify-between h-full">
        <div className="w-full">
          <ul className="w-full space-y-3">
            {/* Dashboard Link */}
            <motion.li whileTap={{scale: 0.9}} className="w-full">
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
                <span
                  className={`${
                    isOpen ? "block" : "hidden"
                  } text-base font-medium`}
                >
                  Dashboard
                </span>
              </NavLink>
            </motion.li>

            {/* Car Management Section */}
            <li  className="w-full relative">
              <div className="w-full">
                <button
                  onClick={() => handleDropdownClick("car")}
                  className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200 hover:bg-gray-100 text-gray-700 cursor-pointer`}
                >
                  <Car size={22} />
                  <span
                    className={`${
                      isOpen ? "block" : "hidden"
                    } text-base font-medium flex-1 text-left`}
                  >
                    Car Management
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === "car" ? "rotate-180" : ""
                    } ${!isOpen && "hidden"}`}
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
                  <div
                    className={`flex flex-col gap-2 mt-2 ${
                      !isOpen
                        ? "fixed top-[15%] left-[65px] bg-white shadow-lg rounded-lg p-2 min-w-[200px] z-50"
                        : "pl-12"
                    }`}
                  >
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
                      <span className="text-sm font-medium">View all cars</span>
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
                  className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200 hover:bg-gray-100 text-gray-700 cursor-pointer`}
                >
                  <ClipboardList size={22} />
                  <span
                    className={`${
                      isOpen ? "block" : "hidden"
                    } text-base font-medium flex-1 text-left`}
                  >
                    Booking Management
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === "booking" ? "rotate-180" : ""
                    } ${!isOpen && "hidden"}`}
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
                  <div
                    className={`flex flex-col gap-2 mt-2 ${
                      !isOpen
                        ? "fixed top-[25%] left-[65px] bg-white shadow-lg rounded-lg p-2 min-w-[200px] z-50"
                        : "pl-12"
                    }`}
                  >
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
                      <span className="text-sm font-medium">All bookings</span>
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
                  className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200 hover:bg-gray-100 text-gray-700 cursor-pointer`}
                >
                  <Handshake size={22} />
                  <span
                    className={`${
                      isOpen ? "block" : "hidden"
                    } text-base font-medium flex-1 text-left`}
                  >
                    Buyer Requests
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === "buyer" ? "rotate-180" : ""
                    } ${!isOpen && "hidden"}`}
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
                  <div
                    className={`flex flex-col gap-2 mt-2 ${
                      !isOpen
                        ? "fixed top-[30%] left-[65px] bg-white shadow-lg rounded-lg p-2 min-w-[200px] z-50"
                        : "pl-12"
                    }`}
                  >
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
                  className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200 hover:bg-gray-100 text-gray-700 cursor-pointer`}
                >
                  <CreditCard size={22} />
                  <span
                    className={`${
                      isOpen ? "block" : "hidden"
                    } text-base font-medium flex-1 text-left`}
                  >
                    Payment
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === "payment" ? "rotate-180" : ""
                    } ${!isOpen && "hidden"}`}
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
                  <div
                    className={`flex flex-col gap-2 mt-2 ${
                      !isOpen
                        ? "fixed top-[42%] left-[65px] bg-white shadow-lg rounded-lg p-2 min-w-[200px] z-50"
                        : "pl-12"
                    }`}
                  >
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
        </div>

        <div className="w-full">
          <motion.button whileTap={{scale: 0.9}} className="w-full bg-red-500 font-medium cursor-pointer text-sm flex items-center gap-2 justify-center text-white p-2 rounded-lg">
            {isOpen ? <span className="flex items-center gap-2"><LogOut size={18}/> Logout</span> : <span><LogOut size={18} /></span>}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
