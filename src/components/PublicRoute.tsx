/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }: any) {
  const { user, isAuthenticated } = useAuth();

  if (user && isAuthenticated) return <Navigate to="/" />;

  return children;
}
