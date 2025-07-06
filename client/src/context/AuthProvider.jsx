import React, { createContext, useEffect, useState } from "react";
import usePublicApi from "../hooks/usePublicApi";
import useSecureApi from "../hooks/useSecureApi";
import Loding from "../components/ui/Loading";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const publicApi = usePublicApi();
  const secureApi = useSecureApi();
  const token = localStorage.getItem("xytz5T");

  const userRegister = async (data) => {
    return await publicApi.post("/auth/register", data);
  };
  const userLogin = async (data) => {
    return await publicApi.post("/auth/login", data);
  };

  const logout = async () => {
    return await secureApi.post("/auth/logout");
  };

  useEffect(() => {
    const getLoginUser = async () => {
      setIsLoading(true);
      try {
        const res = await secureApi.get("/auth/logdin-user");

        if (res.data) {
          setIsLoading(false);
          setUser(res.data.user);
        }
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    getLoginUser();
  }, [secureApi]);

  const value = {
    userRegister,
    userLogin,
    logout,
    setUser,
    user,
    isLoading,
  };
  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <Loding /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
