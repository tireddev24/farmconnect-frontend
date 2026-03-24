/* eslint-disable react-hooks/set-state-in-effect */
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Icon,
  Center,
  Link,
} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { ColorModeButton } from "components/ui/color-mode";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Order } from "types/types";

const Payment = () => {
  const [orders] = useState<Array<Order>>(
    JSON.parse(localStorage.getItem("orders")!),
  );

  const order = orders[0];

  const navigate = useNavigate();

  const handleBack = () => {
    // Check if there is a page to go back to in the current tab
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      // Fallback: If they arrived via a direct link, send them to the dashboard
      navigate("/dashboard");
    }
  };
  return (
    <Box bg={{ base: "#f8fafb", _dark: "black" }} w={"full"}>
      {/* Navbar */}
      <Flex
        as="nav"
        bg={{ base: "white", _dark: "black" }}
        px={8}
        py={4}
        alignItems="center"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <Link
          href="../"
          display="flex"
          alignItems="center"
          gap={2}
          color="gray.500"
          fontSize="sm"
          onClick={handleBack}
        >
          <Icon as={ArrowLeft} /> Back
        </Link>
        <Heading color="#10a37f">
          <Text fontSize={"lg"} fontWeight={"bold"}>
            FARMCONNECT
          </Text>
        </Heading>
        <ColorModeButton />
      </Flex>

      <Center>
        <Text>Payment Page</Text>
      </Center>

      <Box maxW="500px" mx="auto" mt={10}>
        <Heading size="md">Complete Your Payment</Heading>

        <Text mt={4}>Transfer the amount below:</Text>

        <Text mt={2}>Bank: First Bank</Text>
        <Text>Account Name: FarmConnect Ltd</Text>
        <Text>Account Number: 1234567890</Text>

        <Text mt={4} fontWeight="bold">
          Amount: ₦{order.totalAmount}
        </Text>

        <Text>Payment Reference: {order.orderId}</Text>

        <Button
          mt={6}
          colorScheme="green"
          onClick={() => navigate("../../orders", { replace: true })}
        >
          I Have Made Payment
        </Button>
      </Box>
    </Box>
  );
};

export default Payment;
