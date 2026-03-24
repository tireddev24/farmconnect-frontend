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
import Unexpected from "error/unexpected";
import { formatDate } from "helpers/function";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useAdminStore } from "store/store";

const SystemLogs = () => {
  const { logs, fetchLogs } = useAdminStore();

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const data = async () => {
      try {
        await fetchLogs();
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, []);

  if (error) {
    return <Unexpected error={error} />;
  }

  if (loading) {
    return <Loader />;
  }

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
                {logs.map((log: Log) => (
                  <LogLine log={log} />
                ))}
              </VStack>
            </Box>
          </Box>
        </Container>
      </Box>
    </Flex>
  );
};

interface Log {
  type: string;
  message: string;
  userId: string;
  action: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

const LogLine = ({ log }: { log: Log }) => {
  // Define colors based on log type
  const colors: Record<string, string> = {
    INFO: "gray.400",
    AUTH: "blue.500",
    TRANS: "gray.500",
    WARN: "orange.400",
  };

  return (
    <HStack spaceX={4} align="flex-start">
      <Text color={colors[log.type]} fontWeight="bold" minW="60px">
        [{log.type}]
      </Text>
      <Text>{log.userId}</Text>
      <Text>{log.ipAddress}</Text>
      <Text>{log.userAgent}</Text>
      <Text>{formatDate(log.timestamp)}</Text>
    </HStack>
  );
};

export default SystemLogs;
