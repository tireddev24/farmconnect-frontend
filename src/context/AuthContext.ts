import { createContext, useContext } from "react";
import type { User } from "../types/userType";

export interface AuthContextType {
  user: User | null; // Ideally replace with a real 'User' interface later
  // setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  url: string;
  isAuthenticated: boolean;
  login: (arg0: User) => void;
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
