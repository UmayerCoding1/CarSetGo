import React from "react";
import { asset } from "../../assets/asser";
import {motion} from 'motion/react';
const GoogleLogin = ({ text }) => {
  return (
    <div className="flex items-center justify-center mt-5 font-card cursor-pointer select-none">
      <motion.div whileTap={{scale: 0.9}} className="flex items-center justify-center gap-2   border border-gray-300 rounded-sm w-[90%]">
        <img className="w-10" src={asset.googleLogo} alt="google logo" />
        <p className="text-sm text-gray-600 font-medium">{text} </p>
      </motion.div>
    </div>
  );
};

export default GoogleLogin;
