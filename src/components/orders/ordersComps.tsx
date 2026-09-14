import { Box, Text, Table, TableBody } from "@chakra-ui/react";

import Badge from "../../components/ui/badge";
import type { Order, OrderRecord } from "../../types/types";

import { formatCurrency, formatDate, getStatusColor } from "@/lib/helpers";

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

    <Table.Root >
      <Table.Header
        textTransform={"capitalize"}
        textWrap={'nowrap'}
      >
        <Table.Row
          rounded={"lg"}
        >
          <Table.ColumnHeader >order id</Table.ColumnHeader>
          <Table.ColumnHeader >Items</Table.ColumnHeader>
          <Table.ColumnHeader >Date Placed</Table.ColumnHeader>
          <Table.ColumnHeader >Quantity</Table.ColumnHeader>
          <Table.ColumnHeader >Amount</Table.ColumnHeader>
          <Table.ColumnHeader >Status</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <TableBody>
        {orders.map((order) => (
          <Table.Row
            key={order.id}
            rounded={"xl"}
            textTransform={"capitalize"}
          >
            <Table.Cell>
              <Text>{order.orderNumber}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>
                {order.items.map((item) => (
                  <Text key={item.productId}>{item.productName}</Text>
                ))}
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Text>{formatDate(order.createdAt)}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>{order.items.reduce((acc, item) => acc + item.quantity, 0)}{order.items.map((item) => (
                <Text as={"span"} key={item.productId}>{item.unit}</Text>
              ))}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>{formatCurrency(order.totalAmount)}</Text>
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

            </Table.Cell>
          </Table.Row>
        ))}
      </TableBody>
    </Table.Root>

  );
};
