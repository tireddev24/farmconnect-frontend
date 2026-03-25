import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Circle,
  Container,
  Table,
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
            <Box
              w="full"
              h={"90dvh"}
              overflowY={"scroll"}
              fontFamily="monospace"
              fontSize="sm"
            >
              <VStack>
                <Table.Root>
                  <Table.Header>
                    <Table.ColumnHeader>User Action </Table.ColumnHeader>
                    <Table.ColumnHeader>User Id</Table.ColumnHeader>
                    <Table.ColumnHeader>Port</Table.ColumnHeader>
                    <Table.ColumnHeader>User Agent</Table.ColumnHeader>
                    <Table.ColumnHeader w={"max-content"}>
                      Date
                    </Table.ColumnHeader>
                  </Table.Header>
                  <Table.Body>
                    {logs
                      .sort(
                        (log: Log) =>
                          Number(log.timestamp) - Number(log.timestamp),
                      )
                      .map((log: Log) => (
                        <LogLine log={log} />
                      ))}
                  </Table.Body>
                </Table.Root>
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
    <Table.Row>
      <Table.Cell color={colors[log.action]} fontWeight="bold" minW="60px">
        [{log.action}]
      </Table.Cell>
      <Table.Cell>{log.userId}</Table.Cell>
      <Table.Cell>{log.ipAddress}</Table.Cell>
      <Table.Cell>{log.userAgent}</Table.Cell>
      <Table.Cell w={36}>{formatDate(log.timestamp)}</Table.Cell>
    </Table.Row>
  );
};

export default SystemLogs;
