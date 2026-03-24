import {
  Avatar,
  Box,
  Button,
  HStack,
  Separator,
  Text,
  VStack,
  Grid,
  GridItem,
  Link,
} from "@chakra-ui/react";

import Badge from "../../components/ui/badge";

import { useNavigate } from "react-router-dom";

// Standard Lucide icons or your custom ones
import {
  Cube,
  Location,
  Contact,
  Phone,
  Calendar,
  Pen,
  History,
  RightChevron,
  Check,
  Plus,
} from "../../components/ui/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useFarmerStore } from "store/store";
import Loader from "components/ui/load";
import Unexpected from "error/unexpected";
import { ProductCard, QuickLink } from "./farmercomps";
import type { OrderRecord, ProfileProductCard } from "types/types";

const orders = [
  {
    orderid: 2,
    orderItem: "50kg Rice",
    ordernum: "#FC-0324",
    quantity: 2,
    date: "Feb 5, 2026",
    amount: "85000",
    status: "processing",
  },
  {
    orderid: 1,

    orderItem: "50kg Rice",
    ordernum: "#FC-0324",
    quantity: 2,
    date: "Feb 5, 2026",
    amount: "85000",
    status: "in transit",
  },
];

const Profile = () => {
  const { user: User } = useAuth();

  const navigate = useNavigate();

  const { products, fetchProducts } = useFarmerStore();

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const data = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, []);

  const user = {
    ...User,
    name: User?.firstName + " " + User?.lastName,
    memberSince: "January 2024",
    image:
      "https://res.cloudinary.com/dpebuzpo4/image/upload/v1768730826/photo3_xzyf11.png",
    stats: { orders: 12, spent: "₦450K", rating: 4.8 },
  };

  if (error) {
    return <Unexpected error={error} />;
  }

  if (loading) {
    return <Loader />;
  }

  // Reusable card style
  const cardStyle = {
    bg: { base: "white", _dark: "#121212" },
    // border: "1px solid #262626",
    rounded: "2xl",
    p: 6,
    w: "full",
  };

  return (
    <Box minH="100vh" p={10} fontFamily="sans-serif">
      {/* BUYERS Profile */}
      <VStack maxW="6xl" mx="auto" gap={8} align={"stretch"} zIndex={10}>
        {/* Header */}
        <HStack justifyContent="space-between">
          <VStack align="start" gap={0}>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              color={{ base: "black", _dark: "white" }}
            >
              Farmer's Profile
            </Text>
            <Text color="gray.500">
              Manage your produce listings and payouts
            </Text>
          </VStack>
          <Button
            display={"none"}
            variant="outline"
            color={{ base: "black", _dark: "whiteAlpha.100" }}
            rounded={"lg"}
            _hover={{
              borderColor: { base: "green.400", _dark: "yellow.500/50" },
            }}
          >
            <Pen size={16} />
            Edit Profile
          </Button>
        </HStack>

        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          {/* Left Column */}
          <GridItem colSpan={4}>
            <VStack gap={6}>
              {/* Profile Card */}
              <VStack
                {...cardStyle}
                borderColor={{ base: "green.300", _dark: "#262626" }}
                gap={4}
              >
                <Avatar.Root
                  bg={"#2a2a2a"}
                  size="2xl"
                  border="4px solid #1a1a1a"
                >
                  <Avatar.Fallback name={user.name} color="gray.400" />
                  <Avatar.Image src={user.image} />
                </Avatar.Root>
                <VStack gap={1} color={{ base: "black", _dark: "gray.300" }}>
                  <Text fontSize="xl" fontWeight="bold">
                    {user.name}
                  </Text>

                  <HStack
                    p={1}
                    px={2}
                    fontSize={14}
                    border={"1px solid"}
                    borderColor={{ base: "black", _dark: "gray.300" }}
                    color={{ base: "black", _dark: "gray.300" }}
                    bg={"gray.200/50"}
                    rounded={"lg"}
                  >
                    {user.role}
                  </HStack>
                </VStack>
                <Separator borderColor="gray.800" />
                <HStack justify="space-around" w="full" textAlign="center">
                  <VStack gap={0} color={{ base: "black", _dark: "white" }}>
                    <Text fontWeight="bold" fontSize="lg">
                      {products.length}
                    </Text>
                    <Text color="gray.500" fontSize="xs">
                      Listings
                    </Text>
                  </VStack>
                  <VStack gap={0}>
                    <Text
                      fontWeight="bold"
                      fontSize="lg"
                      color={{ base: "green.500", _dark: "green.400" }}
                    >
                      {user.stats.spent}
                    </Text>
                    <Text color="gray.500" fontSize="xs">
                      Sold
                    </Text>
                  </VStack>
                  <VStack gap={0}>
                    <Text
                      fontWeight="bold"
                      fontSize="lg"
                      color={{ base: "green.500", _dark: "yellow.400" }}
                    >
                      {user.stats.rating}
                    </Text>
                    <Text color="gray.500" fontSize="xs">
                      Rating
                    </Text>
                  </VStack>
                </HStack>
              </VStack>

              {/* Contact Info */}
              <VStack
                {...cardStyle}
                color={{ base: "black", _dark: "gray.400" }}
                align="start"
                gap={5}
              >
                <HStack>
                  <Contact size={18} />
                  <Text fontWeight="bold">CONTACT INFO</Text>
                </HStack>
                <VStack align="start" gap={1}>
                  <Text fontSize="xs">Phone Number</Text>
                  <HStack>
                    <Phone size={16} color="orange" />
                    <Text>{user.phoneNumber}</Text>
                  </HStack>
                </VStack>
                <VStack align="start" gap={1}>
                  <Text fontSize="xs">Farm Location</Text>
                  <HStack>
                    <Location size={16} color="orange" />
                    <Text>{user.address}</Text>
                  </HStack>
                </VStack>
                <VStack align="start" gap={1}>
                  <Text fontSize="xs">Member Since</Text>
                  <HStack>
                    <Calendar size={16} color="orange" />
                    <Text>{user.memberSince}</Text>
                  </HStack>
                </VStack>
              </VStack>

              {/* Verification */}
              <VStack
                {...cardStyle}
                color={{ base: "black", _dark: "gray.400" }}
                align="start"
                borderColor="green.900/30"
              >
                <Text fontSize="xs" fontWeight="bold">
                  VERIFICATION
                </Text>
                <HStack
                  justify="between"
                  w="full"
                  bg={{ _dark: "green.900/30" }}
                  p={2}
                  rounded={"xl"}
                >
                  <HStack gap={3}>
                    <Box bg="green.500/20" p={2} rounded="full">
                      <Check color="#48BB78" />
                    </Box>
                    <VStack align="start" gap={0}>
                      <Text fontWeight="bold" fontSize="sm">
                        NIN Verified
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Identity confirmed
                      </Text>
                    </VStack>
                  </HStack>
                </HStack>
              </VStack>
            </VStack>
          </GridItem>

          {/* Right Column */}
          <GridItem colSpan={8} color={{ base: "black", _dark: "gray.400" }}>
            <VStack gap={6}>
              {/* Active Orders */}
              <VStack {...cardStyle} align="stretch" gap={6}>
                <HStack justifyContent="space-between">
                  <HStack color={{ base: "black", _dark: "white" }}>
                    <Text color={{ base: "green.500", _dark: "orange" }}>
                      <Cube />
                    </Text>
                    <Text fontWeight="bold">My Active Listings</Text>
                  </HStack>
                  <HStack
                    color={{ base: "green.500", _dark: "orange" }}
                    cursor="pointer"
                    onClick={() => navigate("/orders")}
                  >
                    <Text fontSize="sm">Add New</Text>
                    <Text fontSize={"lg"} fontWeight={"bold"}>
                      <Plus />
                    </Text>
                  </HStack>
                </HStack>

                {/* Order Item 1 */}

                {products.slice(0, 2).map((o: ProfileProductCard) => (
                  <ProductCard key={o.id} product={o} />
                ))}

                {/* Recent Purchases */}
                <VStack {...cardStyle} align="stretch" gap={6}>
                  <HStack justifyContent="space-between">
                    <HStack>
                      <History color="green" />
                      <Text fontWeight="bold">Recent Sales</Text>
                    </HStack>
                    <HStack _hover={{ color: "green.400" }}>
                      <Link href="/farmer/orders" cursor="pointer">
                        View All Orders
                      </Link>
                      <RightChevron />
                    </HStack>
                  </HStack>

                  {orders
                    .filter((o) => o.status.toLowerCase() == "accepted")
                    .map((o) => <SalesItem sale={o} />) || (
                    <Box>No Recents Sales to Show</Box>
                  )}
                </VStack>

                {/* Bottom Quick Links */}
                <Grid templateColumns="repeat(4, 1fr)" gap={4} w="full">
                  <QuickLink
                    icon={<Plus />}
                    label="Add Product"
                    sub="List to market"
                    link="newProduct"
                  />
                </Grid>
              </VStack>
            </VStack>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default Profile;

const SalesItem = (o: OrderRecord) => (
  <HStack
    justifyContent="space-between"
    cursor="pointer"
    p={4}
    transition="all 0.2s"
    _hover={{
      bg: { base: "gray.50", _dark: "whiteAlpha.50" },
      transform: "translateX(4px)", // Subtle movement on hover
    }}
    borderBottom="1px solid"
    borderColor={{ base: "gray.100", _dark: "whiteAlpha.100" }}
  >
    {/* Left Section: Icon & Main Details */}
    <HStack gap={4}>
      <Box
        p={2.5}
        bg="green.500/10"
        rounded="xl" // Changed to squircle for a modern look
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Check color="#22C55E" size={16} fontWeight="bold" />
      </Box>

      <VStack alignItems="flex-start">
        <Text fontWeight="bold" fontSize="md" letterSpacing="-0.01em">
          {} {o.items.length > 0 && o.items[0].productName}
        </Text>
        <HStack>
          <Text fontSize="xs" color="gray.500" fontWeight="medium">
            Jan 28, 2026
          </Text>
          <Box w={1} h={1} bg="gray.300" rounded="full" />{" "}
          {/* Visual separator dot */}
          <Text fontSize="xs" color="gray.500" fontWeight="medium">
            Delivered
          </Text>
        </HStack>
      </VStack>
    </HStack>

    {/* Right Section: Price & Status Tag */}
    <VStack alignItems="flex-end">
      <Text
        fontWeight="800"
        fontSize="sm"
        color={{ base: "gray.800", _dark: "white" }}
      >
        ₦35,000
      </Text>
      {/* Using your status color map logic here */}
      <Badge color="green.700" text="Completed" />
    </VStack>
  </HStack>
);
