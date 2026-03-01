import { Box, Button, VStack } from "@chakra-ui/react";
import {
  Wheat,
  Home,
  TrendingUp,
  ClipboardList,
  User,
  Settings,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ColorModeButton } from "./ui/color-mode";
import { useAuth } from "../context/AuthContext";
import { Logout } from "./ui/icons";

export const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <Box bg={{ base: "white", _dark: "#141414" }} zIndex={"30"}>
      <Box
        position={"fixed"}
        px={1}
        pt={6}
        borderRight={"1px solid"}
        borderColor={"gray.400/30"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        gap={4}
        minH={"dvh"}
      >
        <Box
          bgGradient={"to-r"}
          gradientFrom={{ base: "green.600/90", _dark: "#c9a962" }}
          gradientTo={{ base: "green.600/80", _dark: "#8a7557" }}
          className=" w-10 h-10 rounded-xl  flex items-center justify-center"
          color={{ base: "white", _dark: "#0a0a0a" }}
          // mb={4}
        >
          <Wheat className="w-5 h-5 " />
        </Box>

        <NavItem link="dashboard" icon={<Home />} />

        <NavItem link="market" icon={<TrendingUp />} />
        <NavItem link="orders" icon={<ClipboardList />} />
        <NavItem link="profile" icon={<User />} />

        <VStack bg={"none"} mt={"auto"} gap={4} mb={4}>
          <ColorModeButton />
          <Button
            color={{ base: "green.600", _dark: "yellow.600" }}
            bg={"none"}
          >
            <Settings />
          </Button>
          <Button
            onClick={logout}
            color={{ base: "red.600", _dark: "red.400" }}
            bg={"none"}
          >
            <Logout />
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

const NavItem = ({
  icon,
  active = false,
  link,
}: {
  icon: React.ReactNode;
  active?: boolean;
  link: string;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  if (path.includes(link)) {
    active = true;
  }

  return (
    <Button
      width={"12"}
      height={"12"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      _hover={{
        bg: {
          base: active ? "" : "gray.100/90",
          _dark: active ? "" : "#8a7557/30",
        },
        borderLeft: "2px solid",
        borderLeftColor: { base: "green", _dark: "#8a7557" },
        color: { base: "green.600", _dark: "yellow.500/70" },
      }}
      color={{
        base: active ? "green.600" : "gray.500",
        _dark: active ? "yellow.500/70" : "gray.500",
      }}
      bg={{
        base: active ? "white" : "gray.100/90",
        _dark: active ? "#8a7557/20" : "none",
      }}
      border={"2px solid transparent"}
      borderLeft={active ? "2px solid" : "none"}
      borderLeftColor={{ base: "green.600", _dark: "#8a7557" }}
      rounded={"lg"}
      onClick={() => navigate(`../${link}`)}
      // ${active ? "bg-[#a38d6d]/10 text-[#c9a962]" : "text-gray-500 hover:bg-[#252525] hover:text-[#c9a962]"}`}
    >
      {icon}
    </Button>
  );
};
