/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";
import type { UserProfile } from "@/types/types";

const url = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const storedData = JSON.parse(sessionStorage.getItem("user_data")!);
  const storedToken1 = JSON.parse(sessionStorage.getItem("accessToken")!);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    storedData ? true : false,
  );
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (storedData) {
      const user = storedData;
      setAccessToken(storedToken1);

      setUser(user);
      setIsAuthenticated(true);
      setLoading(false);
    }
    setLoading(false);
  }, []);

  const login = (newData: UserProfile, token1: string) => {
    sessionStorage.setItem("user_data", JSON.stringify(newData));
    sessionStorage.setItem("accessToken", JSON.stringify(token1));
    setAccessToken(token1);
    setUser(newData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("user_data");
    sessionStorage.removeItem("accessToken")
    setUser(null);
    setIsAuthenticated(false);

  };

  console.log("User in AuthProvider:", user);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    accessToken,
    setAccessToken,
    loading,
    url,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
