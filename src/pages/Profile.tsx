/* eslint-disable react-hooks/exhaustive-deps */
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
} from "@chakra-ui/react";

import Badge from "../components/ui/badge";

import { useNavigate } from "react-router-dom";

// Standard Lucide icons or your custom ones
import {
  Cube,
  Location,
  Contact,
  Phone,
  Calendar,
  Leaf,
  RightArrow,
  // Dot,
  // Download,
  Pen,
  History,
  RightChevron,
  Check,
  ShoppingBag,
} from "../components/ui/icons";
import { useEffect, useState, type JSX } from "react";
import { useAuth } from "../context/AuthContext";
import { OrderTable } from "components/orders/ordersComps";
import { useOrderStore } from "store/store";
import { Loader } from "lucide-react";

const Profile = () => {
  const { user: User } = useAuth();

  const user = {
    ...User,
    name: User?.firstName + " " + User?.lastName,
    memberSince: "January 2024",
    image:
      "https://res.cloudinary.com/dpebuzpo4/image/upload/v1768730826/photo3_xzyf11.png",
    stats: { orders: 12, spent: "₦450K", rating: 4.8 },
  };

  const { orders, fetchOrders } = useOrderStore();
  const [load, setLoad] = useState<boolean>(true);

  const navigate = useNavigate();

  // Reusable card style
  const cardStyle = {
    bg: { base: "white", _dark: "#121212" },
    border: "1px solid #262626",
    rounded: "2xl",
    p: 6,
    w: "full",
  };

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
    <Box minH="100vh" p={10} bg={"white/70"} fontFamily="sans-serif">
      {/* BUYERS Profile */}
      <VStack maxW="7xl" mx="auto" gap={8} align={"stretch"} zIndex={10}>
        {/* Header */}
        <HStack justifyContent="space-between">
          <VStack align="start" gap={0}>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              color={{ base: "black", _dark: "white" }}
            >
              Buyer's Profile
            </Text>
            <Text color="gray.500">Manage your profile and track orders</Text>
          </VStack>
          <Button
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
                      {orders.length}
                    </Text>
                    <Text color="gray.500" fontSize="xs">
                      Orders
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
                      Spent
                    </Text>
                  </VStack>
                  <VStack gap={0} display={"none"}>
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
                  <Text fontSize="xs">Location</Text>
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
                    <Text fontWeight="bold">Active Orders</Text>
                  </HStack>
                  <HStack
                    color={{ base: "green.500", _dark: "orange" }}
                    cursor="pointer"
                    onClick={() => navigate("/orders")}
                  >
                    <Text fontSize="sm">View All</Text>

                    <RightArrow />
                  </HStack>
                </HStack>

                {/* Order Item 1 */}

                <Box p={4}>
                  {orders && orders.length > 0 ? (
                    <OrderTable orders={orders} />
                  ) : (
                    <Box w={"full"}>
                      <Text fontSize={"2xl"} textAlign={"center"}>
                        No orders in progress
                      </Text>
                    </Box>
                  )}
                </Box>

                {/* Recent Purchases */}
                <VStack {...cardStyle} align="stretch" gap={6} display={"none"}>
                  <HStack justifyContent="space-between">
                    <HStack>
                      <History color="green" />
                      <Text fontWeight="bold">Recent Purchases</Text>
                    </HStack>
                    {/* <Text color="gray.500" fontSize="sm" cursor="pointer">
                      Download History
                    </Text> */}
                  </HStack>

                  <HStack
                    justifyContent="space-between"
                    cursor={"pointer"}
                    // _hover={{ bg: "#2a2a2a" }}
                    p={4}
                    rounded={"xl"}
                  >
                    <HStack gap={4}>
                      <Box p={2} bg="green.500/10" rounded="full">
                        <Check color="green" size={14} />
                      </Box>
                      <VStack alignItems="flex-start" gap={0}>
                        <Text
                          fontWeight="semibold"
                          // _hover={{ color: "yellow.500" }}
                        >
                          25L Palm Oil
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          Jan 28, 2026 • Delivered
                        </Text>
                      </VStack>
                    </HStack>
                    <VStack
                      alignItems="flex-end"
                      justifyContent={"flex-end"}
                      gap={1}
                    >
                      <Text fontWeight="bold" fontSize="sm">
                        ₦35,000
                      </Text>
                      <Badge size="xs" color="green" text="Completed" />{" "}
                    </VStack>
                  </HStack>
                  {/* Add more recent items here... */}
                </VStack>

                {/* Bottom Quick Links */}
                <Grid templateColumns="repeat(1, 1fr)" gap={4} w="full">
                  <QuickLink
                    icon={<ShoppingBag />}
                    label="New Order"
                    sub="Browse market"
                    link="dashboard"
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

interface quicklink {
  icon: JSX.Element;
  label: string;
  sub: string;
  link?: string;
  disabled?: boolean;
}

const QuickLink = ({ icon, label, sub, link, disabled }: quicklink) => {
  const navigate = useNavigate();
  return (
    <VStack
      bg={{ base: "white", _dark: "#121212" }}
      p={4}
      rounded="xl"
      border="1px solid #262626"
      align="start"
      cursor="pointer"
      _hover={{ bg: { _dark: "#1a1a1a" } }}
      onClick={() => link && navigate(`../${link}`)}
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? "none" : "auto"}
    >
      <Box color={{ base: "green.400", _dark: "orange.400" }} mb={2}>
        {icon}
      </Box>
      <Text fontWeight="bold" fontSize="sm">
        {label}
      </Text>
      <Text fontSize="xs" color="gray.500">
        {sub}
      </Text>
    </VStack>
  );
};

interface ProfileOrderCard {
  orderid: number;
  orderItem: string;
  ordernum: string;
  quantity: number;
  date: string;
  amount: string;
  status: "processing" | "shipped" | "delivered" | "cancelled" | string;
}

export const OrderCard = ({ order }: { order: ProfileOrderCard }) => {
  const badgecolor = order.status === "processing" ? "yellow" : "blue";
  return (
    <Box
      w={"full"}
      bg={{ base: "white", _dark: "#1a1a1a" }}
      rounded="xl"
      border="1px solid"
      borderColor={{ _dark: "#262626" }}
    >
      <HStack justifyContent="space-between" p={4}>
        <HStack gap={4}>
          <Box p={3} bg="orange.500/10" rounded="lg">
            <Leaf color="orange" />
          </Box>
          <VStack align="start" gap={0}>
            <Text fontWeight="bold">{order.orderItem}</Text>
            <Text fontSize="sm" color="gray.500">
              Order {order.ordernum} • {order.quantity} items
            </Text>
          </VStack>
        </HStack>
        <HStack alignItems="center" gap={2}>
          <Badge color={badgecolor} text={order.status} />
          <RightChevron cursor={"pointer"} fontSize={"sm"} color="gray" />
        </HStack>
      </HStack>
      <Separator my={1} mx={4} borderColor="gray.600" />
      <HStack justifyContent="space-between" p={4}>
        <Text fontSize={15} fontWeight={"bold"} color="gray.500">
          Estimated Delivery: {order.date}
        </Text>
        <Text fontWeight="bold" className="tracking-wider">
          ₦{order.amount.toLocaleString()}
        </Text>
      </HStack>
    </Box>
  );
};

export default Profile;
