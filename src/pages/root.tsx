import { Box } from "@chakra-ui/react";
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
    <Box rounded={"md"} alignContent={"flex-start"}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box ml={16} bg={{ base: "colorPalette.muted/70", _dark: "black" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
