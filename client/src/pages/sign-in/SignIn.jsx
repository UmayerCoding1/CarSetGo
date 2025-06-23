import React, { useState } from "react";
import { asset } from "../../assets/asser";
import { Eye, EyeClosed, Mail, User } from "lucide-react";
import GoogleLogin from "../../components/ui/GoogleLogin";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import useAuth from "../../hooks/useAuth";
import { toast, Toaster } from "sonner";
const SignIn = () => {
  const [signInData, setSignInData] = useState({
    emailOrUserName: "",
    password: "",
  });
 const [isShowPassword,setIsShowPassword]= useState(false);
  const navigate = useNavigate();

  const { userLogin, setUser } = useAuth();
  const handleInputChane = (e) => {
    const { name, value } = e.target;
    setSignInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin(signInData)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.message);
          
          toast.success(res.data.message);
          setUser(res.data.user);
          localStorage.setItem('xytz5T', `${res.data.user._id}+${res.data.token}+${res.data.user._id}`)

          setTimeout(() => navigate("/"), 1000);
          // ;
        }

        if (!res.data.success) {
          toast.error(err.response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="w-full lg:h-screen bg-gray-200 lg:flex items-center justify-center p-2 font-IBM">
      <div className="flex flex-col md:flex-row lg:flex-row items-center md:justify-between lg:justify-center bg-white md:bg-white lg:bg-white p-4 rounded-lg shadow-xl w-full lg:w-[800px] h-screen md:h-[500px] lg:h-[550px] overflow-hidden">
        <div
          className="w-full h-1/3 md:h-full  lg:w-1/2 lg:h-full bg-cover bg-center rounded-lg relative "
          style={{ backgroundImage: `url(${asset.authBg})` }}
        >
          <motion.img
            initial={{
              x: -270,
            }}
            animate={{
              x: 10,
            }}
            transition={{
              duration: 2,
              ease: "anticipate",
            }}
            loading="lazy"
            className="absolute -bottom-32 md:bottom-0 lg:-bottom-20 md:-right-7 lg:-right-16"
            src={asset.authCar}
            alt="auth-car"
          />
        </div>

        <div className="w-full lg:w-1/2 p-4 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center">
            <img className="w-48" src={asset.logo} alt="logo" />
            <h2 className="text-3xl font-semibold">Sign In youe account</h2>
            <p className="text-sm text-gray-500">
              Enter your deatils to proceed further
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-5">
            <div>
              <label
                className="font-medium text-[9px] text-gray-500"
                htmlFor="email or username"
              >
                Email or Username
              </label>{" "}
              <br />
              <div className="flex items-center justify-between p-2 border border-gray-300 rounded-sm w-72">
                <input
                  className="text-sm outline-none pl-1 w-full "
                  type="text"
                  name="emailOrUserName"
                  value={signInData.emailOrUserName}
                  onChange={handleInputChane}
                  placeholder="Email or username"
                  required
                />
                <User size={12} className="text-gray-500" />
              </div>
            </div>

            <div>
              <label
                className="font-medium text-[9px] text-gray-500"
                htmlFor="name"
              >
                Password
              </label>{" "}
              <br />
              <div className="flex items-center justify-between p-2 border border-gray-300 rounded-sm w-72">
                <input
                  className="text-sm outline-none pl-1 w-full "
                  type={isShowPassword ? 'text': 'password'}
                  name="password"
                  value={signInData.password}
                  onChange={handleInputChane}
                  placeholder="Enter your name"
                  required
                />

                <div onClick={() => setIsShowPassword(!isShowPassword)} className="cursor-pointer">
                   {isShowPassword ? 
                  <Eye  size={12} className="text-gray-500 " />
                  : <EyeClosed  size={12} className="text-gray-500 " />
                   }
                </div>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.8 }}
              type="submit"
              className="bg-gradient-to-r from-[#164eb6] to-[#189cda] p-2 mt-5 text-white font-semibold text-sm font-card rounded-sm w-full cursor-pointer"
            >
              Sign Up
            </motion.button>

            <p className="mt-2 text-center text-sm font-medium">
              You have a new account?{" "}
              <Link to={"/sign-up"} className="text-blue-700">
                Sign Up
              </Link>
            </p>
          </form>

          <div className="mt-5">
            <div className="flex items-center gap-2">
              <span className="block bg-gray-300 w-48 h-[1px]"></span>
              <p className="text-sm text-gray-500">Or</p>
              <span className="block bg-gray-300 w-48 h-[1px]"></span>
            </div>

            <GoogleLogin text={"Sign Up with Google"} />
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right"/>
    </div>
  );
};

export default SignIn;
