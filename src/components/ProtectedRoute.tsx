/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spin from "./ui/spinner";

export default function ProtectedRoute({ children }: any) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading)
    return (
      <div className="flex  justify-center items-center min-h-dvh">
        <Spin />
      </div>
    );

  if (user?.role.toLowerCase() === "admin") {
    return <Navigate to={"/admin/dashboard"} />;
  }

  console.log(user?.role);

  if (user?.role.toLowerCase() === "farmer") {
    return <Navigate to={"/farmer/dashboard"} />;
  }

  if (!user && !isAuthenticated) return <Navigate to="/login" />;

  return children;
}
