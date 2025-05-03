import React, { useEffect, useRef, useState } from "react";
import { asset } from "../../../assets/asser";
import UserNav from "./UserNav";
import { motion } from "motion/react";
import SellerNav from "./SellerNav";
import { LogOut, User } from "lucide-react";
import AdminNav from "./AdminNav";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const MotionLink = motion(Link);
  const [isSticky, setIsSticky] = useState(false);
  const [isOpenUserMenage, setIsOpenUserMenage] = useState(false);
  const userManageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleOutSiteClick = (e) => {
      if (userManageRef.current && !userManageRef.current.contains(e.target)) {
        setIsOpenUserMenage(false);
      }
    };

    document.addEventListener("mousedown", handleOutSiteClick);

    return () => {
      document.removeEventListener("mousedown", handleOutSiteClick);
    };
  }, []);

  

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-4 shadow-md fixed top-0 left-0 w-full z-50 ${
          isSticky ? "bg-white backdrop-blur-md" : "bg-transparent"
        } transition-all duration-300 ease-in-out bg-white`}
      >
        <nav className="flex items-center justify-between ">
          <Link to={"/"}>
            <img loading="lazy" className="w-48" src={asset.logo} alt="logo" />
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              {user.role === "user" && <UserNav asset={asset} user={user} />}
              {user.role === "seller" && (
                <SellerNav asset={asset} user={user} />
              )}
              {user.role === "admin" && <AdminNav asset={asset} user={user} />}

              <div className="relative">
                {/* User Avatar or Icon */}
                <div onClick={() => setIsOpenUserMenage(!isOpenUserMenage)} className="cursor-pointer">
                  {user?.avatar ? (
                    <img className="w-16 h-16 " src={user?.avatar} alt="avatar" />
                  ) : (
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      className="bg-gray-200 p-2 rounded-full cursor-pointer relative"
                    >
                      <User />
                    </motion.div>
                  )}
                </div>

                {/* User Menu */}
                {isOpenUserMenage && (
                  <div
                    ref={userManageRef}
                    className="absolute w-full lg:w-[300px] h-[200px] top-20 shadow-primary rounded-lg bg-white right-0"
                  >
                    <div className="flex items-center gap-3 shadow p-2 mt-5">
                      <LogOut
                        size={20}
                        strokeWidth={2}
                        className="text-gray-600"
                      />
                      <p className="text-gray-600">Sign out</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <MotionLink
              to="/sign-up"
              whileTap={{ scale: 0.9 }}
              className="bg-blue-600 text-white px-4 py-2 font-semibold rounded-lg text-sm cursor-pointer"
            >
              Create an account
            </MotionLink>
          )}
        </nav>
      </motion.header>

      {/* Navbar er jonne space */}
      <div className="h-[90px] md:h-[65px] lg:h-[65px]"></div>
    </>
  );
};

export default Navbar;
