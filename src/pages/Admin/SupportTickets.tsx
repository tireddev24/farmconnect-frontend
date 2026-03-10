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
  Center,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import {
  LayoutDashboard,
  Users,
  Ticket,
  ScrollText,
  LogOut,
  Sun,
} from "lucide-react";

const SupportTickets = () => {
  return (
    <Flex minH="100vh" bg="#f8fafb">
      {/* --- Sidebar (Consistent across Admin Panel) --- */}
      <VStack
        w="280px"
        bg="white"
        borderRight="1px solid"
        borderColor="gray.100"
        p={6}
        align="stretch"
      >
        <HStack mb={10} spacing={3}>
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

        <VStack align="stretch" spacing={2} flex={1}>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem icon={Users} label="User Management" badge="3" />
          <SidebarItem icon={Ticket} label="Support Tickets" active />
          <SidebarItem icon={ScrollText} label="System Logs" />
        </VStack>

        <Box>
          <Separator mb={6} />
          <Flex align="center" gap={3} mb={4}>
            <Circle size="10" bg="gray.100">
              <Icon as={Users} size={18} color="gray.500" />
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
            rounded="xl"
            border="1px solid"
            borderColor="red.100"
            _hover={{ bg: "red.50" }}
            leftIcon={<LogOut size={16} />}
          >
            Logout
          </Button>
        </Box>
      </VStack>

      {/* --- Main Content Area --- */}
      <Box flex={1} p={10}>
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="lg">Support Tickets</Heading>
            <Text color="gray.500" fontSize="sm">
              System status and key metrics.
            </Text>
          </Box>
          <Circle
            size="10"
            bg="white"
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
          >
            <Icon as={Sun} size={18} color="gray.400" />
          </Circle>
        </Flex>

        {/* --- Tickets Card --- */}
        <Box
          bg="white"
          p={10}
          rounded="3xl"
          shadow="sm"
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading size="md" mb={8} color="gray.800">
            Support Tickets
          </Heading>

          <Stack spacing={4}>
            <TicketItem
              title="Payment failed but deducted"
              from="Buyer Sarah"
              id="T-992"
              actionLabel="Resolve"
            />
            <TicketItem
              title="Cannot update stock count"
              from="Farmer John"
              id="T-993"
              actionLabel="Archive"
            />
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

// --- Helper Components ---

const SidebarItem = ({ icon, label, active = false, badge }: any) => (
  <HStack
    px={4}
    py={3}
    bg={active ? "emerald.50" : "transparent"}
    color={active ? "#10a37f" : "gray.600"}
    rounded="xl"
    cursor="pointer"
    _hover={{ bg: "emerald.50", color: "#10a37f" }}
  >
    <Icon as={icon} size={20} />
    <Text fontWeight="bold" fontSize="sm">
      {label}
    </Text>
    {badge && (
      <Circle size="5" bg="red.500" color="white" fontSize="xs" ml="auto">
        {badge}
      </Circle>
    )}
  </HStack>
);

const TicketItem = ({
  title,
  from,
  id,
  actionLabel,
}: {
  title: string;
  from: string;
  id: string;
  actionLabel: string;
}) => (
  <Flex
    p={6}
    rounded="2xl"
    border="1px solid"
    borderColor="gray.50"
    align="center"
    transition="0.2s"
    _hover={{ borderColor: "gray.200", shadow: "sm" }}
  >
    <Box>
      <Text fontWeight="bold" color="gray.800" fontSize="md">
        {title}
      </Text>
      <Text fontSize="xs" color="gray.400">
        From: {from} • ID: {id}
      </Text>
    </Box>
    <Spacer />
    <Button
      variant="outline"
      size="sm"
      px={6}
      rounded="xl"
      fontSize="xs"
      color="gray.600"
      borderColor="gray.200"
      _hover={{ bg: "gray.50" }}
    >
      {actionLabel}
    </Button>
  </Flex>
);

export default SupportTickets;
