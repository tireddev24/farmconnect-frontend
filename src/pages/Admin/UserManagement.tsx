import { ColorModeButton } from "../../components/ui/color-mode";
import {
  Box,
  Flex,
  Heading,
  Button,
  Table,
  TableBody,
  Badge,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import type { UserProfile } from "types/types";
import { useAdminStore } from "store/store";
import Unexpected from "error/unexpected";
import { formatDate } from "helpers/function";
import Spin from "components/ui/spinner";

const UserManagement = () => {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);
  const { users, fetchUsers } = useAdminStore();
  const path = location.pathname;

  useEffect(() => {
    const data = async () => {
      try {
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
    return (
      <VStack minH={"100dvh"} justifyContent={"center"}>
        <Spin />
      </VStack>
    );
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
            <Heading size="lg" color={"green.600"}>
              User Management
            </Heading>
          </Box>
          <ColorModeButton />
        </Flex>
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
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Date
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
              {users.data.items
                .filter((o) => o.role.toLowerCase() !== "admin")
                .map((user: UserProfile, i: number) => (
                  <UserRow
                    key={i}
                    name={user.firstName + " " + user.lastName}
                    role={user.role}
                    status={user.status}
                    date={user.createdAt}
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

const UserRow = ({
  key,
  name,
  role,
  date,
  status,
}: {
  key: number;
  name: string;
  role: string;
  date: string;
  status: string;
}) => {
  const isBanned = status === "BANNED";
  return (
    <Table.Row key={key}>
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
      <Table.Cell>{formatDate(date)}</Table.Cell>
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
