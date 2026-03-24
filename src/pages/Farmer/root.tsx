import { Box } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { Sidebar } from "../../components/sidebar";

export const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/dashboard");
    }
    //navigate to dashboard on load
  }, [navigate]);

  return (
    <Box
      rounded={"md"}
      alignContent={"flex-start"}
      bg={{ base: "#f8fafb", _dark: "black" }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box
        ml={16}
        minH={"dvh"}
        bg={{ base: "colorPalette.muted/70", _dark: "black" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
