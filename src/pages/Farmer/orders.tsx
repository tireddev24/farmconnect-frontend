import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  Table,
  TableBody,
  Center,
  Badge,
  Circle,
} from "@chakra-ui/react";
import { Truck, Box as BoxIcon, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/productTypes";

export default function FarmerOrders() {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      display={"flex"}
      flex={1}
      //   w={"full"}
      color={{ base: "black", _dark: "white" }}
    >
      <Box
        display={"flex"}
        flexDir={"row"}
        flex={1}
        justifyContent={"center"}
        mx={"auto"}
      >
        <Box display={"flex"} flexDir={"column"} gap={10} mt={10}>
          <HStack
            minW={"5xl"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            className=" font-sans "
          >
            <Box>
              <Heading size="xl" mb={1}>
                Order Management
              </Heading>
              <Text color="gray.500" fontSize="sm">
                Track outbound shipments and manage your listings.
              </Text>
            </Box>
            <HStack spaceX={4}>
              <Box>
                <Button
                  mr={4}
                  colorPalette={"gray"}
                  variant={"outline"}
                  disabled
                >
                  Support
                </Button>
                <Button
                  p={2}
                  onClick={() => navigate("../market")}
                  bg={{ base: "green.600", _dark: "#8a7557" }}
                >
                  List New Product
                </Button>
              </Box>
            </HStack>
          </HStack>{" "}
          {/* Active Deliveries Section */}
          <VStack align="stretch" spaceX={6} mb={12}>
            <HStack alignSelf={"flex-start"}>
              <Text
                fontWeight={"bold"}
                fontSize={20}
                color={{ base: "green.600", _dark: "yellow.400/80" }}
              >
                <Truck />
              </Text>
              <Text
                color={{ base: "green.600", _dark: "yellow.400/80" }}
                fontSize={18}
                fontWeight={"semibold"}
              >
                Outbound Shipments (2)
              </Text>
            </HStack>

            {orders.map((o) => (
              <OrderCard order={o} />
            ))}
          </VStack>
          {/* History Section */}
          <VStack align="stretch" spaceX={6}>
            <HStack color="gray.400">
              <Icon as={ExternalLink} />
              <Heading
                size="sm"
                textTransform="uppercase"
                letterSpacing="widest"
              >
                History
              </Heading>
            </HStack>

            <Box
              bg="#111"
              rounded="2xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              overflow="hidden"
            >
              <Table.Root size="lg">
                <Table.Header
                  borderBottom="1px solid"
                  borderColor="whiteAlpha.100"
                >
                  <Table.Row>
                    <Table.Cell color="gray.600" fontSize="xs">
                      ORDER ID
                    </Table.Cell>
                    <Table.Cell color="gray.600" fontSize="xs">
                      ITEMS
                    </Table.Cell>
                    <Table.Cell color="gray.600" fontSize="xs">
                      DATE
                    </Table.Cell>
                    <Table.Cell color="gray.600" fontSize="xs">
                      AMOUNT
                    </Table.Cell>
                    <Table.Cell color="gray.600" fontSize="xs">
                      STATUS
                    </Table.Cell>
                    <Table.Cell color="gray.600" fontSize="xs">
                      ACTION
                    </Table.Cell>
                  </Table.Row>
                </Table.Header>
                <TableBody>
                  <HistoryRow
                    id="#FC-10023"
                    item="25L Palm Oil (Red)"
                    date="Jan 28, 2026"
                    amount="₦35,000"
                    status="Delivered"
                  />
                  <HistoryRow
                    id="#FC-09921"
                    item="100kg Yellow Maize"
                    date="Dec 15, 2025"
                    amount="₦125,000"
                    status="Delivered"
                  />
                  <HistoryRow
                    id="#FC-08810"
                    item="Sample: Yam Tubers"
                    date="Nov 02, 2025"
                    amount="₦5,000"
                    status="Cancelled"
                  />
                </TableBody>
              </Table.Root>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

const HistoryRow = ({ id, item, date, amount, status }: any) => {
  const isCancelled = status === "Cancelled";
  return (
    <Table.Row
      borderBottom="1px solid"
      borderColor="whiteAlpha.50"
      _last={{ border: 0 }}
    >
      <Table.Cell color="gray.500" fontSize="sm">
        {id}
      </Table.Cell>
      <Table.Cell fontWeight="bold" fontSize="sm">
        {item}
      </Table.Cell>
      <Table.Cell color="gray.500" fontSize="sm">
        {date}
      </Table.Cell>
      <Table.Cell fontWeight="bold" fontSize="sm">
        {amount}
      </Table.Cell>
      <Table.Cell>
        <Badge
          bg={isCancelled ? "red.900" : "green.900"}
          color={isCancelled ? "red.200" : "green.200"}
          px={3}
          rounded="full"
          textTransform="none"
        >
          {status}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <Text
          color="orange.200"
          fontSize="sm"
          cursor="pointer"
          fontWeight="bold"
        >
          View
        </Text>
      </Table.Cell>
    </Table.Row>
  );
};

const orders: Product[] = [
  {
    id: "1",
    orderId: "#JRJ241",
    name: "Premium Cocoa",
    unit: "per kg",
    category: "grains",
    price: 4500,
    stock: 120,
    trend: "up",
    icon: "🍫",
    seller: " Farmer John",
    buyer: " Buyer Sarah",
  },
  {
    id: "2",
    orderId: "#JRJ241",
    name: "Premium Cocoa",
    unit: "per kg",
    category: "grains",
    price: 4500,
    stock: 120,
    trend: "up",
    icon: "🍫",
    seller: " Farmer John",
    buyer: " Buyer Sarah",
  },
];

const OrderCard = ({ order }: { order: Product }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={2}
      bg={"whiteAlpha.300/50"}
      p={4}
      //   border={"1px solid"}
      boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1)"
      borderColor={{ base: "", _dark: "#8a7557/40" }}
      py={6}
      rounded={"xl"}
    >
      <Box
        bg={{ base: "gray.200", _dark: "#252525" }}
        fontSize={"2xl"}
        className="w-16 h-16 rounded-2xl  flex items-center justify-center text-2xl"
      >
        {order.icon}
      </Box>
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"flex-start"}
        mr={"auto "}
      >
        <Text fontSize={18} fontWeight={"bold"}>
          {order.name}
        </Text>
        <Text fontSize={14}>
          Buyer: {order.buyer} Lagos {/*location */}{" "}
        </Text>
        <Text
          fontSize={12}
          color={{ base: "gray.400", _dark: "gray.500" }}
          fontWeight={"bold"}
        >
          Order {order.orderId}
        </Text>
      </Box>
      <Box>
        <Text>Order Range Slider</Text>
      </Box>
    </Box>
  );
};
