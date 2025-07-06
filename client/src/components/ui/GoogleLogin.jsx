import React from "react";
import { asset } from "../../assets/asser";
import {motion} from 'motion/react';
import {useGoogleLogin} from '@react-oauth/google'
import usePublicApi from "../../hooks/usePublicApi";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from 'react-router-dom';
const GoogleLogin = () => {
  const publicApi = usePublicApi();
  const {setUser} = useAuth();
  const navigate = useNavigate();
  const responseGoogle = async (authRes) => {
    try {
      if (authRes['code']) {
        const response = await publicApi.get(`/auth/google-login?code=${authRes['code']}`);
        if(response.data.success){
          localStorage.setItem('xytz5T', `${response.data.user._id}+${response.data.token}+${response.data.user._id}`);
          setUser(response.data.user);
           navigate('/');
        }
        
      }
     
    } catch (error) {
      console.log('Google auth response error : ', error)
    }
  }
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
  })
  return (
    <div className="flex items-center justify-center mt-5 font-card cursor-pointer select-none">
      <motion.div onClick={() => googleLogin()} whileTap={{scale: 0.9}} className="flex items-center justify-center gap-2   border border-gray-300 rounded-sm w-[90%]">
        <img className="w-10" src={asset.googleLogo} alt="google logo" />
        <p className="text-sm text-gray-600 font-medium">Continue to Google </p>
      </motion.div>
    </div>
  );
};

export default GoogleLogin;
