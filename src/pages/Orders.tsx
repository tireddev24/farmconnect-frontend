import { Box, Text, Button, HStack, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Truck } from "components/ui/icons";

import { useOrderStore } from "store/store";
import { useEffect, useState } from "react";
import Loader from "../components/ui/load";
import { OrderTable } from "components/orders/ordersComps";
import type { Order } from "types/types";

const Orders = () => {
  const navigate = useNavigate();

  const { orders, fetchOrders } = useOrderStore();
  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    const data = async () => {
      try {
        await fetchOrders();
      } catch (error) {
        console.log(error);
        // setError(true);
      } finally {
        setLoad(false);
      }
    };
    data();
  }, []);

  if (load) {
    return <Loader />;
  }

  return (
    <Box
      display={"flex"}
      flex={1}
      minH={"dvh"}
      bg={"white/70"}
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
              <Button
                display={"none"}
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
                Browse Market
              </Button>
            </Box>
          </HStack>
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
              orders.map((i: Order) => {
                return <>Return table of orders{i.name}</>;
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
            <OrderTable orders={orders} />
          ) : (
            <Box w={"full"}>
              <Text fontSize={"xl"} textAlign={"center"}>
                No orders to display here
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Orders;
