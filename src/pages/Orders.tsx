import { Box, Text, Button, HStack, Table, TableBody } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { History, Truck } from "../components/ui/icons";
import Badge from "../components/ui/badge";

const Orders = () => {
  const navigate = useNavigate();

  return (
    <Box
      display={"flex"}
      flex={1}
      minH={"dvh"}
      // w={"full"}
      color={{ base: "black", _dark: "white" }}
    >
      <Box
        display={"flex"}
        flexDir={"row"}
        // w={"full"}
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
            <div>
              <Text fontSize={24} fontWeight={"bold"}>
                My Orders
              </Text>
              <Text color={"gray.400"} fontSize={14}>
                Track active shipments and review past purchases
              </Text>
            </div>

            <Box>
              <Button mr={4} colorPalette={"gray"} variant={"outline"} disabled>
                Support
              </Button>
              <Button
                p={2}
                onClick={() => navigate("../market")}
                bg={{ base: "green.600", _dark: "#8a7557" }}
              >
                Browse Market
              </Button>
            </Box>
          </HStack>
          <HStack alignSelf={"flex-start"}>
            <Text
              fontWeight={"bold"}
              fontSize={20}
              color={{ base: "green.600", _dark: "yellow.400/80" }}
            >
              <Truck />
            </Text>
            <Text fontSize={18} fontWeight={"semibold"}>
              Active Deliveries (2)
            </Text>
          </HStack>
          {orders.map((o) => (
            <OrderCard order={o} />
          ))}

          <HStack fontWeight={"bold"} alignItems={"center"}>
            <History className="text-2xl text-gray-600" />
            <Text>History</Text>
          </HStack>
          <OrderTable />
        </Box>
      </Box>
    </Box>
  );
};

export default Orders;

interface Product {
  id: string;
  orderId: string;
  name: string;
  unit: string;
  category: "grains" | "legumes" | "tubers" | string; // Expandable union type
  price: number;
  stock: number;
  trend: "up" | "down" | "stable";
  icon: string;
  seller: string;
}

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
      border={"1px solid"}
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
        <Text fontSize={14}>Seller: {order.seller}</Text>
        <Text
          fontSize={12}
          color={{ base: "gray.400", _dark: "gray.500" }}
          fontWeight={"bold"}
        >
          {order.orderId}
        </Text>
      </Box>
      <Box>
        <Text>Order Range Slider</Text>
      </Box>
    </Box>
  );
};

const OrderTable = () => {
  const navigate = useNavigate();
  return (
    <>
      <Table.Root mt={-6} colorPalette={"gray"}>
        <Table.Header
          rounded={"2xl"}
          color={{ base: "black", _dark: "gray.500" }}
          bg={"gray.200"}
          className="uppercase font-bold  "
        >
          <Table.Row
            rounded={"lg"}
            className="uppercase font-bold rounded-3xl text-gray-500"
            bg={{ base: "whiteAlpha.100", _dark: "black/90" }}
            // border={"none"}
            alignContent={"center"}
          >
            <Table.ColumnHeader color={"gray.500"}>order id</Table.ColumnHeader>
            <Table.ColumnHeader color={"gray.500"}>Items</Table.ColumnHeader>
            <Table.ColumnHeader color={"gray.500"}>Date</Table.ColumnHeader>
            <Table.ColumnHeader color={"gray.500"}>Amount</Table.ColumnHeader>
            <Table.ColumnHeader color={"gray.500"}>Status</Table.ColumnHeader>
            <Table.ColumnHeader color={"gray.500"}>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <TableBody>
          {orders.map((order) => (
            <Table.Row
              alignContent={"center"}
              key={order.id}
              // border={"none"}
              rounded={"xl"}
              bg={{ base: "whiteAlpha.100", _dark: "whiteAlpha.200" }}
            >
              <Table.Cell>
                <Text>{order.id}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{order.name}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{order.stock}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{order.price}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>
                  <Badge text="Delivered" color="green" />
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text
                  cursor={"pointer"}
                  onClick={() => navigate("../market")}
                  color={{ base: "green.600", _dark: "yellow.300/60" }}
                >
                  View Details
                </Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </TableBody>
      </Table.Root>
    </>
  );
};
