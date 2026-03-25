import { Box, Text, Table, TableBody } from "@chakra-ui/react";

import Badge from "../../components/ui/badge";
import type { Order, OrderRecord } from "../../types/types";

import { formatDate, getStatusColor } from "helpers/function";

export const OrderCard = ({ order }: { order: Order }) => {
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

export const OrderTable = ({ orders }: { orders: OrderRecord[] }) => {
  return (
    <>
      <Table.Root colorPalette={"gray"}>
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
            <Table.ColumnHeader color={"gray.500"}>Quantity</Table.ColumnHeader>
            <Table.ColumnHeader color={"gray.500"}>Amount</Table.ColumnHeader>
            <Table.ColumnHeader color={"gray.500"}>Status</Table.ColumnHeader>
            {/* <Table.ColumnHeader color={"gray.500"}>Action</Table.ColumnHeader> */}
          </Table.Row>
        </Table.Header>
        <TableBody>
          {orders.map((order: OrderRecord) => (
            <Table.Row
              alignContent={"center"}
              key={order.id}
              // border={"none"}
              rounded={"xl"}
              bg={{ base: "whiteAlpha.100", _dark: "whiteAlpha.200" }}
            >
              <Table.Cell>
                <Text>{order.orderNumber}</Text>
              </Table.Cell>
              <Table.Cell textTransform={"capitalize"}>
                <Text>
                  {order.items.length > 0 && order.items[0].productName}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{formatDate(order.createdAt)}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{order.items.length > 0 && order.items[0].quantity}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{order.totalAmount}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>
                  <Badge
                    text={order.status!.replace("-", " ")}
                    color={getStatusColor(order.status)}
                  />
                </Text>
              </Table.Cell>
              <Table.Cell>
                {/* <Text
                  cursor={"pointer"}
                  onClick={() => navigate("../")}
                  color={{ base: "green.600", _dark: "yellow.300/60" }}
                >
                  View Details
                </Text> */}
              </Table.Cell>
            </Table.Row>
          ))}
        </TableBody>
      </Table.Root>
    </>
  );
};
