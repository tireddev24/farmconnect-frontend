import { Box } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/sidebars/adminSidebar";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";



export const Root = () => {


  const navigate = useNavigate()

  useEffect(() => {

    if (window.location.pathname === "/admin") {
      navigate("dashboard")
    }
  }, [navigate])

  return (
    <Box
      rounded={"md"}
      display={"flex"}
      minH={"dvh"}
    >
      <Toaster />
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <Box minH={"dvh"} w={"full"} bg={{ base: "#f8fafb", _dark: "black" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
