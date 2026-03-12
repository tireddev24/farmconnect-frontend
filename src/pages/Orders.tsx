import { Box, Text, Button, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { History, Truck } from "components/ui/icons";

import { useOrderStore } from "store/store";
import { useEffect, useState } from "react";
import Loader from "../components/ui/load";
import { OrderTable } from "components/orders/ordersComps";
import type { Order } from "types/types";

const Orders = () => {
  const navigate = useNavigate();

  const { orders: deliveries, fetchOrders } = useOrderStore();
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
              Active Deliveries ({deliveries ? deliveries.length : 0})
            </Text>
          </HStack>
          {deliveries && deliveries.length > 0 ? (
            deliveries.map((i: Order) => {
              return <>Return table of orders{i.name}</>;
            })
          ) : (
            <Box w={"full"}>
              <Text fontSize={"2xl"} textAlign={"center"}>
                No deliveries in progress
              </Text>
            </Box>
          )}

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
