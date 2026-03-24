import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Circle,
  Input,
  InputGroup,
  Table,
  TableBody,
  Loader,
  Center,
} from "@chakra-ui/react";
import { Banknote, Eye, ShoppingBag, UserPlus } from "lucide-react";
import AvatarCard from "../../components/avatar";
import { useEffect, useState } from "react";
import { useFarmerStore } from "store/store";
import type { FarmerOrders } from "types/types";
import { formatDate } from "helpers/function";
import Unexpected from "error/unexpected";
import { LegendItem, MetricCard, OrderRow } from "./farmercomps";

export default function FarmerDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { orders, fetchOrders } = useFarmerStore();

  useEffect(() => {
    const data = async () => {
      try {
        await fetchOrders();
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
    <Flex minH="100vh" bg={{ base: "#f8fafb", _dark: "black" }}>
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

            {/* Sales Focus Doughnut */}
            <Box bg="white" p={6} rounded="2xl" shadow="sm">
              <Heading size="sm" mb={1}>
                Sales Focus
                <Text as="span" color="gray.400" fontWeight="normal">
                  This Month
                </Text>
              </Heading>
              <Box h="300px" position="relative">
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
          </Box>
        </SimpleGrid>

        {/* Bottom Section: Recent Orders & Delivery */}
        <SimpleGrid columns={3} spaceX={6}>
          <Box
            gridColumn="span 2"
            minH={"70dvh"}
            bg="white"
            p={6}
            rounded="2xl"
            shadow="sm"
          >
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
                    amount={order.totalAmount}
                    status={order.status}
                    tracking={order.delivery.trackingCode}
                  />
                ))}
              </TableBody>
            </Table.Root>
          </Box>

          <Box bg="white" p={6} h={"20dvh"} rounded="2xl" shadow="sm">
            <Heading size="sm" mb={6}>
              Delivery
              <Text
                as="span"
                ml={6}
                color="gray.400"
                fontWeight="normal"
              ></Text>
            </Heading>
            <VStack align="stretch">
              <Box mx={"auto"}>No deliveries at the moment.</Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
