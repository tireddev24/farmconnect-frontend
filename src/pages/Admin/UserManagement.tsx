import { ColorModeButton } from "../../components/ui/color-mode";
import {
  Box,
  Flex,
  Heading,
  Button,
  Table,
  TableBody,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAdminStore } from "store/store";
import Unexpected from "@/components/ui/error/unexpected";
import { formatDate } from "@/lib/helpers";
import Spin from "components/ui/spinner";


const UserManagement = () => {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const users = useAdminStore((state) => state.users)
  const fetchUsers = useAdminStore((state) => state.fetchUsers)


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
  }, [fetchUsers]);

  if (loading) {
    return <Spin h="100dvh" />;
  }


  if (error) {
    return <Unexpected error={error} />;
  }

  if (path.includes("FC")) {
    return <Outlet />;
  }

  return (
    <Flex minH="100vh" bg={{ base: "#f8fafb", _dark: "black" }}>
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


        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="md" color="gray.800">
            All Users
          </Heading>
        </Flex>

        <Box
          bg="white"
          p={8}
          rounded="3xl"
          shadow="sm"
          border="1px solid"
          borderColor="gray.100"
          h={"60dvh"}
          overflowY={"scroll"}
        >


          <Table.Root size="sm">
            <Table.Header>
              <Table.Row>

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
              </Table.Row>
            </Table.Header>
            <TableBody>
              {users.filter((user) => user.role.toString().toLowerCase() !== "admin")
                .map((user, i: number) => {
                  return (
                    <UserRow
                      key={user.id ?? i} // Added key prop to prevent React warnings
                      index={i}
                      name={user.firstName + " " + user.lastName}
                      role={user.role}
                      status={user.status}
                      date={user.createdAt}
                    />
                  )
                })}
            </TableBody>
          </Table.Root>
        </Box>
      </Box>
    </Flex>
  );
};

// --- Sub-components to keep code clean ---

const UserRow = ({ ...props }) => {
  const isBanned = props.status === "BANNED";
  return (
    <Table.Row key={props.index}>
      <Table.Cell fontWeight="bold" py={4}>
        {props.name}
      </Table.Cell>
      <Table.Cell color="gray.500">{props.role}</Table.Cell>
      <Table.Cell>
        <Badge
          bg={isBanned ? "red.50" : "emerald.50"}
          color={isBanned ? "red.500" : "emerald.500"}
          fontSize="10px"
          px={2}
          rounded="md"
        >
          {props.status}
        </Badge>
      </Table.Cell>
      <Table.Cell>{formatDate(props.date)}</Table.Cell>
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
