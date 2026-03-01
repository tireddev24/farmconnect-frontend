/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";
import type { User } from "../types/userType";

const url = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const storedData = JSON.parse(sessionStorage.getItem("user_data")!);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    storedData ? true : false,
  );

  useEffect(() => {
    if (storedData) {
      const user = storedData;
      setUser(user);
      setIsAuthenticated(true);
      setLoading(false);
    }
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   getMe()
  //     .then((res) => {
  //       setUser(res.data.data);
  //       setIsAuthenticated(true);

  //       // setAccessToken(res.data.accessToken);
  //     })
  //     .catch(() => setUser(null))
  //     .finally(() => setLoading(false));
  // }, []);

  // console.log(loading);

  const login = (newData: User) => {
    sessionStorage.setItem("user_data", JSON.stringify(newData));
    setUser(newData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("user_data");
    setUser(null);
    setIsAuthenticated(false);
  };

  console.log("User in AuthProvider:", user);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading,
    url,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
