import { useAuthStore } from "@/store/store";
import { Navigate } from "react-router-dom";

function HomeRedirect() {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    console.log(user)

    switch (user.role) {
        case "Admin":
            return <Navigate to="/admin/dashboard" replace />;

        case "Farmer":
            return <Navigate to="/farmer/dashboard" replace />;

        case "Buyer":
            return <Navigate to="/dashboard" replace />;

        default:
            return <Navigate to="/login" replace />;
    }
}

export default HomeRedirect