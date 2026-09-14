import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Circle,
  Button,
  Separator,
} from "@chakra-ui/react";
import {
  LayoutDashboard,
  Users,
  Notebook,
  VerifiedIcon,
  Wheat,
  ScrollText,
} from "lucide-react";
import SidebarItem from "./sidebaritem";
import { useAuth } from "../../context/AuthContext";
import { useLogout } from "@/hooks/useAuthHooks"
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const { user } = useAuth();

  const navigate = useNavigate()

  const { logout } = useLogout()
  const handleLogout = async () => {

    const { success } = await logout()

    if (success) {
      return navigate("/login")
    }
  }
  return (
    <VStack
      borderRight="1px solid"
      borderColor="gray.600"
      p={6}
      minH={'100dvh'}
      justifyContent={"space-between"}

    >
      <HStack mb={4} spaceX={3}>
        <Box
          bgGradient={"to-r"}
          gradientFrom={{ base: "green.600/90", _dark: "#c9a962" }}
          gradientTo={{ base: "green.600/80", _dark: "#8a7557" }}
          className=" w-10 h-10 rounded-xl  flex items-center justify-center"
          color={{ base: "white", _dark: "#0a0a0a" }}

        >
          <Wheat className="w-5 h-5 " />
        </Box>
        <Heading size="sm" letterSpacing="tight">
          ADMIN PANEL
        </Heading>
      </HStack>

      <VStack align="stretch" mb={"auto"} >
        <SidebarItem
          icon={LayoutDashboard}
          label="Dashboard"
          link="dashboard"
        />
        <SidebarItem
          icon={Users}
          label="User Management"
          link="usermanagement"
        // badge="3"
        />
        <SidebarItem icon={Notebook} label="Product Details" link="products" />
        <SidebarItem
          icon={VerifiedIcon}
          label="Order Verification"
          link="orders"
        />
        {/* <SidebarItem icon={Ticket} label="Support Tickets" link="support" /> */}
        <SidebarItem icon={ScrollText} label="System Logs" link="logs" />
      </VStack>

      <Box>
        <Separator mb={6} />
        <Flex align="center" gap={3} mb={4}>
          <Circle size="10" bg="gray.100">
            <Icon as={Users} fontSize={18} color="gray.500" />
          </Circle>
          <Box>
            <Text fontSize="sm" fontWeight="bold" textTransform={"capitalize"}>
              {user?.firstName + " " + user?.lastName}
            </Text>
          </Box>
        </Flex>
        <Button
          variant="outline"
          w="full"
          colorPalette="red"
          size="sm"
          rounded="lg"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </VStack>
  );
};

export default AdminSidebar;
