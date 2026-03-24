import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Table,
  TableBody,
} from "@chakra-ui/react";
import { Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { OrderRecord } from "../../types/types";
import { useEffect, useState } from "react";
import { useFarmerStore } from "store/store";
import Unexpected from "error/unexpected";
import Loader from "components/ui/load";
import { formatDate } from "helpers/function";

export default function FarmerOrders() {
  const navigate = useNavigate();

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
                Manage placed orders.
              </Text>
            </Box>
            <HStack spaceX={4}>
              <Box>
                <Button
                  mr={4}
                  colorPalette={"gray"}
                  variant={"outline"}
                  disabled
                  display={"none"}
                >
                  Support
                </Button>
                <Button
                  p={2}
                  onClick={() => navigate("../newProduct")}
                  bg={{ base: "green.600", _dark: "#8a7557" }}
                >
                  List New Product
                </Button>
              </Box>
            </HStack>
          </HStack>{" "}
          {/* Active Deliveries Section */}
          <VStack display={"none"} align="stretch" spaceX={6} mb={12}>
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

            {orders.map((o: OrderRecord) => (
              <OrderCard order={o} />
            ))}
          </VStack>
          {/* History Section */}
          <VStack align="stretch" spaceX={6}>
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
                      Buyer
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
                  {orders.map((order: OrderRecord, i: number) => (
                    <Order key={i} order={order} />
                  ))}
                </TableBody>
              </Table.Root>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

const Order = ({ order, key }: { order: OrderRecord; key: number }) => {
  return (
    <Table.Row
      borderBottom="1px solid"
      borderColor="whiteAlpha.50"
      _last={{ border: 0 }}
      key={key}
    >
      <Table.Cell color="gray.500" fontSize="sm">
        {order.orderNumber}
      </Table.Cell>
      <Table.Cell fontWeight="bold" fontSize="sm">
        {/* {order.name} */}
      </Table.Cell>
      <Table.Cell color="gray.500" fontSize="sm">
        {order.buyerName}
      </Table.Cell>
      <Table.Cell fontWeight="bold" fontSize="sm">
        {formatDate(order.createdAt)}
      </Table.Cell>
      <Table.Cell>{order.totalAmount}</Table.Cell>
      <Table.Cell>
        <Text>{order.status}</Text>
      </Table.Cell>
      <Table.Cell>
        <HStack gap={2}>
          <Approve />
          <Decline />
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
};

import { CloseButton, Dialog, Portal } from "@chakra-ui/react";

const Approve = () => {
  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" _hover={{ bg: "green.300" }}>
          Accept
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>This action cannot be undone. You will accept this order.</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red">Accept Order</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

const Decline = () => {
  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" _hover={{ bg: "red.300" }}>
          Decline
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>This action cannot be undone. You will decline this order.</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red">Decline</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

const OrderCard = ({ order }: { order: OrderRecord }) => {
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
        {order.id}
      </Box>
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"flex-start"}
        mr={"auto "}
      >
        <Text fontSize={18} fontWeight={"bold"}>
          {/* {order.items[0].orderName} */}
        </Text>
        <Text fontSize={14}>Buyer: {order.buyerName} Lagos </Text>
        <Text
          fontSize={12}
          color={{ base: "gray.400", _dark: "gray.500" }}
          fontWeight={"bold"}
        >
          Order {order.orderNumber}
        </Text>
      </Box>
      <Box>
        <Text>Order Range Slider</Text>
      </Box>
    </Box>
  );
};
