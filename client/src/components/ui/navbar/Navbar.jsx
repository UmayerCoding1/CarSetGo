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
                    className="absolute w- lg:w-[300px]  top-[52px] shadow-primary rounded-lg  bg-white -right-2  lg:right-0 p-2"
                  >
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
                                onChange={handleUpdateAvatar}
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

                    <Link to={`/my-cars/${user?._id}`} onClick={() => setIsOpenUserMenage(false)} className=" flex items-center gap-3 shadow my-3 p-3 border border-gray-300 rounded-lg cursor-pointer">
                      <Car size={18} />
                      <p className="font-medium text-sm">My cars</p>
                    </Link>

                    {user?.role === "user" && (
                      <div
                        onClick={() => {
                          document.body.style.overflow = "hidden";
                          setIsOpenRequestForSeller(true);
                          setIsOpenUserMenage(false);
                        }}
                        className=" flex items-center gap-3 shadow my-3 p-3 border border-gray-300 rounded-lg cursor-pointer"
                      >
                        <Handshake size={18} />
                        <p className="font-medium text-sm">
                          Request for seller
                        </p>
                      </div>
                    )}

                    {user?.role === "seller" && (
                      <div onClick={() => setIsOpenUserMenage(false)} className=" flex items-center gap-3 shadow my-3 p-3 border border-gray-300 rounded-lg cursor-pointer">
                        <MessageCircle size={18} />
                        <p className="font-medium text-sm">Message </p>
                      </div>
                    )}

                    <div onClick={() => setIsOpenUserMenage(false)} className=" flex items-center gap-3 shadow my-3 p-3 border border-gray-300 rounded-lg cursor-pointer">
                      <Info size={18} />
                      <p className="font-medium text-sm">About Us</p>
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
        <div className="absolute  top-0 left-0 w-full h-screen bg-black/70 z-50 flex items-center justify-center">
          <div className="w-[500px]  bg-white rounded-lg p-3 ">
            <div className="flex items-center justify-between">
              <h2 className="text-center text-2xl font-bold">
                Request for seller
              </h2>

              <div onClick={() => {
                document.body.style.overflow = 'auto';
                setIsOpenRequestForSeller(false)
              }} className="flex items-center justify-center gap-1 text-sm font-medium cursor-pointer">
                <X size={18} />
                
              </div>
            </div>

            <form onSubmit={handleRequestForSeller}>
              <div className="my-3">
                <label htmlFor="reason" className="text-sm font-medium">
                  Reason
                </label>
                <textarea
                  name="reason"
                  id="reason"
                  className="w-full h-20 border border-gray-300 rounded-lg p-2 resize-none outline-none"
                  placeholder="Reason"
                ></textarea>

                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 font-semibold rounded-lg text-sm cursor-pointer my-3"
                >
                  Submit
                </button>
              </div>
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
