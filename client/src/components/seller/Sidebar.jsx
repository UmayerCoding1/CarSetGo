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
import React, { useEffect, useState } from "react";
import { asset } from "../../assets/asser";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSellerPath, setActiveSellerPath] = useState('');

  const handleDropdownClick = (dropdownName) => {
    setActiveSellerPath(dropdownName);
    localStorage.setItem('currentSellerPath', dropdownName);
  };

  useEffect(() => {
    const currentPath = localStorage.getItem('currentSellerPath');
    if (currentPath) {
      setActiveSellerPath(currentPath);
    }
  }, []);

  return (
    <div
      className={`${
        isOpen ? "w-full lg:w-72" : "w-20"
      } transition-all duration-300 bg-white shadow-lg border-r border-gray-200 p-4 hidden lg:flex flex-col ${
        isOpen ? "items-start" : "items-center"
      } gap-4 h-screen overflow-y-auto z-50 relative`}
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
            <motion.li whileTap={{ scale: 0.9 }} className="w-full">
              <NavLink
                onClick={() => handleDropdownClick("dashboard")}
                to="/seller-dashboard"
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  activeSellerPath === "dashboard"
                    ? "bg-blue-100 text-blue-500"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
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
                    className={`${
                      isOpen ? "block" : "hidden"
                    } text-base font-medium flex-1 text-left`}
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
                    className={`${
                      isOpen ? "block" : "hidden"
                    } text-base font-medium flex-1 text-left`}
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
                  className={`${
                    isOpen ? "block" : "hidden"
                  } text-base font-medium flex-1 text-left`}
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
                  className={`${
                    isOpen ? "block" : "hidden"
                  } text-base font-medium flex-1 text-left`}
                >
                  Payment
                </span>
              </NavLink>
            </motion.li>
          </ul>
        </div>

        {/* Logout */}
        <div className="w-full">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-full bg-red-500 font-medium cursor-pointer text-sm flex items-center gap-2 justify-center text-white p-2 rounded-lg"
          >
            {isOpen ? (
              <span className="flex items-center gap-2">
                <LogOut size={18} /> Logout
              </span>
            ) : (
              <span>
                <LogOut size={18} />
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
