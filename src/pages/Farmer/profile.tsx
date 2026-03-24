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

import Badge from "../../components/ui/badge";

import { useNavigate } from "react-router-dom";

// Standard Lucide icons or your custom ones
import {
  Cube,
  Location,
  Contact,
  Phone,
  Calendar,
  Leaf,
  Pen,
  History,
  RightChevron,
  Check,
  Headset,
  Heart,
  Star,
  Plus,
} from "../../components/ui/icons";
import { useEffect, useState, type JSX } from "react";
import { useAuth } from "../../context/AuthContext";
import { useFarmerStore } from "store/store";
import Loader from "components/ui/load";
import Unexpected from "error/unexpected";

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

                {orders.map((o) => (
                  <OrderCard key={o.orderid} order={o} />
                ))}

                {/* Recent Purchases */}
                <VStack {...cardStyle} align="stretch" gap={6}>
                  <HStack justifyContent="space-between">
                    <HStack>
                      <History color="green" />
                      <Text fontWeight="bold">Recent Sales</Text>
                    </HStack>
                    <Text color="gray.500" fontSize="sm" cursor="pointer">
                      View Payouts
                    </Text>
                  </HStack>

                  <HStack
                    justifyContent="space-between"
                    cursor={"pointer"}
                    _hover={{ bg: { base: "#f8fafb", _dark: "#2a2a2a" } }}
                    p={4}
                  >
                    <HStack gap={4} rounded={"xl"}>
                      <Box p={2} bg="green.500/10" rounded="full">
                        <Check color="green" size={14} />
                      </Box>
                      <VStack alignItems="flex-start" gap={0}>
                        <Text fontWeight="semibold">25L Palm Oil</Text>
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
                <Grid templateColumns="repeat(4, 1fr)" gap={4} w="full">
                  <QuickLink
                    icon={<Plus />}
                    label="Add Product"
                    sub="List to market"
                    link="newProduct"
                  />
                  <QuickLink
                    icon={<Headset />}
                    label="Payouts"
                    sub="Get help"
                    disabled={true}
                  />
                  <QuickLink
                    icon={<Heart />}
                    label="Negotiations"
                    sub="Saved items"
                    disabled={true}
                  />
                  <QuickLink
                    icon={<Star />}
                    label="Reviews"
                    sub="Customer Feedback"
                    disabled={true}
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

const OrderCard = ({ order }: { order: ProfileOrderCard }) => {
  const badgecolor = order.status === "processing" ? "yellow" : "blue";
  return (
    <Box
      w={"full"}
      bg={{ base: "white", _dark: "#1a1a1a" }}
      rounded="xl"
      boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1)"
      //   border="1px solid"
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
              Ref: YAM-001
            </Text>
          </VStack>
        </HStack>
        <HStack alignItems="center" gap={2}>
          <Badge color={badgecolor} text={order.status} />
          <RightChevron cursor={"pointer"} fontSize={"sm"} color="gray" />
        </HStack>
      </HStack>
      <HStack justifyContent="space-between" p={4}>
        <Text fontSize={15} fontWeight={"bold"} color="gray.500">
          Date Added: {order.date}
        </Text>
        <Text fontWeight="bold" className="tracking-wider">
          ₦{order.amount.toLocaleString()}
        </Text>
      </HStack>
    </Box>
  );
};

export default Profile;
