import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getMe } from "../api/auth";
import { AuthContext, type AuthContextType } from "./AuthContext";
import type { User } from "../types/userType";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const storedData = JSON.parse(sessionStorage.getItem("user_data")!);
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(
    storedData ? true : false,
  );

  useEffect(() => {
    getMe()
      .then((res) => {
        setUser(res.data.data);
        setIsAuthenticated(true);

        // setAccessToken(res.data.accessToken);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  console.log(loading);

  console.log("User in AuthProvider:", user);

  const value: AuthContextType = {
    user,
    setUser,
    loading,
    accessToken,
    setAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
