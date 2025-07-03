import {
  BarChart2,
  Calendar,
  CalendarClock,
  Car,
  ClipboardList,
  CreditCard,
  Handshake,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  Users,
  X,
  Star,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { asset } from "../../assets/asser";
import { motion } from "motion/react";
import {Link, useNavigate} from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

const navLinks = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/admin/dashboard' },
  { label: 'Users', icon: Users, to: 'users' },
  { label: 'Cars', icon: Car, to: 'cars' },
  // { label: 'Payments', icon: CreditCard, to: '/admin/payments' },
  // { label: 'Messages', icon: MessageCircle, to: '/admin/messages' },
  // { label: 'Analytics', icon: BarChart2, to: '/admin/analytics' },
  // { label: 'Report', icon: ClipboardList, to: '/admin/report' },
  // { label: 'Plan', icon: CalendarClock, to: '/admin/plan' },
  // { label: 'Review', icon: Star, to: '/admin/review' },
  // { label: 'Settings', icon: Settings, to: '/admin/settings' },
];
const Sidebar = () => {
  // Default open on desktop, closed on mobile
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const [activeSellerPath, setActiveSellerPath] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {logout} = useAuth();
  const navigate = useNavigate();
  // const handleDropdownClick = (dropdownName) => {
  //   setActiveSellerPath(dropdownName);
  //   sessionStorage.setItem("currentSellerPath", dropdownName);
  //   if (windowWidth < 1024) setIsOpen(false); // auto close on mobile
  // };



  const handleLogout = async () => {
    logout()
    .then((res) => {
        setUser("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const currentPath = sessionStorage.getItem("currentSellerPath");
    if (currentPath) {
      setActiveSellerPath(currentPath);
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsOpen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      
     

      <div
        className={`$
          isOpen ? "w-full lg:w-72" : "w-20"
        } transition-all duration-300 bg-gradient-to-br from-[#0f172a] via-[#164e63] to-[#06b6d4] text-cyan-100 shadow-2xl border-r border-cyan-900 p-4 hidden lg:flex flex-col ${
          isOpen ? "items-start" : "items-center"
        } gap-4 h-screen overflow-y-auto z-50 relative`}
      >
        {/* Logo Section */}
        <div
          className={`flex items-center ${
            isOpen ? "justify-between" : "justify-center"
          } p-2 w-full`}
        >
          <img
            src={asset.logo}
            alt="logo"
            className={`${isOpen ? "w-40 drop-shadow-xl" : "hidden"}`}
          />
          <Menu
            size={24}
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer hover:text-cyan-400 transition-colors hidden lg:block"
          />
        </div>

        <div className="w-full flex flex-col gap-4 justify-between h-full">
          <div className="w-full">
           

            <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {navLinks.map(({ label, icon: Icon, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-cyan-800/70  ${
                    location.pathname === to ? 'bg-cyan-700/90 hover:pl-6 pl-6 shadow-lg' : ''
                  }`}
                >
                 {isOpen ? <>
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                 </> : <Icon className="w-6 h-6" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
          </div>

          {/* Logout */}
          <div className="w-full">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-full bg-gradient-to-r from-rose-500 to-cyan-500 font-medium cursor-pointer text-sm flex items-center gap-2 justify-center text-white p-2 rounded-lg shadow-lg hover:from-cyan-500 hover:to-rose-500 transition-colors"
              onClick={()=>handleLogout()}
            >
              {isOpen ? (
                <span  className="flex items-center gap-2">
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
    </>
  );
};

export default Sidebar;
