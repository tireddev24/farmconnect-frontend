import { Box } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/sidebars/sidebar";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";

export const Root = () => {
  const navigate = useNavigate()

  useEffect(() => {

    if (window.location.pathname === "/") {
      navigate("dashboard")
    }
  }, [navigate])

  return (
    <Box
      rounded={"md"}
      alignContent={"flex-start"}
      color={{ base: "black", _dark: "white" }}
      bg={{ base: "#f8fafb", _dark: "black" }}
      minW={"lg"}
    >
      {/* Sidebar */}
      <Sidebar />
      <Toaster />

      {/* Main content */}
      <Box
        ml={16}
        minH={"dvh"}
        bg={{ base: "f8fafb", _dark: "black" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
