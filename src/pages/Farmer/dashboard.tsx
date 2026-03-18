import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  Spacer,
  Circle,
  Button,
  Input,
  InputGroup,
  InputElement,
  Table,
  TableBody,
  Badge,
  Center,
  Loader,
} from "@chakra-ui/react";
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Users,
  Settings,
  Search,
  Banknote,
  Eye,
  ShoppingBag,
  UserPlus,
  LogOut,
  Sun,
  Wheat,
  Droplet,
} from "lucide-react";
import AvatarCard from "../../components/avatar";
import { useEffect, useState } from "react";
import { useFarmerStore } from "store/store";
import type { FarmerOrders, OrderRecord } from "types/types";
import { formatDate } from "helpers/function";
import Unexpected from "error/unexpected";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// Mock Data for Revenue Area Chart
const revenueData = [
  { name: "Jan", income: 40, expenses: 25 },
  { name: "Feb", income: 55, expenses: 35 },
  { name: "Mar", income: 45, expenses: 30 },
  { name: "Apr", income: 75, expenses: 50 },
  { name: "May", income: 80, expenses: 55 },
  { name: "Jun", income: 95, expenses: 65 },
  { name: "Jul", income: 100, expenses: 70 },
  { name: "Aug", income: 85, expenses: 60 },
  { name: "Sep", income: 50, expenses: 35 },
  { name: "Oct", income: 60, expenses: 40 },
];

// Mock Data for Sales Focus Pie Chart
const salesFocusData = [
  { name: "Tubers", value: 45, color: "#10a37f" },
  { name: "Grains", value: 35, color: "#2563eb" },
  { name: "Veg", value: 20, color: "#a855f7" },
];

