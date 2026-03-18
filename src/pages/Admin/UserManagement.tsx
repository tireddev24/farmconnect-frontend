import { RightArrow } from "components/ui/icons";
import { ColorModeButton } from "../../components/ui/color-mode";
import {
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  Icon,
  Button,
  Input,
  InputGroup,
  InputElement,
  Table,
  TableBody,
  Badge,
} from "@chakra-ui/react";
import { Check, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import type { OrderRecord, UserProfile } from "types/types";
import { useAdminStore } from "store/store";
import Unexpected from "error/unexpected";
import { formatDate } from "helpers/function";

const UserManagement = () => {
  const navigate = useNavigate();

  const handleView = (id: string) => {
    navigate(id);
  };

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);
  const { orders, fetchOrders, users, fetchUsers } = useAdminStore();
  const path = location.pathname;

  useEffect(() => {
    const data = async () => {
      try {
        await fetchOrders();
        await fetchUsers();
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Unexpected error={error} />;
  }

  if (path.includes("FC")) {
    return <Outlet />;
  }

  return (
    <Flex minH="100vh">
      {/* --- Main Content --- */}
      <Box flex={1} p={10}>
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="lg">User Management</Heading>
            <Text color="gray.500" fontSize="sm">
              System status and key metrics.
            </Text>
          </Box>
          <ColorModeButton />
        </Flex>

        {/* 1. Pending Farmer Verifications Table */}
        <Box
          bg={{ base: "white", _dark: "gray.800" }}
          p={8}
          rounded="3xl"
          shadow="sm"
          border="1px solid"
          borderColor={{ base: "gray.100", _dark: "gray.800" }}
          mb={8}
          color={{ base: "gray.800", _dark: "white" }}
        >
          <HStack mb={6} color="emerald.600">
            <Icon as={Check} fontSize={20} />
            <Heading size="md">Pending Farmer Verifications</Heading>
          </HStack>

          <Table.Root size="sm">
            <Table.Header>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Name
              </Table.ColumnHeader>
              {/* <Table.ColumnHeader color="gray.400" textTransform="none">
                Location
              </Table.ColumnHeader> */}
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Seller
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Order Id
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Status
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Date
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Amount
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="gray.400"
                textTransform="none"
                textAlign="right"
              >
                Action
              </Table.ColumnHeader>
            </Table.Header>
            <TableBody>
              {orders.map((o: OrderRecord) => (
                <VerificationRow
                  key={o.id}
                  name={o.orderNumber}
                  seller={o.farmerName!}
                  status={o.status!}
                  orderId={o.orderNumber}
                  date={formatDate(o.createdAt!)}
                  amount={o.totalAmount}
                  handleView={handleView}
                />
              ))}
            </TableBody>
          </Table.Root>
        </Box>

        {/* 2. All Users Table */}
        <Box
          bg="white"
          p={8}
          rounded="3xl"
          shadow="sm"
          border="1px solid"
          borderColor="gray.100"
        >
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="md" color="gray.800">
              All Users
            </Heading>
            {/* <InputGroup maxW="300px">
              <>
                <Input
                  placeholder="Search users..."
                  bg="gray.50"
                  border="none"
                  rounded="lg"
                  fontSize="sm"
                />
              </>
            </InputGroup> */}
          </Flex>

          <Table.Root size="sm">
            <Table.Header>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                User
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Role
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Status
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="gray.400"
                textTransform="none"
                textAlign="right"
              >
                Manage
              </Table.ColumnHeader>
            </Table.Header>
            <TableBody>
              {users.data.items.map((user: UserProfile) => (
                <UserRow
                  name={user.firstName + " " + user.lastName}
                  role={user.role}
                  status={user.status}
                />
              ))}
            </TableBody>
          </Table.Root>
        </Box>
      </Box>
    </Flex>
  );
};

// --- Sub-components to keep code clean ---

const VerificationRow = ({
  name,

  status,
  orderId,
  amount,
  date,
  seller,
  handleView,
}: {
  name: string;
  nin?: string;
  orderId: string;
  date: string;
  amount: string | number;
  status: string;
  handleView: (arg0: string) => void;

  seller: string;
}) => (
  <Table.Row>
    <Table.Cell fontWeight="bold" py={4}>
      {name}
    </Table.Cell>
    {/* <Table.Cell color="gray.500">{location}</Table.Cell> */}
    <Table.Cell textTransform={"capitalize"} color="gray.500">
      {seller}
    </Table.Cell>
    <Table.Cell color="gray.500">{orderId}</Table.Cell>
    <Table.Cell textTransform={"capitalize"} color="gray.500">
      {status.replace("-", " ")}
    </Table.Cell>
    <Table.Cell color="gray.500">{date}</Table.Cell>
    <Table.Cell color="gray.500">{amount}</Table.Cell>
    <Table.Cell textAlign={"right"}>
      <HStack
        justifyContent={"end"}
        _hover={{ color: { base: "green.500", _dark: "yellow.500" } }}
        cursor={"pointer"}
      >
        <Text onClick={() => handleView(orderId)}>View Details</Text>
        <Text>
          <RightArrow />
        </Text>
      </HStack>
    </Table.Cell>
  </Table.Row>
);

const UserRow = ({
  name,
  role,
  status,
}: {
  name: string;
  role: string;
  status: string;
}) => {
  const isBanned = status === "BANNED";
  return (
    <Table.Row>
      <Table.Cell fontWeight="bold" py={4}>
        {name}
      </Table.Cell>
      <Table.Cell color="gray.500">{role}</Table.Cell>
      <Table.Cell>
        <Badge
          bg={isBanned ? "red.50" : "emerald.50"}
          color={isBanned ? "red.500" : "emerald.500"}
          fontSize="10px"
          px={2}
          rounded="md"
        >
          {status}
        </Badge>
      </Table.Cell>
      <Table.Cell textAlign="right">
        <Button
          variant="ghost"
          size="xs"
          color={isBanned ? "emerald.500" : "red.500"}
          fontWeight="bold"
        >
          {isBanned ? "Unban" : "Ban"}
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default UserManagement;
