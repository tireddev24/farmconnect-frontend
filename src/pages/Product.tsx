/* eslint-disable react-hooks/set-state-in-effect */
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Icon,
  Center,
  Link,
  Circle,
  Separator,
  Loader,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  CheckCircle,
  MapPin,
  TrendingDown,
  BarChart3,
} from "lucide-react";
import CustomSelect from "../components/customselect";
import { ColorModeButton } from "../components/ui/color-mode";
// import { MOCK_PRODUCTS as products } from "../data/mockdata";
import { useNavigate, useParams } from "react-router-dom";
import { Star } from "../components/ui/icons";
import Spin from "../components/ui/spinner";
import { useEffect, useState } from "react";
import { useProductStore } from "store/store";
import Unexpected from "error/unexpected";
import type { CreateOrderPayload } from "types/types";

const ProductDetails = () => {
  const { id } = useParams();

  const { product, fetchProductById } = useProductStore();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  //   const [product, setProduct] = useState<any>(null);

  // const p = products?.items?.find((prod: Product) => prod.id === id);
  // const product: Product = p[0];

  useEffect(() => {
    const data = async () => {
      try {
        await fetchProductById(id);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, []);

  const handleOrder = (item: string) => {
    //function to generate order id
    // const rand = Math.floor(Math.random() * 900000 + 100000);

    const order: CreateOrderPayload = {
      items: [
        {
          productId: product.id,
          quantity: 1,
        },
      ],
      deliveryAddress: "Kano",
      deliveryLatitude: 0,
      deliveryLongitude: 0,
      notes: "Perishables",
    };

    console.log(order);
    setLoading(true);

    sessionStorage.setItem("order", JSON.stringify(order));
    sessionStorage.setItem("product", JSON.stringify(product));

    setLoading(false);
    //create a modal to enter rest of details

    navigate(`/checkout/${product.id}`);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Unexpected error={error} />;
  }

  if (!product) {
    return (
      <Center minH="100vh">
        <VStack>
          <Text fontSize="lg" color="gray.500">
            Product not found
          </Text>
          <Button onClick={() => navigate("/dashboard")}>
            Return to Market
          </Button>
        </VStack>
      </Center>
    );
  }

  return (
    <Box bg={{ base: "#f8fafb", _dark: "black" }} minH="100vh" w={"full"}>
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
          href="../dashboard"
          display="flex"
          alignItems="center"
          gap={2}
          color="gray.500"
          fontSize="sm"
        >
          <Icon as={ArrowLeft} /> Back to Market
        </Link>
        <Heading color="#10a37f" mx={"auto"}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            FARMCONNECT
          </Text>
        </Heading>
        <Box display={"none"}>
          <ColorModeButton />
        </Box>
      </Flex>

      {product ? (
        <Box py={12} display={"flex"} justifyContent={"center"} w={"full"}>
          <Flex gap={8}>
            {/* Sidebar Section */}
            <VStack spaceX={6} display={"none"} align="stretch">
              {/* Product Image Card */}
              <Box bg="#f0f9f6" p={8} rounded="2xl" textAlign="center">
                <Center mb={6}>
                  {/* Placeholder for the Yam Illustration */}
                  <Box
                    boxSize="150px"
                    bgGradient="radial(orange.200, transparent)"
                    rounded="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="6xl">🥔</Text>
                  </Box>
                </Center>
                <HStack justify="center" mb={4}>
                  <Badge
                    variant="subtle"
                    colorScheme="gray"
                    rounded="full"
                    px={3}
                  >
                    TUBERS
                  </Badge>
                  <Badge
                    variant="subtle"
                    colorScheme="gray"
                    rounded="full"
                    px={3}
                  >
                    FRESH HARVEST
                  </Badge>
                </HStack>
                <Text fontSize="xs" color="gray.500" lineHeight="tall">
                  Fresh Puna Yam, harvested recently. High starch content.
                </Text>
              </Box>

              {/* Market Stats */}
              <Box
                bg="white"
                p={6}
                rounded="2xl"
                shadow="sm"
                border="1px solid"
                borderColor="gray.100"
              >
                <HStack mb={4} color="gray.400">
                  <Icon as={BarChart3} />
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    Market Stats
                  </Text>
                </HStack>

                <VStack align="stretch" spaceX={3}>
                  <Flex
                    justify="space-between"
                    align="center"
                    bg="gray.50"
                    p={3}
                    rounded="xl"
                  >
                    <Text fontSize="sm" color="gray.500">
                      Availability
                    </Text>
                    <HStack spaceX={1}>
                      <Circle size="2" bg="emerald.500" />
                      <Text fontSize="sm" fontWeight="bold">
                        High Stock
                      </Text>
                    </HStack>
                  </Flex>

                  <Flex
                    justify="space-between"
                    align="center"
                    bg="gray.50"
                    p={3}
                    rounded="xl"
                  >
                    <Text fontSize="sm" color="gray.500">
                      Location
                    </Text>
                    <HStack spaceX={1} color="gray.800">
                      <Icon as={MapPin} color="emerald.500" />
                      <Text fontSize="sm" fontWeight="bold">
                        Oyo
                      </Text>
                    </HStack>
                  </Flex>

                  <Flex
                    justify="space-between"
                    align="center"
                    bg="gray.50"
                    p={3}
                    rounded="xl"
                  >
                    <Text fontSize="sm" color="gray.500">
                      Market Trend
                    </Text>
                    <HStack spaceX={1} color="red.400">
                      <Icon as={TrendingDown} />
                      <Text fontSize="sm" fontWeight="bold">
                        Falling
                      </Text>
                    </HStack>
                  </Flex>
                </VStack>
              </Box>
            </VStack>

            {/* Main Content Section */}
            <Box w={""} color={{ base: "black", _dark: "white" }}>
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
                      {product?.imageUrls[0] || "🥕"}
                    </Box>
                    <Heading size="2xl">{product.name}</Heading>
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
                    ₦{product.pricePerUnit}
                  </Text>
                </VStack>
              </Flex>

              {/* Recommended Deal Card */}
              {/* <Box
              border="2px solid"
              borderColor="emerald.400"
              rounded="2xl"
              p={6}
              bg="white"
              position="relative"
            ></Box> */}

              <Separator m={3} />
              {/* <Badge
              position="absolute"
              top="-3"
              right="6"
              bg="#10a37f"
              color="white"
              px={4}
              py={1}
              rounded="md"
              fontSize="xs"
            >
              RECOMMENDED DEAL
            </Badge> */}

              {/* <Box border={"1px solid red"}></Box> */}

              <Box
                alignItems="center"
                gap={10}
                border={"1px solid green"}
                rounded={"xl"}
                p={2}
                w={"full"}
                display={"flex"}
                px={10}
              >
                <HStack spaceX={4} flex={1}>
                  <VStack align="start" spaceX={0}>
                    <HStack>
                      <Text fontWeight="bold" fontSize="lg">
                        {product.farmerName}
                      </Text>
                      <Icon as={CheckCircle} fill="#10a37f" color="white" />
                    </HStack>
                    <HStack>
                      <Text fontSize="sm" color="gray.500">
                        Oyo •
                      </Text>
                      <HStack>
                        <Text
                          color={
                            product.farmerRating > 4
                              ? "green.500"
                              : "yellow.500"
                          }
                        >
                          <Star />
                        </Text>
                        <Text>{product.farmerRating}/5.0</Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </HStack>

                <HStack spaceX={4}>
                  <VStack
                    bg="gray.50"
                    px={6}
                    py={2}
                    rounded="lg"
                    align="center"
                    //   flex={1}
                  >
                    <Text
                      fontSize="10px"
                      color="gray.400"
                      fontWeight="bold"
                      textTransform="uppercase"
                    >
                      Delivery
                    </Text>
                    <Text fontWeight="bold">2-4 Days</Text>
                  </VStack>
                  <VStack
                    bg="gray.50"
                    px={6}
                    py={2}
                    rounded="lg"
                    align="center"
                    flex={1}
                  >
                    <Text
                      fontSize="10px"
                      color="gray.400"
                      fontWeight="bold"
                      textTransform="uppercase"
                    >
                      Stock
                    </Text>
                    <Text fontWeight="bold">{product.quantityAvailable}</Text>
                  </VStack>
                </HStack>

                <VStack spaceX={3} w={"200px"} py={10}>
                  <HStack w={"full"} justifyContent={"flex-end"}>
                    <Text fontSize="xl" fontWeight="700">
                      ₦{product.pricePerUnit}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      /Per {product.unit}
                    </Text>
                  </HStack>

                  <Button
                    w="full"
                    bg="#10a37f"
                    color="white"
                    rounded="xl"
                    h="12"
                    onClick={() => handleOrder(product.name)}
                  >
                    {loading ? <Spin /> : "Buy Now"}
                  </Button>
                  {/* <Button
                  w="full"
                  variant="outline"
                  borderColor="gray.200"
                  rounded="xl"
                  h="12"
                  disabled
                >
                  Negotiate
                </Button> */}
                </VStack>
              </Box>

              {/* More Offers Section */}
              <VStack align={"stretch"} display={"none"} mt={10}>
                <HStack justify="space-between" align="center">
                  <Text fontWeight="bold" color="gray.800">
                    More Offers (2)
                  </Text>
                  <Text ml={"auto"} fontSize="sm" color="gray.400">
                    Sort by:
                  </Text>
                  <Box fontSize={"sm"}>
                    <CustomSelect
                      defaultValue="PRICE"
                      value="Price"
                      options={["Price"]}
                      onChange={(e) => e}
                    />
                  </Box>
                </HStack>

                {/* Offer Row 1 */}
                <Flex
                  bg="white"
                  p={4}
                  rounded="xl"
                  border="1px solid"
                  borderColor="gray.100"
                  align="center"
                  justify="space-between"
                >
                  <HStack spaceX={4}>
                    <Circle
                      size="10"
                      bg="gray.50"
                      fontSize="xs"
                      fontWeight="bold"
                      color="gray.500"
                    >
                      LO
                    </Circle>
                    <VStack align="start" spaceX={0}>
                      <HStack>
                        <Text fontWeight="bold">Local Aggregator</Text>
                        <Circle size="2" bg="blue.400" />
                      </HStack>
                      <HStack>
                        <Text fontSize="xs" color="gray.400">
                          Regional Center •
                        </Text>
                        <Text color={"green.600"}>
                          <Star />
                        </Text>
                        <Text>4.7</Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  <HStack spaceX={8}>
                    <VStack align="end" gap={0}>
                      <Text fontWeight="bold">₦3,675</Text>
                      <Text fontSize="10px" color="gray.400">
                        per unit
                      </Text>
                    </VStack>
                    <Button
                      // variant="subtle"
                      // bg="gray.100"
                      bg={"none"}
                      color={{ base: "black", _dark: "white" }}
                      border={"1px solid"}
                      borderColor={{ base: "gray.400", _dark: "gray.300" }}
                      size="sm"
                      px={6}
                      rounded="md"
                    >
                      View Offer
                    </Button>
                  </HStack>
                </Flex>

                {/* Offer Row 2 */}
                <Flex
                  bg="white"
                  p={4}
                  rounded="xl"
                  border="1px solid"
                  borderColor="gray.100"
                  align="center"
                  justify="space-between"
                >
                  <HStack spaceX={4}>
                    <Circle
                      size="10"
                      bg="gray.50"
                      fontSize="xs"
                      fontWeight="bold"
                      color="gray.500"
                    >
                      MA
                    </Circle>
                    <VStack align="start" spaceX={0}>
                      <Text fontWeight="bold">Market Reseller</Text>
                      <Text fontSize="xs" color="gray.400">
                        City Market • ⭐ 4.5
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack spaceX={8}>
                    <VStack align="end" spaceX={0}>
                      <Text fontWeight="bold">₦4,025</Text>
                      <Text fontSize="10px" color="gray.400">
                        per unit
                      </Text>
                    </VStack>
                    <Button
                      variant="subtle"
                      bg="gray.100"
                      size="sm"
                      px={6}
                      rounded="md"
                    >
                      View Offer
                    </Button>
                  </HStack>
                </Flex>
              </VStack>
            </Box>
          </Flex>
        </Box>
      ) : (
        <Box>Product not found</Box>
      )}
    </Box>
  );
};

export default ProductDetails;
