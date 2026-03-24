import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Circle,
  Container,
} from "@chakra-ui/react";

const SystemLogs = () => {
  return (
    <Flex minH="100vh" bg="#f8fafb">
      {/* --- Main Content --- */}
      <Box flex={1} p={10}>
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="lg">System Logs</Heading>
            <Text color="gray.500" fontSize="sm">
              System status and key metrics.
            </Text>
          </Box>
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
              <HStack spaceX={2}>
                <Circle size="3" bg="orange.400" />
                <Circle size="3" bg="yellow.400" />
                <Circle size="3" bg="emerald.400" />
              </HStack>
            </Flex>

            {/* Log Content Area */}
            <Box p={8} fontFamily="monospace" fontSize="sm">
              <VStack align="stretch" spaceX={2}>
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

const LogLine = ({ type, message }: { type: string; message: string }) => {
  // Define colors based on log type
  const colors: Record<string, string> = {
    INFO: "gray.400",
    AUTH: "blue.500",
    TRANS: "gray.500",
    WARN: "orange.400",
  };

  return (
    <HStack spaceX={4} align="flex-start">
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
