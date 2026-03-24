import { Box } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/adminSidebar";
import { useEffect } from "react";

export const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname == "/admin") {
      navigate("/dashboard");
    }
    //navigate to dashboard on load
  }, []);

  return (
    <Box
      rounded={"md"}
      display={"flex"}
      minH={"dvh"}
      //   alignContent={"flex-start"}
    >
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <Box
        minH={"dvh"}
        w={"full"}
        bg={{ base: "colorPalette.muted/70", _dark: "black" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
