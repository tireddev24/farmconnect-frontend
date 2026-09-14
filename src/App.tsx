import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "@/pages/Buyer/Dashboard";
import ProtectedRoute from "./components/route/ProtectedRoute";
import { Root } from "./pages/Buyer/root";
import { Root as AdminRoot } from "./pages/Admin/root";
import { Root as FarmerRoot } from "./pages/Farmer/root";
import Orders from "@/pages/Buyer/Orders";
import Profile from "@/pages/Buyer/Profile";
import { Container } from "@chakra-ui/react";
import Nopage from "./components/ui/error/nopage";
import ProductDetails from "@/pages/Buyer/Product";
import AdminDashboard from "@/pages/Admin/Admin";
import UserManagement from "@/pages/Admin/UserManagement";
import FarmerDashboard from "@/pages/Farmer/dashboard";
import FarmerOrders from "@/pages/Farmer/orders";
import FarmerProfile from "@/pages/Farmer/profile";
import Checkout from "@/pages/Buyer/Checkout";
import Payment from "./pages/Buyer/Payment";
import Action from "pages/Admin/action";
import ListNewProduct from "pages/Farmer/newProduct";
import FarmerProducts from "pages/Farmer/products";
import Verify from "pages/Admin/verifications";
import AdminProducts from "pages/Admin/products";
import SystemLogs from "pages/Admin/logs";
import { useAuthStore } from "./store/store";
import Spin from "./components/ui/spinner";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import RoleRoute from "./components/route/RoleRoute";
import HomeRedirect from "./components/route/HomeRedirect";
import Notauthorized from "./components/ui/error/notauthorized";

function AppInitializer() {
  const { url } = useAuth();

  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setInitialized = useAuthStore(
    (state) => state.setInitialized
  );

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const response = await fetch(
          `${url}/auth/refresh-token`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        if (!response.ok) {
          clearAuth();
          return;
        }

        const { user, accessToken } = await response.json();

        setAuth(user, accessToken);
      } catch (error) {
        console.error("Session initialization failed:", error);
        clearAuth();
      } finally {
        setInitialized(true);
      }
    };

    initializeSession();
  }, [url, setAuth, clearAuth, setInitialized]);

  return null;
}




function App() {

  const isInitialized = useAuthStore((state) => state.isInitialized);



  return (
    <Container maxW={"full"} p={0} m={0}>
      <AppInitializer />

      {!isInitialized ? <Spin h="100dvh" /> :


        <Routes>

          {/* Auth Routes - Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomeRedirect />} />

            {/* Buyer Routes */}
            <Route element={<RoleRoute allowedRoles={["Buyer"]} />} >
              <Route path="/" element={<Root />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="orders" element={<Orders />} />
                <Route path="profile" element={<Profile />} />
                <Route path="checkout/:id" element={<Checkout />}>
                  <Route path="payment" element={<Payment />} />
                </Route>
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<RoleRoute allowedRoles={["Admin"]} />} >
              <Route path="/admin" element={<AdminRoot />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="usermanagement" element={<UserManagement />}>
                  <Route path=":id" element={<Action />} />
                </Route>
                <Route path="orders" element={<Verify />} />
                <Route path="orders/:id" element={<Action />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="logs" element={<SystemLogs />} />
              </Route>
            </Route>


            {/* Farmer Routes */}
            <Route element={<RoleRoute allowedRoles={["Farmer"]} />} >
              <Route path="/farmer" element={<FarmerRoot />}>
                <Route path="dashboard" element={<FarmerDashboard />} />
                <Route path="products" element={<FarmerProducts />} />
                <Route path="orders" element={<FarmerOrders />} />
                <Route path="newProduct" element={<ListNewProduct />} />
                <Route path="profile" element={<FarmerProfile />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Nopage />} />
          <Route path="/unauthorized" element={<Notauthorized />} />
        </Routes>
      }
    </Container>
  );
}

export default App;
