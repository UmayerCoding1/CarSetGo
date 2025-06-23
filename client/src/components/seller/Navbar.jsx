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
    <div className="w-full h-16 bg-white shadow-lg border-b border-gray-200 flex items-center justify-between px-4">
      <div>
        <Link
          to="/"
          className="flex items-center gap-2 bg-black  text-white p-2 rounded-lg font-medium"
        >
          <Home size={20} /> <span className="hidden lg:block">Back to app</span>
        </Link>
      </div>

      <div>
        {/* desktop */}
        <div className="flex items-center gap-4">
          {user?.isPlanActive && <div className="flex items-center gap-2">
            <span className="font-card text-xs font-semibold  bg-amber-200 p-2 rounded-lg">{user?.plan} plan</span>

           
          </div>}
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
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
