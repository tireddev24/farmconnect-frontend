import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Icon,
  SimpleGrid,
  Circle,
  Center,
} from "@chakra-ui/react";
import { Users, Sun, Banknote, UserCheck, AlertTriangle } from "lucide-react";

import AlertItem from "../../components/alertitem";
import StatCard from "../../components/statcard";

const AdminDashboard = () => {
  // Chart Data
  //   const chartData = [
  //     { name: "Farmers", value: 400, color: "#10a37f" },
  //     { name: "Buyers", value: 300, color: "#f59e0b" },
  //     { name: "Logistics", value: 300, color: "#2563eb" },
  //   ];

  return (
    <Flex minH="100vh" bg="#f8fafb">
      {/* --- Main Content --- */}
      <Box flex={1} p={10}>
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="lg">Dashboard Overview</Heading>
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
            <Icon as={Sun} fontSize={18} color="gray.400" />
          </Circle>
        </Flex>

        {/* Metric Cards */}
        <SimpleGrid columns={4} spaceX={6} mb={8}>
          <StatCard
            label="Total Users"
            value="12,450"
            icon={Users}
            iconColor="blue.500"
            iconBg="blue.50"
          />
          <StatCard
            label="Total Revenue"
            value="₦45.2M"
            icon={Banknote}
            iconColor="green.500"
            iconBg="green.50"
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
            bg="white"
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
            bg="white"
            p={8}
            rounded="3xl"
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
          >
            <Heading size="md" mb={6}>
              System Alerts
            </Heading>
            <VStack align="stretch" spaceX={4}>
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
