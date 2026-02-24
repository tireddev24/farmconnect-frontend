import { Box, Text, Button, HStack, Table, TableBody } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { History, Truck } from "../components/ui/icons";
import Badge from "../components/ui/badge";

const Orders = () => {
  const navigate = useNavigate();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      color={"white"}
      // mt={10}
      className=" overflow-hidden gap-10"
    >
      <Box display={"flex"} flexDir={"column"} gap={10} mt={10}>
        <HStack
          minW={"5xl"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          className="bg-[#0a0a0a] flex gap-10 justify-between text-gray-200 font-sans  items-start "
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
            <Button mr={4} colorPalette={"gray"} disabled>
              Support
            </Button>
            <Button
              p={2}
              onClick={() => navigate("../market")}
              bg={"yellow.600/70"}
            >
              Browse Market
            </Button>
          </Box>
        </HStack>
        <HStack alignSelf={"flex-start"}>
          <Truck className="text-yellow-500" />
          <Text fontSize={16} fontWeight={"bold"} color={"white"}>
            Active Deliveries (2)
          </Text>
        </HStack>
        {orders.map((o) => (
          <OrderCard order={o} />
        ))}

        <HStack fontWeight={"bold"} alignItems={"center"} h={"max-content"}>
          <History className="text-2xl text-gray-600" />
          <Text>History</Text>
        </HStack>
        <OrderTable />
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
      color={"white"}
    >
      <div className="w-16 h-16 rounded-2xl bg-[#252525] flex items-center justify-center text-2xl">
        {order.icon}
      </div>
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
        <Text fontSize={12} color={"gray.400"} fontWeight={"bold"}>
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
      <Table.Root rounded={"lg"} p={2}>
        <Table.Header
          rounded={"lg"}
          color={"gray.500"}
          className="uppercase font-bold rounded-3xl text-gray-500"
        >
          <Table.Row
            rounded={"lg"}
            className="uppercase font-bold rounded-3xl text-gray-500"
            bg={"whiteAlpha.100"}
            border={"none"}
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
        <TableBody justifyContent={"center"}>
          {orders.map((order) => (
            <Table.Row
              alignContent={"center"}
              key={order.id}
              border={"none"}
              bg={"whiteAlpha.100"}
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
              <Table.Cell textAlign={"center"}>
                <Text
                  cursor={"pointer"}
                  onClick={() => navigate("../market")}
                  color={"green.400/70"}
                >
                  View
                </Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </TableBody>
      </Table.Root>
    </>
  );
};
