import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { Root } from "./pages/root";
import Market from "./pages/Market";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import { Container } from "@chakra-ui/react";
import Nopage from "./error/nopage";

function App() {
  return (
    <Container maxW={"full"} p={0} m={0}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Root />}>
          <Route path="dashboard" element={<Dashboard />} />
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
        </Route>
        <Route path="*" element={<Nopage />} />
      </Routes>
    </Container>
  );
}

export default App;