export default function FarmerDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { orders, fetchOrders, users, fetchUsers } = useFarmerStore();
  const path = location.pathname;

  useEffect(() => {
    const data = async () => {
      try {
        await fetchOrders();
        await fetchUsers();
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
    <Unexpected error={error} />;
  }

  if (loading) {
    <Loader />;
  }

  return (
    <Flex minH="100vh" bg="#f8fafb">
      {/* Sidebar */}
      {/* Main Content */}
      <Box flex={1} p={8} overflowY="auto">
        {/* Top Header */}
        <Flex justify="space-between" align="center" mb={10}>
          <Box>
            <Heading size="md" color="#10a37f">
              FARMER DASHBOARD
            </Heading>
            <Text fontSize="xs" color="gray.500">
              Store overview and analytics
            </Text>
          </Box>
          <InputGroup maxW="500px">
            <>
              <Input
                placeholder="Search orders, products..."
                bg="white"
                border="1px solid"
                borderColor="#10a37f"
                rounded="full"
              />
            </>
          </InputGroup>
          <HStack spaceX={3}>
            <VStack align="end" spaceX={0}>
              <Text fontWeight="bold" fontSize="sm">
                Farmer John
              </Text>
              <Text fontSize="xs" color="gray.500">
                Farmer
              </Text>
            </VStack>
            <AvatarCard size="sm" name="Farmer John" image="" />
          </HStack>
        </Flex>

        {/* Stats Grid */}
        <SimpleGrid display={"none"} columns={4} spaceX={6} mb={8}>
          <MetricCard
            label="Total Sales"
            value="₦2,435,000"
            change="+37%"
            icon={Banknote}
            color="green"
          />
          <MetricCard
            label="Profile Views"
            value="6,547"
            change="+23%"
            icon={Eye}
            color="blue"
          />
          <MetricCard
            label="New Orders"
            value="1,523"
            change="+17%"
            icon={ShoppingBag}
            color="purple"
          />
          <MetricCard
            label="Active Customers"
            value="2,310"
            change="-4%"
            icon={UserPlus}
            color="orange"
          />
        </SimpleGrid>

        {/* Charts Section */}
        <SimpleGrid display={"none"} columns={3} spaceX={6} mb={8}>
          {/* Revenue Area Chart */}
          <Box gridColumn="span 2" bg="white" p={6} rounded="2xl" shadow="sm">
            <Flex justify="space-between" mb={6}>
              <Box>
                <Heading size="sm">
                  Revenue{" "}
                  <Text as="span" color="gray.400" fontWeight="normal">
                    This Year
                  </Text>
                </Heading>
                <Text fontSize="2xl" fontWeight="800" color="#10a37f">
                  ₦18,000,000{" "}
                  <Text as="span" fontSize="xs" color="gray.400">
                    All Time
                  </Text>
                </Text>
              </Box>
              <HStack spaceX={4}>
                <HStack spaceX={1}>
                  <Circle size="2" bg="#10a37f" />
                  <Text fontSize="xs" color="gray.500">
                    Income
                  </Text>
                </HStack>
                <HStack spaceX={1}>
                  <Circle size="2" bg="gray.300" />
                  <Text fontSize="xs" color="gray.500">
                    Expenses
                  </Text>
                </HStack>
              </HStack>
            </Flex>
            <Box h="300px">
              {/* <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="colorIncome"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10a37f" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#10a37f" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#A0AEC0" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#A0AEC0" }}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#10a37f"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorIncome)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#E2E8F0"
                    strokeWidth={3}
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer> */}
            </Box>
          </Box>

          {/* Sales Focus Doughnut */}
          <Box bg="white" p={6} rounded="2xl" shadow="sm">
            <Heading size="sm" mb={1}>
              Sales Focus
              <Text as="span" color="gray.400" fontWeight="normal">
                This Month
              </Text>
            </Heading>
            <Box h="300px" position="relative">
              {/* <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesFocusData}
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {salesFocusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer> */}
              <Center
                position="absolute"
                top="0"
                left="0"
                w="full"
                h="full"
                flexDirection="column"
              >
                <Text fontSize="2xl" fontWeight="800">
                  45%
                </Text>
                <Text fontSize="xs" color="gray.400" fontWeight="bold">
                  TUBERS
                </Text>
              </Center>
            </Box>
            <HStack justify="center" spaceX={8} mt={-4}>
              <LegendItem color="#10a37f" label="Tubers" />
              <LegendItem color="#2563eb" label="Grains" />
              <LegendItem color="#a855f7" label="Veg" />
            </HStack>
          </Box>
        </SimpleGrid>

        {/* Bottom Section: Recent Orders & Delivery */}
        <SimpleGrid columns={3} spaceX={6}>
          <Box gridColumn="span 2" bg="white" p={6} rounded="2xl" shadow="sm">
            <Heading size="sm" mb={6}>
              Recent Orders
              <Text as="span" ml={4} color="gray.400" fontWeight="normal">
                This Week
              </Text>
            </Heading>
            <Table.Root size="sm">
              <Table.Header>
                <Table.ColumnHeader color="gray.400">
                  Invoice
                </Table.ColumnHeader>
                <Table.ColumnHeader color="gray.400">
                  Customer
                </Table.ColumnHeader>
                <Table.ColumnHeader color="gray.400">
                  Purchase On
                </Table.ColumnHeader>
                <Table.ColumnHeader color="gray.400">Amount</Table.ColumnHeader>
                <Table.ColumnHeader color="gray.400">Status</Table.ColumnHeader>
                <Table.ColumnHeader color="gray.400">
                  Tracking
                </Table.ColumnHeader>
              </Table.Header>
              <TableBody>
                {orders.map((order: FarmerOrders) => (
                  <OrderRow
                    id={order.orderNumber}
                    name={order.buyerName}
                    date={formatDate(order.createdAt)}
                    amount={`₦${order.totalAmount}`}
                    status={order.status}
                    tracking={order.delivery.trackingCode}
                  />
                ))}
              </TableBody>
            </Table.Root>
          </Box>

          <Box bg="white" p={6} rounded="2xl" shadow="sm">
            <Heading size="sm" mb={6}>
              Delivery
              <Text as="span" ml={6} color="gray.400" fontWeight="normal">
                In Progress
              </Text>
            </Heading>
            <VStack align="stretch">
              <DeliveryItem
                label="50kg Premium Rice"
                progress={65}
                icon={Wheat}
              />
              <DeliveryItem label="25L Palm Oil" progress={30} icon={Droplet} />
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

// Sub-components
const MetricCard = ({ label, value, change, icon, color }: any) => (
  <Box
    bg="white"
    p={6}
    rounded="2xl"
    shadow="sm"
    border="1px solid"
    borderColor="gray.50"
  >
    <Flex justify="space-between" align="start">
      <VStack align="start" spaceX={1}>
        <Text color="gray.500" fontSize="xs" fontWeight="bold">
          {label}
        </Text>
        <Text fontSize="xl" fontWeight="800">
          {value}
        </Text>
        <HStack spaceX={1}>
          <Text
            fontSize="xs"
            color={change.startsWith("+") ? "green.400" : "red.400"}
            fontWeight="bold"
          >
            {change}
          </Text>
          <Text fontSize="xs" color="gray.400">
            Last Week
          </Text>
        </HStack>
      </VStack>
      <Circle boxSize="10" bg={`${color}.50`}>
        <Icon as={icon} color={`${color}.400`} fontSize={20} />
      </Circle>
    </Flex>
  </Box>
);

const LegendItem = ({ color, label }: any) => (
  <HStack spaceX={2}>
    <Circle size="2" bg={color} />
    <Text fontSize="xs" color="gray.500">
      {label}
    </Text>
  </HStack>
);

const OrderRow = ({ id, name, date, amount, status, tracking }: any) => (
  <Table.Row>
    <Table.Cell fontSize="xs" fontWeight="bold" py={4}>
      {id}
    </Table.Cell>
    <Table.Cell fontSize="xs" color="gray.600">
      {name}
    </Table.Cell>
    <Table.Cell fontSize="xs" color="gray.500">
      {date}
    </Table.Cell>
    <Table.Cell fontSize="xs" fontWeight="bold">
      {amount}
    </Table.Cell>
    <Table.Cell>
      <Badge
        colorScheme={status === "Received" ? "green" : "red"}
        variant="subtle"
        px={2}
        rounded="md"
        textTransform="none"
      >
        {status}
      </Badge>
    </Table.Cell>
    <Table.Cell fontSize="xs" color="gray.400" fontWeight="bold">
      {tracking}
    </Table.Cell>
  </Table.Row>
);

const DeliveryItem = ({ label, progress, icon }: any) => (
  <Box border="1px solid" borderColor="emerald.100" p={4} rounded="xl">
    <HStack mb={3}>
      <Icon as={icon} color="emerald.500" fontSize={16} />
      <Text fontSize="xs" fontWeight="bold">
        {label}
      </Text>
      <Spacer />
      <Text fontSize="xs" fontWeight="bold" color="emerald.500">
        {progress}%
      </Text>
    </HStack>
    {/* <Progresss value={progress} size="xs" colorScheme="emerald" rounded="full" /> */}
  </Box>
);
