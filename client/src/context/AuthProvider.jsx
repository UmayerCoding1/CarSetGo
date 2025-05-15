import React, { createContext, useEffect, useState } from "react";
import usePublicApi from "../hooks/usePublicApi";
import useSecureApi from "../hooks/useSecureApi";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const publicApi = usePublicApi();
  const secureApi = useSecureApi();

  const userRegister = async (data) => {
    return await publicApi.post("/auth/register",data);
  };
  const userLogin = async(data) => {
    return await publicApi.post('/auth/login',data)
  }

  const logout = async () => {
    console.log('ok');
    
    return await secureApi.post("/auth/logout");
  }


  useEffect(() => {
    const getLoginUser  = async () => {
      setIsLoading(true);
      try {
          const res = await secureApi.get('/auth/logdin-user');
          
          
          if (res.data) {
            setIsLoading(false);
              setUser(res.data.user);
          }
      } catch (error) {
          console.log(error);
          
      }
  }


  getLoginUser();
  },[secureApi])

  const value = {
    userRegister,
    userLogin,
    logout,
    setUser,
    user,
    isLoading
  };
  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>;
};

export default AuthProvider;
