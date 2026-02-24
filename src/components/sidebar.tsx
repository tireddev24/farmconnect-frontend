import { Box, Button } from "@chakra-ui/react";
import {
  Wheat,
  Home,
  TrendingUp,
  ClipboardList,
  User,
  Settings,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  return (
    <Box bg={"#141414"} zIndex={"30"}>
      <Box
        position={"fixed"}
        top={0}
        pt={4}
        className=" lg:flex w-14 flex-col items-center py-6 bg-[#141414] border-r border-[#252525]  min-h-screen "
      >
        <div className=" w-10 h-10 rounded-xl bg-linear-to-br from-[#c9a962] to-[#8a7557] flex items-center justify-center">
          <Wheat className="w-5 h-5 text-[#0a0a0a]" />
        </div>
        <Box
          marginTop={"4"}
          flex={1}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Box px={3} mt={4} className="flex flex-col gap-4  *:cursor-pointer ">
            <NavItem link="dashboard" icon={<Home />} />

            <NavItem link="market" icon={<TrendingUp />} />
            <NavItem link="orders" icon={<ClipboardList />} />
            <NavItem link="profile" icon={<User />} />
          </Box>
        </Box>
        <Box>
          <button className="p-3 text-gray-500 hover:text-[#c9a962] transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </Box>
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
      _hover={{ bg: active ? "" : "#252525" }}
      bg={active ? "#a38d6d" : ""}
      onClick={() => navigate(`../${link}`)}
      // ${active ? "bg-[#a38d6d]/10 text-[#c9a962]" : "text-gray-500 hover:bg-[#252525] hover:text-[#c9a962]"}`}
    >
      {icon}
    </Button>
  );
};
