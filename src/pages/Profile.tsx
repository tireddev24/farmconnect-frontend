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
  Calender,
  Leaf,
  RightArrow,
  // Dot,
  // Download,
  Pen,
  History,
  RightChevron,
  Check,
  ShoppingBag,
  Headset,
  Heart,
  Star,
} from "../components/ui/icons";

const user = {
  name: "Michael Amao",
  type: "BUYER",
  phone: "0801 234 5678",
  address: "Lekki, Lagos",
  memberSince: "January 2024",
  image:
    "https://res.cloudinary.com/dpebuzpo4/image/upload/v1768730826/photo3_xzyf11.png",
  stats: { orders: 12, spent: "₦450K", rating: 4.8 },
};

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
  const navigate = useNavigate();

  // Reusable card style
  const cardStyle = {
    bg: "#121212",
    border: "1px solid #262626",
    rounded: "2xl",
    p: 6,
    w: "full",
  };

  return (
    <Box bg="black" minH="100vh" p={10} color="white" fontFamily="sans-serif">
      <VStack maxW="6xl" mx="auto" gap={8} align="stretch">
        {/* Header */}
        <HStack justifyContent="space-between">
          <VStack align="start" gap={0}>
            <Text fontSize="3xl" fontWeight="bold">
              Buyer's Profile
            </Text>
            <Text color="gray.500">Manage your profile and track orders</Text>
          </VStack>
          <Button
            variant="solid"
            borderColor="gray.700"
            color="white"
            rounded={"lg"}
            _hover={{ borderColor: "yellow.500/50" }}
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
              <VStack {...cardStyle} gap={4}>
                <Avatar.Root bg="#2a2a2a" size="2xl" border="4px solid #1a1a1a">
                  <Avatar.Fallback name={user.name} color="gray.400" />
                  <Avatar.Image src={user.image} />
                </Avatar.Root>
                <VStack gap={1}>
                  <Text fontSize="xl" fontWeight="bold">
                    {user.name}
                  </Text>
                  <Badge text={user.type} color="yellow" />
                </VStack>
                <Separator borderColor="gray.800" />
                <HStack justify="space-around" w="full" textAlign="center">
                  <VStack gap={0}>
                    <Text fontWeight="bold" fontSize="lg">
                      {user.stats.orders}
                    </Text>
                    <Text color="gray.500" fontSize="xs">
                      Orders
                    </Text>
                  </VStack>
                  <VStack gap={0}>
                    <Text fontWeight="bold" fontSize="lg" color="green.400">
                      {user.stats.spent}
                    </Text>
                    <Text color="gray.500" fontSize="xs">
                      Spent
                    </Text>
                  </VStack>
                  <VStack gap={0}>
                    <Text fontWeight="bold" fontSize="lg" color="yellow.500">
                      {user.stats.rating}
                    </Text>
                    <Text color="gray.500" fontSize="xs">
                      Rating
                    </Text>
                  </VStack>
                </HStack>
              </VStack>

              {/* Contact Info */}
              <VStack {...cardStyle} align="start" gap={5}>
                <HStack color="gray.400">
                  <Contact size={18} />
                  <Text fontWeight="bold">CONTACT INFO</Text>
                </HStack>
                <VStack align="start" gap={1}>
                  <Text fontSize="xs" color="gray.500">
                    Phone Number
                  </Text>
                  <HStack>
                    <Phone size={16} color="orange" />
                    <Text>{user.phone}</Text>
                  </HStack>
                </VStack>
                <VStack align="start" gap={1}>
                  <Text fontSize="xs" color="gray.500">
                    Location
                  </Text>
                  <HStack>
                    <Location size={16} color="orange" />
                    <Text>{user.address}</Text>
                  </HStack>
                </VStack>
                <VStack align="start" gap={1}>
                  <Text fontSize="xs" color="gray.500">
                    Member Since
                  </Text>
                  <HStack>
                    <Calender size={16} color="orange" />
                    <Text>{user.memberSince}</Text>
                  </HStack>
                </VStack>
              </VStack>

              {/* Verification */}
              <VStack {...cardStyle} align="start" borderColor="green.900/30">
                <Text fontSize="xs" color="gray.500" fontWeight="bold">
                  VERIFICATION
                </Text>
                <HStack
                  justify="between"
                  w="full"
                  bg="green.900/30"
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
                  <Check color="#48BB78" />
                </HStack>
              </VStack>
            </VStack>
          </GridItem>

          {/* Right Column */}
          <GridItem colSpan={8}>
            <VStack gap={6}>
              {/* Active Orders */}
              <VStack {...cardStyle} align="stretch" gap={6}>
                <HStack justifyContent="space-between">
                  <HStack>
                    <Cube color="orange" />
                    <Text fontWeight="bold">Active Orders</Text>
                  </HStack>
                  <HStack
                    color="yellow.600"
                    cursor="pointer"
                    onClick={() => navigate("/orders")}
                  >
                    <Text fontSize="sm">View All</Text>
                    <RightArrow />
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
                      <Text fontWeight="bold">Recent Purchases</Text>
                    </HStack>
                    <Text color="gray.500" fontSize="sm" cursor="pointer">
                      Download History
                    </Text>
                  </HStack>

                  <HStack
                    justifyContent="space-between"
                    cursor={"pointer"}
                    _hover={{ bg: "#2a2a2a" }}
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
                <Grid templateColumns="repeat(4, 1fr)" gap={4} w="full">
                  <QuickLink
                    icon={<ShoppingBag />}
                    label="New Order"
                    sub="Browse market"
                    link="market"
                  />
                  <QuickLink
                    icon={<Headset />}
                    label="Support"
                    sub="Get help"
                    disabled={true}
                  />
                  <QuickLink
                    icon={<Heart />}
                    label="Wishlist"
                    sub="Saved items"
                    disabled={true}
                  />
                  <QuickLink
                    icon={<Star />}
                    label="Reviews"
                    sub="Rate orders"
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

const QuickLink = ({ icon, label, sub, link, disabled }: any) => {
  const navigate = useNavigate();
  return (
    <VStack
      bg="#121212"
      p={4}
      rounded="xl"
      border="1px solid #262626"
      align="start"
      cursor="pointer"
      _hover={{ bg: "#1a1a1a" }}
      onClick={() => link && navigate(`../${link}`)}
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? "none" : "auto"}
    >
      <Box color="orange.400" mb={2}>
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

const OrderCard = ({ order }: any) => {
  const badgecolor = order.status === "processing" ? "yellow" : "blue";
  return (
    <Box w={"full"} bg="#1a1a1a" rounded="xl" border="1px solid #262626">
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
