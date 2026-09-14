import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Circle,
  Table,
  TableBody,

} from "@chakra-ui/react";
import { Check, FileWarning, ShoppingBag } from "lucide-react";
import AvatarCard from "../../components/ui/avatar";
import { useEffect, useState } from "react";
import { useFarmerStore } from "store/store";
import { formatDate } from "@/lib/helpers";
import Unexpected from "@/components/ui/error/unexpected";
import { MetricCard, OrderRow } from "./farmercomps";
import Spin from "@/components/ui/spinner";
import { AreaChart } from "@/components/chart";


export default function FarmerDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const orders = useFarmerStore((state) => state.orders)
  const fetchOrders = useFarmerStore((state) => state.fetchOrders)
  const products = useFarmerStore((state) => state.products)
  const fetchProducts = useFarmerStore((state) => state.fetchProducts)

  useEffect(() => {
    const data = async () => {
      try {
        await fetchOrders();
        await fetchProducts();
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, [fetchOrders, fetchProducts]);

  if (error) {
    return <Unexpected error={error} />;
  }

  if (loading) {
    return <Spin h="100dvh" />;
  }

  const getTotalAmount = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  // const getSalesFocus = useMemo(() => {
  //   return orders.reduce((acc, order) => {
  //     acc[order.product?.categoryId] = (acc[order.product?.categoryId] || 0) + order.totalAmount;
  //     return acc;
  //   }, {} as Record<string, number>);
  // }, [orders]);


  return (
    <Flex minH="100vh" >
      {/* Sidebar */}
      {/* Main Content */}
      <Box flex={1} p={8} overflowY="auto">
        {/* Top Header */}
        <Flex justify="space-between" align="center" mb={10}>
          <Flex direction={"column"}>

            <Heading
              size="md"
              color={{ base: "green.500", _dark: "yellow.600" }}
            >
              FARMER DASHBOARD
            </Heading>
            <Text fontSize="xs" color="gray.500">
              Store overview and analytics
            </Text>
          </Flex>


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
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={4}>

          <MetricCard
            label="Product Count"
            value={products.length}
            change="+17%"
            icon={ShoppingBag}
            color="purple"
          />

          <MetricCard
            label="Pending Orders"
            value={
              orders.filter(
                (o) => o.status.toLowerCase() == "pending",
              ).length
            }
            change="+37%"
            icon={FileWarning}
            color="orange"
          />
          <MetricCard
            label="Accepted Orders"
            value={
              orders.filter(
                (o) => o.status.toLowerCase() == "accepted",
              ).length
            }
            change="+23%"
            icon={Check}
            color="cyan"
          />
        </SimpleGrid>

        {/* Charts Section */}
        <SimpleGrid display={"block"} columns={3} spaceX={6} mb={8}>
          {/* Revenue Area Chart */}
          <Box gridColumn="span 2" p={6} rounded="2xl" shadow="sm">
            <Flex justify="space-between" mb={6}>
              <Box>
                <Heading size="sm">
                  Revenue

                </Heading>
                <Text fontSize="3xl" fontWeight="800" color="green.500">
                  ₦{getTotalAmount.toFixed(2)}

                </Text>
              </Box>
              <HStack spaceX={2}>
                <HStack spaceX={1}>
                  <Circle size="2" bg="green.600" />
                  <Text fontSize="xs" color="gray.500">
                    Income
                  </Text>
                </HStack>
                <HStack spaceX={1}>
                  <Circle size="2" bg="red.500" />
                  <Text fontSize="xs" color="gray.500">
                    Expenses
                  </Text>
                </HStack>
              </HStack>
            </Flex>

            {/* Sales Focus Doughnut */}
            <Box p={2} rounded="lg" shadow="sm">
              <Heading size="md" textAlign={"center"}>
                Products Distribution
              </Heading>
              <Box>
                <AreaChart data={products} />
              </Box>
            </Box>
          </Box>
        </SimpleGrid>

        {/* Bottom Section: Recent Orders & Delivery */}
        <SimpleGrid columns={3} spaceX={6}>
          <Box
            gridColumn="span 4"
            minH={"70dvh"}
            p={6}
            rounded="2xl"
            shadow="sm"
          >
            <Heading size="sm" mb={6}>
              Recent Orders

            </Heading>
            <Table.Root size="sm" >
              <Table.Header>
                <Table.Row>

                  <Table.ColumnHeader>
                    Invoice
                  </Table.ColumnHeader>
                  <Table.ColumnHeader>
                    Customer
                  </Table.ColumnHeader>
                  <Table.ColumnHeader>
                    Purchase On
                  </Table.ColumnHeader>
                  <Table.ColumnHeader>Amount</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>

                </Table.Row>
              </Table.Header>
              <TableBody>
                {orders.map((order) => (
                  <OrderRow
                    id={order.orderNumber}
                    name={order.buyerName}
                    date={formatDate(order.createdAt)}
                    amount={order.totalAmount}
                    status={order.status}
                  />
                ))}
              </TableBody>
            </Table.Root>
          </Box>

          <Box
            display={"none"}
            bg="white"
            p={6}
            h={"20dvh"}
            rounded="2xl"
            shadow="sm"
          >
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
