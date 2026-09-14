
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Input,
} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Spin from "components/ui/spinner";
import { type CreateOrderPayload, type Product } from "types/types";
import { useAuthStore } from "store/store";
import { Toaster } from "components/ui/toaster";
import { toaster } from "@/hooks/useUI";
import { returnFullName } from "@/lib/helpers";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [loading, setLoading] = useState(false);


  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate();

  const [order, setOrder] = useState<CreateOrderPayload>(
    JSON.parse(sessionStorage.getItem("order")!),
  );
  const [product] = useState<Product>(
    JSON.parse(sessionStorage.getItem("product")!),
  );

  const handleNext = async () => {

    setLoading(true)
    toaster.create({
      type: "info",
      title: "Info",
      description: "Payment not integrated yet."
    })
    setLoading(false)

    // setLoading(true);
    // //send order placed to backend

    // const { success, message } = await createOrder(order);

    // toaster.create({
    //   type: success ? "success" : "error",
    //   title: success ? "Success" : "Error",
    //   description: message,
    // });

    // setLoading(false);

    // navigate("../orders");
  };

  const path = location.pathname;


  if (!user) {
    return <Navigate to="/login" replace={true} />
  }

  return (
    <Box bg={{ base: "#f8fafb", _dark: "black" }} minH="100vh" w={"full"}>
      <Toaster />
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
          <Button
            onClick={() => navigate(-1)}
            display="flex"
            alignItems="center"
            gap={2}
            colorPalette="green"
            variant={"ghost"}
            fontSize="sm"
          >
            <Icon as={ArrowLeft} /> Back
          </Button>
        </Flex>


        <Heading
          fontSize={"xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          mt={"4"}
        >
          Checkout Page
        </Heading>

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
                      {/* {order.icon} */}
                      {"🥕"}
                    </Box>
                    <Heading size="2xl" textTransform={"capitalize"}>
                      {product.name}
                    </Heading>
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
                    Price Per Unit
                  </Text>
                  <Text
                    fontSize="3xl"
                    fontWeight="700"
                    textTransform={"capitalize"}
                    color={"green.600"}
                  >
                    ₦{product.pricePerUnit}
                  </Text>
                </VStack>
              </Flex>

              <Box textTransform={"capitalize"}>
                <Text>Order Breakdown</Text>
                <Text>Buyer: {returnFullName(user.firstName, user.lastName)}</Text>
                <Text>Seller: {product.farmerName}</Text>
                <Text>Item: {product.name}</Text>
                <HStack justifyContent={"space-between"} m={4}>
                  <Text>Quantity (in {product.unit}) </Text>
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
                    value={order.items[0].quantity}
                    onChange={(e) => {
                      const newQuantity = parseFloat(e.target.value) || 0;

                      setOrder((prevOrder) => ({
                        ...prevOrder, // Keep address, notes, etc.
                        items: [
                          {
                            ...prevOrder.items[0], // Keep the productId
                            quantity: newQuantity, // Update the quantity
                          },
                          ...prevOrder.items.slice(1), // Keep any other items if they exist
                        ],
                      }));
                    }}
                  />
                </HStack>
                <HStack justifyContent={"space-between"} m={4}>
                  <Text>Total Amount: </Text>

                  <Input
                    placeholder=""
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
                    value={product.pricePerUnit * order.items[0].quantity}
                    disabled
                  />
                </HStack>
                <Button
                  colorPalette={"green"}
                  variant={"outline"}
                  onClick={handleNext}
                >
                  {loading ? <Spin /> : "Place Order"}
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
