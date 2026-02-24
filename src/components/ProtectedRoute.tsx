import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }: any) {
  // const { user, loading } = useAuth();

  // const storedData = JSON.parse(sessionStorage.getItem("user_data")!);

  // console.log("User in AuthProvider:", storedData);

  // if (loading) return <p>Loading...</p>;
  // if (!storedData) return <Navigate to="/login" />;

  return children;
}
