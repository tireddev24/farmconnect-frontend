import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Root } from "./pages/root";
import { Root as AdminRoot } from "./pages/Admin/root";
import { Root as FarmerRoot } from "./pages/Farmer/root";
import Market from "./pages/Market";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import { Container } from "@chakra-ui/react";
import Nopage from "./error/nopage";
import ProductDetails from "./pages/Product";
import AdminDashboard from "./pages/Admin/Admin";
import UserManagement from "./pages/Admin/UserManagement";
import FarmerDashboard from "./pages/Farmer/dashboard";
import FarmerOrders from "./pages/Farmer/orders";
import FarmerProfile from "./pages/Farmer/profile";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Action from "pages/Admin/action";
import ListNewProduct from "pages/Farmer/newProduct";
import FarmerProducts from "pages/Farmer/products";
import Verify from "pages/Admin/verifications";
import AdminProducts from "pages/Admin/products";
import SystemLogs from "pages/Admin/logs";

function App() {
  return (
    <Container maxW={"full"} p={0} m={0}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Root />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="product/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route path="market" element={<Market />} />

          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="checkout/:id"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          >
            <Route path="payment" element={<Payment />} />
          </Route>
        </Route>
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
        <Route path="/farmer" element={<FarmerRoot />}>
          <Route path="dashboard" element={<FarmerDashboard />} />
          <Route path="products" element={<FarmerProducts />} />
          <Route path="orders" element={<FarmerOrders />} />
          <Route path="newProduct" element={<ListNewProduct />} />
          <Route path="profile" element={<FarmerProfile />} />
        </Route>
        <Route path="*" element={<Nopage />} />
      </Routes>
    </Container>
  );
}

export default App;
