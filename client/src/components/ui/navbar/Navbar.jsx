import React, { useEffect, useRef, useState } from "react";
import { asset } from "../../../assets/asser";
import UserNav from "./UserNav";
import { motion } from "motion/react";
import SellerNav from "./SellerNav";
import {
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
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { toast } from "sonner";
import useSecureApi from "../../../hooks/useSecureApi";

const Navbar = () => {
  const { user, logout, setUser } = useAuth();
  const MotionLink = motion.create(Link);
  const [isSticky, setIsSticky] = useState(false);
  const [isOpenUserMenage, setIsOpenUserMenage] = useState(false);
  const [isOpenRequestForSeller, setIsOpenRequestForSeller] = useState(false);
  const userManageRef = useRef(null);
  const secureApi = useSecureApi();

  const handleUpdateAvatar = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);
    console.log(formData);
  };

  const handleLogout = () => {
    logout()
      .then((res) => {
        setUser("");
        localStorage.removeItem("xytz5T");
      })
      .catch((err) => {
        console.log(err);
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
      console.log(error);
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

          {user ? (
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
                  <div
                    ref={userManageRef}
                    className="absolute w-full lg:w-[320px] top-[52px] shadow-2xl border border-gray-200 rounded-2xl bg-white -right-2 lg:right-0 p-4 z-50 animate-fade-in-up"
                  >
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
                          onChange={handleUpdateAvatar}
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
                    <div className="w-full h-px bg-gradient-to-r from-blue-400/30 via-gray-300/30 to-transparent my-3"></div>
                    <Link
                      to={`/my-cars/${user?._id}`}
                      onClick={() => setIsOpenUserMenage(false)}
                      className="flex items-center gap-3 my-2 p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors font-medium text-sm"
                    >
                      <Car size={18} />
                      <span>My cars</span>
                    </Link>
                    {user?.role === "user" && (
                      <div
                        onClick={() => {
                          document.body.style.overflow = "hidden";
                          setIsOpenRequestForSeller(true);
                          setIsOpenUserMenage(false);
                        }}
                        className="flex items-center gap-3 my-2 p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors font-medium text-sm"
                      >
                        <Handshake size={18} />
                        <span>Request for seller</span>
                      </div>
                    )}
                    {user?.role === "seller" && (
                      <div
                        onClick={() => setIsOpenUserMenage(false)}
                        className="flex items-center gap-3 my-2 p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors font-medium text-sm"
                      >
                        <MessageCircle size={18} />
                        <span>Message</span>
                      </div>
                    )}
                    <div
                      onClick={() => setIsOpenUserMenage(false)}
                      className="flex items-center gap-3 my-2 p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors font-medium text-sm"
                    >
                      <Info size={18} />
                      <span>About Us</span>
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

      {isOpenRequestForSeller && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="w-full max-w-md bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl p-6 shadow-2xl border border-gray-200 relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Request for seller</h2>
              <button
                onClick={() => {
                  document.body.style.overflow = 'auto';
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
                <label htmlFor="reason" className="text-sm font-semibold text-gray-700 mb-1 block">
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
      {/* Navbar er jonne space */}
      <div className="h-[90px] md:h-[65px] lg:h-[65px]"></div>
    </>
  );
};

export default Navbar;
