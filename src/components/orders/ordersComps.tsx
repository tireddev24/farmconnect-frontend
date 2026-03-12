import { Box, Text, Table, TableBody } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import Badge from "../../components/ui/badge";
import type { Order } from "../../types/types";
import { useState } from "react";

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

export const OrderTable = () => {
  const navigate = useNavigate();

  // const { orders: items } = useOrderStore();

  const [items] = useState(JSON.parse(localStorage.getItem("orders")!));

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
            <Table.ColumnHeader color={"gray.500"}>
              Price ( per unit )
            </Table.ColumnHeader>
            <Table.ColumnHeader color={"gray.500"}>Amount</Table.ColumnHeader>
            <Table.ColumnHeader color={"gray.500"}>Status</Table.ColumnHeader>
            <Table.ColumnHeader color={"gray.500"}>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <TableBody>
          {items && items.length > 0 ? (
            items.map((order: Order) => {
              return (
                <Table.Row
                  alignContent={"center"}
                  key={order.orderId}
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
                    <Text>{order.date}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{order.price}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{order.totalAmount}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>
                      <Badge
                        text={order.status!.replace("-", " ")}
                        color={
                          order.status?.includes("delivered")
                            ? "green"
                            : "yellow"
                        }
                      />
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text
                      cursor={"pointer"}
                      onClick={() => navigate("../")}
                      color={{ base: "green.600", _dark: "yellow.300/60" }}
                    >
                      View Details
                    </Text>
                  </Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <Box w={"full"}>
              <Text fontSize={"2xl"} textAlign={"center"}>
                No orders to display here
              </Text>
            </Box>
          )}
        </TableBody>
      </Table.Root>
    </>
  );
};
