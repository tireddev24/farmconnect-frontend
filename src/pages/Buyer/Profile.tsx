/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Button,
  HStack,
  Separator,
  Text,
  VStack,
  GridItem,
  Dialog, Portal, Input, CloseButton,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";

import Badge from "@/components/ui/badge";

import { useNavigate } from "react-router-dom";

import {
  Cube,
  Location,
  Contact,
  Phone,
  Calendar,
  RightArrow,
  Pen,
  History,
  Check,
  ShoppingBag,
} from "@/components/ui/icons";
import { useEffect, useState } from "react";
import { useOrderStore, useUserStore } from "@/store/store";
import Spin from "@/components/ui/spinner";
import { formatCurrency, formatDate, formatPlural, getStatusColor, getTotalSpent, returnFullName } from "@/lib/helpers";
import { QuickLink } from "@/components/quicklink";
import { toaster } from "@/hooks/useUI";
import type { UserProfile } from "@/types/types";

const Profile = () => {
  const user = useUserStore((state) => state.user);

  const fetchUser = useUserStore((state) => state.fetchUserDetails);
  const orders = useOrderStore((state) => state.orders);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);

  const [load, setLoad] = useState<boolean>(true);

  const navigate = useNavigate();

  // Reusable card style
  const cardStyle = {
    bg: { base: "white", _dark: "#121212" },
    rounded: "2xl",
    p: 6,
    w: "full",
    shadow: "lg"
  };

  useEffect(() => {
    const data = async () => {
      try {
        await fetchOrders();
        await fetchUser()
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
    return <Spin h="100dvh" />;
  }

  if (!user) {
    navigate("/login")
    return <Spin h="100dvh" />;
  }


  return (
    <Flex direction={"column"} p={8}>
      {/* BUYERS Profile */}
      {/* Header */}
      <HStack justifyContent="space-between">
        <VStack align="start" gap={0}>
          <Text
            fontSize="3xl"
            fontWeight="bold"
          >
            Buyer's Profile
          </Text>
          <Text color="gray.500">Manage your profile and track orders</Text>
        </VStack>
        <EditProfile user={user} />
      </HStack>

      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6} p={"4"} mt={4}>
        {/* Left Column */}
        <GridItem w={"full"}>
          <VStack gap={4} >
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
                <Avatar.Fallback name={returnFullName(user.firstName, user.lastName)} color="gray.400" />
                {/* <Avatar.Image src={userDetails?.image!} /> */}
              </Avatar.Root>
              <VStack gap={1} color={{ base: "black", _dark: "gray.300" }}>
                <Text fontSize="xl" fontWeight="bold">
                  {returnFullName(user.firstName, user.lastName)}
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
                  <Text >
                    {orders.length}
                  </Text>
                  <Text color="gray.500" fontSize="xs">
                    Orders
                  </Text>
                </VStack>
                <VStack gap={0}>
                  <Text
                    fontWeight="bold"

                    color={{ base: "green.500", _dark: "green.400" }}
                  >
                    {formatCurrency(getTotalSpent(orders, "totalAmount"))}
                  </Text>
                  <Text color="gray.500" fontSize="xs">
                    Spent
                  </Text>
                </VStack>

              </HStack>
            </VStack>

            {/* Contact Info */}
            <VStack
              {...cardStyle}
              align={"start"}
              gap={4}
            >
              <HStack>
                <Contact size={18} />
                <Text fontWeight="bold">CONTACT INFORMATION</Text>
              </HStack>
              <VStack align="start" gap={1}>
                <Text fontSize="sm">Phone Number</Text>
                <HStack>
                  <Phone size={16} />
                  <Text>{user.phoneNumber}</Text>
                </HStack>
              </VStack>
              <VStack align="start" gap={1}>
                <Text fontSize="sm">Location</Text>
                <HStack>
                  <Location size={16} />
                  <Text>{user.address}</Text>
                </HStack>
              </VStack>
              <VStack align="start" gap={1}>
                <Text fontSize="sm">Member Since</Text>
                <HStack>
                  <Calendar size={16} />
                  <Text>{formatDate(user.createdAt, "long")}</Text>
                </HStack>
              </VStack>
            </VStack>

            {/* Verification */}
            <VStack
              {...cardStyle}
              align={"start"}

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
        <GridItem colSpan={2}>

          <Flex gap={6}>
            {/* Active Orders */}
            <Box {...cardStyle} gap={6}>
              <HStack justifyContent="space-between">
                <HStack color={{ base: "black", _dark: "white" }}>
                  <Text color={{ base: "green.500", _dark: "orange" }}>
                    <Cube />
                  </Text>
                  <Text fontWeight="bold">Pending Orders</Text>
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
              {orders.filter((order) => order.status.toLowerCase() === "pending").slice(0, 3).map((order) => (
                <Flex gap={2} alignItems={"center"} justifyContent={"space-between"} {...cardStyle} key={order.id} >
                  <Box>
                    <Text
                      textTransform={"capitalize"}
                    >
                      {order.items![0].productName}  •  {order.items && order.items.reduce((acc, item) => acc + item.quantity, 0)} {order.items && formatPlural(order.items[0].unit!, order.items.reduce((acc, item) => acc + item.quantity, 0))}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {formatDate(order.createdAt!)}
                    </Text>
                  </Box>
                  <Box>
                    <Badge
                      color={getStatusColor(order.status!)}
                      text={order.status!}
                    />
                  </Box>

                </Flex>
              ))}
            </Box>

            {/* Order Item 1 */}

            {/* Recent Purchases */}
            <Box {...cardStyle} gap={4}>

              <HStack>
                <History color="green" />
                <Text fontWeight="bold">Recent Purchases</Text>
              </HStack>


              <Flex
                direction={"column"}
                gap={2}
              >


                {orders.filter((order) => order.status.toLowerCase() !== "pending").slice(0, 3).map((order) => (
                  <Flex gap={2} alignItems={"center"} justifyContent={"space-between"} {...cardStyle} key={order.id} >
                    <Box>
                      <Text
                        textTransform={"capitalize"}
                      >{order.items.length > 0 ?
                        order.items[0].productName + "  •  " + order.items.reduce((acc, item) => acc + item.quantity, 0) + " " + formatPlural(order.items![0].unit!, order.items.reduce((acc, item) => acc + item.quantity, 0))
                        : ""
                        }
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {formatDate(order.createdAt!)}
                      </Text>
                    </Box>
                    <Box textAlign={"right"}>
                      <Text fontSize={"xs"} textTransform={"capitalize"} color={"gray.500"}>{order.farmerName}</Text>

                      <Badge
                        color={getStatusColor(order.status!)}
                        text={order.status!}
                      />
                    </Box>

                  </Flex>
                ))}
              </Flex>

              {/* Add more recent items here... */}


            </Box>
          </Flex>
          <SimpleGrid mt={4} p={2} columns={{ base: 1, md: 3 }} gap={2} w="full">
            <QuickLink
              icon={<ShoppingBag />}
              label="New Order"
              sub="Place a new order for fresh food"
              link="dashboard"
            />
          </SimpleGrid>
        </GridItem>
        {/* Bottom Quick Links */}
      </SimpleGrid>

    </Flex >
  );
};



export default Profile;


const EditProfile = ({ user }: { user: UserProfile }) => {
  const [editedUser, setEditedUser] = useState(user);

  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const { editUserDetails } = useUserStore();

  const handleEdit = async (data: Partial<UserProfile>) => {
    setIsEditing(true);
    const { success } = await editUserDetails(data);
    setIsEditing(false);
    toaster.create({
      type: success ? "info" : "warning",
      description: success
        ? `${returnFullName(editedUser.firstName, editedUser.lastName)} details updated! `
        : `Something went wrong`,
    });

    if (success) {
      setOpen(false);
    }
  };
  return (
    <Dialog.Root
      role="dialog"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}

    >
      <Dialog.Trigger asChild>
        <Button
          // variant="outline"
          color={{ base: "black", _dark: "white" }}
          bg={{ base: "white", _dark: "black" }}
          rounded={"lg"}
          _hover={{
            borderColor: { base: "green.400", _dark: "yellow.500/50" },
          }}
        >
          <Pen size={16} />
          Edit Profile
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title textTransform={"capitalize"} color={{ base: "black", _dark: "white" }}>
                Edit Profile ?
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body color={{ base: "black", _dark: "white" }}>
              <SimpleGrid gap={6} columns={2}>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb={3}>
                    First Name
                  </Text>
                  <Input
                    defaultValue="12000"
                    color={{ base: "black", _dark: "white" }}
                    borderColor="gray.200"
                    _focus={{
                      borderColor: { base: "#10a37f", _dark: "yellow.500" },
                      ring: "2px",
                      ringColor: { base: "emerald.50", _dark: "yellow.50" },
                    }}
                    rounded="lg"
                    value={editedUser.firstName}
                    disabled
                  />
                </Box>
                <Box flex={1}>
                  <Text fontSize="sm" fontWeight="bold" mb={3}>
                    Last Name
                  </Text>
                  <Input
                    defaultValue="12000"
                    color={{ base: "black", _dark: "white" }}
                    borderColor="gray.200"
                    _focus={{
                      borderColor: { base: "#10a37f", _dark: "yellow.500" },
                      ring: "2px",
                      ringColor: { base: "emerald.50", _dark: "yellow.50" },
                    }}
                    rounded="lg"
                    value={editedUser.lastName}
                    disabled
                  />
                </Box>
                <Box flex={1}>
                  <Text fontSize="sm" fontWeight="bold" mb={3}>
                    Phone Number
                  </Text>
                  <Input
                    defaultValue="12000"
                    color={{ base: "black", _dark: "white" }}
                    borderColor="gray.200"
                    _focus={{
                      borderColor: { base: "#10a37f", _dark: "yellow.500" },
                      ring: "2px",
                      ringColor: { base: "emerald.50", _dark: "yellow.50" },
                    }}
                    rounded="lg"
                    value={editedUser.phoneNumber}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb={3}>
                    Email
                  </Text>
                  <Input
                    type="email"
                    color={{ base: "black", _dark: "white" }}
                    borderColor="gray.200"
                    _focus={{
                      borderColor: { base: "#10a37f", _dark: "yellow.500" },
                      ring: "2px",
                      ringColor: { base: "emerald.50", _dark: "yellow.50" },
                    }}
                    rounded="lg"
                    value={editedUser.email}
                    disabled
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb={3}>
                    Address
                  </Text>
                  <Input
                    defaultValue="12000"
                    color={{ base: "black", _dark: "white" }}
                    borderColor="gray.200"
                    _focus={{
                      borderColor: { base: "#10a37f", _dark: "yellow.500" },
                      ring: "2px",
                      ringColor: { base: "emerald.50", _dark: "yellow.50" },
                    }}
                    rounded="lg"
                    value={editedUser.address ?? ""}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        address: e.target.value,
                      })
                    }
                  />
                </Box>
              </SimpleGrid>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette="green"
                bg={{ base: "green.600", _dark: "yellow.600" }}
                onClick={() => handleEdit(editedUser)}
              >
                {isEditing ? "Updating..." : "Update User Details"}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

