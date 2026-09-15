import { Box, Text, HStack, VStack, Flex } from "@chakra-ui/react";

import { Truck } from "components/ui/icons";

import { useOrderStore } from "store/store";
import { useEffect, useState } from "react";
import Spin from "@/components/ui/spinner";
import { OrderTable } from "components/orders/ordersComps";

const Orders = () => {


  const fetchOrders = useOrderStore((state) => state.fetchOrders);
  const orders = useOrderStore((state) => state.orders);
  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        await fetchOrders();
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };

    loadOrders();
  }, [fetchOrders]);

  if (load) {
    return <Spin h="100dvh" />;
  }

  return (
    <Flex
      flexDir={"column"}
      gap={5}
      p={8}
    >
      <Flex
        flexDir={"column"}

      >
        <Text fontSize={24} fontWeight={"bold"}>
          My Orders
        </Text>
        <Text color={"gray.400"} fontSize={14}>
          Track active shipments and review past purchases
        </Text>
      </Flex>


      <VStack display={"none"}>
        <HStack alignSelf={"flex-start"} display={"none"}>
          <Text
            fontWeight={"bold"}
            fontSize={20}
            color={{ base: "green.600", _dark: "yellow.400/80" }}
          >
            <Truck />
          </Text>
          <Text fontSize={18} fontWeight={"semibold"}>
            Active Deliveries ({orders ? orders.length : 0})
          </Text>
        </HStack>
        {orders && orders.length > 0 ? (
          orders.map((i) => {
            return <div key={i.orderNumber}>Return table of deliveries{i.orderNumber}</div>;
          })
        ) : (
          <Box w={"full"}>
            <Text fontSize={"2xl"} textAlign={"center"}>
              No deliveries in progress
            </Text>
          </Box>
        )}
      </VStack>

      <HStack fontWeight={"bold"} alignItems={"center"}></HStack>
      {orders ? (
        <Box
          shadow={"lg"}
          rounded={"xl"}
          p={"4"}
          minH={"60vh"}
          overflowX={"auto"}
          maxH={"60vh"}
          minW={"md"}
        >

          <OrderTable orders={orders} />
          {orders.length === 0 && (
            <Flex minH={"40vh"} alignItems={"center"} justifyContent={"center"} w={"full"}>
              <Text fontSize={"xl"} textAlign={"center"}>
                No orders to display here
              </Text>
            </Flex>
          )}
        </Box>
      ) : (
        <Box w={"full"}>
          <Text fontSize={"xl"} textAlign={"center"}>
            No orders to display here
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export default Orders;
