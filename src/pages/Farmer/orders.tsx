import {
  Box, Text, VStack, Table, TableBody, HStack,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFarmerStore } from "store/store";
import Unexpected from "@/components/ui/error/unexpected";
import { formatDate, getStatusColor } from "@/lib/helpers"
import Spin from "@/components/ui/spinner";
import { ApproveOrder, DeclineOrder } from "./farmercomps";
import Badge from "@/components/ui/badge";


export default function FarmerOrders() {


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const orders = useFarmerStore((state) => state.orders);
  const fetchOrders = useFarmerStore((state) => state.fetchOrders);

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
  }, [fetchOrders]);

  if (error) {
    return <Unexpected error={error} />;
  }

  if (loading) {
    return <Spin h="100dvh" />;
  }



  return (

    <Flex
      direction={"column"}
      justifyContent={"center"}
      p={8}
      gap={4}
    >
      <Flex direction={"column"}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Order Management
        </Text>
        <Text color="gray.500" fontSize="sm">
          Manage placed orders.
        </Text>
      </Flex>


      {/* History Section */}
      <VStack align="stretch" spaceX={6}>
        <Box shadow={"md"} rounded={"lg"} p={4} minH={"60dvh"} >
          <Table.Root>
            <Table.Header>
              <Table.Row fontWeight={"bold"}>
                <Table.Cell>
                  Order No
                </Table.Cell>
                <Table.Cell>
                  Buyer
                </Table.Cell>
                <Table.Cell>
                  Purchased On
                </Table.Cell>
                <Table.Cell fontSize="xs">
                  Amount
                </Table.Cell>
                <Table.Cell fontSize="xs">
                  Status
                </Table.Cell>
                <Table.Cell fontSize="xs">
                  Actions
                </Table.Cell>
              </Table.Row>
            </Table.Header>
            <TableBody>
              {orders
                .filter(
                  (o) => o.status.toLowerCase() == "pending",
                )
                .map((order) => (
                  <Order {...order} />
                ))}
            </TableBody>
          </Table.Root>
        </Box>
      </VStack>

    </Flex>
  );
}

const Order = ({ ...order }) => {


  return (
    <Table.Row
      borderBottom="1px solid"
      borderColor="whiteAlpha.50"
      _last={{ border: 0 }}
      key={order.id}
    >
      <Table.Cell  >
        {order.orderNumber}
      </Table.Cell>

      <Table.Cell  >
        {order.buyerName}
      </Table.Cell>
      <Table.Cell>
        {formatDate(order.createdAt)}
      </Table.Cell>
      <Table.Cell>{order.totalAmount}</Table.Cell>
      <Table.Cell>
        <Badge text={order.status.split("-").join(" ")} color={getStatusColor(order.status)} />
      </Table.Cell>
      <Table.Cell>
        <HStack gap={2}>
          <ApproveOrder id={order.id} />
          <DeclineOrder id={order.id} />
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
};



