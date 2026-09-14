import { Box, Flex, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { Users, UserCheck } from "lucide-react";

import AlertItem from "components/alertitem";
import StatCard from "components/statcard";
import { useEffect, useState } from "react";
import { ColorModeButton } from "components/ui/color-mode";
import { useAdminStore } from "store/store";
import Spin from "components/ui/spinner";
import Unexpected from "@/components/ui/error/unexpected";
import { PieChartComp } from "components/chart";


const AdminDashboard = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const users = useAdminStore((state) => state.users)
  const orders = useAdminStore((state) => state.orders);

  const fetchUsers = useAdminStore((state) => state.fetchUsers)
  const fetchOrders = useAdminStore((state) => state.fetchOrders);


  useEffect(() => {
    const data = async () => {
      try {
        await fetchUsers();
        await fetchOrders();
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, [fetchUsers, fetchOrders]);

  if (loading) {
    return <Spin h="100dvh" />;
  }

  if (error) {
    return <Unexpected error={error} />;
  }

  return (
    <Flex minH="100vh">

      {/* --- Main Content --- */}
      <Box flex={1} p={10}>
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="xl">Dashboard Overview</Heading>
            <Text color="gray.500" fontSize="sm">
              System Information
            </Text>
          </Box>
          <ColorModeButton />
        </Flex>

        {/* Metric Cards */}
        <SimpleGrid columns={2} spaceX={6} mb={8}>
          <StatCard
            label="Total Users"
            value={users.length.toString()}
            icon={Users}
            iconColor="blue.500"
            iconBg="blue.50"
          />

          <StatCard
            label="Pending Approvals"
            value={
              orders.filter(
                (p) => p.status.toLowerCase() === "pending",
              ).length.toString()
            }
            icon={UserCheck}
            iconColor="orange.500"
            iconBg="orange.50"
          />
          {/* <StatCard
            label="Security Flags"
            value="0"
            icon={AlertTriangle}
            iconColor="red.500"
            iconBg="red.50"
          /> */}
        </SimpleGrid>

        <SimpleGrid columns={1} spaceX={8}>
          {/* User Distribution Chart */}
          <Box
            bg={{ base: "white", _dark: "gray.800" }}
            p={8}
            rounded="3xl"
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
          >
            <Heading size="md" mb={6}>
              User Distribution
            </Heading>
            <Box>
              <PieChartComp users={users} />
            </Box>
          </Box>

          {/* System Alerts */}
          <Box
            bg={{ base: "white", _dark: "gray.800" }}
            p={8}
            display={"none"}
            rounded="3xl"
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
          >
            <Heading size="md" mb={6}>
              System Alerts
            </Heading>
            <VStack align="stretch">
              <AlertItem
                type="warning"
                title="High Transaction Volume Detected"
                desc="User ID #8821 doing unusually high trades."
                time="2m ago"
              />
              <AlertItem
                type="info"
                title="New Logistics Partner Signup"
                desc="Review required for 'Speedy Delivery Co.'"
                time="1h ago"
              />
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default AdminDashboard;
