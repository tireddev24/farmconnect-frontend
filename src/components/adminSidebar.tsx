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
import { LayoutDashboard, Users, Ticket, ScrollText } from "lucide-react";
import SidebarItem from "./sidebaritem";

const AdminSidebar = () => {
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
        <Center bg="#10a37f" p={2} rounded="lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"
              fill="white"
            />
          </svg>
        </Center>
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
            <Text fontSize="sm" fontWeight="bold">
              Admin
            </Text>
            <Text fontSize="xs" color="gray.500">
              Super User
            </Text>
          </Box>
        </Flex>
        <Button
          variant="outline"
          w="full"
          colorScheme="red"
          size="sm"
          rounded="lg"
        >
          Logout
        </Button>
      </Box>
    </VStack>
  );
};

export default AdminSidebar;
