import { createContext, useContext } from "react";
import type { UserProfile } from "@/types/types";

export interface AuthContextType {
  user: UserProfile | null; // Ideally replace with a real 'User' interface later
  // setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  url: string;
  isAuthenticated: boolean;
  accessToken?: string;
  setAccessToken: (token: string) => void;
  login: (arg0: UserProfile, arg1: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
