/* eslint-disable react-hooks/set-state-in-effect */
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Center,
  Link,
  Input,
} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { ColorModeButton } from "components/ui/color-mode";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import type { Order } from "types/types";
import Spin from "components/ui/spinner";

const Checkout = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  //   const [product, setProduct] = useState<any>(null);

  const [orders] = useState<Array<Order>>(
    JSON.parse(localStorage.getItem("orders")!),
  );

  const p = orders.filter((prod) => prod.orderId === id);
  const order = p[0];

  const navigate = useNavigate();

  const handleNext = () => {
    setLoading(true);
    //send order placed to backend

    const updatedOrder = [
      {
        ...order,
        quantity: quantity,
        totalAmount: quantity * order.price,
      },
    ];

    localStorage.setItem("orders", JSON.stringify(updatedOrder));
    //fetch it on order page load

    navigate("payment");
  };

  const [quantity, setQuantity] = useState<number>(order.quantity);

  const path = location.pathname;

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
    <Box bg={{ base: "#f8fafb", _dark: "black" }} minH="100vh" w={"full"}>
      {/* Navbar */}
      {path.includes("payment") && <Outlet />}

      <Box display={path.includes("payment") ? "none" : "block"}>
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
          <Text>Checkout Page</Text>
        </Center>

        <Box
          py={12}
          display={path.includes("payment") ? "none" : "flex"}
          justifyContent={"center"}
          w={"full"}
        >
          <Flex gap={8}>
            {/* Main Content Section */}
            <Box minW={"xl"} color={{ base: "black", _dark: "white" }}>
              {/* Header info */}
              <Flex justify="space-between" alignItems="end">
                <VStack align="start" spaceX={1}>
                  <HStack>
                    <Box
                      p={2}
                      fontSize={"3xl"}
                      bg={{ base: "gray.300/40", _dark: "#252525" }}
                      className=" rounded-2xl  flex items-center justify-center text-2xl"
                    >
                      {order.icon}
                    </Box>
                    <Heading size="2xl">{order.name}</Heading>
                  </HStack>
                  {/* <HStack fontSize="sm">
                  <Text fontSize={18} color={"green.600"}>
                    <ShieldCheck />
                  </Text>
                  <HStack color={{ base: "gray.400", _dark: "" }}>
                    <Text>Verified Quality</Text>
                    <Text>•</Text>
                    <Text>Per Tuber</Text>
                  </HStack>
                </HStack> */}
                </VStack>
                <VStack align="end" spaceX={0}>
                  <Text fontSize="sm" fontWeight="bold" color="gray.400">
                    Price
                  </Text>
                  <Text fontSize="3xl" fontWeight="700" color={"green.600"}>
                    ₦{order.price}
                  </Text>
                </VStack>
              </Flex>

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
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </HStack>
                <HStack justifyContent={"space-between"} m={4}>
                  <Text>Total Amount: </Text>

                  <Input
                    placeholder="Enter your username"
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
                    value={order.totalAmount * quantity}
                    disabled
                  />
                </HStack>
                <Button
                  colorPalette={"green"}
                  variant={"outline"}
                  onClick={handleNext}
                >
                  {loading ? <Spin /> : "Make Payments"}
                </Button>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
