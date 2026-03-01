/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spin from "./ui/spinner";

export default function ProtectedRoute({ children }: any) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex  justify-center items-center min-h-dvh">
        <Spin />
      </div>
    );

  if (!user) return <Navigate to="/login" />;

  return children;
}
