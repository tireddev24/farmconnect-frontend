import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/store";

interface RoleRouteProps {
    allowedRoles: string[];
}

export default function RoleRoute({
    allowedRoles,
}: RoleRouteProps) {

    const user = useAuthStore((state) => state.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    console.log(user)

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}