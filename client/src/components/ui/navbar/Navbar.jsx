import React, { useEffect, useRef, useState } from "react";
import { asset } from "../../../assets/asser";
import UserNav from "./UserNav";
import { motion } from "motion/react";
import SellerNav from "./SellerNav";
import {
  Ban,
  Car,
  Handshake,
  Info,
  LogOut,
  MessageCircle,
  Plus,
  Settings,
  User,
  X,
} from "lucide-react";
import AdminNav from "./AdminNav";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { toast } from "sonner";
import useSecureApi from "../../../hooks/useSecureApi";
import UserMenu from "../UserMenu";
import Profile from "../Profile";

const Navbar = () => {
  const { user, logout, setUser } = useAuth();
  const MotionLink = motion.create(Link);
  const [isSticky, setIsSticky] = useState(false);
  const [isOpenUserMenage, setIsOpenUserMenage] = useState(false);
  const [isOpenRequestForSeller, setIsOpenRequestForSeller] = useState(false);
  const [isOpenProfile,setIsOpenProfile] = useState(false);
  const userManageRef = useRef(null);
  const secureApi = useSecureApi();
  const navigate = useNavigate();

  const handleUpdateAvatar = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);
  };

  const handleLogout = () => {
    logout()
      .then((res) => {
        setUser("");
        localStorage.removeItem("xytz5T");
      })
      .catch((err) => {
        throw new Error(error);
      });
  };

  const handleRequestForSeller = async (e) => {
    e.preventDefault();
    const reason = e.target.reason.value;
    if (reason.length === 0) {
      toast.error("Reason is required");
      return;
    }

    try {
      const res = await secureApi.post("/seller-request", { reason });
      if (res.data.success) {
        toast.success(res.data.message);
        e.target.reset();
        setIsOpenRequestForSeller(false);
        document.body.style.overflow = "auto";
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
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
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.key === "Backspace") {
        e.preventDefault(); // optional, prevents browser history back
        navigate("/");
      }

      if (e.ctrlKey) {
        const key = e.key.toLowerCase();
        if (key === "p") {
          e.preventDefault();
          setIsOpenUserMenage(false);
          setIsOpenProfile(true);
        }
        if (key === "m") {
          e.preventDefault();
          setIsOpenUserMenage(false);
          navigate(`/my-cars/${user?._id}`);
        }
        if (key === "b") {
          e.preventDefault();
          setIsOpenUserMenage(false);
          navigate("/my-booking");
        }
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, [navigate, setIsOpenUserMenage, user]);

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
            <img loading="lazy" className="w-48 " src={asset.logo} alt="logo" />
          </Link>

          {user?.role === "blacklisted" ? (
            <div className="flex flex-col items-center gap-3 bg-gradient-to-r from-blue-50 via-white to-blue-100 border border-blue-200 rounded-lg px-3 py-3 w-full max-w-[400px] shadow relative  sm:px-6 sm:py-4">
              <Ban className="animate-pulse absolute top-2 left-4 sm:top-3 sm:left-7 text-red-600" />
              <p className="text-base sm:text-lg font-bold text-red-700 flex items-center gap-2 mt-2">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                You are blacklisted
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 text-center px-1">
                Your account has been restricted. Please contact support or try
                logging in again.
              </p>
              <div className="flex flex-wrap gap-2 justify-center w-full">
                <Link
                  to="/sign-in"
                  className="inline-block w-full sm:w-auto text-center bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200 text-xs sm:text-sm border border-blue-600"
                >
                  Go to Login
                </Link>
                <Link
                  to="/support"
                  className="inline-block w-full sm:w-auto text-center bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200 text-xs sm:text-sm border border-green-500"
                >
                  Support
                </Link>
              </div>
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              {user.role === "user" && <UserNav asset={asset} user={user} />}
              {user.role === "seller" && (
                <SellerNav asset={asset} user={user} />
              )}
              {user.role === "admin" && <AdminNav asset={asset} user={user} />}

              <div className="relative">
                {/* User Avatar or Icon */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpenUserMenage(!isOpenUserMenage);
                  }}
                  className="cursor-pointer"
                >
                  {user?.avatar ? (
                    <img
                      className="w-10  h-10 rounded-full "
                      src={user?.avatar}
                      alt="avatar"
                      loading="lazy"
                    />
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
                  <UserMenu
                    onUseRef={userManageRef}
                    user={user}
                    onLogout={handleLogout}
                    setIsOpenUserMenage={setIsOpenUserMenage}
                    setIsOpenRequestForSeller={setIsOpenRequestForSeller}
                    setIsOpenProfile={setIsOpenProfile}
                  />
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

      {isOpenRequestForSeller && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="w-full max-w-md bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl p-6 shadow-2xl border border-gray-200 relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Request for seller
              </h2>
              <button
                onClick={() => {
                  document.body.style.overflow = "auto";
                  setIsOpenRequestForSeller(false);
                }}
                className="flex items-center justify-center gap-1 text-lg font-medium cursor-pointer hover:text-red-500 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleRequestForSeller}>
              <div className="mb-4">
                <label
                  htmlFor="reason"
                  className="text-sm font-semibold text-gray-700 mb-1 block"
                >
                  Reason
                </label>
                <textarea
                  name="reason"
                  id="reason"
                  className="w-full h-24 border border-gray-300 rounded-lg p-3 resize-none outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  placeholder="Why do you want to become a seller?"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-4 py-2 font-semibold rounded-lg text-base cursor-pointer shadow transition-all duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}


    {user && isOpenProfile && (
      <>
      <Profile  user={user}  setIsOpenProfile={setIsOpenProfile}/>
      </>
    )}


      {/* Navbar er jonne space */}
      <div className="h-[90px] md:h-[65px] lg:h-[65px]"></div>
    </>
  );
};

export default Navbar;
