import { Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import CustomSelect from "components/customselect";

import { useState } from "react";
import { useParams } from "react-router-dom";
import type { Order } from "types/types";

const Action = () => {
  const { id } = useParams();

  const [orders] = useState(JSON.parse(localStorage.getItem("orders")!));
  const o = orders.filter((prod: Order) => prod.orderId === id);
  const order = o[0];

  const [newStatus, setNewStatus] = useState(order.status);

  const handleChange = () => {
    const updatedOrder = [
      {
        ...order,
        status: newStatus,
      },
    ];

    localStorage.setItem("orders", JSON.stringify(updatedOrder));

    window.location.replace("/admin/usermanagement");
    // navigate("../../../admin/usermanagement");
  };
  return (
    <Flex minH="100vh" justifyContent={"center"} alignItems={"center"}>
      <Box alignSelf={"flex-start"} p={10}>
        <Box>
          <Text>Order Breakdown</Text>
          <Text>Buyer: {order.buyer}</Text>
          <Text>Seller: {order.seller}</Text>
          <Text>Item: {order.name}</Text>
          <HStack justifyContent={"space-between"} m={4}>
            <Text>Quantity (in tubers) </Text>
            <Input
              placeholder=""
              h="12"
              w={"max"}
              type="number"
              min={1}
              rounded="xl"
              // bg="white"
              borderColor="gray.200"
              _focus={{
                borderColor: "#10a37f",
                ring: "2px",
                ringColor: "emerald.50",
              }}
              disabled
              value={order.quantity}
            />
          </HStack>
          <HStack justifyContent={"space-between"} m={4}>
            <Text>Total Amount: </Text>

            <Input
              h="12"
              w={"max"}
              rounded="xl"
              // bg="white"
              borderColor="gray.200"
              _focus={{
                borderColor: "#10a37f",
                ring: "2px",
                ringColor: "emerald.50",
              }}
              value={order.totalAmount}
              disabled
            />
          </HStack>
        </Box>
        <CustomSelect
          options={[
            "awaiting-confirmation",
            "approved",
            "shipped",
            "delivered",
          ]}
          defaultValue="awaiting-confirmation"
          value={newStatus}
          onChange={(e) => setNewStatus(e)}
        />
        <Button onClick={handleChange}>Confirm Changes</Button>
      </Box>
    </Flex>
  );
};

export default Action;
