import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/store";

export default function ProtectedRoute() {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!user || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}