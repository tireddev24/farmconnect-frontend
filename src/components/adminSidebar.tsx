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
  Center,
  Separator,
} from "@chakra-ui/react";
import {
  LayoutDashboard,
  Users,
  Ticket,
  ScrollText,
  Wheat,
} from "lucide-react";
import SidebarItem from "./sidebaritem";
import { useAuth } from "../context/AuthContext";

const AdminSidebar = () => {
  const { logout, user } = useAuth();
  return (
    <VStack
      //   w="280px"
      flex={1}
      bg={{ base: "white", _dark: "#141414" }}
      borderRight="1px solid"
      borderColor="gray.100"
      p={6}
      minH={"dvh"}
      align="stretch"
    >
      <HStack mb={10} spaceX={3}>
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
        <Heading size="sm" letterSpacing="tight">
          ADMIN PANEL
        </Heading>
      </HStack>

      <VStack align="stretch" spaceX={2} flex={1}>
        <SidebarItem
          icon={LayoutDashboard}
          label="Dashboard"
          link="dashboard"
        />
        <SidebarItem
          icon={Users}
          label="User Management"
          link="usermanagement"
          badge="3"
        />
        <SidebarItem icon={Ticket} label="Support Tickets" link="support" />
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
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </VStack>
  );
};

export default AdminSidebar;
