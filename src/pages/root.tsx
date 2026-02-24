import { Box, Container } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar";
import { useEffect } from "react";

export const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/dashboard");
    }
    //navigate to dashboard on load
  }, [navigate]);

  return (
    <Box rounded={"md"} minH={"100vh"} w={"full"} overflow={"clip"}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box ml={14} minH={"dvh"} bg={"black"}>
        <Outlet />
      </Box>
    </Box>
  );
};
