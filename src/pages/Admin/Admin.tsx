import { Box, Flex, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { Users, UserCheck, AlertTriangle, Loader } from "lucide-react";

import AlertItem from "components/alertitem";
import StatCard from "components/statcard";
import { useEffect, useState } from "react";
import { ColorModeButton } from "components/ui/color-mode";
import { useAdminStore } from "store/store";

const AdminDashboard = () => {
  // Chart Data
  //   const chartData = [
  //     { name: "Farmers", value: 400, color: "#10a37f" },
  //     { name: "Buyers", value: 300, color: "#f59e0b" },
  //     { name: "Logistics", value: 300, color: "#2563eb" },
  //   ];

  const [load, setLoad] = useState<boolean>(true);

  const { users, fetchUsers } = useAdminStore();

  useEffect(() => {
    const data = async () => {
      try {
        await fetchUsers();
      } catch (error) {
        console.log(error);
        // setError(true);
      } finally {
        setLoad(false);
      }
    };
    data();
  }, []);

  if (load) {
    <Loader />;
  }

  return (
    <Flex minH="100vh">
      {/* --- Main Content --- */}
      <Box flex={1} p={10}>
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="lg">Dashboard Overview</Heading>
            <Text color="gray.500" fontSize="sm">
              System status and key metrics.
            </Text>
          </Box>
          <ColorModeButton />
        </Flex>

        {/* Metric Cards */}
        <SimpleGrid columns={3} spaceX={6} mb={8}>
          <StatCard
            label="Total Users"
            value={users.data.totalCount}
            icon={Users}
            iconColor="blue.500"
            iconBg="blue.50"
          />

          <StatCard
            label="Pending Approvals"
            value="3"
            icon={UserCheck}
            iconColor="orange.500"
            iconBg="orange.50"
          />
          <StatCard
            label="Security Flags"
            value="0"
            icon={AlertTriangle}
            iconColor="red.500"
            iconBg="red.50"
          />
        </SimpleGrid>

        <SimpleGrid columns={2} spaceX={8}>
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
            <Box h="300px">
              {/* <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer> */}
            </Box>
          </Box>

          {/* System Alerts */}
          <Box
            bg={{ base: "white", _dark: "gray.800" }}
            p={8}
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

// --- Helper Components ---

export default AdminDashboard;
