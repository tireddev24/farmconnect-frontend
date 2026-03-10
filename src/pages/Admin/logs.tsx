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
  Container,
} from "@chakra-ui/react";
import {
  LayoutDashboard,
  Users,
  Ticket,
  ScrollText,
  LogOut,
  Sun,
} from "lucide-react";

const SystemLogs = () => {
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
          <SidebarItem icon={Ticket} label="Support Tickets" />
          <SidebarItem icon={ScrollText} label="System Logs" active />
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
            rounded="lg"
            leftIcon={<LogOut size={16} />}
          >
            Logout
          </Button>
        </Box>
      </VStack>

      {/* --- Main Content --- */}
      <Box flex={1} p={10}>
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="lg">System Logs</Heading>
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

        {/* --- Terminal Container --- */}
        <Container maxW="full" p={0}>
          <Box
            bg="white"
            rounded="3xl"
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
            overflow="hidden"
            minH="600px"
          >
            {/* Terminal Header */}
            <Flex
              px={6}
              py={4}
              bg="white"
              borderBottom="1px solid"
              borderColor="gray.50"
              align="center"
              justify="space-between"
            >
              <Text
                fontSize="xs"
                fontWeight="bold"
                color="emerald.500"
                letterSpacing="widest"
              >
                SYSTEM_KERNEL_LOGS
              </Text>
              <HStack spacing={2}>
                <Circle size="3" bg="orange.400" />
                <Circle size="3" bg="yellow.400" />
                <Circle size="3" bg="emerald.400" />
              </HStack>
            </Flex>

            {/* Log Content Area */}
            <Box p={8} fontFamily="monospace" fontSize="sm">
              <VStack align="stretch" spacing={2}>
                <LogLine
                  type="INFO"
                  message="System boot sequence initiated..."
                />
                <LogLine
                  type="INFO"
                  message="Database connection established (Latency: 24ms)"
                />
                <LogLine
                  type="AUTH"
                  message="User 'Farmer John' logged in from 192.168.1.45"
                />
                <LogLine
                  type="TRANS"
                  message="Payment ID #99023 processed successfully"
                />
                <LogLine
                  type="WARN"
                  message="High latency detected on /api/market-data"
                />
                <LogLine type="AUTH" message="Admin accessed dashboard" />
              </VStack>
            </Box>
          </Box>
        </Container>
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

const LogLine = ({ type, message }: { type: string; message: string }) => {
  // Define colors based on log type
  const colors: Record<string, string> = {
    INFO: "gray.400",
    AUTH: "blue.500",
    TRANS: "gray.500",
    WARN: "orange.400",
  };

  return (
    <HStack spacing={4} align="flex-start">
      <Text color={colors[type]} fontWeight="bold" minW="60px">
        [{type}]
      </Text>
      <Text color={type === "TRANS" ? "gray.800" : colors[type]}>
        {message}
      </Text>
    </HStack>
  );
};

export default SystemLogs;
